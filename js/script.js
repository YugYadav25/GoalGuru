// CareerCompass - Main JavaScript

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
});

// Initialize the application
function initializeApp() {
    console.log('CareerCompass initialized');

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('careercompass-theme');
    if (savedTheme) {
        document.body.classList.add(savedTheme);
    }
}

// Check user session
function checkUserSession() {
    const savedUser = localStorage.getItem('careercompass-user');
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

function closeAuth() {
    const modal = document.getElementById('authModal');
    modal.style.display = 'none';
}

function switchToSignup() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('signupForm').style.display = 'block';
}

function switchToLogin() {
    document.getElementById('signupForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
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
    localStorage.setItem('careercompass-user', JSON.stringify(userData));
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
    localStorage.setItem('careercompass-user', JSON.stringify(userData));
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
    localStorage.setItem('careercompass-role', role);

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
    localStorage.removeItem('careercompass-user');
    localStorage.removeItem('careercompass-role');
    localStorage.removeItem('careercompass-quiz-results');

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
`;
document.head.appendChild(style);

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

// Search functionality
function createSearchFunction(items, searchKeys) {
    return debounce(function(query) {
        if (!query.trim()) {
            return items;
        }

        const lowercaseQuery = query.toLowerCase();
        return items.filter(item => {
            return searchKeys.some(key => {
                const value = item[key];
                return value && value.toLowerCase().includes(lowercaseQuery);
            });
        });
    }, 300);
}

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

// Loading state management
function showLoading(element) {
    if (typeof element === 'string') {
        element = document.querySelector(element);
    }

    if (element) {
        element.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
        element.disabled = true;
    }
}

function hideLoading(element, originalContent) {
    if (typeof element === 'string') {
        element = document.querySelector(element);
    }

    if (element) {
        element.innerHTML = originalContent;
        element.disabled = false;
    }
}

// Form validation utilities
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[6-9]\d{9}$/;
    return re.test(phone);
}

function validateRequired(fields) {
    for (let field of fields) {
        const element = typeof field === 'string' ? document.getElementById(field) : field;
        if (!element || !element.value.trim()) {
            return false;
        }
    }
    return true;
}

// Local storage utilities
function saveToStorage(key, data) {
    try {
        localStorage.setItem(`careercompass-${key}`, JSON.stringify(data));
        return true;
    } catch (error) {
        console.error('Error saving to localStorage:', error);
        return false;
    }
}

function getFromStorage(key) {
    try {
        const data = localStorage.getItem(`careercompass-${key}`);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error reading from localStorage:', error);
        return null;
    }
}

function removeFromStorage(key) {
    try {
        localStorage.removeItem(`careercompass-${key}`);
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

    // Show user-friendly error message
    showNotification('Something went wrong. Please try again.', 'error');

    // Track error
    trackEvent('error', 'javascript', e.message);
});

// Export functions for other modules
window.CareerCompass = {
    // Authentication
    showAuth,
    closeAuth,
    handleLogin,
    handleSignup,
    logout,

    // Role selection
    selectRole,

    // Notifications
    showNotification,

    // Utilities
    formatDate,
    generateId,
    debounce,
    validateEmail,
    validatePhone,
    validateRequired,

    // Storage
    saveToStorage,
    getFromStorage,
    removeFromStorage,

    // Progress
    updateProgress,

    // Analytics
    trackEvent,

    // Loading
    showLoading,
    hideLoading,

    // Current state
    getCurrentUser: () => currentUser,
    getCurrentRole: () => currentRole
};

console.log('CareerCompass JavaScript loaded successfully');