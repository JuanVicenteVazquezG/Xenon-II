class Player {
  constructor() {
    this.x = 0;
    this.y = 0;
    let sprite= new Image();
    sprite.src="Images/ship4.png";
  }

  changePosition(keyPressed) {
    if (keyPressed.down === true) {
      this.y++;
      keyPressed.down = false;
    }
    if (keyPressed.up === true) {
      this.y--;
      keyPressed.up = false;
    }
    if (keyPressed.left === true) {
      this.x--;
      keyPressed.left = false;
    }
    if (keyPressed.right === true) {
      this.x++;
      keyPressed.right = false;
    }
  }
}
