

function init(){
	
	setTimeout(move_carre,2000);
}

function move_carre(){
	var carre = document.getElementById("red");
	function function_move(){
		var carre = document.getElementById("red");
		carre.style.left =  (carre.offsetLeft + 10) + "px";
	}

	var move = setInterval(function_move,100);
}
