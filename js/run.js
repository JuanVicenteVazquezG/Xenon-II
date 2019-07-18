"uses strict";

const options = {
  width: "640",
  height: "480",
  canvas: document.getElementById("myCanvas"),
  
};

var game;
(function (){
game = new Game();
game.start(options);

})();
