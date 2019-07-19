class Player {
  constructor(game,
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
    this.game=game;
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
    this.invencible="Images/invencible.png"
    this.normalShip="Images/Ship.png"
    this.life = 2;
    this.boundingBox = {};
    this.speed = 5;

    this.energy = 1000;
    this.points = 0;
    this.kindOfShoot = 1; //Could be 1 to other numbers
    this.shooting = [];
    this.shootId = 0;
    this.syncMovWSpritesCounter = 4;
    this.busySyncMov = false;
    this.shipExplosion = new Audio();
    this.shipExplosion.src = "Sounds/big_explosion.wav";
    this.shipCollide = new Audio();
    this.shipCollide.src = "Sounds/hit_background.wav";
    this.playerCreated = new Audio();
    this.playerCreated.src = "Sounds/player_created.wav";
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
    console.log ( this.speed) 
    this.boundingBox.x = this.sprite.x;
    this.boundingBox.y = this.sprite.y;
    this.boundingBox.x1 = this.sprite.x + this.sprite.sizeX;
    this.boundingBox.y1 = this.sprite.y + this.sprite.sizeY;
  }
  synchronizationMovementWSprites() {
    if (this.busySyncMov === false) {
      this.busySyncMov = true;
      this.synMovWSpritesId = setTimeout(() => {
        this.sprite.positionToReadX =
          this.sprite.positionToReadSizeX * this.syncMovWSpritesCounter;
        this.busySyncMov = false;
      }, 30);
    }
  }
  //Comesback the ship to original position
  normalizerShip() {
    if (this.busySyncMov === false) {
      this.busySyncMov = true;
      if (this.syncMovWSpritesCounter < 3)
        this.syncMovWSpritesCounter++;
      if (this.syncMovWSpritesCounter > 3)
        this.syncMovWSpritesCounter--;
      this.busySyncMov = false;
      this.synchronizationMovementWSprites();
      this.busySyncMov = false;
    }
  }

  deathShip() {
    if (this.game.gameState === "playing") {
     
    }
  }

  isAlife() {
    if (this.game.gameState === "playing") {
      if (this.life === 0 && this.energy <= 0) {
 
        this.shipExplosion.play();
        this.deathShip();
        return false;
      } else if (this.life >= 1 && this.energy <= 0) {
        
      this.shipExplosion.play();
        this.energy = 1000;
        this.life -= 1;
        this.deathShip();
        this.playerCreated.play();
        return true;
      }
    }
  }
}
