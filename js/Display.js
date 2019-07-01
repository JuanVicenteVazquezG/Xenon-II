class Display {
  constructor() {
    this.ctx = undefined;
    this.width=undefined;
    this.height=undefined;
  }
  initialize(width, height, canvasObject) {
    this.width=parseInt(width.split("px")[0]);
    this.height=parseInt(height.split("px")[0]);
    canvasObject.style.width = width;
    canvasObject.style.height = height;
    this.ctx = canvasObject.getContext("2d");
    this.clearScreen();
    console.log(this.width);
    console.log(this.height);
  }

  clearScreen() {
    
    this.ctx.fillStyle = "black";
    this.ctx.clearRect(0, 0, this.width, this.height);
   
  }

  paintObject(ObjectToPaint) {
    this.clearScreen();
    let sprite=ObjectToPaint.sprite;
    this.ctx.drawImage(sprite ,ObjectToPaint.x, ObjectToPaint.y);
  }
}
