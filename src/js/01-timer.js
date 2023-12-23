import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import flatpickr from 'flatpickr';
import 'izitoast/dist/css/iziToast.min.css';

const input = document.querySelector('input[id="datetime-picker"]');
const btn = document.querySelector('button[data-start]');
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');

btn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const pickDate = new Date(selectedDates[0]);
    const currentDate = new Date();
    currentDate.setSeconds(0, 0);

    if (currentDate.getTime() >= pickDate.getTime()) {
      iziToast.warning({
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      btn.disabled = true;
    } else {
      btn.disabled = false;
      userSelectedDate = new Date(selectedDates[0]);
    }
  },
};

let userSelectedDate = new Date();
flatpickr(input, options);

function handleStart() {
  const now = new Date();
  if (userSelectedDate > now) {
    updateTimer(userSelectedDate - now);

    const timerIntervalId = setInterval(() => {
      const remainingTime = userSelectedDate - new Date();
      if (remainingTime <= 0) {
        clearInterval(timerIntervalId);
        updateTimerDisplay();
      } else {
        updateTimer(remainingTime);
      }
    }, 1000);
  }
}

function updateTimer(ms) {
  const {
    days: daysValue,
    hours: hoursValue,
    minutes: minutesValue,
    seconds: secondsValue,
  } = convertMs(ms);

  days.textContent = addLeadingZero(daysValue);
  hours.textContent = addLeadingZero(hoursValue);
  minutes.textContent = addLeadingZero(minutesValue);
  seconds.textContent = addLeadingZero(secondsValue);
}

btn.addEventListener('click', handleStart);

function updateTimerDisplay(ms) {
  if (ms <= 0) {
    days.textContent = '00';
    hours.textContent = '00';
    minutes.textContent = '00';
    seconds.textContent = '00';
  } else {
    const { days, hours, minutes, seconds } = convertMs(ms);
  }
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value >= 0 && value < 10
    ? value.toString().padStart(2, '0')
    : value.toString();
}
