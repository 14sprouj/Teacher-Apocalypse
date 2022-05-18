// Render Player
$("#player").each(function () {
	var playerHead = document.createElement("div");
	playerHead.classList.add("head");
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

// Declare variables
var upPressed = false;
var rightPressed = false;
var downPressed = false;
var leftPressed = false;
var spacePressed = false;
var scr_height = document.getElementById("floor").offsetHeight;
var scr_width = document.getElementById("floor").offsetWidth;
var px, py;
var playerHeight = document.getElementById("player").offsetHeight;
var ph = document.getElementById("player").offsetHeight;
var playerWidth = document.getElementById("player").offsetWidth;
var pw = document.getElementById("player").offsetWidth;
var playerSpeed = 15;
var p_speed = 15;

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

// Player movement
setInterval(function () {
	if (leftPressed && px >= p_speed) px -= p_speed;
	if (leftPressed && px < p_speed) px = 0;
	if (rightPressed && px + pw <= scr_width - p_speed) px += p_speed; 
	if (rightPressed && px + pw > scr_width - p_speed) px = scr_width - pw;

	// ADD RIGHT TOP AND BOTTOM

	collisionDetection();
}, 50);

 function move() {
	player.style.left = px + "px";
	player.style.top = py + "px";
	player.style.width = pw + "px";
	player.style.height = ph + "px";
}	

function collisionDetection() {
	$(".obsticle").each(function () {
		var obx = $(this).offsetLeft;
		var oby = $(this).offsetTop;
		var obh = $(this).offsetHeight;
		var obw = $(this).offsetWidth;
		
		if (px + pw > obx - 1 && px < obx + obw + 2 && py + ph > oby - 1 && py < oby + obh + 2) {
		if (rightPressed && downPressed) {
			if (Math.abs((obx - 1) - (px + pw)) < Math.abs((oby - 1) - (py + ph))) 
				px = obx - pw - 1;
			else 
				py = oby - ph - 1;
		}
		else if (rightPressed && upPressed)
		{
			if (Math.abs((oby + obh + 2) - py) > Math.abs((obx - 1) - (px + pw)))
				px = obx - pw - 1;
			else
				py = oby + obh + 2;
		}
		else if (leftPressed && downPressed)
		{
			if (Math.abs((obx + obw + 2) - px) < Math.abs((oby - 1) - (py + ph)))
				px = obx + obw + 2;
			else
				py = oby - ph - 1;
		}
		else if (leftPressed && upPressed)
		{
			if (Math.abs((obx + obw + 2) - px) < Math.abs((oby + obh + 2) - py))
				px = obx + obw + 2;
			else
				py = oby + obh + 2;
		}
		else if (rightPressed) 
			px = obx - pw - 1;
		else if (leftPressed) 
			px = obx + obw + 2;
		else if (downPressed) 
			py = oby - ph - 1;
		else if (upPressed) 
			py = oby + obh + 2;
	}

	move();
	});
}