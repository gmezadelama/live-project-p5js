const SQUARE_SIZE = 40;
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 400;

let dx = 1;
let dy = 5;

let xPosition = 0;
let yPosition = CANVAS_HEIGHT / 2 - SQUARE_SIZE / 2;

let isDrawing = true;


function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
}

function draw() {
  background(220);
  drawConnectingLine();
  drawRedSquare();
  drawBlueSquare();
}

function mousePressed() {
  if (isInSquareBlue()) {
    toggleDrawing();
    return;
  }
  yPosition = min(max(mouseY - SQUARE_SIZE, 0), CANVAS_HEIGHT - SQUARE_SIZE);
}

function keyPressed() {
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
  rect(CANVAS_WIDTH / 2 - SQUARE_SIZE / 2, 0, SQUARE_SIZE, SQUARE_SIZE);
  
}

function drawBlueSquare() {
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
