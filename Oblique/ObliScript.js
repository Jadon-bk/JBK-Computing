const canvas = document.getElementById("surface");
const ctx = canvas.getContext("2d");
canvas.width = 0.93*window.innerWidth;

let collide = false;
let dt = 0.1

class Ball{
  constructor(x, y, r, colour, mass, vx, vy){
    this.x = x;
    this.y = y;
    this.r = r;
    this.colour = colour;
    this.mass = mass;
    this.vx = vx;
    this.vy = vy;
  }
  draw(){

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, 2*Math.PI);
    ctx.fillStyle = this.colour;
    ctx.fill();
  }
  updateX(newX){
    this.x = newX;
  }
  updateY(newY){
    this.y = newY;
  }
  updateVx(newVx){
    this.vx = newVx;
  }
  updateVy(newVy){
    this.vy = newVy;
  }
}

let ball1 = new Ball(canvas.width/2-500, canvas.height/2, 50, "yellow", 25, 5, 0);
let ball2 = new Ball(canvas.width/2, canvas.height/2, 50, "red", 25, 0, 0);
let ball3 = new Ball(canvas.width/2+200, canvas.height/2-50, 50, "red", 25, 0, 0);
let ball4 = new Ball(canvas.width/2, canvas.height/2-120, 50, "yellow", 25, 0, 0);

let gameloop = setInterval(move, 1);

function move(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  sim(ball1);
  detect(ball1);
  sim(ball2);
  detect(ball2);
  sim(ball3);
  detect(ball3);
  sim(ball4);
  detect(ball4);
}

function sim(ball){
  
  if ((ball.y+ball.r > canvas.height) && (ball.vy>0)){
    ball.updateVy(-ball.vy*.9);
  } else if ((ball.y-ball.r <= 0) && (ball.vy<0)){
    ball.updateVy(-ball.vy*.9);
  }
  if ((ball.x+ball.r >= canvas.width) && (ball.vx>0)){
    ball.updateVx(-ball.vx*.9);
  }
  if ((ball.x-ball.r <= 0) && (ball.vx<0)){
    ball.updateVx(-ball.vx*.9);
  }
  
  ball.updateX(ball.x+ball.vx);
  ball.updateY(ball.y+ball.vy);
  ball.draw();
}


function detect(ball){
  r1 = (((ball1.x+ball1.vx)-(ball.x+ball.vx))**2+((ball1.y+ball1.vy)-(ball.y+ball.vy))**2)**0.5
  r2 = (((ball2.x+ball2.vx)-(ball.x+ball.vx))**2+((ball2.y+ball2.vy)-(ball.y+ball.vy))**2)**0.5
  r3 = (((ball3.x+ball3.vx)-(ball.x+ball.vx))**2+((ball3.y+ball3.vy)-(ball.y+ball.vy))**2)**0.5
  r4 = (((ball4.x+ball4.vx)-(ball.x+ball.vx))**2+((ball4.y+ball4.vy)-(ball.y+ball.vy))**2)**0.5

  console.log(r1);
  
  if ((r1<ball1.r+ball.r) && (r1>0)){
    Collision(ball, ball1);
    // ball1.updateVx(0);
    // ball1.updateVy(0);
    
    collide = true;
  } else if ((r2<ball2.r+ball.r) && (r2>0)){
    Collision(ball, ball2);
    // ball2.updateVx(0);
    // ball2.updateVy(0);
    // ball2.updateX(0);
    // ball2.updateY(canvas.height);
    collide = true;
  } else if ((r3<ball3.r+ball.r) && (r3>0)){
    Collision(ball, ball3);
    // ball3.updateVx(0);
    // ball3.updateVy(0);
    // ball3.updateX(canvas.width);
    // ball3.updateY(0);
    collide = true;
  } else if ((r4<ball4.r+ball.r) && (r4>0)){
    Collision(ball, ball4);
    // ball4.updateVx(0);
    // ball4.updateVy(0);
    // ball4.updateX(canvas.width);
    // ball4.updateY(canvas.height);
    collide = true;
  }
  collide = false;
}

function Dot(A, unit_x, unit_y){
  let product = A.vx*unit_x + A.vy*unit_y
  return product
}

function Collision(A_ball, B_ball){
  //Line of centres calc\\
  let Xvec = A_ball.x-B_ball.x;
  let Yvec = A_ball.y-B_ball.y;
  let r = A_ball.r+B_ball.r;
  let unit_x = Xvec/r;
  let unit_y = Yvec/r;

  //Calculating Angle of line of centres to horizontal
  let theta = Math.atan(Yvec/Xvec);
  
  //Calculating parallel velocity
  let A_Dot = Dot(A_ball, unit_x, unit_y);
  
  let A_ParaVx = A_Dot*unit_x;
  let A_ParaVy = A_Dot*unit_y;
  let A_ParaV = (A_ParaVx**2+A_ParaVy**2)**0.5
  
  let B_Dot = Dot(B_ball, unit_x, unit_y);
  
  let B_ParaVx = B_Dot*unit_x;
  let B_ParaVy = B_Dot*unit_y;
  let B_ParaV = (B_ParaVx**2+B_ParaVy**2)**0.5

  let A_v = (1.9*B_ball.mass*B_ParaV+A_ball.mass*A_ParaV-0.9*B_ball.mass*A_ParaV)/(A_ball.mass+B_ball.mass);
  
  let B_v = -(1.9*A_ball.mass*A_ParaV+B_ball.mass*B_ParaV-0.9*A_ball.mass*B_ParaV)/(B_ball.mass+A_ball.mass);

  let A_vy = A_v*Math.sin(theta);
  let A_vx = A_v*Math.cos(theta);
  let B_vy = B_v*Math.sin(theta);
  let B_vx = B_v*Math.cos(theta);

  A_ball.updateVx(A_ball.vx+A_vx-A_ParaVx);
  A_ball.updateVy(A_ball.vy+A_vy-A_ParaVy);
  B_ball.updateVx(B_ball.vx+B_vx-B_ParaVx);
  B_ball.updateVy(B_ball.vy+B_vy-B_ParaVy);
 
}