// script.js
let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const timeDisplay = document.getElementById('time-display');
const startPauseButton = document.getElementById('start-pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const laps = document.getElementById('laps');

// Format time into "HH:MM:SS.MS"
function formatTime(ms) {
    const hours = Math.floor(ms / 3600000).toString().padStart(2, '0');
    const minutes = Math.floor((ms % 3600000) / 60000).toString().padStart(2, '0');
    const seconds = Math.floor((ms % 60000) / 1000).toString().padStart(2, '0');
    const milliseconds = Math.floor((ms % 1000) / 10).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function updateDisplay() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    timeDisplay.textContent = formatTime(elapsedTime);
}

// Start/Pause functionality
startPauseButton.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(timerInterval);
        elapsedTime += Date.now() - startTime;
        isRunning = false;
        startPauseButton.textContent = 'Start';
        resetButton.disabled = false;
        lapButton.disabled = true;
    } else {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateDisplay, 10);
        isRunning = true;
        startPauseButton.textContent = 'Pause';
        resetButton.disabled = true;
        lapButton.disabled = false;
    }
});

// Reset functionality
resetButton.addEventListener('click', () => {
    clearInterval(timerInterval);
    elapsedTime = 0;
    timeDisplay.textContent = '00:00:00.00';
    laps.innerHTML = '';
    isRunning = false;
    startPauseButton.textContent = 'Start';
    resetButton.disabled = true;
    lapButton.disabled = true;
});

// Lap functionality
lapButton.addEventListener('click', () => {
    const lapTime = document.createElement('li');
    lapTime.textContent = formatTime(elapsedTime);
    laps.appendChild(lapTime);
});
