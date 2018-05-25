/*
 * Create a list that holds all of your cards
 */


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

const cardHtml = document.getElementsByClassName('card');
const moves = document.getElementsByClassName('moves');

let numOfMoves = 0;

const flipCard = function(item) {
  item.classList.toggle('open');
  item.classList.toggle('show');
}

const isMatch = function(list) {
  // sees if first two items have the same text
  if (list[0].children[0].className == list[1].children[0].className){
    return true;
  } else {
    return false;
  }
}

let selectedCards = [];
let twoPicked = false;

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
    }

      for (let i = 0; i < selectedCards.length; i++){
        if (match) {
        selectedCards[i].classList.add('match');
      }
      }

    twoPicked = true;
    numOfMoves ++;
    moves[0].innerHTML = numOfMoves;
  }
}

// event listeners
for (let i = 0; i < cardHtml.length; i++) {
  cardHtml[i].addEventListener('click', clickMe);
}

// Reset the board
