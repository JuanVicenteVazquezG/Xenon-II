class Game {
  constructor(options) {
    this.input = new Input();
    this.display = new Display();
    this.player = new Player();
    this.enemy = new Enemy();
    this.collider = new Collider();
    this.marker = new Marker();
    this.intervalGameId = undefined;
  }

  pause() {}

  _update() {
   

    if (this.input.key.down === true) {
  
      this.player.changePosition(this.input.key);
      this.input.key.down = false;
    }
    if (this.input.key.up === true) {
     
      this.player.changePosition(this.input.key);
      this.input.key.up = false;
    }
    if (this.input.key.right === true) {
     
      this.player.changePosition(this.input.key);
      this.input.key.right = false;
    }

    if (this.input.key.left === true) {
 
      this.player.changePosition(this.input.key);
      this.input.key.left = false;
    }

    this.display.paintObject(this.player);
    this.intervalGameId = window.requestAnimationFrame(this._update.bind(this));
  }

  start() {
    //Assign control keys or decide device control
    this.input.initializeKeyRead();

    //Inicalize canvas with de class Display
    this.display.initialize(options.width, options.height, options.canvas);
    // starts infiniteLoop Game
    this.intervalGameId = window.requestAnimationFrame(this._update.bind(this));
  }
}
