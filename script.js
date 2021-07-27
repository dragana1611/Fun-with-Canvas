'use strict';

const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.strokeStyle = 'BADA55';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 80;
ctx.globalCompositeOperation = 'screen';

let isDrawing = false; //flag
let lastX = 0; // The last drawn positions (lastX, lastY)
let lastY = 0; // The last drawn positions (lastX, lastY)
let hue = 0;
let direction = true;

function draw(e) {
  if (!isDrawing) return; // stop the fn from running when they are not moused down

  ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
  ctx.beginPath();
  // start from - defines the starting point of the line

  ctx.moveTo(lastX, lastY);
  // go to - defines the ending point of the line

  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.closePath();
  ctx.stroke(); // method to actually draw the line
  [lastX, lastY] = [e.offsetX, e.offsetY];

  hue++;
  if (hue >= 360) {
    hue = 0;
  }
  if (ctx.lineWidth >= 80 || ctx.lineWidth <= 1) {
    direction = !direction;
  }

  if (direction) {
    ctx.lineWidth++;
  } else {
    ctx.lineWidth--;
  }
}

canvas.addEventListener('mousedown', e => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];
}); //eventListener which is going to capture the mousedown event. This happens when the mouse button is being pushed down

canvas.addEventListener('mousemove', draw);

//We also need to handle the mouseup event for when the button is no longer being pressed. We also want to stop drawing if the mouse leaves the canvas area.
canvas.addEventListener('mouseup', () => (isDrawing = false));
canvas.addEventListener('mouseout', () => (isDrawing = false));

//clear function that will clear out the canvas and set it back to blank to start again.
const btnClear = document.querySelector('.clear');
btnClear.addEventListener('click', () => {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
