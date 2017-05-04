
var canvas;

var players;

var lasers;

var fighterFloatImg;

var laserImg;

var MARGIN = 40;

var someX;

var someY;

var fighter;

var start = false;

//===========================THE REEL=====================//
function setup(){

	var newCanvas = createCanvas(windowWidth*0.8,windowHeight);

	newCanvas.parent("canvas");

/*//========Create Opponent Fighter sPrite=======//

	//var aOpp = createSprite(someX, someY);

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

	players = new Group();

	players.add(fighter);

	//Create an array using the 'new Group' hold the laser shots fired

	lasers = new Group();*/

    players = new Group();
    lasers = new Group();
    lasers = new Group();

    var oppX = random(0,width);
    var oppY = random(0,height);

    var img = "images/opp.png";
    var type = 3;

    var laserShot = "images/laser.png";
    laserImg = loadImage(laserShot);

	// set fighter
	fighter = createOpp(type, oppX, oppY, 0, img);

}



//this is the green one
function createOpp(type, someX, someY, someRotation, img){

    //Generate a sprite and connect it to a opponent variable
	var aOpp = createSprite(someX, someY);
	var loadedImg = loadImage(img);

	//Add the opponent Image to the sprite
	aOpp.addImage("idle", loadedImg);

	//aOpp.addImage("dam1", oppDam1);

	//Add the Animation for the opponents fire
	aOpp.addAnimation("move", "images/oppNoFlame.png", "images/oppFlame.png");

	//Set a speed and angle for the opponent floating around
	aOpp.maxSpeed = 6;

	aOpp.friction = .97;

	//Set a rotation speed for the opponent
   


	//Establish a posssibility for the opponent to change type when hit
	
	aOpp.type = type;

	if(type == 2) {
		aOpp.scale = 0.6;
	}
	
	//Change the opponent size when hit
	if(type == 1) {
		aOpp.scale = 0.5;
		aOpp.changeImage("dam1");		

	}

	//Set a collider for the opponent using the setCollider invisible circle again
	aOpp.setCollider("circle",0 ,0, 20);

	//Add the opponent to the players  group(array) make sure to call loop later to limit how many opponents enter canvas
	players.add(aOpp);

	return aOpp;

}


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


	//fighter.move();
	//fighter.move();
	//fighter.addSpeed();
	//fighter.setVelocity();


	//Call the BOUNCE METHOD when the fighter hits a opponents within the rocks group(array)
	//fighter.bounce(players);

	//Call OVERLAP method when the laser hits a rock to break it apart
	//Call the lasers group as the target
	//Assign the rockHit the callback function
	players.overlap(lasers, oppHit);

	
	//Add rotation to the fighter
	//Left and Right Arrows call fighter rotation
	if(keyDown(LEFT_ARROW)){
		fighter.rotation -= 4;

		sendFighterRotateLeft({

			'd':fighter.direction,

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
		//fighter.changeAnimation('float');

	}
			//========FIGHTER SHOOTING========//

	if(keyWentDown("x")){
		
		//=========LASER STUFF=========//
		//Normalize the rotation
        var rotation = Math.abs(fighter.rotation % 360);
        var posX = 50 * (Math.tan(rotation));
        var posY  = 50 * (Math.tan(rotation));  
        

		//Create the laser variable and attach it to a new sprite
		var laser = createSprite(fighter.position.x -posX, fighter.position.y-posY);
		//console.log(fighter.rotation);


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

function sendFighterPos(message){

	socket.emit('fighterPos',message);
}


function drawOpp(otherX,otherY, someR, someG, someB, someRotation){

	var oppon = createSprite(otherX, otherY);

	//Load an image to the sprite to represent the enemy player
	var opImg = loadImage("images/opp.png");

	oppon.addImage("idle", opImg);

	oppon.rotatation(someRotation);


	fill(someR,someG,someB);
	ellipse(otherX,otherY,200,200);
	console.log("drawOpp called");

}



//============End Create Opponent Function=========//



//=======Socket Emits========//


function sendFighterRotateLeft(message){

	socket.emit('fighterRotateLeft',message);
}

//=============OTHER FIGHTER=================//


//============Bullet Hitting Rock Funciton=======//

function oppHit(aOpp, laser){

	var splitType = aOpp.type-1;

	//Check if split has occured and create 2 smaller players if it hasnt already been split(if splitType less than 0)
		//If splitype is less than 0 then it is removed from the screen
	if(splitType>0) {
		// createOpp(splitType, aOpp.position.x, aOpp.position.y);
		console.log('Hit called');	
		// @TODO you check to see if aOpp is an opponenet
	    console.log(aOpp);
	}

	laser.remove()
}

//WEB SOCKET PORTION






