var quiz = [
  {
    question: "Inside which HTML element do we put the JavaScript?",
    choices: ["<scripting>", "<js>", "<script>", "<javascript>"],
    answer: "<script>",
  },
  {
    question:
      "What is the correct syntax for referring to an external script called 'script.js'?",
    choices: [
      "<script href='script.js'>",
      "<script name='script.js'>",
      "<script src='script.js'>",
      "<script file='script.js'>",
    ],
    answer: "<script src='script.js'>",
  },
  {
    question: "How do you write 'Hello World' in an alert box?",
    choices: [
      "alertBox('Hello World');",
      "msgBox('Hello World');",
      "msg('Hello World');",
      "alert('Hello World');",
    ],
    answer: "alert('Hello World');",
  },
  {
    question: "What is my name?",
    choices: ["Thien Smith", "John Doe", "Adam Sander", "Magic Johnson"],
    answer: "Thien Smith",
  },
  {
    question: "What is the right answer?",
    choices: ["wrong", "wrong", "right", "Not right"],
    answer: "right",
  },
  {
    question: "Select the right letter in in Adam?",
    choices: ["A", "d", "m", "s"],
    answer: "A",
  },
  {
    question: "When was Thien born?",
    choices: ["1998", "1786", "1997", "1970"],
    answer: "1970",
  },
  {
    question: "What does the acronym 'DOM' stand for?",
    choices: [
      "Document Object Model",
      "Dynamic Object Module",
      "Digital Object Management",
      "Data Object Manager",
    ],
    answer: "Document Object Model",
  },
  {
    question: "What does the acronym 'HTML' stand for?",
    choices: [
      "Hello The Make laugh",
      "Hi This My Learning",
      "Hello Thien Must Laugh",
      "Hyper Text Markup Langauge",
    ],
    answer: "Hyper Text Markup Langauge",
  },
  {
    question: "Which of the following is not a JavaScript data type?",
    choices: ["string", "number", "boolean", "float"],
    answer: "float",
  },
  {
    question: "What does the 'this' keyword refer to in JavaScript?",
    choices: [
      "The global object",
      "The object that called the function",
      "The object being created",
      "The object that contains the function",
    ],
    answer: "The object that called the function",
  },
  {
    question: "What is the right answer?",
    choices: ["wrong", "wrong", "right", "Not right"],
    answer: "right",
  }
];

var questionIndex = 0;
var time = quiz.length *5 ; // 60 sec start
var timerId;

let highscores = [];
var startScreen = document.querySelector("#start-screen");
var startButton = document.querySelector("#start-button");
var questionsContainer = document.querySelector("#questions-container");
var timerElement = document.querySelector("#time");
var choicesElement = document.querySelector("#choices");
var feedbackElement = document.querySelector("#feedback");
var initialsElement = document.querySelector("#initials");
var submitButton = document.querySelector("#submit-button");
var highscoresContainer = document.querySelector("#highscores-container");
var highscoresList = document.querySelector("#highscores-list");
var goBackButton = document.querySelector("#go-back-button");
var clearHighscoresButton = document.querySelector("#clear-highscores-button");


function startQuiz() {
  var startScreen = document.querySelector("#start-screen");
  startScreen.setAttribute("class", "hide");
  questionsContainer.removeAttribute("class");
  timerId = setInterval(clockTick, 1000);
  timerElement.textContent = time;
  displayQuestion();
}

function displayQuestion() {
  var question = quiz[questionIndex];
  var questionTitle = document.querySelector("#question-title");
  questionTitle.textContent = question.question;
  choicesElement.innerHTML = "";
  question.choices.forEach(function (choice, i) {
    var choiceButton = document.createElement("button");
    choiceButton.setAttribute("class", "choice");
    choiceButton.setAttribute("value", choice);
    choiceButton.textContent = i + 1 + ". " + choice;
    choiceButton.onclick = questionClick;
    choicesElement.appendChild(choiceButton);
  });
}

function questionClick() {
  if (this.value !== quiz[questionIndex].answer) {
    time -= 5;
    if (time < 0) {
      time = 0;
    }
    timerElement.textContent = time;
    feedbackElement.textContent = "Wrong!";
  } else {
    feedbackElement.textContent = "Correct!";
  }

  feedbackElement.setAttribute("class", "feedback");
  setTimeout(function () {
    feedbackElement.setAttribute("class", "feedback hide");
  }, 1000);

  questionIndex++;

  if (questionIndex === quiz.length) {
    quizEnd();
  } else {
    displayQuestion();
  }
}

function quizEnd() {
  clearInterval(timerId);
  initialsElement.removeAttribute("class");
  var scoreElement = document.querySelector("#final-score");
  scoreElement.textContent = time;
  questionsContainer.setAttribute("class", "hide");
  document.getElementById("quiz-end").classList.remove("hide");
  highscoresContainer.removeAttribute("class");
}

function clockTick() {
  time--;
  timerElement.textContent = time;
  if (time <= 0) {
    quizEnd();
  }
}

function goBack() {
  clearInterval(timerId);
  questionIndex = 0;
  time = quiz.length * 20;
  initialsElement.value = "";
  feedbackElement.textContent = "";
  highscoresContainer.setAttribute("class", "hide");
  startScreen.removeAttribute("class");
  window.location.href = "index.html";
  document.getElementById("quiz-end").classList.add("hide"); // Hide the quiz end section
}

function saveAndShowHighscores() {
  var initials = initialsElement.value;
  var score = time;
  var highscore = {
    initials: initials,
    score: score,
  };
  var highscores = JSON.parse(localStorage.getItem("highscores")) || [];
  highscores.push(highscore);
  localStorage.setItem("highscores", JSON.stringify(highscores));
  showHighscores();
}

submitButton.addEventListener("click", function (event) {
  event.preventDefault();
  saveAndShowHighscores();
});
function showHighscores() {
  var highscores = JSON.parse(localStorage.getItem("highscores")) || [];
  highscoresList.innerHTML = "";
  highscores.forEach(function (score) {
    var liTag = document.createElement("li");
    liTag.textContent = score.initials + " - " + score.score;
    highscoresList.appendChild(liTag);
  });
}

function clearHighscores() {
	localStorage.clear();
	highscores = [];
	showHighscores();
  }
  

goBackButton.addEventListener("click", goBack);

clearHighscoresButton.addEventListener("click", clearHighscores);

startButton.addEventListener("click", startQuiz);
