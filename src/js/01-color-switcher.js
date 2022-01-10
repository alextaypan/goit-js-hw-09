const bodyRef = document.body;
const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');

btnStart.addEventListener('click', onClickBtnStart);

function onClickBtnStart() {
  const changedColorId = setInterval(() => {
    onClickBtnStart(getRandomHexColor);
  }, 1000);
  bodyRef.style.backgroundColor = getRandomHexColor();
  btnStop.removeAttribute('disabled');
  btnStart.setAttribute('disabled', true);
  btnStop.addEventListener('click', () => {
    clearInterval(changedColorId);
    btnStart.removeAttribute('disabled');
    btnStop.setAttribute('disabled', true);
  });
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
