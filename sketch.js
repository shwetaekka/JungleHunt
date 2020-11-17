var jungleSprite, jungleImg;
var boySprite, boyImg;

var animal,animalGrp;
var bearImg,tigerImg,lionImg;
var bullet, bulletImg,bulletsound, bulletGrp;

var bird, birdImg, birdGrp,birdImg1,birdImg2;

var gameState = "play";

var score = 0;

var lifeCount = 3;

function preload(){
  jungleImg = loadImage("images/jungle.jpg");
  boyImg = loadImage("images/boy.png");
  bearImg=loadImage("images/bear.png");
  tigerImg=loadImage("images/tiger.png");
  lionImg=loadImage("images/lion.png");
  bulletImg=loadImage("images/bullet.png");
  birdImg1=loadImage("images/bird1.png");
  //how To add sound can you tell mam
  bulletsound = loadSound("bullet.mp3");
}

function setup() {
  createCanvas(800,400);
  
  //jungle
  jungleSprite = createSprite(400, 200, 800, 400);
  jungleSprite.addImage("jungle", jungleImg);
  jungleSprite.velocityX = -3;

  //boy
  boySprite = createSprite(60, 350, 20, 50);
  boySprite.addImage("boy_running", boyImg);
  boySprite.scale = 0.2;
  boySprite.setCollider("rectangle", 0, 0, 20, 20);
  //boySprite.debug = true;
  
  birdGrp = new Group();
  animalGrp = new Group();
  bulletGrp = new Group();

  fill("white");
  textSize(20);
  textFont("Comic MS Sans");
}

function draw() {
  if (gameState==="play"){

    //infinitely moving jungle
    if(jungleSprite.x < 0){
      jungleSprite.x = jungleSprite.width / 2;
    }

    //when space key is pressed, call shoot bullet function
    if(keyDown("space")){
      shootBullet();
    }

    
    
    //sccoring the system with bullet animal to be destroyed.
    for(var i = 0; i<animalGrp.length;i++){
      if(bulletGrp.size() > 0){
        if(bulletGrp.isTouching(animalGrp.get(i))){
          score += 50;
          animalGrp.get(i).destroy();
          bulletGrp.destroyEach();
        }
      }
    }
    
    //reduce lifetime by 1 after deleting the animal which touches the boy
    if(animalGrp.isTouching(boySprite)){
      for(var i = 0; i<animalGrp.length;i++){
        if(boySprite.isTouching(animalGrp.get(i))){
            animalGrp.get(i).destroy();
        }
      }
      lifeCount=lifeCount-1;
    }

    //if lifetime = 0, make the game END
    if(lifeCount===0){
      gameState="end";
    }

    //call functions to create bird and the animals at regular intervals
    addBirds();
    addAnimals();

  }else if(gameState==="end"){

    //make the objects pause
    jungleSprite.velocityX=0;
    animalGrp.setVelocityXEach(0);
    birdGrp.setVelocityXEach(0);
    animalGrp.setLifetimeEach(-1);
    birdGrp.setLifetimeEach(-1);
    
  }

  drawSprites();

  text("SCORE: " + score, 600, 50);
  text("Lives Left: " + lifeCount,600,100);
  if(gameState === "end"){
    //display GAME OVER in bold when lifetime  is over.
    textSize(30);
    textFont("Jokerman");
    text("GAME OVER",320,200);
  }
}

function shootBullet(){
  bullet = createSprite(50, 348, 20, 20);
  bullet.addImage("bullet", bulletImg);
  bullet.scale = 0.2;
  bullet.velocityX = 10;
  bulletsound.play();///////////<<<<<<<<PLAY sound
  bullet.depth = boySprite.depth;
  boySprite.depth =boySprite.depth+1;
  bulletGrp.add(bullet);
}

function addBirds(){
  if (frameCount % 100 === 0) {
    var bird = createSprite(800, 75, 20, 20);
    bird.y = Math.round(random(40, 100));
    bird.addImage("birds",birdImg1);
    //add img when you have loaded in preload
    //add scale too
    bird.velocityX = -4;
    bird.lifetime = 200;
    bird.scale = 0.7;
    console.log(bird.y);    
    birdGrp.add(bird);
  
  }

}
function addAnimals(){
  if(frameCount % 150=== 0){
    var a1=createSprite(800,350,20,40);
    var randnumber=Math.round(random(1,3));
    switch(randnumber){
      case 1: a1.addImage("animal1", bearImg);
              a1.scale = 0.3;
              break;

      case 2: a1.addImage("animal2",lionImg);
              break;

      case 3:a1.addImage("animal3",tigerImg);
              break;
      default: break;
    }
    a1.shapeColor = "red";
    a1.velocityX=-6;
    a1.lifetime=200;
    animalGrp.add(a1);
  }
}