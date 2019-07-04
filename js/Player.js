class Player {
  constructor(x, y, url, sizeX, sizeY) {
    this.sprite = new Sprite(x, y, url, sizeX, sizeY);
    this.boundingBox = {}
    this.speed = 10;
    this.energy = 100;
    this.points = 0;
    this.kindOfShoot = 1; //Could be 1 to other numbers
    this.shooting = [];
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

    // // //Left
    // if (
    //   this.boundingBox.x < ObjectToCollide.boundingBox.x1 &&
    //   this.boundingBox.y > ObjectToCollide.boundingBox.Y &&
    //   this.boundingBox.y1 < ObjectToCollide.boundingBox.y1
    // ) {
    //   alert("collides");
    // }

    // //right
    // if (
    //   this.boundingBox.x1 > ObjectToCollide.boundingBox.x &&
    //   this.boundingBox.y > ObjectToCollide.boundingBox.Y &&
    //   this.boundingBox.y1 < ObjectToCollide.boundingBox.y1
    // ) {
    //   return true;
    // }
    // //top
    // if (
    //   this.boundingBox.y < ObjectToCollide.boundingBox.y1 &&
    //   this.boundingBox.x > ObjectToCollide.boundingBox.x &&
    //   this.boundingBox.x1 < ObjectToCollide.boundingBox.x1
    // ) {
    //   return true;
    // }

    return false;
  }

  updatePosition(x, y) {
    this.sprite.x = x;
    this.sprite.y = y;
    this.boundingBox.x = this.sprite.x;
    this.boundingBox.y = this.sprite.y;
    this.boundingBox.x1 = this.sprite.x + this.sprite.sizeX;
    this.boundingBox.y1 = this.sprite.y + this.sprite.sizeY;
  }
}
