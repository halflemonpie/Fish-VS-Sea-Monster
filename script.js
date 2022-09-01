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
const defenders = [];
let numberOfResource = 300;

// mouse
// create mouse with position and minimal area
const mouse = {
  x: 10,
  y: 10,
  width: 0.1,
  height: 0.1,
};

// built in function to return the rectangle located
let canvasPosition = canvas.getBoundingClientRect();
// create event listener to mouse movement
canvas.addEventListener("mousemove", (e) => {
  // set mouse position, since event position doesn't equal to the actual canvas position, need to - canvas position
  mouse.x = e.x - canvasPosition.left;
  mouse.y = e.y - canvasPosition.top;
});

canvas.addEventListener("mouseleave", (e) => {
  // set mouse position back to undefined when leave
  mouse.x = undefined;
  mouse.y = undefined;
});

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
    // if there is collision draw the selected cell out
    if (mouse.x && mouse.y && collision(this, mouse)) {
      // use stroke(border) to draw black rectangle for the cells
      ctx.strokeStyle = "Black";
      ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
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
class Defender {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = cellSize;
    this.height = cellSize;
    this.shooting = false;
    this.health = 100;
    this.projectiles = [];
    this.timer = 0;
  }

  draw() {
    ctx.fillStyle = "blue";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = "gold";
    // display for health
    ctx.font = "10px Arial";
    // built in method for fill text, display health at position x,y
    ctx.fillText(Math.floor(this.health), this.x, this.y);
  }
}

// add event listener for defender
canvas.addEventListener("click", () => {
  // get the correct grid position of the mouse
  const gridPositionX = mouse.x - (mouse.x % cellSize);
  const gridPositionY = mouse.y - (mouse.y % cellSize);
  if (gridPositionY < cellSize) return;
  let defenderCost = 100;
  // check and change resource
  if (numberOfResource >= defenderCost) {
    defenders.push(new Defender(gridPositionX, gridPositionY))
    numberOfResource -= defenderCost
  }
});

const handleDefender = () => {
   for (let i = 0; i < defenders.length; i++) {
    defenders[i].draw()
   } 
}

// enemies
// resources
// utilities
// function to draw the game again and again (everything)
function animate() {
  // clear the rectangle so that only one rectangle can be drawn
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // call the draw function to draw blue
  ctx.fillStyle = "blue";
  // built in draw function to draw rectangle 0,0 is the start position (x,y) and the other variables are the dimension
  ctx.fillRect(0, 0, controlBar.width, controlBar.height);
  // draw out the grid
  handleGameGrid();
  // draw out defender
  handleDefender();
  // built in animate function to run animation (recursion to run again and again)
  requestAnimationFrame(animate);
}

animate();

// function for collision
function collision(first, second) {
  if (
    // all have to be false to return true
    !(
      first.x > second.x + second.width ||
      first.x + first.width < second.x ||
      first.y > second.y + second.height ||
      first.y + first.height < second.y
    )
  ) {
    return true;
  }
}
