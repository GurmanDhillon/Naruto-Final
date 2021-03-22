var naruto, narutoimg;
var ita,itaimg,mad,madimg,kab,kabimg,tob,tobimg,oro,oroimg,kim,kimimg;
var bg,bgimg;
var gameover,gameoverimg,start,startimg,restart,restartimg;
var logo,logoimg;
var gameState = PLAY;
var PLAY = 1;
var END = 0;
var score = 0;
var obs,obsgroup;
var rasegan,rasegroup,raseganimg;
var ground; 

function preload(){
narutoimg = loadImage("Naruto1.png",);
itaimg = loadImage("Itachi.png");
madimg = loadImage("Madara.png");
kabimg = loadImage("Kabuto.png");
tobimg = loadImage("Tobi2.png");
oroimg = loadImage("Oro.png");
kimimg = loadImage("Kim.png");
bgimg = loadImage("bg.jpg");
gameoverimg = loadImage("gameover.png");
startimg = loadImage("Start2.png");
restartimg = loadImage("restart.png");
logoimg = loadImage("Logo.png");
rasenganimg = loadImage("Rasengan.png");
}

function setup(){
createCanvas(windowWidth,windowHeight);
bg = createSprite(0,0,windowWidth,windowHeight);
bg.addImage(bgimg);
bg.scale = 1.4;
bg.x = bg.width/2;
//bg.velocityX = -9;

naruto = createSprite(165,720,35,50);
naruto.addImage(narutoimg);
naruto.scale = 1.2;
naruto.setCollider("circle",0,0,70);
naruto.debug = false;

ground = createSprite(width/2,750,windowWidth,10);
ground.visible = true;

logo = createSprite(width/2,height/2-100,40,40);
logo.addImage(logoimg);
logo.scale = 0.7;

start = createSprite(width/2,560,45,40);
start.addImage(startimg);
start.scale = 0.2;

gameover = createSprite(width/2,height/2,45,50);
gameover.addImage(gameoverimg);
gameover.scale = 1.5;
gameover.visible = false;

restart = createSprite(width/2,560,45,40);
restart.addImage(restartimg);
restart.scale = 0.7;
restart.visible = false;

obsgroup = new Group();

score = 0;


}


function draw(){
if (touches.length>0||mousePressedOver(start)){
touches = [];
gameState = PLAY;
start.visible = false;
logo.visible = false;
naruto.velocityY = -20;
}

if(gameState === PLAY){
bg.velocityX = -9;
score = score + Math.round(getFrameRate()/60);

if(bg.x<0){
bg.x = bg.width/2;    
}

if(touches.length>0||keyDown("space")&& naruto.y>=400){
naruto.velocityY = -20;
touches = []; 
}
naruto.velocityY = naruto.velocityY +2.1;
//if (keyWentDown("f")){
//rasenagn = createSprite(170,720,20,40);
//rasengan.addImage(rasenganimg);
//rasengan.velocityX = 5;

//}
if(naruto.isTouching(obsgroup)){
gameState = END;
}

enemy();

}
else if(gameState === END){
gameover.visible = true;
restart.visible = true;
naruto.velocityX = 0;
naruto.velocityY = 0;
obsgroup.setVelocityXEach();
obsgroup.setVelocityYEach();  
obsgroup.destroyEach();
naruto.x = 165;
naruto.y = 730;
bg.velocityX = 0;
}

if (touches.length>0||mousePressedOver(restart)){
reset();
touches = [];    

}
naruto.collide(ground);
drawSprites();
textSize(25);
textStyle(BOLD);
fill("black");
text("SCORE: "+score,windowWidth-250,50);

}
function reset(){
gameState = PLAY;
gameover.visible = false;
restart.visible = false;
score = 0;
obsgroup.destroyEach();
naruto.x = 165;
naruto.y = 750;
}

    function enemy(){
if(frameCount%60 === 0){
var obs = createSprite(windowWidth,650,45,70);
obs.velocityX = -9;
var rand = Math.round(random(1,6));
switch(rand){
case 1: obs.addImage(itaimg);
obs.scale = 0.3;
break;
case 2: obs.addImage(madimg);
obs.scale = 0.4;
break;
case 3: obs.addImage(kabimg);
obs.scale = 0.5;
break;
case 4: obs.addImage(tobimg);
obs.scale = 1.0;
break;
case 5: obs.addImage(oroimg);
obs.scale = 0.3;
break;
obs.scale = 0.4;
break;
case 6: obs.addImage(kimimg);
obs.scale = 0.4;
break;
default:break;
}  
obs.lifetime = 160;
obsgroup.add(obs);
}
    

}