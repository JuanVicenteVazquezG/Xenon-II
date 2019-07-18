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
    console.log ("llego hasta aqui1")
    game.display.clearDisplay();
    console.log ("llego hasta aqui2")
  }

  clearDisplay() {

    game.display.ctx.fillStyle = "black";
    game.display.ctx.clearRect(0, 0, this.width, this.height);
  }

  paintObject() {
    this.clearDisplay(this);

    this.objectsToPaint.forEach(objecToShow => {
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
    });
  }

  addObjectsToPaint(aSprite, self) {
    this.objectsToPaint.push(aSprite); //==>> game
  }
  deletesAllObjectsPainted() {
    while (this.objectsToPaint.length > 0) {
      this.objectsToPaint.pop();
    }
  }
}
