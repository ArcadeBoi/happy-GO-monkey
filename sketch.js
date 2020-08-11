//Global variables
var bananaImage, obstacleImage
var obstacleGroup, foodGroup
var backGround, score;
var player;
var monkey, scene, ground, banana;

function preload() {
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
  player = loadAnimation("Monkey_01.png", "Monkey_02.png",
    "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png",
    "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  backGround = loadImage("jungle.jpg");
}


function setup() {
  createCanvas(600, 350);



  scene = createSprite(0, 0, 600, 350);
  scene.addImage("ground", backGround);
  scene.x = scene.width / 2;
  scene.velocityX = -4;

  ground = createSprite(300, 255, 600, 10);
  ground.visible = false;

  monkey = createSprite(50, 250, 20, 50);
  monkey.addAnimation("running", player);
  monkey.scale = 0.11;

  foodGroup = new Group();
  obstacleGroup = new Group();

  score = 0;
}

function draw() {
  background(220);


  if (keyDown("space") && monkey.y >= 187.9) {
    monkey.velocityY = -10;
  }

  monkey.velocityY = monkey.velocityY + 0.6;

  if (scene.x < 100) {
    scene.x = scene.width / 2;
  }

  if (foodGroup.isTouching(monkey)){
    score  = score + 2;
    foodGroup.destroyEach(); 
  }

  switch (score) {
    case 10:
      monkey.scale = 0.12;
      break;
    case 20:
      monkey.scale = 0.14;
      break;
    case 30:
      monkey.scale = 0.16;
      break;
    case 40:
      monkey.scale = 0.18;
      break;
    case 50:
      monkey.scale = 0.20;
      break;
    default:
      break;
  }
  
  if(obstacleGroup.isTouching(monkey)){
    monkey.scale= 0.11
    obstacleGroup.destroyEach();
  }
  monkey.collide(ground);
  if (World.frameCount % 80 === 0) {
    food();
  }
  if (World.frameCount % 150 === 0) {
    obstacles();
  }
  drawSprites();
}

function food() {
  var banana = createSprite(400, 0, 20, 20);
  banana.addImage(bananaImage);
  banana.scale = 0.06;
  banana.velocityX = -10;
  banana.y = random(200, 145);
  banana.lifetime = 60;
  foodGroup.add(banana);
}

function obstacles() {
  var rock = createSprite(400, 250, 20, 20);
  rock.addImage(obstacleImage);
  rock.scale = 0.2;
  rock.velocityX = -0;
  rock.lifetime = 700000000;
  obstacleGroup.add(rock);

 rock.debug = true;
}