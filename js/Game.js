class Game {
  constructor(options) {
    this.input = new Input();
    this.display = new Display();
    this.player = new Player();
    this.enemy = new Enemy();
    this.collider = new Collider();
    this.marker = new Marker();
    this.intervalGameId = undefined;
    this.initImage = new Sprite(0, 0, "Images/splash.png", 640, 480);
    this.pauseImage = new Sprite(0, 0, "Images/pause.png", 640, 480);
    this.gameOverImage = new Sprite(0, 0, "Images/gameover.png", 640, 480);
    this.name = this.initImage;
    this.loopUntilKeypressed;
    this.gameState = "splash"; //could be splash/playing/pause/gameOver
  }

  pause() {}

  _update() {
    game.fillTheArrayOfObjectsToPaint();

    this.display.paintObject.bind(this)();

    this.SetAnimationLoop();
    game.display.deletesAllObjectsPainted();
  }

  start(options) {
    //Inicalize canvas with de class Display
    if (game.display.ctx === undefined) this.display.initialize(options);
    game.gameState = "splash";
    game.loopUntilKeypressed = document.addEventListener("keyup", () => {
      //Assign control keys or decide device control
      game.gameState = "playing";
      this.input.initializeKeyRead();
      console.log("y se repite");
      document.removeEventListener("keyup", game.loopUntilKeypressed);
    });

    // starts infiniteLoop Game
    this.SetAnimationLoop();
  }

  SetAnimationLoop() {
    this.intervalGameId = window.requestAnimationFrame(this._update.bind(this));
  }
  unSetAnimationloop() {
    window.cancelAnimationFrame(this.intervalGameId);
    game.intervalGameId = undefined;
  }

  fillTheArrayOfObjectsToPaint() {
    if (this.gameState === "splash") {
      game.display.addObjectsToPaint(game.initImage);
    } else if (this.gameState === "playing") {
      game.display.addObjectsToPaint(game.player.sprite);
      if ((game.player.shooting.length >= 0)) {
        for (let i = 0; i < game.player.shooting.length; i++) {
          game.display.addObjectsToPaint(game.player.shooting[i].sprite);
          console.log(game.display.objectsToPaint);
        }
      }
    } else if (this.gameState === "pause") {
      game.display.addObjectsToPaint(game.pauseImage);
    } else if (this.gameState === "gameOver") {
      game.display.addObjectsToPaint(game.gameOverImage);
    }
  }
}
