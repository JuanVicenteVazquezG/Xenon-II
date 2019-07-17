class Game {
  constructor(options) {
    var that = this;
    this.finished = undefined;
    this.input = new Input();
    this.display = new Display();

    this.marker = new Marker(0, 200);
    this.enemyGeneratorId = undefined;
    this.numberKind = 1;
    this.canInvencible === false;
    this.intervalGameId = undefined;

    this.maxEnemyOntheScreen = 8;
    this.invencible = undefined;
    this.gameState = undefined;
    this.musicGame = undefined;
    this.musicGameOver = undefined;
    this.musicSplash = undefined;
    this.enemyArray = [];
    this.indexShooting = [];

    this.deleting = false;
    this.EnemyId = 0;
    this.backgroundOuterSpace = undefined;
    this.backgroundOuterSpaceFilter1 = undefined;
    this.backgroundOuterSpaceFilter2 = undefined;
    this.Decoration = undefined;
    this.onlyOneTime = 0;
    this.resetAllInterval = 0;
    this.awards = [];
    this.AwardsId = 0;
  }

  _update() {
    this.finished = false;
    if (game.gameState === "playing") {
      this.outerFilterSpaceFilterPut();
    }
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
    this.loading();
    this.display.initialize(options);

    game.gameState = "splash";
    // game.musicSplash.setAttribute("autoplay","none")
    // game.musicSplash.play();

    let playing = function() {
      game.gameState = "playing";

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
    if (game.gameState === "splash") {
      game.display.addObjectsToPaint(game.imageName);
    } else if (game.gameState === "playing") {
      game.display.addObjectsToPaint(this.backgroundOuterSpace);
      game.display.addObjectsToPaint(this.backgroundOuterSpaceFilter1);
      game.display.addObjectsToPaint(this.backgroundOuterSpaceFilter2);
      game.display.addObjectsToPaint(this.Decoration);

      game.display.addObjectsToPaint(game.player.sprite);
      if (game.player.shooting.length >= 0) {
        for (let i = 0; i < game.player.shooting.length; i++) {
          game.display.addObjectsToPaint(game.player.shooting[i].sprite);
        }
      }

      this.enemyArray.forEach(theEnemy => {
        game.display.addObjectsToPaint(theEnemy.sprite);
      });
      if (this.awards.length > 0) {
        this.awards.forEach(award => {
          game.display.addObjectsToPaint(award.sprite);
        });
      }
    } else if (game.gameState === "pause") {
      game.display.addObjectsToPaint(game.pauseImage);
    } else if (game.gameState === "gameOver") {
      game.display.addObjectsToPaint(game.gameOverImage);

      if (this.onlyOneTime === 0) {
        this.onlyOneTime = 1;
        this.resetAllInterval = setTimeout(this.resetAll, 3000);
      }
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
      var generateAward = Math.floor(Math.random() * 2);
      var kindOfAward = Math.floor(Math.random() * 8) + 1;
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
        if (generateAward === 1) {
          this.enemyArray[this.enemyArray.length - 1].kindOfAward = kindOfAward;
        } else {
          this.enemyArray[this.enemyArray.length - 1].kindOfAward = 0;
        }
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
    console.log(this.enemyArray);
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
            if (aEnemy.kindOfAward > 0) {
              this.createAwards(
                this.enemyArray[index].sprite.x,
                this.enemyArray[index].sprite.y,
                this.enemyArray[index].kindOfAward
              );
            }
            this.enemyArray.splice(index, 1);
          }
        });
      });
    }
    if (this.canInvencible === false) {
      this.enemyArray.forEach(enemy => {
        if (game.player.itHasCollided(enemy)) {
          game.player.energy -= 10;
          game.player.shipCollide.play();
        }
      });
    }

    this.awards.forEach((award, index) => {
      if (game.player.itHasCollided(award)) {
        //here we tray to read the kind of award that the ship obtain
        console.log("premio par el caballero");
        this.pickUpSound.play();
        console.log(
          "el tipo de de premio es: " + this.awards[index].kindOfAwards
        );
        switch (this.awards[index].kindOfAwards) {
          case 1:
            {
              if (game.player.speed <= 3) game.player.speed = 1;
              if (game.player.speed === 6) game.player.speed = 3;
            }
            break;
          case 2:
            {
            }
            break;
          case 3:
            {
            }
            break;
          case 4:
            {
            }
            break;
          case 5: //One life more
            {
              if (game.player.life < 3) {
                game.player.life++;
              }
            }
            break;
          case 6:
            {
              //Invencible
              this.canInvencible = true;
              console.log("superEscudo");
              game.player.sprite.sprite.src = game.player.invencible;
              this.normalShip = setTimeout(() => {
                game.player.sprite.sprite.src = game.player.normalShip;
                this.canInvencible = false;
                clearTimeout(this.normalShip);
              }, 15000);
            }
            break;
          case 7: //Speed up
            {
              if (game.player.speed === 6) game.player.speed = 6;
              if (game.player.speed === 3) game.player.speed += 3;
              if (game.player.speed === 1) game.player.speed = 3;
            }
            break;
          case 8:
            {
            }
            break;
        }
        clearInterval(this.awards[index].movementId);
        clearInterval(this.awards[index].movementRotationId);
        this.awards.splice(index, 1);
      }
    });

    this.deleting = false;
  }

  outOfScreen() {
    var indexEnemyToDelete = [];
    var indexEnemyToDeath = [];
    var indexShootOutScreen = [];
    var indexAwardsToDelete = [];
    this.deleting = true;

    if (game.gameState === "playing") {
      game.enemyArray.forEach(theEnemy => {
        if (theEnemy.sprite.y > 500 || theEnemy.boundingBox.y > 500) {
          indexEnemyToDelete.push(theEnemy.enemyId); //When the enemy abandon the screen will deleted with out explosion
        }
      });
      if (indexEnemyToDelete > 0) {
        this.enemyArray.forEach((enemy, index) => {
          //Only is deleted when is out of screen
          indexEnemyToDelete.forEach(idEnemyToDelete => {
            if (enemy.enemyId === idEnemyToDelete) {
              console.log("Los Id");
              console.log(this.enemyArray[index].enemyId);
              console.log(idEnemyToDelete);
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

    //when de awards gets out the screen
    if (this.awards.length > 0) {
      this.awards.forEach(award => {
        if (award.sprite.y > 500 || award.boundingBox.y > 500) {
          indexAwardsToDelete.push(award.AwardsId);
        }
      });
    }
    if (indexAwardsToDelete.length > 0) {
      console.log("Estoy aqui premios");
      this.awards.forEach((awardsId, index) => {
        indexAwardsToDelete.forEach(idAwardsId => {
          if (awardsId.AwardsId === idAwardsId) {
            clearInterval(this.awards[index].movementId);
            clearInterval(this.awards[index].movementRotationId);
            this.awards.splice(index, 1);
          }
        });
      });
    }
    if (indexAwardsToDelete.length > 0) {
      while (indexAwardsToDelete.length > 0) {
        indexAwardsToDelete.pop();
      }
    }
    console.log(this.awards);
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

    this.Decoration = new Sprite(
      0,
      0,
      640,
      3000,
      0,
      -2520,
      "Images/Stage1.png",
      640,
      3000
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

    this.pickUpSound = new Audio();
    this.pickUpSound.src = "Sounds/pickup.wav";
    this.imageName = this.initImage;
    this.musicSplash = new Audio();
    this.musicSplash.src = "Musics/musicSplash.mp3"; //determinar is loaded?
    this.musicSplash.setAttribute("preload", "none");

    this.musicGame = new Audio();
    this.musicGame.src = "Musics/game.mp3";
    this.musicGame.setAttribute("preload", "none");
    this.musicGameOver = new Audio();
    this.musicGame.src = "Musics/gameOver.mp3";

    this.backgroundOuterSpaceFilter1 = new Sprite(
      0,
      0,
      640,
      3000,
      0,
      -2520,
      "Images/outerSpace.png",
      640,
      3000
    );
    this.backgroundOuterSpaceFilter2 = new Sprite(
      0,
      0,
      640,
      5520,
      0,
      -5520,
      "Images/outerSpace.png",
      640,
      3000
    );
    //Outer Space filter Parallax
  }

  resetAll() {
    game.intervalGameId = undefined;
    clearInterval(this.enemyGeneratorId);
    this.enemyGeneratorId = 0;
    clearInterval(game.input.withOutkeypressID);
    game.input.withOutkeypressID = undefined;

    if (typeof this.enemyArray != "undefined") {
      for (var i = 0; i < game.enemyArray.length; i++) {
        clearInterval(this.enemyArray[i].movementId);
        this.enemyArray[i].movementId = undefined;
        clearInterval(this.enemyArray[i].movementRotationId);
        this.enemyArray[i].movementRotationId = undefined;
      }
    }

    if (typeof this.enemyArray != "undefined") {
      while (this.enemyArray.length > 0) {
        this.enemyArray.pop();
      }
    }

    this.enemyArray = [];
    game.input.clearKeyRead();

    game.player.energy = 1000;
    game.player.life = 2;

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
    this.pickUpSound = undefined;
    this.indexShooting = [];

    this.deleting = false;
    this.EnemyId = 0;
    clearTimeout(this.resetAllInterval);
    this.resetAllInterval = 0;
    //  this.musicGameOver.play();
    this.onlyOneTime = 0;
    game.unSetAnimationloop();
    clearTimeout(this.resetAllInterval);
    game.start(options);
  }

  outerFilterSpaceFilterPut() {
    // positionToReadX,positionToReadY,positionToReadSizeX,positionToReadSizeY,x,y,url,sizeX,sizeY

    this.backgroundOuterSpaceFilter1.y += 5;
    this.backgroundOuterSpaceFilter2.y += 5;

    this.Decoration.y++;
    if (this.backgroundOuterSpaceFilter1.y === 225)
      this.backgroundOuterSpaceFilter1.y = -2520;
    if (this.backgroundOuterSpaceFilter2.y === 225)
      this.backgroundOuterSpaceFilter2.y = -2520;
  }

  createAwards(x, y, kindOfAward) {
    this.AwardsId += 1;
    var name = undefined;
    switch (kindOfAward) {
      case 1:
        {
          name = "Images/Awards/PUDive.png";
        }
        break;
      case 2:
        {
          name = "Images/Awards/PUInvuln.png";
        }
        break;
      case 3:
        {
          name = "Images/Awards/PULaser.png";
        }
        break;
      case 4:
        {
          name = "Images/Awards/PUMissil.png";
        }
        break;
      case 5:
        {
          name = "Images/Awards/PUScore.png";
        }
        break;
      case 6:
        {
          name = "Images/Awards/PUShield.png";
        }
        break;
      case 7:
        {
          name = "Images/Awards/PUSpeed.png";
        }
        break;
      case 8:
        {
          name = "Images/Awards/PUWeapon.png";
        }
        break;
    }
    //(positionToReadX,positionToReadY,positionToReadSizeX,positionToReadSizeY,x,y,url,sizeX,sizeY,maxOfSprites,kind
    this.awards.push(
      new Awards(0, 0, 32, 32, x, y, name, 32, 32, 8, kindOfAward)
    );
    this.awards[this.awards.length - 1].AwardsId = this.AwardsId;
  }
}
