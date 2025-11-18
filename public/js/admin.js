// Admin Console JavaScript

// Navigation between sections
function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.admin-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Remove active class from all nav items
    document.querySelectorAll('.admin-nav .nav-item').forEach(item => {
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
        'dashboard': 'Admin Dashboard',
        'users': 'User Management',
        'content': 'Content Moderation',
        'meetups': 'Meetup Management',
        'reports': 'Reports & Flags',
        'analytics': 'Analytics & Statistics',
        'verification': 'Verification Requests',
        'payments': 'Payments & Transactions',
        'settings': 'System Settings',
        'logs': 'Activity Logs',
        'security': 'Security & Access Control'
    };
    
    document.getElementById('section-title').textContent = titles[sectionName] || 'Admin Console';
}

// Set up navigation click handlers
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.admin-nav .nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const section = item.getAttribute('data-section');
            if (section) {
                showSection(section);
            }
        });
    });
});

// Logout function
function logoutAdmin() {
    if (confirm('Are you sure you want to logout?')) {
        window.location.href = '/';
    }
}

// Admin action functions (placeholders for real implementation)
function viewUser(userId) {
    console.log('Viewing user:', userId);
    alert('User details would be shown here');
}

function suspendUser(userId) {
    if (confirm('Suspend this user?')) {
        console.log('Suspending user:', userId);
        alert('User suspended');
    }
}

function banUser(userId) {
    if (confirm('Ban this user? This action is permanent.')) {
        console.log('Banning user:', userId);
        alert('User banned');
    }
}

function approveContent(contentId) {
    console.log('Approving content:', contentId);
    alert('Content approved');
}

function removeContent(contentId) {
    if (confirm('Remove this content?')) {
        console.log('Removing content:', contentId);
        alert('Content removed');
    }
}

function reviewContent(contentId) {
    console.log('Reviewing content:', contentId);
    alert('Content review interface would open here');
}

function dismissReport(reportId) {
    if (confirm('Dismiss this report?')) {
        console.log('Dismissing report:', reportId);
        alert('Report dismissed');
    }
}

function approveVerification(userId) {
    if (confirm('Approve verification for this user?')) {
        console.log('Approving verification:', userId);
        alert('Verification approved');
    }
}

function rejectVerification(userId) {
    if (confirm('Reject verification for this user?')) {
        console.log('Rejecting verification:', userId);
        alert('Verification rejected');
    }
}

// Real-time updates simulation
setInterval(() => {
    // Simulate real-time admin updates
    console.log('Checking for admin updates...');
}, 60000); // Every minute

console.log('HOOKUP Admin Console - Loaded');
console.log('Admin access granted');
