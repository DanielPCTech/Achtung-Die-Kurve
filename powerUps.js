//creator : Daniel Eliasson with assets from achtung.life

const powerUpTypes = ["clear", "oppFast", "meFast", "hole", "more", "reverse", "oppGrid", "meGrid", "meSides", "allSides", "oppSlow", "meSlow", "oppThick", "meThick", "oppThin", "meThin", "random"];


class powerUp {
	constructor(type, X, Y) {
		this.type = type;
		this.X = X;
		this.Y = Y;
		
		this.green = "#00FF00";
		this.red = "#FF0000";
		this.blue = "#0000FF";
		this.iconSize = 100;
		this.greenGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, this.iconSize);
		this.greenGrad.addColorStop(0, `rgb(0, 255, 0)`);
		this.greenGrad.addColorStop(1, `rgba(0, 255, 0, 0)`);
		this.redGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, this.iconSize);
		this.redGrad.addColorStop(0, `rgb(255, 0, 0)`);
		this.redGrad.addColorStop(1, `rgba(255, 0, 0, 0)`);
		this.blueGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, this.iconSize);
		this.blueGrad.addColorStop(0, `rgb(0, 0, 255)`);
		this.blueGrad.addColorStop(1, `rgba(0, 0, 255, 0)`);
	
	}
	
	
	use(players, playerId) {
		switch(this.type) {
			case "clear":
				for(var i=0; i<players.length; i++) {
					players[i].clearCurves();
				}
			break;
			case "oppFast":
				for(var i=0; i<players.length; i++) {
					if(i != playerId) {
						players[i].changeSpeed(2);
						delay(players[i].changeSpeed.bind(players[i]), 1/2, 4000);
					}
				}
			break;
			case "meFast":
				players[playerId].changeSpeed(2);
				delay(players[playerId].changeSpeed.bind(players[playerId]), 1/2, 4000);
			break;
			case "hole":
				players[playerId].changeHole(2000/10);
			break;
			case "more":
				spawnPowerUp(3);
			break;
			case "reverse":
				for(var i=0; i<players.length; i++) {
					if(i != playerId) {
						players[i].changeReverse(1);
						delay(players[i].changeReverse.bind(players[i]), -1, 4000);
					}
				}
			break;
			case "oppGrid":
				for(var i=0; i<players.length; i++) {
					if(i != playerId) {
						players[i].changeGrid(1);
						delay(players[i].changeGrid.bind(players[i]), -1, 4000);
					}
				}
			break;
			case "meGrid":
				players[playerId].changeGrid(1);
				delay(players[playerId].changeGrid.bind(players[playerId]), -1, 4000);
			break;
			case "meSides":
				players[playerId].changeSides(1);
				delay(players[playerId].changeSides.bind(players[playerId]), -1, 4000);
			break;
			case "allSides":
				sides += 1;
				blinkTime = 0
				delay(function() {
					sides -= 1;
				}, null, 4000);
			break;
			case "oppSlow":
				for(var i=0; i<players.length; i++) {
					if(i != playerId) {
						players[i].changeSpeed(1/2);
						delay(players[i].changeSpeed.bind(players[i]), 2, 4000);
					}
				}
			break;
			case "meSlow":
				players[playerId].changeSpeed(1/2);
				delay(players[playerId].changeSpeed.bind(players[playerId]), 2, 4000);
			break;
			case "oppThick":
				for(var i=0; i<players.length; i++) {
					if(i != playerId) {
						players[i].changeThickness(2);
						delay(players[i].changeThickness.bind(players[i]), 1/2, 4000);
					}
				}
			break;
			case "meThick":
				players[playerId].changeThickness(2);
				delay(players[playerId].changeThickness.bind(players[playerId]), 1/2, 4000);
			break;
			case "oppThin":
				for(var i=0; i<players.length; i++) {
					if(i != playerId) {
						players[i].changeThickness(0.5);
						delay(players[i].changeThickness.bind(players[i]), 2, 4000);
					}
				}
			break;
			case "meThin":
				players[playerId].changeThickness(0.5);
				delay(players[playerId].changeThickness.bind(players[playerId]), 2, 4000);
			break;
			case "random":
				const type = powerUpTypes[ Math.floor(Math.random()*powerUpTypes.length) ];
				var tmpPU = new powerUp(type, -100, -100);
				tmpPU.use(players, playerId);
			break;
		}
	}
	
	
	collision(X, Y) {
		var deltaX = X - this.X;
		var deltaY = Y - this.Y;
		if(Math.sqrt((deltaX**2 + deltaY**2)) < 20) {
			return true;
		}
	}
	
	drawBase() {
		ctx.translate(this.X, this.Y);
		ctx.scale(0.2, 0.2)
		ctx.beginPath();
		ctx.arc(0, 0, this.iconSize, 0, 2*Math.PI, false);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(0, 0, this.iconSize, 0, 2*Math.PI, false);
		ctx.fill();
	}
	
	draw() {
		ctx.save();
		switch(this.type) {
			case "clear":
				ctx.strokeStyle = this.blue;
				ctx.fillStyle = this.blueGrad;
				this.drawBase();
				drawPowerupIcons("clear");
			break;
			case "oppFast":
				ctx.strokeStyle = this.red;
				ctx.fillStyle = this.redGrad;
				this.drawBase();
				drawPowerupIcons("fast");
			break;
			case "meFast":
				ctx.strokeStyle = this.green;
				ctx.fillStyle = this.greenGrad;
				this.drawBase();
				drawPowerupIcons("fast");
			break;
			case "hole":
				ctx.strokeStyle = this.green;
				ctx.fillStyle = this.greenGrad;
				this.drawBase();
				drawPowerupIcons("hole");
			break;
			case "more":
				ctx.strokeStyle = this.blue;
				ctx.fillStyle = this.blueGrad;
				this.drawBase();
				drawPowerupIcons("more");
			break;
			case "reverse":
				ctx.strokeStyle = this.red;
				ctx.fillStyle = this.redGrad;
				this.drawBase();
				drawPowerupIcons("reverse");
			break;
			case "oppGrid":
				ctx.strokeStyle = this.red;
				ctx.fillStyle = this.redGrad;
				this.drawBase();
				drawPowerupIcons("grid");
			break;
			case "meGrid":
				ctx.strokeStyle = this.green;
				ctx.fillStyle = this.greenGrad;
				this.drawBase();
				drawPowerupIcons("grid");
			break;
			case "meSides":
				ctx.strokeStyle = this.green;
				ctx.fillStyle = this.greenGrad;
				this.drawBase();
				drawPowerupIcons("side");
			break;
			case "allSides":
				ctx.strokeStyle = this.blue;
				ctx.fillStyle = this.blueGrad;
				this.drawBase();
				drawPowerupIcons("sides");
			break;
			case "oppSlow":
				ctx.strokeStyle = this.red;
				ctx.fillStyle = this.redGrad;
				this.drawBase();
				drawPowerupIcons("slow");
			break;
			case "meSlow":
				ctx.strokeStyle = this.green;
				ctx.fillStyle = this.greenGrad;
				this.drawBase();
				drawPowerupIcons("slow");
			break;
			case "oppThick":
				ctx.strokeStyle = this.red;
				ctx.fillStyle = this.redGrad;
				this.drawBase();
				drawPowerupIcons("thick");
			break;
			case "meThick":
				ctx.strokeStyle = this.green;
				ctx.fillStyle = this.greenGrad;
				this.drawBase();
				drawPowerupIcons("thick");
			break;
			case "oppThin":
				ctx.strokeStyle = this.red;
				ctx.fillStyle = this.redGrad;
				this.drawBase();
				drawPowerupIcons("thin");
			break;
			case "meThin":
				ctx.strokeStyle = this.green;
				ctx.fillStyle = this.greenGrad;
				this.drawBase();
				drawPowerupIcons("thin");
			break;
			case "random":
				ctx.strokeStyle = this.blue;
				ctx.fillStyle = this.blueGrad;
				this.drawBase();
				drawPowerupIcons("random");
			break;
			
		}
		
		ctx.restore();
	}
	
}


const drawPowerupIcons = (icon)=>{
    let pathClear = new Path2D("M843.7,843.7H236.4V236.3c147.4,0,372.9,0,607.3,0V843.7z M269.6,810.4h540.8V269.6H269.6L269.6,810.4 L269.6,810.4z")
    let pathFast = new Path2D("M392.3,169.4c143.2,19.4,281.7,37.7,405,52.6L581.6,435.8l278.2,9l-460.5,569.4l126.2-410.2l-252.4-12.3 L392.3,169.4z")
    let pathHole1 = new Path2D("M534.3,698.5c-110.4,0-214.4-15-292.9-42.1c-38.9-13.5-69.7-29.3-91.4-47.1c-24.4-20-36.8-41.9-36.8-65s12.4-45,36.8-65 c21.7-17.8,52.5-33.6,91.4-47.1C319.9,405,423.9,390,534.3,390s214.4,15,292.9,42.1c38.9,13.5,69.7,29.3,91.4,47.1 c24.4,20,36.8,41.9,36.8,65s-12.4,45-36.8,65c-21.7,17.8-52.5,33.7-91.4,47.1C748.8,683.6,644.8,698.5,534.3,698.5z M534.3,415.9 c-107.6,0-208.6,14.5-284.4,40.7C179.5,480.9,139,512.9,139,544.3s40.4,63.3,110.9,87.7c75.8,26.2,176.8,40.7,284.4,40.7 S743,658.2,818.8,632c70.5-24.4,110.9-56.4,110.9-87.7s-40.4-63.3-110.9-87.7C743,430.3,642,415.9,534.3,415.9L534.3,415.9z")
    let pathHole2 = new Path2D("M580.5,852.6c-39.8,0-74.8-11.9-100.3-34.6c-26.5-23.5-40.5-56.3-40.5-94.7c0-69.7,48.2-102.7,94.9-134.6 c48.3-33,94-64.3,94-135.8c0-95.2-112.9-192.8-274.5-237.4l6.9-24.9c79.1,21.8,151.6,58,204,101.8 c58.5,48.9,89.4,104.4,89.4,160.4c0,85.2-55.9,123.4-105.2,157.1c-44.9,30.7-83.6,57.2-83.6,113.3c0,30.9,11,56.9,31.8,75.4 c25.1,22.3,62.5,31.8,105.2,26.7l3,25.6C597,852,588.7,852.5,580.5,852.6L580.5,852.6z")
    let pathMore1 = new Path2D("M808.5,327.6c-117.1,0-212.4,95.3-212.4,212.4s95.3,212.4,212.4,212.4s212.4-95.3,212.4-212.4 S925.6,327.6,808.5,327.6z M808.5,721.3c-100,0-181.3-81.3-181.3-181.3s81.3-181.3,181.3-181.3S989.8,440,989.8,540 S908.5,721.3,808.5,721.3L808.5,721.3z")
    let pathMore2 = new Path2D("M403.4,518.1c117.1,0,212.4-95.3,212.4-212.4S520.5,93.4,403.4,93.4S191,188.6,191,305.8 S286.2,518.1,403.4,518.1z M403.4,124.5c100,0,181.3,81.3,181.3,181.3S503.3,487,403.4,487s-181.3-81.3-181.3-181.3 S303.4,124.5,403.4,124.5L403.4,124.5z")
    let pathMore3 = new Path2D("M403.4,561.9c-117.1,0-212.4,95.3-212.4,212.4s95.3,212.4,212.4,212.4s212.4-95.3,212.4-212.4 S520.5,561.9,403.4,561.9z M403.4,955.5c-100,0-181.3-81.3-181.3-181.3S303.4,593,403.4,593s181.3,81.3,181.3,181.3 S503.3,955.5,403.4,955.5L403.4,955.5z")
    let pathReverse1 = new Path2D("M424.7,518.7c1.8,0,3.5-0.7,4.8-2c2.1-2.2,2.5-5.6,0.8-8.2c-19.4-30.4-29.2-62-31-82.6h384.8 c3.7,0,6.7-3,6.7-6.6v-26.6c0-3.7-3-6.6-6.7-6.6H399.3c1.8-20.6,11.6-52.2,31-82.6c1.7-2.6,1.3-6-0.8-8.2 c-2.1-2.2-5.5-2.7-8.2-1.1L241.2,400.3c-2,1.2-3.3,3.4-3.3,5.7s1.2,4.5,3.3,5.7l180.2,106.1C422.4,518.5,423.6,518.8,424.7,518.7 L424.7,518.7z")
    let pathReverse2 = new Path2D("M838.8,668.3L658.6,562.2c-2.7-1.6-6-1.1-8.2,1.1c-2.1,2.2-2.5,5.6-0.8,8.2c19.4,30.4,29.2,62,31,82.6H295.9 c-3.7,0-6.6,3-6.6,6.7v26.6c0,3.7,3,6.7,6.6,6.7h384.8c-1.8,20.7-11.6,52.2-31,82.6c-1.7,2.6-1.3,6,0.8,8.2c1.3,1.3,3,2,4.8,2 c1.2,0,2.3-0.3,3.4-0.9l180.2-106.1c2-1.2,3.3-3.4,3.3-5.7S840.8,669.5,838.8,668.3L838.8,668.3z")
    let pathGrid = new Path2D("M482,871.4H238.4V473.5h73.6V234.2h33.2v272.5h-73.6v331.4h177.1V589.2h248.9V436.6H543.5V243.9h301.4v478.5 H965v33.2H811.6V277.1h-235v126.3h154.2v219H482C481.9,721.1,481.8,824.8,482,871.4z")
    let pathSide = new Path2D("M236.4,236.3v607.3h607.3V236.3C620.4,236.3,410.1,236.3,236.4,236.3z M269.6,810.4V580.1l172.6,172.6 l23.5-23.5L269.6,533.1V269.6h540.8V481l-162-162l-23.5,23.5L810.4,528v282.4L269.6,810.4L269.6,810.4z")
    let pathSides1 = new Path2D("M810.4,810.4h-33.2v33.2h66.5c0-26.1,0-51.1,0-66.5h-33.2V810.4z")
    let pathSides2 = new Path2D("M397.7,810.4h94.9v33.2c-30.7,0-62.7,0-94.9,0V810.4z")
    let pathSides3 = new Path2D("M587.4,810.4h94.9v33.2c-26.5,0-60.4,0-94.9,0V810.4z")
    let pathSides4 = new Path2D("M269.6,777.2h-33.2v66.5c16.9,0,39,0,66.5,0v-33.2h-33.2V777.2z")
    let pathSides5 = new Path2D("M236.4,587.4h33.2v94.9c-11.1,0-22.2,0-33.2,0V587.4z")
    let pathSides6 = new Path2D("M236.4,397.7h33.2v94.9c-11.1,0-22.2,0-33.2,0V397.7z")
    let pathSides7 = new Path2D("M236.4,302.8c11.1,0,22.2,0,33.2,0v-33.2h33.2v-33.2h-66.5V302.8z")
    let pathSides8 = new Path2D("M397.7,236.3h94.9v33.2c-33.8,0-69.1,0-94.9,0V236.3z")
    let pathSides9 = new Path2D("M587.4,236.3c41.4,0,70.7,0,94.9,0v33.2h-94.9V236.3z")
    let pathSides10 = new Path2D("M777.2,236.3v33.2h33.2v33.2h33.2v-66.5C821.5,235.9,799.3,235.9,777.2,236.3z")
    let pathSides11 = new Path2D("M810.4,397.7h33.2c0,52,0,75.3,0,94.9h-33.2V397.7z")
    let pathSides12 = new Path2D("M810.4,587.4h33.2c-0.1,36.2-0.1,67.8,0,94.9h-33.2V587.4z")
    let pathSlow1 = new Path2D("M595.2,758.5l6.2,72l-286.7,24.8l-5.3-61.5l158.2-250.4L289,558.8l-6.2-72c112-9.7,232.6-20.1,281.8-24.3 l5.3,61.5L413.5,774.2L595.2,758.5z")
    let pathSlow2 = new Path2D("M625.4,366.1v31.1c-35.4,0.1-77.4,0-123.6,0v-26.5l77-101.3h-77v-31.1h121.5v26.5l-76.2,101.3H625.4z")
    let pathSlow3 = new Path2D("M786,294.9l-6.2,19.1l-76.2-24.6l5.3-16.4l67.6-47.2L729,210.6l6.2-19.1l74.9,24.2l-5.3,16.4l-67.1,47.3 C753.1,284,769.5,289.4,786,294.9z")
    let pathThick = new Path2D("M806.8,190l-104.6-55.2C476.2,318,325.5,565.2,273.1,890l104.6,55.2C606.2,765,750.2,514.1,806.8,190 L806.8,190z")
    let pathThin = new Path2D("M377.8,945.1C475.6,686.6,615.1,433.9,806.8,190l-104.6-55.1C602,392.1,462,644,273.1,890L377.8,945.1z")
	let pathRandom1 = new Path2D("M340.9,774.6l-50.2-54.8c9.6-10.1,17.8-19.8,24.6-29.1c6.8-9.3,12.1-18.2,16.1-26.6 c3.9-8.4,6.5-16.4,7.8-24.2c1.3-7.7,1.2-15.1-0.1-22.2c-1.4-7.1-4.1-13.8-8.1-20.3c-5.3-8.5-12.4-14.7-21.1-18.6 c-8.8-3.9-18.3-5.3-28.6-4.2c-10.3,1.2-20.4,4.8-30.4,11.1c-11.7,7.3-20.6,18.5-26.5,33.4c-5.9,14.9-8.3,32.2-7.1,51.8l-50.3-7.1 c0.5-27.2,6.1-51.6,16.9-73.2c10.7-21.6,25.6-38.3,44.7-50.3c18.5-11.5,37.4-18.1,56.8-19.6c19.4-1.5,37.6,1.6,54.5,9.3 c16.9,7.8,30.5,19.9,40.7,36.3c6,9.7,10,20.4,11.8,32.1c1.8,11.7,1.6,24-0.6,36.7c-2.2,12.8-6.2,25.5-12,38.1 c-5.8,12.6-13.3,24.6-22.4,36l17.3,44.2L340.9,774.6L340.9,774.6z M365.9,848.8c-6-9.7-8.2-19.3-6.5-29c1.7-9.6,7.1-17.3,16.2-23 c9.7-6,18.9-7.9,27.8-5.5c8.9,2.4,16.6,8.9,23.2,19.4c6,9.7,8.2,19.3,6.5,29c-1.7,9.7-7.1,17.3-16.2,23c-9.7,6-18.9,7.9-27.8,5.5 S372.5,859.3,365.9,848.8z")
    let pathRandom2 = new Path2D("M507.2,571.8l-31.1-65.2c11.8-6.6,22.2-13.3,31.1-20.1c9-6.8,16.5-13.5,22.5-20.1s10.8-13.4,14.1-20.2 s5.5-13.7,6.2-20.7c0.7-7,0.1-14-1.8-21.2c-2.5-9.4-7.3-17.2-14.3-23.3c-7-6.1-15.5-10.1-25.4-12c-9.9-1.9-20.4-1.3-31.4,1.6 c-13,3.5-24.4,11.3-34.1,23.5c-9.8,12.2-16.9,27.6-21.3,46.1L377,419.4c8.2-25.2,20.4-46.2,36.5-63.3c16.1-17,34.7-28.4,55.8-34 c20.5-5.5,39.9-6.2,58.4-2.1c18.5,4.1,34.5,12.1,48,24.2c13.5,12,22.7,27.1,27.6,45.3c2.9,10.7,3.5,21.8,1.9,33.1 c-1.6,11.4-5.3,22.7-11,34c-5.7,11.3-13,21.9-21.9,32c-9,10.1-19.3,19.1-31.1,27.1l3.5,46C532.4,565,519.9,568.4,507.2,571.8 L507.2,571.8z M509.4,647.9c-2.9-10.7-2.1-20.3,2.2-28.8c4.3-8.5,11.5-14.1,21.6-16.8c10.7-2.9,19.8-1.9,27.4,2.8 c7.5,4.8,12.9,13,16,24.7c2.9,10.7,2.1,20.3-2.2,28.8c-4.3,8.5-11.5,14-21.6,16.8c-10.7,2.9-19.8,1.9-27.4-2.8 C517.8,667.8,512.5,659.6,509.4,647.9L509.4,647.9z")
    let pathRandom3 = new Path2D("M751.5,467.8l-16.9-70.2c12.9-4.1,24.4-8.5,34.6-13.2c10.2-4.8,18.9-9.8,26.2-15c7.3-5.3,13.3-10.9,18-16.9 c4.7-6,8.2-12.3,10.3-19c2.2-6.7,3-13.7,2.6-21.1c-0.5-9.7-3.6-18.3-9.2-25.7c-5.6-7.4-13.1-13.1-22.4-16.9 c-9.3-3.9-19.6-5.5-31-4.9c-13.4,0.7-26.2,6-38.2,16c-12.1,9.9-22.2,23.5-30.3,40.7l-39.4-29.6c13.2-22.9,29.5-41,48.7-54.4 c19.3-13.3,39.8-20.6,61.6-21.8c21.1-1.1,40.3,2.2,57.5,10c17.2,7.8,31.2,19,41.9,33.5c10.7,14.5,16.6,31.2,17.6,50 c0.6,11.1-1.1,22-5,32.8s-9.9,21.1-17.7,31c-7.9,9.9-17.2,18.8-28,26.8c-10.8,8-22.8,14.7-36,20.1l-6.1,45.7L751.5,467.8 L751.5,467.8z M737.9,542.7c-0.6-11.1,2.1-20.3,8.1-27.7s14.2-11.4,24.6-11.9c11.1-0.6,19.8,2.2,26.2,8.4 c6.4,6.2,9.9,15.4,10.6,27.4c0.6,11.1-2.1,20.3-8.1,27.7c-6,7.4-14.2,11.4-24.6,11.9c-11.1,0.6-19.8-2.2-26.2-8.4 C742,563.9,738.5,554.8,737.9,542.7L737.9,542.7z")
    
    let iconPaths = {
        clear: [pathClear],
        fast: [pathFast],
        hole: [pathHole1, pathHole2],
        more: [pathMore1, pathMore2, pathMore3],
        reverse: [pathReverse1, pathReverse2],
        grid: [pathGrid],
        side: [pathSide],
        sides: [pathSides1, pathSides2, pathSides3, pathSides4, pathSides5, pathSides6, pathSides7, pathSides8, pathSides9, pathSides10, pathSides11, pathSides12, ],
        slow: [pathSlow1, pathSlow2, pathSlow3],
        thick: [pathThick],
        thin: [pathThin],
        random: [pathRandom1, pathRandom2, pathRandom3],
    }
	var iconSize = 100;
    let scaleFac = 1080 / iconSize

    for (const path in iconPaths) {
        if (!(path == icon)) {
            continue
        } else {
            for (let i = 0; i < iconPaths[icon].length; i++) {
                ctx.save()
                ctx.translate(-iconSize, -iconSize)
                ctx.scale(2 / scaleFac, 2 / scaleFac)
                ctx.fillStyle = "yellow"
                if (path == "hole" && i == 0)
                    ctx.fillStyle = "#000000"
                ctx.fill(iconPaths[icon][i])
                ctx.restore()
            }
        }
    }
}
