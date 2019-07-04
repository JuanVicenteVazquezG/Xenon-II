class Input {
  constructor() {
    this.keyArrowPressed = undefined;
  }
  _assignControlsToKeys() {
    this.keyArrowPressed = document.onkeydown = whatIs => {
      // addEventListener("keydown", whatIs => {
      switch (whatIs.keyCode) {
        case 38:
          {
            if (this._canIReadOtherKeys())
              game.player.updatePosition(
                game.player.sprite.x,
                game.player.sprite.y - game.player.speed
              );
          }
          break;

        case 40:
          {
            if (this._canIReadOtherKeys())
              game.player.updatePosition(
                game.player.sprite.x,
                game.player.sprite.y + game.player.speed
              );
          }
          break;

        case 37:
          {
            if (this._canIReadOtherKeys())
              game.player.updatePosition(
                game.player.sprite.x - game.player.speed,
                game.player.sprite.y
              );
          }
          break;

        case 39:
          {
            if (this._canIReadOtherKeys())
              game.player.updatePosition(
                game.player.sprite.x + game.player.speed,
                game.player.sprite.y
              );
          }
          break;

        case 80: {
          if (game.gameState === "pause") {
            game.gameState = "playing";
          } else if (game.gameState === "playing") {
            game.gameState = "pause";
          }

          break;
        }
        case 32: {
          if (this._canIReadOtherKeys()) {
            //Here we need a function to creates differents ammos
            game.player.shooting.push(
              new Shooting(
                game.player.sprite.x + 28,
                game.player.sprite.y - 5,
                "Images/s1a.png",
                4,
                11,
                3000,
                7
              )
            );
          }
          break;
        }
        case 27: {
          {
            if (this._canIReadOtherKeys()) {
              //TODO KEY ESCAPE
              game.gameState = "gameOver";
              setTimeout(() => {
                game.gameState = "splash";
              }, 3000);
            }
          }
          break;
        }
      }
    };
    // });
  }
  _canIReadOtherKeys() {
    if (game.gameState === "pause") return false;
    else return true;
  }
  initializeKeyRead() {
    this._assignControlsToKeys();
  }

  finishKeyRead() {
    document.removeEventListener("onkeydown", this.keyArrowPressed);
  }
}
