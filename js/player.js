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
var screenHeight = document.getElementById("floor").offsetHeight;
var screenWidth = document.getElementById("floor").offsetWidth;
var playerHeight = document.getElementById("player").offsetHeight;
var playerWidth = document.getElementById("player").offsetWidth;
var playerSpeed = 15;

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
	if (leftPressed && player.offsetLeft + (player.offsetWidth / 2) >= playerSpeed) {
		document.getElementById("player").style.left = player.offsetLeft - playerSpeed + "px";
	}
	if (leftPressed && player.offsetLeft < playerSpeed) {
		document.getElementById("player").style.left = (player.offsetWidth / 2) + "px";
	}

	// ADD RIGHT TOP AND BOTTOM

	collisionDetection();
}, 50);

function collisionDetection() {
	$(".obsticle").each(function () {
		var obx = $(this).offsetLeft;
		var oby = $(this).offsetTop;
		if (player.offsetLeft + player.offsetWidth > obx - 1 && px < obx + obw + 2 && player.offsetTop + player.offsetHeight > oby - 1 && py < oby + obh + 2) {
			if (rightpressed && downpressed) {
				if (Math.abs((obx - 1) - (player.offsetLeft + player.offsetWidth)) < Math.abs((oby - 1) - (player.offsetTop + player.offsetHeight)))
					px = obx - player.offsetWidth - 1;
				else
					player.offsetTop = oby - player.offsetHeight - 1;
			}
			else if (rightpressed && uppressed) {
				if (Math.abs((oby + obh + 2) - player.offsetTop) > Math.abs((obx - 1) - (player.offsetLeft + player.offsetWidth)))
					px = obx - player.offsetWidth - 1;
				else
					py = oby + obh + 2;
			}
			else if (leftpressed && downpressed) {
				if (Math.abs((obx + obw + 2) - player.offsetLeft) < Math.abs((oby - 1) - (player.offsetTop + player.offsetHeight)))
					px = obx + obw + 2;
				else
					py = oby - player.offsetHeight - 1;
			}
			else if (leftpressed && uppressed) {
				if (Math.abs((obx + obw + 2) - player.offsetLeft) < Math.abs((oby + obh + 2) - player.offsetTop))
					px = obx + obw + 2;
				else
					py = oby + obh + 2;
			}
			else if (rightpressed)
				px = obx - player.offsetWidth - 1;
			else if (leftpressed)
				px = obx + obw + 2;
			else if (downpressed)
				py = oby - player.offsetHeight - 1;
			else if (uppressed)
				py = oby + obh + 2;
		}
	});
}