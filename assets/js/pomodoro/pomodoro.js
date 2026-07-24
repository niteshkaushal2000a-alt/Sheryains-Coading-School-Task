document.addEventListener('DOMContentLoaded', function(){
    updateDisplay();
})

let seconds = 0;
let timerInterval = null;

function updateDisplay() {

    const hrs = Math.floor(seconds / 3600);

    const mins = Math.floor(
        (seconds % 3600) / 60
    );

    const secs = seconds % 60;

    document.getElementById("timerText").textContent =
        `${String(hrs).padStart(2, "0")}:` +
        `${String(mins).padStart(2, "0")}:` +
        `${String(secs).padStart(2, "0")}`;
}

function startTimer() {

    if (timerInterval) return;
    timerInterval = setInterval(() => {
        seconds++;
        updateDisplay();
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    seconds = 0;
    updateDisplay();
}