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

// Load quiz questions from the Open Trivia API
async function loadQuiz() {
    deselectAnswers();
    
    try {
        const response = await fetch('https://opentdb.com/api.php?amount=7&category=21&difficulty=easy&type=multiple');
        const data = await response.json();
        
        if (data.results.length > 0) {
            const currentQuizData = data.results[currentQuiz];
            questionEl.innerHTML = currentQuizData.question;
            a_text.innerHTML = currentQuizData.incorrect_answers[0];
            b_text.innerHTML = currentQuizData.incorrect_answers[1];
            c_text.innerHTML = currentQuizData.incorrect_answers[2];
            d_text.innerHTML = currentQuizData.correct_answer;
        }
    } catch (error) {
        console.error(error);
    }
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
            if(answer === currentQuiz.correct_answer){
            score++;
            }
        }

        currentQuiz++;

        if (currentQuiz < 13) {
            loadQuiz();
        } else {
            quiz.innerHTML = `<h2>You answered ${score}/13 questions correctly</h2>
            <br>
            <button onclick="location.reload()">Reload</button>
            `;
        }
    }
);

// Initial quiz load
loadQuiz();
