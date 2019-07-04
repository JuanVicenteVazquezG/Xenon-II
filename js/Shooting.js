class Shooting {
  constructor(x, y, url, sizeX, sizeY, timeLife, speed) {
    this.sprite = new Sprite(x, y, url, sizeX, sizeY);
    this.timeLife = timeLife;
    this.speed = speed;
    this.boundingBox = {};
    this.movementId = setInterval(() => {
      this.sprite.y -= speed;
      this.boundingBox.x = this.sprite.x;
      this.boundingBox.y = this.sprite.y;
      this.boundingBox.x1 = this.sprite.x + this.sprite.sizeX;
      this.boundingBox.y1 = this.sprite.y + this.sprite.sizeY;
    }, 10);
    this.timeId = setTimeout(() => {
      clearInterval(this.movementId);
      game.player.shooting.shift();
    }, this.timeLife);
  }

  itHasCollided(ObjectToCollide) {
    // // //bottom

    if (
      this.boundingBox.y1 >= ObjectToCollide.boundingBox.y &&
      this.boundingBox.x >= ObjectToCollide.boundingBox.x &&
      this.boundingBox.x1 <= ObjectToCollide.boundingBox.x1
    ) {
      return true;
    }

    return false;
  }
}
