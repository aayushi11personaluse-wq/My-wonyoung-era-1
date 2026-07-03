                
// ======================
// 🌙 DARK MODE
// ======================
const darkBtn = document.getElementById("darkModeToggle");

darkBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
});

// load theme
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
}


// ======================
// 🌸 HABITS
// ======================
const habits = document.querySelectorAll(".habit");

habits.forEach((habit, index) => {
    const saved = localStorage.getItem("habit-" + index);
    if (saved === "true") habit.checked = true;

    habit.addEventListener("change", () => {
        localStorage.setItem("habit-" + index, habit.checked);
        updateProgress();
    });
});


// ======================
// 💧 WATER TRACKER
// ======================
let water = parseInt(localStorage.getItem("water")) || 0;

const waterText = document.getElementById("waterCount");
const addWater = document.getElementById("addWater");
const resetWater = document.getElementById("resetWater");

function updateWater() {
    waterText.textContent = `${water} / 8 cups`;
    localStorage.setItem("water", water);
}

addWater.addEventListener("click", () => {
    if (water < 8) {
        water++;
        updateWater();
    }
});

resetWater.addEventListener("click", () => {
    water = 0;
    updateWater();
});

updateWater();


// ======================
// ⏱️ TIMER (POMODORO)
// ======================
let timeLeft = 25 * 60;
let timer = null;

const timeDisplay = document.getElementById("time");
const startTimer = document.getElementById("startTimer");
const pauseTimer = document.getElementById("pauseTimer");
const resetTimer = document.getElementById("resetTimer");

function updateTimer() {
    let min = Math.floor(timeLeft / 60);
    let sec = timeLeft % 60;

    timeDisplay.textContent =
        `${min}:${sec < 10 ? "0" : ""}${sec}`;
}

startTimer.addEventListener("click", () => {
    if (!timer) {
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
                updateTimer();
            } else {
                clearInterval(timer);
                timer = null;
                alert("⏰ Break time! You did great 🌸");
            }
        }, 1000);
    }
});

pauseTimer.addEventListener("click", () => {
    clearInterval(timer);
    timer = null;
});

resetTimer.addEventListener("click", () => {
    clearInterval(timer);
    timer = null;
    timeLeft = 25 * 60;
    updateTimer();
});

updateTimer();


// ======================
// 📊 STREAK SYSTEM
// ======================
let streak = parseInt(localStorage.getItem("streak")) || 0;
let lastDate = localStorage.getItem("lastDate");

const streakText = document.getElementById("streakText");
const completeDay = document.getElementById("completeDay");

function today() {
    return new Date().toDateString();
}

function updateStreakUI() {
    streakText.textContent = `🔥 ${streak} day streak`;
}

if (lastDate === today()) {
    completeDay.disabled = true;
    completeDay.textContent = "Already done ✔";
}

completeDay.addEventListener("click", () => {
    if (lastDate !== today()) {
        streak++;
        lastDate = today();

        localStorage.setItem("streak", streak);
        localStorage.setItem("lastDate", lastDate);

        updateStreakUI();

        completeDay.disabled = true;
        completeDay.textContent = "Already done ✔";
    }
});

updateStreakUI();


// ======================
// 🎯 GOALS SYSTEM
// ======================
const goalInput = document.getElementById("goalInput");
const addGoal = document.getElementById("addGoal");
const goalList = document.getElementById("goalList");

let goals = JSON.parse(localStorage.getItem("goals")) || [];

function renderGoals() {
    goalList.innerHTML = "";

    goals.forEach((goal, index) => {
        const li = document.createElement("li");
        li.textContent = goal;

        li.addEventListener("click", () => {
            goals.splice(index, 1);
            saveGoals();
        });

        goalList.appendChild(li);
    });
}

function saveGoals() {
    localStorage.setItem("goals", JSON.stringify(goals));
    renderGoals();
}

addGoal.addEventListener("click", () => {
    if (goalInput.value.trim() !== "") {
        goals.push(goalInput.value);
        goalInput.value = "";
        saveGoals();
        updateProgress();
    }
});

renderGoals();


// ======================
// 📖 JOURNAL (AUTO SAVE)
// ======================
const journal = document.getElementById("journal");

journal.value = localStorage.getItem("journal") || "";

journal.addEventListener("input", () => {
    localStorage.setItem("journal", journal.value);
});


// ======================
// 📈 PROGRESS TRACKING
// ======================
const progressText = document.getElementById("progressText");

function updateProgress() {
    let done = 0;

    document.querySelectorAll(".habit").forEach(h => {
        if (h.checked) done++;
    });

    progressText.textContent = `Habits done today: ${done} / 4`;
}

setInterval(updateProgress, 1000);
updateProgress();
