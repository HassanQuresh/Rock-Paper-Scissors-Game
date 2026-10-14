let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScore();

// Button Event Listeners
document.querySelector('.rock-btn').addEventListener('click', () => playGame('rock'));
document.querySelector('.paper-btn').addEventListener('click', () => playGame('paper'));
document.querySelector('.scissors-btn').addEventListener('click', () => playGame('scissors'));
document.querySelector('.auto').addEventListener('click', () => autoPlay());
document.querySelector('.reset').addEventListener('click', () => showResetConfirmation());

// Keyboard Shortcuts
document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r' || event.key === 'R') {
    playGame('rock');
  } else if (event.key === 'p' || event.key === 'P') {
    playGame('paper');
  } else if (event.key === 's' || event.key === 'S') {
    playGame('scissors');
  } else if (event.key === 'a' || event.key === 'A') {
    autoPlay();
  } else if (event.key === 'Backspace') {
    showResetConfirmation();
  }
});

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = '';

  if (playerMove === 'scissors') {
    if (computerMove === 'paper') result = 'You win!!!';
    else if (computerMove === 'rock') result = 'You lose';
    else if (computerMove === 'scissors') result = 'Tie.';
  } else if (playerMove === 'paper') {
    if (computerMove === 'paper') result = 'Tie.';
    else if (computerMove === 'rock') result = 'You win!!!';
    else if (computerMove === 'scissors') result = 'You lose';
  } else if (playerMove === 'rock') {
    if (computerMove === 'paper') result = 'You lose';
    else if (computerMove === 'scissors') result = 'You win!!!';
    else if (computerMove === 'rock') result = 'Tie.';
  }

  if (result === 'You win!!!') score.wins++;
  else if (result === 'You lose') score.losses++;
  else if (result === 'Tie.') score.ties++;

  localStorage.setItem('score', JSON.stringify(score));
  
  document.querySelector('.result').innerHTML = result;
  document.querySelector('.moves').innerHTML = `You <img src="${playerMove.toLowerCase()}-emoji.png" class="img">
<img src="${computerMove.toLowerCase()}-emoji.png" class="img"> Computer`;

  
  updateScore();
}

function pickComputerMove() {
  const randomNumber = Math.random();
  if (randomNumber < 1 / 3) return 'rock';
  if (randomNumber < 2 / 3) return 'paper';
  return 'scissors';
}

function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  updateScore();
  localStorage.removeItem('score');
}

function updateScore() {
  document.querySelector('.score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

let isAutoPlaying = false;
let intervalID;

function autoPlay() {
  const autoElmt = document.querySelector('.auto');
  if (!isAutoPlaying) {
    autoElmt.innerText = 'Stop Playing';
    intervalID = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
  } else {
    autoElmt.innerText = 'Auto Play';
    clearInterval(intervalID);
    isAutoPlaying = false;
  }
}

// Fixed Confirmation Logic
function showResetConfirmation() {
  const decisionElmt = document.querySelector('.decision');
  decisionElmt.innerHTML = `
    Are you sure you want to reset the score?
    <button class="yes-btn">Yes</button>
    <button class="no-btn">No</button>
  `;

  // Attach event listeners right after rendering the buttons
  document.querySelector('.yes-btn').addEventListener('click', () => {
    resetScore();
    decisionElmt.innerHTML = '';
  });

  document.querySelector('.no-btn').addEventListener('click', () => {
    decisionElmt.innerHTML = '';
  });
}
