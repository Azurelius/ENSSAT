function init(){
	setTimeout(move_carre,4000);
}

function move_carre(){
	function function_move(id) {
		carre = document.getElementById("red"+id);
		carre.style.left =  (carre.offsetLeft + 10) + "px";
	}
	var  i = 0;
	var move = setInterval(function() {
		i++;
		setInterval(function_move,100,i);
		if(i===4){
			clearInterval(move);
		}
	},1000);

}
