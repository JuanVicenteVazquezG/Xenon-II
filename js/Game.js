class Game {
  constructor(options) {
    this.finished = undefined;
    this.input = new Input();
    this.display = new Display();
    this.loading();
    this.marker = new Marker(0, 200);
    this.enemyGeneratorId = undefined;
    this.numberKind = 1;

    this.intervalGameId = undefined;
    this.enemy = undefined;
    this.enemyArray = [];
    this.maxEnemyOntheScreen = 10;

    this.gameState = undefined;
    this.musicGame = new Audio();
  }

  _update() {
    this.finished = false;
    game.fillTheArrayOfObjectsToPaint();
    this.display.paintObject.bind(this)();
    game.input.readControlsToKeys();
    if (game.gameState === "playing") {
      game.marker.updateMarkerEnergy();
      this.collidesShooting(game.enemyArray);
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
    game.musicSplash.play();
    let playing = function() {
      game.gameState = "playing";
      game.input.initializeKeyRead();
      game.input.withOutkeypressID = setInterval(() => {
        if (game.state === "playing") {
          game.player.normalizerShip();
        }
      }, 80);
      game.enemyGenerator();
      document.removeEventListener("keydown", playing);
    };
    document.addEventListener("keydown", playing);
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
      game.display.addObjectsToPaint(game.imageName);
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

  enemyGenerator() {
    this.enemyGeneratorId = setInterval(() => {
      if (game.gameState === "playing") {
        if (this.enemyArray.length < this.maxEnemyOntheScreen) {
          //let numberKind = 1; //Generator depends of other function on stage of game
          //
          let enemyKind = game.kindOfEnemy(this.numberKind);

          let aNumber = Math.floor(Math.random() * 600) + 20;

          this.enemyArray.push(
            new Enemy(
              enemyKind.positionToReadX,
              enemyKind.positionToReadY,
              enemyKind.positionToReadSizeX,
              enemyKind.positionToReadSizeY,
              aNumber,
              0,
              enemyKind.url,
              enemyKind.sizeX,
              enemyKind.sizeY,
              this.numberKind
            )
          );
        }
      }
    }, 1000);
  }

  kindOfEnemy(enemyKind) {
    if (enemyKind === 1)
      return {
        url: "Images/drone.png",
        positionToReadX: 0,
        positionToReadY: 0,
        positionToReadSizeX: 32,
        positionToReadSizeY: 32,
        sizeX: 32,
        sizeY: 32
      };
  }

  collidesShooting(enemy) {
    if (game.gameState === "playing") {
      game.player.shooting.forEach((shoot, indexShoot) => {
        enemy.forEach((theEnemy, index) => {
          if (shoot.itHasCollided(theEnemy)) {
            game.player.shooting.splice(indexShoot, 1);
            theEnemy.deathEnemy(index);
          }
        });
      });
      enemy.forEach(theEnemy => {
        if (game.player.itHasCollided(theEnemy)) {
          game.player.energy -= 2;
        }
      });
    }
  }

  outOfScreen() {
    if (game.gameState === "playing") {
      console.log("llego al final y desaparezco");
      game.enemyArray.forEach((theEnemy, index) => {
        if (theEnemy.sprite.y > 500) {
          this.enemyArray.splice(index, 1);
        }
        if (theEnemy.indexCounterSprite === 10) {
          clearInterval(this.EnemyExplosionId);
          this.enemyArray.splice(index, 1);
        }
      });
      game.player.shooting.forEach((theShoot, indexOfShoot) => {
        if (theShoot.sprite.y < -20) {
          game.player.shooting.splice(indexOfShoot, 1);
        }
      });
    }
  }

  loading() {
    this.initImage = new Sprite(
      0,
      0,
      640,
      480,
      0,
      0,
      "Images/splash.png",
      640,
      480
    );
    this.pauseImage = new Sprite(
      0,
      0,
      640,
      480,
      0,
      0,
      "Images/pause.png",
      640,
      480
    );
    this.gameOverImage = new Sprite(
      0,
      0,
      640,
      480,
      0,
      0,
      "Images/gameover.png",
      640,
      480
    );
    this.player = new Player(
      192,
      0,
      64,
      64,
      289,
      410,
      "Images/Ship.png",
      62,
      64
    );
    this.imageName = this.initImage;
    this.musicSplash = new Audio();
    this.musicSplash.src = "Musics/musicSplash.mp3"; //determinar is loaded?
  }
}
