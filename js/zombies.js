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

// Move Zombies