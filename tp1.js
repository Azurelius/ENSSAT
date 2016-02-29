function init(){
	compte_rebours();
}

function compte_rebours(){
	var para = document.getElementById("rebours");
	var i = 11;
	function function_decompte(){
		i = i-1;
		para.innerHTML = i;
		if(i===0){
			clearInterval(decompte);
		}
	}

	var decompte = setInterval(function_decompte,1000);
}
