import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';



const refs = {
    startBtn: document.querySelector('button[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds : document.querySelector('[data-seconds]'),
};

let countdownDate = null;

refs.startBtn.addEventListener('click', countdown)
refs.startBtn.disabled = true;


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        if (options.defaultDate > selectedDates[0]) {
            // return window.alert("Please choose a date in the future");
            Notify.failure("Please choose a date in the future");
            return;
        }
        
        Notify.success("Please press start");
        refs.startBtn.disabled = false;
        countdownDate = selectedDates[0];
        console.log(selectedDates[0]);
  },
};

flatpickr('#datetime-picker', options);

function countdown() {
const intervalId = setInterval(() => {
    const currentDate = Date.now();
    const counter = countdownDate - currentDate;
    const { days, hours, minutes, seconds } = convertMs(counter);
    refs.startBtn.disabled = true;
    
   if (counter <= 0) {
       clearInterval(intervalId);
       Notify.info('The countdown has finished!');
       return;
        }
    
    refs.days.textContent = days;
    refs.hours.textContent = hours;
    refs.minutes.textContent = minutes;
    refs.seconds.textContent = seconds;
    
}, 1000);
}




function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}