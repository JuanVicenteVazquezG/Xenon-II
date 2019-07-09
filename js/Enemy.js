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
    this.explosionSprite = new Sprite(
      positionToReadX,
      positionToReadY,
      64,
      64,
      x,
      y,
      "Images/explodeEnemy/explode64.png",
      64,
      64
    );

    this.speed = 1;
    this.enemyExplosion = new Audio();
    this.enemyExplosion.src = "Sounds/small_explosion.wav";
   
    this.counterSpriteMovementRotationEnemy = 0;
    this.boundingBox = {};

    this.movementId = setInterval(() => {
      this.sprite.y += this.speed;
      this.boundingBox.x = this.sprite.x;
      this.boundingBox.y = this.sprite.y;
      this.boundingBox.x1 = this.sprite.x + this.sprite.sizeX;
      this.boundingBox.y1 = this.sprite.y + this.sprite.sizeY;
    }, 10);
    this.movementRotationId = setInterval(() => {
      this.sprite.positionToReadX =
        positionToReadSizeX * this.counterSpriteMovementRotationEnemy;
      this.counterSpriteMovementRotationEnemy++;
      if (this.counterSpriteMovementRotationEnemy === 16)
        this.counterSpriteMovementRotationEnemy = 0;
    }, 50);
    this.counterSprite = [
      { x: 0, y: 0, sizeX: 63, sizeY: 63 },
      { x: 0, y: 0, sizeX: 64, sizeY: 64 }
    ];
    this.indexCounterSprite = 0;
    this.EnemyExplosionId = undefined;
    
  }

  deathEnemy(index) {
    game.player.points += 10;
    clearInterval(this.movementId);
   let x=this.sprite.x;
   let y=this.sprite.y;
    this.sprite=this.explosionSprite;
    
    this.sprite.x=x;
    this.sprite.y=y;
    this.enemyExplosion.play();

    this.EnemyExplosionId = setInterval(() => {
      this.sprite.positionToReadX=this.sprite.positionToReadSizeX*this.indexCounterSprite;
      console.log (this.sprite);
      this.indexCounterSprite++;
      if (this.indexCounterSprite === 10) {
        game.enemyArray.splice(index, 1);
        clearInterval(this.EnemyExplosionId);
      }
    }, 100);
    
  }

  //Todo we need a Function thas changes de position of atlas to show.
}
