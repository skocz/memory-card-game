let card = document.getElementsByClassName('card');
let cards = [...card];
let deck = document.querySelector('.deck');
let openedCards = [];
let changeMovesNumber = document.getElementById('moves');
let matchCount =0;
let matchClass = deck.querySelectorAll('.card .match')
let modal = document.getElementById('myModal');
let button = document.getElementById('playAgain');
let starN=0;
let timeoutID='';
let time = "00:00"
let seconds = 0;
let minutes = 0;
let t;
let timer = document.getElementById("timer");
let modalHeading = document.querySelector('#modal-heading');
let modalMessage=''; 

/* 
* RESTART THE GAME 
*/
let restart = document.getElementById('restartClick'); 
restart.addEventListener('click', newCards); 

/* 
* shuffle the list of cards with "shuffle" method
*/
let shuffledCards = shuffle(cards);
newCards();

/*
*Setting up the cards for the game: 
*Shuffle function from http://stackoverflow.com/a/2450976
*/

function shuffle(array) {
  var currentIndex = array.length,
  temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

/*
*display the cards on the page
*loop through each card and create its HTML
*add each card's HTML to the page
*/

function newCards(card) {
  for (let i = 0; i < shuffledCards.length; i++) {
    shuffledCards[i].classList.remove('show', 'open', 'match');
    resetMovesCount();
    resetStarRating();
    matchCount = 0;
    modalMessage.innerHTML = '';
    deck.appendChild(shuffledCards[i]);  
  }
} 

/* 
* this function starts different function to show and match cards 
*/
for (let shuffledCard of shuffledCards) {
shuffledCard.addEventListener('click', clickedCards);
}
// let startClock = 0;
/* once the card is clicked the time and comparison initialise */
function clickedCards (event){
  showCard();
  // startClock++;
  // startTimer();
  addToOpenCards(); 
  if (openedCards.length === 2){
    addMoves();       
    if (openedCards[0].innerHTML === openedCards[1].innerHTML){
      matchCount++;
      console.log(matchCount);
      stopClock();
      match(); 
    } else {
        delayDisplay();
      }
  }
}
/* 
* display the card's symbol 
*/
function showCard (){
  event.target.classList.add('open', 'show');
}
/* 
* add the card to a *list* of "open" cards 
*/
function addToOpenCards () {  
  openedCards.push(event.target);
    if (openedCards.length < 3){
    }
}
/* 
*check whether the two cards match or not 
*/
function match(){
  event.target.classList.add('match');
  openedCards[0].classList.add('match');
  event.target.classList.remove('show', 'open'); 
  openedCards[0].classList.remove('show', 'open'); 
  openedCards = [];  
  console.log(openedCards);
 }

function notMatch (){
    openedCards[0].classList.remove('open', 'show');
    openedCards[1].classList.remove('open', 'show');
    openedCards = [];
}

/* 
* delay opened cards so you can see them before they disappear if not match
*/
function delayDisplay() {
  timeoutID = window.setTimeout(notMatch, 300);
}

/*
* increment the move counter and display it on the page 
*/
function addMoves(){
  moves++;
  console.log(moves);
  changeMovesNumber.textContent =  moves;
  starRating();
}

function resetMovesCount(){
  moves = 0; 
  changeMovesNumber.textContent =  moves; 
}

/* 
* deduct stars 
*/
function starRating (){
  if (moves > 8 && moves < 20){
    starN = 3;
  }
  if (moves > 20 && moves < 30 ) {
    document.getElementById('one').innerHTML ='<i class="fa fa-star-o"></i>';
    starN = 2;
  } if (moves > 30) {
    document.getElementById('one').innerHTML ='<i class="fa fa-star-o"></i>';
    document.getElementById('two').innerHTML ='<i class="fa fa-star-o"></i>';
    starN = 1;
  }
}

/* 
*reset stars 
*/
function resetStarRating (){ 
  document.getElementById('one').innerHTML ='<i class="fa fa-star"></i>';
  document.getElementById('two').innerHTML ='<i class="fa fa-star"></i>';
}

/* 
*StopWatch, reference: https://codepen.io/AMSarmento/pen/YaaYrwh
*/
function startTimer () {
  clearInterval(t);
  t = setInterval(buildTimer, 1000);
}

timer.textContent = time;

function buildTimer () {
  seconds++;
    if (seconds === 60) {
      seconds = 0;
      minutes++;
      if (minutes === 60) {
        minutes = 0;
        seconds = 0;
      }
    }
  timer.textContent = (minutes < 10 ? "0" + minutes.toString(): minutes) + ":" + (seconds < 10 ? "0" + seconds.toString(): seconds);
}

/* 
*Stop the timer once the last pair of cards match 
*/
function stopClock () {
  if (matchCount === 8){
    clearInterval(t);
    gameEnd();
   }
}
/* 
*reset the timer and start new game
* this function is added to te HTML element button - onclick.
*/
function resetTimer () {
  clearInterval(t);
  seconds = 0;
  minutes = 0;
  timer.textContent = time;
}


/*
* MODAL - display a message with the final score 
*/

/* When the user clicks on the last card the modal oopens */
function gameEnd () {
  modalMessage = document.createElement('p');
  modalMessage.innerHTML = '<p>Your time '+ timer.textContent + ', '+ moves + ' Moves and ' + starN + ' Stars !</br> WOOO!</p>';
  modalMessage.classList.add('modal-text');
  modalHeading.appendChild(modalMessage); 
  modal.style.display = 'block';
}

/* When the user clicks on the button, close it */
button.onclick = function() {
    modal.style.display = 'none';
    newCards();
    resetTimer();
};

/* When the user clicks anywhere outside of the modal, close it */
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = 'none';
    newCards();
    resetTimer();
  }
};
