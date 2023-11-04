document.addEventListener('DOMContentLoaded', function() {
    const welcomeDiv = document.getElementById('welcome');
    const landingPageDiv = document.getElementById('quiz');
    const enterButton = document.getElementById('enterButton');

    enterButton.addEventListener('click', function() {
        // Hides the welcome entry message
        welcomeDiv.style.display = 'none';
        // This shows the landing page after clicking Enter Button
        landingPageDiv.style.display = 'block';
    })
})
  

const quiz = document.getElementById('quiz');
const answerEls = document.querySelectorAll('.answer');
const questionEl = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitBtn = document.getElementById('submit');

let currentQuiz = 0;
let score = 0;
let quizData = []; // Store quiz data

// Load quiz questions from the Open Trivia API
async function loadQuiz() {
    deselectAnswers();

    try {
        const response = await fetch('https://opentdb.com/api.php?amount=13&category=21&difficulty=easy&type=multiple');
        const data = await response.json();

        if (data.results.length > 0) {
            quizData = data.results;
            const currentQuizData = quizData[currentQuiz];

            questionEl.innerHTML = currentQuizData.question;
            a_text.innerHTML = currentQuizData.incorrect_answers[0];
            b_text.innerHTML = currentQuizData.incorrect_answers[1];
            c_text.innerHTML = currentQuizData.incorrect_answers[2];
            d_text.innerHTML = currentQuizData.correct_answer;
        }
    } catch (error) {
        console.error(error);
    }

const questionNumber = document.getElementById('question-number');
const totalQuestions = document.getElementById('total-questions');

questionNumber.innerText = currentQuiz + 1; 
totalQuestions.innerText = quizData.length;

}

function deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false);
}

function getSelected() {
    let answer;

    answerEls.forEach(answerEl => {
        if (answerEl.checked) {
            answer = answerEl.id;
        }
    });

    return answer;
}

submitBtn.addEventListener('click', () => {
    const answer = getSelected();

    if (answer) {
        if (answer === quizData[currentQuiz].correct_answer) {
            score++;
        }
    }

    currentQuiz++;

    if (currentQuiz < quizData.length) {
        loadQuiz();
    } 
    else {
        quiz.innerHTML = `<div>
        <div class="quiz-header">
        <img src="logo1.png" alt="logo">
        <h2>You answered ${score}/${quizData.length} questions correctly</h2>
        <br>
        <button onclick="location.reload()"
        style = "border-radius: 100px">Reload the Quiz</button>
        </div>
        </div>`;
    }
});

loadQuiz();
