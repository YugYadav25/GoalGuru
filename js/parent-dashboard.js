//  GoalGuru - Parent Dashboard Module

// Parent dashboard state
let childClass = '';
let timelineData = [];
let faqData = [];

// Initialize parent dashboard
document.addEventListener('DOMContentLoaded', function () {
    initializeParentDashboard();
    loadTimelineData();
    loadFAQData();
    fetchQuote();
    fetchInsights();
    renderFAQs(false); // Show top 3 initially
});

function initializeParentDashboard() {
    // Load saved child class
    const savedClass = GoalGuru.getFromStorage('child-class');
    if (savedClass) {
        childClass = savedClass;
        document.getElementById('childClass').value = savedClass;
        updateParentDashboard();
    }

    // Track parent dashboard visit
    GoalGuru.trackEvent('dashboard', 'visited', 'parent');
}

// Update parent dashboard based on child's class
function updateParentDashboard() {
    childClass = document.getElementById('childClass').value;

    if (childClass) {
        GoalGuru.saveToStorage('child-class', childClass);
        updateTimelineForClass();

        // Track child class selection
        GoalGuru.trackEvent('parent', 'child-class-selected', childClass);
    }
}

// Load timeline data
function loadTimelineData() {
    timelineData = {
        '10th': [
            {
                date: 'March 2025',
                title: 'Class 10 Board Exams',
                description: 'CBSE/State board examinations begin'
            },
            {
                date: 'May 2025',
                title: 'Results Declaration',
                description: 'Class 10 results typically announced'
            },
            {
                date: 'June 2025',
                title: 'Stream Selection',
                description: 'Choose between Science, Commerce, Arts'
            },
            {
                date: 'July 2025',
                title: 'Class 11 Admission',
                description: 'School admissions for Class 11'
            }
        ],
        '12th': [
            {
                date: 'Nov 2024',
                title: 'JEE Main Registration',
                description: 'Registration opens for JEE Main 2025'
            },
            {
                date: 'Dec 2024',
                title: 'NEET Registration',
                description: 'NEET 2025 registration begins'
            },
            {
                date: 'Jan 2025',
                title: 'JEE Main Session 1',
                description: 'First session of JEE Main exam'
            },
            {
                date: 'Feb 2025',
                title: 'Board Exam Preparation',
                description: 'Final preparation for Class 12 boards'
            },
            {
                date: 'March 2025',
                title: 'Class 12 Board Exams',
                description: 'CBSE/State board examinations'
            },
            {
                date: 'May 2025',
                title: 'NEET/JEE Advanced',
                description: 'Major entrance examinations'
            },
            {
                date: 'June 2025',
                title: 'Counseling Process',
                description: 'College admission counseling begins'
            }
        ]
    };
}

// Load FAQ data
function loadFAQData() {
    faqData = [
        {
            id: 1,
            question: 'How do I know if my child chose the right stream?',
            answer: 'Look for signs of genuine interest, consistent performance, and enthusiasm in related subjects. Our stream assessment can provide objective insights. Also, observe their natural inclinations and what energizes them during study time.'
        },
        {
            id: 2,
            question: 'When should we start college planning?',
            answer: 'Ideally, start in Class 11. This gives enough time to research options, prepare for entrance exams, and make informed decisions. However, it is never too early to start exploring different career paths.'
        },
        {
            id: 3,
            question: 'How important are entrance exam coaching classes?',
            answer: 'While helpful, they are not mandatory. Self-study with good resources can be equally effective. Assess your child learning style and needs. Some students thrive in coaching environments, while others prefer independent study.'
        },
        {
            id: 4,
            question: 'Should I let my child choose their own career path?',
            answer: 'Yes, but with guidance. Provide information, share your perspective, but ultimately respect their interests and aptitude. Your role is to support and guide, not dictate. Help them make informed decisions.'
        },
        {
            id: 5,
            question: 'How can I support my child during exam stress?',
            answer: 'Create a supportive environment, encourage regular breaks, ensure proper nutrition and sleep, listen to their concerns, and avoid adding pressure. Sometimes just being there and showing understanding makes a huge difference.'
        },
        {
            id: 6,
            question: 'What if my child is not academically inclined?',
            answer: 'Academic success is not the only path to success. Explore vocational courses, skill-based programs, creative fields, or entrepreneurship. Every child has unique strengths – help them discover and develop theirs.'
        }
    ];
}

// Update timeline for selected class
function updateTimelineForClass() {
    const timelineContainer = document.querySelector('.timeline-container');
    if (!timelineContainer) return;

    const timeline = timelineData[childClass] || timelineData['12th'];

    timelineContainer.innerHTML = '';

    timeline.forEach(item => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';

        timelineItem.innerHTML = `
            <div class="timeline-date">${item.date}</div>
            <div class="timeline-content">
                <h4>${item.title}</h4>
                <p>${item.description}</p>
            </div>
        `;

        timelineContainer.appendChild(timelineItem);
    });
}

// View full timeline
function viewFullTimeline() {
    GoalGuru.trackEvent('parent', 'view-full-timeline', childClass);
    GoalGuru.showNotification('Opening detailed academic calendar...', 'info');

    // In a real app, this would open a comprehensive timeline page
}

// Get support guide
function getSupportGuide() {
    GoalGuru.trackEvent('parent', 'support-guide-requested');

    const guide = `
        PARENTAL SUPPORT GUIDE:

        EMOTIONAL SUPPORT:
        • Listen actively without judgment
        • Validate their feelings and concerns
        • Celebrate small wins and progress
        • Be patient with their decision-making process

        ACADEMIC SUPPORT:
        • Help create a study schedule
        • Ensure proper study environment
        • Monitor progress without micromanaging
        • Connect them with resources when needed

        STRESS MANAGEMENT:
        • Encourage regular breaks and hobbies
        • Ensure adequate sleep and nutrition
        • Teach relaxation techniques
        • Seek professional help if needed
    `;

    GoalGuru.showNotification(guide, 'info');
}

// Open cost calculator
function openCostCalculator() {
    GoalGuru.trackEvent('parent', 'cost-calculator-opened');

    const costInfo = `
        EDUCATION COST CALCULATOR

        Engineering (4 years):
        • Government: ₹2-8 lakhs
        • Private: ₹8-20 lakhs
        • Top Private: ₹15-25 lakhs

        Medical (5.5 years):
        • Government: ₹5-10 lakhs
        • Private: ₹25-50 lakhs

        Management (2 years MBA):
        • Government: ₹3-8 lakhs
        • Private: ₹10-25 lakhs

        *Costs include tuition, hostel, and other expenses
    `;

    GoalGuru.showNotification(costInfo, 'info');
}

// View detailed ROI analysis
function viewDetailedROI() {
    GoalGuru.trackEvent('parent', 'roi-analysis-viewed');

    const roiInfo = `
        CAREER ROI ANALYSIS

        Software Engineering:
        • Investment: ₹8-15 lakhs
        • Starting Salary: ₹6-15 LPA
        • 5-year ROI: 300-500%

        Medicine:
        • Investment: ₹15-50 lakhs
        • Starting Salary: ₹4-12 LPA
        • 10-year ROI: 200-400%

        Business/Finance:
        • Investment: ₹5-20 lakhs
        • Starting Salary: ₹4-10 LPA
        • 5-year ROI: 250-400%
    `;

    GoalGuru.showNotification(roiInfo, 'info');
}

// Find scholarships
function findScholarships() {
    GoalGuru.trackEvent('parent', 'scholarship-finder-opened');

    const scholarshipInfo = `
        SCHOLARSHIP OPPORTUNITIES:

        MERIT-BASED:
        • National Talent Search (NTSE): ₹1.25L/year
        • KVPY: ₹80K/year + research opportunities
        • State Merit Scholarships: Varies by state

        NEED-BASED:
        • Prime Minister Scholarship: ₹25K/year
        • Central Sector Scheme: ₹10-20K/year
        • Minority Scholarships: ₹30K/year

        CATEGORY-BASED:
        • SC/ST scholarships: Full fee waiver
        • OBC scholarships: Partial support
        • Girl child incentives: Various amounts
    `;

    GoalGuru.showNotification(scholarshipInfo, 'info');
}

// Toggle FAQ answers
function toggleFAQ(faqId) {
    const faqAnswer = document.getElementById(`faq-${faqId}`);
    const faqQuestion = faqAnswer.previousElementSibling;
    const icon = faqQuestion.querySelector('i');

    if (faqAnswer.classList.contains('active')) {
        faqAnswer.classList.remove('active');
        faqAnswer.style.display = 'none';
        icon.style.transform = 'rotate(0deg)';
    } else {
        // Close all other FAQs
        document.querySelectorAll('.faq-answer').forEach(answer => {
            answer.classList.remove('active');
            answer.style.display = 'none';
        });
        document.querySelectorAll('.faq-question i').forEach(ic => {
            ic.style.transform = 'rotate(0deg)';
        });

        // Open selected FAQ
        faqAnswer.classList.add('active');
        faqAnswer.style.display = 'block';
        icon.style.transform = 'rotate(180deg)';

        // Track FAQ interaction
        const faq = faqData.find(f => f.id === faqId);
        if (faq) {
            GoalGuru.trackEvent('parent', 'faq-viewed', faq.question.substring(0, 50));
        }
    }
}

// Render FAQs
function renderFAQs(showAll) {
    const faqList = document.getElementById('faq-list');
    if (!faqList) return;

    faqList.innerHTML = '';

    const faqsToShow = showAll ? faqData : faqData.slice(0, 3);

    faqsToShow.forEach(faq => {
        const faqItem = document.createElement('div');
        faqItem.className = 'faq-item';
        faqItem.onclick = () => toggleFAQ(faq.id);

        faqItem.innerHTML = `
            <div class="faq-question">
                <span>${faq.question}</span>
                <i class="fas fa-chevron-down"></i>
            </div>
            <div class="faq-answer" id="faq-${faq.id}">
                ${faq.answer}
            </div>
        `;
        faqList.appendChild(faqItem);
    });

    const viewAllBtn = document.getElementById('view-all-faqs-btn');
    if (viewAllBtn) {
        viewAllBtn.style.display = showAll ? 'none' : 'block';
    }
}

// View all FAQs (Opens Modal)
function viewAllFAQs() {
    GoalGuru.trackEvent('parent', 'all-faqs-viewed');

    const modal = document.getElementById('about-faq-modal');
    const modalFaqList = document.getElementById('modal-faq-list');

    if (modal && modalFaqList) {
        // Render FAQs into the modal
        modalFaqList.innerHTML = '';
        faqData.forEach(faq => {
            const faqItem = document.createElement('div');
            faqItem.className = 'faq-item';
            // Note: We use a different toggle function or simple expansion for modal FAQs
            // For simplicity, let's make them expandable like the main ones, but unique IDs
            const uniqueId = `modal-faq-${faq.id}`;

            faqItem.innerHTML = `
                <div class="faq-question" onclick="toggleModalFAQ('${uniqueId}')">
                    <span>${faq.question}</span>
                    <i class="fas fa-chevron-down"></i>
                </div>
                <div class="faq-answer" id="${uniqueId}">
                    ${faq.answer}
                </div>
            `;
            modalFaqList.appendChild(faqItem);
        });

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

// Close Modal
function closeModal() {
    const modal = document.getElementById('about-faq-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Toggle Modal FAQ
function toggleModalFAQ(elementId) {
    const answer = document.getElementById(elementId);
    const question = answer.previousElementSibling;
    const icon = question.querySelector('i');

    if (answer.classList.contains('active')) {
        answer.classList.remove('active');
        answer.style.maxHeight = null;
        icon.style.transform = 'rotate(0deg)';
    } else {
        // Optional: Close others in modal? Let's keep them independent for better UX in modal
        answer.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + "px";
        icon.style.transform = 'rotate(180deg)';
    }
}

// Close modal when clicking outside
window.onclick = function (event) {
    const modal = document.getElementById('about-faq-modal');
    if (event.target == modal) {
        closeModal();
    }
}

// Fetch Quote of the Day
async function fetchQuote() {
    try {
        const response = await fetch('https://dummyjson.com/quotes/random');
        const data = await response.json();
        const quoteContainer = document.getElementById('daily-quote-container');
        if (quoteContainer && data.quote) {
            quoteContainer.innerHTML = `
                <p>"${data.quote}"</p>
                <p style="font-size: 0.9em; margin-top: 5px;">- ${data.author}</p>
            `;
        }
    } catch (error) {
        console.error('Error fetching quote:', error);
    }
}

// Fetch Insights (simulated with posts)
async function fetchInsights() {
    try {
        const response = await fetch('https://dummyjson.com/posts?limit=3');
        const data = await response.json();
        const insightsContainer = document.getElementById('insights-container');

        if (insightsContainer && data.posts) {
            insightsContainer.innerHTML = '';
            data.posts.forEach(post => {
                const insightItem = document.createElement('div');
                insightItem.className = 'insight-item';
                insightItem.style.marginBottom = '15px';
                insightItem.style.padding = '10px';
                insightItem.style.background = '#f9f9f9';
                insightItem.style.borderRadius = '8px';

                insightItem.innerHTML = `
                    <h5 style="margin-bottom: 5px; color: #2c3e50;">${post.title}</h5>
                    <p style="font-size: 0.9em; color: #666;">${post.body.substring(0, 100)}...</p>
                `;
                insightsContainer.appendChild(insightItem);
            });
        }
    } catch (error) {
        console.error('Error fetching insights:', error);
        const insightsContainer = document.getElementById('insights-container');
        if (insightsContainer) {
            insightsContainer.innerHTML = '<p>Unable to load insights at the moment.</p>';
        }
    }
}

// Communication tips and resources
const communicationTips = [
    {
        title: 'Active Listening',
        tips: [
            'Give your full attention when your child speaks',
            'Ask open-ended questions about their interests',
            'Validate their feelings before offering solutions',
            'Avoid interrupting or jumping to conclusions'
        ]
    },
    {
        title: 'Positive Communication',
        tips: [
            'Focus on effort rather than just results',
            'Use "I" statements to express your concerns',
            'Celebrate small achievements and progress',
            'Avoid comparisons with other children'
        ]
    },
    {
        title: 'Setting Expectations',
        tips: [
            'Set realistic and achievable goals together',
            'Explain your reasons behind expectations',
            'Be flexible and willing to adjust plans',
            'Respect their individual pace and style'
        ]
    }
];

// Generate daily tips for parents
function getDailyTip() {
    const tips = [
        "Create a dedicated, distraction-free study space for your child.",
        "Encourage your child to teach you what they learned today.",
        "Take breaks together - a short walk can refresh both of you.",
        "Ask about their favorite subject and why they enjoy it.",
        "Help them create a visual study schedule they can follow.",
        "Celebrate completion of tasks, not just perfect results.",
        "Share stories about your own learning experiences and challenges."
    ];

    const today = new Date().getDate();
    const tipIndex = today % tips.length;

    return tips[tipIndex];
}

// Show daily tip if parent visits dashboard
function showDailyTip() {
    const lastTipDate = GoalGuru.getFromStorage('last-tip-date');
    const today = new Date().toDateString();

    if (lastTipDate !== today) {
        const tip = getDailyTip();
        setTimeout(() => {
            GoalGuru.showNotification(`Daily Tip: ${tip}`, 'info');
        }, 2000);

        GoalGuru.saveToStorage('last-tip-date', today);
    }
}

// Initialize daily tip after DOM loads
document.addEventListener('DOMContentLoaded', function () {
    setTimeout(showDailyTip, 3000); // Show after 3 seconds
});

console.log('Parent Dashboard JavaScript loaded');