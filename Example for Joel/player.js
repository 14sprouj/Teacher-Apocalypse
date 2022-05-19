var rightpressed = false;
var leftpressed = false;
var uppressed = false;
var downpressed = false;

var scr_width = 1000;
var scr_height = 750;

var pw = 40;
var ph = 40;
var px = 600;
var py = 100;

var obw = 100;
var obh = 100;
var obx = (scr_width - obw) / 2;
var oby = (scr_height - obh) / 2;

var p_speed = 5;

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
	info.innerHTML = `Player: ${px} ${py} ${pw} ${ph}`;
	player.style.left = px + "px";
	player.style.top = py + "px";
	player.style.width = pw + "px";
	player.style.height = ph + "px";
}	

function collisiondetection() {
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

