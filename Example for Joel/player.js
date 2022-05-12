var rightpressed = false;
var leftpressed = false;
var uppressed = false;
var downpressed = false;

var directionDescription = "";

var scr_width = 1000;
var scr_height = 750;

var pw = 40;
var ph = 40;
var px = (scr_width - pw) / 2;
var py = (scr_height - ph) / 2;

var obx = 800;
var oby = 600;
var obw = 100;
var obh = 100;

var p_speed = 15;

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
	resetkeys();
}, false);

function resetkeys() {
	leftpressed = false;
	rightpressed = false;
	uppressed = false;
	downpressed = false;
}

setInterval(() => {
	if (init) setup();
	if (leftpressed && px >= p_speed) px -= p_speed;
	if (leftpressed && px < p_speed) px = 0;
	if (rightpressed && px + pw <= scr_width - p_speed) px += p_speed; 
	if (rightpressed && px + pw > scr_width - p_speed) px = scr_width - pw;
	if (uppressed && py >= p_speed) py -= p_speed;
	if (uppressed && py < p_speed) py = 0;
	if (downpressed && py + ph <= scr_height - p_speed) py += p_speed;
	if (downpressed && py + ph > scr_height - p_speed) py = scr_height - ph;
	
	collisiondetection();
}, 50);

 
function move() {
	directionDescription = "";
	info.innerHTML = `Player: ${px} ${py} ${pw} ${ph}` + directionDescription;
	player.style.left = px + "px";
	player.style.top = py + "px";
	player.style.width = pw + "px";
	player.style.height = ph + "px";
}	

function collisiondetection() {
	if (px + pw > obx - 1 && px < obx + obw + 2 && py + ph > oby - 1 && py < oby + obh + 2) {
		
		if (rightpressed) {
			px = obx - pw - 1;
			directionDescription += "Right Key pressed <br>";
		}
		if (leftpressed) px = obx + obw + 2;
		if (downpressed) py = oby - ph - 1;
		if (uppressed) py = oby + obh + 2;
		directionDescription;
	}
	move();
}


function setup() {
	obstacle.style.left = obx + "px";
	obstacle.style.top = oby + "px";
	obstacle.style.width = obw + "px";
	obstacle.style.height = obh + "px";
	move();
	init = false;
}

document.addEventListener('load', () => { 
	var player = document.getElementById('player'); 
	var info = document.getElementById('info');
	var obstacle = document.getElementById('obstacle');
}, false);

