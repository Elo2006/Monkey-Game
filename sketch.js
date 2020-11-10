var monkey , monkey_running;
var banana,bananaImage, obstacle, obstacleImage;
var foodGroup, obstacleGroup;
var ground;
var score = 0;
var END = 0;
var PLAY = 1;
var gameState = PLAY;

function preload(){
  
  
monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
}



function setup() {
  createCanvas(530,400);
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;
   
  ground = createSprite(400,335,900,10);
  ground.velocityX = -4;
  ground.x = ground.width /2;
  
  foodGroup=createGroup();
  obstacleGroup=createGroup();
  
}


function draw() {
  background("#B4FFFA");
  
  if(gameState===PLAY){
     if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
     Banana();
     Obstacle();
    
    if(keyDown("space")&& monkey.y >= 290) {
        monkey.velocityY = -15;
    }
    monkey.velocityY = monkey.velocityY + 0.5 
     monkey.collide(ground)
    
    if(monkey.isTouching(foodGroup)){
       foodGroup.destroyEach();
       score = score+2;
    }
    if(monkey.isTouching(obstacleGroup)){
       gameState = END;
       }
  }
  if(gameState===END){
    ground.velocityX=0;
    foodGroup.destroyEach();
    obstacleGroup.destroyEach();
    score = 0;
    gameState = PLAY;
  }
  
  
  stroke("white")
  textSize(12)
  text("Score: "+ score,450,50);
  
  stroke("white")
  textSize(13)
  fill("gray")
  survivalTime = Math.ceil(frameCount/frameRate())
  text("Survival Time: "+ survivalTime, 100, 50)
  
  
  
  
  monkey.collide(ground);
  drawSprites();
}
function Banana(){ 
  if(frameCount%80===0){
    var banana = createSprite(600,150,10,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.velocityX=-4;
    foodGroup.add(banana);
  }
}

function Obstacle(){ 
  if(frameCount%300===0){
    var obstacle = createSprite(600,312,10,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -5;
    obstacleGroup.add(obstacle);
  }
}