// Get elements
const cardHtml = document.getElementsByClassName('card');
const moves = document.getElementsByClassName('moves');
const restart = document.getElementsByClassName('restart')[0];
const stars = document.getElementsByClassName('stars')[0];
const victoryScreen = document.getElementById('victoryScreen');
const playAgainButton = document.getElementById('playAgainButton');
const scoreMessage = document.getElementById('scoreMessage');
const starMessage = document.getElementById('starMessage');
const timeMessage = document.getElementById('timeMessage');
const secondsCounter = document.getElementById('secondsCounter');

// HTML for each star
const startHtml = '<li><i class="fa fa-star"></i></li>';

// cards holding the different symbols
const deck = ["diamond", "paper-plane-o", "anchor", "bolt", "cube", "leaf", "bicycle", "bomb", "diamond", "paper-plane-o", "anchor", "bolt", "cube", "leaf", "bicycle", "bomb"];

let matches = 0; // tracks the number of card matches
const matchesTot = deck.length / 2; // number of pairs of cards
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Sets the different tiles of the deck/grid
const dealCards = function() {
  let deckShuffled = deck.slice();
  deckShuffled = shuffle(deckShuffled);

  for (let i = 0; i < cardHtml.length; i++) {
    cardHtml[i].children[0].classList.add('fa-' + deckShuffled[i]);
  }
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

let numOfMoves = 0; // number of guesses user has made
let starRating = 3; // start rating based on number of guesses, 3 is best.
var time = 0; // in seconds, variable to track time

// helper functiont to flip card
const flipCard = function(item) {
  item.classList.toggle('open');
  item.classList.toggle('show');
}

// checks if two cards match
const isMatch = function(list) {
  // sees if first two items have the same text
  if (list[0].children[0].className == list[1].children[0].className){
    return true;
  } else {
    return false;
  }
}

// tracks which cards are selected
let selectedCards = [];

// tracks if two cards are selected
let twoPicked = false;

// choosing card function
const clickMe = function() {
  // resets flipped cards if two have been chosen
  if (twoPicked){
    for (let i = 0; i < selectedCards.length; i++){
        selectedCards[i].classList.remove('show');
        selectedCards[i].classList.remove('open');

        twoPicked = false;
      }
      selectedCards = [];
  }
  // checks to see if card has been selected
  if (this.classList.contains('show')){
    return;
  } else {
    selectedCards.push(this);
    flipCard(this);
  }

  // if there are more than one card selected, it checks if they are a match. Then resets
  if (selectedCards.length > 1) {

    let match = false;
    if (isMatch(selectedCards)) {
      match = true;
      matches++;
      console.log(matches);
    }

      for (let i = 0; i < selectedCards.length; i++){
        if (match) {
        selectedCards[i].classList.add('match');
      }
      }

    twoPicked = true;
    numOfMoves ++;

    // checks to decrease rating
    if (numOfMoves == 16){
      removeStar();
      starRating --;
    }

    if (numOfMoves == 24){
      removeStar();
      starRating --;
    }

    moves[0].innerHTML = numOfMoves;
  }
  if (matches == matchesTot) {
    victory();
  }
}

// Resets all flipped classes on all cards
const resetCard = function(card) {
  card.className = 'card';
  card.children[0].className = 'fa';
}

// Reset the board
const reset = function() {
  clearInterval(timer);
  matches = 0;
  numOfMoves = 0;
  starRating = 3;
  time = 0;
  secondsCounter.innerText = time;
  timer = setInterval(incrementSeconds, 1000);
  // reset visible starMessage
  stars.innerHTML = startHtml + "\n" + startHtml + "\n" + startHtml

  moves[0].innerHTML = numOfMoves;
  for (let i = 0; i < cardHtml.length; i++) {
    resetCard(cardHtml[i]);
  }
  dealCards();
}

// Displays victory message
const victory = function() {
  clearInterval(timer);
  scoreMessage.innerHTML = numOfMoves;
  timeMessage.innerHTML = time;
  let stars = '';
  for (let i = 0; i < starRating; i++){
    stars += '<i class="fa fa-star"></i>';
  }
  starMessage.innerHTML = stars;
  victoryScreenOpen();
}

// helper function to open modal
const victoryScreenOpen = function() {
  victoryScreen.style.display = 'block';
}

// helper function to close modal
const victoryScreenClose = function() {
  victoryScreen.style.display = "none";
}

// helper function to remove star
const removeStar = function(){
  stars.removeChild(stars.getElementsByTagName('li')[0]);
}

// adds click listeners to cards
for (let i = 0; i < cardHtml.length; i++) {
    cardHtml[i].addEventListener('click', clickMe);
  }

// listenter for reset button
restart.addEventListener('click', reset);

// listener for clicking the button to play again
playAgainButton.onclick = function() {
    victoryScreenClose();
    reset();
}

// listener to reset game if user clicks outside of modal
window.onclick = function(event) {
    if (event.target == victoryScreen) {
        victoryScreen.style.display = "none";
        reset();
    }
}

// timer function
function incrementSeconds() {
    time += 1;
    secondsCounter.innerText = time;
}

/*
const test = document.getElementById('testButton');

test.addEventListener('click', function() {
  clearInterval(timer);
  victory();
});
*/

// set all the symbols to visible - for testing shuffle ability
/*
for (let i = 0; i < cardHtml.length; i ++) {
  cardHtml[i].classList.add('show');
}
*/

// Initialises game board
dealCards();

// call intiial timer
let timer = setInterval(incrementSeconds, 1000);
