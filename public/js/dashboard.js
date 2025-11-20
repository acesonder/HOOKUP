// Dashboard functionality

// Initialize Socket.IO connection for real-time chat
let socket;
try {
    if (typeof io !== 'undefined') {
        socket = io();
    } else {
        console.warn('Socket.IO not available, chat features will be limited');
        socket = {
            on: () => {},
            emit: () => {},
            to: () => ({ emit: () => {} })
        };
    }
} catch (e) {
    console.warn('Socket.IO initialization failed:', e);
    socket = {
        on: () => {},
        emit: () => {},
        to: () => ({ emit: () => {} })
    };
}

// Current user data (in production, this would come from authentication)
const currentUser = {
    id: 1,
    username: 'User123',
    location: 'Toronto, Ontario'
};

// Navigation between sections
function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Remove active class from all nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Show selected section
    const section = document.getElementById(`${sectionName}-section`);
    if (section) {
        section.classList.add('active');
    }
    
    // Update active nav item
    const navItem = document.querySelector(`[data-section="${sectionName}"]`);
    if (navItem) {
        navItem.classList.add('active');
    }
    
    // Update section title
    const titles = {
        'overview': 'Dashboard Overview',
        'videos': 'Video Content',
        'pictures': 'Picture Gallery',
        'meetups': 'Ontario Meetups',
        'chat': 'Messages & Chat',
        'profile': 'Your Profile',
        'upload': 'Upload Content',
        'favorites': 'Your Favorites',
        'matches': 'Your Matches',
        'friends': 'Friends List',
        'notifications': 'Notifications',
        'search': 'Advanced Search',
        'analytics': 'Analytics Dashboard',
        'calendar': 'Event Calendar',
        'groups': 'Groups',
        'events': 'Special Events',
        'marketplace': 'Marketplace',
        'verification': 'Get Verified',
        'privacy': 'Privacy Settings',
        'wallet': 'Wallet & Transactions',
        'subscriptions': 'Premium Subscriptions',
        'rewards': 'Rewards Program',
        'profile-views': 'Profile Views',
        'customization': 'Customize Your Profile',
        'settings': 'Account Settings'
    };
    
    document.getElementById('section-title').textContent = titles[sectionName] || 'Dashboard';
}

// Set up navigation click handlers
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const section = item.getAttribute('data-section');
        if (section) {
            showSection(section);
        }
    });
});

// Chat functionality
let currentRoom = 'general';

socket.on('connect', () => {
    console.log('Connected to chat server');
    socket.emit('join-room', currentRoom);
});

socket.on('chat-message', (message) => {
    displayMessage(message);
});

function sendMessage() {
    const input = document.getElementById('message-input');
    const message = input.value.trim();
    
    if (message) {
        socket.emit('chat-message', {
            userId: currentUser.id,
            username: currentUser.username,
            message: message,
            room: currentRoom
        });
        input.value = '';
    }
}

function displayMessage(message) {
    const chatMessages = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = message.userId === currentUser.id ? 'message sent' : 'message received';
    
    const time = new Date(message.timestamp).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit'
    });
    
    messageDiv.innerHTML = `
        <p>${message.message}</p>
        <span class="message-time">${time}</span>
    `;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Allow sending messages with Enter key
document.addEventListener('DOMContentLoaded', () => {
    const messageInput = document.getElementById('message-input');
    if (messageInput) {
        messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }
});

// Video upload functionality
function showUploadModal(type) {
    const input = type === 'video' ? 
        document.getElementById('video-upload') : 
        document.getElementById('picture-upload');
    
    if (input) {
        input.click();
        input.onchange = () => {
            if (input.files.length > 0) {
                const file = input.files[0];
                handleFileUpload(file, type);
            }
        };
    }
}

function handleFileUpload(file, type) {
    console.log(`Uploading ${type}:`, file.name);
    
    // In production, this would upload to a server
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);
    formData.append('userId', currentUser.id);
    
    // Simulate upload
    alert(`${type === 'video' ? 'Video' : 'Picture'} "${file.name}" uploaded successfully!`);
    
    // In production, make an API call:
    // fetch('/api/' + type + 's/upload', {
    //     method: 'POST',
    //     body: formData
    // }).then(response => response.json())
    //   .then(data => console.log('Upload success:', data));
}

// Meetup functionality
function showMeetupModal() {
    const title = prompt('Enter meetup title:');
    if (!title) return;
    
    const city = prompt('Enter city in Ontario:');
    if (!city) return;
    
    const date = prompt('Enter date (YYYY-MM-DD):');
    if (!date) return;
    
    createMeetup({
        title: title,
        city: city,
        date: date,
        description: 'New meetup in ' + city,
        location: city + ', Ontario',
        userId: currentUser.id
    });
}

function createMeetup(meetupData) {
    console.log('Creating meetup:', meetupData);
    
    // In production, make an API call
    fetch('/api/meetups/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(meetupData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Meetup created:', data);
        alert('Meetup created successfully!');
        showSection('meetups');
    })
    .catch(error => {
        console.error('Error creating meetup:', error);
        alert('Error creating meetup. Please try again.');
    });
}

// Filter meetups by city
document.addEventListener('DOMContentLoaded', () => {
    const cityFilter = document.getElementById('city-filter');
    if (cityFilter) {
        cityFilter.addEventListener('change', () => {
            const selectedCity = cityFilter.value;
            filterMeetups(selectedCity);
        });
    }
});

function filterMeetups(city) {
    console.log('Filtering meetups for city:', city);
    // In production, this would filter the displayed meetups
}

// Join meetup functionality
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.btn-join').forEach(button => {
        button.addEventListener('click', function() {
            const meetupCard = this.closest('.meetup-card');
            const meetupTitle = meetupCard.querySelector('h3').textContent;
            
            if (confirm(`Join meetup: ${meetupTitle}?`)) {
                this.textContent = 'Joined! ✓';
                this.disabled = true;
                this.style.background = '#4CAF50';
            }
        });
    });
});

// Notification system
function showNotification(message, type = 'info') {
    console.log(`Notification (${type}):`, message);
    // In production, this would show a toast notification
}

// Real-time updates
setInterval(() => {
    // Simulate real-time updates
    const randomUpdate = Math.random();
    if (randomUpdate > 0.95) {
        showNotification('New message received!');
    }
}, 30000);

// Analytics tracking (placeholder)
function trackEvent(eventName, eventData) {
    console.log('Event tracked:', eventName, eventData);
    // In production, send to analytics service
}

// Video call functionality (placeholder)
function initiateVideoCall(userId) {
    console.log('Initiating video call with user:', userId);
    alert('Video calling feature coming soon!');
    // In production, implement WebRTC video calling
}

// Advanced search
function performSearch(query, filters) {
    console.log('Searching:', query, filters);
    // In production, make API call to search endpoint
}

// Profile management
function updateProfile(profileData) {
    console.log('Updating profile:', profileData);
    // In production, make API call to update profile
}

// Privacy settings
function updatePrivacySettings(settings) {
    console.log('Updating privacy settings:', settings);
    // In production, make API call to update settings
}

// Feature toggles for 50+ features
const features = {
    videoSharing: true,
    pictureSharing: true,
    meetups: true,
    chat: true,
    videoCalls: true,
    voiceCalls: true,
    privateMessaging: true,
    groupChat: true,
    liveStreaming: true,
    storyFeature: true,
    favorites: true,
    bookmarks: true,
    notifications: true,
    pushNotifications: true,
    emailNotifications: true,
    advancedSearch: true,
    locationFilters: true,
    ageFilters: true,
    interestMatching: true,
    verification: true,
    profileBadges: true,
    analytics: true,
    contentReports: true,
    blockUsers: true,
    reportUsers: true,
    privacyControls: true,
    anonymousBrowsing: true,
    incognitoMode: true,
    readReceipts: true,
    onlineStatus: true,
    lastSeen: true,
    typing: true,
    voiceMessages: true,
    fileSharing: true,
    gifSupport: true,
    emojiReactions: true,
    polls: true,
    events: true,
    calendar: true,
    reminders: true,
    groups: true,
    communities: true,
    forums: true,
    marketplace: true,
    transactions: true,
    wallet: true,
    subscriptions: true,
    premiumFeatures: true,
    rewards: true,
    gamification: true,
    achievements: true,
    leaderboards: true
};

console.log('HOOKUP Dashboard loaded with', Object.keys(features).length, 'features');
console.log('Current user:', currentUser);
console.log('Connected to Ontario location services');

// Initialize new features when sections are shown
document.addEventListener('DOMContentLoaded', () => {
    // Add event listener for profile views section
    const profileViewsNav = document.querySelector('[data-section="profile-views"]');
    if (profileViewsNav) {
        profileViewsNav.addEventListener('click', () => {
            setTimeout(() => {
                if (typeof profileTracker !== 'undefined') {
                    profileTracker.setupProfileViewsSection();
                }
            }, 100);
        });
    }
    
    // Add event listener for customization section
    const customizationNav = document.querySelector('[data-section="customization"]');
    if (customizationNav) {
        customizationNav.addEventListener('click', () => {
            setTimeout(() => {
                if (typeof profileCustomization !== 'undefined') {
                    const container = document.getElementById('customization-container');
                    if (container) {
                        container.innerHTML = profileCustomization.render();
                    }
                }
            }, 100);
        });
    }
});
