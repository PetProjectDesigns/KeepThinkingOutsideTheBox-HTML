// Current Time
setInterval(() => {
  const now = new Date();
  document.getElementById("clock").textContent = now.toLocaleTimeString();
}, 1000);

// Stopwatch
let stopwatchInterval;
let stopwatchTime = 0;

function updateStopwatch() {
  const hrs = String(Math.floor(stopwatchTime / 3600)).padStart(2, '0');
  const mins = String(Math.floor((stopwatchTime % 3600) / 60)).padStart(2, '0');
  const secs = String(stopwatchTime % 60).padStart(2, '0');
  document.getElementById("stopwatch-display").textContent = `${hrs}:${mins}:${secs}`;
}

function startStopwatch() {
  if (!stopwatchInterval) {
    stopwatchInterval = setInterval(() => {
      stopwatchTime++;
      updateStopwatch();
    }, 1000);
  }
}

function stopStopwatch() {
  clearInterval(stopwatchInterval);
  stopwatchInterval = null;
}

function resetStopwatch() {
  stopStopwatch();
  stopwatchTime = 0;
  updateStopwatch();
}

// Countdown Timer
let countdownInterval;
function startCountdown() {
  let minutes = parseInt(document.getElementById("countdown-minutes").value);
  let time = minutes * 60;
  countdownInterval = setInterval(() => {
    if (time <= 0) {
      clearInterval(countdownInterval);
      alert("Time's up!");
    } else {
      time--;
      const mins = String(Math.floor(time / 60)).padStart(2, '0');
      const secs = String(time % 60).padStart(2, '0');
      document.getElementById("countdown-display").textContent = `${mins}:${secs}`;
    }
  }, 1000);
}

function resetCountdown() {
  clearInterval(countdownInterval);
  document.getElementById("countdown-display").textContent = "00:00";
}

// Pomodoro Timer
let pomodoroInterval;
let pomodoroTime = 25 * 60;

function updatePomodoro() {
  const mins = String(Math.floor(pomodoroTime / 60)).padStart(2, '0');
  const secs = String(pomodoroTime % 60).padStart(2, '0');
  document.getElementById("pomodoro-display").textContent = `${mins}:${secs}`;
}

function startPomodoro() {
  pomodoroTime = 25 * 60;
  runPomodoro();
}

function startBreak() {
  pomodoroTime = 5 * 60;
  runPomodoro();
}

function runPomodoro() {
  clearInterval(pomodoroInterval);
  updatePomodoro();
  pomodoroInterval = setInterval(() => {
    if (pomodoroTime <= 0) {
      clearInterval(pomodoroInterval);
      alert("Pomodoro complete!");
    } else {
      pomodoroTime--;
      updatePomodoro();
    }
  }, 1000);
}

function resetPomodoro() {
  clearInterval(pomodoroInterval);
  pomodoroTime = 25 * 60;
  updatePomodoro();
}
