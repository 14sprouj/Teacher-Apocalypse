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
var scr_height = 1000;
var scr_width = 750;
var px = 600;
var py = 100;
var playerHeight = 37;
var ph = 37;
var playerWidth = 37;
var pw = 37;
var playerSpeed = 15;
var p_speed = 15;
var obstacleCoOrds;

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
	if (leftPressed && px + (pw / 2) >= p_speed) px -= p_speed;
	if (leftPressed && px < p_speed) px = 0 + (pw / 2);

	if (rightPressed && px - (pw / 2) <= scr_width - (pw / 2) - p_speed) px += p_speed; 
	if (rightPressed && px - (pw / 2) > scr_width - p_speed) px = scr_width - (pw / 2);

	if (upPressed && py + (ph / 2) >= p_speed) py -= p_speed;
	if (upPressed && py < p_speed) py = 0 + (ph / 2);

	if (downPressed && py + ph <= scr_height - p_speed) py += p_speed;
	if (downPressed && py + ph > scr_height - p_speed) py = scr_height - (ph / 2);

	collisionDetection();
}, 50);

function move() {
	document.getElementById("playerX").innerHTML = px;
	document.getElementById("playerY").innerHTML = py;
	document.getElementById("objects").innerHTML = obstacleCoOrds;
	player.style.left = px + "px";
	player.style.top = py + "px";
	player.style.width = pw + "px";
	player.style.height = ph + "px";
}	

function collisionDetection() {
	obID = 1;
	obstacleCoOrds = "";
	$(".obstacle").each(function () {
		obstacleCoOrds += "ID: " + obID + "<br/>";
		obstacleCoOrds += "DOM ID: " + this.id + "<br/>";
		var obh = this.offsetHeight;
		var obw = this.offsetWidth;
		obstacleCoOrds += "Height: " + obh + " Width: " + obw + "<br/>";
		var obx = this.offsetLeft;
		var oby = this.offsetTop;
		obstacleCoOrds += "Left: " + obx + " Top: " + oby + "<br/>";

		
		
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
		obID++;
		obstacleCoOrds += "<br/>";
	});
}