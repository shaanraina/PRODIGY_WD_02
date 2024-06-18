let startTime = 0;
let elapsedTime = 0;
let intervalId;
let isRunning = false;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const laps = document.getElementById('laps');

startStopBtn.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(intervalId);
        isRunning = false;
        startStopBtn.textContent = 'Start';
        startStopBtn.style.backgroundColor = '#4CAF50';
    } else {
        startTime = Date.now() - elapsedTime;
        intervalId = setInterval(updateTime, 10);
        isRunning = true;
        startStopBtn.textContent = 'Pause';
        startStopBtn.style.backgroundColor = '#FFA500';
    }
});

resetBtn.addEventListener('click', () => {
    clearInterval(intervalId);
    isRunning = false;
    startStopBtn.textContent = 'Start';
    startStopBtn.style.backgroundColor = '#4CAF50';
    elapsedTime = 0;
    display.textContent = '00:00:00.00';
    laps.innerHTML = '';
});

lapBtn.addEventListener('click', () => {
    if (isRunning) {
        const lapTime = formatTime(elapsedTime);
        const lapItem = document.createElement('li');
        lapItem.textContent = lapTime;
        laps.appendChild(lapItem);
    }
});

function updateTime() {
    elapsedTime = Date.now() - startTime;
    display.textContent = formatTime(elapsedTime);
}

function formatTime(time) {
    const milliseconds = Math.floor((time % 1000) / 10);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 2)}`;
}

function pad(num, size = 2) {
    let s = "0" + num;
    return s.substr(s.length - size);
}