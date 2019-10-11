let length = 1;
let dir = 0;

const snakeStartX = 360;
const snakeStartY = 320;

let foodX = 0;
let foodY = 0;
let score = 0;
//const score_div = document.getElementById("game-score");
//score_div ++
//score_div.innerHTML = score:

function setup() {
	createCanvas(720, 640);
	stroke(255);
	frameRate(10);

}

function draw() {
	background(0);
	ellipse(100, 100, 80, 80);
}

function updateSnake(){

}

function updateGame(){

}

function updateFruit(){

}

function checkCollision(){

}
function keyPress(){
	switch(keycode){
		case 38: //Up
		case 37: //left
		case 40: //down
		case 39: //right
	}
}


