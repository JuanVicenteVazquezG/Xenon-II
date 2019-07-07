class Enemy {
  constructor(x, y, url, sizeX, sizeY,typeOfEnemy=1) {
    this.sprite = new Sprite(x, y, url, sizeX, sizeY);
    this.speed = 1;
    this.enemyExplosion=new Audio();
    this.enemyExplosion.src="Sounds/small_explosion.wav"
    this.enemyExplosionAtlas=new Image();
    this.enemyExplosionAtlas.src="Images/explodeEnemy/explode64.png"
    this.boundingBox = {};
    this.movementId = setInterval(() => {
      this.sprite.y += this.speed;
      this.boundingBox.x = this.sprite.x;
      this.boundingBox.y = this.sprite.y;
      this.boundingBox.x1 = this.sprite.x + this.sprite.sizeX;
      this.boundingBox.y1 = this.sprite.y + this.sprite.sizeY;
    }, 10);
  }
}
