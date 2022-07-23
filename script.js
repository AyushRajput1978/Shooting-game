'use strict';

// Selecting elements
const player1El = document.querySelector('.player--1');
const player2El = document.querySelector('.player--2');
const score1El = document.querySelector('#score--1');
const score2El = document.getElementById('score--2');
const matchWon1El = document.getElementById('match-won--1');
const matchWon2El = document.getElementById('match-won--2');
const randNumbScreen = document.querySelector('.randnumb-screen');
const randNumbScore = document.querySelector('.randnumb-score');
const playerShotLabel = document.querySelector('.randnumb-label');
const playerWon = document.querySelector('.player-won');
const nextBtn = document.querySelector('.btn--next');
const winner1 = document.querySelector('.winner1');
const winner2 = document.querySelector('.winner2');

const btnNew = document.querySelector('.btn--new');
const btnShoot = document.querySelector('.btn--shoot');

let scores, matchWonScore1, matchWonScore2, activePlayer, playing;

// Starting conditions
const init = function () {
  scores = [100, 100];

  playing = true;
  score1El.textContent = 100;
  score2El.textContent = 100;
};
const reload = function () {
  init();
  activePlayer = 1;
  matchWonScore1 = 0;
  matchWonScore2 = 0;
  matchWon1El.textContent = 0;
  matchWon2El.textContent = 0;
  randNumbScore.textContent = 0;
  playerWon.classList.add('hidden');
  btnShoot.classList.remove('hidden');
  randNumbScreen.classList.remove('hidden');

  player1El.classList.remove('player--winner');
  player2El.classList.remove('player--winner');
  player1El.classList.add('player--active');
  player2El.classList.remove('player--active');
};
reload();
const switchPlayer = function () {
  activePlayer = activePlayer === 1 ? 2 : 1;
  player1El.classList.toggle('player--active');
  player2El.classList.toggle('player--active');
};

// Shooting Event
btnShoot.addEventListener('click', function () {
  if (playing) {
    const randnumb = Math.trunc(Math.random() * 5) + 1;
    randNumbScore.textContent = randnumb;
    playerWon.classList.add('hidden');
    if (activePlayer === 1) {
      scores[1] -= randnumb;
      score2El.textContent = scores[1];
      playerShotLabel.textContent = 'Player 1 Shoots with';
    } else {
      scores[0] -= randnumb;
      score1El.textContent = scores[0];
      playerShotLabel.textContent = 'Player 2 Shoots with';
    }

    switchPlayer();
  }

  if (scores[0] < 1) {
    playerWon.textContent = 'Player 2 won this Match';
    playerWon.classList.remove('hidden');
    init();
    ++matchWonScore2;
    matchWon2El.textContent = matchWonScore2;
  } else if (scores[1] < 1) {
    playerWon.textContent = 'Player 1 has won this Match';
    playerWon.classList.remove('hidden');
    init();
    ++matchWonScore1;
    matchWon1El.textContent = matchWonScore1;
  }
  if (matchWonScore1 === 3) {
    playing = false;
    player1El.classList.add('player--winner');
    playerWon.textContent = 'Player 1 has won the game';
    btnShoot.classList.add('hidden');
    randNumbScreen.classList.add('hidden');
    switchPlayer();
  } else if (matchWonScore2 === 3) {
    playing = false;
    player2El.classList.add('player--winner');
    playerWon.textContent = 'Player 2 has won the game';
    btnShoot.classList.add('hidden');
    randNumbScreen.classList.add('hidden');
    switchPlayer();
  }
});

btnNew.addEventListener('click', reload);
