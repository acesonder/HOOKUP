// Main landing page JavaScript

function enterSite() {
    // Age verification - in production, this would be more robust
    const confirmed = confirm('By clicking OK, you confirm that you are 18 years or older and agree to the Terms of Service.');
    if (confirmed) {
        window.location.href = '/dashboard';
    }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s, transform 0.5s';
    observer.observe(card);
});

// Admin access modal functions
function showAdminAccess(event) {
    event.preventDefault();
    document.getElementById('admin-access-modal').style.display = 'block';
}

function closeAdminModal() {
    document.getElementById('admin-access-modal').style.display = 'none';
    document.getElementById('admin-code-input').value = '';
    document.getElementById('admin-error').textContent = '';
}

function verifyAdminAccess() {
    const code = document.getElementById('admin-code-input').value;
    const correctCode = '079777';
    
    if (code === correctCode) {
        // Access granted
        window.location.href = '/admin';
    } else {
        // Access denied
        document.getElementById('admin-error').textContent = '❌ Invalid access code';
        document.getElementById('admin-code-input').value = '';
    }
}

// Allow Enter key to verify
document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('admin-code-input');
    if (input) {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                verifyAdminAccess();
            }
        });
    }
});

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('admin-access-modal');
    if (event.target === modal) {
        closeAdminModal();
    }
}

console.log('HOOKUP Platform - Landing page loaded');
