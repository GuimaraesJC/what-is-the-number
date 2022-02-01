const MIN = 1;
const MAX = 300;

const URL = `https://us-central1-ss-devops.cloudfunctions.net/rand?min=${MIN}&max=${MAX}`;

let randomNumber;

async function getRandomNumber(url) {
  const response = await fetch(url);
  const data = await response.json();

  return data.value ? data.value : data.StatusCode;
}

document.addEventListener("DOMContentLoaded", async () => {
  startNewGame();
});

async function handleClick() {
  resetSegments();

  const guess = document.querySelector('.actions-container input').value;

  if (guess === '') {
    return;
  }

  if (Number(guess) < 0) {
    alert('Try to be more positive ;)');
    return;
  }

  displayNumbers(guess);
}

function displayNumbers(guess) {
  switch (guess.length) {
    case 1:
      activateSegments(guess, 'units');
      break;

    case 2:
      activateSegments(guess.split('')[0], 'dozens');
      activateSegments(guess.split('')[1], 'units');
      break;

    case 3:
      activateSegments(guess.split('')[0], 'hundreds');
      activateSegments(guess.split('')[1], 'dozens');
      activateSegments(guess.split('')[2], 'units');
      break;

    default:
      alert('Try to be a little more... modest ;)');
  }
}

const activeSegmentsPerNumber = {
  0: ['top', 'top-left', 'top-right', 'bottom-left', 'bottom-right', 'bottom'],
  1: ['top-right', 'bottom-right'],
  2: ['top', 'top-right', 'center', 'bottom-left', 'bottom'],
  3: ['top', 'top-right', 'center', 'bottom-right', 'bottom'],
  4: ['top-left', 'top-right', 'center', 'bottom-right'],
  5: ['top', 'top-left', 'center', 'bottom-right', 'bottom'],
  6: ['top', 'top-left', 'center', 'bottom-left', 'bottom-right', 'bottom'],
  7: ['top', 'top-right', 'bottom-right'],
  8: ['top', 'top-left', 'top-right', 'center', 'bottom-left', 'bottom-right', 'bottom'],
  9: ['top', 'top-left', 'top-right', 'center', 'bottom-right', 'bottom'],
}

function activateSegments(number, position) {
  for (let segment of activeSegmentsPerNumber[number]) {
    document.querySelector(`.display .${position} .${segment}`).classList.add('active');
  }
}

function resetSegments() {
  const segments = document.querySelectorAll(`.display-number .segment`);

  for (let segment of segments) {
    segment.classList.remove('active');
  }
}

function showNewMatchButton() {
  const button = document.querySelector('.new-match');

  button.classList.remove('hidden');
}

function hideNewMatchButton() {
  const button = document.querySelector('.new-match');

  button.classList.add('hidden');
}

async function startNewGame() {
  resetSegments();

  randomNumber = await getRandomNumber(URL);

  console.log(randomNumber); // TODO: REMOVER

  if (randomNumber === 502) {
    displayNumbers(String(randomNumber));
    showNewMatchButton();

    return;
  }

  hideNewMatchButton();
}
