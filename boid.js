class Boid {
  constructor(type, posx, posy, velx, vely) {
    this.type=type;
    this.pos=createVector(posx, posy);
    this.vel=createVector(velx, vely);
    this.cooldown=0; // for no re-bounces
  }
  
  updatePos() {
    this.pos.add(this.vel);
    if (this.pos.x<0 || this.pos.x>width) {
      this.vel.x*=-1;
    }
    if (this.pos.y<0 || this.pos.y>height) {
      this.vel.y*=-1;
    }
    this.cooldown--;
  }
  
  setType(newType) {
    this.type=newType;
  }
  
  display() {
    // fill(colourKey[this.type]);
    // circle(this.pos.x, this.pos.y, diam);
    if (this.type=='r') {
      let mult=diam/rck.height
      image(rck, this.pos.x, this.pos.y, mult*rck.width, diam);
    } else if (this.type=='p') {
      let mult=diam/ppr.height
      image(ppr, this.pos.x, this.pos.y, mult*ppr.width, diam);
    } else {
      let mult=diam/scs.height
      image(scs, this.pos.x, this.pos.y, mult*scs.width, diam);
    }
  }
}
