//Global Variables
var bananaImage;
var obstacleImage;
var back, backImage;
var ground;
var obstacleGroup;
var foodGroup;
var player, player_running;
var score = 0;


function preload(){
  backImage = loadImage("jungle.jpg");
  
  player_running = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png","Monkey_09.png", "Monkey_10.png");
  
  bananaImage = loadImage("Banana.png");
  obstaclesImage = loadImage("stone.png");
}

function setup() {
  createCanvas(600,200);
  
    back = createSprite(200, 100, 400, 200);
  back.addImage("ground", backImage);
  back.x = back.width /2;
  back.velocityX = -3;
  
  player = createSprite(100, 180, 10, 10);
  player.addAnimation("running", player_running);
  player.scale = 0.1;
  

  
  ground = createSprite(200,190,400,10);
  ground.visible = false;
  
  foodGroup = new Group();
  obstaclesGroup = new Group();
  
}


function draw(){
 background(255); 

  if(keyDown("space")) {
    player.velocityY = -10;
  }
  
  player.velocityY = player.velocityY + 0.9;
  
   if (back.x < 0){
    back.x = back.width/2;
  }
  
  player.collide(ground);
  
  spawnBananas();
  monkeySize();
  obstacles();
  
  drawSprites();
  
    fill("white");
  text("Score:" +score, 500, 20);
  
}


function spawnBananas() {
  if (World.frameCount % 60 === 0) {
    var banana = createSprite(600,120,40,10);
    banana.y = random(80,120);
    banana.addImage("banana", bananaImage);
    banana.scale = 0.08;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = player.depth;
    banana.depth = player.depth + 1;
    
    foodGroup.add(banana);
  }
}

function monkeySize(){
if(foodGroup.isTouching(player)){
  player.scale = player.scale + 0.01;
  score = score + 2;
  foodGroup.destroyEach();
}
  if(obstaclesGroup.isTouching(player)){
  player.scale = player.scale - 0.01;
  obstaclesGroup.destroyEach();
  }
}

function obstacles(){
 if (World.frameCount % 80 === 0) {
    var obstacle = createSprite(600,175,40,10);
    obstacle.addImage("stone", obstaclesImage);
    obstacle.scale = 0.1;
    obstacle.velocityX = -3;
    
     //assign lifetime to the variable
    obstacle.lifetime = 200;
   
   obstaclesGroup.add(obstacle);
}}
