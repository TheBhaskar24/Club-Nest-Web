// Initialize variables
let currentQuestionIndex = 0;
let score = 0;
let moneyPool = 0;
const moneyLevels = [0, 100, 500, 1000, 5000, 10000, 20000, 40000, 80000, 160000, 320000];
let selectedSubject = "";
let questions = [];

const subjects = {
  history: [
    { question: "Who was the first President of the USA?", options: ["George Washington", "Abraham Lincoln", "John Adams", "Thomas Jefferson"], answer: 0, explanation: "George Washington was the first president." },
    { question: "In which year did World War II end?", options: ["1943", "1945", "1950", "1960"], answer: 1, explanation: "World War II ended in 1945." },
    // Add more history questions up to 25
  ],
  math: [
    { question: "What is 5 + 7?", options: ["10", "11", "12", "13"], answer: 2, explanation: "5 + 7 equals 12." },
    { question: "What is the square root of 144?", options: ["10", "11", "12", "13"], answer: 2, explanation: "The square root of 144 is 12." },
    // Add more math questions up to 25
  ]
};

document.getElementById("start-form").addEventListener("submit", startQuiz);

function startQuiz(event) {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const email = document.getElementById("email").value;
  selectedSubject = document.getElementById("subject").value;
  
  if (!name || !age || !email) return alert("Please fill all the fields.");
  
  questions = subjects[selectedSubject];
  document.getElementById("username").innerText = name;
  
  document.getElementById("user-form").classList.add("hidden");
  document.getElementById("game-container").classList.remove("hidden");

  currentQuestionIndex = 0;
  moneyPool = 0;
  score = 0;
  showQuestion();
}

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  document.getElementById("question").innerText = currentQuestion.question;

  currentQuestion.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.innerText = option;
    button.classList.add("btn");
    button.addEventListener("click", () => selectAnswer(index));
    document.getElementById("answer-buttons").appendChild(button);
  });
}

function resetState() {
  clearStatus(document.body);
  document.getElementById("next-btn").classList.add("hidden");
  document.getElementById("explanation").classList.add("hidden");
  while (document.getElementById("answer-buttons").firstChild) {
    document.getElementById("answer-buttons").removeChild(document.getElementById("answer-buttons").firstChild);
  }
}

function selectAnswer(index) {
  const currentQuestion = questions[currentQuestionIndex];
  const correct = index === currentQuestion.answer;
  showAnswer(correct);
}

function showAnswer(correct) {
  const explanation = document.getElementById("explanation");
  const currentQuestion = questions[currentQuestionIndex];
  if (correct) {
    moneyPool = moneyLevels[currentQuestionIndex + 1];
    document.body.classList.add("correct");
    explanation.innerText = "Correct! " + currentQuestion.explanation;
  } else {
    document.body.classList.add("wrong");
    explanation.innerText = "Wrong! " + currentQuestion.explanation + ". You earned $" + moneyPool;
  }
  explanation.classList.remove("hidden");
  document.getElementById("current-prize").innerText = moneyPool;
  document.getElementById("next-btn").classList.remove("hidden");
}

document.getElementById("next-btn").addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    endQuiz();
  }
});

function endQuiz() {
  alert("Quiz Over! You earned $" + moneyPool);
  document.getElementById("user-form").classList.remove("hidden");
  document.getElementById("game-container").classList.add("hidden");
}

function clearStatus(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}




