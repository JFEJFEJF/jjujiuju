const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const submitButton = document.getElementById('submit');
const correctPassword = '1994';
let currentQuestionIndex = 0;

let myQuestions = [
    {
        question: "ما هو عاصمة فرنسا؟",
        answers: {
            a: "برلين",
            b: "مدريد",
            c: "باريس"
        },
        correctAnswer: "c",
        points: 10
    },
    // يمكنك إضافة المزيد من الأسئلة هنا
];

function buildQuiz() {
    showQuestion(currentQuestionIndex);
}

function showQuestion(index) {
    const currentQuestion = myQuestions[index];
    const answers = [];
    for (letter in currentQuestion.answers) {
        answers.push(
            `<label>
                <input type="radio" name="question${index}" value="${letter}" onclick="lockAnswer(${index})">
                ${currentQuestion.answers[letter]}
            </label>`
        );
    }
    quizContainer.innerHTML = `
        <div class="question">${currentQuestion.question}</div>
        <div class="answers">${answers.join('')}</div>
    `;
    updateButtons();
}

function updateButtons() {
    if (currentQuestionIndex === 0) {
        prevButton.style.display = 'none';
    } else {
        prevButton.style.display = 'inline-block';
    }
    if (currentQuestionIndex === myQuestions.length - 1) {
        nextButton.style.display = 'none';
        submitButton.style.display = 'inline-block';
    } else {
        nextButton.style.display = 'inline-block';
        submitButton.style.display = 'none';
    }
}

function showNextQuestion() {
    currentQuestionIndex++;
    showQuestion(currentQuestionIndex);
}

function showPreviousQuestion() {
    currentQuestionIndex--;
    showQuestion(currentQuestionIndex);
}

function submitAnswer() {
    lockAnswer(currentQuestionIndex);
    if (currentQuestionIndex < myQuestions.length - 1) {
        showNextQuestion();
    } else {
        showResults();
    }
}

function lockAnswer(index) {
    const radios = document.getElementsByName(`question${index}`);
    radios.forEach(radio => {
        radio.disabled = true;
    });
}

function showResults() {
    const answerContainers = quizContainer.querySelectorAll('.answers');
    let numCorrect = 0;
    let totalPoints = 0;

    myQuestions.forEach((currentQuestion, questionNumber) => {
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;

        if (userAnswer === currentQuestion.correctAnswer) {
            numCorrect++;
            totalPoints += currentQuestion.points;
            answerContainers[questionNumber].style.color = 'lightgreen';
        } else {
            answerContainers[questionNumber].style.color = 'red';
        }
    });

    resultsContainer.innerHTML = `${numCorrect} إجابات صحيحة. مجموع النقاط: ${totalPoints}`;
}

function showAddQuestionForm() {
    const password = document.getElementById('admin-password').value;
    if (password === correctPassword) {
        document.getElementById('new-question-form').style.display = 'block';
    } else {
        alert('الرمز السري غير صحيح');
    }
}

function addNewQuestion() {
    const question = document.getElementById('new-question').value;
    const answerA = document.getElementById('new-answer-a').value;
    const answerB = document.getElementById('new-answer-b').value;
    const answerC = document.getElementById('new-answer-c').value;
    const correctAnswer = document.getElementById('new-correct-answer').value;
    const points = parseInt(document.getElementById('new-points').value, 10);

    const newQuestion = {
        question,
        answers: {
            a: answerA,
            b: answerB,
            c: answerC
        },
        correctAnswer,
        points
    };

    myQuestions.push(newQuestion);
    document.getElementById('new-question-form').style.display = 'none';
    document.getElementById('new-question-form').reset();
    if (myQuestions.length === 1) {
        buildQuiz();
    }
}

function previewImage(event) {
    const reader = new FileReader();
    reader.onload = function() {
        const output = document.getElementById('profile-picture');
        output.src = reader.result;
        output.style.display = 'block';
    }
    reader.readAsDataURL(event.target.files[0]);
}

buildQuiz();
