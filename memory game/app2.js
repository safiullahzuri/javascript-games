document.addEventListener('DOMContentLoaded', ()=> {

	const cardsArray = [
		{
      name: 'fries',
      img: 'images/fries.png'
    },
    {
      name: 'cheeseburger',
      img: 'images/cheeseburger.png'
    },
    {
      name: 'ice-cream',
      img: 'images/ice-cream.png'
    },
    {
      name: 'pizza',
      img: 'images/pizza.png'
    },
    {
      name: 'milkshake',
      img: 'images/milkshake.png'
    },
    {
      name: 'hotdog',
      img: 'images/hotdog.png'
    },
    {
      name: 'fries',
      img: 'images/fries.png'
    },
    {
      name: 'cheeseburger',
      img: 'images/cheeseburger.png'
    },
    {
      name: 'ice-cream',
      img: 'images/ice-cream.png'
    },
    {
      name: 'pizza',
      img: 'images/pizza.png'
    },
    {
      name: 'milkshake',
      img: 'images/milkshake.png'
    },
    {
      name: 'hotdog',
      img: 'images/hotdog.png'
    }
];

const grid = document.querySelector('.grid');
const cards = document.querySelectorAll('img');

	function createBoard(){
		for(let i=0; i<cardsArray.length; i++){
			var card = document.createElement('img');
			card.setAttribute('src', 'images/blank.png');
			card.setAttribute('data-id', i);

			card.addEventListener('click', flipCard);

			grid.appendChild(card);
		}
	}

	createBoard();
	var chosenCards = [];
	var chosenCardsIds = [];
	function flipCard(){
		var cardId = this.getAttribute('data-id');
		chosenCards.push(cardsArray[cardId].name);
		chosenCardsIds.push(cardId);

		this.setAttribute('src', cardsArray[cardId].img);

		if(chosenCards.length === 2){
			setTimeout(matchCards, 300);
		}

	}
	var cardsWon = [];

	var scoreText = document.querySelector('#result');

	function matchCards(){
		var cards = document.querySelectorAll('img');

		var optionOneId = chosenCardsIds[0];
		var optionTwoId = chosenCardsIds[1];

		if(chosenCards[0] === chosenCards[1]){
			alert("match");
			cards[optionOneId].setAttribute('src', 'images/white.png');
			cards[optionTwoId].setAttribute('src', 'images/white.png');
			cardsWon.push(chosenCards);
		}else{
			alert("no match");
			cards[optionOneId].setAttribute('src', 'images/blank.png');
			cards[optionTwoId].setAttribute('src', 'images/blank.png');
		}

		chosenCards = [];
		chosenCardsIds = [];

		scoreText.textContent = cardsWon.length;
		if(cardsWon.length === cardsArray.length/2){
			scoreText.textContent = "Congratulations! You won this game.";
			console.log(cardsWon);
		}
		


	}


} );