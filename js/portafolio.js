/*!
* Portafolio basado en Start Bootstrap - Resume v7.0.6
* https://startbootstrap.com/theme/resume (MIT)
*/
window.addEventListener('DOMContentLoaded', () => {

    // 1) ScrollSpy de Bootstrap sobre el menú lateral
    const sideNav = document.body.querySelector('#sideNav');
    if (sideNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#sideNav',
            rootMargin: '0px 0px -40%',
        });
    }

    // 2) Colapsar el menú en pantallas pequeñas al elegir una sección
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    document.querySelectorAll('#navbarResponsive .nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

    // 3) Año actual en el pie de página
    const year = document.getElementById('currentYear');
    if (year) year.textContent = new Date().getFullYear();

    // 4) Filtro de proyectos (Todos / Realizados / Planeados)
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-item');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.filter;
            filterButtons.forEach(b => b.classList.toggle('active', b === btn));
            projects.forEach(item => {
                const show = filter === 'all' || item.dataset.status === filter;
                item.classList.toggle('d-none', !show);
            });
        });
    });

    // 5) Animación de barras de habilidad y aparición de secciones al hacer scroll
    const bars = document.querySelectorAll('.skill-bar-fill');
    const sections = document.querySelectorAll('.resume-section-content');
    sections.forEach(s => s.classList.add('reveal'));

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('visible');
                entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
                    bar.style.width = bar.dataset.level + '%';
                });
                obs.unobserve(entry.target);
            });
        }, { threshold: 0.15 });
        sections.forEach(s => observer.observe(s));
    } else {
        // Respaldo para navegadores antiguos
        sections.forEach(s => s.classList.add('visible'));
        bars.forEach(bar => { bar.style.width = bar.dataset.level + '%'; });
    }
});
