var video;
var vScale = 8;
var particles = [];
p5.disableFriendlyErrors = true; // disables FES
var subject;
var drawing = false;


function setup(){
  createCanvas(windowWidth-300, windowHeight-100);
  pixelDensity(1);
  button = createButton('Paint this!')
  button.mousePressed(paintImage);
  let constraints = {
    video: {
      mandatory: {
        maxWidth: 300,
        maxHeight: 300
      },
      optional: [{ maxFrameRate: 30 }]
    },
    audio: false
  };
  video = createCapture(constraints, function(stream) {
    console.log(stream);
  });
  background(51);
  for(let i = 0; i < 1000; i++) {
    particles[i] = new Particle(random(width),random(height));
  }
}
function paintImage() {
  subject = video.get();
  drawing = true;
}
function draw() {
  if(drawing) {
    for(let i = 0; i < particles.length; i++) {
      particles[i].update();
    }
  }

}