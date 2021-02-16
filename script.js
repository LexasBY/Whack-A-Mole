const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const lastScore = document.querySelector('.lastScore');
const currentLevel = document.querySelector('.currentLevel');
let lastHole;
let timeUp = false;
let score = 0;
currentLevel.textContent = localStorage.getItem('currentLevel') || 'unknown yet';
lastScore.textContent = localStorage.getItem('lastScore') || 0;

let level;
let minTime;
let maxTime;

//Getting a random number between two values:
function randomTime(min, max) { 
  return Math.round(Math.random() * (max - min) + min);  // Math.round()  returns the value of a number rounded to the nearest integer(Math.random() returns a random number between 0 (inclusive),  and 1 (exclusive):) 
}

//Getting a Hole wit a random index 
function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length); //Math.floor() function returns the largest integer less than or equal to a given number.
  const hole = holes[idx];
  if (hole === lastHole) {  
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
}

function peep() {
  let level = localStorage.getItem('lastScore')
  
  if (level <= 6) {
    localStorage.setItem('currentLevel', 'is newbie')
    minTime = 400;
    maxTime = 2000;
    console.log('easy')
    
  }
  if (level > 6 && level <= 10) {
    localStorage.setItem('currentLevel', 'is medium')
    minTime = 200;
    maxTime = 1000;
    console.log('medium')
  }
  if (level > 10) {
    localStorage.setItem('currentLevel', 'is professional')
    minTime = 100;
    maxTime = 800;
    console.log('hard')
  }
  
  const time = randomTime (minTime, maxTime);
 
  const hole = randomHole(holes);
  hole.classList.add('up');
  setTimeout(() => {
    hole.classList.remove('up');
    if (!timeUp) peep();
  }, time);
}

function startGame() {
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  lastScore.textContent = localStorage.getItem('lastScore') || 0;
  currentLevel.textContent = localStorage.getItem('currentLevel') || 'is not known yet';
  peep();
  setTimeout(() => timeUp = true, 15000)
}

function startEasyGame() {
  scoreBoard.textContent = 0;
  timeUp = false;
  score = 0;
  peep();
  setTimeout(() => timeUp = true, 10000)
}

function bonk(e) {
  if(!e.isTrusted) return; // cheater!
  score++;
  this.parentNode.classList.remove('up');
  scoreBoard.textContent = score;
  localStorage.setItem('lastScore', score)

}


moles.forEach(mole => mole.addEventListener('click', bonk));
