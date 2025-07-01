const questions = [
  {
    question: "What does CSS stand for?",
    options: ["Cascading Style Sheets", "Computer Style Sheets", "Creative Style Sheets", "Control Style Sheets"],
    answer: 0
  },
  {
    question: "Which HTML tag is used for the largest heading?",
    options: ["<h1>", "<h6>", "<head>", "<header>"],
    answer: 0
  },
  {
    question: "Which symbol is used to end a statement in JavaScript?",
    options: [";", ":", ".", ","],
    answer: 0
  },
  {
    question: "Which HTML element is used to embed a JavaScript file?",
    options: ["<script>", "<link>", "<style>", "<javascript>"],
    answer: 0
  },
  {
    question: "Which of the following is not a JavaScript data type?",
    options: ["Number", "String", "Boolean", "Element"],
    answer: 3
  },
  {
    question: "What is the output of console.log(typeof null)?",
    options: ["null", "undefined", "object", "string"],
    answer: 2
  },
  {
    question: "Which method is used to parse a string into a number in JavaScript?",
    options: ["parseInt()", "Number()", "parse()", "toString()"],
    answer: 0
  },
  {
    question: "Which of these is a JavaScript framework/library?",
    options: ["Laravel", "Django", "React", "Spring Boot"],
    answer: 2
  },
  {
    question: "What is the time complexity of inserting into a binary heap?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n^2)"],
    answer: 1
  },
  {
    question: "What does the async keyword do in JavaScript?",
    options: [
      "Creates a promise",
      "Marks a function to return a promise",
      "Allows synchronous code execution",
      "Blocks code execution until resolved"
    ],
    answer: 1
  }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 15;

const correctSound = new Audio("correct.mp3");
const wrongSound = new Audio("wrong.mp3");
const nextSound = new Audio("next.mp3");

function showQuestion() {
  const questionElement = document.getElementById("question");
  const optionsElement = document.getElementById("options");
  const feedbackElement = document.getElementById("feedback");
  const currentQuestion = questions[currentQuestionIndex];

  questionElement.textContent = `Q${currentQuestionIndex + 1}: ${currentQuestion.question}`;
  optionsElement.innerHTML = "";
  feedbackElement.textContent = "";
  document.getElementById("next-btn").style.display = "none";

  currentQuestion.options.forEach((option, index) => {
    const li = document.createElement("li");
    li.textContent = option;
    li.classList.add("option");
    li.onclick = () => checkAnswer(index, li);
    optionsElement.appendChild(li);
  });

  updateProgressBar();
  startTimer();
}

function checkAnswer(selectedIndex, li) {
  clearInterval(timer);
  const currentQuestion = questions[currentQuestionIndex];
  const options = document.querySelectorAll("#options li");
  options.forEach(option => option.style.pointerEvents = "none");

  const feedback = document.getElementById("feedback");

  if (selectedIndex === currentQuestion.answer) {
    li.style.backgroundColor = "green";
    correctSound.play();
    feedback.textContent = "Correct!";
    feedback.style.color = "lime";
    score++;
  } else {
    li.style.backgroundColor = "red";
    wrongSound.play();
    feedback.textContent = `Wrong! Correct: ${currentQuestion.options[currentQuestion.answer]}`;
    feedback.style.color = "red";
    options[currentQuestion.answer].style.backgroundColor = "green";
  }

  document.getElementById("next-btn").style.display = "block";
}

function nextQuestion() {
  nextSound.play();
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

function showScore() {
  document.getElementById("question-container").style.display = "none";
  document.getElementById("score-container").style.display = "block";
  document.getElementById("score").textContent = `Your Score: ${score}/${questions.length}`;
  document.getElementById("timer").style.display = "none";
}

function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  document.getElementById("score-container").style.display = "none";
  document.getElementById("question-container").style.display = "block";
  document.getElementById("timer").style.display = "block";
  showQuestion();
}

function startTimer() {
  timeLeft = 15;
  updateTimer();
  timer = setInterval(() => {
    timeLeft--;
    updateTimer();
    if (timeLeft <= 0) {
      clearInterval(timer);
      autoWrong();
    }
  }, 1000);
}

function updateTimer() {
  document.getElementById("timer").textContent = `⏳ Time Left: ${timeLeft}s`;
}

function autoWrong() {
  const feedback = document.getElementById("feedback");
  feedback.textContent = `⏱ Time's up! Correct: ${questions[currentQuestionIndex].options[questions[currentQuestionIndex].answer]}`;
  feedback.style.color = "orange";

  const options = document.querySelectorAll("#options li");
  options.forEach((li, i) => {
    li.style.pointerEvents = "none";
    if (i === questions[currentQuestionIndex].answer) li.style.backgroundColor = "green";
  });

  document.getElementById("next-btn").style.display = "block";
}

function updateProgressBar() {
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  document.getElementById("progress-bar").style.width = `${progress}%`;
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("question-container").style.display = "block";
  document.getElementById("score-container").style.display = "none";
  showQuestion();
});
