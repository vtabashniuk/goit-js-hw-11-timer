import timerMarkup from '../templates/timer.hbs';
import button from '../templates/button.hbs';
import timeMarkupUpdating from './time-markup-updating';
import getDividedTime from './get-divided-time';
import { btnActions, refs } from './variables';

document.querySelector('.date-input').insertAdjacentHTML('afterend', timerMarkup());
document.querySelector('#timer-1').insertAdjacentHTML('afterend', button(btnActions));
document.querySelector('[data-action=start]').disabled = true;

class CountDown {
  constructor({ onSecondChange, targetDate, selector }) {
    this.intervalId = null;
    this.targetDate = targetDate;
    this.onSecondChange = onSecondChange;
    this.selector = selector;
  }

  startCountDown() {
    document.querySelector('[data-action=start]').disabled = true;
    document.querySelector('[data-action=pick-a-date]').disabled = true;
    document.querySelector('[data-action=stop').disabled = false;
    document.querySelector('[name=target-date]').disabled = true;
    document.querySelector('[data-action=clear]').disabled = true;
    document.querySelector('[data-action=start]').classList.add('isActive');

    this.intervalId = setInterval(() => {
      let time = this.targetDate() - Date.now();
      let timeToDisplay = getDividedTime(time);
      this.onSecondChange(timeToDisplay);
    }, 1000);
  }

  stopCountDown() {
    clearInterval(this.intervalId);
    document.querySelector('[data-action=start]').disabled = false;
    document.querySelector('[data-action=clear]').disabled = false;
    document.querySelector('[data-action=start]').classList.remove('isActive');
  }
}

document.querySelector('[data-action=pick-a-date').disabled = true;
document.querySelector('[data-action=stop').disabled = true;
document.querySelector('[data-action=clear').disabled = true;

document.querySelector('[name=target-date]').addEventListener('change', () => {
  if (document.querySelector('[name=target-date]').value === '') {
    document.querySelector('[data-action=pick-a-date').disabled = true;
  }
  document.querySelector('[data-action=pick-a-date').disabled = false;
});

document.querySelector('[data-action=pick-a-date').addEventListener('click', () => {
  document.querySelector('[data-action=start]').disabled = false;
});

function getTargetDate() {
  document.querySelector('[name=target-date]').addEventListener('change', () => {});
  return document.querySelector('[name=target-date]').valueAsNumber;
}

const countDown = new CountDown({ onSecondChange: timeMarkupUpdating, targetDate: getTargetDate });

document
  .querySelector('[data-action=start]')
  .addEventListener('click', countDown.startCountDown.bind(countDown));

document
  .querySelector('[data-action=stop')
  .addEventListener('click', countDown.stopCountDown.bind(countDown));

document.querySelector('[data-action=clear]').addEventListener('click', () => {
  timeMarkupUpdating({});
  document.querySelector('[data-action=pick-a-date]').disabled = false;
  document.querySelector('[data-action=start]').disabled = true;
  document.querySelector('[name=target-date]').disabled = false;
});
