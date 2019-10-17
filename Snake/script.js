//Snake Class
function Snake(){
	this.x = 360;
	this.y = 320;
	this.xspeed = 0;
	this.yspeed = 0;
	this.score = 0;
	this.trail = [];

	this.collision = function(pos){
		var d = dist(this.x, this.y, pos.x, pos.y)
		if (d <1){
			this.total++;
			return true;
		}
		return false;
	}

	this.dir = function (x, y){
		this.xspeed = x; 
		this.yspeed = y;
	}
	this.end = function(){
		for (var i = 0; i< this.trail.length; i++){
			var position = this.trail[i];
			if (this.collision(pos)){
				//game over
				this.score = 0;
				this.trail = [];
			}
		}
	}
	this.update = function(){
		for(var i = 0; i<this.trail.length-1; i++){
			this.trail[i] = this.trail[i+1];
		}
		//idk why we do this????
		if(this.score>=1){
			this.trail[this.score-1] = createVector(this.x, this.y);
		}
		this.x = this.x + this.xspeed * size;
    	this.y = this.y + this.yspeed * size;

    	this.x = constrain(this.x, 0, width - size);
   		this.y = constrain(this.y, 0, height - size);
	}

	this.draw = function(){
		fill(255);
		for (var i = 0; i< this.trail.length; i++){
			rect(this.trail[i].x, this.trail[i].y, size, size);
		}
		rect(this.x, this.y, size, size);
	}
}
//Main Game
var s;
var size = 10;
var food;

function setup(){
	createCanvas(720,640);
	s = new Snake();
	frameRate(10);
	updateFood();
}

function updateFood(){
	var w = floor(width/size);
	var h = floor(height/size);
	food = createVector(floor(random(w)), floor(random(h)));
	food.mult(size);
}

function draw(){
	background(0);

	if(s.collision(food)){
		updateFood();
	}
	s.end();
	s.update();
	s.draw();

	fill(255, 0, 100);
	rect(food.x, food.y, size, size);
}

function keyPressed(){
	if(keyCode === UP_ARROW){
		s.dir(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    s.dir(0, 1);
  } else if (keyCode === RIGHT_ARROW) {
    s.dir(1, 0);
  } else if (keyCode === LEFT_ARROW) {
    s.dir(-1, 0);
  }
}