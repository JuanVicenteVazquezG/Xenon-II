class Game {
  constructor(options) {
    this.finishedundefined;
    this.input = new Input();
    this.display = new Display();
    this.player = new Player(289, 410, "Images/ship4.png", 62, 64);
    this.enemy = new Enemy(150, 0, "Images/Enemy1.png", 27, 26);
    this.enemyArray = [];
    this.marker = new Marker(0, 200);
    this.intervalGameId = undefined;
    this.initImage = new Sprite(0, 0, "Images/splash.png", 640, 480);
    this.pauseImage = new Sprite(0, 0, "Images/pause.png", 640, 480);
    this.gameOverImage = new Sprite(0, 0, "Images/gameover.png", 640, 480);
    this.name = this.initImage;
    this.gameState = "splash"; //could be splash/playing/pause/gameOver
  }

  pause() {}

  _update() {
    this.finised = false;
    game.fillTheArrayOfObjectsToPaint();
    this.display.paintObject.bind(this)();
    game.input.readControlsToKeys();
    if (game.gameState === "playing") {
      game.marker.createMarker();
      this.enemyGenerator();
      this.collidesShooting(game.enemyArray);

      this.display.ctx.font = "100px font-family/xenon2.ttf";
      this.display.ctx.fillText("Hello world", 10, 50);

      this.outOfScreen();
    }
    game.display.deletesAllObjectsPainted();
    this.finished = true;
    this.setAnimationLoop();
  }

  start(options) {
    if (game.display.ctx === undefined) {
      this.display.initialize(options);
    }
    game.gameState = "splash";
    let playing = function() {
      game.gameState = "playing";
      //Assign control keys or decide device control
      game.input.initializeKeyRead();
      document.removeEventListener("keydown", playing);
    };
    document.addEventListener("keydown", playing);

    // starts infiniteLoop Game
    this.setAnimationLoop();
  }

  setAnimationLoop() {
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

  collidesShooting(enemy) {
    game.player.shooting.forEach(shoot => {
      enemy.forEach((theEnemy, index) => {
        if (shoot.itHasCollided(theEnemy)) {
          enemy.splice(index, 1);
        }
      });
    });
    enemy.forEach(theEnemy => {
      if (game.player.itHasCollided(theEnemy)) {
        console.log("Collides");
      }
    });
  }

  enemyGenerator() {
    if (this.enemyArray.length < 10) {
      let aNumber = Math.floor(Math.random() * 620) + 20;
      this.enemyArray.push(new Enemy(aNumber, 0, "Images/Enemy1.png", 27, 26));
    }
  }
  outOfScreen() {
    this.enemyArray.forEach((theEnemy, index) => {
      if (theEnemy.sprite.y > 480) {
        this.enemyArray.splice(index);
      }
    });
  }
}
