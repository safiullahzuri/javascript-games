document.addEventListener('DOMContentLoaded', () => {

    const width = 10
    const height = 20

    const grid = document.querySelector('.grid')

    for(let i=0; i<200; i++){
        const gridElement = document.createElement('div')
        if(i>= 190){
            gridElement.classList.add('block3')
        }
        grid.appendChild(gridElement)
    }
 

    const lTetromino = [
        [1, width+1, width*2+1, 2],
        [width, width+1, width+2, width*2+2],
        [1, width+1, width*2+1, width*2],
        [width, width*2, width*2+1, width*2+2]
    ]

    const zTetromino = [
        [0, width, width+1, width*2+1],
        [width+1, width+2, width*2, width*2+1],
        [0, width, width+1, width*2+1],
        [width+1, width+2, width*2, width*2+1]
    ]

    const tTetromino = [
        [1, width, width+1, width*2+1],
        [1, width+1, width+2, width*2+1],
        [width, width+1, width+2, width*2+1],
        [1, width, width+1, width*2+1]
    ]

    const oTetromino = [
        [0,1,width, width+1],
        [0,1,width, width+1],
        [0,1,width, width+1],
        [0,1,width, width+1],
    ]

    const iTetromino = [
        [1, width+1, width*2+1, width*3+1],
        [width, width+1, width+2, width+3],
        [1, width+1, width*2+1, width*3+1],
        [width, width+1, width+2, width+3]
    ]

    const theTetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino]

    let random = Math.floor(Math.random()*theTetrominoes.length)
    let currentRotation = 0 //or also called row
    let currentTetromino = theTetrominoes[random][currentRotation]


    let currentPosition = 4

    let squares = Array.from(grid.querySelectorAll('div'))

    function draw(){
        currentTetromino.forEach(index => {
            squares[currentPosition + index].classList.add('block')
        })
    }

    function undraw(){
        currentTetromino.forEach(index => {
            squares[currentPosition + index].classList.remove('block')
        })
    }

    function moveDown(){
        undraw()
        currentPosition = currentPosition += width
        draw()
        freeze()
    }


    function moveRight(){
        undraw()
        const isAtRightExge = currentTetromino.some(index => (currentPosition+index) % width === width-1 )
        if(!isAtRightExge) currentPosition += 1
        if(currentTetromino.some(index => squares[currentPosition + index].classList.contains('block2'))){
            currentPosition -= 1;
        }
        draw()
    }

    function moveLeft(){
        undraw()
        const isAtLeftEdge = currentTetromino.some(index => (currentPosition+index)%width === 0 )
        if(!isAtLeftEdge) currentPosition -= 1
        if(currentTetromino.some(index => squares[currentPosition+index].classList.contains('block2'))){
            currentPosition += 1
        }
        draw()
    }


    function rotate(){
        undraw()
        currentRotation++
        if(currentRotation === currentTetromino.length){
            currentRotation  = 0
        }
        currentTetromino = theTetrominoes[random][currentRotation]
        draw()
    }

    function control(e){
        if(e.keyCode === 39){
            moveRight()
        }else if(e.keyCode === 38){
            rotate()
        }else if(e.keyCode === 37){
            moveLeft()
        }else if(e.keyCode === 40){
            moveDown()
        }
    }

    document.addEventListener('keyup', control)

    draw()

    const previousGrid = document.querySelector('.previous-grid')
    for(let i=0; i<16; i++){
        previousGrid.appendChild(document.createElement('div'))
    }
     

    const displayWidth = 4
    const displayIndex = 0
    let nextRandom = 0

    const smallTetromino = [
        [1, displayWidth+1, displayWidth*2+1, 2],
        [0, displayWidth, displayWidth+1, displayWidth*2+1],
        [1, displayWidth, displayWidth+1, displayWidth+2],
        [0,1 , displayWidth, displayWidth+1],
        [1, displayWidth+1, displayWidth*2+1, displayWidth*3+1]
    ]

    const displaySquares = document.querySelectorAll('.previous-grid div')

    function displayShape(){
        displaySquares.forEach(square => {
            square.classList.remove('block')
        })
        smallTetromino[nextRandom].forEach(index => {
            displaySquares[displayIndex + index].classList.add('block')
        })
    }
    
    function freeze(){
        if(currentTetromino.some(index => squares[currentPosition + index + width].classList.contains('block3') || squares[currentPosition+index+width].classList.contains('block2'))){
            currentTetromino.forEach(index => squares[index + currentPosition].classList.add('block2'))
        
            random = nextRandom
            nextRandom = Math.floor(Math.random() * theTetrominoes.length)
            currentTetromino = theTetrominoes[random][currentRotation]
            currentPosition = 4
            draw()
            displayShape()
            gameOver()
            addScore()
        }

        
    }
    const startBtn = document.querySelector('#startBtn')
    let timerId

    startBtn.addEventListener('click', () => {
        if(timerId){
            clearInterval(timerId)
            timerId = null
        }else{
            draw()
            timerId = setInterval(moveDown, 1000)
            nextRandom = Math.floor(Math.random() * theTetrominoes.length)
            displayShape()
        }
    })

    const scoresDisplay = document.querySelector('.score-display')
    const linesDisplay = document.querySelector('lines-display')

    let score = 0
    let lines = 0

    function gameOver(){
        if(currentTetromino.some(index => squares[currentPosition + index].classList.contains('block2'))){
            scoresDisplay.innerHTML = 'end'
            clearInterval(timerId)
        }
    }

    let currentIndex = 0

    function addScore(){
        for(currentIndex=0; currentIndex<199; currentIndex++){
            const row = [currentIndex, currentIndex+1, currentIndex+2, currentIndex+3, currentIndex+4, currentIndex+5, currentIndex+6, currentIndex+7, currentIndex+8, currentIndex+9]
            
            if(row.every(index => squares[index].classList.contains('block2'))){
                score += 10
                lines += 1
                scoresDisplay.innerHTML = score
                linesDisplay.innerHTML = lines

                row.forEach(index => {
                    squares[index].classList.remove('block2') || squares[index].classList.remove('block')
                })

                const squaresRemoved = squares.splice(currentIndex, width)
                squares = squaresRemoved.concat(squares)
                squares.forEach(cell => grid.appendChild(cell))
            }
        }
    }


})