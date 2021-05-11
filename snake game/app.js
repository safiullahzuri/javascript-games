document.addEventListener('DOMContentLoaded', () => {

	const grid = document.querySelector('.grid');
 
	for(let i=0; i<100; i++){
		const gridElement = document.createElement('div');
		grid.appendChild(gridElement);
	}

	const squares = document.querySelectorAll('.grid div');
	const scoreDisplay = document.querySelector('span');
	const startBtn = document.querySelector('.start');


	const width = 10;
	let currentIndex = 0; //first div in our grid

	let appleIndex = 0;

	let currentSnake = [2,1,0]; //tail at the bottom, so when we pop it is the tail that gets removed

	let direction = 1;//go one div down the array

	let score = 0
	let speed = 0.9
	let intervalTime = 0
	let interval = 0

	function startGame(){
		currentSnake.forEach(index => squares[index].classList.remove('snake'));
		squares[appleIndex].classList.remove('apple');

		clearInterval(interval);
		score = 0;

		//randomApple
		randomApple();
		direction = 1;
		scoreDisplay.innerText = score;
		intervalTime = 1000;
		currentSnake[2,1,0]
		currentIndex = 0

		currentSnake.forEach(index => squares[index].classList.add('snake'))
		interval = setInterval(moveOutcomes, intervalTime)
	}

	//move outcomes function
	function moveOutcomes(){
		if ((currentIndex[0]+width > (width*width) && direction===width) || //bottom wall
		    (currentIndex[0]%width === (width-1) && direction === 1) || //right wall
		    (currentIndex[0]%width === 0 && direction === -1 ) ||
		    (currentIndex[0]-width<0 && direction ===-width) ||
		    squares[currentSnake[0]+direction].classList.contains('snake'))  {

			return clearInterval(interval);
		}

		const tail = currentSnake.pop();
		squares[tail].classList.remove('snake');
		currentSnake.unshift(currentSnake[0] + direction);

		if(squares[currentSnake[0]].classList.contains('apple')){
			squares[currentSnake[0]].classList.remove('apple');
			squares[tail].classList.add('snake');
			currentSnake.push(tail);
			randomApple();
			score++;
			scoreDisplay.textContent = score;
			clearInterval(interval);
			intervalTime = intervalTime * speed;
			interval = setInterval(moveOutcomes, intervalTime)
		}
		squares[currentSnake[0]].classList.add('snake');

	}


	function control(e){
		squares[currentIndex].classList.remove('snake');
		//right arrow
		if(e.keyCode === 39){
			direction = 1;
		}else if(e.keyCode === 38){//up
			direction = -width;
		}else if(e.keyCode === 37){
			direction = -1; //left
		}else if(e.keyCode === 40){
			direction = +width;
		}
	}

	document.addEventListener('keyup', control);
	startBtn.addEventListener('click', startGame);


	function randomApple(){
		do{
			appleIndex = Math.floor(Math.random() * squares.length);
		}while(squares[appleIndex].classList.contains('snake'));

		squares[appleIndex].classList.add('apple');
	}




})