const habits = document.querySelectorAll(".habit");

// Load saved state
habits.forEach((habit, index) => {
    const saved = localStorage.getItem("habit-" + index);

    if (saved === "true") {
        habit.checked = true;
    }

    // Save when changed
    habit.addEventListener("change", () => {
        localStorage.setItem("habit-" + index, habit.checked);
    });
});
