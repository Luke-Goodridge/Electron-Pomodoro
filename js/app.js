//Push notifications
const Push = require("push.js");

//function to convert time in seconds to a time display
const formatToTime = (value) => {
  let minutes = Math.floor(value / 60);
  let seconds = Math.floor(value % 60);
  if (seconds < 10) seconds = "0" + seconds;
  return minutes + ":" + seconds;
};

const initialValue = 1500;
const beginTimerText = "Start";
const pauseTimerText = "Pause";
const longBreakSeconds = 900;
const shortBreakSeconds = 300;
let isPaused = true;
let timerValue = initialValue;
let currentTimer;

const notify = () => {
  Push.create("Pomodoro", {
    body: "Time is up!",
    icon: "./images/tomato.png",
    timeout: 3000,
    onClick: () => {
      window.focus();
    },
  });
};
const pauseBtn = document.querySelector("#pause");
const resetBtn = document.querySelector("#reset");
const longBreakBtn = document.querySelector(".long-btn");
const shortBreakBtn = document.querySelector(".short-btn");

console.log(longBreakBtn, shortBreakBtn);

//Inital state
timer.innerHTML = formatToTime(initialValue);
pauseBtn.innerHTML = beginTimerText;

const startTimer = () => {
  currentTimer = setInterval(() => {
    timerValue--;
    if (timerValue < 0) {
      clearInterval(currentTimer);
      notify();
      resetTimer(initialValue);
    }
    timer.innerHTML = formatToTime(timerValue);
  }, 1000);
};

//Timer logic
const resetTimer = (time) => {
  timerValue = time;
  clearInterval(currentTimer);
  isPaused = true;
  pauseBtn.innerHTML = beginTimerText;
  timer.innerHTML = formatToTime(timerValue);
};

const pauseTimer = () => {
  clearInterval(currentTimer);
  currentTimer = null;
};

//Listeners
resetBtn.addEventListener("click", () => resetTimer(initialValue));
longBreakBtn.addEventListener("click", () => resetTimer(longBreakSeconds));
shortBreakBtn.addEventListener("click", () => resetTimer(shortBreakSeconds));

//Listeners
pauseBtn.addEventListener("click", () => {
  if (isPaused) {
    pauseBtn.innerHTML = pauseTimerText;
    startTimer();
  } else {
    pauseBtn.innerHTML = beginTimerText;
    pauseTimer();
  }
  isPaused = !isPaused;
});
