var video;
var vScale = 1;
var angle = 20;
var r = 8; //radius
var frameCounter = 0;//framecounter

const particles = [];
const flock = []

p5.disableFriendlyErrors = true; // disables FES
var subject;
var drawing = false;

var strokeWeightSlider;
var paintCamera;
var paintPhoto;

function setup(){
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  paintCamera = createButton('Paint this!')
  paintCamera.mousePressed(paintImage);
  paintPhoto = createButton('Paint landscape!')
  paintPhoto.mousePressed(loadPhoto);

  strokeWeightSlider = createSlider(2,10,3,1);

  let constraints = {
    video: {
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
function loadPhoto() {
  subject = loadImage('bsg.jpg');
  drawing = true;
}
function draw() {
  frameCounter++;
  angle = 0.1*frameCounter;
  if(drawing) {
    for(let i = 0; i < particles.length; i++) {
      particles[i].update();
    }
  }
}

function handleFiles(files) {
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    
    if (!file.type.startsWith('image/')){ continue }
    
    const img = document.createElement("img");
    img.classList.add("obj");
    img.file = file;
    preview.appendChild(img); // Assuming that "preview" is the div output where the content will be displayed.
    
    const reader = new FileReader();
    reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
    reader.readAsDataURL(file);
  }
}