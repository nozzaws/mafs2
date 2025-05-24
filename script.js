/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('myCanvas')
const ctx = canvas.getContext('2d')
CANVAS_WIDTH = canvas.width = 800;
CANVAS_HEIGHT = canvas.height = 600;
let offsetL = canvas.offsetLeft
let offsetT = canvas.offsetTop

let enemyArray = [];
const amountOfEnemies = 25;
let newAr = []



class Enemy{
    constructor(IDX){
        this.idx = IDX
        this.text = "Text"
        this.h = 50;
        this.w = 50;
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
        ctx.fillStyle = "Black"
        ctx.fillText("Hej", this.x+this.w/2, this.y+this.h/2+3)
        ctx.fillStyle = "White"
        ctx.fillText("Hej", this.x+this.w/2, this.y+this.h/2)
        
    }

}

for(let i = 0; i<amountOfEnemies;i++){
    enemyArray.push(new Enemy(i));
}



function youWon(){
    return
}

function spawn(){
    console.log('spawning...')
    enemyArray.push(new Enemy());
}

let timeLapsed = 0
let deltaTime = 0;
let timeSinceLastClick = 0    

canvas.addEventListener('click', (e) => {
    const clickX = e.clientX - offsetL
    const clickY = e.clientY - offsetT

    for(let i = 0; i<enemyArray.length;i++){
        let enemyX = enemyArray[i].x
        let enemyY = enemyArray[i].y
        if(clickX >= enemyX && clickX < enemyX + enemyArray[i].w && clickY >= enemyY && clickY < enemyY + enemyArray[i].h ) {
            enemyArray[i].hit = true
            console.log('You hit enemy : ' + enemyArray[i].idx)
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

function animate(timelapsed) {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    deltaTime += timeLapsed - deltaTime
    timeSinceLastClick = deltaTime
    enemyArray = enemyArray.filter(object => !object.hit)
    // console.log(newAr)

    enemyArray.forEach(enemy => {
        enemy.update(timelapsed);
        enemy.draw();
    });


    // console.log(timeSinceLastClick)



    requestAnimationFrame(animate);

}
animate(0)


