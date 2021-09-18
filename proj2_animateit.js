const SQUARE_SIZE = 40;
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 400;

let dx = 1;

let xPosition = 0;

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
}

function draw() {
  background(220);
  drawConnectingLine();
  drawRedSquare();
  drawBlueSquare();
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
  rect(xPosition, CANVAS_HEIGHT / 2 - SQUARE_SIZE / 2, SQUARE_SIZE, SQUARE_SIZE);
}

function drawConnectingLine() {
  stroke(0, 0, 0);
  line(xPosition + SQUARE_SIZE / 2, CANVAS_HEIGHT / 2, CANVAS_WIDTH / 2, SQUARE_SIZE / 2);
}
