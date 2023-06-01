// p5jsでテトリスを作成する
// Define the size of the tetris board
const ROWS = 20;
const COLS = 10;
const BLOCK_SIZE = 30;

// Define the tetris board
let board = [];

// Define the nextTetromino variable
let nextTetromino;

// Define the current tetromino and its position
let currentTetromino;
let currentTetrominoRow;
let currentTetrominoCol;

// Define the tetromino shapes
const tetrominoShapes = [
  [[0, 1, 0], [1, 1, 1], [0, 0, 0]], // T
  [[1, 1, 0], [0, 1, 1], [0, 0, 0]], // Z
  [[0, 1, 1], [1, 1, 0], [0, 0, 0]], // S
  [[1, 1], [1, 1]], // O
  [[1, 0, 0], [1, 1, 1], [0, 0, 0]], // L
  [[0, 0, 1], [1, 1, 1], [0, 0, 0]], // J
  [[1, 1, 1, 1]], // I
];

// Define the colors of the tetromino shapes
const tetrominoColors = [
  [0, 255, 255], // I
  [255, 255, 0], // O
  [0, 255, 0], // S
  [255, 0, 0], // Z
  [255, 128, 0], // L
  [0, 0, 255], // J
  [128, 0, 128], // T
];

// Define the gameBoard variable
let gameBoard = [];


// Define the setup function
function setup() {
  createCanvas(COLS * BLOCK_SIZE, ROWS * BLOCK_SIZE);
  initGameBoard();
  noStroke();
  currentTetromino = getRandomTetromino();
  currentTetrominoRow = 0;
  currentTetrominoCol = 3;
  for (let row = 0; row < ROWS; row++) {
    board[row] = [];
    for (let col = 0; col < COLS; col++) {
      board[row][col] = 0;
    }
  }
}

// Define the draw function
function draw() {
  background(0);
  drawBoard();
  drawTetromino(currentTetromino, currentTetrominoRow, currentTetrominoCol);
  if (frameCount % 30 === 0) {
    moveTetrominoDown();
  }
  checkGameOver(); // Check if the game is over
}

// Define the drawBoard function
function drawBoard() {
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (board[row][col] !== 0) {
        fill(tetrominoColors[board[row][col] - 1]);
        rect(col * BLOCK_SIZE, row * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
      }
    }
  }
}

// Define the checkCollision function
function checkCollision(row, col, tetromino) {
  for (let i = 0; i < tetrominoShapes[tetromino - 1].length; i++) {
    for (let j = 0; j < tetrominoShapes[tetromino - 1][i].length; j++) {
      if (tetrominoShapes[tetromino - 1][i][j] !== 0) {
        let tetrominoRow = row + i;
        let tetrominoCol = col + j;
        if (tetrominoRow >= ROWS || tetrominoCol < 0 || tetrominoCol >= COLS || (gameBoard[tetrominoRow][tetrominoCol] !== 0 && gameBoard[tetrominoRow][tetrominoCol] !== tetromino)) {
          return true; // Return true if there is a collision
        }
      }
    }
  }
  return false; // Return false if there is no collision
}

// Define the drawTetromino function
function drawTetromino() {
  fill(tetrominoColors[currentTetromino - 1]);
  for (let i = 0; i < tetrominoShapes[currentTetromino - 1].length; i++) {
    for (let j = 0; j < tetrominoShapes[currentTetromino - 1][i].length; j++) {
      if (tetrominoShapes[currentTetromino - 1][i][j] !== 0) {
        rect((currentTetrominoCol + j) * BLOCK_SIZE, (currentTetrominoRow + i) * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
      }
    }
  }
}

// Define the getRandomTetromino function
function getRandomTetromino() {
  return floor(random(tetrominoShapes.length)) + 1;
}

// Define the moveTetrominoDown function
function moveTetrominoDown() {
  if (!checkCollision(currentTetrominoRow + 1, currentTetrominoCol, currentTetromino)) { // Check if there is no collision
    currentTetrominoRow++; // Move the tetromino down
  } else {
    placeTetromino(); // Place the tetromino on the game board
    clearLines(); // Clear any completed lines
    spawnTetromino(); // Spawn a new tetromino
  }
}

// Define the isValidMove function
function isValidMove(tetromino, row, col) {
  if (tetromino < 1 || tetromino > 7) { // Check if the tetromino is within the valid range
    return false; // Return false if the tetromino is not within the valid range
  }
  for (let i = 0; i < tetrominoShapes[tetromino - 1].length; i++) {
    for (let j = 0; j < tetrominoShapes[tetromino - 1][i].length; j++) {
      if (tetrominoShapes[tetromino - 1][i][j] !== 0) {
        let tetrominoRow = row + i;
        let tetrominoCol = col + j;
        if (tetrominoRow >= ROWS || tetrominoCol < 0 || tetrominoCol >= COLS || gameBoard[tetrominoRow][tetrominoCol] !== 0) {
          return false;
        }
      }
    }
  }
  return true;
}

// Define the clearTetromino function
function clearTetromino() {
  for (let i = 0; i < tetrominoShapes[currentTetromino - 1].length; i++) {
    if (tetrominoShapes[currentTetromino - 1][i] === 1) {
      let tetrominoRow = currentTetrominoRow + floor(i / 4);
      let tetrominoCol = currentTetrominoCol + i % 4;
      gameBoard[tetrominoRow][tetrominoCol] = 0; // Set the value of the game board to 0
    }
  }
}

// Define the placeTetromino function
function placeTetromino() {
  for (let i = 0; i < tetrominoShapes[currentTetromino - 1].length; i++) {
    for (let j = 0; j < tetrominoShapes[currentTetromino - 1][i].length; j++) {
      if (tetrominoShapes[currentTetromino - 1][i][j] !== 0) {
        let tetrominoRow = currentTetrominoRow + i;
        let tetrominoCol = currentTetrominoCol + j;
        board[tetrominoRow][tetrominoCol] = currentTetromino; // Set the value of the board to the current tetromino
      }
    }
  }
}

// Define the keyPressed function
function keyPressed() {
  if (keyCode === 32) { // If space key is pressed
    rotateTetromino(); // Rotate the tetromino
  } else if (keyCode === LEFT_ARROW) { // If left arrow key is pressed
    moveTetromino(-1, 0); // Move the tetromino left
  } else if (keyCode === RIGHT_ARROW) { // If right arrow key is pressed
    moveTetromino(1, 0); // Move the tetromino right
  } else if (keyCode === DOWN_ARROW) { // If down arrow key is pressed
    moveTetromino(0, 1); // Move the tetromino down
  }
}

// Define the moveTetromino function
function moveTetromino(x, y) {
  if (isValidMove(currentTetromino, currentTetrominoRow + y, currentTetrominoCol + x, tetrominoShapes[currentTetromino - 1])) {
    currentTetrominoRow += y;
    currentTetrominoCol += x;
  }
}

// Define the rotateTetromino function
function rotateTetromino() {
  let rotatedTetromino = [];
  for (let i = 0; i < tetrominoShapes[currentTetromino - 1][0].length; i++) {
    let newRow = [];
    for (let j = tetrominoShapes[currentTetromino - 1].length - 1; j >= 0; j--) {
      newRow.push(tetrominoShapes[currentTetromino - 1][j][i]);
    }
    rotatedTetromino.push(newRow);
  }
  if (isValidMove(currentTetromino, currentTetrominoRow, currentTetrominoCol, rotatedTetromino)) {
    tetrominoShapes[currentTetromino - 1] = rotatedTetromino;
  }
}

// Define the clearLines function
function clearLines() {
  let linesCleared = 0;
  for (let row = ROWS - 1; row >= 0; row--) {
    let rowCompleted = true;
    for (let col = 0; col < COLS; col++) {
      if (gameBoard[row][col] === 0) {
        rowCompleted = false;
        break;
      }
    }
    if (rowCompleted) {
      linesCleared++;
      for (let r = row; r > 0; r--) {
        for (let c = 0; c < COLS; c++) {
          gameBoard[r][c] = gameBoard[r - 1][c];
        }
      }
      for (let c = 0; c < COLS; c++) {
        gameBoard[0][c] = 0;
      }
      row++; // Check the same row again
    }
  }
  if (linesCleared > 0) {
    score += linesCleared * 100; // Increase the score
    updateScore(); // Update the score display
  }
}

// Define the spawnTetromino function
function spawnTetromino() {
  currentTetromino = nextTetromino; // Set the current tetromino to the next tetromino
  nextTetromino = getRandomTetromino(); // Get a new next tetromino
  currentTetrominoRow = 0; // Reset the current tetromino row
  currentTetrominoCol = Math.floor(COLS / 2) - Math.floor(tetrominoShapes[currentTetromino - 1][0].length / 2); // Reset the current tetromino column
  if (currentTetromino < 1 || currentTetromino > 7) { // Check if the current tetromino is within the valid range
    gameOver(); // End the game if the current tetromino is not within the valid range
  } else if (checkCollision(currentTetrominoRow, currentTetrominoCol, currentTetromino)) { // Check if there is a collision
    gameOver(); // End the game if there is a collision
  }
}

// Initialize the gameBoard variable
function initGameBoard() {
  for (let i = 0; i < ROWS; i++) {
    gameBoard[i] = [];
    for (let j = 0; j < COLS; j++) {
      gameBoard[i][j] = 0;
    }
  }
}

// Define the checkGameOver function
function checkGameOver() {
  for (let i = 0; i < 10; i++) {
    if (gameBoard[0][i] !== 0) { // If the top row is not empty
      noLoop(); // Stop the game loop
      alert("Game Over!"); // Show a message to the user
      break;
    }
  }
}