// Dark Mode avec icône dynamique
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

