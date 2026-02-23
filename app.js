const pages = {
    home: 'home',
    events: 'events',
    aboutus: 'aboutus',
    contact: 'contact'
};
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    
    // Check for hash in URL to load correct page (e.g., index.html#aboutus)
    const hash = window.location.hash.replace('#', '');
    if (hash && document.querySelector(`[data-page-section="${hash}"]`)) {
        loadPage(hash);
    } else {
        loadPage('home');
    }
});

function initializeNavigation() {
    // Handle all links with data-page attribute (navbar, footer, etc.)
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a[data-page]');
        if (link) {
            e.preventDefault();
            const pageId = link.getAttribute('data-page');
            loadPage(pageId);
            scrollToTop();
        }
        
        if (e.target.matches('[data-navigate]')) {
            const pageId = e.target.getAttribute('data-navigate');
            loadPage(pageId);
            scrollToTop();
        }
    });
}

/**
 * Load a specific page
 * @param {string} pageId - The page identifier to load
 */
function loadPage(pageId) {
    const pageSections = document.querySelectorAll('[data-page-section]');
    pageSections.forEach(page => {
        page.classList.remove('active');
        page.style.display = 'none';
    });
    
    const selectedPage = document.querySelector(`[data-page-section="${pageId}"]`);
    if (selectedPage) {
        selectedPage.style.display = 'block';
        // Use requestAnimationFrame to ensure display change is processed before adding active class
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                selectedPage.classList.add('active');
            });
        });
    }
    updateActiveNavLink(pageId);
    updatePageTitle(pageId);
}

/**
 * Update the active navigation link styling
 * @param {string} pageId - The current page
 */
function updateActiveNavLink(pageId) {
    const navLinks = document.querySelectorAll('.navbar a');
    navLinks.forEach(link => {
        if (link.getAttribute('data-page') === pageId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/**
 * Update page title based on current page
 * @param {string} pageId - The current page
 */
function updatePageTitle(pageId) {
    const titles = {
        home: 'Event Management Site',
        events: 'Events - Event Management Site',
        aboutus: 'About Us - Event Management Site',
        contact: 'Contact Us - Event Management Site'
    };
    document.title = titles[pageId] || 'Event Management Site';
}
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
function handleSignIn() {
    window.location.href = 'signin.php';
}

function handleSignUp() {
    window.location.href = 'signup.php';
}
function handleEnroll() {
    const adminSection = document.getElementById('enroll-admin');
    if (adminSection) {
        adminSection.innerHTML = `
            <div class="enroll-content">
                <h2>You are now Admin</h2>
            </div>
        `;
    }
}

function handleExploreEvents() {
    window.location.href = 'create-event.html';
}
