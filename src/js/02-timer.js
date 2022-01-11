import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const btnStart = document.querySelector('[data-start]');
const daysRef = document.querySelector('[data-days]');
const hoursRef = document.querySelector('[data-hours]');
const minsRef = document.querySelector('[data-minutes]');
const secsRef = document.querySelector('[data-seconds]');
btnStart.setAttribute('disabled', true);

let chosenDate = null;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);
    chosenDate = selectedDates[0].getTime();
    if (chosenDate < Date.now()) {
      Notify.failure('Please choose a date in the future');
    } else {
      btnStart.removeAttribute('disabled');
      // console.log(chosenDate);
      // console.log(Date.now());
    }
  },
};

flatpickr('#datetime-picker', options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(differentTime));

function addLeadingZero({ days, hours, minutes, seconds }) {
  daysRef.textContent = String(days).padStart(2, '0');
  hoursRef.textContent = String(hours).padStart(2, '0');
  minsRef.textContent = String(minutes).padStart(2, '0');
  secsRef.textContent = String(seconds).padStart(2, '0');
}

btnStart.addEventListener('click', () => {
  setInterval(() => {
    const delta = chosenDate - Date.now();
    addLeadingZero(convertMs(delta));
  }, 1000);
});
