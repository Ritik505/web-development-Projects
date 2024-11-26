const correctPassword = "RV.coder5";
let attemptCount = 0;

document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const passwordInput = document.getElementById("password");
    const errorMessage = document.getElementById("error-message");
    const attemptInfo = document.getElementById("attempt-info");
    const tryAgainButton = document.getElementById("try-again-btn");

    // Get entered password
    const enteredPassword = passwordInput.value;

    attemptCount++;

    if (enteredPassword === correctPassword) {
        errorMessage.textContent = "";
        attemptInfo.textContent = "✅ Access granted. Welcome!";
        attemptInfo.style.color = "green";

        // Delay redirection by 1 second
        setTimeout(() => {
            window.location.href = "welcome.html";
        }, 1000);
    } else {
        errorMessage.textContent = "❌ Wrong password. Please try again.";
        attemptInfo.textContent = `Attempt ${attemptCount}/3`;
        tryAgainButton.style.display = "inline-block"; // Show Try Again button

        if (attemptCount >= 3) {
            errorMessage.textContent = "❌ Too many failed attempts! Access denied.";
            attemptInfo.textContent = "You have exceeded the maximum number of attempts.";

            // Disable password input and buttons
            passwordInput.disabled = true;
            document.querySelector("button[type='submit']").disabled = true;
            tryAgainButton.style.display = "none"; // Hide Try Again button
        }
    }
});

// Function to toggle password visibility
function togglePasswordVisibility() {
    const passwordInput = document.getElementById("password");
    const eyeIcon = document.getElementById("toggle-eye");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        eyeIcon.classList.remove("fa-eye-slash");
        eyeIcon.classList.add("fa-eye");
    } else {
        passwordInput.type = "password";
        eyeIcon.classList.remove("fa-eye");
        eyeIcon.classList.add("fa-eye-slash");
    }
}

// Function to reset the form for "Try Again"
function resetForm() {
    const passwordInput = document.getElementById("password");
    const errorMessage = document.getElementById("error-message");
    const attemptInfo = document.getElementById("attempt-info");
    const tryAgainButton = document.getElementById("try-again-btn");

    // Reset input and messages
    passwordInput.value = "";
    errorMessage.textContent = "";
    attemptInfo.textContent = "";
    tryAgainButton.style.display = "none"; // Hide Try Again button
}
