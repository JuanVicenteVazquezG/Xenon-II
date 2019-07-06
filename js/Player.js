class Player {
  constructor(x, y, url, sizeX, sizeY) {
    this.sprite = new Sprite(x, y, url, sizeX, sizeY);
    this.boundingBox = {};
    this.speed = 3;
    this.speedPrima = this.speed;
    this.energy = 100;
    this.points = 0;
    this.kindOfShoot = 1; //Could be 1 to other numbers
    this.shooting = [];
  }
  itHasCollided(objectToCollide) {
    let shipTop = this.sprite.y;
    let shipRight = this.sprite.x + this.sprite.sizeX;
    let shipBottom = this.sprite.y + this.sprite.sizeY;
    let shipLeft = this.sprite.x;
    let oCollideTop = objectToCollide.sprite.y;
    let oCollideRight = objectToCollide.sprite.x + objectToCollide.sprite.sizeX;
    let oCollideBottom =
      objectToCollide.sprite.y + objectToCollide.sprite.sizeY;
    let oCollideLeft = objectToCollide.x;
    if (
      shipTop < oCollideBottom ||
      shipRight > oCollideLeft ||
      shipBottom > oCollideTop ||
      shipLeft < oCollideRight
    ) {
      return true;
    } else {
      return false;
    }
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
    {
      this.sprite[position] += this.speed * signal;

      this.boundingBox.x = this.sprite.x;
      this.boundingBox.y = this.sprite.y;
      this.boundingBox.x1 = this.sprite.x + this.sprite.sizeX;
      this.boundingBox.y1 = this.sprite.y + this.sprite.sizeY;
      // game.display.ctx.strokeStyle = "green";
      // // game.display.ctx.strokeRect (this.boundingBox.x-2 ,this.boundingBox.y-2 , this.boundingBox.sizeX+2,this.boundingBox.sizeY+2)
      // game.display.ctx.strokeRect(0, 0, 100, 100);
    }
  }
}
