class Display {
  constructor(height, width, canvasObject) {
    this.canvasObject = canvasObject;
    this.canvasObject.style.width = width;
    this.canvasObject.style.height = height;
    this.ctx = canvasObject.getContext("2d");
  }
}
