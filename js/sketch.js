var video;
var vScale = 1;
var angle = 20;
var r = 8; //radius for brush
var frameCounter = 0;
var particles = [];
const bundles = []

p5.disableFriendlyErrors = true; // disables FES
var subject;
var drawing = false;

var strokeWeightSlider;
var paintCamera;
var paintPhoto;

var input;
function setup(){
  input = createFileInput(handleFile);
  input.position(0, 0);
  let canvas = createCanvas(windowWidth/1.1, windowHeight/1.1);
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
  for(let i = 0; i < 100; i++) {
    particles = [];
    for(let j= 0; j < 10; j++) {
      particles[j] = new Particle(width/2,height/2);
    }
    bundles[i] = new ParticleBundle(particles, random(0, width),random(0,height));
  }
}

function handleFile(file) {
  print(file);
  if (file.type === 'image') {
    subject = loadImage(file.data, '');
  } else {
    subject = null;
  }
}

function paintImage() {
  subject = video.get();
  drawing = true;
}

function loadPhoto() {
  if(subject === undefined)
    subject = loadImage('tk.jpg')
  drawing = true;
}
function draw() {
 // background(51);
  frameCounter++;
  angle = 0.1*frameCounter;
  if(drawing) {
    for(let b of bundles) {
      b.update();
   }
  }
}
