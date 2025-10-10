// CareerCompass - Stream Selection Quiz

// Quiz data and state
let currentQuestionIndex = 0;
let userAnswers = [];
let quizResults = null;

// Stream selection quiz questions
const streamQuizQuestions = [
    {
        id: 1,
        question: "What type of activities do you enjoy most?",
        options: [
            { text: "Conducting experiments and solving mathematical problems", stream: "science", weight: 3 },
            { text: "Analyzing business trends and managing finances", stream: "commerce", weight: 3 },
            { text: "Creative writing, art, and studying human behavior", stream: "arts", weight: 3 },
            { text: "A mix of analytical and creative work", stream: "mixed", weight: 1 }
        ]
    },
    {
        id: 2,
        question: "Which subjects do you find most interesting?",
        options: [
            { text: "Physics, Chemistry, Biology, and Mathematics", stream: "science", weight: 3 },
            { text: "Mathematics, Economics, and Business Studies", stream: "commerce", weight: 3 },
            { text: "History, Literature, Psychology, and Sociology", stream: "arts", weight: 3 },
            { text: "I enjoy subjects from different streams equally", stream: "mixed", weight: 1 }
        ]
    },
    {
        id: 3,
        question: "What type of career appeals to you most?",
        options: [
            { text: "Doctor, Engineer, Scientist, or Researcher", stream: "science", weight: 3 },
            { text: "Business owner, Accountant, Banker, or Finance expert", stream: "commerce", weight: 3 },
            { text: "Teacher, Journalist, Lawyer, or Social worker", stream: "arts", weight: 3 },
            { text: "Something that combines multiple fields", stream: "mixed", weight: 1 }
        ]
    },
    {
        id: 4,
        question: "How do you prefer to solve problems?",
        options: [
            { text: "Using scientific methods and logical reasoning", stream: "science", weight: 2 },
            { text: "Through financial analysis and management", stream: "commerce", weight: 2 },
            { text: "By thinking creatively and empathetically", stream: "arts", weight: 2 },
            { text: "Mix of logic and creativity", stream: "mixed", weight: 1 }
        ]
    }
];

// Function to start the quiz
function startQuiz() {
    currentQuestionIndex = 0;
    userAnswers = [];
    showQuestion();
}

// Function to display a question
function showQuestion() {
    const container = document.getElementById("quizContainer");
    const q = streamQuizQuestions[currentQuestionIndex];

    container.innerHTML = `
        <h3>${q.question}</h3>
        <div class="options">
            ${q.options.map((opt, i) => `
                <button class="option-btn" onclick="selectAnswer('${opt.stream}')">
                    ${opt.text}
                </button>
            `).join('')}
        </div>
        <p class="progress">Question ${currentQuestionIndex + 1} of ${streamQuizQuestions.length}</p>
    `;
}

// Function to record an answer
function selectAnswer(stream) {
    userAnswers.push(stream);
    currentQuestionIndex++;

    if (currentQuestionIndex < streamQuizQuestions.length) {
        showQuestion();
    } else {
        calculateResults();
    }
}

// Function to calculate final result
function calculateResults() {
    const score = { science: 0, commerce: 0, arts: 0, mixed: 0 };

    // Tally scores based on selected streams
    userAnswers.forEach(ans => {
        score[ans]++;
    });

    // Find the stream with the highest score
    let recommended = Object.keys(score).reduce((a, b) => score[a] > score[b] ? a : b);

    let message = "";
    if (recommended === "science") {
        message = "You are analytical and logical — Science stream suits you best!";
    } else if (recommended === "commerce") {
        message = "You have a practical and business-oriented mindset — Commerce is ideal!";
    } else if (recommended === "arts") {
        message = "You’re creative and expressive — Arts stream matches your personality!";
    } else {
        message = "You have a balanced skill set — explore interdisciplinary fields!";
    }

    document.getElementById("quizContainer").innerHTML = `
        <div class="result-card">
            <h2>Your Recommended Stream: <span>${recommended.toUpperCase()}</span></h2>
            <p>${message}</p>
            <button class="btn" onclick="startQuiz()">Retake Quiz</button>
        </div>
    `;
}

// Start the quiz when the page loads
window.onload = startQuiz;
