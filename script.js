const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const startBtn = document.querySelector("#start");
const intermediateBtn = document.querySelector("#intermediate");
const advanceBtn = document.querySelector("#advance");
const bestScoreElement = document.querySelector('.best-score');

let lastHole;
let timeUp = false;
let score = 0;
let isClicked = false;
let bestScore = parseInt(localStorage.getItem('bestScore')) || 0;

window.addEventListener('DOMContentLoaded', () => {
  bestScoreElement.textContent = bestScore;
});

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];
  if (hole === lastHole) {
    randomHole(holes);
  }

  lastHole = hole;
  return hole;
}

function peep(timeRange) {
  const time = randomTime(timeRange.min, timeRange.max);
  const hole = randomHole(holes);
  hole.classList.add("up");
  localStorage.setItem('bestScore', bestScore);
  isClicked = false;
  setTimeout(() => {
    hole.classList.remove("up");
    if (!timeUp) peep(timeRange);
  }, time);
}

function startGame(timeRange) {
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  peep(timeRange);
  setTimeout(() => (timeUp = true), 10000);
}

function bonk(e) {
  if (!e.isTrusted || isClicked) return;
  isClicked = true;
  score++;
  this.classList.remove('up');
  scoreBoard.textContent = score;

  if (score > bestScore) {
    bestScore = score;
    localStorage.setItem('bestScore', bestScore);
    bestScoreElement.textContent = bestScore;
  }
}

startBtn.addEventListener("click", () => startGame({ min: 250, max: 1300 }));
intermediateBtn.addEventListener("click", () => startGame({ min: 200, max: 1000 }));
advanceBtn.addEventListener("click", () => startGame({ min: 50, max: 400 }));
moles.forEach(mole => mole.addEventListener("click", bonk));
