// Mock Data Storage
const mockMembers = {
    'demo': {
        id: 'UM-2024-001',
        firstName: 'Kevin',
        lastName: 'Montoya',
        email: 'kevin.montoya@email.com',
        phone: '(555) 123-4567',
        address: '123 Main St, City, ST 12345',
        joinDate: '2019-03-15',
        status: 'Active',
        duesStatus: 'Current',
        duesPaidThrough: '2024-12-31',
        benefits: [
            { id: 1, name: 'Health Insurance', description: 'Comprehensive health coverage for you and your family', status: 'Active', icon: '🏥' },
            { id: 2, name: 'Dental Insurance', description: 'Full dental coverage including cleanings and procedures', status: 'Active', icon: '🦷' },
            { id: 3, name: 'Vision Insurance', description: 'Eye exams and prescription eyewear coverage', status: 'Active', icon: '👓' },
            { id: 4, name: 'Life Insurance', description: 'Term life insurance coverage up to $500,000', status: 'Active', icon: '🛡️' },
            { id: 5, name: 'Retirement Plan', description: '401(k) with employer matching contributions', status: 'Active', icon: '💰' },
            { id: 6, name: 'Disability Insurance', description: 'Short and long-term disability coverage', status: 'Active', icon: '♿' },
            { id: 7, name: 'Legal Assistance', description: 'Access to union legal services', status: 'Active', icon: '⚖️' },
            { id: 8, name: 'Training Programs', description: 'Professional development and skill training', status: 'Active', icon: '📚' },
            { id: 9, name: 'Job Placement', description: 'Career counseling and job placement services', status: 'Active', icon: '💼' },
            { id: 10, name: 'Scholarship Program', description: 'Educational scholarships for members and families', status: 'Active', icon: '🎓' },
            { id: 11, name: 'Wellness Program', description: 'Health and wellness resources and discounts', status: 'Active', icon: '💪' },
            { id: 12, name: 'Discount Network', description: 'Exclusive discounts at partner retailers', status: 'Active', icon: '🛒' }
        ],
        events: [
            { id: 1, title: 'Monthly General Meeting', description: 'Join us for our monthly general membership meeting to discuss union business and upcoming initiatives.', date: '2024-12-15', time: '6:00 PM', location: 'Union Hall, 456 Union Ave', type: 'Meeting' },
            { id: 2, title: 'Holiday Celebration', description: 'Annual holiday party for all members and their families. Food, drinks, and entertainment provided.', date: '2024-12-20', time: '7:00 PM', location: 'Convention Center', type: 'Social' },
            { id: 3, title: 'Safety Training Workshop', description: 'Mandatory safety training session covering workplace safety protocols and best practices.', date: '2024-12-22', time: '9:00 AM', location: 'Training Center', type: 'Training' },
            { id: 4, title: 'New Member Orientation', description: 'Orientation session for new union members to learn about benefits and resources.', date: '2025-01-05', time: '10:00 AM', location: 'Union Hall', type: 'Orientation' },
            { id: 5, title: 'Contract Negotiation Update', description: 'Update meeting on ongoing contract negotiations with management.', date: '2025-01-10', time: '5:30 PM', location: 'Union Hall', type: 'Meeting' }
        ],
        documents: [
            { id: 1, name: 'Membership Certificate', type: 'PDF', size: '245 KB', date: '2019-03-15', category: 'Membership' },
            { id: 2, name: 'Current Contract', type: 'PDF', size: '1.2 MB', date: '2023-01-01', category: 'Contracts' },
            { id: 3, name: 'Benefits Summary', type: 'PDF', size: '856 KB', date: '2024-01-01', category: 'Benefits' },
            { id: 4, name: 'Dues Payment History', type: 'PDF', size: '432 KB', date: '2024-11-30', category: 'Financial' },
            { id: 5, name: 'Member Handbook', type: 'PDF', size: '2.1 MB', date: '2024-01-15', category: 'Resources' },
            { id: 6, name: 'Grievance Form', type: 'PDF', size: '156 KB', date: '2024-06-01', category: 'Forms' }
        ],
        activities: [
            { id: 1, type: 'benefit', title: 'Health Insurance Updated', description: 'Your health insurance plan has been renewed for 2025', time: '2 hours ago', icon: '🏥' },
            { id: 2, type: 'dues', title: 'Dues Payment Received', description: 'Monthly dues payment processed successfully', time: '1 day ago', icon: '💳' },
            { id: 3, type: 'event', title: 'Event Reminder', description: 'Monthly General Meeting scheduled for December 15th', time: '2 days ago', icon: '📅' },
            { id: 4, type: 'document', title: 'New Document Available', description: 'Updated Benefits Summary document is now available', time: '3 days ago', icon: '📄' },
            { id: 5, type: 'profile', title: 'Profile Updated', description: 'Your contact information was successfully updated', time: '1 week ago', icon: '👤' }
        ],
        notifications: [
            { id: 1, title: 'New Event: Holiday Celebration', message: 'Join us for our annual holiday party on December 20th', time: '1 hour ago', read: false },
            { id: 2, title: 'Benefits Renewal Reminder', message: 'Your health insurance renewal is due by December 31st', time: '3 hours ago', read: false },
            { id: 3, title: 'Meeting Minutes Available', message: 'November meeting minutes are now available in Documents', time: '1 day ago', read: false },
            { id: 4, title: 'Dues Payment Confirmed', message: 'Your December dues payment has been processed', time: '2 days ago', read: true },
            { id: 5, title: 'Welcome to the Portal', message: 'Thank you for using the Union Members Portal', time: '1 week ago', read: true }
        ]
    }
};

// Initialize App
let currentMember = null;
let currentSection = 'overview';

// Load member data from localStorage or use demo
function loadMemberData(memberId) {
    const stored = localStorage.getItem(`member_${memberId}`);
    if (stored) {
        return JSON.parse(stored);
    }
    // Use demo data for any login
    return mockMembers['demo'];
}

// Save member data to localStorage
function saveMemberData(memberId, data) {
    localStorage.setItem(`member_${memberId}`, JSON.stringify(data));
}

// Initialize member data
function initializeMember(memberId) {
    currentMember = loadMemberData(memberId);
    if (!currentMember.id) {
        currentMember.id = memberId;
    }
    saveMemberData(memberId, currentMember);
    updateDashboard();
}

// Update dashboard with member data
function updateDashboard() {
    if (!currentMember) return;

    // Update header
    const fullName = `${currentMember.firstName} ${currentMember.lastName}`;
    document.getElementById('memberName').textContent = fullName;
    document.getElementById('profileName').textContent = fullName;
    
    // Update avatar initials
    const initials = `${currentMember.firstName[0]}${currentMember.lastName[0]}`;
    document.getElementById('avatarInitials').textContent = initials;
    document.getElementById('profileAvatarInitials').textContent = initials;
    document.getElementById('userAvatar').innerHTML = `<span>${initials}</span>`;

    // Update profile member ID
    document.getElementById('profileMemberId').textContent = currentMember.id;

    // Update stats
    document.getElementById('membershipStatus').textContent = currentMember.status;
    document.getElementById('benefitsCount').textContent = currentMember.benefits.length;
    document.getElementById('eventsCount').textContent = currentMember.events.filter(e => new Date(e.date) >= new Date()).length;
    document.getElementById('duesStatus').textContent = currentMember.duesStatus;

    // Update activities
    updateActivities();
    
    // Update profile info
    updateProfileInfo();
    
    // Update benefits
    updateBenefits();
    
    // Update events
    updateEvents();
    
    // Update documents
    updateDocuments();
    
    // Update notifications
    updateNotifications();
    
    // Update FAQ
    updateFAQ();
}

// Update activities list
function updateActivities() {
    const container = document.getElementById('activityList');
    container.innerHTML = '';
    
    currentMember.activities.slice(0, 5).forEach(activity => {
        const item = document.createElement('div');
        item.className = 'activity-item';
        item.innerHTML = `
            <div class="activity-icon">${activity.icon}</div>
            <div class="activity-content">
                <h4>${activity.title}</h4>
                <p>${activity.description}</p>
                <span class="activity-time">${activity.time}</span>
            </div>
        `;
        container.appendChild(item);
    });
}

// Update profile information
function updateProfileInfo() {
    const personalInfo = document.getElementById('personalInfo');
    personalInfo.innerHTML = `
        <div class="info-item">
            <label>First Name</label>
            <span>${currentMember.firstName}</span>
        </div>
        <div class="info-item">
            <label>Last Name</label>
            <span>${currentMember.lastName}</span>
        </div>
        <div class="info-item">
            <label>Email</label>
            <span>${currentMember.email}</span>
        </div>
        <div class="info-item">
            <label>Phone</label>
            <span>${currentMember.phone}</span>
        </div>
        <div class="info-item">
            <label>Address</label>
            <span>${currentMember.address}</span>
        </div>
    `;

    const membershipInfo = document.getElementById('membershipInfo');
    membershipInfo.innerHTML = `
        <div class="info-item">
            <label>Member ID</label>
            <span>${currentMember.id}</span>
        </div>
        <div class="info-item">
            <label>Join Date</label>
            <span>${new Date(currentMember.joinDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
        <div class="info-item">
            <label>Membership Status</label>
            <span>${currentMember.status}</span>
        </div>
        <div class="info-item">
            <label>Dues Status</label>
            <span>${currentMember.duesStatus}</span>
        </div>
        <div class="info-item">
            <label>Dues Paid Through</label>
            <span>${new Date(currentMember.duesPaidThrough).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>
    `;
}

// Update benefits list
function updateBenefits() {
    const container = document.getElementById('benefitsList');
    container.innerHTML = '';
    
    currentMember.benefits.forEach(benefit => {
        const card = document.createElement('div');
        card.className = 'benefit-card';
        card.innerHTML = `
            <div class="benefit-header">
                <div class="benefit-icon">${benefit.icon}</div>
                <h3>${benefit.name}</h3>
            </div>
            <p>${benefit.description}</p>
            <div class="benefit-status">
                <span>●</span>
                <span>${benefit.status}</span>
            </div>
        `;
        container.appendChild(card);
    });
}

// Update events list
function updateEvents() {
    const container = document.getElementById('eventsList');
    container.innerHTML = '';
    
    const upcomingEvents = currentMember.events
        .filter(e => new Date(e.date) >= new Date())
        .sort((a, b) => new Date(a.date) - new Date(b.date));
    
    if (upcomingEvents.length === 0) {
        container.innerHTML = '<div class="card"><p>No upcoming events scheduled.</p></div>';
        return;
    }
    
    upcomingEvents.forEach(event => {
        const date = new Date(event.date);
        const day = date.getDate();
        const month = date.toLocaleDateString('en-US', { month: 'short' });
        
        const card = document.createElement('div');
        card.className = 'event-card';
        card.innerHTML = `
            <div class="event-date">
                <div class="event-day">${day}</div>
                <div class="event-month">${month}</div>
            </div>
            <div class="event-content">
                <h3>${event.title}</h3>
                <p>${event.description}</p>
                <div class="event-meta">
                    <span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        ${event.time}
                    </span>
                    <span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        ${event.location}
                    </span>
                    <span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        ${event.type}
                    </span>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// Update documents list
function updateDocuments() {
    const container = document.getElementById('documentsList');
    container.innerHTML = '';
    
    currentMember.documents.forEach(doc => {
        const card = document.createElement('div');
        card.className = 'document-card';
        card.innerHTML = `
            <div class="document-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                </svg>
            </div>
            <h3>${doc.name}</h3>
            <p>${doc.category} • ${doc.size} • ${new Date(doc.date).toLocaleDateString()}</p>
            <div class="document-action" onclick="downloadDocument(${doc.id})">
                <span>Download</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
            </div>
        `;
        container.appendChild(card);
    });
}

// Update notifications
function updateNotifications() {
    const container = document.getElementById('notificationsContent');
    const unreadCount = currentMember.notifications.filter(n => !n.read).length;
    
    document.getElementById('notificationBadge').textContent = unreadCount;
    if (unreadCount === 0) {
        document.getElementById('notificationBadge').style.display = 'none';
    } else {
        document.getElementById('notificationBadge').style.display = 'block';
    }
    
    container.innerHTML = '';
    
    if (currentMember.notifications.length === 0) {
        container.innerHTML = '<div style="padding: 20px; text-align: center; color: var(--text-secondary);">No notifications</div>';
        return;
    }
    
    currentMember.notifications.forEach(notification => {
        const item = document.createElement('div');
        item.className = `notification-item ${notification.read ? '' : 'unread'}`;
        item.onclick = () => markNotificationRead(notification.id);
        item.innerHTML = `
            <h4>${notification.title}</h4>
            <p>${notification.message}</p>
            <span class="notification-time">${notification.time}</span>
        `;
        container.appendChild(item);
    });
}

// Update FAQ
function updateFAQ() {
    const faqs = [
        { q: 'How do I update my contact information?', a: 'You can update your contact information by clicking the "Edit Profile" button on your profile page. Changes are saved immediately.' },
        { q: 'When are union dues due?', a: 'Union dues are due on the first of each month. You can view your payment history in the Documents section.' },
        { q: 'How do I access my benefits?', a: 'All your active benefits are listed in the Benefits section. Click on any benefit card to view more details and access information.' },
        { q: 'Can I download my membership certificate?', a: 'Yes, your membership certificate and other documents are available in the Documents section. Simply click the download button on any document.' },
        { q: 'How do I report a workplace issue?', a: 'You can contact support through the Support section or download a grievance form from the Documents section.' },
        { q: 'What events are coming up?', a: 'All upcoming events are listed in the Events section. You can see dates, times, and locations for each event.' }
    ];
    
    const container = document.getElementById('faqList');
    container.innerHTML = '';
    
    faqs.forEach(faq => {
        const item = document.createElement('div');
        item.className = 'faq-item';
        item.innerHTML = `
            <div class="faq-question">${faq.q}</div>
            <div class="faq-answer">${faq.a}</div>
        `;
        container.appendChild(item);
    });
}

// Navigation
function switchSection(section) {
    // Update nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.section === section) {
            item.classList.add('active');
        }
    });
    
    // Update content sections
    document.querySelectorAll('.content-section').forEach(sec => {
        sec.classList.remove('active');
    });
    
    const targetSection = document.getElementById(section);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Update section title
    const titles = {
        overview: 'Dashboard Overview',
        profile: 'My Profile',
        benefits: 'Benefits',
        events: 'Upcoming Events',
        documents: 'Documents',
        support: 'Support'
    };
    
    const subtitles = {
        overview: `Welcome back, ${currentMember.firstName}`,
        profile: 'View and manage your profile information',
        benefits: 'Explore your available benefits',
        events: 'Stay informed about union events',
        documents: 'Access your union documents',
        support: 'Get help and contact support'
    };
    
    document.getElementById('sectionTitle').textContent = titles[section] || 'Dashboard';
    document.getElementById('sectionSubtitle').textContent = subtitles[section] || '';
    
    currentSection = section;
}

// Login handler
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const memberId = document.getElementById('memberId').value.trim();
    
    if (memberId) {
        // Hide login screen with animation
        const loginScreen = document.getElementById('loginScreen');
        loginScreen.style.opacity = '0';
        loginScreen.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            loginScreen.classList.add('hidden');
            document.getElementById('dashboard').classList.remove('hidden');
            
            // Initialize member
            initializeMember(memberId.toLowerCase());
            
            // Animate dashboard in
            const dashboard = document.getElementById('dashboard');
            dashboard.style.opacity = '0';
            dashboard.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                dashboard.style.transition = 'all 0.5s ease';
                dashboard.style.opacity = '1';
                dashboard.style.transform = 'translateY(0)';
            }, 50);
        }, 300);
    }
});

// Logout handler
document.getElementById('logoutBtn').addEventListener('click', () => {
    if (confirm('Are you sure you want to logout?')) {
        currentMember = null;
        document.getElementById('dashboard').classList.add('hidden');
        document.getElementById('loginScreen').classList.remove('hidden');
        document.getElementById('loginForm').reset();
        
        // Reset login screen animation
        const loginScreen = document.getElementById('loginScreen');
        loginScreen.style.opacity = '1';
        loginScreen.style.transform = 'scale(1)';
    }
});

// Navigation handlers
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const section = item.dataset.section;
        switchSection(section);
    });
});

// Notifications dropdown
document.getElementById('notificationsBtn').addEventListener('click', (e) => {
    e.stopPropagation();
    const dropdown = document.getElementById('notificationsDropdown');
    dropdown.classList.toggle('hidden');
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    const dropdown = document.getElementById('notificationsDropdown');
    const btn = document.getElementById('notificationsBtn');
    
    if (!dropdown.contains(e.target) && !btn.contains(e.target)) {
        dropdown.classList.add('hidden');
    }
});

// Mark all notifications as read
document.getElementById('markAllRead').addEventListener('click', () => {
    currentMember.notifications.forEach(n => n.read = true);
    saveMemberData(currentMember.id, currentMember);
    updateNotifications();
});

// Mark notification as read
function markNotificationRead(id) {
    const notification = currentMember.notifications.find(n => n.id === id);
    if (notification && !notification.read) {
        notification.read = true;
        saveMemberData(currentMember.id, currentMember);
        updateNotifications();
    }
}

// Quick actions
document.querySelectorAll('.action-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const action = btn.dataset.action;
        
        switch(action) {
            case 'update-profile':
                switchSection('profile');
                setTimeout(() => {
                    document.getElementById('editProfileBtn').click();
                }, 300);
                break;
            case 'view-benefits':
                switchSection('benefits');
                break;
            case 'download-docs':
                switchSection('documents');
                break;
            case 'contact-support':
                switchSection('support');
                break;
        }
    });
});

// Edit profile handler
document.getElementById('editProfileBtn').addEventListener('click', () => {
    const firstName = prompt('First Name:', currentMember.firstName);
    if (firstName) {
        currentMember.firstName = firstName;
    }
    
    const lastName = prompt('Last Name:', currentMember.lastName);
    if (lastName) {
        currentMember.lastName = lastName;
    }
    
    const email = prompt('Email:', currentMember.email);
    if (email) {
        currentMember.email = email;
    }
    
    const phone = prompt('Phone:', currentMember.phone);
    if (phone) {
        currentMember.phone = phone;
    }
    
    saveMemberData(currentMember.id, currentMember);
    updateDashboard();
    alert('Profile updated successfully!');
});

// Download document handler
function downloadDocument(id) {
    const doc = currentMember.documents.find(d => d.id === id);
    if (doc) {
        // Simulate download
        alert(`Downloading ${doc.name}...\n\n(In a real application, this would download the file)`);
        
        // Add activity
        const newActivity = {
            id: Date.now(),
            type: 'document',
            title: 'Document Downloaded',
            description: `You downloaded ${doc.name}`,
            time: 'Just now',
            icon: '📥'
        };
        
        currentMember.activities.unshift(newActivity);
        if (currentMember.activities.length > 10) {
            currentMember.activities.pop();
        }
        
        saveMemberData(currentMember.id, currentMember);
        updateActivities();
    }
}

// Support form handler
document.getElementById('supportForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const subject = document.getElementById('supportSubject').value;
    const message = document.getElementById('supportMessage').value;
    
    // Simulate sending
    alert(`Thank you for contacting support!\n\nSubject: ${subject}\n\nYour message has been received and our support team will respond within 24 hours.`);
    
    // Add notification
    const newNotification = {
        id: Date.now(),
        title: 'Support Request Received',
        message: `We received your support request: "${subject}". Our team will respond soon.`,
        time: 'Just now',
        read: false
    };
    
    currentMember.notifications.unshift(newNotification);
    saveMemberData(currentMember.id, currentMember);
    updateNotifications();
    
    // Reset form
    document.getElementById('supportForm').reset();
});

// Add smooth scroll animations
document.addEventListener('DOMContentLoaded', () => {
    // Animate elements on scroll
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
    
    // Observe cards and sections
    setTimeout(() => {
        document.querySelectorAll('.card, .stat-card, .benefit-card, .event-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'all 0.5s ease';
            observer.observe(el);
        });
    }, 100);
});

// Initialize on page load
window.addEventListener('load', () => {
    // Check if user is already logged in
    const savedMemberId = localStorage.getItem('currentMemberId');
    if (savedMemberId) {
        const memberData = loadMemberData(savedMemberId);
        if (memberData) {
            currentMember = memberData;
            document.getElementById('loginScreen').classList.add('hidden');
            document.getElementById('dashboard').classList.remove('hidden');
            updateDashboard();
        }
    }
});

