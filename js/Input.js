class Input {
  constructor() {
    {
      this.key = {
        down: false,
        up: false,
        right: false,
        left: false,
        pause: false,
        shooting: false,
        abort: false
      };
    }
  }

  _assignControlsToKeys() {
    document.addEventListener("keydown", whatIs => {
      switch (whatIs.keyCode) {
        case 38: {
          this.key.up = true;
          break;
        }
        case 40: {
          this.key.down = true;
          break;
        }
        case 37: {
          this.key.left = true;
          break;
        }
        case 39: {
          this.key.right = true;
          break;
        }
        case 80: {
          this.key.pause = true;
          break;
        }
        case 32: {
          this.key.shooting = true;
          break;
        }
        case 27: {
          this.key.abord = true;
          break;
        }
      }
    });
  }

  initializeKeyRead() {
    this._assignControlsToKeys();
  }
}
