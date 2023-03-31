// array of objects containing quiz questions and answer choices
var quizQuestions = [
    {
		question: "What is my name?",
		choices: ["Thien Smith", "John Doe", "Adam Sander", "Magic Johnson"],
		answer: "Thien Smith"
	},
    {
		question: "What is the right answer?",
		choices: ["wrong", "wrong", "right", "Not right"],
		answer: "right"
	},
    {
		question: "Select the right letter in in Adam?",
		choices: ["A", "d", "m", "s"],
		answer: "A"
	},
    {
		question: "When was Thien born?",
		choices: ["1998", "1786", "1997", "1970"],
		answer: "1970"
	},
	{
		question: "What does the acronym 'DOM' stand for?",
		choices: ["Document Object Model", "Dynamic Object Module", "Digital Object Management", "Data Object Manager"],
		answer: "Document Object Model"
	},
    {
		question: "What does the acronym 'HTML' stand for?",
		choices: ["Hello The Make laugh", "Hi This My Learning", "Hello Thien Must Laugh", "Hyper Text Markup Langauge"],
		answer: "Hyper Text Markup Langauge"
	},
	{
		question: "Which of the following is not a JavaScript data type?",
		choices: ["string", "number", "boolean", "float"],
		answer: "float"
	},
	{
		question: "What does the 'this' keyword refer to in JavaScript?",
		choices: ["The global object", "The object that called the function", "The object being created", "The object that contains the function"],
		answer: "The object that called the function"
	}
	// add additional questions and answer choices here
];

// variables to keep track of quiz state
var currentQuestionIndex = 0;
var time = quizQuestions.length * 15;
var timerId;

