import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form : document.querySelector('.form'),
  delayInput : document.querySelector('input[name="delay"]'),
  stepInput : document.querySelector('input[name="step"]'),
  amountInput : document.querySelector('input[name="amount"]'),
}

refs.form.addEventListener('submit', submitForm);

function submitForm(e) {
  e.preventDefault();
  
const delayValue = parseInt(refs.delayInput.value);
const stepValue = parseInt(refs.stepInput.value);
const amountValue = parseInt(refs.amountInput.value);

   for (let i = 0; i < amountValue; i++) {
    createPromise(i + 1, delayValue + i * stepValue).then(({ position, delay }) => {
    Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)
  })
      .catch(({ position, delay }) => {
    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
  }
}
   

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } 
        reject({ position, delay });
    
    }, delay);
  });
}

