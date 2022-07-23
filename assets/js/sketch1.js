let flock;

// ハイパラ
let max_speed = 5; // default 5
let max_force = 0.05; // default 0.05
// separation params
let separation_force = 1+2*Math.random(); // default 3.5
let separation_distance = 25.0 + Math.random()*10-5; // default 25.0
// aligment params
let aligment_force = 1+Math.random(); // default 1.5
let aligment_distance = 50.0 + Math.random()*10-5; // default 50.0
// cohesion params
let cohesion_force = 2*Math.random(); // default 1.5
let cohesion_distance = 50.0 + Math.random()*10-5; //default 50.0

// reference
// https://codepen.io/cossovich/pen/QWjMxye?editors=0010

function setup(){
    // canvas init
    canvas = createCanvas(windowWidth, windowHeight); // 画面サイズ変えてもついてこない
    background(255);
    canvas.position(0,0); // canvasのポジションを原点に
    canvas.style('z-index','-1'); // canvasのdom要素をz軸方向に後ろに1つずらす
    canvas.style('position','fixed'); // canvasをスクロールさせても動かさないように

    flock = new Flock();
    // Add an initial set of boids into the system
       for (let i = 0; i < 100; i++) {
     let b = new Boid(width / 2,height / 2);
    flock.addBoid(b);
    }
}

function draw(){
    background(255);
    flock.run();
}

function mouseDragged(){
    // flock.addBoid(new Boid(mouseX, mouseY)); クリックしたら増やせる
}

function Flock(){
    this.boids = [];
}

Flock.prototype.run = function(){
    for(let i=0;i<this.boids.length;i++){
        this.boids[i].run(this.boids);
    }
};

Flock.prototype.addBoid = function(b){
    this.boids.push(b);
};

function Boid(x,y){
    this.acceleration = createVector(0,0);
    this.velocity = createVector(random(-1,1),random(-1,1));
    this.position = createVector(x,y);
    this.r = 3.0;
    this.maxspeed = max_speed;
    this.maxforce = max_force;
}

Boid.prototype.run = function(boids){
    this.flock(boids);
    this.update();
    this.borders();
    this.render();
};

Boid.prototype.applyForce = function(force){
    this.acceleration.add(force);
};

Boid.prototype.flock = function(boids){
    let sep = this.separate(boids);
    let ali = this.align(boids);
    let coh = this.cohesion(boids);

    sep.mult(separation_force);
    ali.mult(aligment_force);
    coh.mult(cohesion_force);

    this.applyForce(sep);
    this.applyForce(ali);
    this.applyForce(coh);
};

Boid.prototype.update = function(){
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0); // reset acceleration
};

Boid.prototype.seek = function(target){
    let desired = p5.Vector.sub(target, this.position);

    desired.normalize();
    desired.mult(this.maxspeed);

    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    return steer;
};

Boid.prototype.render = function(){
    let theta = this.velocity.heading() + radians(90);
    //fill(127,alpha=150);
    //16a085
    fill('rgba( 22,160,133,0.5 )');
    stroke(200,alpha=127);
    push();
    translate(this.position.x, this.position.y);
    rotate(theta);
    beginShape();
    vertex(0,-this.r*2);
    vertex(-this.r,this.r*2);
    vertex(this.r,this.r*2);
    endShape(CLOSE);
    pop();
};

Boid.prototype.borders = function(){
    if(this.position.x < -this.r)this.position.x = width + this.r;
    if(this.position.y < -this.r)this.position.y = height + this.r;
    if(this.position.x > width + this.r)this.position.x = -this.r;
    if(this.position.y > height + this.r)this.position.y = -this.r;
};

//separation
Boid.prototype.separate = function(boids){
    let desiredseparation = separation_distance;
    let steer = createVector(0,0);
    let count = 0;
    for(let i=0;i<boids.length;i++){
        let d = p5.Vector.dist(this.position,boids[i].position);
        if(d>0 && d<desiredseparation){
            let diff = p5.Vector.sub(this.position,boids[i].position);
            diff.normalize();
            diff.div(d);
            steer.add(diff);
            count++;
        }
    }
    if(count > 0){
        steer.div(count);
    }

    if(steer.mag()>0){
        steer.normalize();
        steer.mult(this.maxspeed);
        steer.sub(this.velocity);
        steer.limit(this.maxforce);
    }
    return steer;
};

// Alignment
Boid.prototype.align = function(boids){
    let neighbordist = aligment_distance;
    let sum = createVector(0,0);
    let count = 0;
    for(let i=0;i<boids.length;i++){
        let d=p5.Vector.dist(this.position,boids[i].position);
        if(d>0 && d<neighbordist){
            sum.add(boids[i].velocity);
            count++;
        }
    }
    if(count>0){
        sum.div(count);
        sum.normalize();
        sum.mult(this.maxspeed);
        let steer = p5.Vector.sub(sum,this.velocity);
        steer.limit(this.maxforce);
        return steer;
    }else{
        return createVector(0,0);
    }
};

// Cohesion
Boid.prototype.cohesion = function(boids){
    let neighbordist = cohesion_distance;
    let sum = createVector(0,0);
    let count = 0;
    for(let i=0;i<boids.length;i++){
        let d = p5.Vector.dist(this.position,boids[i].position);
        if(d>0 && d<neighbordist){
            sum.add(boids[i].position);
            count++;
        }
    }
    if(count>0){
        sum.div(count);
        return this.seek(sum);
    }else{
        return createVector(0,0);
    }
};
