const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "Never have I ever dressed up as the opposite gender.",
        choice1: "Never",
        choice2: "I Have",
        answer: 2
    },

    {
        question: "Never have I ever eaten only candy for dinner.",
        choice1: "Never",
        choice2: "I Have",
        answer: 2
    },

    {
        question: "Never have I ever been teased for the way I look.",
        choice1: "Never",
        choice2: "I Have",
        answer: 2
    },

    {
        question: "Never have I ever fallen off a bike.",
        choice1: "Never",
        choice2: "I Have",
        answer: 2
    },

    {
        question: "Never have I ever felt insecure about myself.",
        choice1: "Never",
        choice2: "I Have",
        answer: 2
    },

    {
        question: "Never have I ever been called a tom girl or a tom boy.",
        choice1: "Never",
        choice2: "I Have",
        answer: 2
    },

    {
        question: "Never have I ever used training wheels.",
        choice1: "Never",
        choice2: "I Have",
        answer: 2
    },

    {
        question: "Never have I ever felt like I fit in.",
        choice1: "Never",
        choice2: "I Have",
        answer: 2
    },

    {
        question: "Never have I ever dressed up as the opposite gender.",
        choice1: "Never",
        choice2: "I Have",
        answer: 2
    },

    {
        question: "Never have I ever wished I had bunk beds.",
        choice1: "Never",
        choice2: "I Have",
        answer: 2
    },

    {
        question: "Never have I ever stayed in character all day.",
        choice1: "Never",
        choice2: "I Have",
        answer: 2
    },

    {
        question: "Never have I ever been on a family road trip.",
        choice1: "Never",
        choice2: "I Have",
        answer: 2
    },

    {
        question: "Never have I ever been told I can't do something for the color of my skin.",
        choice1: "Never",
        choice2: "I Have",
        answer: 2
    },

    {
        question: "Never have I ever been told I can't play with someone because of the way they look or act.",
        choice1: "Never",
        choice2: "I Have",
        answer: 2
    },

    {
        question: "Never have I ever played Pokemon.",
        choice1: "Never",
        choice2: "I Have",
        answer: 2
    },

    {
        question: "Never have I ever built a fort with blankets.",
        choice1: "Never",
        choice2: "I Have",
        answer: 2
    },

    {
        question: "Never have I ever played video games all day.",
        choice1: "Never",
        choice2: "I Have",
        answer: 2
    },

    {
        question: "Never have I ever stolen money from a sibling's piggy bank.",
        choice1: "Never",
        choice2: "I Have",
        answer: 2
    },

    {
        question: "Never have I ever been told that I'm too boyish or too girlish to do something.",
        choice1: "Never",
        choice2: "I Have",
        answer: 2
    },

    {
        question: "Never have I ever been attended march.",
        choice1: "Never",
        choice2: "I Have",
        answer: 2
    }
];

//CONSTANTS
const CORRECT_BONUS = 1;
const MAX_QUESTIONS = 20;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestions();
}

getNewQuestions= () => {

    if(availableQuestions.length == 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score);
        //go to the end page
        return window.location.assign("/end.html");
    }
    questionCounter++;
    progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    //update the progress bar
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    })

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
    if(!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];
    
    const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
    
    if(classToApply == 'correct') {
        incrementScore(CORRECT_BONUS);
    }
    
    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
        selectedChoice.parentElement.classList.remove(classToApply);
        getNewQuestions();
    }, 500);
    });
});

incrementScore = num => {
    score +=num;
    scoreText.innerText = score;
}

startGame();