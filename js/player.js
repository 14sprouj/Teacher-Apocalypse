// Player movement
var upPressed = false;
var rightPressed = false;
var downPressed = false;
var leftPressed = false;
var spacePressed = false;
var player = document.getElementById("player");

var score = 0;
var totalZombies = 2; // Number of zombies on the level
var playerSpeed = 6.5;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
	if (e.code == 'ArrowRight' || e.code == 'KeyD') {
		rightPressed = true;
	}
	if (e.code == 'ArrowLeft' || e.code == 'KeyA') {
		leftPressed = true;
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


setInterval(function () {
	if (gameActive == true) {
		//console.group("Check");

		var canMoveLeft = true;
		var canMoveUp = true;
		var canMoveDown = true;
		var canMoveRight = true;

		$(".zombie.active").each(function () {
			//console.log("ID: " + this.id);
			//console.log(this.offsetLeft < player.offsetLeft + player.offsetWidth && this.offsetLeft + this.offsetWidth > player.offsetLeft && this.offsetTop < player.offsetTop + player.offsetHeight && this.offsetHeight + this.offsetTop > player.offsetTop);
			if (this.offsetLeft < player.offsetLeft + player.offsetWidth && this.offsetLeft + this.offsetWidth > player.offsetLeft && this.offsetTop < player.offsetTop + player.offsetHeight && this.offsetHeight + this.offsetTop > player.offsetTop) {
				//console.log("Touching");
			}
		});

		try {
			var map = document.getElementById("floor");
			// Too High
			if (map.offsetTop > player.offsetTop - (player.offsetHeight / 2)) {
				document.getElementById("player").style.top = map.offsetTop + (player.offsetHeight / 2) + "px";
				canMoveUp = false;
			}
			if (map.offsetTop == player.offsetTop) {
				canMoveUp = false;
			}
			if (map.offsetTop + 1 == player.offsetTop - player.offsetHeight / 2) {
				canMoveUp = false;
				console.warn("Touching top of map");
			}

			// Too Low
			if (map.offsetTop + map.offsetHeight < player.offsetTop + player.offsetHeight / 2) {
				document.getElementById("player").style.top = map.offsetTop - player.offsetHeight / 2 + map.offsetHeight + "px";
				canMoveDown = false;
			}
			if (map.offsetTop + map.offsetHeight + 1 == player.offsetTop + player.offsetHeight / 2) {
				canMoveDown = false;
			}

			// Too Far Left
			if (map.offsetLeft > player.offsetLeft - player.offsetWidth / 2) {
				document.getElementById("player").style.left = map.offsetLeft + player.offsetWidth / 2 + "px";
				canMoveLeft = false;
			}
			if (map.offsetLeft + 1 == player.offsetLeft - player.offsetWidth / 2) {
				canMoveLeft = false;
			}

			// Too Far Right
			if (map.offsetLeft + map.offsetWidth < player.offsetLeft + player.offsetWidth / 2) {
				document.getElementById("player").style.left = map.offsetLeft - player.offsetWidth / 2 + map.offsetWidth + "px";
				canMoveRight = false;
			}
			if (map.offsetLeft + map.offsetWidth - 1 == player.offsetLeft + player.offsetWidth / 2) {
				canMoveRight = false;
			}
		} catch (err) {
			console.error(err.message);
		}

		$(".obsticle").each(function () {
			this.playerCollide = false;
			if (this.offsetLeft < player.offsetLeft + player.offsetWidth && this.offsetLeft + this.offsetWidth > player.offsetLeft && this.offsetTop < player.offsetTop + player.offsetHeight && this.offsetHeight + this.offsetTop > player.offsetTop) {
				console.group("Touching obsticle");
				this.playerCollide = true;
				console.log("Obsticle ID:" + this.id);
				console.groupEnd();
			}

			// is player left of obsticle?
			if (player.offsetLeft < this.offsetLeft - 20 && this.playerCollide) {
				canMoveLeft = false;
				document.getElementById("player").style.left = this.offsetLeft + "px";
				console.warn("Collide on left of obsticle");
			}

			// is player right of obsticle?
			if (player.offsetLeft > this.offsetLeft + this.offsetWidth - 20 && this.playerCollide) {
				canMoveLeft = false;
				document.getElementById("player").style.left = this.offsetLeft + this.offsetWidth + player.offsetWidth / 2 + "px";
				console.warn("Collide on right of obsticle");
			}

			// is player up of obsticle?
			if (player.offsetTop + player.offsetHeight < this.offsetTop + 20 && this.playerCollide) {
				canMoveDown = false;
				document.getElementById("player").style.top = this.offsetTop - player.offsetHeight / 2 + "px";
				console.warn("Collide on up of obsticle");
			}

			// is player down of obsticle?
			if (player.offsetTop > this.offsetTop + this.offsetHeight - 20 && this.playerCollide) {
				canMoveUp = false;
				document.getElementById("player").style.top = this.offsetTop + this.offsetHeight + player.offsetHeight / 2 + "px";
				console.warn("Collide on down of obsticle");
			}
		});

		if (leftPressed && gameActive && canMoveLeft) {
			player.style.left = player.offsetLeft - playerSpeed + "px"
		}
		if (rightPressed && gameActive && canMoveRight) {
			player.style.left = player.offsetLeft + playerSpeed + "px"
		}
		if (upPressed && gameActive && canMoveUp) {
			player.style.top = player.offsetTop - playerSpeed + "px"
		}
		if (downPressed && gameActive && canMoveDown) {
			player.style.top = player.offsetTop + playerSpeed + "px"
		}
		//console.groupEnd();
	} // Only run if gameActive
}, 10)

