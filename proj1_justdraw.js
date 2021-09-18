const SQUARE_SIZE = 40;
const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 400;

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
  fill(0, 0, 255);
  rect(0, CANVAS_HEIGHT / 2 - SQUARE_SIZE / 2, SQUARE_SIZE, SQUARE_SIZE);
}

function drawConnectingLine() {
  stroke(0, 0, 0);
  line(SQUARE_SIZE / 2, CANVAS_HEIGHT / 2, CANVAS_WIDTH / 2, SQUARE_SIZE / 2);
}
