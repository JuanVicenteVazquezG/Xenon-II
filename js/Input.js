class Input {
  constructor() {
    this.keys = [];
    this.eventKeyUpId = undefined;
    this.eventKeyDown = undefined;
    this.readkeyIntervalId = undefined;
    this.busy = false;
  }

  readControlsToKeys() {
    if (this.keys[38]) {
      if (this._canIReadOtherKeys()) game.player.updatePosition("y", -1);
    }
    if (this.keys[40]) {
      if (this._canIReadOtherKeys()) game.player.updatePosition("y", +1);
    }
    if (this.keys[37]) {
      if (this._canIReadOtherKeys()) {
        game.player.updatePosition("x", -1);
        game.player.syncMovWSpritesCounter --;
        if (game.player.syncMovWSpritesCounter<0) game.player.syncMovWSpritesCounter=0;
        game.player.synchronizationMovementWSprites();
      }
    }
    if (this.keys[39]) {
      if (this._canIReadOtherKeys()){ game.player.updatePosition("x", +1);
      game.player.syncMovWSpritesCounter ++;
      if (game.player.syncMovWSpritesCounter>7) game.player.syncMovWSpritesCounter=7;
      game.player.synchronizationMovementWSprites();
    }
    }
    if (this.keys[32]) {
      if (this._canIReadOtherKeys()) {
        //Here we need a function to creates differents ammos
        if (this.busy === false) {
          this.busy=true;
          game.player.shooting.push(
            new Shooting(
              0,
              0,
              4,
              10,
              game.player.sprite.x + 28,
              game.player.sprite.y - 5,
              "Images/s1a.png",
              4,
              11,
              3000,
              7
            )

          );
          setTimeout(()=>this.busy=false,100)
        }
      }
    }
    if (this.keys[80]) {
      if (game.gameState === "pause") {
        game.setAnimationLoop();
        game.gameState = "playing";
      } else if (game.gameState === "playing") {
        if (game.finished === true) {
          game.gameState = "pause";
          game.unSetAnimationloop();
        }
      }
    }
  }

  _canIReadOtherKeys() {
    if (game.gameState === "pause") return false;
    else return true;
  }

  initializeKeyRead() {
    this.eventKeyDownId = window.addEventListener("keydown", e => {
      this.keys[e.keyCode] = true;
    });

    this.eventKeyUpId = window.addEventListener("keyup", e => {
      this.keys[e.keyCode] = false;
    });
  }
}
//   finishKeyRead() {
//     document.removeEventListener("onkeydown", this.keyArrowPressed);
//   }
// }
