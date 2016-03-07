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
var curDate = new Date();
var lastDate = new Date();
//avec des dates
timer = setInterval(function() {
	// clear the timer at 400px to stop the animation
	pausecomp(100);
	curDate = new Date();
	//10/16 est la vitesse
	elem.style.left = ( left -= (10 + (curDate - lastDate)*10/16) ) + "px";
	lastDate = new Date();
	if ( left < 0 ) {
		elem.style.left = 0 + "px";
		clearInterval( timer );
	}
	
}, 16);
