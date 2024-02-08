var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage,cloudImage;

var obstaclesGroup,cloudsGroup,gameOverImg,restartImg,gameOver,score;
var obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var Sound;

var PLAY=1;
var END=0;
var gameState=PLAY;


function preload(){
  trex_running = loadAnimation("trex1.png","trex2.png","trex3.png");
  trex_collided = loadImage("trex_collided.png"); 
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");

  obstacle1=loadImage("obstacle1.png");
  obstacle2=loadImage("obstacle2.png");
  obstacle3=loadImage("obstacle3.png");
  obstacle4=loadImage("obstacle4.png");
  obstacle5=loadImage("obstacle5.png");
  obstacle6=loadImage("obstacle6.png");
  restartImg=loadImage("restart.png")
  gameOverImg=loadImage("gameOver.png")
  //PRIMERO CARGAMOS EL SONIDO DE SALTO
  Sound=loadSound("jump.mp3")
  // TERCERO CARGAMOS EL SONIDO DE FIN DE TREX
  Sound1=loadSound("die.mp3")
  // SEXTO CARGAR SONIDO ITO
  Sound2=loadSound("checkpoint.mp3")
  
 


   
}

function setup() {

  createCanvas(600,200)
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  trex.addAnimation("collided",trex_collided)
  gameOver=createSprite(300,100);
  gameOver.addImage(gameOverImg);
  gameOver.scale=0.5;
  gameOver.visible=false;

  restart=createSprite(300,140)
  restart.addImage(restartImg)
  restart.scale=0.5;
  restart.visible=false;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;

  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();

  
  var rand=Math.round(random(1,100))
 console.log("Hola"+"Mundo")
 score=0;
 trex.setCollider("circle",0,0,40);
 // NOVENO DAR INTELIGENCIA ARTIFICIAL A TREX
 //trex.setCollider("rectangle",0,0,40,trex.height);
 trex.debug=true
    

}

function draw() {
  
  background(220);

  text("Puntuación:"+score,500,50);
  console.log("esto es ", gameState)

  
  if(gameState===PLAY){
    //OCTAVO AUMENTAR VELOCIDAD DEL PISO 
    ground.velocityX = -(4+3*score/100)
    score=score+Math.round(frameCount/60)
    //QUINTO CREAR SONIDO PARA ITO
    if(score>0 && score%100===0){
      Sound2.play();
    }

    if (ground.x < 0){
      ground.x = ground.width/2;
    }

    if(keyDown("space")&& trex.y >= 100) {
      trex.velocityY = -10;
      //SEGUNDO ACTIVAMOS EL SONIDO DE SALTO
      Sound.play();
  
     
    }
    
    trex.velocityY = trex.velocityY + 0.8

    spawnClouds();
    spawnObstacles(); 

if(obstaclesGroup.isTouching(trex)){
  gameState=END;
  // CUARTO LLAMAR SONIDO DE FIN DE TREX
  Sound1.play();
}    
    
  }
  else if(gameState===END){

    ground.velocityX=0;
    trex.velocityY=0;
    gameOver.visible=true;
    restart.visible=true;

trex.changeAnimation("collided",trex_collided);

obstaclesGroup.setLifetimeEach(-1);
cloudsGroup.setLifetimeEach(-1);

obstaclesGroup.setVelocityXEach(0);
cloudsGroup.setVelocityXEach(0);
  }
 
  
  trex.collide(invisibleGround);
  
  drawSprites();
  
}

function spawnClouds(){
  
  if(frameCount%60===0){
    cloud=createSprite(600,100,40,10);
    cloud.addImage(cloudImage)
    cloud.y=Math.round(random(10,60))
    cloud.scale=0.9;
    cloud.velocityX=-3
    cloud.lifetime=134;
    console.log(trex.depth);
    console.log(cloud.depth);
    cloud.depth=trex.depth
    trex.depth=trex.depth + 1
    cloudsGroup.add(cloud);
  }
}

  function spawnObstacles(){
    if(frameCount%60==0){
      var obstacle=createSprite(600,165,10,40);
      //SÉPTIMO CAMBIAR VELOCIDAD DE LOS OBSTACULOS

      obstacle.velocityX=-(6+score/100);

     
    var rand=Math.round(random(1,6))
   
  
 switch(rand){
  case 1: obstacle.addImage(obstacle1);
          break;
  case 2: obstacle.addImage(obstacle2);
          break;
  case 3: obstacle.addImage(obstacle3);
          break; 
  case 4: obstacle.addImage(obstacle4);
          break;  
  case 5: obstacle.addImage(obstacle5);
          break;   
  case 6: obstacle.addImage(obstacle6);
          break;  
  default:break;        
 }

 obstacle.scale=0.5;
 obstacle.lifetime=300;
 obstaclesGroup.add(obstacle);
    }
    
  }
 




