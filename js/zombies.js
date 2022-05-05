// Render Zombies
$("zombie").each(function () { // Every time zombie is seen in html file, the code below will run
	var zombieHead = document.createElement("div");
	zombieHead.classList.add("head");
	this.appendChild(zombieHead);
	var zombieNeck = document.createElement("div");
	zombieNeck.classList.add("neck");
	this.appendChild(zombieNeck);
	var zombieTorso = document.createElement("div");
	zombieTorso.classList.add("torso");
	this.appendChild(zombieTorso);
	var zombieArms = document.createElement("div");
	zombieArms.classList.add("arms");
	this.appendChild(zombieArms);
	var zombieArmL = document.createElement("div");
	zombieArmL.classList.add("left");
	zombieArmL.classList.add("arm");
	zombieArms.appendChild(zombieArmL);
	var zombieArmR = document.createElement("div");
	zombieArmR.classList.add("right");
	zombieArmR.classList.add("arm");
	zombieArms.appendChild(zombieArmR);
	var zombieLegs = document.createElement("div");
	zombieLegs.classList.add("legs");
	this.appendChild(zombieLegs);
	var zombieLegL = document.createElement("div");
	zombieLegL.classList.add("left");
	zombieLegL.classList.add("leg");
	zombieLegs.appendChild(zombieLegL);
	var zombieLegR = document.createElement("div");
	zombieLegR.classList.add("right");
	zombieLegR.classList.add("leg");
	zombieLegs.appendChild(zombieLegR);
});

function getHypotenuse(zombieX, zombieY, playerX, playerY) {
	var hypotenuse = Math.sqrt((zombieX - playerX) * (zombieX - playerX) + (zombieY - playerY) * (zombieY - playerY));
	console.log("Distance: " + hypotenuse + "px");
	return hypotenuse;
}

function getAngle(zombieX, zombieY, playerX, playerY) {
	
}

// Move Zombies
setInterval(function () {
	$("zombie.active").each(function () {
		console.group("Zombie " + this.id + " and Player Distances");
		var playerCentX = player.offsetLeft + (player.offsetWidth / 2);
		var playerCentY = player.offsetTop + (player.offsetHeight / 2);
		var zombieCentX = this.offsetLeft + (this.offsetWidth / 2);
		var zombieCentY = this.offsetTop + (this.offsetHeight / 2);

		var zombieBlocked = false;

		var hypotenuse = Math.sqrt((zombieCentX - playerCentX) * (zombieCentX - playerCentX) + (zombieCentY - playerCentY) * (zombieCentY - playerCentY));
		console.log("Distance: " + hypotenuse + "px");
		
		var angle = Math.asin((zombieCentY - playerCentY) / hypotenuse);
		if (playerCentX < zombieCentX && playerCentY < zombieCentY) {
			angle = Math.PI - angle;
		}
		if (playerCentX < zombieCentX && playerCentY >= zombieCentY) {
			angle = -Math.PI - angle;
		}
		var direction = -angle / Math.PI;
		
		console.log("Direction: " + (direction * (180 / Math.PI)) + "&deg;");
		var speed = parseInt($(this).attr("speed"));
		console.log("Speed: " + speed);
		speed = speed / 0.9;
		this.style.left = this.offsetLeft + (speed * Math.cos(direction * Math.PI)) + "px";
		this.style.top = this.offsetTop + (speed * Math.sin(direction * Math.PI)) + "px";
		if (hypotenuse < 30) {
			var health = $(this).attr("attack");
			deductPlayerHealth(health);
        }
		console.groupEnd();
    })
}, 50)