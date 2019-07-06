class Input {
  constructor() {
    this.keys = [];
    this.eventKeyUpId = undefined;
    this.eventKeyDown = undefined;
    this.readkeyIntervalId = undefined;
  }

  readControlsToKeys() {
    if (this.keys[38]) {
      if (this._canIReadOtherKeys()) game.player.updatePosition("y", -1);
    }
    if (this.keys[40]) {
      if (this._canIReadOtherKeys()) game.player.updatePosition("y", +1);
    }
    if (this.keys[37]) {
      if (this._canIReadOtherKeys()) game.player.updatePosition("x", -1);
    }
    if (this.keys[39]) {
      if (this._canIReadOtherKeys()) game.player.updatePosition("x", +1);
    }
    if (this.keys[32]) {
      if (this._canIReadOtherKeys()) {
        //Here we need a function to creates differents ammos
        game.player.shooting.push(
          new Shooting(
            game.player.sprite.x + 28,
            game.player.sprite.y -5,
            "Images/s1a.png",
            4,
            11,
            3000,
            7
          )
        );
      }
    }
    if (this.keys[80]) {
      if (game.gameState === "pause") {
        console.log("jugamos");
        game.setAnimationLoop();
        game.gameState = "playing";
      } else if (game.gameState === "playing") {
        if (game.finished === true) {
          game.gameState = "pause";
          game.unSetAnimationloop();
          console.log("Entro en modo pausa");
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
