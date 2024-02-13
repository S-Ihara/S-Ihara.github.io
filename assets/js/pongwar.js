// p5jsを使ってpongwarを実装する
// twitter(現X)で見たので作ってみるよ(https://x.com/vnglst/status/1751278052154179770?s=20)

// キャンバスのサイズ
const canvasWidth = 640;
const canvasHeight = 480;

// 描画設定
const fps = 60;

// ブロックサイズ
const blocksize = 20;
const blockWidthCount = canvasWidth / blocksize;
const blockHeightCount = canvasHeight / blocksize;

// ボールパラメータ
const ballsize = 10;
const ballSpeedX = 5;
const ballSpeedY = 5;
let balls = [];

// 時計再表示の間隔（秒）
const clock_interval = 10;

// それぞれの位置にのブロック情報を格納する配列
let blocks = [];
for (let y = 0; y < blockHeightCount; y++) {
    blocks[y] = [];
    for (let x = 0; x < blockWidthCount; x++) {
        // blocks[y][x] = Math.floor(Math.random() * 2) + 1; // ランダム初期化
        // 右半分を青色に、左半分を赤色にする
        if (x < blockWidthCount / 2) {
            blocks[y][x] = 1;
        } else {
            blocks[y][x] = 2;
        }
    }
}

// それぞれのチームの色を設定
const Colors = {
    black: [0, 0, 0, 200],
    red: [255, 0, 0 , 100],
    blue: [0, 0, 255, 100],
};

const Color2idx = {
    [Colors.black]: 0,
    [Colors.red]: 1,
    [Colors.blue]: 2,
};

// 数字のピクセル情報を格納 (4x6)
const number_pixels = [
    [[0,1,1,0],
     [1,0,0,1],
     [1,0,1,1],
     [1,1,0,1],
     [1,0,0,1],
     [0,1,1,0],], // 0
    [[0,1,0,0],
     [1,1,0,0],
     [0,1,0,0],
     [0,1,0,0],
     [0,1,0,0],
     [1,1,1,0],], // 1
    [[0,1,1,0],
     [1,0,0,1],
     [0,0,1,0],
     [0,1,0,0],
     [1,0,0,0],
     [1,1,1,1],], // 2
    [[0,1,1,0],
     [1,0,0,1],
     [0,0,1,0],
     [0,0,0,1],
     [1,0,0,1],
     [0,1,1,0],], // 3
    [[0,0,1,0],
     [0,1,1,0],
     [1,0,1,0],
     [1,1,1,1],
     [0,0,1,0],
     [0,0,1,0],], // 4
    [[1,1,1,1],
     [1,0,0,0],
     [1,1,1,0],
     [0,0,0,1],
     [1,0,0,1],
     [0,1,1,0],], // 5
    [[0,1,1,0],
     [1,0,0,1],
     [1,0,0,0],
     [1,1,1,1],
     [1,0,0,1],
     [0,1,1,0],], // 6
    [[1,1,1,1],
     [0,0,0,1],
     [0,0,1,0],
     [0,1,0,0],
     [1,0,0,0],
     [1,0,0,0],], // 7
    [[0,1,1,0],
     [1,0,0,1],
     [0,1,1,0],
     [1,0,0,1],
     [1,0,0,1],
     [0,1,1,0],], // 8
    [[0,1,1,0],
     [1,0,0,1],
     [0,1,1,1],
     [0,0,0,1],
     [1,0,0,1],
     [0,1,1,0],], // 9
    [[0,0,0,0],
     [0,0,0,0],
     [0,1,0,0],
     [0,0,0,0],
     [0,1,0,0],
     [0,0,0,0],] // :
]

let cnt = 0;

function setup() {
    // メインキャンバスを作成する
    canvas = createCanvas(canvasWidth, canvasHeight);

    // 背景を変更 カラーコード #f0f0f0
    background(240);

    // 適当な位置にボールを配置
    ballX = 95;
    ballY = 100;
    let current_ballSpeedX = ballSpeedX + Math.random() * 4 - 2;
    let current_ballSpeedY = ballSpeedY + Math.random() * 4 - 2;
    balls.push(new Ball(ballX, ballY, current_ballSpeedX, current_ballSpeedY, Colors.blue));
    balls.push(new Ball(500, 24, -ballSpeedX, -ballSpeedY, Colors.red));

    drawClock(); // 時計を描画する

    // サブキャンバスをid="defaultCanvas1"に追加、そのうちね

}

function draw() {
    // 背景色を設定する
    background(240);

    // ブロックを描画する
    drawBlocks();

    // ボールを動かして描画する
    for (let i = 0; i < balls.length; i++) {
        balls[i].update();
        balls[i].draw();
    }

    display_info();

    cnt += 1;
    // clock_interval秒ごとに時計を描画する    
    if (cnt % (fps*clock_interval) == 0){
        drawClock();
        cnt = 0;
    }
}

class Ball {
    constructor(x, y, speedX, speedY, color) {
        this.x = x;
        this.y = y;
        this.speedX = speedX;
        this.speedY = speedY;
        this.color = color;
        // colorからcolor_idxを取得する
        this.color_idx = Color2idx[color];
    }
    update() {
        let current_blockX = Math.floor(this.x / blocksize);
        let current_blockY = Math.floor(this.y / blocksize);
        this.x += this.speedX;
        this.y += this.speedY;
        let blockX = Math.floor(this.x / blocksize);
        let blockY = Math.floor(this.y / blocksize);
        // クロップ処理
        if (blockX < 0) {
            blockX = 0;
        }
        if (blockX >= blockWidthCount) {
            blockX = blockWidthCount - 1;
        }
        if (blockY < 0) {
            blockY = 0;
        }
        if (blockY >= blockHeightCount) {
            blockY = blockHeightCount - 1;
        }

        // 画面端に当たったら跳ね返る
        let isHitEdge = false;
        if (this.x < 0 || this.x > canvasWidth) {
            this.speedX *= -1;
            this.sppedX += Math.random() * 0.05 - 0.025; // ランダムに微小な値を足す
            isHitEdge = true;
        }
        if (this.y < 0 || this.y > canvasHeight) {
            this.speedY *= -1;
            this.speedY += Math.random() * 0.05 - 0.025; // ランダムに微小な値を足す
            isHitEdge = true;
        }
        if (isHitEdge) {
            return;
        }
        
        // ブロックに当たったら跳ね返る
        // 当たったブロックは自分と違う色に変更する

        // ブロックがボールの色と同じか0の場合は跳ね返る
        if (blocks[blockY][blockX] == this.color_idx || blocks[blockY][blockX] == 0) {
            let isHitBlock = false;
            if (current_blockX != blockX) {
                this.speedX *= -1;
                this.sppedX += Math.random() * 0.05 - 0.025; // ランダムに微小な値を足す
                isHitBlock = true;
            }
            if (current_blockY != blockY) {
                this.speedY *= -1;
                this.speedY += Math.random() * 0.05 - 0.025; // ランダムに微小な値を足す
                isHitBlock = true;
            }
            if (isHitBlock) {
                blocks[blockY][blockX] = this.color_idx == 1 ? 2 : 1;
            }
        }
    }
    draw() {
        fill(this.color);
        ellipse(this.x, this.y, ballsize, ballsize);
    }
}

// blocksから描画する関数
// 0: black 1: red 2: blue
function drawBlocks() {
    for (let x = 0; x < blockWidthCount; x++) {
        for (let y = 0; y < blockHeightCount; y++) {
            if (blocks[y][x] == 1) {
                fill(Colors.red);
                noStroke();
                rect(x * blocksize, y * blocksize, blocksize, blocksize);
            }
            if (blocks[y][x] == 2) {
                fill(Colors.blue);
                rect(x * blocksize, y * blocksize, blocksize, blocksize);
            }
            if (blocks[y][x] == 0) {
                fill(Colors.black);
                rect(x * blocksize, y * blocksize, blocksize, blocksize);
            }
        }
    }
}

// blocksに時計情報を描画する関数
function drawClock() {
    let now = new Date();
    let hour = now.getHours();
    let minute = now.getMinutes();
    //let second = now.getSeconds();
    // hourとminuteが一桁の場合は0を追加する
    if (hour < 10) {
        hour = "0" + hour;
    }
    else{hour = hour.toString();}
    if (minute < 10) {
        minute = "0" + minute;
    }
    else{minute = minute.toString();}
    let time = [hour, minute];
    let start_x = -1;
    let start_y = 5;
    let size = 1;
    for (let i = 0; i < time.length; i++) {
        let num = time[i];
        for (let j = 0; j < num.length; j++) {
            let digit = parseInt(num[j]);
            start_x += 5;
            for (let dy=0; dy<6; dy++){
                for (let dx=0; dx<4; dx++){
                    if (number_pixels[digit][dy][dx] == 1){
                        //blocks[start_y + dy][draw_x + dx] = 0;
                        blocks[start_y + dy][start_x + dx] = 0;
                    }
            }
        }
    }
    if (i == 0){
        start_x += 5;
        // 時計の中間の:を描画
        for (let dy=0; dy<6; dy++){
            for (let dx=0; dx<4; dx++){
                if (number_pixels[10][dy][dx] == 1){
                    blocks[start_y + dy][start_x + dx] = 0;
                }
            }
        }
    }
}
}

// マウスクリックしたらボールを追加する
function mouseClicked() {
    let point_color = blocks[Math.floor(mouseY / blocksize)][Math.floor(mouseX / blocksize)];
    // 場所の色と違う色のボールを追加する
    let ball_color = point_color == 2 ? Colors.red : Colors.blue;
    let current_ballSpeedX = ballSpeedX + Math.random() * 4 - 2;
    let current_ballSpeedY = ballSpeedY + Math.random() * 4 - 2;
    balls.push(new Ball(mouseX, mouseY, current_ballSpeedX, current_ballSpeedY, ball_color));
}

// utils
function display_info(){
    // サブキャンバスに情報を表示する
    // todo そのうち

}