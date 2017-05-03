var canvas;

//===========================THE REEL=====================//

function preload() {


}


function setup() {

	canvas = createCanvas(windowWidth,windowHeight);

	canvas.position(0,0);


}

function draw(){


	fill('red');

	//========Up Control====//

	fill('cyan');
	triangle(0,0,windowWidth/2,0,windowWidth/4,windowHeight/2);

	//=========Down Control=====//

	fill('red');
	triangle(0,windowHeight,windowWidth/2,windowHeight,windowWidth/4,windowHeight/2);

	//=========Left Control=====//

	fill('magenta');
	triangle(0,0,0,windowHeight,windowWidth/4,windowHeight/2);

	//=========Right Control=====//

	fill('green');
	triangle(windowWidth/2,0,windowWidth/2,windowHeight,windowWidth/4,windowHeight/2);


	//====Fire Control=======//

	fill('yellow')
	ellipse(windowWidth*0.75,windowHeight/2,300,300);



}




//==============UPLOAD=============///