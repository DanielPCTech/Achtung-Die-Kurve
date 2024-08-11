//creator : Daniel Eliasson

var path = window.location.href;
path1 = path.slice(0, path.length - 10); // local files website
path2 = path.slice(0, path.length); // broadcasted website
//console.log(path);
font = " Comic Sans MS";

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");


// AUDIO section
var fxMute = true;
const soundfx = document.getElementById("soundEffects");
function playsoundFx() {
	if(fxMute) {
		fxMute = false;
	} else {
		fxMute = true;
		audio.pause();
	}
} 

function deathFx() {
	if(!fxMute) {
		soundfx.src = "soundfx/death.mp3";
		soundfx.pause();
		soundfx.load();
		soundfx.play();
	}
}

function powerUpFx() {
	if(!fxMute) {
		soundfx.src = "soundfx/powerUp.mp3";
		soundfx.pause();
		soundfx.load();
		soundfx.play();
	}
}


//background track
var musicMute = true;
const audio = document.getElementById("backgroundMusic");
function playAudio() {
	console.log(players);
	console.log(path1)
	console.log(path2)
	console.log(audio.src);
	if(musicMute) {
		musicMute = false;
		audio.play();
	} else {
		musicMute = true;
		audio.pause();
	}
} 


//auto change track
function nextTrack() {
	if(audio.src == path1 +"music/freshsparksmono.mp3" || audio.src == path2 +"music/freshsparksmono.mp3") {
		audio.src = "music/ontherunmono.mp3";
	} else if(audio.src == path1 +"music/ontherunmono.mp3" || audio.src == path2 +"music/ontherunmono.mp3") {
		audio.src = "music/timetogomono.mp3";
	} else {
		audio.src = "music/freshsparksmono.mp3"
	}
	audio.load();
	audio.play();
}
audio.onended = function() {nextTrack()};




function spawnPowerUp(num) {
	for(var i=0; i<num; i++) {
		const type = powerUpTypes[ Math.floor(Math.random()*powerUpTypes.length) ];
		//console.log(type);
		const x = Math.floor(50 + Math.random()*900);
		const y = Math.floor(50 + Math.random()*900);
		//console.log(x + " " + y);
		powerUps.push( new powerUp(type, x, y) );
	}
}


var defaultPlayers = [	new player("Fred", `rgb(255, 0, 0)`, " ", " "),
					new player("Greenlee", `rgb(0, 255, 0)`, " ", " "),
					new player("Pinkley", `rgb(255, 0, 255)`, " ", " "),
					new player("Bluebell", `rgb(0, 255, 255)`, " ", " "),
					new player("Willem", `rgb(255, 127, 0)`, " ", " "),
					new player("Greydon", `rgb(200, 200, 200)`, " ", " ")];


//<button id="player1" onclick="playerActive(1)" type="button" style="position:fixed; z-index:2; opacity: 0.2; cursor: pointer;">Player1</button>
for(var i = 0; i< defaultPlayers.length; i++) {
	const newButton = document.createElement("button");
	newButton.id="btn"+ i;
	newButton.type = "button";
	const myI = JSON.parse(JSON.stringify(i));
	newButton.addEventListener("click", function(){
		//console.log(myI)
		pokePlayer(myI);
	}, i)
	
	newButton.style = "position:fixed; z-index:2; opacity: 0; cursor: pointer;";
	const body = document.getElementById("body");
	body.appendChild(newButton);
}	

function pokePlayer(i) {
	//console.log(i)
	if(defaultPlayers[i].LeftKey == " ") { //inactive before -> make active
		defaultPlayers[i].LeftKey = "  ";
	} else {
		defaultPlayers[i].LeftKey = " ";
		defaultPlayers[i].RightKey = " ";
	}
	
}


var gameState = "newGame";
var players = [new player("Fred", `rgb(255, 0, 0)`, 65, 83)];
var powerUps = [new powerUp("meGrid", 550, 320), new powerUp("meGrid", 550, 515)];
var prevKeys = [];
var sides = 0;

function play() {
	if(gameState == "newGame") {
		players = defaultPlayers.filter(function f(val) {
			return val.LeftKey != " "  && val.RightKey != " ";
		});
		if(players.length > 0) {
			//console.log(players);
			gameState = "newRound";
		}
	}
}

function gameLoop() {
	
	if(keysDown.includes(27) && prevKeys.includes(27)==false){
		gameState = "newGame";
	}
	
	switch(gameState) {
		case "newGame":
			for(var i=0;i<defaultPlayers.length; i++){
				defaultPlayers.Score = 0;
			}
			
			//new keypress
			if(keysDown.length > prevKeys.length) {
				const newKey = keysDown.filter(function f(val) {
					return !prevKeys.includes(val);
				})[0];
				if(keycodeToChar(newKey) != null) {
					for(var i=0; i<defaultPlayers.length; i++)  {
						if(defaultPlayers[i].LeftKey == "  ") {
							defaultPlayers[i].LeftKey = newKey;
							defaultPlayers[i].RightKey = "  ";
							
						} else if(defaultPlayers[i].RightKey == "  ") {
							defaultPlayers[i].RightKey = newKey;
						}
					}
				} else if(newKey == 32) {
					play();
				}
			}
		
			prevKeys = keysDown.slice();
		break;
		
		case "newRound":
			clearDelayCalls();
			sides = 0;
			for(var i=0; i<players.length; i++) {
				players[i].spawn(100 + 800*Math.random(), 100 + 800*Math.random(), 2*Math.PI*Math.random());
			}
			powerUps = [];
			gameState = "pause";
		break;
		
		case "pause":
			if(keysDown.includes(32) && prevKeys.includes(32)==false){
				gameState = "play";
			}
			prevKeys = keysDown.slice();
		break;
		
		case "play":
			if(keysDown.includes(32) && prevKeys.includes(32)==false){
				gameState = "pause";
			}
			prevKeys = keysDown.slice();
			
			//update players
			for(var i=0; i< players.length; i++){
				if(players[i].alive) {
					players[i].move(keysDown);
					players[i].crossWalls(sides > 0);
					
					for(var a = -Math.PI/3; a<=Math.PI/3; a+= Math.PI/3) {
						
						var x = players[i].X + players[i].thickness*Math.cos(players[i].angle +a)/2;
						var y = players[i].Y + players[i].thickness*Math.sin(players[i].angle +a)/2;
						
						if(players[i].grid) {
							x = players[i].X + players[i].thickness*Math.cos(players[i].angle)/2;
							y = players[i].Y + players[i].thickness*Math.sin(players[i].angle)/2;
						}
						
						if(players[i].checkWalls(x, y)) {
							if(players[i].sides <= 0 && sides <= 0) {
								players[i].alive = false;
							}
						}
						for(var j=0; j< players.length; j++){
							if(players[j].checkCollision(x,y)) {
								players[i].alive = false;
							}
						}
						
						for(var j=0; j<powerUps.length; j++) {
							if(powerUps[j].collision(x,y)) {
								powerUps[j].use(players, i);
								powerUps.splice(j, 1);
								powerUpFx();
								break;
							}
						}
					}
				
					if(players[i].alive == false) { // new death
						deathFx();
						for(var j=0; j< players.length; j++){
							if(players[j].alive) {
								players[j].Score += 1;
							}
						}
						playerSort();
					}
				}
			}
			
			//spawn powerups
			if(Math.random() > 0.999) {
				spawnPowerUp(Math.floor(4*Math.random()));
			}
			
			//check if win
			var alive = 0;
			for(var i=0; i<players.length; i++) {
				if(players[i].alive) {
					alive += 1;
				}
			}
			if(alive <=1) {
				var topScore = 0;
				var secondTopScore = 0;
				for(var i=0; i<players.length; i++) {
					if(players[i].Score >= topScore) {
						secondTopScore = JSON.parse(JSON.stringify(topScore));
						topScore = players[i].Score;
					} else if(players[i].Score >= secondTopScore) {
						secondTopScore = players[i].Score;
					}
				}
				if( (topScore >=10*(players.length-1)) && topScore -2 >= secondTopScore) {
					gameState = "gameOver"
				} else {
					gameState = "roundOver";
				}
			}
			//run delay loop
			delayLoop();
		break;
		
		case "roundOver":
			if(keysDown.includes(32) && prevKeys.includes(32)==false){
				gameState = "newRound"
			}
			prevKeys = keysDown.slice();
		break;
		
		case "gameOver":
			if(keysDown.includes(32) && prevKeys.includes(32)==false){
				gameState = "newGame";
			}
			prevKeys = keysDown.slice();
		break;
	}
	
}
gameTick = setInterval(gameLoop, 5); //200Hz gameloop

function playerSort(){
	players.sort(function(a, b) {
		var keyA = a.Score, keyB = b.Score;
		// Compare the 2 dates
		if (keyA < keyB) return -1;
		if (keyA > keyB) return 1;
		return 0;
	});
	players.reverse();
}


var keysDown = [];
document.body.onkeydown = function(event) {
	var key = event.which || event.keyCode; //stores the key as a variable
	if(keycodeToChar(key) != null || 32) {
		event.preventDefault();
	}
	if(!keysDown.includes(key)) {
		keysDown.push(key);
	}
};
document.body.onkeyup = function(event) {
	var key = event.which || event.keyCode; //stores the key as a variable
	
	
	keysDown = keysDown.filter(function f(val) {
		return val != key;
	})
};




function fps() {
	fpsNum = (fps - old_fps.shift());
	old_fps.push(fps);
}fpsTick = setInterval(fps, 200);

var fps = 0;
var old_fps = [0, 0, 0, 0, 0];
var fpsNum = 0;



var playeBtnHover= false;
var blinkTime = 0;
function animationLoop() {
	requestAnimationFrame(animationLoop);
	
	//window and display buffer setup
	var s;
	if(window.innerWidth > window.innerHeight*4/3) { // height constraint, width nonlimited
		canvas.height = window.innerHeight;
		canvas.width = window.innerHeight*4/3;
		s = window.innerHeight/1000;//scale factor
		canvas.style.left = ( window.innerWidth - window.innerHeight*4/3 )/2 + "px"
		canvas.style.top = "0px"
	} else { //width constraint, height nonlimited
		canvas.height = window.innerWidth*3/4;
		canvas.width = window.innerWidth;
		s = (3/4)*window.innerWidth/1000;//scale factor
		canvas.style.left = "0px"
		canvas.style.top = ( window.innerHeight - window.innerWidth*3/4 )/2 + "px"
	}
	ctx.scale(s, s);
	
	
	//music button
	ctx.textAlign = "center";
	ctx.fillStyle = "yellow";
	ctx.font = "30px" + font;
	if(musicMute) {
		ctx.fillText("Music: off", 1170, 870);
	} else {
		ctx.fillText("Music: on", 1170, 870);
	}
	var btn = document.getElementById("musicBtn");
	btn.style.top = parseFloat(canvas.style.top) + s*840 + "px";
	btn.style.left = parseFloat(canvas.style.left) + 1090*s +"px";
	btn.style.width = s*160 + "px";
	btn.style.height = s*40 + "px";
	//sound fx button
	if(fxMute) {
		ctx.fillText("Sound Fx: off", 1170, 920);
	} else {
		ctx.fillText("Sound Fx: on", 1170, 920);
	}
	var btn = document.getElementById("fxBtn");
	btn.style.top = parseFloat(canvas.style.top) + s*890 + "px";
	btn.style.left = parseFloat(canvas.style.left) + 1070*s +"px";
	btn.style.width = s*200 + "px";
	btn.style.height = s*40 + "px";
	
	
	switch(gameState) {
		case "pause":
		case "play":
		case "roundOver":
		case "gameOver":
			
			//draw players
			for(var i=0; i< players.length; i++){
				players[i].drawKurve();
				ctx.font = "40px" + font;
				ctx.fillStyle = players[i].Color;
				ctx.fillText(players[i].Name + ": " + players[i].Score, 1170, 380 + 50*i);
			}
			for(var i=0; i< players.length; i++){
				players[i].drawHead();
			}
			for(var i=0; i<powerUps.length; i++) {
				powerUps[i].draw();
			}
			
			
			//game border
			blinkTime += 1;
			ctx.lineWidth = 5;
			if(sides) {
				const a = 128+128*Math.cos(1.5*Math.PI*this.blinkTime/50)
				const c = `rgb( ${a} ${a} 0)`;
				ctx.strokeStyle = c;
			} else {
				ctx.strokeStyle = "yellow";
			}
			ctx.strokeRect(2.5, 2.5, 995, 995);
			
			//game text
			ctx.clearRect(1000, 0, 10, 1000)
			ctx.fillStyle = "white";
			ctx.textAlign = "center";
			ctx.font = "50px" + font;
			ctx.fillText("Race to", 1170, 100);
			ctx.font = "180px" + font;
			ctx.fillText(10*(players.length-1), 1170, 280);
			ctx.font = "30px" + font;
			ctx.fillText("2 point difference", 1170, 330);
			
			ctx.fillStyle = "green";
			ctx.fillText("fps: "+fpsNum, 1170, 970);
			
			
			//game-over text
			if(gameState == "gameOver") {
				var winner = "";
				var topScore = -1;
				for(var i=0; i<players.length; i++) {
					if(players[i].Score > topScore) {
						topScore = players[i].Score;
						winner = players[i];
					}
				}
				
				ctx.save();
				ctx.translate(500,500);
				ctx.rotate((-15)*Math.PI/180);
				//ctx.fillStyle = "#000000";
				//ctx.clearRect(-200, 500, 1500, 200);
				ctx.font = "160px" + font;
				ctx.fillStyle = winner.Color;
				ctx.fillText(winner.Name + " wins!", 0, 60);
				ctx.strokeStyle = `rgba(0, 0, 0, 0.5)`;
				ctx.lineWidth = 5;
				ctx.strokeText(winner.Name + " wins!", 0, 60);
				ctx.restore();
				
			}
		break;
		
		//main meny
		case "newGame":
			ctx.textAlign = "center";
			ctx.font = "60px" + font;
			ctx.fillStyle = "yellow";
			ctx.fillText("Achtung die Kurve!", 2000/3, 60);
			
			ctx.textAlign = "left";
			ctx.font = "40px" + font;
			ctx.fillStyle = `rgb(200, 200, 200)`;
			ctx.fillText("#", 100, 300-90);
			ctx.fillText("Name", 200, 300-90);
			ctx.fillText("Left", 700, 300-90);
			ctx.fillText("Right", 1000, 300-90);
			for(var i=0; i<defaultPlayers.length; i++) {
				ctx.fillStyle = defaultPlayers[i].Color;
				ctx.fillText(i+1, 100, 300 + 90*i);
				ctx.fillText(defaultPlayers[i].Name, 200, 300 + 90*i);
				ctx.fillText(keycodeToChar( defaultPlayers[i].LeftKey ), 700, 300 + 90*i);
				ctx.fillText(keycodeToChar( defaultPlayers[i].RightKey ), 1000, 300 + 90*i);
				
				if(defaultPlayers[i].LeftKey == " " && defaultPlayers[i].RightKey == " ") {
					ctx.fillStyle = `rgba(0, 0, 0, 0.8)`;
					ctx.fillRect(100, 320+90*i, 500, -70)
					//ctx.strokeStyle = `rgba(255, 255, 255, 0.5)`;
					//ctx.strokeRect(100, 320+90*i, 500, -70)
				}
				
				const playerbtn = document.getElementById("btn" + i)
				playerbtn.style.left = parseFloat(canvas.style.left) + 100*s + "px";
				playerbtn.style.top = parseFloat(canvas.style.top) + 250*s + 90*i*s +"px";
				playerbtn.style.width =  500*s + "px";
				playerbtn.style.height =  70*s +"px";
			}
			
			ctx.font = "60px" + font;
			ctx.fillStyle = "Yellow";
			ctx.fillText("Play!", 600, 900);
			const playBtn = document.getElementById("playBtn");
			playBtn.style.left = parseFloat(canvas.style.left) + 600*s + "px";
			playBtn.style.top = parseFloat(canvas.style.top) +840*s +"px";
			playBtn.style.width =  140*s + "px";
			playBtn.style.height =  80*s +"px";
			
			if(!playeBtnHover) {
				ctx.fillStyle = `rgba(0, 0, 0, 0.8)`;
				ctx.fillRect(590, 920, 140, -80)
			}
			//ctx.strokeStyle = `rgba(255, 255, 255, 0.5)`;
			//ctx.strokeRect(590, 920, 140, -80)
			
			ctx.font = "20px" + font;
			ctx.fillStyle = `rgb(180, 180, 0)`;
			ctx.fillText("Version: 0.1", 10, 990);
		break;
		
	}	
	fps = fps+1;
}
animationLoop();


document.getElementById("playBtn").addEventListener('mouseover', function() {
	playeBtnHover = true;
})
document.getElementById("playBtn").addEventListener('mouseout', function() {
	playeBtnHover = false;
})

