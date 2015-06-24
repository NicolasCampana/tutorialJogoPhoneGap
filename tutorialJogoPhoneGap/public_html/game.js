var player = {
	x:10, 
	y:10, 
	width:50,
	height:50,
	frame:1
};

var framePerdeu = 0;
var pontos = 0;

var npcs = [];

var imgPlayer = [];
var imgNPC = [];

var clicado = false;

function instanciarNPC() {
	var npc = {
		x:10, 
		y:10, 
		width:50,
		height:50,
		frame:1
	};
	return npc;
}

function iniciaJogo() {
	for (i = 0; i<5; i++) {
		npcs[i] = instanciarNPC();
		npcs[i].x = 640 + (i * 128);
		npcs[i].y = Math.round(Math.random() * 310);
	}
	framePerdeu = 0;
	pontos = 0;
}

function onLoad(){
	iniciaJogo();
	
	for (i = 0; i<8; i++) {
		imgPlayer[i] = new Image();
		imgPlayer[i].src = "imgs/bird"+i+".png";
	}
	for (i = 0; i<8; i++) {
		imgNPC[i] = new Image();
		imgNPC[i].src = "imgs/npc"+i+".png";
	}
	
	canvas = document.getElementById("tela");
	context = canvas.getContext("2d");
	
	var FPS = 30;
	setInterval(function() {
	  update();
	  draw();
	}, 1000/FPS);
	
	//eventos
	canvas.addEventListener("mousedown", onDown, false);
	canvas.addEventListener("mouseup", onUp, false);
	canvas.addEventListener("touchstart", onDown, false);
	canvas.addEventListener("touchend", onUp, false);
	
	onResize();
}
function onResize() {
	//tela inteira
	canvas.width  = window.innerWidth;
	canvas.height = window.innerHeight;
	
	ratioX = canvas.width / 640;
	ratioY = canvas.height / 360;
}
function update() {
	if (framePerdeu>0) {
		alert('VOCE PERDEU!');
		iniciaJogo();

	} else {
		if (clicado) {
			if (player.y>0) {
				player.y -= 10;
			}
		} else {
			if (player.y<310) {
				player.y += 10;
			}
		}
		
		//atualiza NPCs
		for (i = 0; i<npcs.length; i++) {
			npcs[i].x -= 5;
			if (npcs[i].x+npcs[i].width<0) {
				npcs[i].x = 690;
				npcs[i].y = Math.round(Math.random() * 310);
				pontos++;
			}
		}
		
		//verifica colisão
		for (i = 0; i<npcs.length; i++) {
			if (player.y + player.height > npcs[i].y 
				&& player.y < npcs[i].y + npcs[i].height 
				&& player.x + player.width > npcs[i].x 
				&& player.x < npcs[i].x + npcs[i].width) {
				
				framePerdeu = 1;
			}
		}
	}
}

function draw() {
	//context.clearRect(0, 0, canvas.width, canvas.height);
	context.fillStyle = "#3ea8f6";
	context.fillRect(0, 0, canvas.width, canvas.height);
	
	//context.fillStyle = "green";
	//context.fillRect(player.x * ratioX, player.y * ratioY, player.width * ratioX, player.height * ratioY);
	context.drawImage(imgPlayer[player.frame], (player.x-12) * ratioX, (player.y-4) * ratioY, (player.width+30) * ratioX, (player.height+13) * ratioY);
	if (framePerdeu==0) {
		player.frame++;
		if (player.frame>7) {
			player.frame = 0;
		}
	}
	
	//context.fillStyle = "red";
	for (i = 0; i<npcs.length; i++) {
		//context.fillRect(npcs[i].x * ratioX, npcs[i].y * ratioY, npcs[i].width * ratioX, npcs[i].height * ratioY);
		context.drawImage(imgNPC[npcs[i].frame], (npcs[i].x-17) * ratioX, (npcs[i].y-4) * ratioY, (npcs[i].width+30) * ratioX, (npcs[i].height+13) * ratioY);
		if (framePerdeu==0) {
			npcs[i].frame++;
			if (npcs[i].frame>7) {
				npcs[i].frame = 0;
			}
		}
	}
	
	context.fillStyle = "black";
	context.font="40px Verdana";
	context.fillText(pontos, 50,50);
}

function onDown(event) {
    clicado = true;
	event.preventDefault();
}
function onUp(event) {
	clicado = false;
	event.preventDefault();
}
