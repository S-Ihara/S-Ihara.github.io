// p5jsでブロック崩しのゲームを作成する
console.log("test.js loaded");

// ゲームの状態
let gameState = "playing";

// ボールの初期位置
let ballX = 320;
let ballY = 240;

// ボールの速度
let ballSpeedX = 5;
let ballSpeedY = 5;

// パドルの初期位置
let paddleX = 250;
const paddleY = 450;
const paddleWidth = 100;
const paddleHeight = 10;

// ブロックの初期位置
const blockWidth = 10;
const blockHeight = 3;
const blockPadding = 10;
const blockOffsetTop = 30;
const blockOffsetLeft = 30;
const blockRowCount = 10;
const blockColumnCount = 30;

// ブロックの配列
let blocks = [];

// スコア
let score = 0;

// キャンバスのサイズ
const canvasWidth = 640;
const canvasHeight = 480;

function setup() {
  // キャンバスを作成する
  canvas = createCanvas(canvasWidth, canvasHeight);

  // ブロックを初期化する
  resetBlocks();
}

function draw() {
  // 背景色を設定する
  background(220);

  // ブロックを描画する
  for (let c = 0; c < blockColumnCount; c++) {
    for (let r = 0; r < blockRowCount; r++) {
      if (blocks[c][r].status == 1) {
        let blockX = (c * (blockWidth + blockPadding)) + blockOffsetLeft;
        let blockY = (r * (blockHeight + blockPadding)) + blockOffsetTop;
        blocks[c][r].x = blockX;
        blocks[c][r].y = blockY;
        fill(0, 255, 0);
        rect(blockX, blockY, blockWidth, blockHeight);
      }
    }
  }

  // パドルを描画する
  fill(0, 0, 255);
  rect(paddleX, paddleY, paddleWidth, paddleHeight);

  // ボールを描画する
  fill(255, 255, 0);
  ellipse(ballX, ballY, 20, 20);

  // ボールを移動する
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // ボールが壁に当たった場合、反射する
  if (ballX < 0 || ballX > canvasWidth) {
    ballSpeedX *= -1;
  }
  if (ballY < 0) {
    ballSpeedY *= -1;
  }
  if (ballY > canvasHeight) {
    gameState = "gameover";
  }

  // ボールがパドルに当たった場合、反射する
  if (ballY + 10 >= paddleY && ballX >= paddleX && ballX <= paddleX + paddleWidth) {
    ballSpeedY *= -1;

    // パドルの左端からの距離に応じて、ボールの反射方向を変更する
    let ballDistanceFromPaddleCenter = ballX - (paddleX + paddleWidth / 2);
    ballSpeedX = ballDistanceFromPaddleCenter * 0.2;
  }

  // ボールがブロックに当たった場合、ブロックを削除する
  for (let c = 0; c < blockColumnCount; c++) {
    for (let r = 0; r < blockRowCount; r++) {
      let b = blocks[c][r];
      if (b.status == 1) {
        if (ballX >= b.x && ballX <= b.x + blockWidth && ballY >= b.y && ballY <= b.y + blockHeight) {
          ballSpeedY *= -1;
          b.status = 0;
          score++;
          if (score == blockRowCount * blockColumnCount) {
            gameState = "gameclear"; // 全てのブロックを消した場合はGame Clearとする
          }
        }
      }
    }
  }

  // ゲームオーバーまたはゲームクリアの場合、メッセージを表示する
  if (gameState == "gameover") {
    textSize(32);
    fill(255, 0, 0);
    text("Game Over", canvasWidth / 2 - 80, canvasHeight / 2);
    noLoop(); // ゲームオーバー後に操作ができなくなるようにする
  } else if (gameState == "gameclear") {
    textSize(32);
    fill(0, 255, 0);
    text("Game Clear", canvasWidth / 2 - 80, canvasHeight / 2);
    noLoop(); // ゲームクリア後に操作ができなくなるようにする
  }

  // パドルを移動する
  if (keyIsDown(LEFT_ARROW)) {
    paddleX -= 5;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    paddleX += 5;
  }

  // パドルがキャンバスの外に出ないようにする
  if (paddleX < 0) {
    paddleX = 0;
  }
  if (paddleX > canvasWidth - paddleWidth) {
    paddleX = canvasWidth - paddleWidth;
  }

  // スコアを表示する
  textSize(16);
  fill(0, 0, 0);
  text("Score: " + score, 10, 20);
}

// ブロックを初期化する
function resetBlocks() {
  for (let c = 0; c < blockColumnCount; c++) {
    blocks[c] = [];
    for (let r = 0; r < blockRowCount; r++) {
      blocks[c][r] = { x: 0, y: 0, status: 1 };
    }
  }
}

// ゲームをリセットする
function resetGame() {
  ballX = 320;
  ballY = 240;
  ballSpeedX = 5;
  ballSpeedY = 5;
  paddleX = 250;
  score = 0;
  resetBlocks();
}

// キーが押されたときに呼び出される関数
function keyPressed() {
  // ゲームオーバーまたはゲームクリアの場合、スペースキーを押すとリスタートする
  if ((gameState == "gameover" || gameState == "gameclear") && keyCode == 32) {
    gameState = "playing";
    loop(); // ループを再開する
    resetGame();
  }
}