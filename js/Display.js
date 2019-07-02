class Display {
  constructor() {
    this.ctx = undefined;
    this.width = undefined;
    this.height = undefined;
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

  paintObject(objectToPaint) {
    game.display.clearDisplay();
    console.log(objectToPaint);
    game.display.ctx.drawImage(
      objectToPaint.sprite,
      objectToPaint.x,
      objectToPaint.y,
      objectToPaint.sizeX,
      objectToPaint.sizeY
    );
  }
}
