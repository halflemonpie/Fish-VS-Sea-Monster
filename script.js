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
// use class to create models for similar objects
class Cell {
  constructor(x, y) {
    //set the cell coordinate to equal to the position
    this.x = x;
    this.y = y;
    this.width = cellSize;
    this.height = cellSize;
  }

  draw() {
    // use stroke(border) to draw black rectangle for the cells
    ctx.strokeStyle = "Black";
    ctx.strokeRect(this.x, this.y, this.width, this.height);
  }
}
// now we need to draw all the cells on the board with a function
function createGrid() {
  // y starts at below the top bar, which is cell size
  for (let y = cellSize; y < canvas.height; y += cellSize) {
    // x starts at 0
    for (let x = 0; x < canvas.width; x += cellSize) {
      // push the cell to the array of game grid, where x,y is the position of the cell
      gameGrid.push(new Cell(x, y));
    }
  }
}
createGrid();
// after creating the game grid, now use a function and loop to draw the grid
function handleGameGrid() {
  for (let i = 0; i < gameGrid.length; i++) {
    gameGrid[i].draw();
  }
}
// projectiles
// defenders
// enemies
// resources
// utilities
// function to draw the game again and again (everything)
function animate() {
  // call the draw function to draw blue
  ctx.fillStyle = "blue";
  // built in draw function to draw rectangle 0,0 is the start position (x,y) and the other variables are the dimension
  ctx.fillRect(0, 0, controlBar.width, controlBar.height);
  // draw out the grid
  handleGameGrid();
  // built in animate function to run animation (recursion to run again and again)
  requestAnimationFrame(animate);
}

animate();
