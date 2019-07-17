class Awards {
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
    maxOfSprites,
    kind
  ) {
    this.AwardsId=0;
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
    this.kindOfAwards = kind;
    this.maxOfSprites = maxOfSprites;
    this.speed = 1;
    this.boundingBox = {
      x: 0,
      y: 0,
      x1: 0,
      y1: 0
    };

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
        if (this.counterSpriteMovementRotationEnemy === this.maxOfSprites)
          this.counterSpriteMovementRotationEnemy = 0;
      }
    }, 50);
    this.counterSpriteMovementRotationEnemy = 0;
  }
}
