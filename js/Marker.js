class Marker {
  constructor(game,display,player,x, y) {
    this.game=game;
    this.display=display;
    this.player=player;
    this.x = x;
    this.y = y;
    this.point = 0;
    this.spriteLife = new Sprite(0, 0, 32, 32, 0, 0, "Images/life.png", 32, 32);
    this.fontFamily = "Xenon2";
  }
  updateMarkerEnergy() {
    if (this.game.gameState === "playing") {
      this.display.ctx.fillStyle = "white";
      this.display.ctx.fillRect(19, 439, 102, 17);
      if (this.player.energy >= 900) {
        this.display.ctx.fillStyle = "navy";
      }
      if (this.player.energy <= 899 && this.player.energy >= 500) {
        this.display.ctx.fillStyle = "#3FFF33";
      }
      if (this.player.energy <= 499 && this.player.energy >= 300) {
        this.display.ctx.fillStyle = "yellow";
      }
      if (this.player.energy < 299) {
        this.display.ctx.fillStyle = "red";
      }

      this.display.ctx.fillRect(
        20,
        440,
        Math.floor(this.player.energy / 10),
        15
      );

     this.display.ctx.font = `20px ${this.fontFamily}`;
      this.display.ctx.textAlign = "right";
      this.display.ctx.fillStyle = "white";
      this.display.ctx.fillText(
        `Score: ${this.player.points.toString()}`,
        600,
        458
      );
      for (var i = 0; i < this.player.life; i++) {
        this.display.ctx.drawImage(
          this.spriteLife.sprite,
          0,
          0,
          32,
          32,
          150 + this.x + 50 * i,
          430,
          32,
          32
        );
      }
    }
  }
}
