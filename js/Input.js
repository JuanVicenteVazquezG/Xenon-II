class Input {
  constructor() {
    this.pauseImage = new Sprite(0, 0, "Images/pause.png", 640, 480);
    this.gameOverImage = new Sprite(0, 0, "Images/gameover.png", 640, 480);
  }
  _assignControlsToKeys() {
    document.addEventListener("keydown", whatIs => {
      switch (whatIs.keyCode) {
        case 38: {
          if (this._canIReadOtherKeys())
            game.player.sprite.y -= game.player.speed;
          break;
        }
        case 40: {
          if (this._canIReadOtherKeys())
            game.player.sprite.y += game.player.speed;
          break;
        }
        case 37: {
          if (this._canIReadOtherKeys())
            game.player.sprite.x -= game.player.speed;
          break;
        }
        case 39: {
          if (this._canIReadOtherKeys())
            game.player.sprite.x += game.player.speed;
          break;
        }
        case 80: {
          if (game.intervalGameId === undefined) {
            game.SetAnimationLoop();
          } else {
            game.unSetAnimationloop();
            game.display.paintObject(this.pauseImage);
          }

          break;
        }
        case 32: {
          if (this._canIReadOtherKeys()) {
            // game.unSetAnimationloop();
          }
          break;
        }
        case 27: {
          {
            //TODO KEY ESCAPE
            game.unSetAnimationloop();
            console.log(this.gameOverImage);
            game.display.paintObject(game.input.gameOverImage);
            setTimeout(game.display.clearDisplay, 3000);
          }
          break;
        }
      }
    });
  }
  _canIReadOtherKeys() {
    if (game.intervalGameId === undefined) return false;
    else return true;
  }
  initializeKeyRead() {
    this._assignControlsToKeys();
  }
}
