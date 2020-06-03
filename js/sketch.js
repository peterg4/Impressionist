var video;
var vScale = 2;
var angle = 20;
var r = 8; //radius
var co = 0;
var particles = [];
p5.disableFriendlyErrors = true; // disables FES
var subject;
var drawing = false;


function setup(){
  createCanvas(windowWidth-50, windowHeight-50);
  pixelDensity(1);
  button1 = createButton('Paint this!')
  button1.mousePressed(paintImage);
  button2 = createButton('Paint landscape!')
  button2.mousePressed(loadPhoto);
  let constraints = {
    video: {
      mandatory: {
      
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
function loadPhoto() {
  subject = loadImage('landscape.jpg');
  drawing = true;
}
function draw() {
  co++;
  angle = 0.1*co;
  if(drawing) {
    for(let i = 0; i < particles.length; i++) {
      particles[i].update();
    }
  }

}