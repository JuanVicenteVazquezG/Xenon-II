class Enemy {
  constructor(
    enemyId,
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
    this.enemyId=enemyId;
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
      if (game.gameState === "playing") {
        this.sprite.y += this.speed;
        this.boundingBox.x = this.sprite.x;
        this.boundingBox.y = this.sprite.y;
        this.boundingBox.x1 = this.sprite.x + this.sprite.sizeX;
        this.boundingBox.y1 = this.sprite.y + this.sprite.sizeY;
      }
    }, 10);

    this.movementRotationId = setInterval(() => {
      if (game.gameState === "playing") {
        this.sprite.positionToReadX =
          positionToReadSizeX * this.counterSpriteMovementRotationEnemy;
        this.counterSpriteMovementRotationEnemy++;
        if (this.counterSpriteMovementRotationEnemy === 16)
          this.counterSpriteMovementRotationEnemy = 0;
      }
    }, 50);

    this.counterSprite = [
      { x: 0, y: 0, sizeX: 63, sizeY: 63 },
      { x: 0, y: 0, sizeX: 64, sizeY: 64 }
    ];
    this.indexCounterSprite = 0;
    this.EnemyExplosionId = undefined;
  }

  deathEnemy(index) {
    if (game.gameState === "playing" ) {
      game.deleting=true
      clearInterval(this.movementId);
      clearInterval(this.movementRotationId);
      game.player.points += 10;

      let x = this.sprite.x;
      let y = this.sprite.y;
      this.sprite = this.explosionSprite;

      this.sprite.x = x;
      this.sprite.y = y;
      this.enemyExplosion.play();

      this.EnemyExplosionId = setInterval(() => {
        if (game.gameState === "playing") {
          this.sprite.positionToReadX =
            this.sprite.positionToReadSizeX * this.indexCounterSprite;
          this.indexCounterSprite++;     
        }
      }, 41.66);
    }
  }

  //Todo we need a Function thas changes de position of atlas to show.
}
