function Particle(x,y) {
  this.x = x;
  this.y = y;
  this.currentColor = [0, 0, 0];

  this.update = (xOff, yOff) => {
    
    strokeWeight(random(strokeWeightSlider.value()-1,strokeWeightSlider.value()+1));
    newx = xOff + r*Math.cos(angle)*random(-1,1);
    newy = yOff + r*Math.sin(angle)*random(-1,1);

    let px = floor(newx/vScale);
    let py = floor(newy/vScale);
    let col = subject.get(px,py);

    let rLive;
    let gLive;
    let mult = 1;
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


    let tolerance = 20

    if(Math.abs(col[0] - this.currentColor[0] < tolerance) && Math.abs(col[1] - this.currentColor[1] < tolerance) && Math.abs(col[2] - this.currentColor[2] < tolerance) ) {
      stroke(rLive, gLive, bLive, 150);
      line(this.x, this.y, newx, newy);
    } else {
      stroke(this.currentColor[0], this.currentColor[1], this.currentColor[2], 150);
      //line(this.x, this.y, newx, newy);
    }
    this.currentColor = col;
    this.x = newx;
    this.y = newy;
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
  }
}

function ParticleBundle(bundle, x, y) { 
  this.bundle = bundle;
  this.x = x;
  this.y = y;

  this.update = () => {
    this.x += random(-4,4);
    this.y += random(-4,4);
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
    for (let p of bundle) {
      p.update(this.x, this.y);
    }
  }

}