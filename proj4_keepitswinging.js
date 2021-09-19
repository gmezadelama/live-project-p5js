const SQUARE_SIZE = 40;
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 400;

const RX0 = CANVAS_WIDTH / 2 - SQUARE_SIZE / 2;
const RY0 = 0;

let dx = 1;
let dy = 5;

let xPosition = 0;
let yPosition = CANVAS_HEIGHT / 2 - SQUARE_SIZE / 2;

let isDrawing = true;

let isPendulumMode = false;

let leftRightButton = null;
let pendulumButton = null;

let ignoreMouseEvents = false;

let angularVelocity = 5;
let angularAcceleration = 0;
let angle = 45;

const GRAVITY_ACC = 9;

const DAMPING = 0.995;

const Line_Length = 200; // only for pendulum movement

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  createButtons();
  setupLeftRighMovement();
}

function createButtons() {
  leftRightButton = createButton('left-right');
  leftRightButton.style('background-color', 'blue');
  leftRightButton.style('color', 'white');
  leftRightButton.position(600, 10);
  leftRightButton.mousePressed(setupLeftRighMovement);
  
  pendulumButton = createButton('pendulum');
  pendulumButton.style('background-color', 'blue');
  pendulumButton.style('color', 'white');
  pendulumButton.position(700, 10);
  pendulumButton.mousePressed(setupPendulumMode);
}

function draw() {
  background(220);
  if (isPendulumMode) {
    drawPendulumMovement();
  } else {
    drawLeftRightMovement();
  }
}

function setupLeftRighMovement() {
  isPendulumMode = false;
  ignoreMouseEvents = true;
  xPosition = 0;
  yPosition = CANVAS_HEIGHT / 2 - SQUARE_SIZE / 2;
}

function drawLeftRightMovement() {
  drawConnectingLine();
  drawRedSquare();
  drawLRBlueSquare();
}

function setupPendulumMode() {
  isPendulumMode = true;
  ignoreMouseEvents = true;
  angle = 45;
  angularVelocity = 0;
  angularAcceleration = 0;
}

function drawPendulumMovement() {
  drawConnectingLine();
  drawRedSquare();
  drawPendulumBlueSquare();
}

function drawPendulumBlueSquare() {
  angularAcceleration = (-GRAVITY_ACC / Line_Length) * sin(radians(angle));
  angularVelocity += angularAcceleration;
  angularVelocity *= DAMPING;
  angle += angularVelocity;
  xPosition = RX0 - Line_Length * sin(radians(angle));
  yPosition = RY0 + Line_Length * cos(radians(angle));
  translate(xPosition, yPosition);
  rotate(radians(angle))
  fill(0, 0, 255);
  rect(0, 0, SQUARE_SIZE, SQUARE_SIZE);
  
}

function mousePressed() {
  if (!ignoreMouseEvents) {
    if (isInSquareBlue()) {
      toggleDrawing();
      return;
    }
    if (!isPendulumMode) {
      yPosition = min(max(mouseY - SQUARE_SIZE / 2, 0), CANVAS_HEIGHT - SQUARE_SIZE);
    }
  } else {
    ignoreMouseEvents = false;
  }
}

function keyPressed() {
  if (!isPendulumMode) {
    if (keyCode === 32) {
      dx *= -1;
    }
    if (keyCode === UP_ARROW) {
      yPosition = max(yPosition - dy, 0);
    }
    if (keyCode === DOWN_ARROW) {
      yPosition = min(yPosition + dy, CANVAS_HEIGHT - SQUARE_SIZE);
    }
  }
}

function isInSquareBlue() {
  return (mouseX >= xPosition && mouseX <= xPosition + SQUARE_SIZE &&
         mouseY >= yPosition && mouseY <= yPosition + SQUARE_SIZE);
}

function toggleDrawing() {
  isDrawing = !isDrawing;
  if (isDrawing) {
    loop();
  } else {
    noLoop();
  }
}

function drawRedSquare() {
  fill(255, 0, 0);
  rect(RX0, RY0, SQUARE_SIZE, SQUARE_SIZE);
  
}

function drawLRBlueSquare() {
  xPosition += dx;
  if (xPosition > CANVAS_WIDTH - SQUARE_SIZE) {
    dx *= -1;
    xPosition = CANVAS_WIDTH - SQUARE_SIZE;
  }
  if (xPosition < 0) {
    dx *= -1;
    xPosition = 0;
  }
  fill(0, 0, 255);
  rect(xPosition, yPosition, SQUARE_SIZE, SQUARE_SIZE);
}
  
function drawConnectingLine() {
  stroke(0, 0, 0);
  line(xPosition + SQUARE_SIZE / 2, yPosition + SQUARE_SIZE / 2, CANVAS_WIDTH / 2, SQUARE_SIZE / 2);
}
