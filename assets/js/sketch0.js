var pointlocation;
var velocity;
var acceleration;
var movers = [];

function setup(){
    canvas = createCanvas(windowWidth, windowHeight); // 画面サイズ変えてもついてこない
    background(255);
    canvas.position(0,0); // canvasのポジションを原点に
    canvas.style('z-index','-1'); // canvasのdom要素をz軸方向に後ろに1つずらす
    canvas.style('position','fixed'); // canvasをスクロールさせても動かさないように


    // mover class 
    class Mover{
        constructor(location,velocity,acceleration){
            this.location = location;
            this.velocity = velocity;
            this.acceleration = acceleration;
            this.topspeed = 10;
        }
    
        update(){
            this.velocity.add(this.acceleration);
            this.limit(this.topspeed);
            this.location.add(this.velocity);
        }
    
        display(){
            var angle = atan2(this.velocity.y,this.velocity.x);
    
            stroke(0);
            //fill(175);
            fill(22,160,133);
            push();
            rectMode(CENTER);
            translate(this.location.x,this.location.y);
            rotate(angle);
            rect(0,0,30,10);
            pop();
        }
    
        limit(){
            if(this.velocity.mag() > this.topspeed){
                this.velocity.normalize();
                this.velocity.mult(this.topspeed);
            }
        }
    
        checkEdges(w,h){
            if(this.location.x > w){this.location.x = 0;}
            else if (this.location.x < 0){this.location.x = w;}
            if(this.location.y > h){this.location.y = 0;}
            else if(this.location.y < 0){this.location.y = h;}       
        }
    }
    // movers init
    for(var i=0;i<5;i++){
        var loc = createVector(Math.random()*windowWidth,Math.random()*windowHeight);
        var acc = createVector(Math.random(),Math.random());
        var vel = createVector(Math.random(),Math.random());
        var mover = new Mover(loc,vel,acc);
        movers.push(mover);
    }
    pointlocation = createVector(100,100);
}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight);
    background(255);
}

function draw(){
    background(255);
    for(var i=0;i < movers.length;i++){
        var mouse = createVector(mouseX,mouseY);
        mouse.sub(movers[i].location);
        mouse.normalize();
        mouse.mult(0.5);
        movers[i].acceleration = mouse;
        movers[i].update();
        movers[i].checkEdges(windowWidth,windowHeight);
        movers[i].display();
    }
}