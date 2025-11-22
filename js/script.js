// GoalGuru - Main JavaScript

// Global Variables
let currentUser = null;
let currentRole = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    
    // Check if user is logged in
    checkUserSession();
    
    // Initialize smooth scrolling
    initializeSmoothScrolling();
    
    // Initialize quiz
    initializeQuiz();
});

const typewriterText = document.getElementById('typewriter-text');
if (typewriterText) {
    const messages = [
        'Personalized career guidance for Class 10th & 12th students and parents.',
        'Make informed decisions about streams, colleges, and career paths.',
        'Discover your ideal stream with our interactive assessment quiz.',
        'Find the perfect college that matches your goals and budget.',
        'Get expert guidance from experienced counselors and mentors.'
    ];

    let messageIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function typeWriter() {
        const currentMessage = messages[messageIndex];

        if (isDeleting) {
            typewriterText.textContent = currentMessage.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typewriterText.textContent = currentMessage.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentMessage.length) {
            setTimeout(() => {
                isDeleting = true;
            }, 2000);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            messageIndex = (messageIndex + 1) % messages.length;
        }

        setTimeout(typeWriter, typeSpeed);
    }

    // Start the typing effect
    typeWriter();
}

// Initialize the application
function initializeApp() {
    console.log('GoalGuru initialized');

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('GoalGuru-theme');
    if (savedTheme) {
        document.body.classList.add(savedTheme);
    }
}

// Check user session
function checkUserSession() {
    const savedUser = localStorage.getItem('GoalGuru-user');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        console.log('User session found:', currentUser.name);
    }
}

// Initialize smooth scrolling for navigation links
function initializeSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Authentication Functions
function showAuth(type) {
    const modal = document.getElementById('authModal');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');

    if (modal && loginForm && signupForm) {
        if (type === 'login') {
            loginForm.style.display = 'block';
            signupForm.style.display = 'none';
        } else {
            loginForm.style.display = 'none';
            signupForm.style.display = 'block';
        }

        modal.style.display = 'block';

        // Add fade-in animation
        setTimeout(() => {
            modal.querySelector('.modal-content').style.transform = 'scale(1)';
        }, 10);
    }
}

function closeAuth() {
    const modal = document.getElementById('authModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function switchToSignup() {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    if (loginForm && signupForm) {
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
    }
}

function switchToLogin() {
    const signupForm = document.getElementById('signupForm');
    const loginForm = document.getElementById('loginForm');
    if (signupForm && loginForm) {
        signupForm.style.display = 'none';
        loginForm.style.display = 'block';
    }
}

// Handle login form submission
function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Basic validation
    if (!email || !password) {
        alert('Please fill in all fields');
        return;
    }

    // Simulate login (in real app, this would be an API call)
    const userData = {
        email: email,
        name: email.split('@')[0], // Use email prefix as name
        loginTime: new Date().toISOString()
    };

    // Save user data
    localStorage.setItem('GoalGuru-user', JSON.stringify(userData));
    currentUser = userData;

    // Close modal
    closeAuth();

    // Show success message
    showNotification('Login successful! Redirecting to role selection...', 'success');

    // Redirect to role selection after delay
    setTimeout(() => {
        window.location.href = 'role-selection.html';
    }, 1500);
}

// Handle signup form submission
function handleSignup(event) {
    event.preventDefault();

    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;

    // Validation
    if (!name || !email || !password || !confirmPassword) {
        alert('Please fill in all fields');
        return;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    if (password.length < 6) {
        alert('Password must be at least 6 characters long');
        return;
    }

    // Simulate signup (in real app, this would be an API call)
    const userData = {
        name: name,
        email: email,
        signupTime: new Date().toISOString()
    };

    // Save user data
    localStorage.setItem('GoalGuru-user', JSON.stringify(userData));
    currentUser = userData;

    // Close modal
    closeAuth();

    // Show success message
    showNotification('Account created successfully! Redirecting to role selection...', 'success');

    // Redirect to role selection after delay
    setTimeout(() => {
        window.location.href = 'role-selection.html';
    }, 1500);
}

// Role selection function
function selectRole(role) {
    currentRole = role;
    localStorage.setItem('GoalGuru-role', role);

    // Show loading state
    showNotification('Loading your personalized dashboard...', 'info');

    // Redirect based on role
    setTimeout(() => {
        switch(role) {
            case '10th-student':
                window.location.href = '10th-dashboard.html';
                break;
            case '12th-student':
                window.location.href = '12th-dashboard.html';
                break;
            case 'parent':
                window.location.href = 'parent-dashboard.html';
                break;
            default:
                console.error('Invalid role selected');
        }
    }, 1000);
}

// Logout function
function logout() {
    // Clear user data
    localStorage.removeItem('GoalGuru-user');
    localStorage.removeItem('GoalGuru-role');
    localStorage.removeItem('GoalGuru-quiz-results');

    currentUser = null;
    currentRole = null;

    // Show message
    showNotification('Logged out successfully!', 'success');

    // Redirect to home
    setTimeout(() => {
        window.location.href = '../index.html';
    }, 1000);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="closeNotification()">&times;</button>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        animation: slideInRight 0.3s ease;
        max-width: 400px;
    `;
    

    // Add to body
    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            closeNotification(notification);
        }
    }, 5000);
}

function getNotificationIcon(type) {
    switch(type) {
        case 'success': return 'check-circle';
        case 'error': return 'exclamation-circle';
        case 'warning': return 'exclamation-triangle';
        default: return 'info-circle';
    }
}

function getNotificationColor(type) {
    switch(type) {
        case 'success': return '#28A745';
        case 'error': return '#DC3545';
        case 'warning': return '#FFC107';
        default: return '#6552D0';
    }
}

function closeNotification(notification) {
    if (!notification) {
        notification = document.querySelector('.notification');
    }
    if (notification) {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }

    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }

    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        margin-left: auto;
        padding: 0;
        line-height: 1;
    }

    .notification-close:hover {
        opacity: 0.8;
    }

    .quiz-question {
        font-size: 1.2rem;
        margin-bottom: 1rem;
        font-weight: 500;
    }

    .quiz-options {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
    }

    .quiz-option {
        text-align: left;
        padding: 0.75rem 1rem;
        transition: all 0.3s ease;
    }

    .quiz-option:hover {
        background-color: #6552D0;
        color: white;
        border-color: #6552D0;
        cursor: pointer;
        transform: translateY(-2px);
    }
`;
document.head.appendChild(style);

// Quiz Data
const quizQuestions = [
    {
        question: "What type of problem do you enjoy solving the most?",
        options: [
            {text: "Math puzzles and logical problems", stream: "Science-Maths"},
            {text: "Understanding living things and nature", stream: "Science-Bio"},
            {text: "How businesses make money and grow", stream: "Commerce"},
            {text: "Expressing ideas creatively through art or writing", stream: "Arts"}
        ]
    },
    {
        question: "Which subject do you enjoy studying the most?",
        options: [
            {text: "Mathematics", stream: "Science-Maths"},
            {text: "Biology", stream: "Science-Bio"},
            {text: "Economics, Accounts, Business Studies", stream: "Commerce"},
            {text: "History, Literature, Political Science", stream: "Arts"}
        ]
    },
    {
        question: "What kind of activities do you prefer in your free time?",
        options: [
            {text: "Conducting experiments or coding", stream: "Science-Maths"},
            {text: "Exploring nature and animals", stream: "Science-Bio"},
            {text: "Participating in debates or business simulations", stream: "Commerce"},
            {text: "Painting, writing stories, or performing", stream: "Arts"}
        ]
    },
    {
        question: "What motivates you the most?",
        options: [
            {text: "Discovering how things work and why", stream: "Science-Maths"},
            {text: "Helping people through medicine or research", stream: "Science-Bio"},
            {text: "Building successful businesses or managing money", stream: "Commerce"},
            {text: "Influencing society through ideas and culture", stream: "Arts"}
        ]
    },
    {
        question: "How do you handle challenges?",
        options: [
            {text: "By logical reasoning and analysis", stream: "Science-Maths"},
            {text: "By understanding living systems and solutions", stream: "Science-Bio"},
            {text: "By strategizing and negotiating", stream: "Commerce"},
            {text: "By creativity and critical thinking", stream: "Arts"}
        ]
    },
    {
        question: "What type of career appeals to you?",
        options: [
            {text: "Engineering, IT, Data Science", stream: "Science-Maths"},
            {text: "Medicine, Biotechnology, Research", stream: "Science-Bio"},
            {text: "Finance, Marketing, Entrepreneurship", stream: "Commerce"},
            {text: "Writing, Designing, Social Work", stream: "Arts"}
        ]
    },
    {
        question: "What do you find most satisfying in school?",
        options: [
            {text: "Solving math equations and experiments", stream: "Science-Maths"},
            {text: "Studying human body and plants", stream: "Science-Bio"},
            {text: "Classroom discussions on economics and business", stream: "Commerce"},
            {text: "Learning about history and cultures", stream: "Arts"}
        ]
    },
    {
        question: "Which skill do you want to develop more?",
        options: [
            {text: "Analytical and technical skills", stream: "Science-Maths"},
            {text: "Observation and research skills", stream: "Science-Bio"},
            {text: "Sales, negotiation, and management skills", stream: "Commerce"},
            {text: "Communication and creative skills", stream: "Arts"}
        ]
    },
    {
        question: "Choose a hobby you enjoy the most.",
        options: [
            {text: "Solving puzzles or programming", stream: "Science-Maths"},
            {text: "Gardening or volunteering at animal shelters", stream: "Science-Bio"},
            {text: "Running a small online business or stock trading", stream: "Commerce"},
            {text: "Creative writing, drama, or music", stream: "Arts"}
        ]
    },
    {
        question: "What advice would you give someone about their future?",
        options: [
            {text: "Focus on subjects that build strong logical foundations", stream: "Science-Maths"},
            {text: "Pursue passions in biology and caring professions", stream: "Science-Bio"},
            {text: "Develop good financial and leadership skills", stream: "Commerce"},
            {text: "Explore your creativity and human values deeply", stream: "Arts"}
        ]
    }
];

// Quiz state
let currentQuestionIndex = 0;
const scores = {
    "Science-Maths": 0,
    "Science-Bio": 0,
    "Commerce": 0,
    "Arts": 0
};

// Initialize quiz
function initializeQuiz() {
    const startBtn = document.getElementById('startQuizBtn');
    if (startBtn) {
        startBtn.addEventListener('click', startQuiz);
    }
}

// Start the quiz
function startQuiz() {
    currentQuestionIndex = 0;
    for (let key in scores) {
        scores[key] = 0;
    }
    showQuestion();
    
    // Track quiz start
    trackEvent('quiz', 'start', '10th-stream-selection');
}

function showQuestion() {
    const quizContent = document.getElementById('quizContent');
    if (!quizContent) return;
    
    const questionObj = quizQuestions[currentQuestionIndex];
    let html = `<h4>Question ${currentQuestionIndex + 1} of ${quizQuestions.length}</h4>`;
    html += `<p class="quiz-question">${questionObj.question}</p>`;
    html += `<div class="quiz-options">`;
    questionObj.options.forEach(option => {
        html += `<button class="btn btn-outline quiz-option" onclick="selectOption('${option.stream}')">${option.text}</button>`;
    });
    html += `</div>`;
    quizContent.innerHTML = html;
}

function selectOption(stream) {
    scores[stream]++;
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
        showQuestion();
    } else {
        showResult();
        updateQuizProgress();
    }
}

function showResult() {
    const quizContent = document.getElementById('quizContent');
    if (!quizContent) return;
    
    // Find highest scored stream
    let maxScore = 0;
    let recommendedStream = null;

    for (const stream in scores) {
        if (scores[stream] > maxScore) {
            maxScore = scores[stream];
            recommendedStream = stream;
        }
    }

    let streamName = "";
    let description = "";
    let icon = "";

    if (recommendedStream === "Science-Maths") {
        streamName = "Science - Mathematics";
        description = "You have strong analytical and problem-solving skills, making Science (Maths) a great fit for building careers in engineering, technology, and data science. Your logical thinking and mathematical abilities can lead to exciting opportunities in fields like computer science, physics, and advanced mathematics.";
        icon = "fas fa-calculator";
    } else if (recommendedStream === "Science-Bio") {
        streamName = "Science - Biology";
        description = "Your interest in living things and research makes Science (Biology) an excellent choice to pursue medicine, biotechnology, and healthcare professions. Your curiosity about life sciences can open doors to careers in medical research, environmental science, and healthcare innovation.";
        icon = "fas fa-microscope";
    } else if (recommendedStream === "Commerce") {
        streamName = "Commerce";
        description = "You have a knack for business, finance, and strategy, making Commerce ideal for careers in marketing, accounting, and entrepreneurship. Your understanding of economic principles and business dynamics can lead to success in finance, management, and business development.";
        icon = "fas fa-chart-line";
    } else {
        streamName = "Arts / Humanities";
        description = "Your creativity and passion for culture and society point towards a fulfilling journey in Arts, social sciences, and communication fields. Your ability to think critically about human experiences can lead to impactful careers in journalism, psychology, literature, and social work.";
        icon = "fas fa-palette";
    }

    const resultHtml = `
        <div class="quiz-result">
            <div class="result-header">
                <i class="${icon}" style="font-size: 3rem; color: #6552D0; margin-bottom: 1rem;"></i>
                <h3>Your Recommended Stream:</h3>
                <h2 style="color:#white; margin: 0.5rem 0;">${streamName}</h2>
            </div>
            <div class="result-description">
                <p>${description}</p>
            </div>
            <div class="result-disclaimer">
                <p><em><strong>Important Note:</strong> This quiz is designed as a helpful guide to spark your thinking about stream selection. Your final decision should be based on deeper self-exploration, discussions with mentors, parents, and professional career counselors. Consider your long-term goals, interests, and the subjects you truly enjoy studying. Remember, every stream offers unique opportunities for success and fulfillment!</em></p>
            </div>
            <div class="result-actions">
                <button class="btn btn-primary" onclick="restartQuiz()" style="margin-right: 1rem;">
                    <i class="fas fa-redo"></i> Take Quiz Again
                </button>
                <button class="btn btn-outline" onclick="exploreStream('${recommendedStream}')">
                    <i class="fas fa-search"></i> Explore This Stream
                </button>
            </div>
        </div>
    `;

    quizContent.innerHTML = resultHtml;
    
    // Save result
    saveToStorage('quiz-results', {
        stream: recommendedStream,
        streamName: streamName,
        scores: scores,
        completedAt: new Date().toISOString()
    });
    
    // Track quiz completion
    trackEvent('quiz', 'complete', recommendedStream);
}

function restartQuiz() {
    const quizContent = document.getElementById('quizContent');
    if (!quizContent) return;
    
    quizContent.innerHTML = `
        <p id="quizIntro">Take our fun quiz to discover which stream suits your interests and strengths best. Click Start to begin!</p>
        <div class="quiz-stats">
            <div class="stat">
                <span class="stat-number">10</span>
                <span class="stat-label">Questions</span>
            </div>
            <div class="stat">
                <span class="stat-number">5</span>
                <span class="stat-label">Minutes</span>
            </div>
        </div>
        <button class="btn btn-primary" id="startQuizBtn">
            <i class="fas fa-play"></i> Start Quiz
        </button>
    `;
    const startBtn = document.getElementById('startQuizBtn');
    startBtn.addEventListener('click', startQuiz);
}

function updateQuizProgress() {
    const progressElement = document.getElementById('quizProgress');
    if (progressElement) {
        progressElement.textContent = '1/1';
    }
}

function exploreStream(stream) {
    showNotification(`Exploring ${stream} stream details...`, 'info');
    // This would typically redirect to a detailed stream exploration page
}

// Placeholder functions for existing buttons
function viewStreamDetails() {
    showNotification('Stream details feature coming soon!', 'info');
}

function exploreCareers(stream) {
    showNotification(`Exploring ${stream} careers...`, 'info');
}

function viewAllSubjects() {
    showNotification('Subject information feature coming soon!', 'info');
}

function viewMoreTips() {
    showNotification('More study tips coming soon!', 'info');
}

// Utility functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function generateId() {
    return Math.random().toString(36).substr(2, 9);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Local storage utilities
function saveToStorage(key, data) {
    try {
        localStorage.setItem(`GoalGuru-${key}`, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('Error saving to localStorage:', error);
        return false;
    }
}

function getFromStorage(key) {
    try {
        const data = localStorage.getItem(`GoalGuru-${key}`);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error reading from localStorage:', error);
        return null;
    }
}

function removeFromStorage(key) {
    try {
        localStorage.removeItem(`GoalGuru-${key}`);
        return true;
    } catch (error) {
        console.error('Error removing from localStorage:', error);
        return false;
    }
}

// Progress tracking
function updateProgress(section, completed, total) {
    const progressKey = `progress-${section}`;
    const progress = {
        completed: completed,
        total: total,
        percentage: Math.round((completed / total) * 100),
        lastUpdated: new Date().toISOString()
    };

    saveToStorage(progressKey, progress);

    // Update UI if element exists
    const progressElement = document.getElementById(`${section}Progress`);
    if (progressElement) {
        progressElement.textContent = `${completed}/${total}`;
    }

    return progress;
}

// Analytics (basic tracking)
function trackEvent(category, action, label = '') {
    const event = {
        category: category,
        action: action,
        label: label,
        timestamp: new Date().toISOString(),
        user: currentUser?.email || 'anonymous',
        role: currentRole || 'none'
    };

    // In a real application, this would send to analytics service
    console.log('Analytics Event:', event);

    // Save locally for now
    const events = getFromStorage('analytics-events') || [];
    events.push(event);

    // Keep only last 100 events
    if (events.length > 100) {
        events.shift();
    }

    saveToStorage('analytics-events', events);
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('Global error:', e.error);
    trackEvent('error', 'javascript', e.message);
});

// Modal click outside to close
document.addEventListener('click', function(e) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});

// Escape key to close modals
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (modal.style.display === 'block') {
                modal.style.display = 'none';
            }
        });
    }
});

console.log('GoalGuru JavaScript loaded successfully');


const YOUTUBE_API_KEY = 'AIzaSyDk-rREFXX9ZwZzweJOcge-1KII01beBSs'; // Secure it appropriately in production

const youtubeSearchBtn = document.getElementById('youtubeSearchBtn');
const youtubeQueryInput = document.getElementById('youtubeQuery');
const youtubeResultsDiv = document.getElementById('youtubeResults');

if (youtubeSearchBtn) {
    youtubeSearchBtn.addEventListener('click', youtubeSearch);
}

if (youtubeQueryInput) {
    youtubeQueryInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') youtubeSearch();
    });
}

async function youtubeSearch() {
    const query = youtubeQueryInput.value.trim();
    if (!query) return;

    youtubeResultsDiv.innerHTML = "<p>Loading videos...</p>";

    const endpoint = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=8&order=date&q=${encodeURIComponent(query)}&key=${YOUTUBE_API_KEY}`;

    try {
        const response = await fetch(endpoint);
        const data = await response.json();
        showYoutubeResults(data.items || []);
    } catch (error) {
        youtubeResultsDiv.innerHTML = `<p class="error">An error occurred fetching YouTube videos.</p>`;
    }
}

function showYoutubeResults(videos) {
    if (videos.length === 0) {
        youtubeResultsDiv.innerHTML = "<p>No videos found. Try a different search.</p>";
        return;
    }

    youtubeResultsDiv.innerHTML = videos.map(video => `
      <div class="youtube-video-card">
        <a href="https://www.youtube.com/watch?v=${video.id.videoId}" target="_blank" rel="noopener">
          <img class="youtube-thumbnail" src="${video.snippet.thumbnails.medium.url}" alt="Video Thumbnail">
        </a>
        <div class="youtube-info">
          <a href="https://www.youtube.com/watch?v=${video.id.videoId}" target="_blank" rel="noopener">
            <h4 class="youtube-title">${video.snippet.title}</h4>
          </a>
          <p class="youtube-channel">${video.snippet.channelTitle}</p>
        </div>
      </div>
    `).join('');
}

