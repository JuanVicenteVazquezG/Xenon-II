"uses strict";

//display = new Display(width, height, document.getElementById("myCanvas"));
//input = new Input();  //here need to put de type of device to read keyboard or joystick
//display.paintObject();
const options = {
  width: "640px",
  height: "480px",
  canvas: document.getElementById("myCanvas")
};

game = new Game();
game.start(options);