var video;
var vScale = 1;
var angle = 20;
var r = 8; //radius for brush
var frameCounter = 0;
const particles = [];
const flock = []

p5.disableFriendlyErrors = true; // disables FES
var subject;
var drawing = false;

var strokeWeightSlider;
var paintCamera;
var paintPhoto;

let alignSlider, cohesionSlider, separationSlider;

function setup(){
  let canvas = createCanvas(windowWidth/1.5, windowHeight/1.5);
  canvas.parent('sketch-box');
  pixelDensity(1);
  paintCamera = createButton('Paint this!')
  paintCamera.mousePressed(paintImage);
  paintPhoto = createButton('Paint landscape!')
  paintPhoto.mousePressed(loadPhoto);

  paintCamera.parent('control-panel');
  paintPhoto.parent('control-panel');

  strokeWeightSlider = createSlider(2,10,3,1);

  let constraints = {
    video: {
      mandatory: {
        maxHeight: 100
      },
      optional: [{ maxFrameRate: 30 }]
    },
    audio: false
  };
  video = createCapture(constraints, function(stream) {
    console.log(stream);
  });
  video.parent('control-panel');
  strokeWeightSlider.parent('control-panel');
  background(51);
  for(let i = 0; i < 10; i++) {
    particles[i] = new Particle(random(width),random(height));
  }
  for (let i = 0; i < 50; i++) {
    flock.push(new Boid());
  }
}
function paintImage() {
  subject = video.get();
  drawing = true;
}
function loadPhoto() {
  subject = loadImage('bsg.jpg');
  drawing = true;
}
function draw() {
 // background(51);
  frameCounter++;
  angle = 0.1*frameCounter;
  if(drawing) {
    for(let particle of particles) {
      particle.update();
   }
  }
}
