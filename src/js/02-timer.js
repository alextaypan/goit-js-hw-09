import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const btnStart = document.querySelector('[data-start]');
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
      alert('Please choose a date in the future');
    } else {
      btnStart.removeAttribute('disabled');
      console.log(chosenDate);
      console.log(Date.now());
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

function updateTimer({ days, hours, minutes, seconds }) {
  const delta = chosenDate - Date.now();
  const daysRef = document.querySelector('[data-days]');
  const hoursRef = document.querySelector('[data-hours]');
  const minsRef = document.querySelector('[data-minutes]');
  const secsRef = document.querySelector('[data-seconds]');
  daysRef.textContent = days;
  hoursRef.textContent = hours;
  minsRef.textContent = minutes;
  secsRef.textContent = seconds;
  btnStart.addEventListener('click', () => {
    setInterval(() => {
      updateTimer(delta);
    }, 1000);
  });
}

//   updateTimer(time) {
//     const currentTime = Date.now()
//     const delta = chosenDate - currentTime;

//     const daysEl = document.querySelector(`${this.selector} [data-value="days"]`)
//     const hoursEl = document.querySelector(`${this.selector} [data-value="hours"]`)
//     const minsEl = document.querySelector(`${this.selector} [data-value="mins"]`)
//     const secsEl = document.querySelector(`${this.selector} [data-value="secs"]`)
//     daysEl.textContent = Math.floor(time / (1000 * 60 * 60 * 24));
//     hoursEl.textContent = String(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))).padStart(2, '0')
//     minsEl.textContent = String(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0')
//     secsEl.textContent = String(Math.floor((time % (1000 * 60)) / 1000)).padStart(2, '0')

//     setInterval(() => {
//       updateTimer(delta)
//     }, 1000)
//   }
// }
