import timerMarkup from '../templates/timer.hbs';
import button from '../templates/button.hbs';

const btnActions = [{ name: 'start' }, { name: 'stop' }, { name: 'clear' }];

document.querySelector('body').insertAdjacentHTML('afterbegin', button(btnActions));
document.querySelector('body').insertAdjacentHTML('afterbegin', timerMarkup());

function updateTimerMarkup({ days, hours, mins, secs }) {
  const ddd = document.querySelector('[data-value=days]');
  ddd.textContent = days;
  const hhh = document.querySelector('[data-value=hours]');
  hhh.textContent = hours;
  const mmm = document.querySelector('[data-value=mins]');
  mmm.textContent = mins;
  const sss = document.querySelector('[data-value=secs]');
  sss.textContent = secs;
}
let intervalId = null;
const someDate = new Date('Jul 26, 2021');

function timeFormat(timeDiff) {
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((timeDiff % (1000 * 60)) / 1000);

  return { days, hours, mins, secs };
}

document.querySelector('[data-action=start]').addEventListener('click', startTimer);

document.querySelector('[data-action=stop').addEventListener('click', stopTimer);

document.querySelector('[data-action=clear]').addEventListener('click', () => {
  updateTimerMarkup({});
});

function startTimer() {
  document.querySelector('[data-action=start]').disabled = true;
  document.querySelector('[data-action=start]').classList.add('isActive');
  intervalId = setInterval(() => {
    let time = someDate - Date.now();
    let timeToDisplay = timeFormat(time);
    updateTimerMarkup(timeToDisplay);
    console.log(
      `Days: ${timeToDisplay.days} | Hours: ${timeToDisplay.hours} | Minutes: ${timeToDisplay.mins} | Seconds: ${timeToDisplay.secs}`,
    );
  }, 1000);
}

function stopTimer() {
  clearInterval(intervalId);
  document.querySelector('[data-action=start]').disabled = false;
  document.querySelector('[data-action=start]').classList.remove('isActive');
}
// // clearInterval(intervalId);
