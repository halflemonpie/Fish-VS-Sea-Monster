const canvas = document.getElementById("canvas1");
// ctx is used to get draw method for 2d object
const ctx = canvas.getContext("2d");

// same with the size in stylesheet
canvas.width = 900;
canvas.height = 600;

// global variables
const cellSize = 100;
const cellGap = 3;
const gameGrid = [];

// game board
//control bar is the top bar to select defenders
const controlBar = {
  // width of the bar is equal to the width of the canvas
  width: canvas.width,
  // height is equal to the size of one cell (which is 100)
  height: cellSize,
};
// projectiles
// defenders
// enemies
// resources
// utilities
// function to draw the game again and again (everything)
function animate() {
  // call the draw function to draw blue
  ctx.fillStyle = "blue";
  // built in draw function to draw rectangle 0,0 is the start position (x,y) and the other variables are the end
  ctx.fillRect(0, 0, controlBar.width, controlBar.height);
  // built in animate function to run animation (recursion to run again and again)
  requestAnimationFrame(animate);
}

animate();
