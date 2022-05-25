// Render Player
$("#player").each(function () {
	var playerHead = document.createElement("div");
	playerHead.classList.add("head");
	playerHead.style.height = "1.1vh";
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
var playerX = 600;
var playerY = 100;
var playerH = 37;
var playerW = 37;
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
	if (leftPressed && playerX + (playerW / 2) >= p_speed) playerX -= p_speed;
	if (leftPressed && playerX < p_speed) playerX = 0 + (playerW / 2);

	if (rightPressed && playerX - (playerW / 2) <= scr_width - (playerW / 2) - p_speed) playerX += p_speed; 
	if (rightPressed && playerX - (playerW / 2) > scr_width - p_speed) playerX = scr_width - (playerW / 2);

	if (upPressed && playerY + (playerH / 2) >= p_speed) playerY -= p_speed;
	if (upPressed && playerY < p_speed) playerY = 0 + (playerH / 2);

	if (downPressed && playerY + (playerH / 2) <= scr_height - p_speed) playerY += p_speed;
	if (downPressed && playerY + playerH > scr_height - p_speed) playerY = scr_height - (playerH / 2);

	collisionDetection();
}, 50);

function move() {
	document.getElementById("playerX").innerHTML = playerX;
	document.getElementById("playerY").innerHTML = playerY;
	document.getElementById("playerH").innerHTML = playerH;
	document.getElementById("playerW").innerHTML = playerW;
	document.getElementById("objects").innerHTML = obstacleCoOrds;
	player.style.left = playerX + "px";
	player.style.top = playerY + "px";
	player.style.width = playerW + "px";
	player.style.height = playerH + "px";
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

		
		
		if (playerX + playerW > obx - 1 && playerX < obx + obw + 2 && playerY + playerH > oby - 1 && playerY < oby + obh + 2) {
		if (rightPressed && downPressed) {
			if (Math.abs((obx - 1) - (playerX + playerW)) < Math.abs((oby - 1) - (playerY + playerH))) 
				playerX = obx - playerW - 1;
			else 
				playerY = oby - playerH - 1;
		}
		else if (rightPressed && upPressed)
		{
			if (Math.abs((oby + obh + 2) - playerY) > Math.abs((obx - 1) - (playerX + playerW)))
				playerX = obx - playerW - 1;
			else
				playerY = oby + obh + 2;
		}
		else if (leftPressed && downPressed)
		{
			if (Math.abs((obx + obw + 2) - playerX) < Math.abs((oby - 1) - (playerY + playerH)))
				playerX = obx + obw + 2;
			else
				playerY = oby - playerH - 1;
		}
		else if (leftPressed && upPressed)
		{
			if (Math.abs((obx + obw + 2) - playerX) < Math.abs((oby + obh + 2) - playerY))
				playerX = obx + obw + 2;
			else
				playerY = oby + obh + 2;
		}
		else if (rightPressed) 
			playerX = obx - playerW - 1;
		else if (leftPressed) 
			playerX = obx + obw + 2;
		else if (downPressed) 
			playerY = oby - playerH - 1;
		else if (upPressed) 
			playerY = oby + obh + 2;
	}

		move();
		obID++;
		obstacleCoOrds += "<br/>";
	});
}