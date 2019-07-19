class Input {
  constructor(player, game) {
    this.withOutkeypressID = undefined;
    this.keys = [];
    this.eventKeyUpId = undefined;
    this.eventKeyDown = undefined;
    this.readkeyIntervalId = undefined;
    this.player = player;
    this.fireCooldown = 0;
    this.fireSpeed = 20;
    this.game = game;
  }

  readControlsToKeys() {
    if (this.keys[38]) {
      if (this._canIReadOtherKeys()) this.player.updatePosition("y", -1);
    }
    if (this.keys[40]) {
      if (this._canIReadOtherKeys()) this.player.updatePosition("y", +1);
    }
    if (this.keys[37]) {
      if (this._canIReadOtherKeys()) {
        this.player.updatePosition("x", -1);
        this.player.syncMovWSpritesCounter--;
        if (this.player.syncMovWSpritesCounter < 0)
          this.player.syncMovWSpritesCounter = 0;
        this.player.synchronizationMovementWSprites();
      }
    }
    if (this.keys[39]) {
      if (this._canIReadOtherKeys()) {
        this.player.updatePosition("x", +1);
        this.player.syncMovWSpritesCounter++;
        if (this.player.syncMovWSpritesCounter > 6)
          this.player.syncMovWSpritesCounter = 6;
        this.player.synchronizationMovementWSprites();
      }
    }
    if (this.keys[32] && this.fireCooldown >= this.fireSpeed) {
      this.player.shootId++;
      this.player.shooting.push(
        new Shooting(
          this.player,
          this.game,
          this.player.shootId,
          0,
          0,
          4,
          10,
          this.player.sprite.x + 28,
          this.player.sprite.y - 5,
          "Images/s1a.png",
          4,
          11,
          3000,
          8
        )
      );
      this.fireCooldown = 0;
    }

    if (this.keys[80]) {
      if (this.game.gameState === "pause") {
        console.log ("Estoy en pausa y paso a player")
        this.game.gameState = "pause";
        // this.game.intervalGameId = window.requestAnimationFrame(
        //   this.game._update()
        // );
      
        this.game.gameState = "playing";
      } else if (this.game.gameState === "playing") {
        console.log ("Estoy en playing y paso a pausa")
        this.game.gameState = "pause";
        // window.cancelAnimationFrame(this.game.intervalGameId);
      }
    }
  }

  _canIReadOtherKeys() {
    if (this.game.gameState === "pause") return false;
    else return true;
  }

  initializeKeyRead() {
    this.eventKeyDownId = window.addEventListener("keydown", e => {
      this.keys[e.keyCode] = true;
      clearInterval(this.withOutkeypressID);
    });

    this.eventKeyUpId = window.addEventListener("keyup", e => {
      this.keys[e.keyCode] = false;
      this.withOutkeypressID = setInterval(() => {
        if (this.game.gameState === "playing") {
          this.player.normalizerShip();
        }
      }, 80);
    });
  }
  clearKeyRead() {
    clearInterval(this.eventKeyDownId);
    clearInterval(this.eventKeyUpId);
  }

  updateFire() {
    if (this.fireCooldown < this.fireSpeed) {
      this.fireCooldown++;
    }
  }
}
