var upPressed = false;
var downPressed = false;
var leftPressed = false;
var rightPressed = false;
var lastPressed = false;
var start;
var bombsTimer;
var lifeCount = 3;
var player;
var bombs = [];
var speedMult = 1.0;
var gameTicks = 0;
var gamePaused = false;
var score = 0;

function objectCollision(obj1, obj2) {
	var top1 = obj1.offsetTop;
	var top2 = obj2.offsetTop;
	var left1 =obj1.offsetLeft;
	var left2 = obj2.offsetLeft;
	var height1 = obj1.offsetHeight;
	var height2 = obj2.offsetHeight;
	var width1 = obj1.offsetWidth;
	var width2 = obj2.offsetWidth;
	var newleft = left1;
	var newtop = top1;
	console.log(newleft);
	console.log(newtop);
	if (top1 - 10 < top2 + height2 && top1 + height1 > top2 - 1 && left1 < left2 + width2 && left1 + width1 - 10 > left2 - 1) {
		return 1;
	}
	console.log('allo??');
	return 0;
}

// this function takes element and timer as arguments to move down.
function reset(bomb) {
	var windowWidth = window.innerWidth;
	var heightRandom = Math.random() * (1000 - 1) + 1;
	bomb.style.top = -1 * heightRandom + 'px';
	bomb.style.left = Math.floor(Math.random() * windowWidth) + 'px';
}

function createBombs() {
	var element = document.createElement('div');
	// element.style.border = 'solid black';
	element.className = 'bomb';
	document.body.appendChild(element);
	reset(element);
	bombs.push(element);
}

function dropBombs() {
	if (gamePaused) {
		return;
	}
	if (gameTicks > 1000 && speedMult < 4) {
		for (var i = 0; i < 5; i++) {
			createBombs();
		}
		speedMult += 0.1;
		gameTicks = 0;
	}
	gameTicks++;
	for (var i = 0; i < bombs.length; i++) {
		var topOfBomb = bombs[i].offsetTop;
		randomExplode = Math.floor(Math.random() * 100);
		if (bombs[i].offsetTop == window.innerHeight - 100 - randomExplode) {
			reset(bombs[i]);
			score++;
		} else {
			if (objectCollision(player, bombs[i]) != 0) {
				bombs[i].className = 'explosion';
				bombs.splice(i, 1);
				gamePaused = true;
				player.className = 'character dead';
				return;
			}
			else {
			bombs[i].style.top = topOfBomb + 1 * speedMult + 'px';
			}
		}
	}
	
}

// prep for starting the game
function startGame() {
	requestAnimFrame(startGame);
	start[0].style.display = 'none';
	// generateBombs();
	move();
	dropBombs();
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
	if (gamePaused) {
		return;
	}
	var positionLeft = player.offsetLeft;
	var positionTop = player.offsetTop;
	
	if (downPressed) {
		if (player.offsetTop < window.innerHeight - 30) {
			var newTop = positionTop+2;
			player.style.top = newTop + 'px';
		}
		

		if (leftPressed == false) {
			if (rightPressed == false) {
				player.className = 'character walk down';
			}
		}
	}
	if (upPressed) {
		var newTop = positionTop-2;

		var element = document.elementFromPoint(0, newTop);
		console.log(element);
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
		var newLeft = positionLeft-2;

		var element = document.elementFromPoint(newLeft, player.offsetTop);
		if (element.classList.contains('sky') == false) {
			player.style.left = newLeft + 'px';	
		}


		player.className = 'character walk left';
	}
	if (rightPressed) {
		var newLeft = positionLeft+2;
		
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
	// timeout = setInterval(move, 10);
	document.addEventListener('keydown', keydown);
	document.addEventListener('keyup', keyup);
	start = document.getElementsByClassName('start');
	start[0].addEventListener('click', startGame);

	for (var i = 0; i < 20; i++) {
		createBombs();
	}


}
// not mine : ) ref: codepen from panas cunt 
window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame    ||
	window.oRequestAnimationFrame      ||
	window.msRequestAnimationFrame     ||
	function( callback ){
		window.setTimeout(callback, 1000 / 60);
	};})();


document.addEventListener('DOMContentLoaded', myLoadFunction);
