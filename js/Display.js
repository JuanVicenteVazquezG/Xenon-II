class Display {
  constructor() {
    this.ctx = undefined;
    this.width = undefined;
    this.height = undefined;

    this.fontXenon2 = new FontFace(
      "Xenon2",
      "url(../../font-family/xenon2.ttf)"
    );
  }

  initialize(options) {
    this.width = options.width;
    this.height = options.height;
    options.canvas.width = options.width;
    options.canvas.height = options.height;
    this.ctx = options.canvas.getContext("2d");
    this.clearDisplay();
  }

  clearDisplay() {
    this.ctx.fillStyle = "black";
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  paintObject(objecToShow) {
  
  
    this.ctx.drawImage(
      objecToShow.sprite,
      objecToShow.positionToReadX,
      objecToShow.positionToReadY,
      objecToShow.positionToReadSizeX,
      objecToShow.positionToReadSizeY,
      objecToShow.x,
      objecToShow.y,
      objecToShow.sizeX,
      objecToShow.sizeY
    );
  }
}
