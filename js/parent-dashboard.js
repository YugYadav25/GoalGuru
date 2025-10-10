// CareerCompass - Parent Dashboard Module

// Parent dashboard state
let childClass = '';
let timelineData = [];
let faqData = [];

// Initialize parent dashboard
document.addEventListener('DOMContentLoaded', function() {
    initializeParentDashboard();
    loadTimelineData();
    loadFAQData();
});

function initializeParentDashboard() {
    // Load saved child class
    const savedClass = CareerCompass.getFromStorage('child-class');
    if (savedClass) {
        childClass = savedClass;
        document.getElementById('childClass').value = savedClass;
        updateParentDashboard();
    }

    // Track parent dashboard visit
    CareerCompass.trackEvent('dashboard', 'visited', 'parent');
}

// Update parent dashboard based on child's class
function updateParentDashboard() {
    childClass = document.getElementById('childClass').value;

    if (childClass) {
        CareerCompass.saveToStorage('child-class', childClass);
        updateTimelineForClass();

        // Track child class selection
        CareerCompass.trackEvent('parent', 'child-class-selected', childClass);
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
    CareerCompass.trackEvent('parent', 'view-full-timeline', childClass);
    CareerCompass.showNotification('Opening detailed academic calendar...', 'info');

    // In a real app, this would open a comprehensive timeline page
}

// Get support guide
function getSupportGuide() {
    CareerCompass.trackEvent('parent', 'support-guide-requested');

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

    CareerCompass.showNotification(guide, 'info');
}

// Open cost calculator
function openCostCalculator() {
    CareerCompass.trackEvent('parent', 'cost-calculator-opened');

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

    CareerCompass.showNotification(costInfo, 'info');
}

// View detailed ROI analysis
function viewDetailedROI() {
    CareerCompass.trackEvent('parent', 'roi-analysis-viewed');

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

    CareerCompass.showNotification(roiInfo, 'info');
}

// Find scholarships
function findScholarships() {
    CareerCompass.trackEvent('parent', 'scholarship-finder-opened');

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

    CareerCompass.showNotification(scholarshipInfo, 'info');
}

// Toggle FAQ answers
function toggleFAQ(faqId) {
    const faqAnswer = document.getElementById(`faq-${faqId}`);
    const faqQuestion = faqAnswer.previousElementSibling;

    if (faqAnswer.classList.contains('active')) {
        faqAnswer.classList.remove('active');
        faqAnswer.style.display = 'none';
        faqQuestion.querySelector('i').style.transform = 'rotate(0deg)';
    } else {
        // Close all other FAQs
        document.querySelectorAll('.faq-answer').forEach(answer => {
            answer.classList.remove('active');
            answer.style.display = 'none';
        });
        document.querySelectorAll('.faq-question i').forEach(icon => {
            icon.style.transform = 'rotate(0deg)';
        });

        // Open selected FAQ
        faqAnswer.classList.add('active');
        faqAnswer.style.display = 'block';
        faqQuestion.querySelector('i').style.transform = 'rotate(180deg)';

        // Track FAQ interaction
        const faq = faqData.find(f => f.id === faqId);
        if (faq) {
            CareerCompass.trackEvent('parent', 'faq-viewed', faq.question.substring(0, 50));
        }
    }
}

// View all FAQs
function viewAllFAQs() {
    CareerCompass.trackEvent('parent', 'all-faqs-viewed');
    CareerCompass.showNotification('Opening comprehensive FAQ section...', 'info');
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
    const lastTipDate = CareerCompass.getFromStorage('last-tip-date');
    const today = new Date().toDateString();

    if (lastTipDate !== today) {
        const tip = getDailyTip();
        setTimeout(() => {
            CareerCompass.showNotification(`Daily Tip: ${tip}`, 'info');
        }, 2000);

        CareerCompass.saveToStorage('last-tip-date', today);
    }
}

// Initialize daily tip after DOM loads
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(showDailyTip, 3000); // Show after 3 seconds
});

console.log('Parent Dashboard JavaScript loaded');