class Game {
  constructor(options) {
    this.input = new Input();
    this.display = new Display();
    this.player = new Player(289, 410, "Images/ship4.png", 62, 64);
    this.enemy = new Enemy(150, 0, "Images/Enemy1.png", 27, 26);
    this.enemyArray = [];
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
    this.enemyGenerator();
    this.collides(game.enemyArray);
    game.display.deletesAllObjectsPainted();
    this.SetAnimationLoop();
  }

  start(options) {
    //Inicalize canvas with de class Display
    if (game.display.ctx === undefined) this.display.initialize(options);
    game.gameState = "splash";
    game.loopUntilKeypressed = document.addEventListener("keyup", () => {
      //Assign control keys or decide device control
      game.gameState = "playing";
      this.input.initializeKeyRead();

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
      if (game.player.shooting.length >= 0) {
        for (let i = 0; i < game.player.shooting.length; i++) {
          game.display.addObjectsToPaint(game.player.shooting[i].sprite);
        }
      }
      game.enemyArray.forEach(theEnemy => {
        game.display.addObjectsToPaint(theEnemy.sprite);
      });
    } else if (this.gameState === "pause") {
      game.display.addObjectsToPaint(game.pauseImage);
    } else if (this.gameState === "gameOver") {
      game.display.addObjectsToPaint(game.gameOverImage);
    }
  }

  collides(enemy) {
    for (let i=0;i<game.player.shooting.length;i++){
      for (let j=0;j<enemy.length;j++){
        if (game.player.shooting[i].itHasCollided(enemy[j])){
          enemy.splice(j-1,1);
        }
      }
    }
   
  }

  enemyGenerator() {
    if (this.enemyArray.length < 10) {
      let aNumber = Math.floor(Math.random() * 620);
      this.enemyArray.push(new Enemy(aNumber, 0, "Images/Enemy1.png", 27, 26));
    }
  }
}
