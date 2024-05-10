/**
 * Fishing simulator
 * Catherine Zaloshnja
 * Originally I wanted the fishing game to be more complex and inspired by the fishing system in Final Fantasy XIV,
 * but I simplified it to be more similar to Stardew Valley/Animal Crossing like fishing, 
 * and THEN I simplified it again cause I couldn't figure out how to make that work.
 * 
 * The general idea is that you need to hook fish and drag them to the surface to catch them. There are a total of 15 different fish/items that you can
 * fish out and each of them have a probability of dropping. Once a new fish/item is caught the inventory on the right will light up showing what that fish is
 * and keeping count of how many of that same fish you've caught. There is also a total fish counter and score. Each fish/item has a score attached to it.
 * 
 * there are still some things i'd like to add to this or polish like the fish img flipping depending on what direction its swimming, improving some of the visuals and 
 * adding little pixel icons for each fish/items in the inventory but due to lack of time i'm leaving it at this
 */

"use strict";

let state = 'title' //can be 'title', 'simulation', 'allFishCaught'

//setting up the variables for all the image assets
let borderImg;
let fishBgImg;
let hookImg;
let fishShadowImg;
let fishShadowFlipImg;
let bgImg;

//a box showing what fish the user has or has not yet caught
let inventoryBox = {
  x: undefined,
  y: undefined,
  width: 450,
  height: 900
};

//each box inside the inventory box for each fish
let inventoryFishBox = {
  x: undefined,
  y: undefined,
  width: 410,
  height: 55
}

//each different type of fish caught is worth a certain amount, this will keep track of the user's score
let scoreBox = {
  x: undefined,
  y: undefined,
  width: 300,
  height: 75,
  roundness: 20
}

//this box will keep count of how many fish the user has caught
let fishCountBox = {
  x: undefined,
  y: undefined,
  width: 400,
  height: 75,
  roundness: 20
}

//the hook is the user
let hook = {
  x: 0,
  y: 0,
  size: 25
}

//variables for our 3 fish
let fish1 = {
  x: 0,
  y: 0,
  size: 100,
  vx: 0,
  vy: 0,
  speed: 1.5
}

let fish2 = {
  x: 0,
  y: 0,
  size: 50,
  vx: 0,
  vy: 0,
  speed: 2
}

let fish3 = {
  x: 0,
  y: 0,
  size: 75,
  vx: 0,
  vy: 0,
  speed: 1.5
}

//current score
let score = 0;

//number of fish caught
let numFish = 0;

//variable for if each fish/object has been caught before or not + the counter for times it has been caught
let frog = {
  caught: false,
  counter: 0
}

let catfish = {
  caught: false,
  counter: 0
}

let loach = {
  caught: false,
  counter: 0
}

let perch = {
  caught: false,
  counter: 0
}

let salmon = {
  caught: false,
  counter: 0
}

let carp = {
  caught: false,
  counter: 0
}

let koi = {
  caught: false,
  counter: 0
}

let mutantCarp = {
  caught: false,
  counter: 0
}

let sturgeon = {
  caught: false,
  counter: 0
}

let bass = {
  caught: false,
  counter: 0
}

let crystal = {
  caught: false,
  counter: 0
}

let brokenGlasses = {
  caught: false,
  counter: 0
}

let soggySock = {
  caught: false,
  counter: 0
}

let sodaCan = {
  caught: false,
  counter: 0
}

let treasureChest = {
  caught: false,
  counter: 0
}

//variable for SFX
let audio;

/**
 * Description of preload
*/
function preload() {

  //images
  borderImg = loadImage("assets/images/border.png");
  fishBgImg = loadImage("assets/images/bg-fish.png");
  hookImg = loadImage("assets/images/hook.png");
  fishShadowImg = loadImage("assets/images/fish.png");
  bgImg = loadImage("assets/images/bg.png");
  fishShadowFlipImg = loadImage("assets/images/fishflip.png")

  //sound
  audio = loadSound('assets/sounds/water_birds.wav');

}


/**
 * Description of setup
*/
function setup() {
  createCanvas(2000, 1000);

  //setting up the position of the inventory box
  inventoryBox.x = width-275;
  inventoryBox.y = height/2;

  //setting up the position of the score box
  scoreBox.x = width-750;
  scoreBox.y = height-50;

  //setting up the position of the fish count box
  fishCountBox.x = width-1200;
  fishCountBox.y = height-50;

  //setting the fish1 x position to be at the left edge of the fishing interface box
  fish1.x = 500;
  //when the fish position resets, the y will be random and inside the fishing interface box, but not too close to the top or bottom
  fish1.y = random(250, 800);
  fish1.vx = fish1.speed;

  //same thing but for fish2 + fish3
  fish2.x = 1500; //will start on the right
  fish2.y = random(250, 800);
  fish2.vx = -fish2.speed; //will go from right to left

  fish3.x = 1500;
  fish3.y = random(250, 800);
  fish3.vx = -fish3.speed;

  //setting up the hook (user) position
  hook.x = width/2;
  hook.y = mouseY;

  //setting up the position of the inventory fish box
  inventoryFishBox.x = width-275;
  inventoryFishBox.y = 125;

}


/**
 * Description of draw()
*/
function draw() {
  background(100, 0, 220);
  noCursor();

  if (state === 'title') {
    title();
  }
  else if (state === 'simulation') {
    simulation();
  }
  else if (state === 'allFishCaught') {
    allFishCaught();
  }

}

function title() {
  //title screen / tutorial

  //you can see the game interface in the title screen
  display();

  //text in the title screen
  push();
  textSize(55);
  fill(255);
  textAlign(CENTER);
  textFont('Georgia');
  text('Fishing Simulator', width/2, height/2-150);
  textSize(35);
  text('Use your mouse to control the hook.', width/2, height/2);
  text('Reel fish in by dragging them to the surface!', width/2, height/2+50);
  text('Catch them all! :)', width/2, height/2+100);
  textSize(25);
  text('Click to start', width/2, height/2+200);
  textAlign(LEFT);
  text('Audio by DarkShroom on Freesound', 25, 975);
  pop();
}

function mousePressed() {
  //click to start the game
  if (state === 'title') {
    state = 'simulation';
  }

  //click to resume the game once all different fish have been caught
  if (state === 'allFishCaught') {
    state = 'simulation';
  }
}

function simulation() {

  //audio playing
  if (!audio.isPlaying()) {
    audio.setVolume(0.03);
    audio.loop();
  }

  //functions happening during simulation
  display();
  hookMove();
  fish();
  checkBite();

}

function display() {

  //bg image
  imageMode(CENTER);
  image(bgImg, width/2, height/2);

  //main fishing box
  imageMode(CENTER);
  image(fishBgImg, width/2, height/2);

  //user display, it is just the tip of the hook
  //the constraint on the y is on a function of its own (function hookMove) just so that the hook doesn't appear in the title screen
  imageMode(CENTER);
  image(hookImg, hook.x, hook.y);

  //fish1 display
  push();
  imageMode(CENTER);
  //constraining the fish y position so that it does not go too high or low. it is set to 251 so that the fish doesn't naturally swim to 250 which is when it will be considered as caught
  let fishy = constrain (fish1.y, 251, 800);
  image(fishShadowImg, fish1.x, fishy, fish1.size, fish1.size);
  pop();

  //fish2 display
  push();
  imageMode(CENTER);
  let fish2y = constrain (fish2.y, 251, 800);
  image(fishShadowImg, fish2.x, fish2y, fish2.size, fish2.size);
  pop();

  //fish3 display
  push();
  imageMode(CENTER)
  let fish3y = constrain (fish3.y, 251, 800);
  image(fishShadowImg, fish3.x, fish3y, fish3.size, fish3.size);
  pop();

  //fish inventory box
  push();
  noStroke();
  rectMode(CENTER);
  fill(99, 64, 46);
  rect(inventoryBox.x, inventoryBox.y, inventoryBox.width, inventoryBox.height, 0, 30, 30, 0); // the left edges are not rounded so the inventory doesn't poke through the fishing interface bg
  pop();

  //display of each fish box inside the inventory, named after the fish each box represents. each function decides whether the display of the fish box will be greyed out or not depending on if that fish has been caught before

  frogBox();
  catfishBox();
  loachBox();
  perchBox();
  salmonBox();
  carpBox();
  koiBox();
  mutantCarpBox();
  sturgeonBox();
  bassBox();
  crystalBox();
  brokenGlassesBox();
  soggySockBox();
  sodaCanBox();
  treasureChestBox();

  //fish inventory box text
  push();
  textAlign(CENTER);
  textFont('Georgia');
  fill(255, 202, 115);
  textSize(75);
  text('Inventory', inventoryBox.x, 85);
  pop();

  //border of the main fishing box
  imageMode(CENTER);
  image(borderImg, width/2, height/2);

  //score box
  push();
  rectMode(CENTER);
  noStroke();
  rect(scoreBox.x, scoreBox.y, scoreBox.width, scoreBox.height, scoreBox.roundness);
  pop();

  //display score text
  push();
  fill(0);
  textSize(35);
  textFont('Georgia');
  text('Score:', scoreBox.x-120, scoreBox.y+10);
  textAlign(LEFT);
  //number of the score
  text(score, scoreBox.x+15, scoreBox.y+10);
  pop();

  //fish count box
  push();
  rectMode(CENTER);
  noStroke();
  rect(fishCountBox.x, fishCountBox.y, fishCountBox.width, fishCountBox.height, fishCountBox.roundness);
  pop();
  
  //text display
  push();
  fill(0);
  textSize(35);
  textFont('Georgia');
  text('Fish caught:', fishCountBox.x-175, fishCountBox.y+10);
  textAlign(LEFT);
  text(numFish, fishCountBox.x+75, fishCountBox.y+10);
  pop();

}

function hookMove() {
  //movement of the hook/user

  //constrain user y movement to the fishing box
  hook.y = constrain(mouseY, 50, 950);
}

function fish() {

  //movement of each fish

  fish1move()
  fish2move()
  fish3move()

}

function fish1move() {

  //fish1 movement
  fish1.x = fish1.x + fish1.vx;
  fish1.y = fish1.y + fish1.vy;

  //how often the fish will turn left or right
  let swimX = random();
  if(swimX < 0.001) {
    fish1.vx = random(-fish1.speed, fish1.speed);
  }

  //Y movement of the fish1
  let swimY = random();
  //how often the fish will swim up or down
  if (swimY < 0.03) {
    fish1.vy = random(-fish1.speed, fish1.speed);
  }

  // fish will bounce off the edge of the fishing interface if it touches it
  if (fish1.x <= 500 || fish1.x >= 1500) {
    fish1.vx = -fish1.vx;
  }
  if (fish1.y <= 250 || fish1.y >= 800) {
    fish1.vy = -fish1.vy;
  }

  // old movement of the fish where the position resets if it goes offscreen, i kept it commented in case i want to go back to this type of movement

  //fish1 will go offscreen a bit before resetting
  //let reset1 = 1700; //1500 = end of the fish interface + 200 to give it time to reset
  //let reset2 = 300; //500 (beginning of fish interface) - 200 to give it more time to reset

  //if (fish1.x > reset1) {
    //if the fish swims too much to the right, it will respawn on the left
  //  fish1.x = 500;
  //}

  //if(fish1.x < reset2) {
  //  fish1.x = 1600; //if the fish swims too much to the left, it will reset on the right

  //}
  
}

function fish2move() {

  //fish2 movement
  fish2.x = fish2.x + fish2.vx;
  fish2.y = fish2.y + fish2.vy;

  //how often the fish2 will move from left to right
  let swim2x = random();
  if(swim2x < 0.01) {
    fish2.vx = random(-fish2.speed, fish2.speed);
  }

  //how often the fish2 will move up and down
  let swim2y = random();
  if (swim2y < 0.01) {
    fish2.vy = random(-fish2.speed, fish2.speed);
  }

  //fish2 will bounce off the edge of the fishing interface if it touches it
  if (fish2.x <= 500 || fish2.x >= 1500) {
    fish2.vx = -fish2.vx;
  }
  if (fish2.y <= 250 || fish2.y >= 800) {
    fish2.vy = -fish2.vy;
  }

}

function fish3move() {

  //fish3 movement
  fish3.x = fish3.x + fish3.vx;
  fish3.y = fish3.y + fish3.vy;

  //how often the fish3 will move from left to right
  let swim3x = random();
  if(swim3x < 0.005) {
    fish3.vx = random(-fish3.speed, fish3.speed);
  }

  //how often the fish3 will move up and down
  let swim3y = random();
  if (swim3y < 0.02) {
    fish3.vy = random(-fish3.speed, fish3.speed);
  }

  //fish3 will bounce off the edge of the fishing interface if it touches it
  if (fish3.x <= 500 || fish3.x >= 1500) {
    fish3.vx = -fish3.vx;
  }
  if (fish3.y <= 250 || fish3.y >= 800) {
    fish3.vy = -fish3.vy;
  }

}

function checkBite() {

//check if the fish bit the hook, if it does, it will follow the hook
let d1 = dist(hook.x, hook.y, fish1.x, fish1.y);
if (d1 < hook.size + fish1.size/2) {
  fish1.y = hook.y;
  fish1.x = hook.x;
  caughtCheck();
}

let d2 = dist(hook.x, hook.y, fish2.x, fish2.y);
if (d2 < hook.size + fish2.size/2) {
  fish2.y = hook.y;
  fish2.x = hook.x;
  caughtCheck();
}

let d3 = dist(hook.x, hook.y, fish3.x, fish3.y);
if (d3 < hook.size + fish3.size/2) {
  fish3.y = hook.y;
  fish3.x = hook.x;
  caughtCheck();
}

}

function caughtCheck() {
  //check if the fish got caught once it got reeled in (dragged to the top)
  if (fish1.y < 250) {
    //fish will reset
    fish1.x = 500;
    fish1.vy = random(-fish1.speed, fish1.speed)
    fish1.y = random(250, 800);
    chooseFish();
    numFish++
  }

  //same for fish2 and fish3

  if(fish2.y < 250) {
    fish2.x = 1500;
    fish2.vy = random(-fish2.speed, fish2.speed);
    fish2.y = random(250, 800);
    chooseFish();
    numFish++
  }

  if(fish3.y < 250) {
    fish3.x = 1500;
    fish3.vy = random(-fish3.speed, fish3.speed);
    fish3.y = random(250, 800);
    chooseFish();
    numFish++
  }
}


function chooseFish() { 
  
  //the code will decide which fish will bite, each fish/object has a drop rate % out of 100 and is worth a certain amount of score
  //when a fish/object is caught for the first time, it will reveal what it is in the inventory box + keep track of how many of them have been caught

  let i = random(0,100)

  if (i <= 11) {
    score = score+120;
    //perch 11% chance
    perch.caught = true;
    perch.counter++;
	}
	else if (i <= 22 && i > 11) {
    score = score+200;
    bass.caught = true;
    bass.counter++;
    //bass 11% chance
	}
  else if (i <= 32 && i > 22) {
    score = score+100;
    frog.caught = true;
    frog.counter++;
    //frog 10% chance
  }
  else if (i <= 42 && i > 32) {
    score = score+150;
    loach.caught = true;
    loach.counter++;
    //loach 10% chance
  }
  else if(i <= 52 && i > 42) {
    score = score+120;
    carp.caught = true;
    carp.counter++;
    //carp 10% chance
  }
  else if(i <= 61.5 && i > 52) {
    score = score+200;;
    catfish.caught = true;
    catfish.counter++;
    //catfish 9.5% chance
  }
  else if(i <= 69.5 && i > 61.5) {
    score = score+5;
    sodaCan.caught = true;
    sodaCan.counter++;
    //empty soda can 8% chance
  }
  else if(i <= 76.5 && i > 69.5) {
    score = score+5;
    soggySock.caught = true;
    soggySock.counter++;
    //soggy sock 7% chance
  }
  else if(i <= 82.5 && i > 76.5) {
    score = score+500;
    salmon.caught = true;
    salmon.counter++;
    //salmon 6% chance
  }
  else if(i <= 88.5 && i > 82.5) {
    score = score+10;
    brokenGlasses.caught = true;
    brokenGlasses.counter++;
    //broken glasses 6% chance
  }
  else if(i <= 93.5 && i > 88.5) {
    score = score+1000;
    koi.caught = true;
    koi.counter++;
    //koi 5% chance
  }
  else if(i <= 97.5 && i > 93.5) {
    score = score+5000;
    sturgeon.caught = true;
    sturgeon.counter++;
    //sturgeon 4% chance
  }
  else if(i <= 98.5 && i > 97.5) {
    score = score+10000;
    crystal.caught = true;
    crystal.counter++;
    //crystal 1% chance
  }
  else if(i <= 99.5 && i > 98.5) {
    score = score+15000;
    treasureChest.caught = true;
    treasureChest.counter++;
    //treasure chest 1% chance
  }
  else if(i <= 100 && i > 99.5) {
    score = score+30000;
    mutantCarp.caught = true;
    mutantCarp.counter++;
    //mutant carp 0.5% chance
  }
}


function frogBox() {
//display of the frog box if it hasn't been caught yet
 if (frog.caught === false) {
  push();
  rectMode(CENTER);
  fill(99, 64, 46);
  strokeWeight(4);
  stroke(44, 29, 29);
  rect(inventoryFishBox.x, inventoryFishBox.y, inventoryFishBox.width, inventoryFishBox.height, 0, 15, 15, 0);
  pop();
  //display text
  push();
  fill(44, 29, 29);
  textSize(45);
  textAlign(CENTER);
  textFont('Georgia');
  text('???', inventoryFishBox.x, inventoryFishBox.y+15);
  pop();
 }
  else if(frog.caught === true) {
  //display of the frog box if its caught
  push();
  rectMode(CENTER);
  fill(160, 98, 65);
  strokeWeight(4);
  stroke(44, 29, 29);
  rect(inventoryFishBox.x, inventoryFishBox.y, inventoryFishBox.width, inventoryFishBox.height, 0, 15, 15, 0);
  pop();
  //display text
  push();
  fill(255, 202, 115);
  textSize(30);
  textAlign(CENTER);
  textFont('Georgia');
  text('Frog - 100 pts', inventoryFishBox.x-50, inventoryFishBox.y+10);
  text(frog.counter, inventoryFishBox.x+150, inventoryFishBox.y+10);
  pop();
  }

}

//adding +55 to the y position for every rect so that they are one on top of the other
//same thing for frog box but for all the other fish boxes

function catfishBox() {
  
  if (catfish.caught === false) {
  push();
  rectMode(CENTER);
  fill(99, 64, 46);
  strokeWeight(4);
  stroke(44, 29, 29);
  rect(inventoryFishBox.x, inventoryFishBox.y+55, inventoryFishBox.width, inventoryFishBox.height, 0, 15, 15, 0);
  pop();
  //display text
  push();
  fill(44, 29, 29);
  textSize(45);
  textAlign(CENTER);
  textFont('Georgia');
  text('???', inventoryFishBox.x, inventoryFishBox.y+70);
  pop();
  }
  else if(catfish.caught === true) {
  push();
  rectMode(CENTER);
  fill(160, 98, 65);
  strokeWeight(4);
  stroke(44, 29, 29);
  rect(inventoryFishBox.x, inventoryFishBox.y+55, inventoryFishBox.width, inventoryFishBox.height, 0, 15, 15, 0);
  pop();
  //display text
  push();
  fill(255, 202, 115);
  textSize(30);
  textAlign(CENTER);
  textFont('Georgia');
  text('Catfish - 200 pts', inventoryFishBox.x-50, inventoryFishBox.y+65); //15+55 (the +y position)
  text(catfish.counter, inventoryFishBox.x+150, inventoryFishBox.y+65);
  pop();
  }
  
}

function loachBox() {
    
  if (loach.caught === false) {
  push();
  rectMode(CENTER);
  fill(99, 64, 46);
  strokeWeight(4);
  stroke(44, 29, 29);
  rect(inventoryFishBox.x, inventoryFishBox.y+110, inventoryFishBox.width, inventoryFishBox.height, 0, 15, 15, 0);
  pop();
  //display text
  push();
  fill(44, 29, 29);
  textSize(45);
  textAlign(CENTER);
  textFont('Georgia');
  text('???', inventoryFishBox.x, inventoryFishBox.y+125); // 15+55( +y for the box)
  pop();
  }
  else if(loach.caught === true) {
  push();
  rectMode(CENTER);
  fill(160, 98, 65);
  strokeWeight(4);
  stroke(44, 29, 29);
  rect(inventoryFishBox.x, inventoryFishBox.y+110, inventoryFishBox.width, inventoryFishBox.height, 0, 15, 15, 0);
  pop();
  //display text
  push();
  fill(255, 202, 115);
  textSize(30);
  textAlign(CENTER);
  textFont('Georgia');
  text('Loach - 150 pts', inventoryFishBox.x-50, inventoryFishBox.y+120);
  text(loach.counter, inventoryFishBox.x+150, inventoryFishBox.y+120);
  pop();
  }
  
}

function perchBox() {

  if (perch.caught === false) {
  push();
  rectMode(CENTER);
  fill(99, 64, 46);
  strokeWeight(4);
  stroke(44, 29, 29);
  rect(inventoryFishBox.x, inventoryFishBox.y+165, inventoryFishBox.width, inventoryFishBox.height, 0, 15, 15, 0);
  pop();
  //display text
  push();
  fill(44, 29, 29);
  textSize(45);
  textAlign(CENTER);
  textFont('Georgia');
  text('???', inventoryFishBox.x, inventoryFishBox.y+180);
  pop();
  }
  else if (perch.caught === true) {
  push();
  rectMode(CENTER);
  fill(160, 98, 65);
  strokeWeight(4);
  stroke(44, 29, 29);
  rect(inventoryFishBox.x, inventoryFishBox.y+165, inventoryFishBox.width, inventoryFishBox.height, 0, 15, 15, 0);
  pop(); 
  //display text
  push();
  fill(255, 202, 115);
  textSize(30);
  textAlign(CENTER);
  textFont('Georgia');
  text('Perch - 120 pts', inventoryFishBox.x-50, inventoryFishBox.y+175);
  text(perch.counter, inventoryFishBox.x+150, inventoryFishBox.y+175);
  pop();
  }
  
}

function salmonBox() {
    
  if (salmon.caught === false) {
  push();
  rectMode(CENTER);
  fill(99, 64, 46);
  strokeWeight(4);
  stroke(44, 29, 29);
  rect(inventoryFishBox.x, inventoryFishBox.y+220, inventoryFishBox.width, inventoryFishBox.height, 0, 15, 15, 0);
  pop();
  //display text
  push();
  fill(44, 29, 29);
  textSize(45);
  textAlign(CENTER);
  textFont('Georgia');
  text('???', inventoryFishBox.x, inventoryFishBox.y+235);
  pop();
  }
  else if (salmon.caught === true) {
  push();
  rectMode(CENTER);
  fill(160, 98, 65);
  strokeWeight(4);
  stroke(44, 29, 29);
  rect(inventoryFishBox.x, inventoryFishBox.y+220, inventoryFishBox.width, inventoryFishBox.height, 0, 15, 15, 0);
  pop();
  //display text
  push();
  fill(255, 202, 115);
  textSize(30);
  textAlign(CENTER);
  textFont('Georgia');
  text('Salmon - 500 pts', inventoryFishBox.x-50, inventoryFishBox.y+230);
  text(salmon.counter, inventoryFishBox.x+150, inventoryFishBox.y+230);
  pop();
  }
  
}

function carpBox() {
    
  if (carp.caught === false) {
  push();
  rectMode(CENTER);
  fill(99, 64, 46);
  strokeWeight(4);
  stroke(44, 29, 29);
  rect(inventoryFishBox.x, inventoryFishBox.y+275, inventoryFishBox.width, inventoryFishBox.height, 0, 15, 15, 0);
  pop();
  //display text
  push();
  fill(44, 29, 29);
  textSize(45);
  textAlign(CENTER);
  textFont('Georgia');
  text('???', inventoryFishBox.x, inventoryFishBox.y+290);
  pop();
  }
  else if (carp.caught === true) {
  push();
  rectMode(CENTER);
  fill(160, 98, 65);
  strokeWeight(4);
  stroke(44, 29, 29);
  rect(inventoryFishBox.x, inventoryFishBox.y+275, inventoryFishBox.width, inventoryFishBox.height, 0, 15, 15, 0);
  pop();
  //display text
  push();
  fill(255, 202, 115);
  textSize(30);
  textAlign(CENTER);
  textFont('Georgia');
  text('Carp - 120 pts', inventoryFishBox.x-50, inventoryFishBox.y+285);
  text(carp.counter, inventoryFishBox.x+150, inventoryFishBox.y+285);
  pop();
  }
  
}

function koiBox() {
    
  if (koi.caught === false) {
  push();
  rectMode(CENTER);
  fill(99, 64, 46);
  strokeWeight(4);
  stroke(44, 29, 29);
  rect(inventoryFishBox.x, inventoryFishBox.y+330, inventoryFishBox.width, inventoryFishBox.height, 0, 15, 15, 0);
  pop();
  //display text
  push();
  fill(44, 29, 29);
  textSize(45);
  textAlign(CENTER);
  textFont('Georgia');
  text('???', inventoryFishBox.x, inventoryFishBox.y+345);
  pop();
  }
  else if (koi.caught === true) {
  push();
  rectMode(CENTER);
  fill(160, 98, 65);
  strokeWeight(4);
  stroke(44, 29, 29);
  rect(inventoryFishBox.x, inventoryFishBox.y+330, inventoryFishBox.width, inventoryFishBox.height, 0, 15, 15, 0);
  pop();
  //display text
  push();
  fill(255, 202, 115);
  textSize(30);
  textAlign(CENTER);
  textFont('Georgia');
  text('Koi - 1000 pts', inventoryFishBox.x-50, inventoryFishBox.y+340);
  text(koi.counter, inventoryFishBox.x+150, inventoryFishBox.y+340);
  pop();
  }
  
}

function mutantCarpBox() {
      
  if (mutantCarp.caught === false) {
  push();
  rectMode(CENTER);
  fill(99, 64, 46);
  strokeWeight(4);
  stroke(44, 29, 29);
  rect(inventoryFishBox.x, inventoryFishBox.y+385, inventoryFishBox.width, inventoryFishBox.height, 0, 15, 15, 0);
  pop();
  //display text
  push();
  fill(44, 29, 29);
  textSize(45);
  textAlign(CENTER);
  textFont('Georgia');
  text('???', inventoryFishBox.x, inventoryFishBox.y+400);
  pop();
  }
  else if (mutantCarp.caught === true) {
  push();
  rectMode(CENTER);
  fill(160, 98, 65);
  strokeWeight(4);
  stroke(44, 29, 29);
  rect(inventoryFishBox.x, inventoryFishBox.y+385, inventoryFishBox.width, inventoryFishBox.height, 0, 15, 15, 0);
  pop();
  //display text
  push();
  fill(255, 202, 115);
  textSize(20);
  textAlign(CENTER);
  textFont('Georgia');
  text('Mutant Carp - 30 000 pts', inventoryFishBox.x-50, inventoryFishBox.y+395);
  textSize(30);
  text(mutantCarp.counter, inventoryFishBox.x+150, inventoryFishBox.y+395);
  pop();
  }
  
}

function sturgeonBox() {
      
  if (sturgeon.caught === false) {
  push();
  rectMode(CENTER);
  fill(99, 64, 46);
  strokeWeight(4);
  stroke(44, 29, 29);
  rect(inventoryFishBox.x, inventoryFishBox.y+440, inventoryFishBox.width, inventoryFishBox.height, 0, 15, 15, 0);
  pop();
  //display text
  push();
  fill(44, 29, 29);
  textSize(45);
  textAlign(CENTER);
  textFont('Georgia');
  text('???', inventoryFishBox.x, inventoryFishBox.y+455);
  pop();
  }
  else if (sturgeon.caught === true) {
  push();
  rectMode(CENTER);
  fill(160, 98, 65);
  strokeWeight(4);
  stroke(44, 29, 29);
  rect(inventoryFishBox.x, inventoryFishBox.y+440, inventoryFishBox.width, inventoryFishBox.height, 0, 15, 15, 0);
  pop();
  //display text
  push();
  fill(255, 202, 115);
  textSize(30);
  textAlign(CENTER);
  textFont('Georgia');
  text('Sturgeon - 5000 pts', inventoryFishBox.x-50, inventoryFishBox.y+450);
  text(sturgeon.counter, inventoryFishBox.x+150, inventoryFishBox.y+450);
  pop();
  }
  
}

function bassBox() {
      
  if (bass.caught === false) {
  push();
  rectMode(CENTER);
  fill(99, 64, 46);
  strokeWeight(4);
  stroke(44, 29, 29);
  rect(inventoryFishBox.x, inventoryFishBox.y+495, inventoryFishBox.width, inventoryFishBox.height, 0, 15, 15, 0);
  pop();
  //display text
  push();
  fill(44, 29, 29);
  textSize(45);
  textAlign(CENTER);
  textFont('Georgia');
  text('???', inventoryFishBox.x, inventoryFishBox.y+510);
  pop();
  }
  else if (bass.caught === true) {
  push();
  rectMode(CENTER);
  fill(160, 98, 65);
  strokeWeight(4);
  stroke(44, 29, 29);
  rect(inventoryFishBox.x, inventoryFishBox.y+495, inventoryFishBox.width, inventoryFishBox.height, 0, 15, 15, 0);
  pop();
  //display text
  push();
  fill(255, 202, 115);
  textSize(30);
  textAlign(CENTER);
  textFont('Georgia');
  text('Bass - 200 pts', inventoryFishBox.x-50, inventoryFishBox.y+505);
  text(bass.counter, inventoryFishBox.x+150, inventoryFishBox.y+505);
  pop();
  }
  
}

function crystalBox() {
      
  if (crystal.caught === false) {
  push();
  rectMode(CENTER);
  fill(99, 64, 46);
  strokeWeight(4);
  stroke(44, 29, 29);
  rect(inventoryFishBox.x, inventoryFishBox.y+550, inventoryFishBox.width, inventoryFishBox.height, 0, 15, 15, 0);
  pop();
  //display text
  push();
  fill(44, 29, 29);
  textSize(45);
  textAlign(CENTER);
  textFont('Georgia');
  text('???', inventoryFishBox.x, inventoryFishBox.y+565);
  pop();
  }
  else if (crystal.caught === true) {
  push();
  rectMode(CENTER);
  fill(160, 98, 65);
  strokeWeight(4);
  stroke(44, 29, 29);
  rect(inventoryFishBox.x, inventoryFishBox.y+550, inventoryFishBox.width, inventoryFishBox.height, 0, 15, 15, 0);
  pop();
  //display text
  push();
  fill(255, 202, 115);
  textSize(30);
  textAlign(CENTER);
  textFont('Georgia');
  text('Crystal - 10 000 pts', inventoryFishBox.x-50, inventoryFishBox.y+560);
  text(crystal.counter, inventoryFishBox.x+150, inventoryFishBox.y+560);
  pop();
  }
  
}

function brokenGlassesBox() {
      
  if (brokenGlasses.caught === false) {
  push();
  rectMode(CENTER);
  fill(99, 64, 46);
  strokeWeight(4);
  stroke(44, 29, 29);
  rect(inventoryFishBox.x, inventoryFishBox.y+605, inventoryFishBox.width, inventoryFishBox.height, 0, 15, 15, 0);
  pop();
  //display text
  push();
  fill(44, 29, 29);
  textSize(45);
  textAlign(CENTER);
  textFont('Georgia');
  text('???', inventoryFishBox.x, inventoryFishBox.y+620);
  pop();
  }
  else if (brokenGlasses.caught === true) {
  push();
  rectMode(CENTER);
  fill(160, 98, 65);
  strokeWeight(4);
  stroke(44, 29, 29);
  rect(inventoryFishBox.x, inventoryFishBox.y+605, inventoryFishBox.width, inventoryFishBox.height, 0, 15, 15, 0);
  pop();
  //display text
  push();
  fill(255, 202, 115);
  textSize(20);
  textAlign(CENTER);
  textFont('Georgia');
  text('Broken Glasses - 10 pts', inventoryFishBox.x-50, inventoryFishBox.y+615);
  textSize(30);
  text(brokenGlasses.counter, inventoryFishBox.x+150, inventoryFishBox.y+615);
  pop();
  }
  
}

function soggySockBox() {
      
  if (soggySock.caught === false) {
  push();
  rectMode(CENTER);
  fill(99, 64, 46);
  strokeWeight(4);
  stroke(44, 29, 29);
  rect(inventoryFishBox.x, inventoryFishBox.y+660, inventoryFishBox.width, inventoryFishBox.height, 0, 15, 15, 0);
  pop();
  //display text
  push();
  fill(44, 29, 29);
  textSize(45);
  textAlign(CENTER);
  textFont('Georgia');
  text('???', inventoryFishBox.x, inventoryFishBox.y+675);
  pop();
  }
  else if (soggySock.caught === true) {
  push();
  rectMode(CENTER);
  strokeWeight(4);
  stroke(44, 29, 29);
  fill(160, 98, 65);
  rect(inventoryFishBox.x, inventoryFishBox.y+660, inventoryFishBox.width, inventoryFishBox.height, 0, 15, 15, 0);
  pop();
  //display text
  push();
  fill(255, 202, 115);
  textSize(30);
  textAlign(CENTER);
  textFont('Georgia');
  text('Soggy Sock - 5 pts', inventoryFishBox.x-50, inventoryFishBox.y+670);
  text(soggySock.counter, inventoryFishBox.x+150, inventoryFishBox.y+670);
  pop();
  }
  
}

function sodaCanBox() {
      
  if (sodaCan.caught === false) {
  push();
  rectMode(CENTER);
  fill(99, 64, 46);
  strokeWeight(4);
  stroke(44, 29, 29);
  rect(inventoryFishBox.x, inventoryFishBox.y+715, inventoryFishBox.width, inventoryFishBox.height, 0, 15, 15, 0);
  pop();
  //display text
  push();
  fill(44, 29, 29);
  textSize(45);
  textAlign(CENTER);
  textFont('Georgia');
  text('???', inventoryFishBox.x, inventoryFishBox.y+730);
  pop();
  }
  else if (sodaCan.caught === true) {
  push();
  rectMode(CENTER);
  fill(160, 98, 65);
  strokeWeight(4);
  stroke(44, 29, 29);
  rect(inventoryFishBox.x, inventoryFishBox.y+715, inventoryFishBox.width, inventoryFishBox.height, 0, 15, 15, 0);
  pop();
  //display text
  push();
  fill(255, 202, 115);
  textSize(30);
  textAlign(CENTER);
  textFont('Georgia');
  text('Soda Can - 5 pts', inventoryFishBox.x-50, inventoryFishBox.y+725);
  text(sodaCan.counter, inventoryFishBox.x+150, inventoryFishBox.y+725);
  pop();
  }
  
}

function treasureChestBox() {
      
  if (treasureChest.caught === false) {
  push();
  rectMode(CENTER);
  fill(99, 64, 46);
  strokeWeight(4);
  stroke(44, 29, 29);
  rect(inventoryFishBox.x, inventoryFishBox.y+770, inventoryFishBox.width, inventoryFishBox.height, 0, 15, 15, 0);
  pop();
  //display text
  push();
  fill(44, 29, 29);
  textSize(45);
  textAlign(CENTER);
  textFont('Georgia');
  text('???', inventoryFishBox.x, inventoryFishBox.y+785);
  pop();
  }
  else if(treasureChest.caught === true) {
  push();
  rectMode(CENTER);
  fill(160, 98, 65);
  strokeWeight(4);
  stroke(44, 29, 29);
  rect(inventoryFishBox.x, inventoryFishBox.y+770, inventoryFishBox.width, inventoryFishBox.height, 0, 15, 15, 0);
  pop();
  //display text
  push();
  fill(255, 202, 115);
  textSize(20);
  textAlign(CENTER);
  textFont('Georgia');
  text('Treasure Chest - 15 000 pts', inventoryFishBox.x-50, inventoryFishBox.y+780);
  textSize(30);
  text(treasureChest.counter, inventoryFishBox.x+150, inventoryFishBox.y+780);
  pop();
  }
  
}

function checkAllFishCaught() {
  //check if all fish have been caught to execute allFishCaught state
  //i tried getting this ending to see if the code works and was unable to...there's always just one fish that does NOT want to drop, so i actually have no idea if this works or not lol
  if (frog.caught === true && catfish.caught === true && loach.caught === true && perch.caught === true && salmon.caught === true && carp.caught === true && koi.caught === true && mutantCarp.caught === true && sturgeon.caught === true && bass.caught === true && crystal.caught === true && brokenGlasses.caught === true && soggySock.caught === true && sodaCan.caught === true && treasureChest.caught === true) {
    state = 'allFishCaught';
  }
}

function allFishCaught() {

push();
textSize(55);
fill(255);
textAlign(CENTER);
textFont('Georgia');
text('You caught all the fish!', width/2, height/2);
textSize(35);
text('Click to resume game.', width/2, height/2+75);
pop();

}