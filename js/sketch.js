var video;
var vScale = 8;
var particles = [];
p5.disableFriendlyErrors = true; // disables FES


function setup(){
  createCanvas(windowWidth/2, windowHeight/2);
  pixelDensity(1);
  let constraints = {
    video: {
      mandatory: {
        maxWidth: 100,
        maxHeight: 100
      },
      optional: [{ maxFrameRate: 1 }]
    },
    audio: false
  };
  video = createCapture(constraints, function(stream) {
    console.log(stream);
  });
  background(51);
  for(let i = 0; i < 200; i++) {
    particles[i] = new Particle(random(width),random(height));
  }
}

function draw() {
  for(let i = 0; i < particles.length; i++) {
    particles[i].update();
  }

}