//  GoalGuru - Resource Hub Module

// Resource hub state
let allResources = [];
let filteredResources = [];
let currentFilter = 'all';

// Initialize resource hub
document.addEventListener('DOMContentLoaded', function() {
    initializeResourceHub();
    loadResourceData();
    setupEventListeners();
});

function initializeResourceHub() {
    // Track resource hub visit
     GoalGuru.trackEvent('resource-hub', 'visited');

    // Load any saved preferences
    const savedFilter =  GoalGuru.getFromStorage('resource-filter');
    if (savedFilter) {
        currentFilter = savedFilter;
        const filterBtn = document.querySelector(`[onclick="filterResources('${savedFilter}')"]`);
        if (filterBtn) {
            document.querySelector('.filter-btn.active').classList.remove('active');
            filterBtn.classList.add('active');
        }
    }
}

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('resourceSearch');
    if (searchInput) {
        searchInput.addEventListener('input',  GoalGuru.debounce(searchResources, 300));
    }
}

// Load resource data
function loadResourceData() {
    allResources = {
        videos: [
            {
                id: 'stream-selection',
                title: 'Choosing the Right Stream After 10th',
                description: 'Expert guidance on selecting between Science, Commerce, and Arts streams',
                duration: '15:30',
                views: '25K',
                date: '2 days ago',
                category: 'career-guidance',
                thumbnail: 'stream-selection-thumb.jpg'
            },
            {
                id: 'jee-preparation',
                title: 'JEE Main Preparation Strategy',
                description: 'Comprehensive guide to cracking JEE Main with effective study techniques',
                duration: '22:45',
                views: '40K',
                date: '1 week ago',
                category: 'exam-prep',
                thumbnail: 'jee-prep-thumb.jpg'
            },
            {
                id: 'neet-biology',
                title: 'NEET Biology Study Tips',
                description: 'Master biology concepts for NEET with proven study methods',
                duration: '18:20',
                views: '32K',
                date: '3 days ago',
                category: 'exam-prep',
                thumbnail: 'neet-bio-thumb.jpg'
            },
            {
                id: 'time-management',
                title: 'Effective Time Management for Students',
                description: 'Learn how to balance studies, hobbies, and personal time',
                duration: '12:15',
                views: '18K',
                date: '5 days ago',
                category: 'study-skills',
                thumbnail: 'time-mgmt-thumb.jpg'
            }
        ],
        articles: [
            {
                id: 'engineering-branches-2025',
                title: 'Top Engineering Branches in 2025',
                description: 'Explore the most promising engineering fields and their career prospects in the current market...',
                author: 'Dr. Priya Sharma',
                date: 'Oct 8, 2025',
                readTime: '5 min read',
                category: 'career-guide'
            },
            {
                id: 'time-management-boards',
                title: 'Effective Time Management for Board Exams',
                description: 'Proven techniques to manage your time effectively during Class 12 board exam preparation...',
                author: 'Rajesh Kumar',
                date: 'Oct 5, 2025',
                readTime: '7 min read',
                category: 'study-tips'
            },
            {
                id: 'choose-right-college',
                title: 'How to Choose the Right College',
                description: 'A comprehensive guide to evaluating colleges based on various factors like placement, faculty, and infrastructure...',
                author: 'Anita Verma',
                date: 'Oct 1, 2025',
                readTime: '10 min read',
                category: 'college-guide'
            }
        ],
        guides: [
            {
                id: 'jee-physics-guide',
                title: 'Complete Physics Guide for JEE',
                description: 'Comprehensive study material covering all JEE Physics topics with solved examples',
                pages: '250 pages',
                downloads: '15K downloads',
                category: 'exam-prep',
                format: 'PDF'
            },
            {
                id: 'math-formula-handbook',
                title: 'Mathematics Formula Handbook',
                description: 'Essential formulas and shortcuts for Class 12 Mathematics and competitive exams',
                pages: '80 pages',
                downloads: '22K downloads',
                category: 'study-material',
                format: 'PDF'
            },
            {
                id: 'neet-biology-notes',
                title: 'NEET Biology Notes',
                description: 'Comprehensive biology notes with diagrams and mnemonics for NEET preparation',
                pages: '180 pages',
                downloads: '18K downloads',
                category: 'exam-prep',
                format: 'PDF'
            }
        ],
        stories: [
            {
                id: 'rahul-iit-journey',
                title: 'From Commerce to IIT: Rahuls Journey',
                description: '"I switched from Commerce to Science in 12th grade and cracked JEE Advanced. Here is how  GoalGuru helped me..."',
                achievement: 'IIT Delhi, Computer Science',
                year: 'Batch 2024',
                category: 'success-story'
            },
            {
                id: 'priya-neet-success',
                title: 'NEET Success Against All Odds',
                description: '"Coming from a rural background, I had limited resources.  GoalGuru guided me to AIIMS Delhi..."',
                achievement: 'AIIMS Delhi, MBBS',
                year: 'Batch 2023',
                category: 'success-story'
            },
            {
                id: 'amit-ias-success',
                title: 'Arts Stream to Civil Services',
                description: '"Everyone doubted my decision to choose Arts. Today, I am a proud IAS officer thanks to the right guidance..."',
                achievement: 'IAS, UPSC 2023',
                year: 'Rank 45',
                category: 'success-story'
            }
        ]
    };

    filteredResources = [...allResources[Object.keys(allResources)[0]]];
}

// Filter resources by type
function filterResources(type) {
    currentFilter = type;
     GoalGuru.saveToStorage('resource-filter', type);
     GoalGuru.trackEvent('resource', 'filter-applied', type);

    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[onclick="filterResources('${type}')"]`).classList.add('active');

    // Show/hide resource categories
    document.querySelectorAll('.resource-category').forEach(category => {
        if (type === 'all') {
            category.style.display = 'block';
        } else {
            const categoryId = category.id;
            category.style.display = categoryId === type ? 'block' : 'none';
        }
    });

    // Clear search when filtering
    const searchInput = document.getElementById('resourceSearch');
    if (searchInput) {
        searchInput.value = '';
    }
}

// Search resources
function searchResources() {
    const query = document.getElementById('resourceSearch').value.toLowerCase().trim();

    if (!query) {
        // Show all resources when search is empty
        filterResources(currentFilter);
        return;
    }

     GoalGuru.trackEvent('resource', 'searched', query);

    // Search across all resource types
    const searchResults = [];

    Object.keys(allResources).forEach(type => {
        allResources[type].forEach(resource => {
            const searchText = `${resource.title} ${resource.description} ${resource.category || ''}`.toLowerCase();
            if (searchText.includes(query)) {
                searchResults.push({ ...resource, type });
            }
        });
    });

    // Hide all categories first
    document.querySelectorAll('.resource-category').forEach(category => {
        category.style.display = 'none';
    });

    if (searchResults.length === 0) {
        showNoResults(query);
    } else {
        displaySearchResults(searchResults);
    }
}

// Display search results
function displaySearchResults(results) {
    // Remove any existing search results container
    const existingResults = document.querySelector('.search-results');
    if (existingResults) {
        existingResults.remove();
    }

    // Create search results container
    const searchResultsContainer = document.createElement('div');
    searchResultsContainer.className = 'search-results resource-category';
    searchResultsContainer.innerHTML = `
        <h2><i class="fas fa-search"></i> Search Results (${results.length})</h2>
        <div class="resource-grid" id="searchResultsGrid"></div>
    `;

    // Insert after resource filters
    const resourceContent = document.querySelector('.resource-content');
    resourceContent.insertBefore(searchResultsContainer, resourceContent.firstChild);

    // Populate results
    const resultsGrid = document.getElementById('searchResultsGrid');
    results.forEach(resource => {
        const resourceCard = createResourceCard(resource, resource.type);
        resultsGrid.appendChild(resourceCard);
    });
}

// Create resource card element
function createResourceCard(resource, type) {
    const card = document.createElement('div');
    card.className = `resource-card ${type}-card`;

    switch (type) {
        case 'videos':
            card.innerHTML = `
                <div class="resource-thumbnail">
                    <i class="fas fa-play-circle"></i>
                    <span class="duration">${resource.duration}</span>
                </div>
                <div class="resource-info">
                    <h3>${resource.title}</h3>
                    <p>${resource.description}</p>
                    <div class="resource-meta">
                        <span><i class="fas fa-eye"></i> ${resource.views} views</span>
                        <span><i class="fas fa-clock"></i> ${resource.date}</span>
                    </div>
                    <button class="btn btn-sm btn-primary" onclick="watchVideo('${resource.id}')">
                        Watch Now
                    </button>
                </div>
            `;
            break;

        case 'articles':
            card.innerHTML = `
                <div class="article-header">
                    <span class="article-category">${resource.category}</span>
                    <span class="read-time">${resource.readTime}</span>
                </div>
                <div class="resource-info">
                    <h3>${resource.title}</h3>
                    <p>${resource.description}</p>
                    <div class="resource-meta">
                        <span><i class="fas fa-user"></i> ${resource.author}</span>
                        <span><i class="fas fa-calendar"></i> ${resource.date}</span>
                    </div>
                    <button class="btn btn-sm btn-outline" onclick="readArticle('${resource.id}')">
                        Read Article
                    </button>
                </div>
            `;
            break;

        case 'guides':
            card.innerHTML = `
                <div class="guide-icon">
                    <i class="fas fa-book-open"></i>
                </div>
                <div class="resource-info">
                    <h3>${resource.title}</h3>
                    <p>${resource.description}</p>
                    <div class="guide-stats">
                        <span><i class="fas fa-file-alt"></i> ${resource.pages}</span>
                        <span><i class="fas fa-download"></i> ${resource.downloads}</span>
                    </div>
                    <button class="btn btn-sm btn-secondary" onclick="downloadGuide('${resource.id}')">
                        <i class="fas fa-download"></i> Download PDF
                    </button>
                </div>
            `;
            break;

        case 'stories':
            card.innerHTML = `
                <div class="story-image">
                    <i class="fas fa-user-graduate"></i>
                </div>
                <div class="resource-info">
                    <h3>${resource.title}</h3>
                    <p>${resource.description}</p>
                    <div class="story-meta">
                        <span class="story-achievement">${resource.achievement}</span>
                        <span class="story-year">${resource.year}</span>
                    </div>
                    <button class="btn btn-sm btn-outline" onclick="readStory('${resource.id}')">
                        Read Story
                    </button>
                </div>
            `;
            break;
    }

    return card;
}

// Show no results message
function showNoResults(query) {
    const existingResults = document.querySelector('.search-results');
    if (existingResults) {
        existingResults.remove();
    }

    const noResultsContainer = document.createElement('div');
    noResultsContainer.className = 'search-results resource-category';
    noResultsContainer.innerHTML = `
        <div class="no-results">
            <i class="fas fa-search" style="font-size: 4rem; color: var(--text-secondary); margin-bottom: 1rem;"></i>
            <h2>No results found for "${query}"</h2>
            <p>Try different keywords or browse our categories below.</p>
            <button class="btn btn-primary" onclick="clearSearch()">
                Clear Search
            </button>
        </div>
    `;

    // Style the no results container
    noResultsContainer.querySelector('.no-results').style.cssText = `
        text-align: center;
        padding: 3rem;
        color: var(--text-secondary);
    `;

    const resourceContent = document.querySelector('.resource-content');
    resourceContent.insertBefore(noResultsContainer, resourceContent.firstChild);
}

// Clear search
function clearSearch() {
    document.getElementById('resourceSearch').value = '';
    const searchResults = document.querySelector('.search-results');
    if (searchResults) {
        searchResults.remove();
    }
    filterResources(currentFilter);
}

// Watch video
function watchVideo(videoId) {
     GoalGuru.trackEvent('resource', 'video-watched', videoId);

    const video = allResources.videos.find(v => v.id === videoId);
    if (!video) return;

    // In a real application, this would open the video
    // For now, we'll show a placeholder
    const modal = document.getElementById('videoModal');
    if (modal) {
        const videoTitle = document.getElementById('videoTitle');
        const videoDescription = document.getElementById('videoDescription');
        const videoFrame = document.getElementById('videoFrame');

        videoTitle.textContent = video.title;
        videoDescription.textContent = video.description;

        // Placeholder video URL - in real app, this would be the actual video
        videoFrame.src = `https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1`;

        modal.style.display = 'block';
    } else {
         GoalGuru.showNotification(`Opening video: ${video.title}`, 'info');
    }
}

// Close video modal
function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    const videoFrame = document.getElementById('videoFrame');

    if (modal) {
        modal.style.display = 'none';
        videoFrame.src = ''; // Stop video playback
    }
}

// Read article
function readArticle(articleId) {
     GoalGuru.trackEvent('resource', 'article-read', articleId);

    const article = allResources.articles.find(a => a.id === articleId);
    if (!article) return;

    // In a real application, this would navigate to the full article
     GoalGuru.showNotification(`Opening article: ${article.title}`, 'info');
}

// Download guide
function downloadGuide(guideId) {
     GoalGuru.trackEvent('resource', 'guide-downloaded', guideId);

    const guide = allResources.guides.find(g => g.id === guideId);
    if (!guide) return;

    // Simulate download
     GoalGuru.showNotification(`Downloading: ${guide.title}`, 'success');

    // In a real application, this would trigger the actual download
    console.log('Downloading guide:', guide.title);
}

// Read success story
function readStory(storyId) {
     GoalGuru.trackEvent('resource', 'story-read', storyId);

    const story = allResources.stories.find(s => s.id === storyId);
    if (!story) return;

    // In a real application, this would open the full story
     GoalGuru.showNotification(`Opening success story: ${story.title}`, 'info');
}

// Apply for scholarship
function applyScholarship(scholarshipId) {
     GoalGuru.trackEvent('scholarship', 'apply-clicked', scholarshipId);
     GoalGuru.showNotification(`Redirecting to ${scholarshipId.toUpperCase()} application...`, 'info');
}

// View scholarship details
function viewScholarshipDetails(scholarshipId) {
     GoalGuru.trackEvent('scholarship', 'details-viewed', scholarshipId);

    const scholarshipInfo = {
        'ntse': {
            name: 'National Talent Search Examination (NTSE)',
            amount: '₹1,25,000/year',
            details: `
                ELIGIBILITY: Class 10 students with 60% in Class 9
                EXAM PATTERN: Two-stage selection (State & National level)
                BENEFITS: Scholarship throughout higher education including PhD
                LAST DATE: November 15, 2024
                OFFICIAL WEBSITE: www.ncert.nic.in
            `
        },
        'kvpy': {
            name: 'Kishore Vaigyanik Protsahan Yojana (KVPY)',
            amount: '₹80,000/year',
            details: `
                ELIGIBILITY: Class 11 & 12 Science students with 60% marks
                EXAM PATTERN: Written test + Interview
                BENEFITS: Fellowship for research careers in science
                LAST DATE: October 31, 2024
                OFFICIAL WEBSITE: www.kvpy.iisc.ac.in
            `
        }
    };

    const info = scholarshipInfo[scholarshipId];
    if (info) {
         GoalGuru.showNotification(`${info.name}\n${info.details}`, 'info');
    }
}

console.log('Resource Hub JavaScript loaded');