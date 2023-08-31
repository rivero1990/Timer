const startButtonTimer = document.querySelector("#start-button");
const countdownTimer = document.querySelector("#countdown");
const hoursInput = document.querySelector("#hours");
const minutesInput = document.querySelector("#minutes");
const secondsInput = document.querySelector("#seconds");

let intervalId;
let totalSeconds;
let pausedTime;


/**
 * Starts and controls the behavior of the timer according to the entered values
 * @returns Avoid starting the timer with the wrong time
 */
function startTimer() {

    let hours = parseInt(hoursInput.value) || 0;
    let minutes = parseInt(minutesInput.value) || 0;
    let seconds = parseInt(secondsInput.value) || 0;

    if (hours === 0 && minutes === 0 && seconds === 0) {
        countdownTimer.textContent = "Invalid Time Entered";
        return;
    }

    if (totalSeconds === undefined) {
        totalSeconds = hours * 3600 + minutes * 60 + seconds;
    } else if (pausedTime !== undefined) {
        totalSeconds = pausedTime;
        pausedTime = undefined;
    }

    clearInterval(intervalId);

    intervalId = setInterval(updateTimer, 1000);
}


/**
 * Visually update the timer as it runs
 */
function updateTimer() {

    let hoursTimer = Math.floor(totalSeconds / 3600);
    let minutesTimer = Math.floor((totalSeconds % 3600) / 60);
    let secondsTimer = totalSeconds % 60;

    countdownTimer.textContent = `${hoursTimer.toString().padStart(2, '0')}:${minutesTimer.toString().padStart(2, '0')}
                                 :${secondsTimer.toString().padStart(2, '0')}`;

    if (totalSeconds <= 0) {
        clearInterval(intervalId);
    }

    totalSeconds--;
}


/**
 * Stop the Timer and allows it to resume from the point is stopped
 */
function stopTimer() {
    clearInterval(intervalId);
    startButton.disabled = false;
    pausedTime = totalSeconds;
}


/**
 * Reset the Timer for a new configuration and start
 */
function resetTimer() {
    totalSeconds = undefined;
    pausedTime = undefined;
    countdownTimer.textContent = "Timer Reset";
    hoursInput.value = "";
    minutesInput.value = "";
    secondsInput.value = "";
    clearInterval(intervalId);
}