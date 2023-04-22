// particlelife

let particles = [];

// hyper parameters
const PALETTE = [
    [255 ,127 ,0   ,100 ],
    [190 ,255 ,0   ,100 ],
    [0   ,255 ,170 ,100 ],
    [0   ,150 ,255 ,100 ],
    [255 ,0   ,255 ,100 ],
];

const minR = 8;
const maxR = 50;

/*
const ALPHAS = [
    [0.7 ,0.2 ,0.  ],
    [-0.3,0.5 ,0.6 ],
    [0.6 ,-0.4,-0.2],
];
*/

const ALPHAS = [];
for(let i=0;i<3;i++){
    let tmp = [];
    for(let j=0;j<3;j++){
        let r = Math.random()*1.5 - 0.6;
        tmp.push(r);
    }
    ALPHAS.push(tmp);
}

const R_smooth = 5;

const particle_size = 5;
const num_colors = 3;
const num_particles = 1000;
const dt = 0.1;

// マウスドラッグしたときにハイライトされないように
document.body.addEventListener('mousedown', function(event) {
    event.preventDefault(); // デフォルトのイベントをキャンセルする
  });

function setup() {
    canvas = createCanvas(windowWidth, windowHeight); // 画面サイズ変えてもついてこない
    background(255);
    canvas.position(0,0); // canvasのポジションを原点に
    canvas.style('z-index','-3'); // canvasのdom要素をz軸方向に後ろに設定する
    canvas.style('position','fixed'); // canvasをスクロールさせても動かさないように
    
    frameRate(60);

    // パーティクルを生成する関数を呼び出す
    spawnParticles(num_particles);
}

function draw() {
    background(255);
    // すべてのパーティクルの相互作用を計算する
    for(let i=0; i<particles.length;i++){
        for(let j=0; j<particles.length;j++){
            if(i===j)continue;
            particles[i].interact(particles[j]);
        }
    }

    // すべてのパーティクルを更新して描画する
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].display();
    }

    // マウスに反発させる
    if(mouseIsPressed===true){
        fill(160,60,22,127);
        circle(mouseX,mouseY,10);
        for(let i=0;i<particles.length;i++){
            particles[i].repel(mouseX,mouseY);
        }
    }
}

function spawnParticles(num) {
    // 指定した数のパーティクルを生成する
    for (let i = 0; i < num; i++) {
      let particle = new Particle(random(width), random(height), i%num_colors);
      particles.push(particle);
    }
}


class Particle {
    constructor(x, y, color) {
      this.position = createVector(x, y);
      this.velocity = createVector(random(-1, 1), random(-1, 1));
      this.acceleration = createVector(0, 0);
      // パーティクルの色をランダムに定義
      this.color = color;
    }
  
    update() {
        this.acceleration.mult(dt);
        this.velocity.add(this.acceleration);
        this.acceleration = createVector(0, 0);
        // パーティクルの位置を更新
        this.position.add(p5.Vector.mult(this.velocity,dt));
        
        // 速度の自然減衰
        this.velocity.mult(0.7);

        // 粒子の自然振動
        //this.velocity.x += 0.002 * (Math.random() - 0.5);
        //this.velocity.y += 0.002 * (Math.random() - 0.5);
  
        // 画面端に達したら反対側にいく
        if (this.position.x < 0){
            this.position.x += width;
        }
        if (this.position.y < 0){
            this.position.y += height;
        }

        if (this.position.x > width){
            this.position.x %= width;
        }

        if (this.position.y > height){
            this.position.y %= height;
        }
    }
  
    display() {
      // パーティクルを描画する
      //fill(this.color);
      noStroke();
      //fill("#FF8600");
      fill(PALETTE[this.color]);
      circle(this.position.x,this.position.y,particle_size);
    }

    interact(p){
        // this particleとp particleの作用をthis particleに施す
        let dx = this.position.x - p.position.x;
        let dy = this.position.y - p.position.y;

        if(dx > width*0.5){
            dx = -(width - dx);
        }
        if(dy > height*0.5){
            dy = -(height - dy);
        }

        const dd = dx**2 + dy**2;
        const d = Math.sqrt(dd);

        if(dd > maxR**2 || dd < 0.1){
            return
        }

        dx /= d;
        dy /= d;

        let f = 0;
        if(d > minR){
            let numer = 2 * Math.abs(d - 0.5*(minR+maxR));
            let denom = maxR - minR;
            f = ALPHAS[this.color][p.color] * (1-numer)/denom;
        }
        else{
            f = R_smooth + minR * (1/(minR + R_smooth) - 1/(d+R_smooth))
        }
        this.velocity.x += f * dx;
        this.velocity.y += f * dy;
    }

    repel(x,y){
        const dx = x - this.position.x;
        const dy = y - this.position.y;
        const dd = Math.max(10, dx * dx + dy * dy);
        const d = Math.sqrt(dd);
        if(d < 100){
            const accel = - 30000 / dd;
            const f = createVector(accel * dx / d, accel * dy / d);
            this.velocity.add(f);
        }
    }

}