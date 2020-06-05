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

  let canvas = createCanvas(windowWidth/1.1, windowHeight/1.1);
  canvas.parent('sketch-box');

  strokeWeightSlider = createSlider(2,10,3,1);
  strokeWeightSlider.parent('control-panel');

  paintPhoto = createButton('Paint Upload')
  paintPhoto.mousePressed(loadPhoto);
  paintPhoto.parent('control-panel');

  input = createFileInput(handleFile);
  input.parent('control-panel');

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
