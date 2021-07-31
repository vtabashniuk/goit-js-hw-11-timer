const { func } = require("assert-plus");
const { create } = require("core-js/core/object");
const { resolve } = require("q");

// const targetDate = new Date("August 1, 2021").getTime();
const refs = {
  days: document.querySelector(".days"),
  hours: document.querySelector(".hours"),
  mins: document.querySelector(".mins"),
  secs: document.querySelector(".secs"),
  targetDateFromCalendar: document.querySelector("#date-input"),
  startBtn: document.querySelector("[data-action=start]"),
  stopBtn: document.querySelector("[data-action=stop]"),
  clearBtn: document.querySelector("[data-action=clear]"),
};

const today = new Date();
refs.targetDateFromCalendar.min = `${today.getFullYear()}-${timeFormating(
  today.getMonth() + 1
)}-${timeFormating(today.getDate())}`;

function pickADate() {
  return (
    refs.targetDateFromCalendar.valueAsNumber +
    new Date().getTimezoneOffset() * 60000
  );
}

const datePromise = () => {
  return new Promise((resolve) => {
    let targetDate = pickADate();
    resolve(targetDate);
  });
};

function getDividedTime(timeDiff) {
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = timeFormating(
    Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  );
  const mins = timeFormating(
    Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))
  );
  const secs = timeFormating(Math.floor((timeDiff % (1000 * 60)) / 1000));

  return { days, hours, mins, secs };
}

function timeFormating(value) {
  return String(value).padStart(2, "0");
}

const timerIdPromise = (date) => {
  return new Promise((resolve) => {
    resolve(
      setInterval(() => {
        let timeDiff = date - Date.now();
        getDividedTime(timeDiff);
        refs.days.textContent = `DAYS: >>>>> ${getDividedTime(timeDiff).days}`;
        refs.hours.textContent = `HOURS (HH): >>>>> ${
          getDividedTime(timeDiff).hours
        }`;
        refs.mins.textContent = `MINUTES (MM): >>>>> ${
          getDividedTime(timeDiff).mins
        }`;
        refs.secs.textContent = `SECONDS (SS): >>>>> ${
          getDividedTime(timeDiff).secs
        }`;
      }, 1000)
    );
  });
};

let timerId = null;

refs.targetDateFromCalendar.addEventListener("change", () => {
  refs.startBtn.disabled = false;
  datePromise();
});

const timerIdChange = (timerID) => {
  timerId = timerID;
};

refs.startBtn.addEventListener("click", () => {
  refs.startBtn.disabled = true;
  refs.targetDateFromCalendar.disabled = true;
  datePromise().then(timerIdPromise).then(timerIdChange);
});

refs.stopBtn.addEventListener("click", () => {
  clearInterval(timerId);
  refs.targetDateFromCalendar.disabled = false;
});

refs.clearBtn.addEventListener("click", () => {
  refs.targetDateFromCalendar.value = "";
  clearInterval(timerId);
  refs.targetDateFromCalendar.disabled = false;
  refs.startBtn.disabled = true;
  refs.days.textContent = `DAYS: >>>>> ${""}`;
  refs.hours.textContent = `HOURS (HH): >>>>> ${""}`;
  refs.mins.textContent = `MINUTES (MM): >>>>> ${""}`;
  refs.secs.textContent = `SECONDS (SS): >>>>> ${""}`;
});

// refs.pickBtn.addEventListener('click', () => {
//      refs.startBtn.disabled = false;
// })

// let timerID = null;
// refs.startBtn.addEventListener("click", () => {
//   console.log('click "START"');
//   const targetDate1 = new Promise((resolve) => {
//     refs.targetDateFromCalendar.addEventListener("change", () => {});
//     let date =
//       refs.targetDateFromCalendar.valueAsNumber +
//       new Date().getTimezoneOffset() * 60000;
//     resolve(date);
//     console.log(date);
//     console.log("Picked date from CALENDAR", new Date(date));
//     timerID = startTimer(date);
//   });
// });

// // console.log(targetDate.getTime());

// refs.stopBtn.addEventListener("click", () => {
//     clearInterval(timerID);
//      refs.startBtn.disabled = false;
// });

// function startTimer(date) {
//     refs.startBtn.disabled = true;
//   return setInterval(() => {
//     let timeDiff = date - Date.now();
//     console.log("Date NOW >>>", new Date(Date.now()));
//     console.log("TARGET Date>>>", new Date(date));

//     getDividedTime(timeDiff);
//     refs.days.textContent = `DAYS: >>>>> ${getDividedTime(timeDiff).days}`;
//     refs.hours.textContent = `HOURS (HH): >>>>> ${
//       getDividedTime(timeDiff).hours
//     }`;
//     refs.mins.textContent = `MINUTES (MM): >>>>> ${
//       getDividedTime(timeDiff).mins
//     }`;
//     refs.secs.textContent = `SECONDS (SS): >>>>> ${
//       getDividedTime(timeDiff).secs
//     }`;

//     console.log(getDividedTime(timeDiff));
//   }, 1000);
// }

// function getDividedTime(timeDiff) {
//   const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
//   const hours = timeFormating(
//     Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
//   );
//   const mins = timeFormating(
//     Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))
//   );
//   const secs = timeFormating(Math.floor((timeDiff % (1000 * 60)) / 1000));

//   return { days, hours, mins, secs };
// }

// function timeFormating(value) {
//   return String(value).padStart(2, "0");
// }
