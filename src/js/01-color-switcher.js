const bodyRef = document.body;
const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let changedColorId = null;
btnStart.addEventListener('click', () => {
  changedColorId = setInterval(() => {
    bodyRef.style.backgroundColor = getRandomHexColor();
  }, 1000);
  btnStop.removeAttribute('disabled');
  btnStart.setAttribute('disabled', true);
});

btnStop.addEventListener('click', () => {
  clearInterval(changedColorId);
  btnStart.removeAttribute('disabled');
  btnStop.setAttribute('disabled', true);
});
