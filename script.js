const questions = [
    {
        question: "What does CSS stands for?",
        answers: [
            {text: "Central Style Sheets", correct: false},
            {text: "Cascading Style Sheets", correct: true},
            {text: "Cascading Simple Sheets", correct: false},
            {text: "Control Simple Sheets", correct: false},
        ]
    },
    {
        question: "What does HTML stands for?",
        answers: [
            {text: "Hypertext Markup Language", correct: true},
            {text: "Hypertext Markdown Language", correct: false},
            {text: "Hyperloop Machine Language", correct: false},
            {text: "Hypertext Machine Language", correct: false},
        ]
    },
    {
        question: "Which language runs in a web browser?",
        answers: [
            {text: "Java", correct: false},
            {text: "C", correct: false},
            {text: "Python", correct: false},
            {text: "JavaScript", correct: true},
        ]
    },
    {
        question: "Which year was Javascript launched?",
        answers: [
            {text: "1996", correct: false},
            {text: "1995", correct: true},
            {text: "1994", correct: false},
            {text: "none of the above", correct: false},
        ]
    },
    {
        question: "Which of the following attributes is used to add link to any element?",
        answers: [
            {text: "link", correct: false},
            {text: "href", correct: true},
            {text: "ref", correct: false},
            {text: "none of the above", correct: false},
        ]
    } 
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score=0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion =  questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}


function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}
nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});


startQuiz();