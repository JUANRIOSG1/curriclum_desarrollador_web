// ==========================================================================
// Portfolio / CV - Database-Driven Application
// All data is loaded from localStorage (simulated database)
// To reset data: localStorage.removeItem('portfolio_db')
// ==========================================================================

const DEFAULT_DB = {
    personalInfo: {
        name: "Juan José Ríos Gangas",
        title: "Desarrollador web junior",
        badge: "Abierto a oportunidades",
        about: "Desarrollador web junior con formación en FP y conocimientos en HTML, CSS, JavaScript, React, Node.js, Python y Git. Actualmente amplío mi perfil con cursos de IA y programación, apostando por un sector con mucho futuro. Cuento con proyectos personales propios y ganas de seguir creciendo en un entorno profesional.",
        image: "foto_curriculum.jpeg",
        email: "jjrgthelaw@gmail.com",
        phone: "+34 627 318 092",
        location: "Calle de Bolivia 40, 28016 Madrid, España",
        social: [
            { name: "GitHub", url: "https://github.com/JUANRIOSG1", icon: "gh" },
            { name: "LinkedIn", url: "https://linkedin.com/in/juan-jose-rios-gangas-8aa8a7308", icon: "li" },
            { name: "Instagram", url: "https://instagram.com/juanjose_rios_", icon: "ig" },
        ]
    },
    experience: [],
    // Ejemplo de experiencia futura para rellenar cuando tengas experiencia en programación:
    // experience: [
    //     {
    //         id: 1,
    //         role: "Desarrollador Web Junior",
    //         company: "Empresa de Software",
    //         period: "Enero 2025 - Actualidad",
    //         description: "Desarrollé nuevas funcionalidades front-end con HTML, CSS y JavaScript; colaboré con el equipo para mejorar la accesibilidad, el rendimiento y la experiencia de usuario.",
    //         gradient: "linear-gradient(135deg, #1e1b4b, #3b0764)",
    //         icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 3h18v18H3z"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>`
    //     }
    // ],
    projects: [
        {
            id: 1,
            title: "Portfolio Personal",
            description: "Sitio web portfolio con diseño oscuro moderno, animaciones CSS, modo responsive y contenido gestionado desde base de datos local.",
            technologies: ["HTML", "CSS", "JavaScript", "localStorage"],
            category: "frontend",
            link: "https://juanriosg1.github.io/curriclum_desarrollador_web/",
            github: "https://github.com/JUANRIOSG1/curriclum_desarrollador_web",
            gradient: "linear-gradient(135deg, #581c87, #4c1d95)",
            image: "cv_Juan_Jose_Rios_Gangas.png",
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`
        },
        {
            id: 2,
            title: "Calculadora",
            description: "Calculadora web con diseño moderno y responsive, desarrollada como proyecto personal para practicar JavaScript y CSS.",
            technologies: ["HTML", "CSS", "JavaScript"],
            category: "frontend",
            link: "https://juanriosg1.github.io/calculator/",
            github: "https://github.com/JUANRIOSG1/calculator",
            gradient: "linear-gradient(135deg, #0f172a, #1e293b)",
            image: "calculadora.png",
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`
        }
    ],
    studies: [
        {
            id: 1,
            degree: "FP Superior en Desarrollo de Aplicaciones Web (DAW)",
            institution: "ILerna Formación",
            year: "Julio 2023 - Julio 2025",
            description: "Formación profesional de grado superior en desarrollo de aplicaciones web, abarcando frontend, backend, bases de datos y despliegue de aplicaciones.",
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 2.5 3 6 3s6-1 6-3v-5"/></svg>`  
        },
        {
            id: 2,
            degree: "Bachillerato en Humanidades",
            institution: "Colegio Benavente",
            year: "Septiembre 2019 - Julio 2022",
            description: "Bachillerato en la modalidad de Humanidades, proporcionando una base sólida en comunicación, historia y lenguas.", 
            icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 2.5 3 6 3s6-1 6-3v-5"/></svg>`
        }
    ],
    skills: [
        
        { name: "HTML5", icon: "🌐" },
        { name: "CSS3", icon: "🎨" },
        { name: "JavaScript", icon: "🟨" },
        { name: "Java", icon: "☕" },
        { name: "MySQL", icon: "🗄️" },
        { name: "Git", icon: "🔀" }
    ]
};

// --- Database Module ---
const DB = {
    data: null,

    init() {
        const saved = localStorage.getItem('portfolio_db');
        if (saved) {
            try {
                this.data = JSON.parse(saved);
                return;
            } catch (e) {
                console.warn("DB corrupta, cargando datos por defecto");
            }
        }
        this.seed();
    },

    seed() {
        this.data = JSON.parse(JSON.stringify(DEFAULT_DB));
        localStorage.setItem('portfolio_db', JSON.stringify(this.data));
    },

    reset() {
        localStorage.removeItem('portfolio_db');
        this.seed();
        renderAll();
        showToast("Base de datos restaurada a valores por defecto");
    },

    get(ref) {
        return ref.split('.').reduce((obj, key) => obj?.[key], this.data);
    }
};

// --- State ---
const state = {
    activeFilter: "all"
};

// --- DOM Cache ---
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

const DOM = {
    pageTitle: $('#page-title'),
    logoName: $('#logo-name'),
    profileImage: $('#profile-image'),
    aboutBadge: $('#about-badge'),
    aboutName: $('#about-name'),
    aboutTitle: $('#about-title'),
    aboutDescription: $('#about-description'),
    socialLinksContainer: $('#social-links-container'),
    experienceTimeline: $('#experience-timeline'),
    projectsGrid: $('#projects-grid'),
    projectFilterTabs: $('#project-filter-tabs'),
    projectsSubtitle: $('#projects-subtitle'),
    studiesTimeline: $('#studies-timeline'),
    skillsContainer: $('#skills-container'),
    contactInfo: $('#contact-info'),
    footerLogo: $('#footer-logo'),
    footerTagline: $('#footer-tagline'),
    footerContact: $('#footer-contact'),
    footerCopy: $('#footer-copy'),
    toastContainer: $('#toast-container'),
    mobileMenuBtn: $('#btn-mobile-menu'),
    mobileNavMenu: $('#mobile-nav-menu')
};

// --- Render Functions ---

function renderPersonalInfo() {
    const info = DB.get('personalInfo');
    if (!info) return;

    const profileSrc = info.image || 'foto_curriculum.jpeg';
    DOM.pageTitle.textContent = `${info.name} | Desarrollador Web`;
    DOM.logoName.innerHTML = `<span class="text-accent">${info.name}</span>`;
    DOM.profileImage.src = profileSrc;
    DOM.profileImage.alt = `Foto de ${info.name}`;
    DOM.aboutBadge.textContent = info.badge;
    DOM.aboutName.textContent = info.name;
    DOM.aboutTitle.textContent = info.title;
    DOM.aboutDescription.textContent = info.about;

    DOM.socialLinksContainer.innerHTML = info.social.map(s => {
        let path;
        if (s.icon === 'gh') path = '<path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>';
        else if (s.icon === 'li') path = '<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>';
        else if (s.icon === 'ig') path = '<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>';
        else if (s.icon === 'fb') path = '<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>';
        return `<a href="${s.url}" target="_blank" rel="noopener noreferrer" title="${s.name}"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">${path}</svg></a>`;
    }).join('');

    DOM.footerLogo.innerHTML = `<span class="text-accent">${info.name}</span>`;
    DOM.footerTagline.textContent = info.title;
    DOM.footerContact.innerHTML = `
        <p>${info.email}</p>
        <p>${info.phone}</p>
        <p>${info.location}</p>
    `;
    DOM.footerCopy.textContent = `© ${new Date().getFullYear()} ${info.name}. Todos los derechos reservados.`;

    const contactHtml = `
        <div class="contact-item">
            <svg class="contact-item-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            <div><div class="contact-item-label">Email</div><div class="contact-item-text">${info.email}</div></div>
        </div>
        <div class="contact-item">
            <svg class="contact-item-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            <div><div class="contact-item-label">Teléfono</div><div class="contact-item-text">${info.phone}</div></div>
        </div>
        <div class="contact-item">
            <svg class="contact-item-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <div><div class="contact-item-label">Ubicación</div><div class="contact-item-text">${info.location}</div></div>
        </div>
    `;
    DOM.contactInfo.innerHTML = contactHtml;
}

function renderProjects() {
    const projects = DB.get('projects') || [];
    const categories = [...new Set(projects.map(p => p.category))];

    const filterHtml = categories.map(cat => `
        <button class="filter-tab ${state.activeFilter === cat ? 'active' : ''}" data-filter="${cat}">${cat.charAt(0).toUpperCase() + cat.slice(1)}</button>
    `).join('');

    DOM.projectFilterTabs.innerHTML = `
        <button class="filter-tab ${state.activeFilter === 'all' ? 'active' : ''}" data-filter="all">Todos</button>
        ${filterHtml}
    `;

    DOM.projectFilterTabs.querySelectorAll('.filter-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            DOM.projectFilterTabs.querySelectorAll('.filter-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            state.activeFilter = tab.dataset.filter;
            renderProjectsGrid();
        });
    });

    renderProjectsGrid();
}

function renderProjectsGrid() {
    const projects = DB.get('projects') || [];
    const filtered = state.activeFilter === 'all'
        ? projects
        : projects.filter(p => p.category === state.activeFilter);

    DOM.projectsGrid.innerHTML = '';

    if (filtered.length === 0) {
        DOM.projectsGrid.innerHTML = `
            <div class="loading-spinner-container">
                <p style="font-weight: 600;">No se encontraron proyectos en esta categoría</p>
            </div>
        `;
        return;
    }

    filtered.forEach(proj => {
        const card = document.createElement('article');
        card.className = 'project-card';
        card.innerHTML = `
            <div class="project-img-wrapper">
                <div class="project-img-bg" style="background: ${proj.gradient};">
                    ${proj.image
                        ? `<img class="project-img" src="${proj.image}" alt="Captura de ${proj.title}">`
                        : `<div class="project-img-icon">${proj.icon}</div>`
                    }
                </div>
            </div>
            <div class="project-info">
                <h3 class="project-title">${proj.title}</h3>
                <p class="project-desc">${proj.description}</p>
                <div class="project-techs">
                    ${proj.technologies.map(t => `<span class="project-tech-tag">${t}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${proj.link}" target="_blank" rel="noopener noreferrer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                        Demo
                    </a>
                    <a href="${proj.github}" target="_blank" rel="noopener noreferrer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
                        Código
                    </a>
                </div>
            </div>
        `;
        DOM.projectsGrid.appendChild(card);
    });
}

function renderStudies() {
    const studies = DB.get('studies') || [];

    DOM.studiesTimeline.innerHTML = studies.map(s => `
        <div class="study-card">
            <div class="study-dot"></div>
            <div class="study-icon">${s.icon}</div>
            <div class="study-content">
                <h3 class="study-degree">${s.degree}</h3>
                <p class="study-institution">${s.institution}</p>
                <p class="study-year">${s.year}</p>
                <p class="study-desc">${s.description}</p>
            </div>
        </div>
    `).join('');
}

function renderSkills() {
    const skills = DB.get('skills') || [];
    DOM.skillsContainer.innerHTML = skills.map(s => `
        <div class="skill-card">
            <span class="skill-icon">${s.icon}</span>
            <span class="skill-name">${s.name}</span>
        </div>
    `).join('');
}

function renderExperience() {
    const exp = DB.get('experience') || [];

    DOM.experienceTimeline.innerHTML = exp.map(e => `
        <div class="experience-card">
            <div class="experience-dot"></div>
            <div class="experience-icon-bg" style="background: ${e.gradient};">
                ${e.icon}
            </div>
            <div class="experience-content">
                <h3 class="experience-role">${e.role}</h3>
                <p class="experience-company">${e.company}</p>
                <p class="experience-period">${e.period}</p>
                <p class="experience-desc">${e.description}</p>
            </div>
        </div>
    `).join('');
}

function renderAll() {
    renderPersonalInfo();
    renderProjects();
    renderStudies();
    renderSkills();
}

// --- Toast ---
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    let iconSvg = '';
    if (type === 'success') iconSvg = `<svg class="toast-icon success" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`;
    else if (type === 'warning') iconSvg = `<svg class="toast-icon warning" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>`;
    else if (type === 'danger') iconSvg = `<svg class="toast-icon danger" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`;
    toast.innerHTML = `${iconSvg}<span class="toast-message">${message}</span>`;
    DOM.toastContainer.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(20px)';
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

// --- Mobile Menu ---
DOM.mobileMenuBtn.addEventListener('click', () => {
    DOM.mobileNavMenu.classList.toggle('hidden');
});

DOM.mobileNavMenu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => DOM.mobileNavMenu.classList.add('hidden'));
});

// --- Expose DB reset to console ---
window.resetDB = DB.reset.bind(DB);

// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
    DB.init();
    renderAll();
    showToast("Datos cargados desde la base de datos", "success");
    console.log("💾 Portfolio DB cargada. Para restablecer datos: resetDB()");
});
