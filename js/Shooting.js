class Shooting {
  constructor(game,shootId,positionToReadX,positionToReadY,positionToReadSizeX,positionToReadSizeY,x, y, url, sizeX, sizeY, timeLife, speed) {
    this.game=game;
    this.shootId=shootId;
    this.sprite = new Sprite(positionToReadX,positionToReadY,positionToReadSizeX,positionToReadSizeY,x, y, url, sizeX, sizeY);
    this.sound = new Audio();
    this.sound.src = "Sounds/fire_missile.wav";
    this.sound.play();
    this.timeLife = timeLife;
    this.speed = speed;
    this.boundingBox = {};
    this.movementId = setInterval(() => {
      if (this.game.gameState==="playing") {
      this.sprite.y -= speed;
      this.boundingBox.x = this.sprite.x;
      this.boundingBox.y = this.sprite.y;
      this.boundingBox.x1 = this.sprite.x + this.sprite.sizeX;
      this.boundingBox.y1 = this.sprite.y + this.sprite.sizeY;
    }
    }, 10);

    this.timeId = setTimeout(() => {
      clearInterval(this.movementId);
      this.player.shooting.shift(); //ojo
    }, this.timeLife);
  }

  itHasCollided(ObjectToCollide) {
    //top
    if (
      this.boundingBox.y < ObjectToCollide.boundingBox.y1 &&
      this.boundingBox.x > ObjectToCollide.boundingBox.x &&
      this.boundingBox.x1 < ObjectToCollide.boundingBox.x1
    ) {
      return true;
    }

    return false;
  }
}
