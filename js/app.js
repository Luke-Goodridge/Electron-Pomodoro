//Push notifications
const Push = require("push.js");

const formatToTime = (value) => {
  let minutes = Math.floor(value / 60);
  let seconds = Math.floor(value % 60);
  if (seconds < 10) seconds = "0" + seconds;
  return minutes + ":" + seconds;
};

const initialValue = 900;
let isPaused = true;
let timerValue = initialValue;
//tracks the paused value
let pausedTime;
//hold the setInterval function
let currentTimer;

const notify = () => {
  Push.create("Pomodoro", {
    body: "Time is up!",
    timeout: 3000,
    onClick: () => {
      window.focus();
      this.close();
    },
  });
};
const pauseBtn = document.querySelector("#pause");
const resetBtn = document.querySelector("#reset");

timer.innerHTML = formatToTime(initialValue);
pauseBtn.innerHTML = "Start";
pauseBtn.addEventListener("click", () => {
  if (isPaused) {
    pauseBtn.innerHTML = "Pause";
    startTimer(pausedTime);
  } else {
    pauseBtn.innerHTML = "Start";
    pauseTimer();
  }
  isPaused = !isPaused;
});
resetBtn.addEventListener("click", () => {
  console.log("Reset");
  resetTimer();
});

const startTimer = () => {
  currentTimer = setInterval(() => {
    timerValue--;
    pausedTime = timerValue;
    if (timerValue < 0) {
      clearInterval(currentTimer);
      notify();
      resetTimer();
    }
    timer.innerHTML = formatToTime(timerValue);
  }, 1000);
};

const resetTimer = () => {
  timerValue = initialValue;
  clearInterval(currentTimer);
  isPaused = true;
  pauseBtn.innerHTML = "Play";
  timer.innerHTML = formatToTime(timerValue);
};

const pauseTimer = () => {
  clearInterval(currentTimer);
  currentTimer = null;
};
