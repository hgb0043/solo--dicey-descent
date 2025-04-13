let randomNumber
let currentOutcomesArray = localStorage.getItem('current-outcomes-array') || [];
let outcomeElement;
let livesRemainingArray = localStorage.getItem('scores-array') ||  [2,2,2,2];
let roundNumber = 0;

let eliminatingArray = [];
let resultsArray = [];
let shuffledEliminatingArray = [];
let survivingArray1 = [];
let survivingArray2 = [];
let shuffledArray1 = [];

function runGameRound() {
  eliminatingArray = [];
  shuffledEliminatingArray = [];

  determineRound();
  determineOutcomes();
  displayOutcomes();
  updateScore();
  updateResult();
  localStorage.setItem('roundsDisplayed', 'true');
}

document.querySelector('.js-play-button').addEventListener('click', () => {
  runGameRound();
});

function determineRound() {
  roundNumber++;
  let playButtonElement = document.querySelector('.js-play-button');
  let allRoundSections = document.querySelectorAll('.js-round-display');
  let resultsSectionElement = allRoundSections[allRoundSections.length - 1];

  if (roundNumber < 3) {
  playButtonElement.innerHTML = `PLAY ROUND ${roundNumber + 1}`;
  } else {
    playButtonElement.classList.add('hidden');
    resultsSectionElement.classList.remove('hidden');
  }
  }

function determineOutcomes() {
  currentOutcomesArray = [];

  for(let i = 0; i<= 3; i++) {
    randomNumber = Math.random();
    if(randomNumber < 0.5) {
      currentOutcomesArray.push(0);
    } else if(randomNumber > 0.5) {
      currentOutcomesArray.push(1);
    }
  }
  localStorage.setItem('current-outcomes-array', currentOutcomesArray);
}

function displayOutcomes() {
  console.log(`Round Number: ${roundNumber}`);
  for(let i = 1; i <= currentOutcomesArray.length; i++) {
    let outcomeElement = document.getElementById(`outcome-${roundNumber}-${i}`);
    if(currentOutcomesArray[i-1] === 1 && livesRemainingArray[i-1] > 0) {
      outcomeElement.innerHTML = `<i class="fas fa-sun fa-3x"></i> <p>Lives remaining: ${livesRemainingArray[i-1]}</p>`;
    } else if (currentOutcomesArray[i-1] === 0 && livesRemainingArray[i-1] > 0) {
      outcomeElement.innerHTML = `<i class="fas fa-cloud fa-3x"></i> <p>Lives remaining: ${livesRemainingArray[i-1]-1}</p>`;
    } else {
      outcomeElement.innerHTML = `<i class="fas fa-cloud fa-3x hide"></i> <p>Eliminated in round 2</p>`;
    }
  }
}

function updateScore() {
  console.log(`Round Result: ${currentOutcomesArray}`);
  for(let i = 0; i < currentOutcomesArray.length; i++) {
    if(currentOutcomesArray[i] === 0 && livesRemainingArray[i] > 0) {
      livesRemainingArray[i]--;
    } else if (livesRemainingArray[i] === 0) {
      livesRemainingArray[i] = 'eliminated';
    }
  localStorage.setItem('livesRemainingArray', livesRemainingArray);
  scoreElement = document.getElementById(`js-score-${i+1}`)
    scoreElement.innerHTML = `Lives remaining: ${livesRemainingArray[i]}`;
  }
  console.log(`Lives Remaining: ${livesRemainingArray}`);
}

function updateResult() {
  eliminatingArray = [];
  for (let i = 0; i < livesRemainingArray.length; i++) {
    if ((livesRemainingArray[i] === 0)) {
      eliminatingArray.push(i+1)
    }
  }
  if (eliminatingArray.length === 1) {
    resultsArray.unshift(eliminatingArray[0]);
  } else if(eliminatingArray.length > 1) {
    tiebreaker(eliminatingArray);
  }
  if (roundNumber === 3) {
    pushSurvivors();
  }
  console.log('Eliminating Array:', eliminatingArray);
  console.log('Results Array:', resultsArray);
}

function tiebreaker(array1) {
   shuffledArray1 = shuffleArray(array1);
 console.log(shuffledArray1);

 for(let i = 0; i < shuffledArray1.length; i++) {
  resultsArray.unshift(shuffledArray1[i]);
 }
 console.log(resultsArray);
}

function shuffleArray(array) {
  for(var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

function pushSurvivors() {
  for (let i = 0; i < livesRemainingArray.length; i++) {
    if (livesRemainingArray[i] === 1) {
      survivingArray1.push(i+1);
    } else if(livesRemainingArray[i] === 2) {
      survivingArray2.push(i+1);
    }
  }
    if (survivingArray1.length === 1) {
      resultsArray.unshift(survivingArray1[0]);
    }
    else if (survivingArray1.length > 1) {
      tiebreaker(survivingArray1);
    } 
    
    if (survivingArray2.length === 1) {
      resultsArray.unshift(survivingArray2[0]);
    }
    else if (survivingArray2.length > 1) {
      tiebreaker(survivingArray2);
    } 
  }
