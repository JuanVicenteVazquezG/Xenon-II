"uses strict";

const options = {
  width: "640",
  height: "480",
  canvas: document.getElementById("myCanvas")
};
var game;
var splashMusic=document.getElementById("splashmusic");

splashMusic.addEventListener("ended", function(){
  splashMusic.currentTime = 0;
 
});
var myText=document.getElementById("myText");
var myImage = document.getElementById("myImage");
myImage.addEventListener("click" || "keypress", () => {
  options.canvas.style.display="block";
  myImage.style.display="none"
  myText.style.display="none";
  game = new Game();
  game.start(options);
});
