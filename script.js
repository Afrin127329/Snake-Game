// defining the constants 
const gameBoard = document.getElementById('gameBoard');

// defining the variables
let snakeDirection = {x: 0, y:0};
let snakeHeadPosition = {x: 23, y:24};
let snakeArray = [
    {x: 13, y: 14}
]
let lastUpdatedTime = 0;
let snakeSpeed = 5;


// function that executes after a predefined time period
const main = (currentTime)=>{
window.requestAnimationFrame(main);
if((currentTime - lastUpdatedTime)/1000 < 1/snakeSpeed){
    return;
}
lastUpdatedTime = currentTime;
gameRender();

}

// if game over
const isCollided = (snake)=>{
    // if the snake is bumped into herself
    for (let i = 1; i < snakeArray.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // if collided with the wall
    if(snake[0].x >= 30 || snake[0].x <= 0 || snake[0].y >= 30 || snake[0].y <= 0){
        return true;
    }

        return false
}




// function to start the game
window.requestAnimationFrame(main);

// function to update snakes position and displaying food on random position
const gameRender = () => {

    // if the snake is collided 
    if(isCollided(snakeArray)){
        snakeDirection = {x:0, y:0}
        alert('Oops.... You Lost!');
        snakeArray = [
            {x: 13, y: 14}
        ];
    }
    // 1. update snakes position after eating the food
    if(snakeArray[0].x === snakeHeadPosition.x && snakeArray[0].y === snakeHeadPosition.y){
        snakeArray.unshift({x: snakeArray[0].x + snakeDirection.x, y: snakeArray[0].y + snakeDirection.y});
        let a = 2;
        let b = 16;
        snakeHeadPosition = {x: Math.round(a + (b-a)*Math.random()), y: Math.round(a+(b-a)*Math.random())};
        console.log(snakeArray)
    }

    // 2. Moving the Snake
    for (let i = snakeArray.length-2; i >= 0; i--){
        snakeArray[i+1] = {...snakeArray[i]};
    }
    snakeArray[0].x += snakeDirection.x;
    snakeArray[0].y += snakeDirection.y;

    // 3. Display the snake
    gameBoard.innerHTML = '';
    snakeArray.forEach((e, index)=>{
        let snakeBody = document.createElement('div');
        snakeBody.style.gridRowStart = e.y;
        snakeBody.style.gridColumnStart = e.x;
        gameBoard.appendChild(snakeBody);

        if(index === 0){
        snakeBody.classList.add('snakeBody');
        }
        else{
            snakeBody.classList.add('snakeHead')
        }
    })
    // Display the food
    let snakeFood = document.createElement('div');
    snakeFood.style.gridRowStart = snakeHeadPosition.y;
    snakeFood.style.gridColumnStart = snakeHeadPosition.x;
    snakeFood.classList.add('snakeFood')
    gameBoard.appendChild(snakeFood);
}

// funtion to define snake's postion

// function to move the snake
document.addEventListener('keydown', (e)=>{
    snakeDirection = {x:0, y:1};
    switch (e.key) {
        case 'ArrowUp':
            snakeDirection.x = 0;
            snakeDirection.y = -1; 
            break;
        case 'ArrowDown':
            snakeDirection.x = 0;
            snakeDirection.y = 1; 
            break;
        case 'ArrowLeft':
            snakeDirection.x = -1;
            snakeDirection.y = 0; 
            break;
        case 'ArrowRight':
            snakeDirection.x = 1;
            snakeDirection.y = 0; 
            break;
    
        default:
            break;
    }
})