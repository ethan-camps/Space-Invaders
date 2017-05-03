
var canvas;

var players;

var fighter;

var lasers;

var fighterFloatImg;

var laserImg;

var MARGIN = 40;

var someX;

var someY;







var start = false;

//===========================THE REEL=====================//



	







function setup() {

	var newCanvas = createCanvas(windowWidth*0.8,windowHeight);

	newCanvas.parent("canvas");

//========Create Opponent Fighter sPrite=======//

	var aOpp = createSprite(someX, someY);

	//Load images to the DOM
	fighterFloatImg = loadImage("images/fighterNoFlame.png");

	laserImg = loadImage("images/laser.png");



//=======FIGHTER PROPERTIES *in preload* ========//

			fighter = createSprite(width/2,height/2);

			//Set a maximum speed for the fighter 
			fighter.maxSpeed = 6;

			//Set a friction for the fighter for smoothing
			fighter.friction = .97;

			//Create an invisible circle to check for collisions against rocks in the canvas
				//Checks for collisons with .bounce
			fighter.setCollider("circle", 0, 0, 20);

			//Add my fighter png image with no thrust to the created sprite
			fighter.addImage("float", fighterFloatImg);


			//Add the flame animation to the sprite when the user moves it
			fighter.addAnimation("go", "images/fighterThrustLow.png","images/fighterThrustHigh.png");



	//Create an array using the 'new Group' hold the laser shots fired

	lasers = new Group();

	//Create an array using the 'new Group'to hold the rocks floating around

	players = new Group();


	opponent = new createOpp();



	//Loop for Creating Opponents
		//Limits the createRock function to 4 opponents
		// *still in setup here*



	for(var i=0; i<1; i++){

		var oppX = random(0,width);

		var oppY = random(0,height);

		//Create the rock at the random x an y generated above
		//createOpp(3, oppX, oppY);


	}








}//=============End of Setup==================//



function draw(){
	background('black');

	

	fill('red');
	//ellipse(mouseX,mouseY,100,100);

	//Intro Text
	text('Welcome to Space.', 100,20);
	text('Trump has sold the rest of space to Russia. This is the only free part of the Universe. Defend your freedom.', 100, 40);
	text('Click to begin your mission.', 100, 60);

	//Use a loop to constanly check the position of all the sprites on the canvas
		//Set Boundaries for all sprites to stay within the canvas
	for(var i=0; i<allSprites.length; i++){

		//Create a variable equal to array of all sprites to capture sprite data position
		var all = allSprites[i];

		if(all.position.x<-MARGIN) all.position.x = width+MARGIN;
		if(all.position.x>width+MARGIN) all.position.x = -MARGIN;
		if(all.position.y<-MARGIN) all.position.y = height+MARGIN;
		if(all.position.y>height+MARGIN) all.position.y = -MARGIN;

	}

		//For loop to display opposing players




	//Call the BOUNCE METHOD when the fighter hits a opponents within the rocks group(array)
	fighter.bounce(players);

	//Call OVERLAP method when the laser hits a rock to break it apart
		//Call the lasers group as the target
		//Assign the rockHit the callback function
	players.overlap(lasers, oppHit);

		//==========FIGHTER STUFF *in draw* =======//


			//=====FIGHTER MOVEMENT=========//
				//Add rotation to the fighter
					//Left and Right Arrows call fighter rotation
				if(keyDown(LEFT_ARROW)){
					fighter.rotation -= 4;

					fighter.getDirection();

					return fighter.direction

					sendFighterRotateLeft({

						'd':fighter.rotation,

					});
				}

				if(keyDown(RIGHT_ARROW))
					fighter.rotation += 4;

				//Add movement to the fighter
				if(keyDown(UP_ARROW)){

					//Use the p5 play addSpeed to make the fighter move when the up arrow is pressed
						//requires speed amount and angle of direction
					fighter.addSpeed(0.2, fighter.rotation);

					//Change the fighter sprite animation from "float" to "go" to display flames
					fighter.changeAnimation('go');

					


						//Send fighter postiion as JSON object
						sendFighterPos({

							'x':fighter.position.x,
							'y':fighter.position.y,
						

							
						})
				}

				else{

					//Change back to float if up key isnt pressed
					fighter.changeAnimation('float');

				}


			//========FIGHTER SHOOTING========//

				if(keyWentDown("x")){
					
					//=========LASER STUFF=========//

					//Create the laser variable and attach it to a new sprite
					var laser = createSprite(fighter.position.x,fighter.position.y);

					//Add the laoded laser image to the new laser sprite
					laser.addImage(laserImg);


					//Set a speed for the bullet to travel and a direction for it go
						//Make the speed faster but associated to the fighter speed
						//Make the direction of the laser the same orientation as the fighter
					laser.setSpeed(10+fighter.getSpeed(), fighter.rotation);

					//Add a laser life so it doesnt continue to pass throught gthe canvas
					laser.life = 40;

					//Add the shot laser to the array of shot lasers already in the canvas
					lasers.add(laser);





				}








	//Draw all of the sprites generated to the screen
	drawSprites();





	





}//===================END OF DRAW======================//


//===========Create a Opponent Function=========//

//this is the green one
function createOpp(type, someX, someY, someRotation, someVelX, someVelY){


	//Generate a sprite and connect it to a opponent variable

	this.display = function(someX,someY){

	var aOpp = createSprite(someX, someY);
	

	//Load an image to the sprite to represent the enemy player
	var oppImg = loadImage("images/opp.png");

	var oppDam1 = loadImage("images/oppDamage1.png");

	//Add the opponent Image to the sprite
	aOpp.addImage("idle", oppImg);

	aOpp.addImage("dam1", oppDam1);

	//Add the Animation for the opponents fire
	aOpp.addAnimation("move", "images/oppNoFlame.png", "images/oppFlame.png");




	//Set a speed and angle for the opponent floating around
	//aOpp.setSpeed(2.5,random(360));

	//Set a rotation speed for the opponent



	//Establish a posssibility for the opponent to change type when hit
	/*
	aOpp.type = type;

	if(type == 2)
		aOpp.scale = 0.6;
	
	//Change the opponent size when hit
	if(type == 1){
		aOpp.scale = 0.5;
		aOpp.changeImage("dam1");
	
	}
	*/

	//Use the mass p5 play mass property to determine the velocity reaction of a opponent  collision *using sprite bounce*
	//aOpp.mass = 2 +aOpp.scale;

	//Set a collider for the opponent using the setCollider invisible circle again
	aOpp.setCollider("circle",0 ,0, 20);

	//Add the opponent to the players  group(array) make sure to call loop later to limit how many opponents enter canvas
	players.add(aOpp);

	return aOpp;

	}

	this.getDirection = function(someVelX,someVelY,direction){

		this.velocity.x = someVelX;

		this.velocity.y = someVelY;

		var direction = atan2(this.velocity.y, this.velocity.x);
                        
                            if(isNaN(direction))
                              direction = 0;
                            return degrees(direction);

}

	this.rotation = function(someRotation, aOpp){


		aOpp.rotation = someRotation;
	}

}

/*

function drawOpp(otherX,otherY, someR, someG, someB, someRotation){

	var oppon = createSprite(otherX, otherY);

	//Load an image to the sprite to represent the enemy player
	var opImg = loadImage("images/opp.png");

	oppon.addImage("idle", opImg);

	oppon.rotatation(someRotation);



	return oppon;





		fill(someR,someG,someB);
	ellipse(otherX,otherY,200,200);
	console.log("drawOpp called");



}

*/

//============End Create Opponent Function=========//



//=======Socket Emits========//

function sendFighterPos(message){

	socket.emit('fighterPos',message);
}

function sendFighterRotateLeft(message){

	socket.emit('fighterRotateLeft',message);
}

//=============OTHER FIGHTER=================//











//============Bullet Hitting Rock Funciton=======//

function oppHit(aOpp, laser){

	var splitType = aOpp.type-1;

//Check if split has occured and create 2 smaller players if it hasnt already been split(if splitType less than 0)
	//If splitype is less than 0 then it is removed from the screen
if(splitType>0){

	createOpp(splitType, aOpp.position.x, aOpp.position.y);
		

}


laser.remove();
aOpp.remove();

}

//WEB SOCKET PORTION






