function pausecomp(millis) {
	var date = new Date();
	var curDate = null;
	do { 
		curDate = new Date(); 
	} while(curDate-date < millis);
}

var elem = document.getElementById("animatedElem");
var left = 400;
var timer;
// Move the element 10px on the right every 16ms
timer = setInterval(function() {
	pausecomp(100);
	elem.style.left = ( left -= 10 ) + "px";
	// clear the timer at 400px to stop the animation
	if ( left < 0 ) {
		clearInterval( timer );
	}
}, 16);
