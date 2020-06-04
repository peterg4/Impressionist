function Particle(x,y) {
  this.x = x;
  this.y = y;
  this.currentColor = [0, 0, 0];

  this.update = (xOff, yOff) => {
    
    strokeWeight(random(strokeWeightSlider.value()-1,strokeWeightSlider.value()+1));
    let px = floor(this.x/vScale);
    let py = floor(this.y/vScale);
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
    let x = floor(random(0,3));
    this.currentColor = col;
    stroke(rLive, gLive, bLive, 150);

    newx = xOff + r*Math.cos(angle)*random(-1,1);
    newy = yOff + r*Math.sin(angle)*random(-1,1);



    if(newx !=0 && xOff != 0) {
      line(this.x, this.y, newx, newy);
    }
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