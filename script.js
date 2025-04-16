// 📌 Search Icon Toggle
document.addEventListener("DOMContentLoaded", function () {
    const searchIcon = document.querySelector(".search-icon");
    const searchBar = document.querySelector(".search-bar");

    if (searchIcon && searchBar) {
        searchIcon.addEventListener("click", function () {
            searchBar.style.display = searchBar.style.display === "none" || searchBar.style.display === "" ? "block" : "none";
        });
    } else {
        console.error("Search icon or search bar element not found.");
    }
});

// 📌 Debounced Search Bar Filtering
function debounce(func, delay) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}

const searchBar = document.getElementById("searchBar");
if (searchBar) {
    searchBar.addEventListener("keyup", debounce(function () {
        const searchQuery = this.value.toLowerCase();
        const scholarships = document.querySelectorAll(".scholarship-container");

        scholarships.forEach((scholarship) => {
            const title = scholarship.getAttribute("data-title")?.toLowerCase() || "";
            scholarship.style.display = title.includes(searchQuery) ? "block" : "none";
        });
    }, 300)); // 300ms delay
} else {
    console.error("Search bar element not found.");
}

// 📌 Auto-Rotate Logo
function autoRotateLogo() {
    const logo = document.querySelector('.logo');
    if (logo) {
        let rotation = 0;
        setInterval(() => {
            rotation = (rotation + 180) % 360; // Rotates 180 degrees every 5s
            logo.style.transform = `rotate(${rotation}deg)`;
        }, 5000);
    } else {
        console.error("Logo element not found.");
    }
}

// Start the automatic rotation when the page loads
window.onload = autoRotateLogo;

// 📌 Expand/Collapse Scholarship Details
document.querySelectorAll('.see-more-btn').forEach(button => {
    button.addEventListener('click', function () {
        const moreDetails = this.closest('.scholarship-details')?.querySelector('.more-details');
        if (moreDetails) {
            moreDetails.classList.toggle('show');
            const isExpanded = moreDetails.classList.contains('show');
            this.textContent = isExpanded ? 'See Less ⬆️' : 'See More ⬇️';
            this.setAttribute('aria-expanded', isExpanded); // Accessibility improvement
        } else {
            console.error("More details element not found.");
        }
    });
});

// 📌 Function to switch sections
function switchSection(page) {
    const sections = document.querySelectorAll('.section');
    if (sections.length === 0) {
        console.error("No sections found.");
        return;
    }

    // Hide all sections
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Show the selected section
    const activeSection = document.querySelector(`.section[data-page="${page}"]`);
    if (activeSection) {
        activeSection.classList.add('active');
    } else {
        console.error(`Section with data-page="${page}" not found.`);
    }
}

// Add event listeners to navigation links
document.querySelectorAll('.nav-item').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent default link behavior
        const page = this.getAttribute('data-page'); // Get the page key
        if (page) {
            switchSection(page); // Switch to the corresponding section
        } else {
            console.error("Data-page attribute not found on navigation link.");
        }
    });
});

// Show the home section by default
switchSection('home');

// Toggle navigation bar
const toggleNavButton = document.getElementById('toggleNav');
const sidebar = document.getElementById('sidebar');
const mainContent = document.querySelector('main');

toggleNavButton.addEventListener('click', () => {
    sidebar.classList.toggle('visible');
    mainContent.classList.toggle('shifted');
});

// Dynamic content loading
const navLinks = document.querySelectorAll('.nav-link');
const contentContainer = document.getElementById('dynamic-content');

function loadContent(url) {
    fetch(url)
        .then(response => response.text())
        .then(html => {
            contentContainer.innerHTML = html;
        })
        .catch(error => console.error('Error loading content:', error));
}

function handleNavigation(event) {
    event.preventDefault(); // Prevent default link behavior

    // Remove the 'active' class from all links
    navLinks.forEach(link => link.classList.remove('active'));

    // Add the 'active' class to the clicked link
    this.classList.add('active');

    // Load the content for the clicked link
    const url = this.href;
    loadContent(url);
}

// Add click event listeners to all navigation links
navLinks.forEach(link => {
    link.addEventListener('click', handleNavigation);
});

// Load default content (Page 1) on initial page load
window.addEventListener('load', () => {
    const defaultLink = document.querySelector('.nav-link.active');
    if (defaultLink) {
        loadContent(defaultLink.href);
    }
});