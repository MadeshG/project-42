var backImage,backgr;
var player, player_running;
var ground,ground_img;

var END =0;
var PLAY =1;
var gameState = PLAY;
var score =0
function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  bananaImage = loadImage("banana.png")
  obstacleImage=loadImage("stone.png")
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  ground = createSprite(400,350,800,10);
  ground.x=ground.width/2;
  ground.visible=false;

  bananaGroup = new Group()
  obstacleGroup = new Group()
}

function draw() { 
  background(0);

  drawSprites();
  textSize(20)
  fill("white")
  text("score"+score,300,50)
  if(gameState===PLAY){
  
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);
    bananas()
    spawnObstacles()

    if(bananaGroup.isTouching(player)){
      score = score +1
      bananaGroup.destroyEach()
    }

    if(obstacleGroup.isTouching(player)){
      gameState=END
    }
  }
  if (gameState===END){
    backgr.velocityX=0
    player.velocityX=0
    obstacleGroup.setVelocityXEach(0)
    bananaGroup.setVelocityXEach(0)
    player.destroy()

    textSize(50)
    fill("white")
    text("Gameover",400,200)
  }

}

function bananas(){
  if(frameCount%200 === 0){
    banana = createSprite(800,200,20,20)
    banana.addImage(bananaImage)
    banana.velocityX = -3
    banana.scale = 0.05
    bananaGroup.add(banana)
    
    
    
  }
}

function spawnObstacles() {
  if(frameCount%100 === 0){
    obstacle = createSprite(800,350,20,20)
    obstacle.addImage(obstacleImage)
    obstacle.velocityX=-5
    obstacle.scale=0.2
    obstacleGroup.add(obstacle)
}
}



