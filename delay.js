//creator : Daniel Eliasson

var functionList = [];
var paramList = [];
var delayList = [];


function delay(fun, param, lag) {
	functionList.push(fun);
	paramList.push(param);
	delayList.push(lag);
	
	//console.log(functionList);
	//console.log(paramList);
}

function delayLoop() {
	for(var i=0; i<delayList.length; i++) {
		delayList[i] -= 10;
		if(delayList[i] <= 0) {
			console.log(paramList[i]);
			functionList[i].call(null, paramList[i]);
			functionList[i] = "remove";
			paramList[i] = "remove";
			delayList[i] = "remove";
		}
	}
	
	functionList = functionList.filter(function f(val) {
			return val != "remove";
	});
	paramList = paramList.filter(function f(val) {
			return val != "remove";
	});
	delayList = delayList.filter(function f(val) {
			return val != "remove";
	});
	
}
delayTick = setInterval(delayLoop, 10);

function clearDelayCalls() {
	functionList = [];
	paramList = [];
	delayList = [];
}
