export default function ({ days, hours, mins, secs }) {
  const daysRef = document.querySelector('[data-value=days]');
  daysRef.textContent = days;
  const hoursRef = document.querySelector('[data-value=hours]');
  hoursRef.textContent = hours;
  const minutesRef = document.querySelector('[data-value=mins]');
  minutesRef.textContent = mins;
  const secondsRef = document.querySelector('[data-value=secs]');
  secondsRef.textContent = secs;
}
