/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('myCanvas')
const ctx = canvas.getContext('2d')
CANVAS_WIDTH = canvas.width = 800;
CANVAS_HEIGHT = canvas.height = 600;


let centerCanvasPosition = function(canvas){
  canvas.style.left = window.innerWidth / 2 - canvas.width / 2 + 'px';
  canvas.style.top =window.innerHeight / 2 - canvas.height / 2 + 'px';
};
 
ctx.fillStyle='black';
ctx.fillRect(0,0,canvas.width,canvas.height);
 
// center canvas for starters
centerCanvasPosition(canvas);
// and on every resize
window.addEventListener('resize',function(){
    centerCanvasPosition(canvas);
});


let offsetL = canvas.offsetLeft
let offsetT = canvas.offsetTop

let enemyArray = [];
const amountOfEnemies = 7;
let newAr = []
let score = 0;


class Enemy{
    constructor(IDX){
        this.idx = IDX
        this.text = "Text"
        this.h = 100;
        this.w = this.h;
        this.x = Math.random() * (canvas.width - this.w);
        this.y = Math.random() * (canvas.height - this.h);
        this.speedx = Math.random() * 2 - 1;
        this.speedy = Math.random() * 2 - 1;
        this.color = `rgb(${Math.random()}, ${Math.random() * 255}, ${Math.random()*125})`
        this.id = Math.floor(Math.random()*1000)
        this.hit = false
        
    }

    update(delta){
        this.x-= Math.sin(this.speedx * delta/50)
        if(this.x + this.w < 0 + this.w || this.x + this.w > canvas.width) this.speedx *= -1
        this.y-= this.speedy
        if(this.y + this.h < 0 + this.h || this.y + this.h > canvas.height) this.speedy *= -1
    }
    
    draw(){
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.w, this.h);


        //text in box rn
        ctx.font = "50px Arial";
        ctx.fillStyle = "Black"
        ctx.fillText("Hej", this.x+this.w/2, this.y+this.h/2+3)
        ctx.fillStyle = "White"
        ctx.fillText("Hej", this.x+this.w/2, this.y+this.h/2)
        
    }

}

function updateScore(){
    ctx.font = "50px Arial";
    ctx.fillText(`${score}`,10,80)
}


for(let i = 0; i<amountOfEnemies;i++){
    enemyArray.push(new Enemy(i));
}


function spawn(num){
    // console.log('spawning...')
    for(let i =0 ; i < num; i++){
        enemyArray.push(new Enemy(i));
    }
}

canvas.addEventListener('click', (e) => {
    const clickX = e.clientX - offsetL
    const clickY = e.clientY - offsetT

    for(let i = 0; i<enemyArray.length;i++){
        let enemyX = enemyArray[i].x
        let enemyY = enemyArray[i].y
        if(clickX >= enemyX && clickX < enemyX + enemyArray[i].w && clickY >= enemyY && clickY < enemyY + enemyArray[i].h ) {
        enemyArray[i].hit = true
        score++
        break;
        // console.log('You hit enemy : ' + enemyArray[i].idx)
         
    
        }
    }


    // enemyArray.forEach(enemy => {
    //     if(clickX >= enemy.x && clickX < enemy.x + enemy.w &&
    //     clickY >= enemy.y && clickY < enemy.y + enemy.h ) {
    //         enemy.hit = true
    //         timeSinceLastClick = 0;
    //         afterClick = enemyArray.length
    //     }

    // });

    

});




const reload = () => {
    spawn(5);
}


function animate(timeStamp) {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    enemyArray = enemyArray.filter((object) => !object.hit)

    
    enemyArray.forEach(enemy => {
        enemy.update(timeStamp);
        enemy.draw();
    });

    if(enemyArray.length === 0) reload();
    updateScore()
    requestAnimationFrame(animate);

}
animate(0)

