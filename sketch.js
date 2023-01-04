let pendulum

function setup() {
  createCanvas(350, 350);

  pendulum = new Pendulum(width/2, 100, 100, 10, 100, 10)
  
}

function draw() {
  background(150);

  pendulum.update()
  pendulum.draw()
  
}

class Pendulum{
  
  constructor(x, y, r1, m1, r2, m2) {
    
    this.r1 = r1
    this.m1 = m1
    this.theta1 = PI/2
    this.v1 = 0.0
    this.acc1 = 0.0

    this.r2 = r2
    this.m2 = m2
    this.theta2 = PI/2
    this.v2 = 0.0
    this.acc2 = 0.0

    this.origin = createVector(x, y)
    this.pos1 = createVector()
    this.pos2 = createVector()
    
    this.g = 1.50
  }
  
  update() {
    let p1 = -this.g * (2 * this.m1 + this.m2) * sin(this.theta1)
    let p2 = -this.m2 - this.g * sin(this.theta1 - 2 * this.theta2)
    let p3 = -2 * sin(this.theta1 - this.theta2) * this.m2
    let p4 = pow(this.v2 , 2) * this.r2 + pow(this.v1, 2) * this.r1 * cos(this.theta1 - this.theta2)
    let p5 = this.r1 * (2 * this.m1 + this.m2 - this.m2 * cos(2 * this.theta1 - 2 * this.theta2))

    this.acc1 = (p1 + p2 + p3 + p4) / p5
    this.v1 = this.v1 + this.acc1
    this.theta1 = this.theta1 + this.v1 
    
    let pp1 = 2 * sin(this.theta1 - this.theta2)
    let pp2 = pow(this.v1, 2) * this.r1 * (this.m1 + this.m2)
    let pp3 = this.g * (this.m1 + this.m2) * cos(this.theta1)
    let pp4 = pow(this.v2, 2) * this.r2 * this.m2 * cos(this.theta1 - this.theta2)
    let pp5 = this.r2 * (2 * this.m1 + this.m2 - this.m2 * cos(2 * this.theta1 - 2 * this.theta2))
    
    this.acc2 = (pp1 * (pp2 + pp3 + pp4)) / pp5
    this.v2 = this.v2 + this.acc2
    this.theta2 = this.theta2 + this.v2 
    
    this.pos1.set(this.r1 * sin(this.theta1), this.r1 * cos(this.theta1))
    this.pos2.set(this.r2 * sin(this.theta2), this.r2 * cos(this.theta2))
    
    this.pos1.add(this.origin)
    this.pos2.add(this.pos1)
    
  }
  
  draw() {
    line(this.origin.x, this.origin.y, this.pos1.x, this.pos1.y)
    line(this.pos1.x, this.pos1.y, this.pos2.x, this.pos2.y)
    
    circle(this.pos1.x, this.pos1.y, 2 * this.m1)
    circle(this.pos2.x, this.pos2.y, 2 * this.m2)

  }
}