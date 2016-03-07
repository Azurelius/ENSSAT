function pausecomp(millis) {
	var date = new Date();
	var curDate = null;
	do { 
		curDate = new Date(); 
	} while(curDate-date < millis);
}

var i = 0;
var updateGame = function() {
	pausecomp(35);
	i = (i+1)%10;
}
var drawGame = function() {
  	var ctx = document.getElementById('canvas').getContext('2d');
	var img = new Image();
	img.onload = function() {
		//On efface le canvas
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		//On affiche la ieme partie du sprite pour l'animation
    		ctx.drawImage(img,i*100,0,100,100,0,0,100,100);
	};
	img.src = 'images/coin-sprite-animation.png';
}


var mainloop = function() {
	updateGame();
	drawGame();
};

var animFrame = window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame    ||
	window.oRequestAnimationFrame      ||
	window.msRequestAnimationFrame     ||
	null ;

var recursiveAnim = function() {
	mainloop();
	animFrame(recursiveAnim);
};
// start the mainloop
animFrame( recursiveAnim );
