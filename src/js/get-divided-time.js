import timeFormating from './time-formating';

export default function (timeDiff) {
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = timeFormating(Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
  const mins = timeFormating(Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60)));
  const secs = timeFormating(Math.floor((timeDiff % (1000 * 60)) / 1000));

  return { days, hours, mins, secs };
}
