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
    this.display.paintObject.bind(this)(this.player);
    this.SetAnimationLoop();
  }

  start(options) {

    console.log(options)
    //Assign control keys or decide device control
    this.input.initializeKeyRead();

    //Inicalize canvas with de class Display
    this.display.initialize(options);

    // starts infiniteLoop Game
    this.SetAnimationLoop();
  }
  
  SetAnimationLoop(){
    this.intervalGameId= window.requestAnimationFrame(this._update.bind(this));
  }
  unSetAnimationloop(){
    window.cancelAnimationFrame(this.intervalGameId);
    game.intervalGameId = undefined;
  }
}
