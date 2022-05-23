var rightpressed = false;
var leftpressed = false;
var uppressed = false;
var downpressed = false;

const scr_width = 750;
const scr_height = 500;

const defpw = 20;
const defph = 20;

const defobw = 40;
const defobh = 40;

var p_speed = 5;

var obstacles = [];
var obcount;
var player;
var info;
var obstacle;

//var player;
//var info;

var init = true;

document.addEventListener('keydown', (event) => {
	//resetkeys();
	if (event.key == 'ArrowLeft') leftpressed = true;
	if (event.key == 'ArrowRight') rightpressed = true;
	if (event.key == 'ArrowUp') uppressed = true;
	if (event.key == 'ArrowDown') downpressed = true;
}, false);

document.addEventListener('keyup', (event) => {
	//resetkeys();
	if (event.key == 'ArrowLeft') leftpressed = false;
	if (event.key == 'ArrowRight') rightpressed = false;
	if (event.key == 'ArrowUp') uppressed = false;
	if (event.key == 'ArrowDown') downpressed = false;
}, false);

function resetkeys() {
	leftpressed = false;
	rightpressed = false;
	uppressed = false;
	downpressed = false;
}


function move() {
	//info.innerHTML = `Player: ${px} ${py} ${pw} ${ph}`;
	player.obj.style.left = player.x + "px";
	player.obj.style.top = player.y + "px";
	player.obj.style.width = player.w + "px";
	player.obj.style.height = player.h + "px";
}

function collisiondetection() {
	for (n = 0; n < obstacles.length; n++) {
		let obx = obstacles[n].x;
		let oby = obstacles[n].y;
		let obw = obstacles[n].w;
		let obh = obstacles[n].h;
		let px = player.x;
		let py = player.y;
		let pw = player.w;
		let ph = player.h;

		if (px + pw > obx - 1 && px < obx + obw + 2 && py + ph > oby - 1 && py < oby + obh + 2) {
			if (rightpressed && downpressed) {
				if (Math.abs((obx - 1) - (px + pw)) < Math.abs((oby - 1) - (py + ph)))
					px = obx - pw - 1;
				else
					py = oby - ph - 1;
			}
			else if (rightpressed && uppressed) {
				if (Math.abs((oby + obh + 2) - py) > Math.abs((obx - 1) - (px + pw)))
					px = obx - pw - 1;
				else
					py = oby + obh + 2;
			}
			else if (leftpressed && downpressed) {
				if (Math.abs((obx + obw + 2) - px) < Math.abs((oby - 1) - (py + ph)))
					px = obx + obw + 2;
				else
					py = oby - ph - 1;
			}
			else if (leftpressed && uppressed) {
				if (Math.abs((obx + obw + 2) - px) < Math.abs((oby + obh + 2) - py))
					px = obx + obw + 2;
				else
					py = oby + obh + 2;
			}
			else if (rightpressed)
				px = obx - pw - 1;
			else if (leftpressed)
				px = obx + obw + 2;
			else if (downpressed)
				py = oby - ph - 1;
			else if (uppressed)
				py = oby + obh + 2;
		}
		player.x = px;
		player.y = py;
	}
	move();
}


function setup() {
	createPlayer();
	createObstacle();
	/* 	player = document.getElementById('player'); */
	info = document.getElementById('info');
	/*	obstacle = document.getElementById('obstacle');
		createObstacle();
		obstacle.style.left = obx + "px";
		obstacle.style.top = oby + "px";
		obstacle.style.width = obw + "px";
		obstacle.style.height = obh + "px";
		move();
	*/
	//$("setup").style.display = "none";
	setInterval(timerHandler, 50);
}

function $(id) {
	return document.getElementById(id);
}

function sliderupdate() {
	$("cnt").innerHTML = $("obstaclecount").value;
}

function createPlayer() {
	player = {};
	player.obj = document.createElement('div');
	player.obj.id = "player";
	//player.w = defpw;
	//player.h = defph;
	player.x = Math.random() * (scr_width - player.w);
	player.y = Math.random() * (scr_height - player.h);
	//player.obj.style.left = player.x + "px";
	//player.obj.style.top = player.y + "px";
	//player.obj.style.width = player.w + "px";
	//player.obj.style.height = player.h + "px";
	player.obj.style.display = "flex";
	player.obj.style.alignItems = "center";
	player.obj.style.flexDirection = "column";
	player.obj.style.height = "4vh";
	player.obj.style.width = "3vh";
	player.obj.style.position = "absolute";
	player.obj.style.top = "50%";
	player.obj.style.left = "50%";
	player.obj.style.transform = "translate(-50%, -50%)";
	player.obj.style.zIndex = "5";
	player.obj.style.transition = "left ease-in-out 0.01s, top ease-in-out 0.01s";
	var playerHead = document.createElement("div");
	playerHead.classList.add("head");
	playerHead.style.height = "1.1vh";
	playerHead.style.width = "1.1vh";
	playerHead.style.background = "gray";
	playerHead.style.borderRadius = "4px 4px 0 0";
	player.obj.appendChild(playerHead);
	var playerNeck = document.createElement("div");
	playerNeck.classList.add("neck");
	playerNeck.style.height = "0.1538461538vh";
	playerNeck.style.width = "0.6vh";
	playerNeck.style.background = "gray";
	player.obj.appendChild(playerNeck);
	var playerTorso = document.createElement("div");
	playerTorso.classList.add("torso");
	playerTorso.style.height = "1.5vh";
	playerTorso.style.width = "1.5vh";
	playerTorso.style.background = "#ff0000";
	player.obj.appendChild(playerTorso);
	var playerArms = document.createElement("div");
	playerArms.classList.add("arms");
	playerArms.style.position = "relative";
	playerArms.style.bottom = "1.5vh";
	playerArms.style.right = "0.95vh";
	player.obj.appendChild(playerArms);
	var playerArmL = document.createElement("div");
	playerArmL.classList.add("left");
	playerArmL.classList.add("arm");
	playerArmL.style.height = "1.3vh";
	playerArmL.style.width = "0.45vh";
	playerArmL.style.position = "absolute";
	playerArmL.style.background = "#ff0000";
	playerArmL.style.left = "-0.25vh";
	playerArmL.style.transform = "rotate(10deg)";
	playerArms.appendChild(playerArmL);
	var playerArmR = document.createElement("div");
	playerArmR.classList.add("right");
	playerArmR.classList.add("arm");
	playerArmR.style.height = "1.3vh";
	playerArmR.style.width = "0.45vh";
	playerArmR.style.position = "absolute";
	playerArmR.style.background = "#ff0000";
	playerArmR.style.left = "1.65vh";
	playerArmR.style.transform = "rotate(345deg)";
	playerArms.appendChild(playerArmR);
	var playerLegs = document.createElement("div");
	playerLegs.classList.add("legs");
	playerLegs.style.position = "relative";
	playerLegs.style.left = "-0.2vh";
	playerLegs.style.height = "1.45vh";
	player.obj.appendChild(playerLegs);
	var playerLegL = document.createElement("div");
	playerLegL.classList.add("left");
	playerLegL.classList.add("leg");
	playerLegL.style.height = "1.45vh";
	playerLegL.style.width = "0.6vh";
	playerLegL.style.background = "black";
	playerLegL.style.position = "absolute";
	playerLegL.style.left = "-0.5vh";
	playerLegs.appendChild(playerLegL);
	var playerLegR = document.createElement("div");
	playerLegR.classList.add("right");
	playerLegR.classList.add("leg");
	playerLegR.style.height = "1.45vh";
	playerLegR.style.width = "0.6vh";
	playerLegR.style.background = "black";
	playerLegR.style.position = "absolute";
	playerLegR.style.left = "0.35vh";
	playerLegs.appendChild(playerLegR);
	document.body.appendChild(player.obj);
}

function timerHandler() {
	info.innerHTML = `${player.x} ${player.y}`;
	if (leftpressed && player.x >= p_speed) player.x -= p_speed;
	if (leftpressed && player.x < p_speed) player.x = 0;
	if (rightpressed && player.x + player.w <= scr_width - p_speed) player.x += p_speed;
	if (rightpressed && player.x + player.w > scr_width - p_speed) player.x = scr_width - player.w;
	if (uppressed && player.y >= p_speed) player.y -= p_speed;
	if (uppressed && player.y < p_speed) player.y = 0;
	if (downpressed && player.y + player.h <= scr_height - p_speed) player.y += p_speed;
	if (downpressed && player.y + player.h > scr_height - p_speed) player.y = scr_height - player.h;

	collisiondetection();
}

window.addEventListener('load', setup);

function createObstacle() {
	// count number of elements with class obstacle
	let obstacles = document.getElementsByClassName('obstacle');

	for (n = 0; n < obstacles.length; n++) {
		console.log(obstacles[n]);
		obst = obstacles[n];
		var obstacleW = obstacles[n].width;
		console.log(obstacleW);
		var obstacleH = obstacles[n].height;
		var obstacleX = Math.random() * (scr_width - obstacleW);
		var obstacleY = Math.random() * (scr_height - obstacleH);
		//obst.classList.add("obstacle");
		obst.style.left = obstacleX + "px";
		obst.style.top = obstacleY + "px";
		obst.style.width = obstacleW;
		obst.style.height = obstacleH;
		console.log(obstacleX);
		obstacles[n].style.left = obstacleX + "px";
		//$(this).css("left", obstacleX + "px");
	};
}
createObstacle();