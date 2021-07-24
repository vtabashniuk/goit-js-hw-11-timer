import timerMarkup from '../templates/timer.hbs';
import button from '../templates/button.hbs';

const btnActions = [{ name: 'start' }, { name: 'stop' }, { name: 'clear' }];

document.querySelector('body').insertAdjacentHTML('afterbegin', timerMarkup());
document.querySelector('body').insertAdjacentHTML('afterbegin', button(btnActions));

let intervalId = null;
const someDate = new Date('Jul 25, 2021');

document.querySelector('[data-action=start]').addEventListener('click', startTimer);

document.querySelector('[data-action=stop').addEventListener('click', stopTimer);

console.log(someDate.getTime());

console.log((someDate - Date.now()) / 1000);
function startTimer() {
  intervalId = setInterval(() => {
    let time = someDate - Date.now();
    const days = Math.floor(time / (1000 * 60 * 60 * 24));

    /*
     * Оставшиеся часы: получаем остаток от предыдущего расчета с помощью оператора
     * остатка % и делим его на количество миллисекунд в одном часе
     * (1000 * 60 * 60 = миллисекунды * минуты * секунды)
     */
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    /*
     * Оставшиеся минуты: получаем оставшиеся минуты и делим их на количество
     * миллисекунд в одной минуте (1000 * 60 = миллисекунды * секунды)
     */
    const mins = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));

    /*
     * Оставшиеся секунды: получаем оставшиеся секунды и делим их на количество
     * миллисекунд в одной секунде (1000)
     */
    const secs = Math.floor((time % (1000 * 60)) / 1000);
    console.log(`Days: ${days} | Hours: ${hours} | Minutes: ${mins} | Seconds: ${secs}`);
  }, 1000);
}
function stopTimer() {
  clearInterval(intervalId);
}
// // clearInterval(intervalId);
