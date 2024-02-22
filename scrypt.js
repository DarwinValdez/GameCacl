const timerEl = document.getElementById("timer");
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const resultEl = document.getElementById("result");
const nextButton = document.getElementById("next");
const correctCountEl = document.getElementById("correctCount");

let timeLeft = 10;
let correctCount = 0;
let incorrectCount = 0;
let timer;
let canAnswer = true;

function startTimer() {
    timeLeft = 10;
    timerEl.textContent = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timer);
            resultEl.textContent = "Game over";
            nextButton.disabled = false;
            canAnswer = false;
        }
    }, 1000);
}

function generateQuestion() {
    canAnswer = true;
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operation = Math.random() < 0.5 ? "+" : "-";
    const correctAnswer = operation === "+" ? num1 + num2 : num1 - num2;

    questionEl.textContent = `${num1} ${operation} ${num2}`;

    answersEl.innerHTML = "";
    const shuffledAnswers = [
        correctAnswer,
        correctAnswer + 1,
        correctAnswer - 1,
        correctAnswer + 2
    ].sort(() => Math.random() - 0.5);

    shuffledAnswers.forEach((answer, index) => {
        const answerButton = document.createElement("button");
        answerButton.textContent = answer;
        answerButton.value = answer === correctAnswer ? "correct" : "incorrect";
        answerButton.addEventListener("click", handleAnswer);
        answersEl.appendChild(answerButton);
    });
}
function handleAnswer(event) {
    if (!canAnswer) {
        return;
    }

    clearInterval(timer);
    canAnswer = false;

    const answerValue = event.target.value;
    if (answerValue === "correct") {
        correctCount++;
        resultEl.textContent = "¡Correcto!";
    } else {
        incorrectCount++;
        resultEl.textContent = "¡Incorrecto!";
    }
    nextButton.disabled = false;
    showCorrectCount();
}

function showCorrectCount() {
    correctCountEl.textContent = `Correctas: ${correctCount}`;
}

nextButton.addEventListener("click", () => {
    clearInterval(timer);
    canAnswer = true;
    startTimer();
    generateQuestion();
    nextButton.disabled = true;
    resultEl.textContent = "";
});

startTimer();
generateQuestion();
