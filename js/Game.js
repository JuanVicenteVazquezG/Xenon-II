class Game {
  constructor(options) {
    var that = this;
    this.finished = undefined;
    this.input = new Input();
    this.display = new Display();

    this.marker = new Marker(0, 200);
    this.enemyGeneratorId = undefined;
    this.numberKind = 1;

    this.intervalGameId = undefined;

    this.maxEnemyOntheScreen = 8;

    this.gameState = undefined;
    this.musicGame = undefined;
    this.musicGameOver = undefined;
    this.musicSplash = undefined;
    this.enemyArray = [];
    this.indexShooting = [];

    this.deleting = false;
    this.EnemyId = 0;
    this.backgroundOuterSpace = undefined;
    this.onlyOneTime = 0;
  }

  _update() {
    this.finished = false;
    game.fillTheArrayOfObjectsToPaint();
    game.display.paintObject.bind(game.display)();
    game.input.readControlsToKeys();
    if (game.gameState === "playing") {
      this.input.updateFire();
      game.marker.updateMarkerEnergy();
      this.outOfScreen();
      game.collidesShooting(game.enemyArray);

      if (game.player.isAlife() === false) {
        game.gameState = "gameOver";
      }
    }
    game.display.deletesAllObjectsPainted();

    this.finished = true;
    this.setAnimationLoop();
  }

  start(options) {
    if (game.display.ctx === undefined) {
      this.display.initialize(options);
    }
    this.loading();
    this.setAnimationLoop();
    game.gameState = "splash";
    // game.musicSplash.setAttribute("autoplay","none")
    // game.musicSplash.play();

    let playing = function() {
      game.gameState = "playing";

      //  game.musicSplash.pause();
      //  game.musicSplash.currentTime(0);
      // myAudio.currentTime

      game.input.initializeKeyRead();
      game.input.withOutkeypressID = setInterval(() => {
        if (game.gameState === "playing") {
          game.player.normalizerShip();
        }
      }, 80);
      game.enemyGenerator();
      document.removeEventListener("keydown", playing);
    };
    document.addEventListener("keydown", playing);
    // this.setAnimationLoop();
  }

  setAnimationLoop() {
    this.intervalGameId = window.requestAnimationFrame(this._update.bind(this));
  }
  unSetAnimationloop() {
    window.cancelAnimationFrame(this.intervalGameId);
    game.intervalGameId = undefined;
  }

  fillTheArrayOfObjectsToPaint() {
    if (game.gameState === "splash") {
      game.display.addObjectsToPaint(game.imageName);
    } else if (game.gameState === "playing") {
      game.display.addObjectsToPaint(this.backgroundOuterSpace);
      game.display.addObjectsToPaint(game.player.sprite);
      if (game.player.shooting.length >= 0) {
        for (let i = 0; i < game.player.shooting.length; i++) {
          game.display.addObjectsToPaint(game.player.shooting[i].sprite);
        }
      }

      this.enemyArray.forEach(theEnemy => {
        game.display.addObjectsToPaint(theEnemy.sprite);
      });
    } else if (game.gameState === "pause") {
      game.display.addObjectsToPaint(game.pauseImage);
    } else if (game.gameState === "gameOver") {
      game.display.addObjectsToPaint(game.gameOverImage);

      if ((this.onlyOneTime = 0)) {
      }
      this.onlyOneTime = 1;
      setTimeout(this.resetAll(), 3000);
    }
  }

  enemyGenerator() {
    clearInterval(this.enemyGeneratorId);
    if (typeof this.enemyArray != "undefined") {
      while (this.enemyArray.length > 0) {
        this.enemyArray.pop();
      }
    }

    this.enemyGeneratorId = setInterval(() => {
      if (
        game.gameState === "playing" &&
        this.deleting === false &&
        (this.enemyArray.length < this.maxEnemyOntheScreen ||
          this.enemyArray === "undefined")
      ) {
        let enemyKind = game.kindOfEnemy(this.numberKind);

        let aNumber = Math.floor(Math.random() * 600) + 20;

        this.EnemyId++;
        this.enemyArray.push(
          new Enemy(
            this.EnemyId,
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
    }, 500);
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

  collidesShooting() {
    console.log (this.enemyArray)
    var enemyId = [];
    var shootId = [];
    var deathanimationfinishedId = [];
    console.log("eoe" + self);
    var helper1, helper2, helper3, helper4;
    //here we will tray to delete de shoot and the enemy trough the id of every object. First of all the shoot is delete is collide and next the enemy
    if (game.gameState === "playing" && this.deleting === false) {
      this.deleting = true;
      helper1 = game.player.shooting.length;
      helper2 = this.enemyArray.length; //helper 3 index for shooting  helper 4 index for enemies
      for (helper3 = 0; helper3 < helper1; helper3++) {
        for (helper4 = 0; helper4 < helper2; helper4++) {
          if (
            game.player.shooting[helper3].itHasCollided(
              this.enemyArray[helper4]
            )
          ) {
            console.log("colision");
            enemyId.push(this.enemyArray[helper4].enemyId);
            shootId.push(game.player.shooting[helper3].shootId);
          }
        }
      }

      helper1 = this.enemyArray.length;
      helper2 = enemyId.length;
      if (enemyId > 0) {
        for (helper3 = 0; helper3 < helper1; helper3++) {
          for (helper4 = 0; helper4 < helper2; helper4++) {
            if (this.enemyArray[helper3].enemyId === enemyId[helper4]) {
              this.enemyArray[helper3].deathEnemy(helper3);
            }
          }
        }
      }
      enemyId = [];


      if (shootId.length > 0) {
        game.player.shooting.forEach((shoot, index) => {
          shootId.forEach(theShootId => {
            if (shoot.shootId === theShootId) {
              game.player.shooting.splice(index, 1);
            }
          });
        });
      }
    }
    shootId = [];

    helper1 = this.enemyArray.length;
    for (helper3 = 0; helper3 < helper1; helper3++) {
      if (this.enemyArray[helper3].indexCounterSprite > 12) {
        deathanimationfinishedId.push(this.enemyArray[helper3].enemyId);
      }
    }
    if (deathanimationfinishedId.length > 0) {
      this.enemyArray.forEach((aEnemy, index) => {
        deathanimationfinishedId.forEach(death => {
          if (aEnemy.enemyId === death) {
            clearInterval(aEnemy.EnemyExplosionId);
            this.enemyArray.splice(index, 1);
          }
        });
      });
    }
    this.enemyArray.forEach(enemy => {
      if (game.player.itHasCollided(enemy)) {
        game.player.energy -= 10;
        game.player.shipCollide.play();
      }
    });

    this.deleting = false;
  }

  outOfScreen() {
    var indexEnemyToDelete = [];
    var indexEnemyToDeath = [];
    var indexShootOutScreen = [];
    this.deleting = true;
    if (game.gameState === "playing") {
      game.enemyArray.forEach(theEnemy => {
        if (theEnemy.sprite.y > 500 || theEnemy.boundingBox.y >500 ) {
          indexEnemyToDelete.push(theEnemy.enemyId); //When the enemy abandon the screen will deleted with out explosion
        }
      });
      if (indexEnemyToDelete > 0) {
        this.enemyArray.forEach((enemy, index) => {
          //Only is deleted when is out of screen
          indexEnemyToDelete.forEach(idEnemyToDelete => {
            if (enemy.enemyId == idEnemyToDelete) {
              this.enemyArray.splice(index, 1);
            }
          });
        });
      }
      indexEnemyToDelete = [];

      game.player.shooting.forEach(aShoot => {
        if (aShoot.sprite.y < -20) {
          indexShootOutScreen.push(aShoot.shootId);
        }
      });

      if (indexShootOutScreen > 0) {
        game.player.shooting.forEach((shoot, index) => {
          indexShootOutScreen.forEach(shooOutOfScreeId => {
            if (shoot.shootId === shooOutOfScreeId) {
              game.player.shooting.splice(index, 1);
            }
          });
        });
      }
    }
    this.deleting = false;
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
    this.backgroundOuterSpace = new Sprite(
      0,
      0,
      640,
      480,
      0,
      0,
      "Images/space.png",
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
    this.musicSplash.setAttribute("preload", "none");

    this.musicGame = new Audio();
    this.musicGame.src = "Musics/game.mp3";
    this.musicGame.setAttribute("preload", "none");
    this.musicGameOver = new Audio();
    this.musicGame.src = "Musics/gameOver.mp3";
  }

  resetAll() {

    setTimeout(()=>{
    this.unSetAnimationloop();
    game.display.clearDisplay.bind(this);

    game.intervalGameId = undefined;

    clearInterval(this.enemyGeneratorId);
    this.enemyGeneratorId = 0;

    clearInterval(game.input.withOutkeypressID);

    game.input.withOutkeypressID = undefined;
    this.enemyArray.forEach(enemy => {
      clearInterval(enemy.movementId);
      enemy.movementId = undefined;
      clearInterval(enemy.movementRotationId);
      enemy.movementRotationId = undefined;
    });
    if (typeof this.enemyArray != "undefined") {
      while (this.enemyArray.length > 0) {
        this.enemyArray.pop();
      }
    }

    this.enemyArray = [];
    game.input.clearKeyRead();

    game.player.energy = 1000;
    game.player.life = 2;

    // game.player = [];
    // game.player = new Player();
    this.finished = undefined;
    this.gameState = "splash";
    this.marker = undefined;
    this.marker = new Marker(0, 200);

    this.display = undefined;
    this.display = new Display();
    this.display = new Display();

    this.input = undefined;
    this.input = new Input();
    this.display = undefined;
    this.display = new Display();

    this.marker = new Marker(0, 200);
    this.enemyGeneratorId = 0;
    this.numberKind = 1;

    this.intervalGameId = undefined;
    this.enemy = undefined;

    this.maxEnemyOntheScreen = 10;

    this.musicGame = undefined;
    this.musicGameOver = undefined;
    this.musicSplash = undefined;
    this.indexShooting = [];

    // this.backgroundOuterSpace = undefined;
    this.deleting = false;
    this.EnemyId = 0;

    //  this.musicGameOver.play();
    this.onlyOneTime = 0;
    game.start(options);},3000);
  }
}
