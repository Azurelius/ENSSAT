/*Définition des variables globales*/

var hitbox; //matrice de cases infranchissables

var Case = function(x,y){ //case de la matrice puzzle
	this.x = x;
	this.y = y;
	this.chatParcours = false;
}

var caseADessiner; //prochaines cases à dessiner

var decor; //background
var compteur; //compteur qui s'incrément à chaque passage de animFrame
var victoire; //boolean de victoir

var Cat = function(){ //objet du personnage
	//position de l'objet
	this.x = 0;
	this.y = 0;
	//pour animer
	this.dirX = 0;
	this.dirY = 0;
	this.dir = -1;

	this.hasMoved = true;

	this.cpt = 0;
	this.move = false;

	this.historic = Array();

	this.img = './img/cat.png';
}

var monChat; //variable du chat

var direction; //tableau des entrées utilisateur

var generation = function(){ //fonction qui génère l'état initial du jeu
	hitbox = [
	[0,0, 0, 0, 0,0, 0, 0, 0,0],
	[0,1, 0, 0, 0,0, 0, 0, 0,0],
	[0,0, 0, 1, 1,0, 0, 0, 0,0],
	[0,0, 1, 0, 0,0, 0, 0, 0,0],
	[0,0, 0, 0, 0,0, 0, 0, 0,0],
	[0,0, 0, 0, 0,0, 0, 0, 1,0],
	[0,0, 0, 0, 1,0, 0, 0, 1,0],
	[0,0, 0, 0, 0,0, 0, 0, 0,0],
	[0,1, 1, 0, 0,1, 0, 0, 0,0],
	[0,0, 0, 0, 0,0, 0, 0, 0,0]
	];

	puzzle = [
	[[0,1],[1,1], [1,1], [1,1],[1,1], [1,1], [1,1],[1,1], [1,1], [2,1]],
	[[0,2],[1,2], [1,2],[1,2],[1,2], [1,2],[1,2],[1,2], [1,2],[2,2]],
	[[0,2],[1,2], [1,2],[1,2],[1,2], [1,2],[1,2],[1,2], [1,2],[2,2]],
	[[0,2],[1,2], [7,0],[1,2],[1,2], [1,2],[1,2],[1,2], [1,2],[2,2]],
	[[0,2],[1,2], [1,2],[1,2],[1,2], [1,2],[1,2],[1,2], [1,2],[2,2]],
	[[0,2],[1,2], [1,2],[1,2],[1,2], [1,2],[1,2],[1,2], [1,2],[2,2]],
	[[0,2],[1,2], [1,2],[1,2],[1,2], [1,2],[1,2],[1,2], [1,2],[2,2]],
	[[0,2],[1,2], [1,2],[1,2],[1,2], [1,2],[1,2],[1,2], [1,2],[2,2]],
	[[0,2],[1,2], [1,2],[1,2],[1,2], [1,2],[1,2],[1,2], [1,2],[2,2]],
	[[0,3],[1,3], [1,3], [1,3],[1,3], [1,3], [1,3],[1,3], [1,3], [2,3]]
	];
	caseADessiner = Array();

	decor = Array();

	for(i=0;i<10;i++){
		decor[i] = Array();
		for(j=0;j<10;j++){
			decor[i][j] = new Case(3,0);
		}
	};

	decor[1][1].x = 7;
	decor[1][1].y = 0;
	decor[1][1].chatParcours = true;
	decor[3][2].x = 7;
	decor[3][2].y = 0;
	decor[3][2].chatParcours = true;
	decor[2][3].x = 7;
	decor[2][3].y = 0;
	decor[2][3].chatParcours = true;
	decor[4][2].x = 7;
	decor[4][2].y = 0;
	decor[4][2].chatParcours = true;
	decor[4][6].x = 7;
	decor[4][6].y = 0;
	decor[4][6].chatParcours = true;
	decor[1][8].x = 7;
	decor[1][8].y = 0;
	decor[1][8].chatParcours = true;
	decor[2][8].x = 7;
	decor[2][8].y = 0;
	decor[2][8].chatParcours = true;
	decor[5][8].x = 7;
	decor[5][8].y = 0;
	decor[5][8].chatParcours = true;
	decor[8][5].x = 7;
	decor[8][5].y = 0;
	decor[8][5].chatParcours = true;
	decor[8][6].x = 7;
	decor[8][6].y = 0;
	decor[8][6].chatParcours = true;
	compteur=0;
	victoire = false;
	monChat = new Cat();
	direction = Array();


	var img = new Image();

	img.addEventListener("load",function(){
		var ctx = document.getElementById('background').getContext('2d');
		ctx.clearRect(0, 0, 500, 500);
		for(i=0;i<decor.length;i++){
			for(j=0;j<decor.length;j++){
				ctx.drawImage(img,decor[i][j].x*32,
						  decor[i][j].y*32,
						32,32,i*32,j*32,32,32);
			}
		}
	},false);

	img.src = './img/puzzle.png';

	var img2 = new Image();
	img2.addEventListener("load",function(){
		var ctx = document.getElementById('players').getContext('2d');
		ctx.clearRect(0, 0, 500, 500);
		ctx.drawImage(img2,0,0,32,32,monChat.x*32,monChat.y*32,32,32);
	},false);

	img2.src = monChat.img;

	
};

var userEvent = function() {

	window.addEventListener("keyup",function (event) {
		
		if (event.defaultPrevented) {
			return; // Should do nothing if the key event was already consumed.
		}

		switch (event.key) {
			case "ArrowDown":
		      // Do something for "down arrow" key press.
			case "ArrowUp":
		      // Do something for "up arrow" key press.
			case "ArrowLeft":
		      // Do something for "left arrow" key press.
			case "ArrowRight":
		      // Do something for "right arrow" key press.
				direction=Array();
				break;
			case "Enter":
		      // Do something for "enter" or "return" key press.
				break;
			case "Escape":
		      // Do something for "esc" key press.
				break;
			default:
				return; // Quit when this doesn't handle the key event.
		  }

		  // Consume the event for suppressing "double action".
		  event.preventDefault();
		},true);

		window.addEventListener("keydown", function (event) {
		if (event.defaultPrevented) {
			return; // Should do nothing if the key event was already consumed.
		}
			switch (event.key) {
				case "ArrowDown":
			      // Do something for "down arrow" key press.
					direction.push(0);
					break;
				case "ArrowUp":
			      // Do something for "up arrow" key press.
					direction.push(3);
					break;
				case "ArrowLeft":
			      // Do something for "left arrow" key press.
					direction.push(2);
					break;
				case "ArrowRight":
			      // Do something for "right arrow" key press.
					direction.push(1);
					break;
				case "Enter":
			      // Do something for "enter" or "return" key press.
					break;
				case "Escape":
			      // Do something for "esc" key press.
					break;
				case "r":
				//Permet de recommencer le jeu
					generation();
					break;
				default:
					return; // Quit when this doesn't handle the key event.
			  }

		  // Consume the event for suppressing "double action".
		  event.preventDefault();
		}, true);
};

var updateGame = function(){
	var dir = direction.pop();
	//si une direction a été rentrée par l'utilisateur
	if(dir!=null){
		if(monChat.dir==null){
			monChat.dir = dir;
		}
	}
	deplacerChat(); //on déplace le chat
	
	//Condition de victoire
	var i = 0;
	var j = 0;
	var trouve = false;
	//Si toutes les cases ont été parcourues, alors c'est gagné
	while(i<decor.length&&!trouve){
		j = 0;
		while(j<decor.length&&!trouve){
			if(!decor[i][j].chatParcours){
				trouve = true;
				console.log(i);
				console.log(j);
			}
			j++;
		}
		i++;
	}
	if(!trouve){
		victoire = true;
		console.log("Victoire");
	}

};

//Permet d'éclairer une case sur laquelle le joueur est passé
var modifierCase = function(x,y){
	if(decor[x][y].chatParcours){
		decor[x][y].x = 4;
		decor[x][y].y = 0;
	} else {
		decor[x][y].x = 3;
		decor[x][y].y = 0;
	}
};

//Permet de déplacer le chat selon certaines conditions : si la case où il veut aller n'est pas remplie ou si il n'essaie pas d'aller en dehors
//du plateau. Les cases parcourues sont modifiées en fonction de si elles étaient déjà parcourues ou non.
var deplacerChat = function(){
	if(monChat.dir!=null){
		//vitesse de deplacement
		if(compteur%4==0){
			if(monChat.dir == 0){ //Down
				monChat.dirY = 0;
				monChat.dirX = (monChat.dirX +1)%3;
				if(monChat.cpt==0){
					if(monChat.y >= hitbox.length-1){
						monChat.cpt = 3;
						monChat.hasMoved = false;
					}else if(hitbox[Math.round(monChat.y) +1][monChat.x] == 1){
						monChat.cpt=3;
						monChat.hasMoved = false;
					}
				}
				if(monChat.cpt != 3){
					monChat.y = monChat.y + 1/3;
					monChat.hasMoved = true;
				}

			}
			if(monChat.dir == 3){ //Up
				monChat.dirY = 3;
				monChat.dirX = (monChat.dirX +1)%3;
				if(monChat.cpt==0){
					if(monChat.y <=0){
						monChat.cpt=3;
						monChat.hasMoved = false;
					}else if(hitbox[Math.round(monChat.y) -1][monChat.x] == 1){
						monChat.cpt=3;
						monChat.hasMoved = false;
					}
				}
				if(monChat.cpt != 3){
					monChat.y = monChat.y - 1/3;
					monChat.hasMoved = true;
				}
			}
			if(monChat.dir == 2){ //Left
				monChat.dirY = 1;
				monChat.dirX = (monChat.dirX +1)%3;
				if(monChat.cpt==0){
					if(monChat.x <= 0){
						monChat.cpt=3;
						monChat.hasMoved = false;
					}else if(hitbox[monChat.y][Math.round(monChat.x)-1] == 1){
						monChat.cpt=3;
						monChat.hasMoved = false;
					}
				}
				if(monChat.cpt != 3){
					monChat.x = monChat.x - 1/3;
					monChat.hasMoved = true;
				}
			}
			if(monChat.dir == 1){ //Right
				monChat.dirY = 2;
				monChat.dirX = (monChat.dirX +1)%3;
				if(monChat.cpt==0){
					if(monChat.x >= hitbox.length-1){
						monChat.cpt=3;
						monChat.hasMoved = false;
					}else if(hitbox[monChat.y][Math.round(monChat.x)+1] == 1){
						monChat.cpt=3;
						monChat.hasMoved = false;
					}
				}
				if(monChat.cpt != 3){
					monChat.x = monChat.x + 1/3;
					monChat.hasMoved = true;
				}
			}
			//On arrête l'animation
			monChat.cpt++;
			if(monChat.cpt > 2){
				monChat.cpt = 0;
				monChat.x = Math.round(monChat.x);
				monChat.y = Math.round(monChat.y);
				if(monChat.hasMoved){
					if(decor[monChat.x][monChat.y].chatParcours){
						var temp = monChat.historic.pop();
						decor[temp[0]][temp[1]].chatParcours = !decor[temp[0]][temp[1]].chatParcours;
						modifierCase(temp[0],temp[1]);
						caseADessiner.push(temp);
					} else {
						decor[monChat.x][monChat.y].chatParcours = !decor[monChat.x][monChat.y].chatParcours;
						modifierCase(monChat.x,monChat.y);
						caseADessiner.push([monChat.x,monChat.y]);
					}
					monChat.historic.push([monChat.x,monChat.y]);
				}

				monChat.dir = null;
			}
		}
	}
};

var drawGame = function(){
	if(!victoire){
		var img = new Image();
		img.addEventListener("load",function(){
			var ctx = document.getElementById('players').getContext('2d');
			//On efface le canvas
			ctx.clearRect(0, 0, 500, 500);
			//On affiche le sprite correspondant à la position du chat et sa direction
			ctx.drawImage(img,monChat.dirX*32,monChat.dirY*32,32,32,(monChat.x*32),(monChat.y*32),32,32);
		},false);
		img.src = monChat.img;

		var img2 = new Image();
		//On dessine toutes les cases qui ont été modifiées au dernier passage
		img2.addEventListener("load",function(){
			var ctx = document.getElementById('background').getContext('2d');
			var it = caseADessiner.pop();
			while(it){
				ctx.clearRect(it[0]*32, it[1]*32,32,32);
				ctx.drawImage(img2,decor[it[0]][it[1]].x*32,decor[it[0]][it[1]].y*32,32,32,it[0]*32,it[1]*32,32,32);
				it = caseADessiner.pop();
			}
		
		},false);

		img2.src = './img/puzzle.png';
	} else { //En cas de victoire, on efface tout et on affiche une image de victoire
		var img = new Image();
		img.addEventListener("load",function(){
			var ctx = document.getElementById('players').getContext('2d');
			ctx.clearRect(0, 0, 500, 500);
			ctx = document.getElementById('background').getContext('2d');
			ctx.clearRect(0, 0, 500, 500);
			ctx.drawImage(img,0,0,500,500);
		},false);
		img.src = './img/victoire.jpg';


		
	}
};

var animFrame = window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame    ||
	window.oRequestAnimationFrame      ||
	window.msRequestAnimationFrame     ||
	null ;
var mainloop = function() {
	compteur = (compteur+1%50000);
	userEvent();
	updateGame();
	drawGame();
};
var recursiveAnim = function() {
	mainloop();
	animFrame(recursiveAnim);
};

generation();
// start the mainloop
animFrame( recursiveAnim );


