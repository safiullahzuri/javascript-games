document.addEventListener('DOMContentLoaded', () => {

	const grid = document.querySelector('.grid');

	for(let i=1; i<=9; i++){
		var gridElement = document.createElement('div');
		gridElement.setAttribute('class', 'square');
		gridElement.setAttribute('id', i);
 
		grid.appendChild(gridElement);


	}

	const squares = document.querySelectorAll('.square');
	const mole = document.querySelectorAll('.mole');
	const timeLeft = document.querySelector('#time-left');

	let score = document.querySelector('#score');

	let result = 0;
	let currentTime = timeLeft.textContent;


	function randomSquare(){
		squares.forEach( square => {
			square.classList.remove('mole');
		});

		let randomSquare = squares[Math.floor(Math.random() * 9)];
		randomSquare.classList.add('mole');

		hitPosition = randomSquare.id;
	}

	squares.forEach( square => {
		square.addEventListener('mouseup', ()=>{
			if(square.id === hitPosition){
				result++;
				score.textContent = result;
			}
		});
	});

	function moveMole(){
		let timerId = null;
		timerId = setInterval(randomSquare, 1000);
	}

	moveMole();

	function countDown(){
		currentTime--;
		timeLeft.textContent = currentTime;
		if(currentTime === 0){
			clearInterval(timerId);
			alert('Game over! Your final score is '+result);
			result = 0;
			timeLeft.textContent = 30;
		}
	}

	let timerId = setInterval(countDown, 1000);
});