const score_div = document.getElementById("game-score");
//Main Game
let s;
let size = 20;
let food;
let canvas;
let score = 0;

function setup(){
	canvas = createCanvas(800,450);
	canvas.parent('game-box');
	s = new Snake();
	frameRate(10);
	updateFood();
}

function updateFood(){
	let w = floor(width/size);
	let h = floor(height/size);
	food = createVector(floor(random(w)), floor(random(h)));
	food.mult(size);
}

function draw(){
	background(0);

	if(s.collision(food)){
		updateFood();
		score++;
		score_div.innerHTML = score;
	}
	if(s.end()){
		score = 0;
		score_div.innerHTML = score;
	}
	s.update(score);
	s.draw();

	fill(255, 0, 100);
	//fill(66, 7, 102); same purple as text
	rect(food.x, food.y, size, size);
}

function keyPressed(){
	if(keyCode === UP_ARROW){
		s.dir(0, -1);
	}
	else if (keyCode === DOWN_ARROW) {
    s.dir(0, 1);
	}
	else if (keyCode === RIGHT_ARROW) {
    s.dir(1, 0);
  	}
	else if (keyCode === LEFT_ARROW) {
    s.dir(-1, 0);
  	}
}
//Snake Class
function Snake(){
	this.x = 360;
	this.y = 320;
	this.xspeed = 0;
	this.yspeed = 0;
	//this.score = 0;
	this.trail = [];

	this.collision = function(pos){
		let d = dist(this.x, this.y, pos.x, pos.y)
		if (d <1){
			//this.score++;
			return true;
		}
		return false;
	}

	this.dir = function (x, y){
		this.xspeed = x; 
		this.yspeed = y;
	}
	this.end = function(){
		for (let i = 0; i< this.trail.length; i++){
			let position = this.trail[i];
			if (this.collision(position)){
				//game over
				//this.score = 0;
				this.trail = [];
				return true;
			}
		}
		return false;
	}
	this.update = function(score){
		for(var i = 0; i<this.trail.length-1; i++){
			this.trail[i] = this.trail[i+1];
		}
		if(score>=1){
			this.trail[score-1] = createVector(this.x, this.y);
		}
		this.x = this.x + this.xspeed * size;
    	this.y = this.y + this.yspeed * size;

    	this.x = constrain(this.x, 0, width - size);
   		this.y = constrain(this.y, 0, height - size);
	}

	this.draw = function(){
		fill(255);
		for (let i = 0; i< this.trail.length; i++){
			rect(this.trail[i].x, this.trail[i].y, size, size);
		}
		rect(this.x, this.y, size, size);
	}
}