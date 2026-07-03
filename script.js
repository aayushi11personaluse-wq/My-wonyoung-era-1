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
