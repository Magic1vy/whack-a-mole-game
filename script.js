// const holes = document.querySelectorAll('.hole');
// const scoreBoard = document.querySelector('.score');
// const moles = document.querySelectorAll('.mole');
// const startBtn = document.querySelector("#start");
// const intermediateBtn = document.querySelector("#intermediate");
// const advanceBtn = document.querySelector("#advance");
// const scores = JSON.parse(localStorage.getItem('score')) || [];
// const lastScoreElement = document.querySelector('.last-score');


// let lastHole;
// let timeUp = false;
// let score = 0;
// let isClicked = false;

// window.addEventListener('DOMContentLoaded', () => {
//     const savedScores = JSON.parse(localStorage.getItem('score'));
//     if (savedScores && savedScores.length > 0) {
//         const lastScore = savedScores[savedScores.length - 1];
//         lastScoreElement.textContent = lastScore;
//     }
// });

// function randomTime(min, max) {
//     return Math.round(Math.random() * (max - min) + min);
// }

// function randomHole(holes){
//     const idx = Math.floor(Math.random() * holes.length);
//     const hole = holes[idx];
//     if (hole === lastHole){
//         randomHole(holes);
//     }

//     lastHole = hole; 
//     return hole;
// }

// function peep(timeRange) {
//     const time = randomTime(timeRange.min, timeRange.max);
//     const hole = randomHole(holes);
//     hole.classList.add("up");
//     localStorage.setItem('score', JSON.stringify(scores));
//     setTimeout(() => {
//         hole.classList.remove("up");
//         if (!timeUp) peep(timeRange);
//     }, time);
// }

// function startGame(timeRange) {
//     scoreBoard.textContent = 0;
//     timeUp = false;
//     score = 0;
//     peep(timeRange);
//     setTimeout(() => (timeUp = true), 10000);
//     localStorage.setItem('score', JSON.stringify(scores));
// }

// function bonk(e) {
//     if (!e.isTrusted) return;
//     isClicked = true;
//     score++;
//     this.classList.remove('up');
//     scoreBoard.textContent = score;

//     scores.push(score);
//     localStorage.setItem('score', JSON.stringify(scores));

//     lastScoreElement.textContent = score;
// }

// startBtn.addEventListener("click", () => startGame({ min: 250, max: 1300 }));
// intermediateBtn.addEventListener("click", () => startGame({ min: 200, max: 1000 }));
// advanceBtn.addEventListener("click", () => startGame({ min: 50, max: 400 }));
// moles.forEach(mole => mole.addEventListener("click", bonk));



const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const startBtn = document.querySelector("#start");
const intermediateBtn = document.querySelector("#intermediate");
const advanceBtn = document.querySelector("#advance");
const scores = JSON.parse(localStorage.getItem('score')) || [];
const lastScoreElement = document.querySelector('.last-score');

let lastHole;
let timeUp = false;
let score = 0;
let isClicked = false;

window.addEventListener('DOMContentLoaded', () => {
    const savedScores = JSON.parse(localStorage.getItem('score'));
    if (savedScores && savedScores.length > 0) {
        const lastScore = savedScores[savedScores.length - 1];
        lastScoreElement.textContent = lastScore;
    }
});

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes){
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if (hole === lastHole){
        randomHole(holes);
    }
    console.log(lastHole);
    lastHole = hole; 
    return hole;
}

function peep(timeRange) {
    const time = randomTime(timeRange.min, timeRange.max);
    const hole = randomHole(holes);
    hole.classList.add("up");
    localStorage.setItem('score', JSON.stringify(scores));
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
    localStorage.setItem('score', JSON.stringify(scores));
}

function bonk(e) {
    if (!e.isTrusted || isClicked) return;
    isClicked = true;
    score++;
    this.classList.remove('up');
    scoreBoard.textContent = score;

    scores.push(score);
    localStorage.setItem('score', JSON.stringify(scores));

    lastScoreElement.textContent = score;
}

startBtn.addEventListener("click", () => startGame({ min: 250, max: 1300 }));
intermediateBtn.addEventListener("click", () => startGame({ min: 200, max: 1000 }));
advanceBtn.addEventListener("click", () => startGame({ min: 50, max: 400 }));
moles.forEach(mole => mole.addEventListener("click", bonk));
