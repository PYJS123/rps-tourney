let boids=[];
let velLim=5;
let colourKey;
let diam=50;
let types=['r', 'p', 's'];
let endAlpha=0;
let rck, ppr, scs;

function preload() {
  rck=loadImage("assets/rock.png");
  ppr=loadImage("assets/paper.png");
  scs=loadImage("assets/scissors.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // colourKey={
  //   r: color(169, 209, 219),       // blue
  //   p: color(227, 219, 218),       // grey
  //   s: color(237, 51, 14)          // red
  // };
  
  imageMode(CENTER);
  
  for (let i=0; i<50; i++) {
    let type=random(types);
    boids.push(new Boid(type, random(width), random(height), random(-velLim, velLim), random(-velLim, velLim)));
  }
  
  textAlign(CENTER, CENTER);
  textSize(100);
}

function draw() {
  background(170, 189, 145);
  let census={r: 0, p: 0, s: 0};
  
  for (let i=0; i<boids.length; i++) {
    boids[i].display();
    boids[i].updatePos();
    
    census[boids[i].type]+=1;
    
    for (let j=i+1; j<boids.length; j++) {
      d=boids[i].pos.dist(boids[j].pos);
      if (d<=diam && boids[i].cooldown<0 && boids[j].cooldown<0 && boids[i].type!=boids[j].type) {
        boids[i].vel=createVector(random(-velLim, velLim), random(-velLim, velLim));
        boids[j].vel=createVector(random(-velLim, velLim), random(-velLim, velLim));
        boids[i].cooldown=50;
        boids[j].cooldown=50;
        
        winner=findWinner(boids[i], boids[j]);
        boids[i].setType(winner);
        boids[j].setType(winner);
      }
    }
  }
  
  if ([census.r+census.p, census.p+census.s, census.r+census.s].includes(0)) {
    if (census.r>0) finWinner='Rock';
    else if (census.p>0) finWinner='Paper';
    else finWinner='Scissors';
    
    fill(255, 255, 255, min(endAlpha, 255)*150/255);
    rect(0, 0, width, height);
    
    fill(0, 0, 0, endAlpha);
    text(`${finWinner} wins`, width/2, height/2);
    endAlpha+=2;
  }
}

function findWinner(boid1, boid2) {
  // output type- 'r', 'p' or 's'
  let b1=types.findIndex((inp)=>{return inp==boid1.type});
  let b2=types.findIndex((inp)=>{return inp==boid2.type});
  
  let diff=b1-b2; // -2, 0, 1: b1 wins. -1, 2: b2 wins.
  if ([-2, 0, 1].includes(diff)) {
    return boid1.type;
  } else {
    return boid2.type;
  }
}
