function preload() {

  //preloading background image
  bgImage = loadImage("./images/bg.jpg")

  //preloading ironman image
  ironImage = loadImage("./images/iron.png")

  //preloading restart screen image
  restartImage = loadImage("./images/restart.png")

  //preloading diamond image and adding group for diamonds 
  diamondImage = loadImage("./images/diamond.png")
  diamondsGroup = new Group()

  //preloading spike image and adding group for spikes
  spikeImage = loadImage("./images/spikes.png")
  spikesGroup = new Group()

  //preloading stone image and adding group for stones
  stoneImage = loadImage("./images/stone.png")
  stonesGroup = new Group()
}

function setup() {

  //creating a frame in which the game works
  createCanvas(1000, 600);

  //creating background and making it move from top to bottom
  bg = createSprite(580,300)
  bg.addImage(bgImage)
  bg.scale = 2
  bg.velocityY=8

  //creating ironman and setting a collider so that ironman crashes into other sprites
  iron = createSprite(150,400)
  iron.addImage(ironImage)
  iron.scale = 0.3
  iron.debug = true;
  iron.setCollider("rectangle",50,0,300,400)

  //creating borders so that ironman dosen't go out of frame 
  platform = createSprite(200,650,1600,100)
  platform.visible = true
  platform2 = createSprite(0,500,10,1000)
  platform2.visible = false
  platform3=createSprite(1000,100,10,1000)
  platform3.visible = false
  platform4=createSprite(600,0,1600,10)
  platform4.visible = false

  //initializing score to the game 
  score=0
}

function draw() {

  //making the background scroll top to bottom infinitly 
  if(bg.y>500){
    bg.y=300
  }

  //when player clicks up arrow key ironman goes up 
  if(keyDown('up')){
    iron.velocityY = -10
  }

  //when player clicks right arrow key ironman goes right
  if(keyDown('right')){
    iron.velocityX = 5
  }

  //when player clicks left arrow key ironman goes left
  if(keyDown('left')){
    iron.velocityX = -5
  }

  //making a stone appear every 70 frames
  if(frameCount%70==0){
    generateStones()
  }
  //making ironman crash with stones or stand on stones
  for(var x=0;x<stonesGroup.length;x++){
    var temp = stonesGroup.get(x)
    if(iron.isTouching(temp)){
      iron.collide(temp)
    }
  }

  //making a diamond appear every 50 frames
  if(frameCount%50==0){
    generateDiamonds()
  }
  //the score increases when ironman catches diamonds 
  for(var x=0;x<diamondsGroup.length;x++){
    var temp = diamondsGroup.get(x)
    if(iron.isTouching(temp)){
      temp.destroy()
      score+=5
    }
  }

  //making a spike appear every 50 frames
  if(frameCount%50==0){
    generateSpikes()
  }
  //the score decreases when ironman hits spikes
  for(var x=0;x<spikesGroup.length;x++){
    var temp = spikesGroup.get(x)
    if(iron.isTouching(temp)){
      temp.destroy()
      score-=3
    }
  }

  //adding gravity to the game 
  iron.velocityY+=0.3

  //keeping ironman in the frame
  iron.collide(platform)
  iron.collide(platform2)
  iron.collide(platform3)
  iron.collide(platform4)
  
  //adding all sprites to the game
  drawSprites();

  //showing the current score of the player in the game
  textSize(20)
  fill("red")
  text("Diamonds Collected :"+score,450,50)
   
}

//making stones appear from random sides and go top to bottom infinitely
function generateStones(){
  stone = createSprite(random(100,1100),0)
  stone.addImage(stoneImage)
  stone.velocityY = 2
  stone.scale = 0.6
  stonesGroup.add(stone)
  stone.lifetime = 300
}

//making diamonds appear from random sides and go top to bottom infinitely
function generateDiamonds(){
  diamond = createSprite(random(100,1100),0)
  diamond.addImage(diamondImage)
  diamond.velocityY = 3
  diamond.scale = 0.5
  diamondsGroup.add(diamond)
  diamond.lifetime = 300
}

//making spikes appear from random sides and go top to bottom infinitely
function generateSpikes(){
  spike=createSprite(random(100,1100),0)
  spike.addImage(spikeImage)
  spike.velocityY = 3
  spike.scale = 0.5
  spikesGroup.add(spike)
  spike.lifetime = 300
}

