class Marker{
    constructor (x,y){
        this.x=x;
        this.y=y;    }
    createMarker (){
        if (game.player.energy<=0) game.player.energy=0;
        game.display.ctx.fillStyle="white";
        game.display.ctx.fillRect(19,439,102,17);
        game.display.ctx.fillStyle="#3FFF33";
        game.display.ctx.fillRect(20,440,game.player.energy,15)
        game.display.ctx.fon
    }
    deleteMarker (){}
}