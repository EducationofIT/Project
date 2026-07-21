// ===============================
// Online Exam Script - Part 1
// ===============================

const questions = exam.questions;

let currentQuestion = 0;

// Stores answers
let answers = JSON.parse(localStorage.getItem("answers")) || {};

// ----------------------------
// Load First Question
// ----------------------------
showQuestion();

// ----------------------------
// Show Question
// ----------------------------
function showQuestion() {

    const q = questions[currentQuestion];

    document.getElementById("questionNo").innerHTML =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    let html = "";

    // ==========================
    // MCQ
    // ==========================

    if (q.type === "mcq") {

        html += `<h2>${q.question}</h2>`;

        q.options.forEach((option, index) => {

            let checked = "";

            if (answers[currentQuestion] &&
                answers[currentQuestion].includes(index))
                checked = "checked";

            html += `
            <label>
                <input
                type="checkbox"
                value="${index}"
                ${checked}>
                ${option}
            </label><br><br>
            `;
        });

    }

    // ==========================
    // Fill Blank
    // ==========================

    else if (q.type === "fill") {

        html += `
        <h2>${q.question}</h2>

        <input
        id="fillAnswer"
        type="text"
        value="${answers[currentQuestion] || ""}"
        placeholder="Your Answer">
        `;

    }

    // ==========================
    // Short Answer
    // ==========================

    else if (q.type === "short") {

        html += `
        <h2>${q.question}</h2>

        <textarea
        id="shortAnswer"
        rows="6"
        placeholder="Write Answer...">${answers[currentQuestion] || ""}</textarea>
        `;

    }

    // ==========================
    // Long Answer
    // ==========================

    else if (q.type === "long") {

        html += `
        <h2>${q.question}</h2>

        <textarea
        id="longAnswer"
        rows="10"
        placeholder="Write Long Answer...">${answers[currentQuestion] || ""}</textarea>
        `;

    }

    // ==========================
    // Programming
    // ==========================

    else if (q.type === "programming") {

        html += `
        <h2>${q.question}</h2>

        <p><b>Language:</b> ${q.language}</p>

        <textarea
        id="codeAnswer"
        rows="15"
        placeholder="Write Program Here...">${answers[currentQuestion] || ""}</textarea>
        `;

    }

    document.getElementById("questionBox").innerHTML = html;

}

// --------------------------------
// Save Current Answer
// --------------------------------

function saveCurrentAnswer() {

    const q = questions[currentQuestion];

    if (q.type === "mcq") {

        let selected = [];

        document.querySelectorAll(
            "input[type=checkbox]:checked"
        ).forEach(box => {

            selected.push(Number(box.value));

        });

        answers[currentQuestion] = selected;

    }

    else if (q.type === "fill") {

        answers[currentQuestion] =
            document.getElementById("fillAnswer").value;

    }

    else if (q.type === "short") {

        answers[currentQuestion] =
            document.getElementById("shortAnswer").value;

    }

    else if (q.type === "long") {

        answers[currentQuestion] =
            document.getElementById("longAnswer").value;

    }

    else if (q.type === "programming") {

        answers[currentQuestion] =
            document.getElementById("codeAnswer").value;

    }

    localStorage.setItem(
        "answers",
        JSON.stringify(answers)
    );

}

// ----------------------------
// Next Question
// ----------------------------

function saveAndNext() {

    saveCurrentAnswer();

    if (currentQuestion < questions.length - 1) {

        currentQuestion++;

        showQuestion();

    }
    else {

        alert("Last Question");

    }

}

// ----------------------------
// Previous
// ----------------------------

function previousQuestion() {

    saveCurrentAnswer();

    if (currentQuestion > 0) {

        currentQuestion--;

        showQuestion();

    }

}

// ----------------------------
// Temporary Submit
// ----------------------------

function submitExam() {

    saveCurrentAnswer();

    alert("Exam Submitted!");

    console.log(answers);

}


// =========================
// TIMER
// =========================

let timeLeft = exam.duration * 60;

const timer = setInterval(() => {

    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;

    document.getElementById("timer").innerHTML =
        String(minutes).padStart(2, "0") +
        ":" +
        String(seconds).padStart(2, "0");

    if (timeLeft <= 0) {

        clearInterval(timer);

        alert("Time Over!");

        submitExam();

    }

    timeLeft--;

}, 1000);


// =========================
// AUTO SAVE
// =========================

setInterval(() => {

    saveCurrentAnswer();

    console.log("Auto Saved");

}, 5000);


// =========================
// PROGRESS BAR
// =========================

function updateProgress() {

    let percent =
        ((currentQuestion + 1) / questions.length) * 100;

    document.getElementById("progressBar").style.width =
        percent + "%";

}


// =========================
// QUESTION PALETTE
// =========================

function createPalette() {

    let html = "";

    questions.forEach((q, index) => {

        let cls =
            answers[index]
                ? "answered"
                : "unanswered";

        html += `
        <button
        class="paletteBtn ${cls}"
        onclick="gotoQuestion(${index})">

        ${index + 1}

        </button>
        `;

    });

    document.getElementById("palette").innerHTML = html;

}


// =========================
// GOTO QUESTION
// =========================

function gotoQuestion(index){

    saveCurrentAnswer();

    currentQuestion = index;

    showQuestion();

}


// =========================
// UPDATE UI
// =========================

// Save original function
const oldShowQuestion = showQuestion;

// Override it
showQuestion = function(){

    oldShowQuestion();

    updateProgress();

    createPalette();

};

// Reload current question
showQuestion();
