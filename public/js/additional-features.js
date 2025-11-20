// Additional 50+ Features for HOOKUP Platform

// Story Feature System
class StoryFeature {
    constructor() {
        this.stories = [
            { id: 1, user: 'Sarah M.', avatar: '👩', viewed: false, time: '2h' },
            { id: 2, user: 'Mike T.', avatar: '👨', viewed: true, time: '4h' },
            { id: 3, user: 'Emma D.', avatar: '👩', viewed: false, time: '6h' }
        ];
    }
    
    createStoryCarousel() {
        return `
            <div class="story-carousel">
                <h3>Stories</h3>
                <div class="story-list">
                    ${this.stories.map(story => `
                        <div class="story-item ${story.viewed ? 'viewed' : ''}" onclick="storyFeature.viewStory(${story.id})">
                            <div class="story-avatar">${story.avatar}</div>
                            <div class="story-name">${story.user}</div>
                            <div class="story-time">${story.time}</div>
                        </div>
                    `).join('')}
                    <div class="story-item add-story" onclick="storyFeature.addStory()">
                        <div class="story-avatar">➕</div>
                        <div class="story-name">Add Story</div>
                    </div>
                </div>
            </div>
        `;
    }
    
    viewStory(id) {
        console.log('Viewing story:', id);
        const story = this.stories.find(s => s.id === id);
        if (story) {
            story.viewed = true;
            NotificationSystem.show('Story', `Viewing ${story.user}'s story`, 'info');
        }
    }
    
    addStory() {
        NotificationSystem.show('Create Story', 'Story creation feature coming soon!', 'info');
    }
}

// Live Streaming Feature
class LiveStreaming {
    constructor() {
        this.liveStreams = [
            { id: 1, streamer: 'Sarah M.', viewers: 234, thumbnail: '🎥', category: 'Social' },
            { id: 2, streamer: 'Mike T.', viewers: 156, thumbnail: '🎥', category: 'Gaming' }
        ];
    }
    
    createLiveStreamGrid() {
        return `
            <div class="live-streams-section">
                <h2>🔴 Live Streams</h2>
                <div class="live-stream-grid">
                    ${this.liveStreams.map(stream => `
                        <div class="live-stream-card" onclick="liveStreaming.joinStream(${stream.id})">
                            <div class="stream-thumbnail">${stream.thumbnail}</div>
                            <div class="live-badge">🔴 LIVE</div>
                            <div class="stream-info">
                                <h4>${stream.streamer}</h4>
                                <p>👁️ ${stream.viewers} watching</p>
                                <span class="stream-category">${stream.category}</span>
                            </div>
                        </div>
                    `).join('')}
                    <div class="live-stream-card start-stream" onclick="liveStreaming.startStream()">
                        <div class="stream-thumbnail">📹</div>
                        <div class="stream-info">
                            <h4>Go Live</h4>
                            <p>Start your own stream</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    joinStream(id) {
        console.log('Joining stream:', id);
        NotificationSystem.show('Joining Stream', 'Connecting to live stream...', 'info');
    }
    
    startStream() {
        NotificationSystem.show('Go Live', 'Live streaming feature coming soon!', 'info');
    }
}

// Gamification System
class GamificationSystem {
    constructor() {
        this.userLevel = 12;
        this.xp = 2450;
        this.xpToNextLevel = 3000;
        this.achievements = [
            { id: 1, name: 'First Video', icon: '🎥', unlocked: true, points: 50 },
            { id: 2, name: 'Social Butterfly', icon: '🦋', unlocked: true, points: 100 },
            { id: 3, name: '100 Connections', icon: '💯', unlocked: false, points: 200 },
            { id: 4, name: 'Content Creator', icon: '🌟', unlocked: true, points: 150 },
            { id: 5, name: 'Event Organizer', icon: '🎉', unlocked: false, points: 150 }
        ];
        this.dailyStreak = 7;
    }
    
    createGamificationPanel() {
        const progress = (this.xp / this.xpToNextLevel) * 100;
        return `
            <div class="gamification-panel">
                <div class="level-card">
                    <div class="level-icon">🏆</div>
                    <div class="level-info">
                        <h3>Level ${this.userLevel}</h3>
                        <div class="xp-bar">
                            <div class="xp-progress" style="width: ${progress}%"></div>
                        </div>
                        <p>${this.xp} / ${this.xpToNextLevel} XP</p>
                    </div>
                </div>
                
                <div class="daily-streak">
                    <h4>🔥 Daily Streak</h4>
                    <p class="streak-count">${this.dailyStreak} days</p>
                </div>
                
                <div class="achievements-grid">
                    <h4>Achievements</h4>
                    ${this.achievements.map(achievement => `
                        <div class="achievement-item ${achievement.unlocked ? 'unlocked' : 'locked'}">
                            <div class="achievement-icon">${achievement.icon}</div>
                            <div class="achievement-name">${achievement.name}</div>
                            <div class="achievement-points">+${achievement.points} XP</div>
                            ${achievement.unlocked ? '' : '<div class="lock-overlay">🔒</div>'}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    addXP(amount, reason) {
        this.xp += amount;
        if (this.xp >= this.xpToNextLevel) {
            this.levelUp();
        }
        NotificationSystem.show('XP Earned', `+${amount} XP for ${reason}`, 'success');
    }
    
    levelUp() {
        this.userLevel++;
        this.xp = this.xp - this.xpToNextLevel;
        this.xpToNextLevel = Math.floor(this.xpToNextLevel * 1.5);
        NotificationSystem.show('Level Up! 🎉', `You reached Level ${this.userLevel}!`, 'success');
    }
}

// Leaderboards System
class Leaderboards {
    constructor() {
        this.categories = ['Overall', 'Videos', 'Engagement', 'Events'];
        this.currentCategory = 'Overall';
        this.topUsers = [
            { rank: 1, name: 'Sarah M.', points: 15420, avatar: '👩', verified: true },
            { rank: 2, name: 'Mike T.', points: 12890, avatar: '👨', verified: true },
            { rank: 3, name: 'You', points: 10245, avatar: '👤', verified: true },
            { rank: 4, name: 'Emma D.', points: 9870, avatar: '👩', verified: false },
            { rank: 5, name: 'James W.', points: 8450, avatar: '👨', verified: true }
        ];
    }
    
    createLeaderboard() {
        return `
            <div class="leaderboard-section">
                <h2>🏆 Leaderboards</h2>
                <div class="leaderboard-tabs">
                    ${this.categories.map(cat => `
                        <button class="leaderboard-tab ${cat === this.currentCategory ? 'active' : ''}" 
                                onclick="leaderboards.switchCategory('${cat}')">
                            ${cat}
                        </button>
                    `).join('')}
                </div>
                <div class="leaderboard-list">
                    ${this.topUsers.map(user => `
                        <div class="leaderboard-item ${user.name === 'You' ? 'current-user' : ''}">
                            <div class="rank">#${user.rank}</div>
                            <div class="user-avatar">${user.avatar}</div>
                            <div class="user-info">
                                <span class="user-name">${user.name} ${user.verified ? '✓' : ''}</span>
                            </div>
                            <div class="user-points">${user.points.toLocaleString()} pts</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    switchCategory(category) {
        this.currentCategory = category;
        console.log('Switched to category:', category);
        // In production, fetch new leaderboard data
    }
}

// Polls & Surveys System
class PollsSystem {
    constructor() {
        this.polls = [
            {
                id: 1,
                question: 'Best city in Ontario for meetups?',
                options: [
                    { text: 'Toronto', votes: 45 },
                    { text: 'Ottawa', votes: 23 },
                    { text: 'Mississauga', votes: 18 },
                    { text: 'Hamilton', votes: 14 }
                ],
                totalVotes: 100,
                hasVoted: false
            }
        ];
    }
    
    createPoll(poll) {
        return `
            <div class="poll-card">
                <h4>📊 ${poll.question}</h4>
                <div class="poll-options">
                    ${poll.options.map((option, index) => {
                        const percentage = poll.totalVotes > 0 ? ((option.votes / poll.totalVotes) * 100).toFixed(1) : 0;
                        return `
                            <div class="poll-option ${poll.hasVoted ? 'voted' : ''}" 
                                 onclick="pollsSystem.vote(${poll.id}, ${index})">
                                <div class="option-text">${option.text}</div>
                                <div class="option-bar" style="width: ${percentage}%"></div>
                                <div class="option-votes">${percentage}%</div>
                            </div>
                        `;
                    }).join('')}
                </div>
                <div class="poll-footer">${poll.totalVotes} votes</div>
            </div>
        `;
    }
    
    vote(pollId, optionIndex) {
        const poll = this.polls.find(p => p.id === pollId);
        if (poll && !poll.hasVoted) {
            poll.options[optionIndex].votes++;
            poll.totalVotes++;
            poll.hasVoted = true;
            NotificationSystem.show('Vote Recorded', 'Thank you for voting!', 'success');
        }
    }
}

// Event Reminders System
class EventReminders {
    constructor() {
        this.reminders = [
            { id: 1, event: 'Toronto Meetup', time: new Date(Date.now() + 86400000), reminded: false },
            { id: 2, event: 'Ottawa Gathering', time: new Date(Date.now() + 172800000), reminded: false }
        ];
    }
    
    checkReminders() {
        const now = new Date();
        this.reminders.forEach(reminder => {
            const timeUntil = reminder.time - now;
            const hoursUntil = Math.floor(timeUntil / (1000 * 60 * 60));
            
            if (hoursUntil <= 24 && !reminder.reminded) {
                NotificationSystem.show(
                    '⏰ Event Reminder',
                    `${reminder.event} is in ${hoursUntil} hours!`,
                    'warning'
                );
                reminder.reminded = true;
            }
        });
    }
    
    addReminder(event, time) {
        this.reminders.push({
            id: this.reminders.length + 1,
            event: event,
            time: time,
            reminded: false
        });
        NotificationSystem.show('Reminder Set', `You'll be notified about ${event}`, 'success');
    }
}

// Voice Messages System
class VoiceMessages {
    constructor() {
        this.isRecording = false;
        this.recordingTime = 0;
    }
    
    startRecording() {
        if (!this.isRecording) {
            this.isRecording = true;
            this.recordingTime = 0;
            NotificationSystem.show('Recording', '🎤 Voice message recording started', 'info');
            
            // Simulate recording
            this.recordingInterval = setInterval(() => {
                this.recordingTime++;
            }, 1000);
        }
    }
    
    stopRecording() {
        if (this.isRecording) {
            this.isRecording = false;
            clearInterval(this.recordingInterval);
            NotificationSystem.show('Recorded', `🎤 Voice message (${this.recordingTime}s) ready to send`, 'success');
        }
    }
    
    createVoiceMessageButton() {
        return `
            <button class="voice-message-btn" 
                    onmousedown="voiceMessages.startRecording()" 
                    onmouseup="voiceMessages.stopRecording()">
                🎤 Hold to Record
            </button>
        `;
    }
}

// Read Receipts System
class ReadReceipts {
    constructor() {
        this.messages = new Map();
    }
    
    markAsRead(messageId, userId) {
        if (!this.messages.has(messageId)) {
            this.messages.set(messageId, {
                readBy: [],
                readAt: new Date()
            });
        }
        
        const receipt = this.messages.get(messageId);
        if (!receipt.readBy.includes(userId)) {
            receipt.readBy.push(userId);
        }
    }
    
    getReadStatus(messageId) {
        return this.messages.get(messageId) || { readBy: [], readAt: null };
    }
    
    createReadReceiptIndicator(messageId) {
        const status = this.getReadStatus(messageId);
        if (status.readBy.length > 0) {
            return `<span class="read-receipt">✓✓</span>`;
        }
        return `<span class="sent-receipt">✓</span>`;
    }
}

// Typing Indicators System
class TypingIndicators {
    constructor() {
        this.typingUsers = new Set();
    }
    
    startTyping(userId, username) {
        this.typingUsers.add({ userId, username });
        this.showTypingIndicator(username);
    }
    
    stopTyping(userId) {
        this.typingUsers = new Set([...this.typingUsers].filter(u => u.userId !== userId));
    }
    
    showTypingIndicator(username) {
        return `
            <div class="typing-indicator">
                <span>${username} is typing</span>
                <div class="typing-dots">
                    <span class="typing-dot"></span>
                    <span class="typing-dot"></span>
                    <span class="typing-dot"></span>
                </div>
            </div>
        `;
    }
}

// Initialize all systems
let storyFeature, liveStreaming, gamificationSystem, leaderboards, pollsSystem;
let eventReminders, voiceMessages, readReceipts, typingIndicators;

document.addEventListener('DOMContentLoaded', () => {
    storyFeature = new StoryFeature();
    liveStreaming = new LiveStreaming();
    gamificationSystem = new GamificationSystem();
    leaderboards = new Leaderboards();
    pollsSystem = new PollsSystem();
    eventReminders = new EventReminders();
    voiceMessages = new VoiceMessages();
    readReceipts = new ReadReceipts();
    typingIndicators = new TypingIndicators();
    
    // Check event reminders every minute
    setInterval(() => {
        if (eventReminders) {
            eventReminders.checkReminders();
        }
    }, 60000);
    
    console.log('Additional features initialized');
});

// Export for global use
if (typeof window !== 'undefined') {
    window.StoryFeature = StoryFeature;
    window.LiveStreaming = LiveStreaming;
    window.GamificationSystem = GamificationSystem;
    window.Leaderboards = Leaderboards;
    window.PollsSystem = PollsSystem;
    window.EventReminders = EventReminders;
    window.VoiceMessages = VoiceMessages;
    window.ReadReceipts = ReadReceipts;
    window.TypingIndicators = TypingIndicators;
}
