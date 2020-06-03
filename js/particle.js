function Particle(x,y) {
  this.x = x;
  this.y = y;
  this.currentColor = [0, 0, 0];

  this.update = () => {
    strokeWeight(random(1,4));
    var px = floor(this.x/vScale);
    var py = floor(this.y/vScale);
    var col = video.get(px,py);
    var rLive;
    var gLive;
    var bLive;
    if(!(this.currentColor[0] == 0 && this.currentColor[1] == 0 && this.currentColor[2] == 0)) {
      rLive = floor((col[0]+this.currentColor[0])/2);
      gLive = floor((col[2]+this.currentColor[1])/2);
      bLive = floor((col[2]+this.currentColor[2])/2);
    } else {  
      rLive = floor(col[0]);
      gLive = floor(col[2]);
      bLive = floor(col[2]);
    }
    this.currentColor = col;
    stroke(rLive, gLive, bLive);
    newx = this.x+random(-5,5);
    newy = this.y+random(-5,5);
    line(this.x, this.y, newx, newy)
    this.x = newx;
    this.y = newy;
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
  }

  this.show = () => {
    noStroke();
  }
}