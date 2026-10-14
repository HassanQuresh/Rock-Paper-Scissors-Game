let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};
updateScore();
document.querySelector('.rock-btn').addEventListener('click',() => playGame('rock'));
document.querySelector('.paper-btn').addEventListener('click',() => playGame('paper'));
document.querySelector('.scissors-btn').addEventListener('click',() => playGame('scissors'));
// document.querySelector('.reset').addEventListener('click',() => {resetScore()});
document.querySelector('.auto').addEventListener('click',() => {autoPlay()});
document.body.addEventListener('keydown',(event) => {
  if(event.key === 'r'){
    playGame('rock');
  } else if(event.key === 'p'){
    playGame('paper');
  } else if(event.key === 's'){
    playGame('scissors');
  } else if(event.key === 'a'){
    autoPlay();
  } else if (event.key === 'Backspace'){

    resetScore();
    console.log('reseted');
  };
});
function playGame(playerMove){
  const computerMove = pickComputerMove();
  let result = '';
  if(playerMove === 'scissors'){
    if(computerMove === 'paper'){
    result = 'You win!!!';
  } else if (computerMove === 'rock'){
    result = 'You lose';
  } else if(computerMove === 'scissors'){
    result = 'Tie.';
  };
  } else if(playerMove === 'paper'){
    if(computerMove === 'paper'){
      result = 'Tie.';
    } else if (computerMove === 'rock'){
      result = 'You win!!!'
    } else if(computerMove === 'scissors'){
      result = 'You lose';
    }
  } else if(playerMove === 'rock'){
    if(computerMove === 'paper'){
      result = 'You lose';
    } else if (computerMove === 'scissors'){
      result = 'You win!!!'  
    } else if(computerMove === 'rock'){
      result = 'Tie.'
    };
  };
  if(result === 'You win!!!'){
    score.wins++;
  } else if(result === 'You lose'){
    score.losses++;
  } else if(result === 'Tie.'){
    score.ties++;
  }
  localStorage.setItem('score',JSON.stringify(score));
  document.querySelector('.result').innerHTML = `${result}`;
  document.querySelector('.moves').innerHTML = `You <img src="${playerMove}-emoji.png" class="img">
  <img src="${computerMove}-emoji.png" class="img"> Computer`;
  updateScore();
};
function pickComputerMove(){
  const randomNumber = Math.random();
  let computerMove = '';
  if(randomNumber < 1/3){
    computerMove = 'rock';
  } else if(randomNumber < 2/3){
    computerMove = 'paper';
  } else {
    computerMove = 'scissors';
  }
  return computerMove;
};
function resetScore(){
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  updateScore();
  localStorage.removeItem('score');
};
function updateScore(){
    document.querySelector('.score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
};
let isAutoPlaying = false;
let intervalID;
function autoPlay(){
  const autoElmt = document.querySelector('.auto');
  if(!isAutoPlaying){
    autoElmt.innerText = 'Stop Playing';
    intervalID = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    },1000)
    isAutoPlaying = true;
  }else {
    autoElmt.innerText = 'Auto Play'
    clearInterval(intervalID);
    isAutoPlaying = false;
  };
};
function resetConfirmation(){
  document.querySelector('.reset').addEventListener('click',()=>{
    document.querySelector('.decision').innerHTML = 
    'Are you sure you want to reset the score?<button class="yesBtn">Yes</button><button class="noBtn">No</button>';
    document.querySelector('.yesBtn').addEventListener('click',onYes);
    document.querySelector('.noBtn').addEventListener('click',onNo);
  });
};
function onYes(){
  resetScore();
  document.querySelector('.decision').innerHTML = '';
};
function onNo(){
  document.querySelector('.decision').innerHTML = '';
}
resetConfirmation();
