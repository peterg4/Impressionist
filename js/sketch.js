var video;
var vScale = 1;
var angle = 20;
var r = 8; //radius for brush
var frameCounter = 0;
const particles = [];
const flock = []

var xOff = 0;
var yOff = 0;

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
  xOff = width/2;
  yOff = height/2;
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
    particles[i] = new Particle(width/2,height/2);
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
  //console.log(subject);
  //console.log(subject._pixelsState.width, subject._pixelsState.height);
  //resizeCanvas(subject._pixelsState.width, subject._pixelsState.height);
  drawing = true;
}
function draw() {
 // background(51);
  frameCounter++;
  angle = 0.1*frameCounter;
  if(drawing) {
    xOff+=random(-4,4);
    yOff+=random(-4,4);
    xOff.constrain(xOff, 0, width);
    yOff.constrain(yOff, 0, height);
    for(let particle of particles) {
      particle.update();
   }
  }
}
