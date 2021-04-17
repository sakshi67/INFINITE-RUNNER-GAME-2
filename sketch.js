var path,mainCyclist;
var pathImg,mainRacerImg1,mainRacerImg2;

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;

var cycleBellSound,cycleBell;

var pinkCG,pinkCyclists;
var oppPink1Img,oppPink2Img;

var yellowCG,yellowCyclists;
var oppYellow1Img,oppYellow2Img;

var redCG,redCyclists;
var oppRed1Img,oppRed2Img;

var  ObstaclesG, Obstacle1, Obstacle2, Obstacle3;
var obstacle1Img,obstacle2Img,obstacle3Img;

var gameOver1Img,gameOver;

var Life = 5;

function preload(){
  pathImg = loadImage("images/Road.png");
  
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png","images/mainPlayer2.png");
  mainRacerImg2= loadAnimation("images/mainPlayer3.png");
  
  cycleBell=loadSound("sound/bell.mp3");
  
  oppPink1Img = loadAnimation("images/opponent1.png","images/opponent2.png");
  oppPink2Img= loadAnimation("images/opponent3.png");
  
  oppYellow1Img = loadAnimation("images/opponent4.png","images/opponent5.png");
  oppYellow2Img= loadAnimation("images/opponent6.png");
  
  oppRed1Img = loadAnimation("images/opponent7.png","images/opponent8.png");
  oppRed2Img= loadAnimation("images/opponent9.png");
  
  obstacle1Img = loadImage("images/obstacle1.png");
  obstacle2Img = loadImage("images/obstacle2.png");
  obstacle3Img = loadImage("images/obstacle3.png");
  
  gameOver1Img = loadAnimation("images/gameOver1.png");
}

function setup(){
  
  createCanvas(displayWidth -20,displayHeight );
  
  // Moving background
  path=createSprite(displayWidth/2 -20,displayHeight/2 -20);
  path.addImage(pathImg);
  path.velocityX = -5;

  //creating boy running
  mainCyclist  = createSprite(70,displayHeight/2 );
  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  mainCyclist.scale=0.07;
  
  gameOver=createSprite(displayWidth/2 -50,displayHeight/2 -80);
  gameOver.addAnimation("gameOver1.png",gameOver1Img);
  gameOver.scale=0.9;
  text("Press Up Arrow to Restart the game!",300,100);

  
  pinkCG = new Group();
  yellowCG= new Group();
  redCG= new Group();
  ObstaclesG = new Group();
  
}

function draw() {
  background(0);
  
  if(gameState===PLAY){
   mainCyclist.y = World.mouseY;
   edges= createEdgeSprites();
   mainCyclist .collide(edges);
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }
      var select_oppPlayer = Math.round(random(1,3));
    
    if (World.frameCount % 150 == 0) {
      if (select_oppPlayer == 1) {
        pinkCyclists();
      } else if (select_oppPlayer == 2) {
        yellowCyclists();
      } else {
        redCyclists();
      }
    }

    var select_obstacle = Math.round(random(1,3));
    
    if (World.frameCount % 150 == 0) {
      if (select_obstacle == 1) {
        Obstacle1();
      } else if (select_obstacle == 2) {
        Obstacle2();
      } else {
        Obstacle3();
      }
    }
    
   if(keyDown("space")){
      cycleBell.play()
   } 
    
    gameOver.visible = false;
    distance=distance+Math.round(getFrameRate()/50);
    path.velocityX = -(6 + 2*distance/150);
    pinkCyclists.velocityX = -(6 + 2*distance/150);
    yellowCyclists.velocityX = -(6 + 2*distance/150);
    redCyclists.velocityX = -(6 + 2*distance/150);
    Obstacle1.velocityX = -(6 + 2*distance/150);
    Obstacle2.velocityX = -(6 + 2*distance/150);
    Obstacle3.velocityX = -(6 + 2*distance/150);

  }
 
  if(pinkCG.isTouching(mainCyclist)){
     gameState = END;
     player1.velocityY = 0;
     player1.addAnimation("opponentPlayer1",oppPink2Img);
    }
     if(yellowCG.isTouching(mainCyclist)){
     gameState = END;
     player2.velocityY = 0;
     player2.addAnimation("opponentPlayer2",oppYellow2Img);
    }
     if(redCG.isTouching(mainCyclist)){
     gameState = END;
     player3.velocityY = 0;
     player3.addAnimation("opponentPlayer3",oppRed2Img);
    } 

    if(ObstaclesG.isTouching(mainCyclist)){
      gameState = END;
      mainCyclist.velocityY = 0;
      
     // mainCyclist.addAnimation("opponentPlayer3",oppRed2Img);
     } 

   else if(gameState===END){
     gameOver.visible = true;
    textSize(20);
    fill(255);
    text("Press Up Arrow to Restart the game!", 500,200);
  
    path.velocityX = 0;
    mainCyclist.velocityY = 0;
    mainCyclist.addAnimation("SahilRunning",mainRacerImg2);
  
    pinkCG.setVelocityXEach(0);
    pinkCG.setLifetimeEach(-1);
  
    yellowCG.setVelocityXEach(0);
    yellowCG.setLifetimeEach(-1);
  
    redCG.setVelocityXEach(0);
    redCG.setLifetimeEach(-1);

    ObstaclesG.setVelocityXEach(0);
    ObstaclesG.setLifetimeEach(-1);
    
    if(keyDown("UP_ARROW")) {
      reset();
    }
  }
   



  pinkCyclists();
  yellowCyclists();
  redCyclists();

  Obstacle1();
  Obstacle2();
  Obstacle3();
  
  drawSprites();
  textSize(50);
  fill(255);
  text("Distance: "+ distance,50,50);
  }


     
function pinkCyclists(){
  if (World.frameCount % 80 == 0) {
     player1=createSprite(1100,Math.round(random(50,250),10,10));
     player1.addAnimation("opponentPlayer1",oppPink1Img);
     player1.scale=0.06;
     player1.lifetime=170
     player1.velocityX=-6;
     pinkCG.add(player1);
  }
}


function yellowCyclists(){
  if (World.frameCount % 80 == 0) {
     player2=createSprite(1200,Math.round(random(50,250),10,10));
     player2.addAnimation("opponentPlayer2",oppYellow1Img);
     player2.scale=0.06;
     player2.lifetime=170
     player2.velocityX=-6;
     yellowCG.add(player2);
  }
}
function redCyclists(){
  if (World.frameCount % 80 == 0) {
     player3=createSprite(1300,Math.round(random(50,250),10,10));
     player3.addAnimation("opponentPlayer3",oppRed1Img);
     player3.scale=0.06;
     player3.lifetime=170
     player3.velocityX=-6;
     redCG.add(player3);
  }
}

function Obstacle1(){
  if (World.frameCount % 80 == 0) {
     obstacle1=createSprite(2000,Math.round(random(50,250),10,10));
     obstacle1.addAnimation("obstacle1",obstacle1Img);
     obstacle1.scale=0.1;
     obstacle1.lifetime=170
     obstacle1.velocityX=-6;
     ObstaclesG.add(obstacle1);
  }
}

function Obstacle2(){
  if (World.frameCount % 80 == 0) {
     obstacle2=createSprite(2100,Math.round(random(50,450),10,10));
     obstacle2.addAnimation("obstacle2",obstacle2Img);
     obstacle2.scale=0.1;
     obstacle2.lifetime=170
     obstacle2.velocityX=-6;
     ObstaclesG.add(obstacle2);
  }
}

function Obstacle3(){
  if (World.frameCount % 80 == 0) {
     obstacle3=createSprite(2200,Math.round(random(50,850),10,10));
     obstacle3.addAnimation("obstacle3",obstacle3Img);
     obstacle3.scale=0.1;
     obstacle3.lifetime=170
     obstacle3.velocityX=-6;
     ObstaclesG.add(obstacle3);
  }
}


function reset(){
  gameState=PLAY;
  gameOver.visible = false;
  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  
  pinkCG.destroyEach();
  yellowCG.destroyEach();
  redCG.destroyEach();
  ObstaclesG.destroyEach();
  
  distance = 0;
}