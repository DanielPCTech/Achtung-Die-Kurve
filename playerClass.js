//creator : Daniel Eliasson

class player {
	constructor(name, color, left, right) {
		this.Name = name;
		this.Color = color;
		this.LeftKey = left;
		this.RightKey = right;
		this.Score = 0;
		this.X;
		this.Y;
		this.angle;
		this.turnSpeed;
		this.speed;
		this.hole;
		this.thickness;
		this.reverse;
		this.grid ;
		this.sides;
		this.blinkTime;
		this.alive = true;
		this.prevKeys = [];
		this.kurveArray = ["straight", [this.X, this.Y, this.thickness, this.speed], [this.X, this.Y, this.thickness, this.speed], "straight", [this.X, this.Y, this.thickness, this.speed], [this.X, this.Y, this.thickness, this.speed]];
		this.newKurv = false;
	}
	
	spawn(X, Y, angle) {
		this.angle = angle;
		this.X = X;
		this.Y = Y;
		this.turnSpeed = 10*Math.PI/ 1000; // how many 1 ms it take to complete a half loop
		this.speed = 0.5;
		this.hole = 0;
		this.thickness = 8;
		this.reverse = 0;
		this.grid = 0;
		this.sides = 0;
		this.alive = true;
		this.blinkTime = 0;
		this.kurveArray = [	"straight", [X, Y, this.thickness, this.speed, this.angle], [X, Y, this.thickness, this.speed, this.angle]];
		this.kurveArray[1][0] -=20*Math.cos(this.angle);
		this.kurveArray[1][1] -=20*Math.sin(this.angle);	
	}
	
	
	changeSpeed(change) {
		//console.log(change);
		//console.log("is not a number: " + isNaN(change));
		this.speed *= change;
		this.newKurv = true;
	}
	
	changeThickness(change) {
		if(this.alive) {
			this.thickness *= change;
		}
		this.newKurv = true;
	}
	
	changeHole(hole) {
		this.hole = hole;
		this.newKurv = true;
	}
	
	changeReverse(change) {
		this.reverse += change;
		this.newKurv = true;
	}
	
	changeGrid(change) {
		this.grid += change;
	}
	
	changeSides(change) {
		this.sides += change;
	}
	
	clearCurves() {
		this.kurveArray = [	"straight", [this.X, this.Y, this.thickness, this.speed, this.angle], [this.X, this.Y, this.thickness, this.speed, this.angle]];
		this.kurveArray[1][0] -=0.1*Math.cos(this.angle);
		this.kurveArray[1][1] -=0.1*Math.sin(this.angle);	
	}
	
	

	move(keysDown) {
		
		var deltaAngle = 0;
		if(keysDown.includes(this.LeftKey)) {
			if(this.prevKeys.includes(this.LeftKey)) {
				//old turn
				if(this.grid <= 0) {
					if(this.reverse <= 0) {
						deltaAngle -= this.turnSpeed;
					} else {
						deltaAngle += this.turnSpeed;
					}
				}
			}else {
				//new turn
				if(this.grid > 0) {
					this.newKurv = true;
					if(this.reverse <= 0) {
						deltaAngle -= Math.PI/2;
					} else {
						deltaAngle += Math.PI/2;
					}
				}
			}
		}
		if(keysDown.includes(this.RightKey)) {
			if(this.prevKeys.includes(this.RightKey)) {
				//old turn
				if(this.grid <= 0) {
					if(this.reverse <= 0) {
						deltaAngle += this.turnSpeed;
					} else {
						deltaAngle -= this.turnSpeed;
					}
				}
			}else {
				//new turn
				if(this.grid > 0) {
					this.newKurv = true;
					if(this.reverse <= 0) {
						deltaAngle += Math.PI/2;
					} else {
						deltaAngle -= Math.PI/2;
					}
				}
			}
		}
		this.X = this.X + this.speed*Math.cos(this.angle + deltaAngle/2);
		this.Y = this.Y + this.speed*Math.sin(this.angle + deltaAngle/2);
		this.angle += deltaAngle;
		
		if(this.newKurv) {
			this.kurveArray[this.kurveArray.length] = this.kurveArray[this.kurveArray.length-3].slice(); //straight/curve/hole
			this.kurveArray[this.kurveArray.length] = this.kurveArray[this.kurveArray.length-2].slice();
			//this.kurveArray[this.kurveArray.length-1][2] = this.thickness;
			//this.kurveArray[this.kurveArray.length-1][3] = this.speed;
			this.kurveArray[this.kurveArray.length] = [this.X, this.Y, this.thickness, this.speed, this.angle];
			this.newKurv = false;
			
			if(this.grid > 0) {
				this.kurveArray[this.kurveArray.length-2][0] += this.thickness*Math.cos(this.angle+Math.PI)/2;
				this.kurveArray[this.kurveArray.length-2][1] += this.thickness*Math.sin(this.angle+Math.PI)/2;
			}
		}
		
		
										//XOR
		if(this.hole == 0) {
			if((keysDown.includes(this.LeftKey) != keysDown.includes(this.RightKey)) && this.grid <= 0) {
				if( (this.kurveArray[this.kurveArray.length-3] != "curve" ) || keysDown.includes(this.LeftKey) != this.prevKeys.includes(this.LeftKey)) {
					this.kurveArray[this.kurveArray.length] = "curve";this.kurveArray[this.kurveArray.length] = this.kurveArray[this.kurveArray.length-2];
					this.kurveArray[this.kurveArray.length] = [this.X, this.Y, this.thickness, this.speed, this.angle];
				} else {
					this.kurveArray[this.kurveArray.length-1] = [this.X, this.Y, this.thickness, this.speed, this.angle];
				}
			}else {
				if(this.kurveArray[this.kurveArray.length-3] != "straight") {
					this.kurveArray[this.kurveArray.length] = "straight";
					this.kurveArray[this.kurveArray.length] = this.kurveArray[this.kurveArray.length-2];
					this.kurveArray[this.kurveArray.length] = [this.X, this.Y, this.thickness, this.speed, this.angle];
					
					
					
				} else {
					this.kurveArray[this.kurveArray.length-1] = [this.X, this.Y, this.thickness, this.speed, this.angle];
				}
			}
		}else {
			if(this.kurveArray[this.kurveArray.length-3] != "hole") {
				this.kurveArray[this.kurveArray.length] = "hole";
				this.kurveArray[this.kurveArray.length] = this.kurveArray[this.kurveArray.length-2];
				this.kurveArray[this.kurveArray.length] = [this.X, this.Y, this.thickness, this.speed, this.angle];
			}else {
				this.kurveArray[this.kurveArray.length-1] = [this.X, this.Y, this.thickness, this.speed, this.angle];
			}
		}
		
		
		
		
		this.prevKeys = keysDown.slice();
		
		
		
		
		if(this.hole == 0) {
			if(Math.random() > 0.995) {
				this.hole = 2*this.thickness/this.speed //+ Math.floor(this.thickness*Math.random()/4);
				this.newKurv;
				//console.log("HOLE")
			}
		} else if(this.hole < 0) {
			this.hole = 0;
		} else {
			this.hole -= 1;
		}
		
	}
	
	
	
	checkCollision(X, Y) {
		
		if(this.hole != 0) {
			return;
		}
		
		var arrLength = this.kurveArray.length;
		if(X == this.X && Y == this.Y) {
			arrLength -= 3;
		}
		
		for(var i=0; i<arrLength; i+=3) {
			if(this.kurveArray[i] == "straight") {//straight
				const thickness = this.kurveArray[i+1][2];
				const angle = - this.kurveArray[i+2][4];
				const angle0 = this.kurveArray[i+2][4] + Math.PI;
				const angle1 = this.kurveArray[i+2][4];
				
				const x0 = this.kurveArray[i+1][0]
				const y0 = this.kurveArray[i+1][1]
				const x1 = this.kurveArray[i+2][0]
				const y1 = this.kurveArray[i+2][1]
				// rotate coords to be ortogonal to the straight section
				const rot0 = rot([x0,y0], angle);
				const rot1 = rot([x1,y1], angle);
				const me = rot([X, Y], angle);
				
				if(me[0] > rot0[0] && me[0] < rot1[0]) { // check lengthwise/x asis
					if(me[1] > rot1[1] -thickness/2  && me[1] < rot1[1] + thickness/2) { // check widthwise/y
						return true;
						//console.log("straight death");
					}
				}
				
			} else if(this.kurveArray[i] == "curve") {
				
				//const radie = this.turnSpeed*this.kurveArray[i+1][3]; 
				const radie = this.kurveArray[i+2][3]/Math.tan(this.turnSpeed)
				var angle1 = (this.kurveArray[i+1][4] % (2*Math.PI));
				if(angle1 < 0){
					angle1 = angle1 + 2*Math.PI // 0 to 2*pi;
				}
				const dAngle = this.kurveArray[i+2][4] - this.kurveArray[i+1][4];
				var angle2 = angle1 + dAngle;
				var tAngle = angle1;
				if(dAngle > 0) {
					tAngle += Math.PI/2;
				} else {
					tAngle -= Math.PI/2;
				}
				const center = [this.kurveArray[i+1][0] + radie*Math.cos(tAngle), this.kurveArray[i+1][1] + radie*Math.sin(tAngle)];
				
				const relMe = [X - center[0], Y -center[1]];
				const thickness = this.kurveArray[i+1][2];
				if(relMe[0]**2 + relMe[1]**2 < (radie + thickness/2)**2) { // smaller than outer edge
					if(relMe[0]**2 + relMe[1]**2 > (radie - thickness/2)**2) { // bigger than inner edge
				
						
						var meAngle = +Math.atan2(relMe[1], relMe[0]); // -pi to  pi
						
						meAngle -= tAngle+Math.PI; //rotate to x0y0 reference
						meAngle = meAngle %(2*Math.PI);
						
						
						if(dAngle > 0) {
							meAngle += 2*Math.PI;
							if((meAngle > 0) && (meAngle < dAngle)) {
								return true;
								//console.log("curve death");
							}
						} else {
							if((meAngle < 0) && (meAngle > dAngle)) {
								return true;
								//console.log("curve death");
							}
						}
						
					}
				}
				
				
				
			} else {
				//hole, dont do anything
			}
		}
		return false;
	}
	
	checkWalls(x,y) {
		const border = 5;
		if(x < border || x > 1000-border || y < border || y > 1000-border) {
			return true;
		}
		return false;
	}
	
	crossWalls(blinkWalls) {
		if(blinkWalls || this.sides > 0) {
			if(this.X > 1000) {
				this.move(this.prevKeys);
				this.X -= 1000;
				this.hole = 1;
			}else if(this.X < 0) {
				this.move(this.prevKeys);
				this.X +=1000;
				this.hole = 1;
			}
			if(this.Y > 1000) {
				this.move(this.prevKeys);
				this.Y -= 1000;
				this.hole = 1;
			}else if(this.Y < 0) {
				this.move(this.prevKeys);
				this.Y +=1000;
				this.hole = 1;
			}
		}
	}
	
	
	drawKurve() {
		//draw worms
		ctx.lineWidth = 8;
		ctx.strokeStyle = this.Color;
		ctx.beginPath();
		ctx.moveTo(this.kurveArray[1][0], this.kurveArray[1][1])
		
		for(var i=0; i< this.kurveArray.length; i+=3) {
			
			if(this.kurveArray[i] == "straight") {
				
				
				const angle0 = this.kurveArray[i+2][4] + Math.PI;
				const angle1 = this.kurveArray[i+2][4];
				const x0 = this.kurveArray[i+1][0]
				const y0 = this.kurveArray[i+1][1]
				var x1 = this.kurveArray[i+2][0]
				var y1 = this.kurveArray[i+2][1]
				
				if( (this.kurveArray[i+2][2]!= this.kurveArray[i+1][2]) || (this.kurveArray[i+2][3]!= this.kurveArray[i+1][3]) ) {
					ctx.stroke();
					ctx.beginPath();
					ctx.moveTo(x0, y0)
				}
				
				ctx.lineTo(x1, y1);
				ctx.lineWidth = this.kurveArray[i+2][2];
				
			} else if(this.kurveArray[i] == "curve") {
				
				
				const x0 = this.kurveArray[i+1][0]
				const y0 = this.kurveArray[i+1][1]
				if( (this.kurveArray[i+2][2]!= this.kurveArray[i+1][2]) || (this.kurveArray[i+2][3]!= this.kurveArray[i+1][3]) ) {
					ctx.stroke();
					ctx.beginPath();
					ctx.moveTo(x0, y0)
				}
				
				//var radie = this.turnSpeed*this.kurveArray[i+2][3]; 
				var radie = this.kurveArray[i+2][3]/Math.tan(this.turnSpeed)
				const angle1 = (this.kurveArray[i+1][4] % (2*Math.PI)) + 2*Math.PI;
				const dAngle = this.kurveArray[i+1][4] - this.kurveArray[i+2][4];
				const angle2 = angle1 - dAngle;
				var tAngle = angle1;
				if(dAngle > 0) {
					tAngle -= Math.PI/2;
				} else {
					tAngle += Math.PI/2;
				}
				const center = [this.kurveArray[i+1][0] + radie*Math.cos(tAngle), this.kurveArray[i+1][1] + radie*Math.sin(tAngle)];
				if(dAngle == 0) {
					
				}else if(dAngle<0){
					ctx.arc(center[0], center[1],
						radie,
						angle1- Math.PI/2,
						angle2- Math.PI/2,
						false
						);
				} else {
					ctx.arc(center[0], center[1],
						radie,
						angle1+ Math.PI/2,
						angle2+ Math.PI/2,
						true
						);
				}
				
				ctx.lineWidth = this.kurveArray[i+2][2];
				
			} else if (this.kurveArray[i] == "hole"){
				ctx.stroke()
				ctx.beginPath();
				const x1 = this.kurveArray[i+2][0]
				const y1 = this.kurveArray[i+2][1]
				ctx.moveTo(x1, y1);
				
			} else {
				console.log("OOPS!")
			}
		}
		ctx.stroke()
		
	}
	
	drawHead() {
		this.blinkTime +=1;
		
		if(this.reverse <= 0) {
			if(this.sides > 0) {
				const a = 128+128*Math.sin(3*Math.PI*this.blinkTime/50)
				const c = `rgb( ${a} ${a} 0)`;
				ctx.strokeStyle = c;
				ctx.fillStyle = c;
			} else {
				ctx.strokeStyle = "yellow";
				ctx.fillStyle = "yellow";
			}
		} else {
			if(this.sides > 0) {
				const a = 128+128*Math.sin(3*Math.PI*this.blinkTime/50)
				const c = `rgb(0 0 ${a})`;
				ctx.strokeStyle = c;
				ctx.fillStyle = c;
				
			} else {
				ctx.strokeStyle = "blue";
				ctx.fillStyle = "blue";
			}
		}
		if(this.grid <= 0) {
			ctx.lineWidth = this.thickness/2;
			ctx.beginPath();
			ctx.arc(this.X,this.Y, this.thickness/4, 0, 2*Math.PI);
			ctx.stroke();
			//outline
			ctx.beginPath();
			ctx.strokeStyle = "#000000";
			ctx.lineWidth = .3;
			ctx.arc(this.X,this.Y, 1+this.thickness/2, 0, 2*Math.PI);
			ctx.closePath();
			ctx.stroke();
		} else {
			ctx.save();
			ctx.translate(this.X, this.Y);
			ctx.rotate(this.angle);
			ctx.fillRect(-this.thickness/2,-this.thickness/2,this.thickness,this.thickness);
			//outlie
			ctx.beginPath();
			ctx.strokeStyle = "#000000";
			ctx.lineWidth = .3;
			ctx.strokeRect(-0.5-this.thickness/2,-0.5-this.thickness/2,1+this.thickness,1+this.thickness);
			ctx.restore();
		}
	}
}
function rot(a, angle) {
	var x = a[0]*Math.cos(angle) - a[1]*Math.sin(angle);
	var y = a[0]*Math.sin(angle) + a[1]*Math.cos(angle);
	return [x,y]
}