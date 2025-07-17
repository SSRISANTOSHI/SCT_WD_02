let startTime, elapsedTime = 0, timerInterval, countdownInterval;
let isRunning = false, isCountdown = false;

const display = document.getElementById('display');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const saveBtn = document.getElementById('saveSession');
const lapsList = document.getElementById('laps');
const modeToggle = document.getElementById('modeToggle');
const countdownInput = document.getElementById('countdownInput');
const darkToggle = document.getElementById('darkModeToggle');
const themeSelect = document.getElementById('theme');
const themeBox = document.getElementById('themeBox');
const beep = document.getElementById('beep');
const viewBtn = document.getElementById("viewSessions");
const sessionList = document.getElementById("sessionList");
const clearAllBtn = document.getElementById("clearAllSessions");

function formatTime(ms) {
  let hrs = Math.floor(ms / 3600000);
  let mins = Math.floor((ms % 3600000) / 60000);
  let secs = Math.floor((ms % 60000) / 1000);
  return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function updateDisplay(ms) {
  display.textContent = formatTime(ms);
}

function speak(text) {
  const msg = new SpeechSynthesisUtterance(text);
  msg.lang = 'en-US';
  msg.pitch = 1;
  msg.rate = 1;
  window.speechSynthesis.speak(msg);
}

function playBeep() {
  beep.currentTime = 0;
  beep.volume = 1.0;
  beep.muted = false;
  beep.play().catch((e) => {
    console.warn("Beep error:", e);
  });
}

function startTimer() {
  if (isCountdown) {
    let countdown = parseInt(countdownInput.value) * 1000;
    if (isNaN(countdown) || countdown <= 0) return alert("Enter valid countdown time");
    countdownInput.disabled = true;
    elapsedTime = countdown;
    updateDisplay(elapsedTime);
    countdownInterval = setInterval(() => {
      elapsedTime -= 1000;
      updateDisplay(elapsedTime);

      if (elapsedTime <= 10000 && elapsedTime > 0) {
        playBeep();
        display.classList.add("flash-warning");
      }

      if (elapsedTime <= 0) {
        clearInterval(countdownInterval);
        isRunning = false;
        playBeep();
        display.classList.remove("flash-warning");
        speak("Time's up!");
        alert("⏰ Countdown complete!");
      }
    }, 1000);
  } else {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updateDisplay(elapsedTime);

      if (elapsedTime % 60000 < 1000) {
        playBeep();
        speak(`${Math.floor(elapsedTime / 60000)} minutes passed`);
      }
    }, 1000);
  }
  isRunning = true;
}

function pauseTimer() {
  if (isCountdown) {
    clearInterval(countdownInterval);
  } else {
    clearInterval(timerInterval);
  }
  isRunning = false;
}

function resetTimer() {
  pauseTimer();
  elapsedTime = 0;
  updateDisplay(0);
  lapsList.innerHTML = "";
  countdownInput.disabled = !isCountdown;
  display.classList.remove("flash-warning");
}

function recordLap() {
  if (isRunning && !isCountdown) {
    const li = document.createElement('li');
    li.textContent = `Lap: ${formatTime(elapsedTime)}`;
    lapsList.appendChild(li);
  }
}

function saveSession() {
  const session = {
    time: formatTime(elapsedTime),
    date: new Date().toLocaleString(),
    laps: Array.from(lapsList.children).map(li => li.textContent)
  };
  let history = JSON.parse(localStorage.getItem("sessions") || "[]");
  history.push(session);
  localStorage.setItem("sessions", JSON.stringify(history));
  alert("✅ Session saved!");
}

function viewSessions() {
  sessionList.innerHTML = "";
  let history = JSON.parse(localStorage.getItem("sessions") || "[]");
  if (history.length === 0) {
    sessionList.innerHTML = "<li>No sessions saved.</li>";
    return;
  }

  history.forEach((session, i) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${i + 1}. ${session.date}</strong><br/>
      Time: ${session.time}<br/>
      Laps: ${session.laps.length}
      <br/>
      <button class="delete-btn" data-index="${i}">🗑️ Delete</button>
    `;
    sessionList.appendChild(li);
  });

  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.onclick = () => {
      const index = btn.dataset.index;
      if (confirm("Are you sure you want to delete this session?")) {
        let history = JSON.parse(localStorage.getItem("sessions") || "[]");
        history.splice(index, 1);
        localStorage.setItem("sessions", JSON.stringify(history));
        viewSessions();
      }
    };
  });
}

clearAllBtn.onclick = () => {
  if (confirm("Are you sure you want to delete all sessions?")) {
    localStorage.removeItem("sessions");
    viewSessions();
    alert("🧼 All sessions cleared!");
  }
};

themeSelect.addEventListener("change", () => {
  themeBox.className = 'box';
  themeBox.classList.add(themeSelect.value);
  if (darkToggle.checked) themeBox.classList.add("dark");
});

darkToggle.addEventListener("change", () => {
  if (darkToggle.checked) {
    themeBox.classList.add("dark");
  } else {
    themeBox.classList.remove("dark");
  }
});

modeToggle.addEventListener("change", () => {
  isCountdown = modeToggle.checked;
  countdownInput.disabled = !isCountdown;
  resetTimer();
});

startBtn.onclick = startTimer;
pauseBtn.onclick = pauseTimer;
resetBtn.onclick = resetTimer;
lapBtn.onclick = recordLap;
saveBtn.onclick = saveSession;
viewBtn.onclick = viewSessions;

updateDisplay(0);
