class Enemy {
  constructor(
    positionToReadX,
    positionToReadY,
    positionToReadSizeX,
    positionToReadSizeY,
    x,
    y,
    url,
    sizeX,
    sizeY,
    typeOfEnemy = 1
  ) {
    this.sprite = new Sprite(
      positionToReadX,
      positionToReadY,
      positionToReadSizeX,
      positionToReadSizeY,
      x,
      y,
      url,
      sizeX,
      sizeY
    );
    console.log(this.sprite);
    this.speed = 1;
    this.enemyExplosion = new Audio();
    this.enemyExplosion.src = "Sounds/small_explosion.wav";
    this.enemyExplosionAtlas = new Image();
    this.enemyExplosionAtlas.src = "Images/explodeEnemy/explode64.png";
    this.boundingBox = {};

    this.movementId = setInterval(() => {
      this.sprite.y += this.speed;
      this.boundingBox.x = this.sprite.x;
      this.boundingBox.y = this.sprite.y;
      this.boundingBox.x1 = this.sprite.x + this.sprite.sizeX;
      this.boundingBox.y1 = this.sprite.y + this.sprite.sizeY;
    }, 10);

    this.counterSprite = [
      { x: 0, y: 0, sizeX: 63, sizeY: 63 },
      { x: 0, y: 0, sizeX: 64, sizeY: 64 }
    ];
    this.indexCounterSprite = 0;
    this.EnemyExplosionId = undefined;
  }

  deathEnemy(index) {
    clearInterval(this.movementId);
    game.player.points += 10;
    this.enemyExplosion.play();
    this.EnemyExplosionId = setInterval(() => {
      console.log("boom");
      // game.display.ctx.drawImage(
      //   this.enemyExplosionAtlas,
      //   64*this.indexCounterSprite,
      //   64*this.indexCounterSprite,
      //   63,
      //   63,
      //   this.sprite.x,
      //   this.sprite.y,
      //   63,
      //   63
      // );
      this.indexCounterSprite++;
      if (this.indexCounterSprite === 6) {
        clearInterval(this.EnemyExplosionId);
      }
    }, 100);
    game.enemyArray.splice(index, 1);
  }

  //Todo we need a Function thas changes de position of atlas to show.
}
