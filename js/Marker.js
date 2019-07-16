class Marker {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.point = 0;
    this.spriteLife = new Sprite(0, 0, 32, 32, 0, 0, "Images/life.png", 32, 32);
  }
  updateMarkerEnergy() {
    if (game.gameState === "playing") {
      game.display.ctx.fillStyle = "white";
      game.display.ctx.fillRect(19, 439, 102, 17);
      if (game.player.energy >= 900) {
        game.display.ctx.fillStyle = "navy";
      }
      if (game.player.energy <= 899 && game.player.energy >= 500) {
        game.display.ctx.fillStyle = "#3FFF33";
      }
      if (game.player.energy <= 499 && game.player.energy >= 300) {
        game.display.ctx.fillStyle = "yellow";
      }
      if (game.player.energy < 299) {
        game.display.ctx.fillStyle = "red";
      }

      game.display.ctx.fillRect(
        20,
        440,
        Math.floor(game.player.energy / 10),
        15
      );

      game.display.ctx.font = "30px Arial";
      game.display.ctx.textAlign = "right";
      game.display.ctx.fillStyle = "white";
      game.display.ctx.fillText(
        `Score: ${game.player.points.toString()}`,
        600,
        458
      );
      for (var i = 0; i < game.player.life; i++) {
        game.display.ctx.drawImage(
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
