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

    this.indexShooting = [];
    this.indexEnemy = [];
    this.deleting=false;
  }

  _update() {
    this.finished = false;
    game.fillTheArrayOfObjectsToPaint();
    this.display.paintObject.bind(this)();
    game.input.readControlsToKeys();
    if (game.gameState === "playing") {
      game.marker.updateMarkerEnergy();
      this.outOfScreen();
      this.collidesShooting(game.enemyArray);
      
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
      if (game.gameState === "playing" && this.deleting===false) {
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

  collidesShooting(enemies) {
    if (game.gameState === "playing") { 
      this.deleting=true;
      game.player.shooting.forEach((shoot, indexShoot) => {
        enemies.forEach((theEnemy, index) => {
          if (shoot.itHasCollided(theEnemy)) {
            this.indexShooting.push(indexShoot);
            //this.indexEnemy.push(index);
            // game.player.shooting.splice(indexShoot, 1);
            theEnemy.deathEnemy(index);
          }
        });
      });
      // if (this.indexShooting.length > 0) {
      //   this.indexShooting.forEach(aShoot => {
      //     game.player.shooting.splice(aShoot, 1);
      //   });
      // }

  
      enemies.forEach(theEnemy => {
        if (game.player.itHasCollided(theEnemy)) {
          game.player.energy -= 2;
        }
      });
    }
    this.deleting=false;
  }

  outOfScreen() {
    this.deleting=true;
    var counterEnemyToDeath = [];
    if (game.gameState === "playing") {
      game.enemyArray.forEach((theEnemy, index) => {
        if (theEnemy.sprite.y > 500) {
          this.enemyArray.splice(index, 1);
        }
        if (theEnemy.indexCounterSprite === 10) {
          clearInterval(this.EnemyExplosionId);
          counterEnemyToDeath.push(index);
          this.enemyArray.splice(index, 1);
        }
      });

      // if (counterEnemyToDeath.length > 0) {
      //   counterEnemyToDeath.forEach(position => {
      //     this.enemyArray.splice(position, 1);
      //   });
      // }
      game.player.shooting.forEach((theShoot, indexOfShoot) => {
        if (theShoot.sprite.y < -20) {
          game.player.shooting.splice(indexOfShoot, 1);
        }
      });
    }
    this.deleting=false;
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
