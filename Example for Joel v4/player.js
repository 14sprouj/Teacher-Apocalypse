var rightpressed = false;
var leftpressed = false;
var uppressed = false;
var downpressed = false;

const scr_width = 1000;
const scr_height = 750;

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
			else if (rightpressed && uppressed)
			{
				if (Math.abs((oby + obh + 2) - py) > Math.abs((obx - 1) - (px + pw)))
					px = obx - pw - 1;
				else
					py = oby + obh + 2;
			}
			else if (leftpressed && downpressed)
			{
				if (Math.abs((obx + obw + 2) - px) < Math.abs((oby - 1) - (py + ph)))
					px = obx + obw + 2;
				else
					py = oby - ph - 1;
			}
			else if (leftpressed && uppressed)
			{
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
	obcount = $("obstaclecount").value;
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
	$("setup").style.display = "none";
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
	player.obj.innerHTML = "&nbsp;";
	player.w = defpw;
	player.h = defph;
	player.x = Math.random() * (scr_width - player.w);
	player.y = Math.random() * (scr_height - player.h);
	player.obj.style.left = player.x + "px";
	player.obj.style.top = player.y + "px";
	player.obj.style.width = player.w + "px";
	player.obj.style.width = player.h + "px";
	document.body.appendChild(player.obj);
}

function createObstacle() {
	for (n = 0; n < obcount; n++) {
		let o = {};
		o.obj = document.createElement('DIV');
		o.w = defobw;
		o.h = defobh;
		o.x = Math.random() * (scr_width - o.w);
		o.y = Math.random() * (scr_height - o.h);
		o.obj.classList.add("obstacle");
		o.obj.style.left = o.x + "px";
		o.obj.style.top = o.y + "px";
		o.obj.style.width = o.w + "px";
		o.obj.style.height = o.h + "px";
		if (n % 2 == 0) o.obj.style.backgroundColor = "yellow";
		obstacles[n] = o;
		document.body.appendChild(o.obj);
	}
}

function timerHandler() {
	//info.innerHTML = `${player.x} ${player.y}`;
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

//window.addEventListener('load', setup);

