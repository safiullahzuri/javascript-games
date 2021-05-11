document.addEventListener('DOMContentLoaded', () => {

	const grid = document.querySelector('.grid');

	for(let i=1; i<=9; i++){
		var gridElement = document.createElement('div');

		gridElement.setAttribute('class', 'square');
		gridElement.setAttribute('id', i);

		grid.appendChild(gridElement);
	}

	const squares = document.querySelectorAll('.square');
	const mole = document.querySelector('.mole');
	const timeLeft = document.querySelector('#time-left');

	let score = document.querySelector('#score');

	let result = 0;
	let currentTime = timeLeft.textContent;

	function randomSquare(){
		squares.forEach(square => {
			square.classList.remove('mole');
		});

		const square = squares[Math.floor(Math.random() * 9)];
		square.classList.add('mole');

		hitPosition = square.id;

	}

	squares.forEach(square => {
		square.addEventListener('mouseup', ()=> {
			if(hitPosition === square.id){
				result++;
				score.textContent = result;
			}
		});

	});

	setInterval(randomSquare, 800);

	function countDown(){
		currentTime--;
		timeLeft.textContent = currentTime;
		if(currentTime === 0){
			alert('Game Over! Your result is '+result);
			window.location.reload(false);
		}
	}

	setInterval(countDown, 1000);

});