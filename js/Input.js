class Input {
  constructor() {
    this.pauseImage = {
      x: 0,
      y: 0,
      sprite: new Image(),
      sizeX: 640,
      sizeY: 480
    };
    this.pauseImage.sprite.src = "Images/pause.png";
  }
  _assignControlsToKeys() {
    document.addEventListener("keydown", whatIs => {
      switch (whatIs.keyCode) {
        case 38: {
          if (this._canIReadOtherKeys()) game.player.y -= game.player.speed;
          break;
        }
        case 40: {
          if (this._canIReadOtherKeys()) game.player.y += game.player.speed;
          break;
        }
        case 37: {
          if (this._canIReadOtherKeys()) game.player.x -= game.player.speed;
          break;
        }
        case 39: {
          if (this._canIReadOtherKeys()) game.player.x += game.player.speed;
          break;
        }
        case 80: {
          if (game.intervalGameId === undefined) {
            game.SetAnimationLoop();
          } else {
            //TODO Debe guardar el estado de la pantalla
            game.unSetAnimationloop();
            console.log(this.pauseImage);
            game.display.paintObject(this.pauseImage);
          }
          break;
        }
        case 32: {
          if (this._canIReadOtherKeys()) {
            //TODO KEY SHOOT
          }
          break;
        }
        case 27: {
          //TODO KEY ESCAPE
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
