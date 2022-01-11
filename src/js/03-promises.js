import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  submitRef: document.querySelector('.form'),
  delayRef: document.querySelector('input[name=delay]'),
  stepRef: document.querySelector('input[name=step]'),
  amountRef: document.querySelector('input[name=amount]'),
};

// const form = document.querySelector('.form');
// const delayFirst = document.querySelector('input[name=delay]');
// const delayStep = document.querySelector('input[name=step]');
// const amounts = document.querySelector('input[name=amount]');

refs.submitRef.addEventListener('submit', event => {
  event.preventDefault();

  const quantity = +refs.amountRef.value;
  const firstDelay = +refs.delayRef.value;
  const stepDelay = +refs.stepRef.value;

  let delay = firstDelay;
  for (let position = 1; position <= quantity; ++position) {
    if (position !== 1) {
      delay += stepDelay;
    } else {
      delay;
    }

    function createPromise(position, delay) {
      return new Promise((res, rej) => {
        setTimeout(() => {
          let shouldResolve = Math.random() > 0.3;
          if (shouldResolve) {
            res({ position, delay });
          } else {
            rej({ position, delay });
          }
        }, delay);
      });
    }

    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
  }
});

// function createPromise(position, delay) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       const shouldResolve = Math.random() > 0.3;
//       if (shouldResolve) {
//         resolve({ position, delay });
//       } else {
//         reject({ position, delay });
//       }
//     }, delay);
//   });
// }

// refs.submitBtn.addEventListener('submit', () => {
//   if (refs.amountRef.target.value === createPromise())
//     createPromise(2, 1500)
//       .then(({ position, delay }) => {
//         console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//       })
//       .catch(({ position, delay }) => {
//         console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//       });
// });
