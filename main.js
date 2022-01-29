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
  randomNumber = await getRandomNumber(URL);

  const inputElement = document.querySelector('.actions-container input');

  inputElement.addEventListener('keydown', event => {
    if (event.target.value.length > 2) {
      event.target.value = event.target.value.slice(0, 2);
    }
  });
});

async function handleClick() {
  const inputValue = document.querySelector('.actions-container input').value;
  console.log(inputValue)
  activateSegments(inputValue, 'hundreds');
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
  resetSegments();

  for (let segment of activeSegmentsPerNumber[number]) {
    document.querySelector(`.display .${position} .${segment}`).classList.add('active');
  }
}

function resetSegments() {
  const elements = document.querySelectorAll(`.display-number .segment`);

  for (let element of elements) {
    element.classList.remove('active')
  }
}
