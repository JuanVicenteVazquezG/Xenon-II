class Shooting {
  constructor(x, y, url, sizeX, sizeY, timeLife, speed) {
    this.sprite = new Sprite(x, y, url, sizeX, sizeY);
    this.timeLife = timeLife;
    this.speed = speed;
    this.movementId = setInterval(() => {
      this.sprite.y-=speed;
    }, 10);
    this.timeId = setTimeout(() => {
      clearInterval(this.movementId);
      game.player.shooting.shift();
    }, this.timeLife);
  }
}
