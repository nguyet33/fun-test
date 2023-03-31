// array of objects containing quiz questions and answer choices
var quizQuestions = [
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
  // add additional questions and answer choices here
];

// variables to keep track of quiz state
var currentQuestionIndex = 0;
var time = quizQuestions.length * 15;
var timerId;

// variables to reference DOM elements
var questionsEl = document.querySelector("#questions");
var submitBtn = document.querySelector("#submit-btn");
var timerEl = document.querySelector("#time-remaining");
var highScoresEl = document.querySelector("#high-scores");
var clearScoresBtn = document.querySelector("#clear-scores-btn");

// function to start the quiz
function startQuiz() {
  // hide start screen
  document.querySelector("#start-screen").classList.add("hide");

  // unhide questions section
  questionsEl.classList.remove("hide");

  // start timer
  timerId = setInterval(function () {
    time--;
    timerEl.textContent = time;

    if (time <= 0) {
      endQuiz();
    }
  }, 1000);

  // show starting question
  showQuestion();
}

// function to show a question
function showQuestion() {
  // get current question object from array
  var question = quizQuestions[currentQuestionIndex];

  // update question text
  var questionEl = document.querySelector("#question");
  questionEl.textContent = question.question;

  // remove old answer choices
  var choicesEl = document.querySelector("#choices");
  choicesEl.innerHTML = "";

  // create new answer choices
  question.choices.forEach(function (choice, i) {
    // create new button for each choice
    var choiceBtn = document.createElement("button");
    choiceBtn.classList.add("choice");
    choiceBtn.textContent = i + 1 + ". " + choice;
    choicesEl.appendChild(choiceBtn);

    // attach click event listener to each choice
    choiceBtn.addEventListener("click", function () {
      // check if user guessed correctly
      if (choice === question.answer) {
        // add 10 seconds to time remaining
        time += 10;
        timerEl.textContent = time;
      } else {
        // subtract 10 seconds from time remaining
        time -= 10;
        timerEl.textContent = time;
      }

      // move to next question
      currentQuestionIndex++;

      // check if quiz is over
      if (currentQuestionIndex === quizQuestions.length) {
        endQuiz();
      } else {
        showQuestion();
      }
    });
  });
}

// function to end the quiz
function endQuiz() {
  // stop timer
  clearInterval(timerId);

  // hide questions section
  questionsEl.classList.add("hide");

  // show end screen
  var endScreenEl = document.querySelector("#end-screen");
  endScreenEl.classList.remove("hide");

  // show final score
  var scoreEl = document.querySelector("#final-score");
  scoreEl.textContent = time;
}
// save score to local
function saveScore() {
	// get user's initials
	var initials = document.querySelector("#initials-input").value;
  
	// create object to store score and initials
	var score = {
	  initials: initials,
	  score: time
	};
  
	// get existing scores from local storage or create empty array
	var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  
	// add new score to array
	highScores.push(score);
  
	// sort scores in descending order
	highScores.sort(function(a, b) {
	  return b.score - a.score;
	});
  
	// store updated scores in local storage
	localStorage.setItem("highScores", JSON.stringify(highScores));
  }

  startButton.addEventListener("click", startQuiz);
