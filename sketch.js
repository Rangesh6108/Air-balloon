var balloon,balloonImage1,balloonImage2;
var bird_1,bird_1_img;
var bird_2,bird_2_img;
var rand;
// var bird_3,bird_3_img;
// var bird_4,bird_4_img;
// var bird_5,bird_5_img;
// var bird_6,bird_6_img;

// create database and position variable here
var position;
var database;

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
   
   bird_1_img=loadAnimation("Bird_1.png","Bird_2.png","Bird_3.png");
   bird_2_img=loadAnimation("Bird_4.png","Bird_5.png","Bird_6.png");
   
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(1500,700);

  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  var balloonpos=database.ref('balloon/position');
   balloonpos.on("value",readPosition,showError);

  // textSize(20); 
}

// function to display UI
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in left direction
    writePosition(-2,0);
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in right direction
    writePosition(+2,0);
  }
  else if(keyDown(UP_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in up direction
    writePosition(0,-2);
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in down direction
    writePosition(0,+2);
  }

  if(frameCount % 100 == 0){
    bird_1=createSprite(0,rand=Math.round(random(50,200)),10,10);
    
    bird_1.addAnimation("bird flying",bird_1_img);
    bird_1.velocityX=3;
    bird_1.scale=0.5;

  //   bird_1.depth=bird_2.depth;
  //   bird_1.depth=bird_1.depth+1;
  }

  if(frameCount % 100 == 0){
    bird_2=createSprite(1500,rand=Math.round(random(50,200)),10,10);
    bird_2.addAnimation("bird flying_2",bird_2_img);
    bird_2.velocityX=-3;
    bird_2.scale=0.2;
    
  }


  drawSprites();
  fill(0);
  stroke("white");
  strokeWeight(5);
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}

function writePosition(x,y){
    database.ref('balloon/position').set({
      'x':position.x+x,
      'y':position.y+y
  })
}
function readPosition(data){
  position=data.val();
  balloon.x=position.x;
  balloon.y=position.y;
}

function showError(){
  console.log("hello world");
}
