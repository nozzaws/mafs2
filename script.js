const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 600;
const offsetL = canvas.offsetLeft;
const offsetT = canvas.offsetTop;

let score = 0;
let enemyArray = [];

const amountOfEnemies = 3;
let level = amountOfEnemies


class Enemy {
  constructor(idx) {
    this.idx = idx;
    this.w = 50;
    this.h = this.w;
    this.bounced = 0;
    this.bouncePenalty = false

    // Initial position
    this.x = Math.random() * (canvas.width - this.w)
    this.y = canvas.height - this.h

    // Movement
    this.speedX = (Math.random() - 0.5) * 400;
    this.speedY = 500;
    this.gravity = 1000;
    this.velocityY = (Math.random() * -400) - 600;
    this.color = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 125)})`;
    this.hit = false;
  }

  update(deltaTime) {
    
    //make it heavy yo
    this.velocityY += this.gravity * deltaTime;
    
    // Update position based on velocity/gravity
    this.x += this.speedX * deltaTime;
    this.y += this.velocityY * deltaTime;

    if(this.x + this.w < 0 + this.w || this.x + this.w > canvas.width) this.speedX *= -1
    if(this.y + this.h < 0 + this.h || this.y + this.h > canvas.height){
      this.speedY *= -1
      this.bounced++
      }
    if(this.bounced > 2){
      this.bouncePenalty = true
    }

    // canvas borders and bounce
    if (this.y < 0) {
      this.y = 0;
      this.velocityY *= -0.95; // Dampen the bounce
    } else if (this.y + this.h > canvas.height) {
      this.y = canvas.height - this.h;
      this.velocityY *= -0.95;
    }
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.w, this.h);
    ctx.font = "20px Arial";
    ctx.fillStyle = "Black";
    ctx.fillText(this.bounced, this.x + this.w / 2, this.y + this.h / 2 + 3);
    ctx.fillStyle = "White";
    // ctx.fillText("Hej", this.x + this.w / 2, this.y + this.h / 2);
  }
}
// Initialize enemies
for (let i = 0; i < amountOfEnemies; i++) {
  enemyArray.push(new Enemy(i));
}
function spawn(num) {
  for (let i = 0; i < num; i++) {
    enemyArray.push(new Enemy(i));
  }
}

function updateScore() {
  ctx.font = "30px Arial";
  ctx.fillStyle = "white";
  ctx.fillText(`Score: ${score}`, 10, 40);
}


canvas.addEventListener('click', (e) => {
  const clickX = e.clientX - offsetL;
  const clickY = e.clientY - offsetT;

  for (let i = 0; i < enemyArray.length; i++) {
    const enemy = enemyArray[i];
      if (clickX >= enemy.x &&
        clickX < enemy.x + enemy.w &&
        clickY >= enemy.y &&
        clickY < enemy.y + enemy.h)
      {
        enemy.hit = true;
        score++;
      }
     
    }
});

function checkPenalty(arr){
  for(let i = 0; i<enemyArray.length;i++){
  if(enemyArray[i].bounced){
        score -= enemyArray[i].bounced
      }
    }
  }

let lastTime = 0;

function animate(time) {

  if(enemyArray.length === 0){
    spawn(level + 1)
    level++
  }
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  const deltaTime = time - lastTime;
  lastTime = time;

  // remove amount of bounces left if an object exists from score
  // soooooo if you have killed two on level 1, but miss one you get +2 and -2
  enemyArray = enemyArray.filter((object) => !object.hit && !object.bouncePenalty)
  

  enemyArray.forEach(enemy => {
    enemy.update(deltaTime / 1000);
    enemy.draw();
    
  });
    
  updateScore();
  requestAnimationFrame(animate);
}

animate(0)
