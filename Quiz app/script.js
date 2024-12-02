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

function showQuestion() {
  const questionElement = document.getElementById("question");
  const optionsElement = document.getElementById("options");
  const currentQuestion = questions[currentQuestionIndex];

  questionElement.textContent = `Question ${currentQuestionIndex + 1}: ${currentQuestion.question}`;
  optionsElement.innerHTML = "";

  currentQuestion.options.forEach((option, index) => {
    const li = document.createElement("li");
    li.textContent = option;
    li.onclick = () => checkAnswer(index, li); 
    optionsElement.appendChild(li);
  });
}

function checkAnswer(selectedOption, optionElement) {
  const currentQuestion = questions[currentQuestionIndex];
  const feedbackElement = document.getElementById("feedback");

  // Disable all options after selection
  const options = document.querySelectorAll("#options li");
  options.forEach(option => option.style.pointerEvents = "none");  

  if (selectedOption === currentQuestion.answer) {
    score++;
    feedbackElement.textContent = "Correct!";
    feedbackElement.style.color = "green";
  } else {
    feedbackElement.textContent = `Wrong! The correct answer is: ${currentQuestion.options[currentQuestion.answer]}`;
    feedbackElement.style.color = "red";
  }

  document.getElementById("next-btn").style.display = "block";
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
    document.getElementById("next-btn").style.display = "none";
    document.getElementById("feedback").textContent = ""; 
    showScore();
  }
}

function showScore() {
  document.getElementById("question-container").style.display = "none";
  document.getElementById("score-container").style.display = "block";
  document.getElementById("score").textContent = `Your Score: ${score}/${questions.length}`;
}

function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  document.getElementById("score-container").style.display = "none";
  document.getElementById("question-container").style.display = "block";
  showQuestion();
  document.getElementById("next-btn").style.display = "none";
  document.getElementById("feedback").textContent = ""; 
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("question-container").style.display = "block";
  showQuestion();
});
