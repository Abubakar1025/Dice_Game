'use strict';

let score0El = document.querySelector('#score--0');
let score1El = document.getElementById('score--1');
let current0El = document.querySelector('#current--0');
let current1El = document.querySelector('#current--1');
let diceEl = document.querySelector('.dice');
let btnNew = document.querySelector('.btn--new');
let btnRoll = document.querySelector('.btn--roll');
let btnHold = document.querySelector('.btn--hold');

let player0El = document.querySelector('.player--0')
let player1El = document.querySelector('.player--1')

// Switching Player
const switchPlayer = function () {
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  document.querySelector('.player--0').classList.toggle('player--active')
  document.querySelector('.player--1').classList.toggle('player--active')
}

let scores, currentScore, activePlayer, playing;

const inIt = function () {
  // Starting Conditions
  scores = [0, 0]
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active')
  player1El.classList.remove('player--active')
}

// Getting function Values
inIt();


btnRoll.addEventListener('click', function () {

  if (playing) {

    // Generate Random Number
    let dice = Math.trunc(Math.random() * 6 + 1);

    // 2. Display Dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. If it one switch player
    if (dice !== 1) {
      // Add Dice score to current score
      currentScore += dice;

      document.getElementById(`current--${activePlayer}`).textContent = currentScore;

    } else {
      switchPlayer();
    }
  }
});

// Hold button exchange player
document.querySelector('.btn--hold').addEventListener('click', function () {

  if (playing) {
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer];

    if (scores[activePlayer] >= 50) {
      playing = false;
      scores[activePlayer] = 0
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active')
      diceEl.classList.add('hidden')
    } else {
      switchPlayer();
    }
  }
});

// Reset Game
btnNew.addEventListener('click', inIt);
