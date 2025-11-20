// Profile View Tracking System
class ProfileViewTracker {
    constructor() {
        this.whoViewedMe = [];
        this.whoIViewed = [];
        this.viewHistory = [];
        this.currentTab = 'viewed-me';
        
        this.init();
    }
    
    init() {
        // Load sample data
        this.loadSampleData();
    }
    
    loadSampleData() {
        // Sample data for "Who Viewed Me"
        this.whoViewedMe = [
            {
                id: 1,
                name: 'Sarah Mitchell',
                username: 'sarah_m',
                avatar: '👩',
                location: 'Toronto, ON',
                age: 26,
                verified: true,
                viewedAt: new Date(Date.now() - 1000 * 60 * 15), // 15 mins ago
                viewCount: 3
            },
            {
                id: 2,
                name: 'Michael Brown',
                username: 'mike_b',
                avatar: '👨',
                location: 'Ottawa, ON',
                age: 29,
                verified: true,
                viewedAt: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
                viewCount: 1
            },
            {
                id: 3,
                name: 'Emma Davis',
                username: 'emma_d',
                avatar: '👩',
                location: 'Mississauga, ON',
                age: 24,
                verified: false,
                viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
                viewCount: 2
            },
            {
                id: 4,
                name: 'James Wilson',
                username: 'james_w',
                avatar: '👨',
                location: 'Hamilton, ON',
                age: 31,
                verified: true,
                viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
                viewCount: 1
            },
            {
                id: 5,
                name: 'Olivia Taylor',
                username: 'olivia_t',
                avatar: '👩',
                location: 'London, ON',
                age: 27,
                verified: false,
                viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
                viewCount: 4
            }
        ];
        
        // Sample data for "Who I Viewed"
        this.whoIViewed = [
            {
                id: 6,
                name: 'Jessica Anderson',
                username: 'jess_a',
                avatar: '👩',
                location: 'Windsor, ON',
                age: 25,
                verified: true,
                viewedAt: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
                viewCount: 2
            },
            {
                id: 7,
                name: 'Ryan Martinez',
                username: 'ryan_m',
                avatar: '👨',
                location: 'Kitchener, ON',
                age: 28,
                verified: false,
                viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
                viewCount: 1
            },
            {
                id: 8,
                name: 'Sophie Johnson',
                username: 'sophie_j',
                avatar: '👩',
                location: 'Toronto, ON',
                age: 23,
                verified: true,
                viewedAt: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
                viewCount: 3
            }
        ];
    }
    
    recordView(viewerId, profileId) {
        const view = {
            viewerId: viewerId,
            profileId: profileId,
            timestamp: new Date()
        };
        
        this.viewHistory.push(view);
        
        // In production, send to backend
        console.log('Profile view recorded:', view);
    }
    
    getRelativeTime(date) {
        const now = new Date();
        const diff = now - date;
        const seconds = Math.floor(diff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        
        if (seconds < 60) return 'just now';
        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        if (days === 1) return 'yesterday';
        if (days < 7) return `${days}d ago`;
        return date.toLocaleDateString();
    }
    
    renderProfileViewItem(profile) {
        return `
            <div class="profile-view-item fade-in" data-id="${profile.id}">
                <div class="profile-view-avatar">
                    ${profile.avatar}
                    ${profile.verified ? '<span class="verified-badge-small">✓</span>' : ''}
                </div>
                <div class="profile-view-info">
                    <div class="profile-view-name">
                        ${profile.name}
                        ${profile.verified ? '<span style="color: #4caf50;">✓</span>' : ''}
                    </div>
                    <div class="profile-view-details">
                        📍 ${profile.location} • ${profile.age} years old
                    </div>
                    <div class="profile-view-time">
                        👁️ Viewed ${this.getRelativeTime(profile.viewedAt)}
                        ${profile.viewCount > 1 ? ` • ${profile.viewCount} times` : ''}
                    </div>
                </div>
                <div class="profile-view-actions">
                    <button class="profile-view-btn primary" onclick="profileTracker.viewProfile(${profile.id})">
                        View Profile
                    </button>
                    <button class="profile-view-btn secondary" onclick="profileTracker.sendMessage(${profile.id})">
                        💬
                    </button>
                </div>
            </div>
        `;
    }
    
    renderTab(tabName) {
        this.currentTab = tabName;
        const container = document.getElementById('profile-views-list');
        
        if (!container) return;
        
        let data = tabName === 'viewed-me' ? this.whoViewedMe : this.whoIViewed;
        
        if (data.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">👀</div>
                    <div class="empty-state-text">
                        ${tabName === 'viewed-me' ? 
                            'No one has viewed your profile yet' : 
                            'You haven\'t viewed any profiles yet'}
                    </div>
                </div>
            `;
        } else {
            container.innerHTML = data.map(profile => this.renderProfileViewItem(profile)).join('');
        }
        
        // Update tab indicators
        document.querySelectorAll('.profile-views-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`)?.classList.add('active');
    }
    
    viewProfile(profileId) {
        console.log('Viewing profile:', profileId);
        
        // Record this view
        this.recordView(currentUser.id, profileId);
        
        // Show notification
        NotificationSystem.show(
            'Profile Opened',
            'Viewing profile details...',
            'info'
        );
        
        // In production, navigate to profile page
    }
    
    sendMessage(profileId) {
        console.log('Sending message to:', profileId);
        
        NotificationSystem.show(
            'Opening Chat',
            'Starting a new conversation...',
            'info'
        );
        
        // In production, open chat with this user
        if (typeof showSection === 'function') {
            showSection('chat');
        }
    }
    
    setupProfileViewsSection() {
        const section = document.getElementById('profile-views-section');
        if (!section) return;
        
        section.innerHTML = `
            <div class="profile-views-section">
                <h2>Profile Views</h2>
                <div class="profile-views-tabs">
                    <button class="profile-views-tab active" data-tab="viewed-me" onclick="profileTracker.renderTab('viewed-me')">
                        👁️ Who Viewed Me
                        <span class="count-badge">${this.whoViewedMe.length}</span>
                    </button>
                    <button class="profile-views-tab" data-tab="viewed-by-me" onclick="profileTracker.renderTab('viewed-by-me')">
                        🔍 Who I Viewed
                        <span class="count-badge">${this.whoIViewed.length}</span>
                    </button>
                </div>
                <div class="profile-views-list" id="profile-views-list">
                    <!-- Content will be rendered here -->
                </div>
            </div>
        `;
        
        this.renderTab('viewed-me');
    }
}

// Profile Customization System
class ProfileCustomization {
    constructor() {
        this.themes = [
            { id: 'default', name: 'Default', colors: ['#667eea', '#764ba2'] },
            { id: 'ocean', name: 'Ocean', colors: ['#2E3192', '#1BFFFF'] },
            { id: 'sunset', name: 'Sunset', colors: ['#ff6b6b', '#feca57'] },
            { id: 'forest', name: 'Forest', colors: ['#11998e', '#38ef7d'] },
            { id: 'royal', name: 'Royal', colors: ['#8E2DE2', '#4A00E0'] },
            { id: 'fire', name: 'Fire', colors: ['#f12711', '#f5af19'] }
        ];
        
        this.backgrounds = [
            { id: 'gradient1', style: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
            { id: 'gradient2', style: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
            { id: 'gradient3', style: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
            { id: 'gradient4', style: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
            { id: 'gradient5', style: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
            { id: 'gradient6', style: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)' }
        ];
        
        this.badges = [
            { id: 'verified', icon: '✓', name: 'Verified', locked: false },
            { id: 'star', icon: '⭐', name: 'Star', locked: false },
            { id: 'fire', icon: '🔥', name: 'Hot', locked: false },
            { id: 'diamond', icon: '💎', name: 'Premium', locked: true },
            { id: 'crown', icon: '👑', name: 'VIP', locked: true },
            { id: 'heart', icon: '💖', name: 'Popular', locked: false }
        ];
        
        this.moods = [
            '😊 Happy', '😎 Cool', '🥰 Loving', '🤗 Friendly',
            '💪 Strong', '🎉 Partying', '😴 Sleepy', '🤔 Thinking'
        ];
        
        this.currentTheme = 'default';
        this.currentBackground = 'gradient1';
        this.selectedBadges = ['verified'];
        this.currentMood = '😊 Happy';
    }
    
    renderThemeSelector() {
        return `
            <div class="customization-section">
                <h3>Profile Theme</h3>
                <div class="theme-selector">
                    ${this.themes.map(theme => `
                        <div class="theme-option ${theme.id === this.currentTheme ? 'active' : ''}" 
                             onclick="profileCustomization.selectTheme('${theme.id}')">
                            <div class="theme-preview" style="background: linear-gradient(135deg, ${theme.colors[0]} 0%, ${theme.colors[1]} 100%)"></div>
                            <div class="theme-name">${theme.name}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    renderBackgroundSelector() {
        return `
            <div class="customization-section">
                <h3>Profile Background</h3>
                <div class="background-options">
                    ${this.backgrounds.map(bg => `
                        <div class="background-option ${bg.id === this.currentBackground ? 'active' : ''}" 
                             style="background: ${bg.style}"
                             onclick="profileCustomization.selectBackground('${bg.id}')">
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    renderBadgeSelector() {
        return `
            <div class="customization-section">
                <h3>Profile Badges</h3>
                <div class="badge-collection">
                    ${this.badges.map(badge => `
                        <div class="badge-item ${badge.locked ? 'locked' : ''}" 
                             onclick="${!badge.locked ? `profileCustomization.toggleBadge('${badge.id}')` : 'void(0)'}">
                            <div class="badge-icon">${badge.icon}</div>
                            <div class="badge-name">${badge.name}</div>
                            ${badge.locked ? '<div style="font-size: 10px; color: #999;">🔒 Locked</div>' : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    renderMoodSelector() {
        return `
            <div class="customization-section">
                <h3>Current Mood</h3>
                <div class="status-selector">
                    ${this.moods.map(mood => `
                        <div class="status-option ${mood === this.currentMood ? 'active' : ''}" 
                             onclick="profileCustomization.selectMood('${mood}')">
                            ${mood}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    selectTheme(themeId) {
        this.currentTheme = themeId;
        NotificationSystem.show('Theme Updated', `Applied ${themeId} theme`, 'success');
        this.refreshCustomization();
    }
    
    selectBackground(bgId) {
        this.currentBackground = bgId;
        NotificationSystem.show('Background Updated', 'Profile background changed', 'success');
        this.refreshCustomization();
    }
    
    toggleBadge(badgeId) {
        const index = this.selectedBadges.indexOf(badgeId);
        if (index > -1) {
            this.selectedBadges.splice(index, 1);
        } else {
            this.selectedBadges.push(badgeId);
        }
        this.refreshCustomization();
    }
    
    selectMood(mood) {
        this.currentMood = mood;
        NotificationSystem.show('Mood Updated', `You're feeling ${mood}`, 'success');
        this.refreshCustomization();
    }
    
    refreshCustomization() {
        const container = document.getElementById('customization-container');
        if (container) {
            container.innerHTML = this.render();
        }
    }
    
    render() {
        return `
            <div class="profile-customization">
                <h2>Customize Your Profile</h2>
                ${this.renderThemeSelector()}
                ${this.renderBackgroundSelector()}
                ${this.renderBadgeSelector()}
                ${this.renderMoodSelector()}
                
                <div class="customization-section">
                    <h3>Visitor Counter</h3>
                    <div class="visitor-counter">
                        <span>👁️</span>
                        <span class="visitor-count">1,234</span>
                        <span>profile views</span>
                    </div>
                </div>
            </div>
        `;
    }
}

// Initialize
let profileTracker;
let profileCustomization;

document.addEventListener('DOMContentLoaded', () => {
    profileTracker = new ProfileViewTracker();
    profileCustomization = new ProfileCustomization();
});

// Export for global use
if (typeof window !== 'undefined') {
    window.ProfileViewTracker = ProfileViewTracker;
    window.ProfileCustomization = ProfileCustomization;
}
