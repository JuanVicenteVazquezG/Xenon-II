class Display {
  constructor() {
    this.ctx = undefined;
    this.width = undefined;
    this.height = undefined;
    this.objectsToPaint = [];
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
    game.display.clearDisplay();
  }

  clearDisplay() {
    this.ctx.fillStyle = "black";
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  paintObject() {
    game.display.clearDisplay();

    game.display.objectsToPaint.forEach(objecToShow => {
     
      game.display.ctx.drawImage(
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
      // game.display.ctx.drawImage(
      //   objecToShow.sprite,
      //   objecToShow.positionToReadX,
      //   objecToShow.positionToReadY,
      //   objecToShow.positionToReadSizeX,
      //   objecToShow.positionToReadSizeY,
      //   objecToShow.x,
      //   objecToShow.y,
      //   objecToShow.sizeX,
      //   objecToShow.sizeY
      // );
    });
  }

  addObjectsToPaint(aSprite) {
    
    this.objectsToPaint.push(aSprite); //==>> game
  }
  deletesAllObjectsPainted() {
    while (this.objectsToPaint.length > 0) {
      this.objectsToPaint.pop();
    }
  }
}
