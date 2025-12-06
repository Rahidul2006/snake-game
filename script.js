const board = document.querySelector('.board')
const blockWidth = 30
const blockHeight = 30

const col = Math.floor(board.clientWidth/blockWidth)
const row = Math.floor(board.clientHeight/blockHeight)
const blocks = []

console.log(col);
console.log(row);

for (let rows = 0; rows < row ; rows++) {
    for (let cols = 0; cols < col; cols++) {
        const block= document.createElement('div')
        block.classList.add('block')
        board.appendChild(block)  
        blocks[`${cols}-${rows}`] = block
    }
    
}

// for (let i = 1; i<=col*row; i++) {
//     const block= document.createElement('div')
//     block.classList.add('block')
//     board.appendChild(block)
    
// }


