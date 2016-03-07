function pausecomp(millis) {
	var date = new Date();
	var curDate = null;
	do { 
		curDate = new Date(); 
	} while(curDate-date < millis);
}

var elem = document.getElementById("animatedElem");
var left = 0;

function render(deltaT){
	elem.style.left = (left += (10 + deltaT*10/16)) + "px";
}

var now;
var lastFrame = new Date();

function move() {
	// clear the timer at 400px to stop the animation
	pausecomp(0);
	now = new Date();
   	var deltaT =now - lastFrame;
	if(deltaT < 160) {
		render(deltaT);
	}
	lastFrame = new Date();
	if(left < 1000) {
		window.requestAnimationFrame(move);
	}
}
window.requestAnimationFrame(move);
