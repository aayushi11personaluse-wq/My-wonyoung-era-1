// 🌸 Habit Tracker
const habits = document.querySelectorAll(".habit");

habits.forEach((habit, index) => {
    const saved = localStorage.getItem("habit-" + index);

    if (saved === "true") {
        habit.checked = true;
    }

    habit.addEventListener("change", () => {
        localStorage.setItem("habit-" + index, habit.checked);
    });
});


// 💧 Water Tracker
let waterCount = localStorage.getItem("water") || 0;

const waterText = document.getElementById("waterCount");
const addBtn = document.getElementById("addWater");
const resetBtn = document.getElementById("resetWater");

function updateWater() {
    waterText.textContent = `${waterCount} / 8 cups`;
    localStorage.setItem("water", waterCount);
}

addBtn.addEventListener("click", () => {
    if (waterCount < 8) {
        waterCount++;
        updateWater();
    }
});

resetBtn.addEventListener("click", () => {
    waterCount = 0;
    updateWater();
});

// initial load
updateWater();
// ⏱️ Pomodoro Timer

let timeLeft = 25 * 60; // 25 minutes in seconds
let timer = null;

const timeDisplay = document.getElementById("time");
const startBtn = document.getElementById("startTimer");
const pauseBtn = document.getElementById("pauseTimer");
const resetBtn = document.getElementById("resetTimer");

function updateTimerDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;

    timeDisplay.textContent =
        `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

startBtn.addEventListener("click", () => {
    if (!timer) {
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateTimerDisplay();
            } else {
                clearInterval(timer);
                timer = null;
                alert("⏰ Time’s up! Take a break 🌸");
            }
        }, 1000);
    }
});

pauseBtn.addEventListener("click", () => {
    clearInterval(timer);
    timer = null;
});

resetBtn.addEventListener("click", () => {
    clearInterval(timer);
    timer = null;
    timeLeft = 25 * 60;
    updateTimerDisplay();
});

// initial display
updateTimerDisplay();
