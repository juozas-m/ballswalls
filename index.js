const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d')
const main = document.querySelector('.main')
main.style.backgroundColor = 'black';
let circle = document.querySelector('.circle')
let circle2 = document.querySelector('.circle2')
let ball = document.querySelector('.ball');
let moveBy = 1;

const button = document.querySelector('#button');
const modal = document.querySelector('#modal');

const score1 = document.querySelector('#score1');
const score2 = document.querySelector('#score2');
let s1 = 0;
let s2 = 0;

canvas.width = innerWidth
canvas.height = innerHeight

main.style.width = canvas.width;
main.style.height = canvas.height;

const h1 = document.querySelector('h1');

//disable arrows for user scrolling
window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);


const b = {
    x: canvas.width/2 - 30,
    y: canvas.height/2 - 30,
    w: 60,
    h: 60,
    dx: 4, // speed adjust
    dy: 4, //.
    ani: {},
    move: false
}
ball.style.backgroundColor = 'red';
ball.style.borderRadius = '50%';
ball.style.width = `${b.w}px`;
ball.style.height = `${b.h}px`;
ball.style.position = 'absolute';
ball.style.left = `${b.x}px`;
ball.style.top = `${b.y}px`;
main.append(ball);


h1.addEventListener('click', () => {
    if(!b.move){
        b.ani = requestAnimationFrame(mover)
        b.move = true
    }
    else{
        cancelAnimationFrame(b.ani)
    }
})

let g = canvas.width/2 + 200
let g2 = canvas.height/2

let xp = g
let yp = g2
let xp2 = g - 410
let yp2 = g2

circle.style.backgroundColor = 'yellow';
circle.style.borderRadius = '50%';
circle.style.width = '20px';
circle.style.height = '20px';
main.append(circle);

circle2.style.backgroundColor = 'blue';
circle2.style.borderRadius = '50%';
circle2.style.width = '20px';
circle2.style.height = '20px';
main.append(circle2);



function mover(){
   /* console.log(xp)
    console.log(yp)
    console.log(b.x)
    console.log(b.y)*/
    let dist = Math.hypot((b.x - xp) + (b.w/2 - 10), (b.y - yp) + (b.h/2 - 10)) //reikia adjustint 
    let dist2 = Math.hypot((b.x - xp2) + (b.w/2 - 10), (b.y - yp2) + (b.h/2 - 10))
    /*dist -= ((Math.sqrt(((b.w/2)^2) + ((b.h/2)^2))) - (7.07)) //7.07 mazo ball atstumas nuo ekr. kampo
    dist2 -= ((Math.sqrt(((b.w/2)^2) + ((b.h/2)^2))) - (7.07))*/
    console.log(dist2)
    if(dist <= ((b.w/2) + 10)){ // when dist < ball radiuses
        clearInterval(intervalId)   // stops circles + ball
        cancelAnimationFrame(b.ani) 
        clearInterval(intervalId2)
        b.move = false
        s1 += 1
        score2.innerHTML = s1;
        modal.style.display = 'block';
    }
    if(dist2 <= ((b.w/2) + 10)){ // when dist < ball radiuses
        clearInterval(intervalId)   // stops circles + ball
        cancelAnimationFrame(b.ani)
        clearInterval(intervalId2)
        b.move = false
        s2 += 1;
        score1.innerHTML = s2;
        modal.style.display = 'block';
    }
    if((((b.x) >= (canvas.width - 40/*b.w*/)) /*&& (ind == 1)*/) || (b.x < 0)){
        b.dx *= -1;
        b.w += 20;
        b.h += 20;
        ball.style.width = `${b.w}px`; //
        ball.style.height = `${b.h}px`;
    }
    if((((b.y) >= (canvas.height - 40/*b.h*/)) /*&& (ind == 0)*/) || (b.y < 0)){
        b.dy *= -1;
        b.w += 20;
        b.h += 20;
        ball.style.width = `${b.w}px`;
        ball.style.height = `${b.h}px`;
    }
    b.x += b.dx
    b.y += b.dy

    ball.style.left = `${b.x}px`;
    ball.style.top = `${b.y}px`;

    if(b.move){
        b.ani = requestAnimationFrame(mover)
    }
}

window.addEventListener('load', () =>{
    circle.style.position = 'absolute'
    circle.style.left = `${g + 400}px`;
    circle.style.top = `${g2}px`;

})
g -= 410
window.addEventListener('load', () =>{
    circle2.style.position = 'absolute'
    circle2.style.left = `${g}px`;
    circle2.style.top = `${g2}px`;

})



button.addEventListener('click', () => {
    
    g = canvas.width/2 + 200

    circle.style.position = 'absolute'
    circle.style.left = `${g}px`;
    circle.style.top = `${g2}px`;

    g -= 410

    circle2.style.position = 'absolute'
    circle2.style.left = `${g}px`;
    circle2.style.top = `${g2}px`;

    xp = g + 410;
    yp = g2;
    xp2 = g;
    yp2 = g2;

    b.x = canvas.width/2 - 30;
    b.y = canvas.height/2 - 30;
    b.w = 60;
    b.h = 60;
    b.ani = {};
    b.move = false;

    ball.style.width = `${b.w}px`;
    ball.style.height = `${b.h}px`;
    ball.style.left = `${b.x}px`;
    ball.style.top = `${b.y}px`;
    ball.style.position = 'absolute';
    main.append(ball);

    modal.style.display = 'none';

    if(!b.move){
        b.ani = requestAnimationFrame(mover)
        b.move = true
    }
    else{
        cancelAnimationFrame(b.ani)
    }
})


let intervalId
let intervalId2

window.addEventListener('keydown', (e) =>{
    switch(e.keyCode){
        case 37:
            clearInterval(intervalId);
            intervalId = setInterval(() =>{
                if(parseInt(circle.style.left) - moveBy >= 0){
                    xp -= moveBy;
                    circle.style.left = parseInt(circle.style.left) - moveBy + 'px';
                }
                else{
                    clearInterval(intervalId);
                }
            }, 3)
            break;
        case 39:
            clearInterval(intervalId);
            intervalId = setInterval(() =>{
                if(parseInt(circle.style.left) + moveBy <= canvas.width - 20){
                    xp += moveBy;
                    circle.style.left = parseInt(circle.style.left) + moveBy + 'px';
                }
                else{
                    clearInterval(intervalId);
                }
            }, 3)
            break;
        case 38:
            clearInterval(intervalId);
            intervalId = setInterval(() =>{
                if(parseInt(circle.style.top) - moveBy >= 0){
                    yp -= moveBy;
                    circle.style.top = parseInt(circle.style.top) - moveBy + 'px';
                }
                else{
                    clearInterval(intervalId);
                }
            }, 3)
            break;
        case 40:
            clearInterval(intervalId);
            intervalId = setInterval(() =>{
                if(parseInt(circle.style.top) + moveBy <= canvas.height - 20){
                    yp += moveBy;
                    circle.style.top = parseInt(circle.style.top) + moveBy + 'px';
                }
                else{
                    clearInterval(intervalId);
                }
            }, 3)
            break;
    }
})


window.addEventListener('keydown', (e) =>{
    switch(e.keyCode){
        case 65:
            clearInterval(intervalId2);
            intervalId2 = setInterval(() =>{
                if(parseInt(circle2.style.left) - moveBy >= 0){
                    xp2 -= moveBy;
                    circle2.style.left = parseInt(circle2.style.left) - moveBy + 'px';
                }
                else{
                    clearInterval(intervalId2);
                }
            }, 3)
            break;
        case 68:
            clearInterval(intervalId2);
            intervalId2 = setInterval(() =>{
                if(parseInt(circle2.style.left) + moveBy <= canvas.width - 20){
                    xp2 += moveBy;
                    circle2.style.left = parseInt(circle2.style.left) + moveBy + 'px';
                }
                else{
                    clearInterval(intervalId2);
                }
            }, 3)
            break;
        case 87:
            clearInterval(intervalId2);
            intervalId2 = setInterval(() =>{
                if(parseInt(circle2.style.top) - moveBy >= 0){
                    yp2 -= moveBy;
                    circle2.style.top = parseInt(circle2.style.top) - moveBy + 'px';
                }
                else{
                    clearInterval(intervalId2);
                }
            }, 3)
            break;
        case 83:
            clearInterval(intervalId2);
            intervalId2 = setInterval(() =>{
                if(parseInt(circle2.style.top) + moveBy <= canvas.height - 20){
                    yp2 += moveBy;
                    circle2.style.top = parseInt(circle2.style.top) + moveBy + 'px';
                }
                else{
                    clearInterval(intervalId2);
                }
            }, 3)
            break;
    }
})
