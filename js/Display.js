class Display {
  constructor() {
    this.ctx = undefined;
    this.width = undefined;
    this.height = undefined;
    this.objectsToPaint = [];
  }

  initialize(options) {
    this.width = options.width;
    this.height = options.height;
    options.canvas.width = options.width;
    options.canvas.height = options.height;
    this.ctx = options.canvas.getContext("2d");
    game.display.clearDisplay();
  }

  clearDisplay() {
    this.ctx.fillStyle = "black";
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  paintObject() {
    game.display.clearDisplay();
    console.log (`tengo ${game.display.objectsToPaint.length} en mente`)
    game.display.objectsToPaint.forEach(objecToShow => {
      
      game.display.ctx.drawImage(
        objecToShow.sprite,
        objecToShow.x,
        objecToShow.y,
        objecToShow.sizeX,
        objecToShow.sizeY
      );
    });
  }

  addObjectsToPaint(aSprite) {
    this.objectsToPaint.push(aSprite);
  }
  deletesAllObjectsPainted() {
    while (this.objectsToPaint.length > 0) {
      this.objectsToPaint.pop();
    }
  }
}
