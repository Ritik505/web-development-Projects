let randomNumber = Math.floor(Math.random() * 10) + 1;
let chancesLeft = 5; 
let timeLeft = 120; 
let timerInterval; 

const inputField = document.getElementById('input');
const submitButton = document.getElementById('submit');
const playAgainButton = document.getElementById('again');
const messageDisplay = document.getElementById('message');
const chancesDisplay = document.getElementById('chances');
const timerDisplay = document.getElementById('timer');

function updateChancesDisplay() {
    chancesDisplay.textContent = `Chances Left: ${chancesLeft}`;
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `Time Left: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}


updateChancesDisplay();
updateTimerDisplay();

function startTimer() {
    timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimerDisplay();
        } else {
            clearInterval(timerInterval);
            messageDisplay.textContent = 'Time is over! The game has ended.';
            messageDisplay.style.color = 'red';
            submitButton.disabled = true; 
        }
    }, 1000);
}
submitButton.addEventListener('click', function () {
    const userInput = Number(inputField.value);

    if (!userInput || userInput < 1 || userInput > 10) {
        messageDisplay.textContent = 'Please enter a valid number between 1 and 10.';
        return;
    }

    chancesLeft--;
    updateChancesDisplay();

    if (userInput === randomNumber) {
        messageDisplay.textContent = 'Congratulations! ✅ You guessed the correct number.';
        messageDisplay.style.color = 'green';
        submitButton.disabled = true; 
        clearInterval(timerInterval); 
    } else if (chancesLeft > 0) {
        messageDisplay.textContent = userInput < randomNumber ? '❌ Too low! Try again.' : '❌ Too high! Try again.';
    } else {
        messageDisplay.textContent = `Game over! The correct number was ${randomNumber}.`;
        submitButton.disabled = true; 
        clearInterval(timerInterval); 
    }
    inputField.value = '';
});


playAgainButton.addEventListener('click', function () {
    randomNumber = Math.floor(Math.random() * 50) + 1; 
    chancesLeft = 5; 
    timeLeft = 120; 
    updateChancesDisplay();
    updateTimerDisplay();
    messageDisplay.textContent = 'A new game has started! Try to guess the number.';
    messageDisplay.style.color = 'black';
    submitButton.disabled = false; 

    
    inputField.value = '';
    clearInterval(timerInterval);
    startTimer();
});

startTimer();