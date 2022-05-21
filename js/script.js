// Declare and assign variables
var upPressed = false;
var rightPressed = false;
var downPressed = false;
var leftPressed = false;
var spacePressed = false;
var scr_height = 1000;
var scr_width = 750;
var playerX = document.getElementById("player").offsetLeft;
var playerY = document.getElementById("player").offsetTop;
var playerH = document.getElementById("player").offsetHeight;
var playerW = document.getElementById("player").offsetWidth;
var p_speed = 15;




// LOAD ENTITIES
// Load Player
$("#player").each(function () {
	var playerHead = document.createElement("div");
	playerHead.classList.add("head");
	playerHead.style.height = "1.1vh";
	playerHead.style.width = "1.1vh";
    playerHead.style.background = "gray";
    playerHead.style.borderRadius = "4px 4px 0 0";
	this.appendChild(playerHead);
	var playerNeck = document.createElement("div");
	playerNeck.classList.add("neck");
	this.appendChild(playerNeck);
	var playerTorso = document.createElement("div");
	playerTorso.classList.add("torso");
	this.appendChild(playerTorso);
	var playerArms = document.createElement("div");
	playerArms.classList.add("arms");
	this.appendChild(playerArms);
	var playerArmL = document.createElement("div");
	playerArmL.classList.add("left");
	playerArmL.classList.add("arm");
	playerArms.appendChild(playerArmL);
	var playerArmR = document.createElement("div");
	playerArmR.classList.add("right");
	playerArmR.classList.add("arm");
	playerArms.appendChild(playerArmR);
	var playerLegs = document.createElement("div");
	playerLegs.classList.add("legs");
	this.appendChild(playerLegs);
	var playerLegL = document.createElement("div");
	playerLegL.classList.add("left");
	playerLegL.classList.add("leg");
	playerLegs.appendChild(playerLegL);
	var playerLegR = document.createElement("div");
	playerLegR.classList.add("right");
	playerLegR.classList.add("leg");
	playerLegs.appendChild(playerLegR);
});

// PLAYER MOVEMENT
// Check key presses
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
	if (e.code == 'ArrowRight' || e.code == 'KeyD') {
		rightPressed = true;
	}
	if (e.code == 'ArrowLeft' || e.code == 'KeyA') {
		leftPressed = true;
		console.log("left key pressed");
	}
	if (e.code == 'ArrowUp' || e.code == 'KeyW') {
		upPressed = true;
	}
	if (e.code == 'ArrowDown' || e.code == 'KeyS') {
		downPressed = true;
	}
}

function keyUpHandler(e) {
	if (e.code == 'ArrowRight' || e.code == 'KeyD') {
		rightPressed = false;
	}
	if (e.code == 'ArrowLeft' || e.code == 'KeyA') {
		leftPressed = false;
	}
	if (e.code == 'ArrowUp' || e.code == 'KeyW') {
		upPressed = false;
	}
	if (e.code == 'ArrowDown' || e.code == 'KeyS') {
		downPressed = false;
	}
}

function move() {
	//info.innerHTML = `Player: ${px} ${py} ${pw} ${ph}`;
	player.obj.style.left = player.x + "px";
	player.obj.style.top = player.y + "px";
	player.obj.style.width = player.w + "px";
	player.obj.style.height = player.h + "px";
}

// Load Zombies
// retreive json from local file
var xhr = new XMLHttpRequest();
xhr.open('GET', 'data.json', true);
xhr.onload = function() {
	if (this.status == 200) {
		var data = JSON.parse(this.responseText);
		var zombies = data.floors[0].floor2[0].zombies;
		console.log(zombies);
		for (var i = 0; i < zombies.length; i++) {
			var zombie = zombies[i];
			var zombieObj = document.createElement("div");
			zombieObj.id = zombie.id;
			zombieObj.classList.add("zombie");
			zombieObj.style.left = zombie.x + "px";
			zombieObj.style.top = zombie.y + "px";
			zombieObj.style.width = zombie.w + "px";
			zombieObj.style.height = zombie.h + "px";
			zombieObj.style.background = zombie.color;
			zombieObj.style.borderRadius = "4px";
			zombieObj.style.position = "absolute";
			zombieObj.style.zIndex = "1";
			document.body.appendChild(zombieObj);
		}
	}
}
xhr.send();
