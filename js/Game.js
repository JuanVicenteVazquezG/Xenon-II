class Game {
  constructor(options) {
    this.input = new Input();
    this.display = new Display();
    this.player = new Player();
    this.enemy = new Enemy();
    this.collider = new Collider();
    this.marker = new Marker();
    this.intervalGameId = undefined;
    this.initImage= new Sprite (0,0,"Images/splash.png",640,480);
    this.name=this.initImage;
  }

  pause() {}

  _update() {
    this.display.paintObject.bind(this)(this.name);
    this.SetAnimationLoop();
  }

  start(options) {

    //Inicalize canvas with de class Display
    this.display.initialize(options);

    let loopUntilKeypressed=document.addEventListener('keyup',()=>{
        //Assign control keys or decide device control
         this.name=this.player.sprite;
          this.input.initializeKeyRead();
          loopUntilKeypressed.
    })

    // starts infiniteLoop Game
    this.SetAnimationLoop();
  }

  SetAnimationLoop() {
    this.intervalGameId = window.requestAnimationFrame(this._update.bind(this));
  }
  unSetAnimationloop() {
    window.cancelAnimationFrame(this.intervalGameId);
    game.intervalGameId = undefined;
  }
}
