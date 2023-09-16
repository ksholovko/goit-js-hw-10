const refs = {
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
    body: document.querySelector('body'),
};

let timerId = null;

refs.startBtn.addEventListener('click', getBackgroundColor);
refs.stopBtn.addEventListener('click', () => {
    clearTimeout(timerId);
    refs.startBtn.disabled = false;
});

function getBackgroundColor() {
    refs.body.style.backgroundColor = getRandomHexColor();
    refs.startBtn.disabled = true;

    timerId = setTimeout(getBackgroundColor, 1000);
}

// SECOND SOLUTION

// function getBackgroundColor() {
//   intervalId = setInterval(() => {
//    refs.body.style.backgroundColor = getRandomHexColor();
//    refs.startBtn.disabled = true;
//   }, 1000);
// }

// refs.stopBtn.addEventListener('click', () => {
//     clearInterval(intervalId);
//     refs.startBtn.disabled = false;
// });

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

