function pausecomp(millis) {
	var date = new Date();
	var curDate = null;
	do { 
		curDate = new Date(); 
	} while(curDate-date < millis);
}

var elem = document.getElementById("animatedElem");
var left = 400;

function move() {
	// clear the timer at 400px to stop the animation
	elem.style.left = (left -= 10) + "px";
	if(left > 0) {
		window.requestAnimationFrame(move);
	}
}
window.requestAnimationFrame(move);
