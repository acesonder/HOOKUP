// Facebook-style Chat Bubble Widget
class ChatBubble {
    constructor() {
        this.isOpen = false;
        this.unreadCount = 0;
        this.conversations = [
            {
                id: 1,
                name: 'Sarah M.',
                avatar: '👩',
                lastMessage: 'Hey! How are you?',
                time: '2m',
                unread: 2,
                online: true
            },
            {
                id: 2,
                name: 'Mike T.',
                avatar: '👨',
                lastMessage: 'See you at the meetup!',
                time: '1h',
                unread: 0,
                online: true
            },
            {
                id: 3,
                name: 'Toronto Group',
                avatar: '👥',
                lastMessage: '15 new messages',
                time: '3h',
                unread: 15,
                online: false
            },
            {
                id: 4,
                name: 'Emma L.',
                avatar: '👩',
                lastMessage: 'Thanks for the help!',
                time: '5h',
                unread: 0,
                online: false
            }
        ];
        
        this.init();
    }
    
    init() {
        this.createWidget();
        this.attachEventListeners();
        this.updateUnreadCount();
        this.startAnimations();
    }
    
    createWidget() {
        const widget = document.createElement('div');
        widget.className = 'chat-bubble-widget';
        widget.innerHTML = `
            <button class="chat-bubble-button" id="chat-bubble-btn">
                💬
                <span class="badge" id="chat-badge" style="display: none;">0</span>
            </button>
            
            <div class="chat-bubble-window" id="chat-bubble-window">
                <div class="chat-bubble-header">
                    <h3>Messages</h3>
                    <button class="chat-bubble-close" id="chat-bubble-close">×</button>
                </div>
                <div class="chat-bubble-conversations" id="chat-conversations">
                    ${this.renderConversations()}
                </div>
                <div class="chat-bubble-footer">
                    <a href="#" onclick="showSection('chat'); return false;">View All Messages</a>
                </div>
            </div>
        `;
        
        document.body.appendChild(widget);
    }
    
    renderConversations() {
        return this.conversations.map(conv => `
            <div class="chat-bubble-conversation ${conv.unread > 0 ? 'unread' : ''}" data-id="${conv.id}">
                <div class="chat-bubble-avatar">
                    ${conv.avatar}
                    ${conv.online ? '<span class="online-indicator"></span>' : ''}
                </div>
                <div class="chat-bubble-info">
                    <div class="chat-bubble-name">
                        <span>${conv.name}</span>
                        <span class="chat-bubble-time">${conv.time}</span>
                    </div>
                    <div class="chat-bubble-preview">${conv.lastMessage}</div>
                </div>
                ${conv.unread > 0 ? `<div class="chat-bubble-unread-badge">${conv.unread}</div>` : ''}
            </div>
        `).join('');
    }
    
    attachEventListeners() {
        const button = document.getElementById('chat-bubble-btn');
        const closeBtn = document.getElementById('chat-bubble-close');
        const window = document.getElementById('chat-bubble-window');
        
        button.addEventListener('click', () => this.toggle());
        closeBtn.addEventListener('click', () => this.close());
        
        // Click outside to close
        document.addEventListener('click', (e) => {
            if (this.isOpen && !window.contains(e.target) && !button.contains(e.target)) {
                this.close();
            }
        });
        
        // Conversation clicks
        document.querySelectorAll('.chat-bubble-conversation').forEach(conv => {
            conv.addEventListener('click', () => {
                const id = conv.getAttribute('data-id');
                this.openConversation(id);
            });
        });
    }
    
    toggle() {
        this.isOpen ? this.close() : this.open();
    }
    
    open() {
        const window = document.getElementById('chat-bubble-window');
        window.classList.add('active');
        this.isOpen = true;
    }
    
    close() {
        const window = document.getElementById('chat-bubble-window');
        window.classList.remove('active');
        this.isOpen = false;
    }
    
    openConversation(id) {
        console.log('Opening conversation:', id);
        // Mark as read
        const conv = this.conversations.find(c => c.id == id);
        if (conv && conv.unread > 0) {
            conv.unread = 0;
            this.updateUnreadCount();
            this.refreshConversations();
        }
        
        // In production, navigate to chat section
        if (typeof showSection === 'function') {
            showSection('chat');
        }
        this.close();
    }
    
    updateUnreadCount() {
        this.unreadCount = this.conversations.reduce((sum, conv) => sum + conv.unread, 0);
        const badge = document.getElementById('chat-badge');
        
        if (this.unreadCount > 0) {
            badge.textContent = this.unreadCount > 99 ? '99+' : this.unreadCount;
            badge.style.display = 'flex';
        } else {
            badge.style.display = 'none';
        }
    }
    
    refreshConversations() {
        const container = document.getElementById('chat-conversations');
        container.innerHTML = this.renderConversations();
        
        // Reattach listeners
        document.querySelectorAll('.chat-bubble-conversation').forEach(conv => {
            conv.addEventListener('click', () => {
                const id = conv.getAttribute('data-id');
                this.openConversation(id);
            });
        });
    }
    
    addMessage(conversationId, message) {
        const conv = this.conversations.find(c => c.id == conversationId);
        if (conv) {
            conv.lastMessage = message;
            conv.time = 'now';
            conv.unread++;
            
            // Move to top
            this.conversations = [conv, ...this.conversations.filter(c => c.id != conversationId)];
            
            this.updateUnreadCount();
            this.refreshConversations();
            this.showNotification('New message from ' + conv.name, message);
        }
    }
    
    showNotification(title, message) {
        if (typeof NotificationSystem !== 'undefined') {
            NotificationSystem.show(title, message, 'info');
        }
    }
    
    startAnimations() {
        // Simulate new messages periodically for demo
        setInterval(() => {
            if (Math.random() > 0.9 && this.unreadCount < 50) {
                const randomConv = this.conversations[Math.floor(Math.random() * this.conversations.length)];
                this.addMessage(randomConv.id, 'New message...');
            }
        }, 30000);
    }
}

// Notification System
class NotificationSystem {
    static notifications = [];
    static currentId = 0;
    
    static show(title, message, type = 'info') {
        const id = ++this.currentId;
        const notification = this.createNotification(id, title, message, type);
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => notification.classList.add('active'), 10);
        
        // Auto dismiss after 5 seconds
        setTimeout(() => this.dismiss(id), 5000);
        
        return id;
    }
    
    static createNotification(id, title, message, type) {
        const div = document.createElement('div');
        div.className = `notification-bubble ${type}`;
        div.id = `notification-${id}`;
        div.style.top = `${20 + (this.notifications.length * 100)}px`;
        
        const icons = {
            success: '✓',
            info: 'ℹ',
            warning: '⚠',
            error: '✗'
        };
        
        div.innerHTML = `
            <div class="notification-header">
                <div class="notification-title">
                    <span>${icons[type] || icons.info}</span>
                    <span>${title}</span>
                </div>
                <button class="notification-close" onclick="NotificationSystem.dismiss(${id})">×</button>
            </div>
            <div class="notification-body">${message}</div>
        `;
        
        this.notifications.push(id);
        return div;
    }
    
    static dismiss(id) {
        const notification = document.getElementById(`notification-${id}`);
        if (notification) {
            notification.classList.add('closing');
            setTimeout(() => {
                notification.remove();
                this.notifications = this.notifications.filter(n => n !== id);
                this.repositionNotifications();
            }, 300);
        }
    }
    
    static repositionNotifications() {
        this.notifications.forEach((id, index) => {
            const notification = document.getElementById(`notification-${id}`);
            if (notification) {
                notification.style.top = `${20 + (index * 100)}px`;
            }
        });
    }
}

// Initialize on page load
let chatBubble;
document.addEventListener('DOMContentLoaded', () => {
    chatBubble = new ChatBubble();
    
    // Show welcome notification
    setTimeout(() => {
        NotificationSystem.show(
            'Welcome to HOOKUP! 🔥',
            'Your profile is now active. Start connecting with people in Ontario!',
            'success'
        );
    }, 1000);
});

// Export for use in other scripts
if (typeof window !== 'undefined') {
    window.ChatBubble = ChatBubble;
    window.NotificationSystem = NotificationSystem;
}
