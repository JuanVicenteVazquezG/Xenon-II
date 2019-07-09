class Player {
  constructor(
    positionToReadX,
    positionToReadY,
    positionToReadSizeX,
    positionToReadSizeY,
    x,
    y,
    url,
    sizeX,
    sizeY
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

    this.boundingBox = {};
    this.speed = 3;

    this.energy = 1000;
    this.points = 0;
    this.kindOfShoot = 1; //Could be 1 to other numbers
    this.shooting = [];
  }

  itHasCollided(objectToCollide) {
    if (
      objectToCollide.sprite.x > this.sprite.x + this.sprite.sizeX ||
      objectToCollide.sprite.x < this.sprite.x - objectToCollide.sprite.sizeX ||
      objectToCollide.sprite.y > this.sprite.y + this.sprite.sizeY ||
      objectToCollide.sprite.y < this.sprite.y - objectToCollide.sprite.sizeY
    ) {
      return false;
    }
    return true;
  }

  updatePosition(position, signal) {
    if (this.sprite.x <= 4) {
      this.sprite.x = 4;
    }
    if (this.sprite.x >= 582) {
      this.sprite.x = 582;
    }
    if (this.sprite.y <= 4) {
      this.sprite.y = 4;
    }
    if (this.sprite.y >= 420) {
      this.sprite.y = 420;
    }

    this.sprite[position] += this.speed * signal;

    this.boundingBox.x = this.sprite.x;
    this.boundingBox.y = this.sprite.y;
    this.boundingBox.x1 = this.sprite.x + this.sprite.sizeX;
    this.boundingBox.y1 = this.sprite.y + this.sprite.sizeY;
  }
}
