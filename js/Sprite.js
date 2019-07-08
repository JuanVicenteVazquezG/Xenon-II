class Sprite{
constructor (positionToReadX,positionToReadY,positionToReadSizeX,positionToReadSizeY,x,y,url,sizeX,sizeY){
        this.positionToReadX=positionToReadX;
        this.positionToReadY=positionToReadY;
        this.positionToReadSizeX=positionToReadSizeX;
        this.positionToReadsizeY=positionToReadSizeY;
        this.x=x;
        this.y=y;
        this.sprite= new Image()
        this.sprite.src=url;
        this.sizeX=sizeX;
        this.sizeY=sizeY;
      };
}