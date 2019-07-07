class Marker{
    constructor (x,y){
        this.x=x;
        this.y=y;  
    this.point=0;  }
    updateMarkerEnergy(){
        if (game.player.energy<=0) game.player.energy=0;
        game.display.ctx.fillStyle="white";
        game.display.ctx.fillRect(19,439,102,17);
        game.display.ctx.fillStyle="#3FFF33";
        game.display.ctx.fillRect(20,440,Math.floor(game.player.energy/10),15)
        
    }
    
    deleteMarker (){}
}