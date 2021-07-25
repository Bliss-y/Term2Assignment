var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;
var lastPressed = false;
var start;
var bombsTimer;
var lifeCount = 3;
var player;

function objectCollision(obj1) {
	var top1 = obj1.offsetTop;
	// var top2 = obj2.offsetTop;
	var left1 =obj1.offsetLeft;
	// var left2 = obj2.offsetLeft;
	var height1 = obj1.offsetHeight;
	// var height2 = obj2.offsetHeight;
	var width1 = obj1.offsetWidth;
	// var width2 = obj2.offsetWidth;
	var newleft = left1;
	var newtop = top1;
	console.log(newleft);
	console.log(newtop);
	for (var i = 0; i < height1; i+=1) {
		for (var j = 1; j < width1; j+= 1) {
				if (document.elementFromPoint(280, 559).classList.contains('bomb')) {
				return 1;
				}
			newleft++;
		}
		newtop++;
	}
	console.log('allo??')
	return 0;
}

// this function takes element and timer as arguments to move down.
function dropBomb(element, timer) {
	var top = parseInt(element.offsetTop);
	if (top == window.innerHeight - 50) {
		element.className = 'explosion';
		// to make pseudo wait time :)
		explosionTime = setTimeout(function (){
			element.remove();
		}, 1000);
	}if (objectCollision(player) != 0) {
		element.remove();
		alert('gameover');
		location.reload();
		return;
	}
	console.log('are you here???')
	element.style.top = top + 1 + 'px';
	clearInterval(timer);
}

function generateBombs() {
	var windowWidth = window.innerWidth;
	var randomPosition = Math.floor(Math.random() * windowWidth);
	var element = document.createElement('div');
	element.style.left = randomPosition + 'px';
	element.style.border = 'solid black';
	element.className = 'bomb';
	document.body.appendChild(element);
	var timer = setInterval(() => dropBomb(element, timer), 10);
}

// prep for starting the game
function startGame() {
	start[0].style.display = 'none';
	bombsTimer = setInterval(generateBombs, 2000);
}

function keyup(event) {
	var player = document.getElementById('player');
	if (event.keyCode == 37) {
		leftPressed = false;
		lastPressed = 'left';
	}
	if (event.keyCode == 39) {
		rightPressed = false;
		lastPressed = 'right';
	}
	if (event.keyCode == 38) {
		upPressed = false;
		lastPressed = 'up';
	}
	if (event.keyCode == 40) {
		downPressed = false;
		lastPressed = 'down';
	}

	player.className = 'character stand ' + lastPressed;
}


function move() {
	var positionLeft = player.offsetLeft;
	var positionTop = player.offsetTop;
	
	if (downPressed) {
		var newTop = positionTop+1;
			player.style.top = newTop + 'px';

		if (leftPressed == false) {
			if (rightPressed == false) {
				player.className = 'character walk down';
			}
		}
	}
	if (upPressed) {
		var newTop = positionTop-1;

		var element = document.elementFromPoint(0, newTop);
		var isittrue = element.classList.contains('sky');
		console.log(isittrue);
		if (element.classList.contains('sky') == false) {
			player.style.top = newTop + 'px';
		}
		
		if (leftPressed == false) {
			if (rightPressed == false) {
				player.className = 'character walk up';
			}
		}
	}
	if (leftPressed) {
		var newLeft = positionLeft-1;

		var element = document.elementFromPoint(newLeft, player.offsetTop);
		if (element.classList.contains('sky') == false) {
			player.style.left = newLeft + 'px';	
		}


		player.className = 'character walk left';
	}
	if (rightPressed) {
		var newLeft = positionLeft+1;
		
		var element = document.elementFromPoint(0, player.offsetTop);
		if (element.classList.contains('sky') == false) {
			player.style.left = newLeft + 'px';		
		}

		player.className = 'character walk right';
	}

}


function keydown(event) {
	if (event.keyCode == 37) {
		leftPressed = true;
	}
	if (event.keyCode == 39) {
		rightPressed = true;
	}
	if (event.keyCode == 38) {
		upPressed = true;
	}
	if (event.keyCode == 40) {
		downPressed = true;
	}
}


function myLoadFunction() {
	player = document.getElementById('player');
	player.style.border = 'solid black'
	timeout = setInterval(move, 10);
	document.addEventListener('keydown', keydown);
	document.addEventListener('keyup', keyup);
	start = document.getElementsByClassName('start');
	start[0].addEventListener('click', startGame);
}


document.addEventListener('DOMContentLoaded', myLoadFunction);