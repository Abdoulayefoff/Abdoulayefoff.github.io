/* // Dark Mode avec icône dynamique
function toggleDarkMode() {
    const body = document.body;
    const icon = document.querySelector('#darkModeToggle i');
    const tooltip = bootstrap.Tooltip.getInstance(document.getElementById('darkModeToggle'));

    body.classList.toggle('dark-mode');

    if(body.classList.contains('dark-mode')) {
        icon.classList.replace('fa-moon', 'fa-sun');
        tooltip.setContent({ '.tooltip-inner': 'Thème clair' });
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
        tooltip.setContent({ '.tooltip-inner': 'Thème sombre' });
    }

    tooltip.hide();
    localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    // Dark Mode
    if(localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        document.querySelector('#darkModeToggle i').classList.replace('fa-moon', 'fa-sun');
    }

    // Tooltip
    new bootstrap.Tooltip(document.getElementById('darkModeToggle'), {
        trigger: 'hover'
    });

    // Filtrage des projets
    document.querySelectorAll('.filters button').forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.dataset.filter;

            document.querySelectorAll('.filters button').forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            document.querySelectorAll('.project-card').forEach(card => {
                card.style.display = (filter === 'all' || card.dataset.tech === filter)
                    ? 'block'
                    : 'none';
            });
        });
    });

    // Animation au scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.project-card').forEach(card => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease-out';
        observer.observe(card);
    });

    // Fermeture menu mobile
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if(navbarCollapse.classList.contains('show')) {
                new bootstrap.Collapse(navbarCollapse).hide();
            }
        });
    });
});
// Scroll to top button
const scrollToTopBtn = document.getElementById('scrollToTopBtn');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.style.display = 'block';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});


 */
// Dark Mode
function toggleDarkMode() {
    const body = document.body;
    const icon = document.querySelector('#darkModeToggle i');
    const tooltip = bootstrap.Tooltip.getInstance(document.getElementById('darkModeToggle'));

    body.classList.toggle('dark-mode');

    if(body.classList.contains('dark-mode')) {
        icon.classList.replace('fa-moon', 'fa-sun');
        if (tooltip) {
            tooltip.setContent({ '.tooltip-inner': 'Thème clair' });
        }
        localStorage.setItem('darkMode', 'true');
    } else {
        icon.classList.replace('fa-sun', 'fa-moon');
        if (tooltip) {
            tooltip.setContent({ '.tooltip-inner': 'Thème sombre' });
        }
        localStorage.setItem('darkMode', 'false');
    }

    if (tooltip) {
        tooltip.hide();
    }
}

// Initialisation du dark mode
function initDarkMode() {
    if(localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        const icon = document.querySelector('#darkModeToggle i');
        if (icon) {
            icon.classList.replace('fa-moon', 'fa-sun');
        }
    }
}

// Mettre à jour le compteur de projets
function updateProjectCounter() {
    const total = document.querySelectorAll('.project-card').length;
    const visible = document.querySelectorAll('.project-card:not(.d-none)').length;
    
    const visibleElement = document.getElementById('visibleProjects');
    const totalElement = document.getElementById('totalProjects');
    
    if (visibleElement) visibleElement.textContent = visible;
    if (totalElement) totalElement.textContent = total;
}

// Filtrage des projets
function filterProjects() {
    const filterValue = document.querySelector('.filters .active')?.dataset.filter || 'all';
    const searchValue = document.getElementById('searchInput').value.toLowerCase();
    
    document.querySelectorAll('.project-card').forEach(card => {
        const techMatch = filterValue === 'all' || card.dataset.tech === filterValue;
        const searchMatch = card.textContent.toLowerCase().includes(searchValue);
        
        if (techMatch && searchMatch) {
            card.classList.remove('d-none');
            card.style.animation = 'fadeInUp 0.6s ease forwards';
        } else {
            card.classList.add('d-none');
        }
    });
    
    updateProjectCounter();
}

// Initialisation des tooltips
function initTooltips() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        new bootstrap.Tooltip(darkModeToggle, {
            trigger: 'hover',
            title: localStorage.getItem('darkMode') === 'true' ? 'Thème clair' : 'Thème sombre'
        });
    }
}

// Bouton retour en haut
function initBackToTop() {
    const backToTopButton = document.getElementById('backToTop');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Animation au scroll
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.project-card').forEach((card, index) => {
        card.style.opacity = 0;
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease-out';
        card.style.animationDelay = `${index * 0.1}s`;
        observer.observe(card);
    });
}

// Fermeture menu mobile
function initMobileMenu() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            const navbarCollapse = document.querySelector('.navbar-collapse.show');
            if (navbarCollapse) {
                new bootstrap.Collapse(navbarCollapse).hide();
            }
        });
    });
}

// Initialisation des événements
function initEventListeners() {
    // Filtres
    document.querySelectorAll('.filters .btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filters .btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            filterProjects();
        });
    });
    
    // Recherche
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', filterProjects);
    }
}

// Initialisation globale
document.addEventListener('DOMContentLoaded', () => {
    initDarkMode();
    initTooltips();
    initBackToTop();
    initScrollAnimations();
    initMobileMenu();
    initEventListeners();
    updateProjectCounter();
    filterProjects(); // Applique les filtres par défaut au chargement
});