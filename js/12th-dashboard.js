// GoalGuru - 12th Student Dashboard Module

// Dashboard state
let selectedStream = '';
let examData = [];
let collegeData = [];

// Initialize 12th dashboard
document.addEventListener('DOMContentLoaded', function() {
    initializeDashboard();
    loadExamData();
    loadCollegeData();
});

function initializeDashboard() {
    // Load saved stream selection
    const savedStream = GoalGuru.getFromStorage('selected-stream-12th');
    if (savedStream) {
        selectedStream = savedStream;
        document.getElementById('streamSelect').value = savedStream;
        updateDashboard();
    }

    // Track dashboard visit
    GoalGuru.trackEvent('dashboard', 'visited', '12th-student');
}

// Update dashboard based on selected stream
function updateDashboard() {
    selectedStream = document.getElementById('streamSelect').value;

    if (selectedStream) {
        GoalGuru.saveToStorage('selected-stream-12th', selectedStream);
        updateExamList();
        updateQuickActions();

        // Track stream selection
        GoalGuru.trackEvent('stream', 'selected', selectedStream);
    }
}

// Load exam data based on stream
function loadExamData() {
    examData = {
        'science-bio': [
            {
                name: 'NEET 2025',
                fullName: 'National Eligibility cum Entrance Test',
                registrationStart: '2024-12-01',
                registrationEnd: '2024-12-31',
                examDate: '2025-05-05',
                status: 'upcoming',
                description: 'All India medical entrance exam',
                eligibility: 'Physics, Chemistry, Biology (12th)',
                websites: ['neet.nta.nic.in']
            },
            {
                name: 'AIIMS MBBS 2025',
                fullName: 'All India Institute of Medical Sciences',
                registrationStart: '2024-11-15',
                registrationEnd: '2024-12-15',
                examDate: '2025-05-20',
                status: 'registration-open',
                description: 'AIIMS medical entrance exam',
                eligibility: 'Physics, Chemistry, Biology (12th)',
                websites: ['aiimsexams.ac.in']
            }
        ],
        'science-math': [
            {
                name: 'JEE Main 2025',
                fullName: 'Joint Entrance Examination Main',
                registrationStart: '2024-11-01',
                registrationEnd: '2024-11-30',
                examDate: '2025-01-24',
                status: 'registration-open',
                description: 'National engineering entrance exam',
                eligibility: 'Physics, Chemistry, Mathematics (12th)',
                websites: ['jeemain.nta.nic.in']
            },
            {
                name: 'JEE Advanced 2025',
                fullName: 'Joint Entrance Examination Advanced',
                registrationStart: '2025-04-30',
                registrationEnd: '2025-05-09',
                examDate: '2025-05-18',
                status: 'upcoming',
                description: 'IIT entrance exam (for JEE Main qualifiers)',
                eligibility: 'JEE Main qualified',
                websites: ['jeeadv.ac.in']
            },
            {
                name: 'BITSAT 2025',
                fullName: 'Birla Institute of Technology and Science Admission Test',
                registrationStart: '2024-12-15',
                registrationEnd: '2025-02-15',
                examDate: '2025-05-15',
                status: 'upcoming',
                description: 'BITS Pilani entrance exam',
                eligibility: 'Physics, Chemistry, Mathematics (12th)',
                websites: ['bitsadmission.com']
            }
        ],
        'commerce': [
            {
                name: 'CUET 2025',
                fullName: 'Common University Entrance Test',
                registrationStart: '2025-02-01',
                registrationEnd: '2025-03-31',
                examDate: '2025-05-15',
                status: 'upcoming',
                description: 'Central universities entrance exam',
                eligibility: '12th pass in relevant subjects',
                websites: ['cuet.samarth.ac.in']
            },
            {
                name: 'DU JAT 2025',
                fullName: 'Delhi University Joint Admission Test',
                registrationStart: '2025-04-01',
                registrationEnd: '2025-05-15',
                examDate: '2025-06-10',
                status: 'upcoming',
                description: 'DU BMS/BBA entrance exam',
                eligibility: '12th pass with Mathematics',
                websites: ['du.ac.in']
            }
        ],
        'arts': [
            {
                name: 'CUET 2025',
                fullName: 'Common University Entrance Test',
                registrationStart: '2025-02-01',
                registrationEnd: '2025-03-31',
                examDate: '2025-05-15',
                status: 'upcoming',
                description: 'Central universities entrance exam',
                eligibility: '12th pass in relevant subjects',
                websites: ['cuet.samarth.ac.in']
            },
            {
                name: 'BHU UET 2025',
                fullName: 'Banaras Hindu University Undergraduate Entrance Test',
                registrationStart: '2025-01-15',
                registrationEnd: '2025-03-15',
                examDate: '2025-04-15',
                status: 'upcoming',
                description: 'BHU arts and social science entrance',
                eligibility: '12th pass in relevant subjects',
                websites: ['bhu.ac.in']
            }
        ]
    };
}

// Load college data
function loadCollegeData() {
    collegeData = {
        'science-bio': [
            {
                name: 'AIIMS Delhi',
                type: 'Government Medical College',
                location: 'New Delhi',
                fees: '₹1,364 (Annual)',
                rating: 4.8,
                cutoff: 'NEET: 701+ (General)',
                placements: '100% placement in medical field'
            }
        ],
        'science-math': [
            {
                name: 'IIT Bombay',
                type: 'Technical Institute',
                location: 'Mumbai, Maharashtra',
                fees: '₹2,53,000 (Annual)',
                rating: 4.9,
                cutoff: 'JEE Advanced: 1-100 (General)',
                placements: 'Average: ₹20 LPA'
            }
        ],
        'commerce': [
            {
                name: 'Delhi University',
                type: 'Central University',
                location: 'New Delhi',
                fees: '₹50,000 (Annual)',
                rating: 4.5,
                cutoff: 'CUET: 98%+ (General)',
                placements: 'Average: ₹8 LPA'
            }
        ],
        'arts': [
            {
                name: 'JNU Delhi',
                type: 'Central University',
                location: 'New Delhi',
                fees: '₹30,000 (Annual)',
                rating: 4.6,
                cutoff: 'CUET: 95%+ (General)',
                placements: 'Average: ₹6 LPA'
            }
        ]
    };
}

// Update exam list based on selected stream
function updateExamList() {
    const examList = document.getElementById('examList');
    if (!examList) return;

    const exams = examData[selectedStream] || [];

    examList.innerHTML = '';

    exams.forEach(exam => {
        const examItem = document.createElement('div');
        examItem.className = 'exam-item';

        const statusClass = exam.status.replace('-', '');
        const statusText = exam.status.replace('-', ' ').replace(/\w/g, l => l.toUpperCase());

        examItem.innerHTML = `
            <div class="exam-info">
                <h4>${exam.name}</h4>
                <p class="exam-date">Registration: ${GoalGuru.formatDate(exam.registrationStart)}</p>
                <p class="exam-status ${statusClass}">${statusText}</p>
            </div>
            <button class="btn btn-sm btn-outline" onclick="viewExamDetails('${exam.name}')">View Details</button>
        `;

        examList.appendChild(examItem);
    });
}

// View exam details
function viewExamDetails(examName) {
    const exam = Object.values(examData)
        .flat()
        .find(e => e.name === examName);

    if (!exam) return;

    GoalGuru.trackEvent('exam', 'view-details', examName);

    const details = `
        ${exam.fullName}

        Registration: ${GoalGuru.formatDate(exam.registrationStart)} - ${GoalGuru.formatDate(exam.registrationEnd)}
        Exam Date: ${GoalGuru.formatDate(exam.examDate)}
        Eligibility: ${exam.eligibility}

        ${exam.description}

        Official Website: ${exam.websites[0]}
    `;

    GoalGuru.showNotification(details, 'info');
}

// View all exams
function viewAllExams() {
    GoalGuru.trackEvent('exam', 'view-all');
    GoalGuru.showNotification('Opening comprehensive exam calendar...', 'info');

    // In a real app, this would navigate to a detailed exams page
    console.log('Viewing all exams for stream:', selectedStream);
}

// Open college finder
function openCollegeFinder() {
    GoalGuru.trackEvent('college', 'finder-opened');
    GoalGuru.showNotification('Opening College Finder...', 'info');

    // Navigate to college finder page
    window.location.href = 'college-finder.html';
}

// View career roadmap
function viewRoadmap(category) {
    GoalGuru.trackEvent('roadmap', 'viewed', category);

    const roadmaps = {
        'engineering': 'Engineering: JEE → B.Tech → Job/M.Tech → Senior Engineer/Entrepreneur',
        'medical': 'Medical: NEET → MBBS → NEET PG → MD/MS → Doctor/Specialist',
        'business': 'Business: 12th → BBA/B.Com → MBA → Manager → Executive',
        'arts': 'Arts: 12th → BA → MA/Professional Course → Career in chosen field'
    };

    GoalGuru.showNotification(
        `${category.toUpperCase()} ROADMAP: ${roadmaps[category]}`,
        'info'
    );
}

// Update quick actions based on stream
function updateQuickActions() {
    // This function would update the quick actions section
    // based on the selected stream
    console.log('Quick actions updated for:', selectedStream);
}

// Compare colleges
function compareColleges() {
    GoalGuru.trackEvent('college', 'compare');
    GoalGuru.showNotification('College comparison tool coming soon!', 'info');
}

// Cutoff predictor
function cutoffPredictor() {
    GoalGuru.trackEvent('tool', 'cutoff-predictor');
    GoalGuru.showNotification('Cutoff prediction tool coming soon!', 'info');
}

// Admission alerts
function admissionAlert() {
    GoalGuru.trackEvent('alert', 'admission');
    GoalGuru.showNotification('Admission alerts setup coming soon!', 'info');
}

// Counseling info
function counselingInfo() {
    GoalGuru.trackEvent('info', 'counseling');
    GoalGuru.showNotification('Counseling information coming soon!', 'info');
}

// Explore scholarships
function exploreScholarships() {
    GoalGuru.trackEvent('scholarship', 'explore');
    GoalGuru.showNotification('Opening scholarship finder...', 'info');
}

console.log('12th Student Dashboard JavaScript loaded');