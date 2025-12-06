const board = document.querySelector('.board')
const startBtn = document.getElementById('start-btn')
const restart = document.getElementById('Restart-btn')
const blockWidth = 20
const blockHeight = 20
let intervalNo = null
const col = Math.floor(board.clientWidth/blockWidth)
const row = Math.floor(board.clientHeight/blockHeight)
let blocks = {}
const scoreEl = document.getElementById('score')
const highScoreEl = document.getElementById('highscore')
const timeEl = document.getElementById('time')
let startTime = Date.now()
let food = {x: Math.floor(Math.random() * col), y: Math.floor(Math.random() * row)}
const snake = [
    {x: 5, y: 7}
]
let direction = 'right'
let score = 0
let highScore = 0

function startfun() {
    
    document.querySelector('.model').style.display = 'none'
    intervalNo = setInterval(() => {
        const elapsedTime = Date.now() - startTime
        const hours = String(Math.floor(elapsedTime / 3600000)).padStart(2, '0')
        const minutes = String(Math.floor((elapsedTime % 3600000) / 60000)).padStart(2, '0')
        const seconds = String(Math.floor((elapsedTime % 60000) / 1000)).padStart(2, '0')
        timeEl.textContent = `${hours} : ${minutes} : ${seconds}`
    }, 100);

    game()

}


startBtn.addEventListener('click', () => {
    startfun()
})


function resetGame() {
    clearInterval(intervalNo);
    board.innerHTML = '';
    blocks = {};
    snake.length = 0;
    snake.push({x: 5, y: 7});
    direction = 'right';
    food = {x: Math.floor(Math.random() * col), y: Math.floor(Math.random() * row)};
    startTime = Date.now();
    score = 0;
    highScore =localStorage.getItem('highScore') || 0
    scoreEl.textContent = score; 
    highScoreEl.textContent = highScore;
    game();
}

restart.addEventListener('click', () => {
    document.querySelector('.model-re').style.display = 'none';
    resetGame();
});



function game() {
    

for (let rows = 0; rows < row ; rows++) {
    for (let cols = 0; cols < col; cols++) {
        const block= document.createElement('div')
        block.classList.add('block')
        board.appendChild(block)  
        blocks[`${cols}-${rows}`] = block
    }
    
}
addEventListener('keydown', (e) => {
    if(e.key === 'ArrowUp'){
        direction = 'up'
    } else if(e.key === 'ArrowDown'){
        direction = 'down'
    } else if(e.key === 'ArrowLeft'){
        direction = 'left'
    } else if(e.key === 'ArrowRight'){
        direction = 'right'
    }
})

function drawSnake() {
     let head = null;

     blocks[`${food.x}-${food.y}`].classList.add('food')



     
    if(direction === 'up') {
         head = {x: snake[0].x, y: snake[0].y-1}}
    else if(direction === 'down') {
         head = {x: snake[0].x, y: snake[0].y+1}}
    else if(direction === 'left') {
         head = {x: snake[0].x-1, y: snake[0].y}}
    else if(direction === 'right') {
         head = {x: snake[0].x+1, y: snake[0].y}}
    else{
        head = {x: snake[0].x, y: snake[0].y}
    }
        if(snake[0].x === food.x && snake[0].y === food.y){
        blocks[`${food.x}-${food.y}`].classList.remove('food')
        food = {x: Math.floor(Math.random() * col), y: Math.floor(Math.random() * row)}
        snake.unshift(head)
        score++;
        scoreEl.textContent = score;
        if(score > highScore){
            highScore = score
            localStorage.setItem('highScore', highScore.toString())
            // highScoreEl.textContent = highScore;
        }
    }

    if (head.x<0 || head.x>=col || head.y<0 || head.y>=row) {
        clearInterval(intervalNo);
        document.querySelector('.model-re').style.display = 'flex'

    }

    snake.forEach(segment => {
        console.log(segment);
        blocks[`${segment.x}-${segment.y}`].classList.remove('snake')
        
    });
    snake.unshift(head)
    snake.pop()
    snake.forEach(segment => {
        console.log(segment);
        blocks[`${segment.x}-${segment.y}`].classList.add('snake')
        
    });
}

intervalNo = setInterval(() => {
    drawSnake()
}, 100);
    
}


// for (let rows = 0; rows < row ; rows++) {
//     for (let cols = 0; cols < col; cols++) {
//         const block= document.createElement('div')
//         block.classList.add('block')
//         board.appendChild(block)  
//         blocks[`${cols}-${rows}`] = block
//     }
    
// }
// addEventListener('keydown', (e) => {
//     if(e.key === 'ArrowUp'){
//         direction = 'up'
//     } else if(e.key === 'ArrowDown'){
//         direction = 'down'
//     } else if(e.key === 'ArrowLeft'){
//         direction = 'left'
//     } else if(e.key === 'ArrowRight'){
//         direction = 'right'
//     }
// })

// function drawSnake() {
//      let head = null;

//      blocks[`${food.x}-${food.y}`].classList.add('food')



     
//     if(direction === 'up') {
//          head = {x: snake[0].x, y: snake[0].y-1}}
//     else if(direction === 'down') {
//          head = {x: snake[0].x, y: snake[0].y+1}}
//     else if(direction === 'left') {
//          head = {x: snake[0].x-1, y: snake[0].y}}
//     else if(direction === 'right') {
//          head = {x: snake[0].x+1, y: snake[0].y}}
//     else{
//         head = {x: snake[0].x, y: snake[0].y}
//     }
//         if(snake[0].x === food.x && snake[0].y === food.y){
//         blocks[`${food.x}-${food.y}`].classList.remove('food')
//         food = {x: Math.floor(Math.random() * col), y: Math.floor(Math.random() * row)}
//         snake.unshift(head)
//     }

//     if (head.x<0 || head.x>=col || head.y<0 || head.y>=row) {
//         document.querySelector('.model-re').style.display = 'flex'
//         clearInterval(intervalNo)

//     }

//     snake.forEach(segment => {
//         console.log(segment);
//         blocks[`${segment.x}-${segment.y}`].classList.remove('snake')
        
//     });
//     snake.unshift(head)
//     snake.pop()
//     snake.forEach(segment => {
//         console.log(segment);
//         blocks[`${segment.x}-${segment.y}`].classList.add('snake')
        
//     });
// }

// intervalNo = setInterval(() => {
//     drawSnake()
// }, 100);

// for (let i = 1; i<=col*row; i++) {
//     const block= document.createElement('div')
//     block.classList.add('block')
//     board.appendChild(block)
    
// }


