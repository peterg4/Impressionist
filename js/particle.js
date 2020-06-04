function Particle(x,y) {
  this.x = x;
  this.y = y;
  this.currentColor = [0, 0, 0];

  this.update = () => {
    strokeWeight(random(strokeWeightSlider.value()-1,strokeWeightSlider.value()+1));
    var px = floor(this.x/vScale);
    var py = floor(this.y/vScale);
    var col = subject.get(px,py);
    var rLive;
    var gLive;
    var bLive;
    if(!(this.currentColor[0] == 0 && this.currentColor[1] == 0 && this.currentColor[2] == 0)) {
      rLive = floor((col[0]+this.currentColor[0])/2*.9);
      gLive = floor((col[2]+this.currentColor[1])/2*.9);
      bLive = floor((col[2]+this.currentColor[2])/2*.9);
    } else {  
      rLive = floor(col[0]*1.1);
      gLive = floor(col[2]*1.1);
      bLive = floor(col[2]*1.1);
    }
    let x = floor(random(0,3));
    this.currentColor = col;
    stroke(rLive, gLive, bLive, 150);

    newx = mouseX + r*Math.cos(angle)*random(-1,1);
    newy = mouseY + r*Math.sin(angle)*random(-1,1);




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