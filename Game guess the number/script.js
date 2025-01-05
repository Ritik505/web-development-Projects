// Generate a random number between 1 and 50
let randomNumber = Math.floor(Math.random() * 10) + 1;
let chancesLeft = 5; // User has 5 chances
let timeLeft = 120; // 2 minutes in seconds
let timerInterval; // To store the timer interval

// Get references to the input, buttons, and display elements
const inputField = document.getElementById('input');
const submitButton = document.getElementById('submit');
const playAgainButton = document.getElementById('again');
const messageDisplay = document.getElementById('message');
const chancesDisplay = document.getElementById('chances');
const timerDisplay = document.getElementById('timer');

// Update chances display function
function updateChancesDisplay() {
    chancesDisplay.textContent = `Chances Left: ${chancesLeft}`;
}

// Update timer display function
function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `Time Left: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Initialize displays
updateChancesDisplay();
updateTimerDisplay();

// Start the timer
function startTimer() {
    timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimerDisplay();
        } else {
            clearInterval(timerInterval);
            messageDisplay.textContent = 'Time is over! The game has ended.';
            messageDisplay.style.color = 'red';
            submitButton.disabled = true; // Disable submit button
        }
    }, 1000);
}

// Add event listener to the submit button
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
        submitButton.disabled = true; // Disable submit button on win
        clearInterval(timerInterval); // Stop the timer
    } else if (chancesLeft > 0) {
        messageDisplay.textContent = userInput < randomNumber ? '❌ Too low! Try again.' : '❌ Too high! Try again.';
    } else {
        messageDisplay.textContent = `Game over! The correct number was ${randomNumber}.`;
        submitButton.disabled = true; // Disable submit button when chances are over
        clearInterval(timerInterval); // Stop the timer
    }

    // Clear the input field
    inputField.value = '';
});

// Add event listener to the play again button
playAgainButton.addEventListener('click', function () {
    randomNumber = Math.floor(Math.random() * 50) + 1; // Generate a new random number
    chancesLeft = 5; // Reset chances
    timeLeft = 120; // Reset timer
    updateChancesDisplay();
    updateTimerDisplay();
    messageDisplay.textContent = 'A new game has started! Try to guess the number.';
    messageDisplay.style.color = 'black';
    submitButton.disabled = false; // Enable submit button

    // Clear the input field
    inputField.value = '';

    // Restart the timer
    clearInterval(timerInterval);
    startTimer();
});

// Start the timer when the game loads
startTimer();