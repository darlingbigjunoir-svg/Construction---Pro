// script.js

// ===========================
// NAVBAR MOBILE TOGGLE
// ===========================
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        const icon = menuToggle.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-xmark');
        }
    });

    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('open');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-xmark');
            }
        }
    });
}

// ===========================
// ACTIVE NAV LINK
// ===========================
const navLinks = document.querySelectorAll('nav#nav-menu ul li a');
const currentPage = window.location.pathname.split('/').pop() || 'index.html';

navLinks.forEach(link => {
    link.classList.remove('active');
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
        link.classList.add('active');
    }
});

// ===========================
// HERO SLIDER (index.html)
// ===========================
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;
let slideInterval;

function goToSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    currentSlide = (index + slides.length) % slides.length;
    if (slides[currentSlide]) slides[currentSlide].classList.add('active');
    if (dots[currentSlide]) dots[currentSlide].classList.add('active');
}

function nextSlide() {
    goToSlide(currentSlide + 1);
}

function prevSlide() {
    goToSlide(currentSlide - 1);
}

function startSlider() {
    clearInterval(slideInterval);
    if (slides.length > 0) {
        slideInterval = setInterval(nextSlide, 5000);
    }
}

if (slides.length > 0) {
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            goToSlide(parseInt(dot.dataset.index));
            startSlider();
        });
    });

    // Swipe support for hero slider
    let heroTouchStartX = 0;
    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
        heroSlider.addEventListener('touchstart', (e) => {
            heroTouchStartX = e.touches[0].clientX;
        });
        heroSlider.addEventListener('touchend', (e) => {
            const diff = heroTouchStartX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) {
                diff > 0 ? nextSlide() : prevSlide();
                startSlider();
            }
        });
    }

    startSlider();
}

// ===========================
// FEATURED PROJECTS SLIDER
// ===========================
const projTrack = document.getElementById('proj-track');
const projPrevBtn = document.getElementById('proj-prev');
const projNextBtn = document.getElementById('proj-next');
const projSlides = document.querySelectorAll('.proj-slide');
const pdots = document.querySelectorAll('.pdot');
let currentProj = 0;
let projInterval;

function goToProject(index) {
    if (!projTrack || projSlides.length === 0) return;
    currentProj = (index + projSlides.length) % projSlides.length;
    projTrack.style.transform = `translateX(-${currentProj * 100}%)`;
    pdots.forEach(d => d.classList.remove('active'));
    if (pdots[currentProj]) pdots[currentProj].classList.add('active');
}

function startProjSlider() {
    clearInterval(projInterval);
    if (projSlides.length > 0) {
        projInterval = setInterval(() => goToProject(currentProj + 1), 5000);
    }
}

if (projTrack) {
    if (projNextBtn) {
        projNextBtn.addEventListener('click', () => {
            goToProject(currentProj + 1);
            startProjSlider();
        });
    }
    if (projPrevBtn) {
        projPrevBtn.addEventListener('click', () => {
            goToProject(currentProj - 1);
            startProjSlider();
        });
    }

    pdots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            goToProject(i);
            startProjSlider();
        });
    });

    // Swipe support for project slider
    let projTouchStartX = 0;
    projTrack.addEventListener('touchstart', (e) => {
        projTouchStartX = e.touches[0].clientX;
    });
    projTrack.addEventListener('touchend', (e) => {
        const diff = projTouchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
            diff > 0 ? goToProject(currentProj + 1) : goToProject(currentProj - 1);
            startProjSlider();
        }
    });

    startProjSlider();
}

// ===========================
// TESTIMONIALS SLIDER
// ===========================
const testiTrack = document.getElementById('testi-track');
const tdots = document.querySelectorAll('.tdot');
const testiCards = document.querySelectorAll('.testi-card');
let currentTesti = 0;
let testiInterval;

function getVisibleCards() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 4;
}

function goToTesti(index) {
    if (!testiTrack || testiCards.length === 0) return;
    const visible = getVisibleCards();
    const maxIndex = Math.max(0, testiCards.length - visible);
    currentTesti = Math.max(0, Math.min(index, maxIndex));
    const gap = 22;
    const cardWidth = testiCards[0].offsetWidth + gap;
    testiTrack.style.transform = `translateX(-${currentTesti * cardWidth}px)`;
    tdots.forEach(d => d.classList.remove('active'));
    const dotIndex = Math.min(currentTesti, tdots.length - 1);
    if (tdots[dotIndex]) tdots[dotIndex].classList.add('active');
}

function startTesti() {
    clearInterval(testiInterval);
    if (testiTrack) {
        testiInterval = setInterval(() => {
            const visible = getVisibleCards();
            const maxIndex = Math.max(0, testiCards.length - visible);
            goToTesti(currentTesti >= maxIndex ? 0 : currentTesti + 1);
        }, 4500);
    }
}

if (testiTrack) {
    tdots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            goToTesti(i);
            startTesti();
        });
    });

    // Swipe support for testimonials
    let testiTouchStartX = 0;
    testiTrack.addEventListener('touchstart', (e) => {
        testiTouchStartX = e.touches[0].clientX;
    });
    testiTrack.addEventListener('touchend', (e) => {
        const diff = testiTouchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
            diff > 0 ? goToTesti(currentTesti + 1) : goToTesti(currentTesti - 1);
            startTesti();
        }
    });

    window.addEventListener('resize', () => {
        goToTesti(0);
        startTesti();
    });

    startTesti();
}

// ===========================
// BACK TO TOP BUTTON
// ===========================
const topArrow = document.querySelector('.top-arrow');

if (topArrow) {
    topArrow.style.opacity = '0';
    topArrow.style.transition = 'opacity 0.3s ease';
    topArrow.style.pointerEvents = 'none';

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            topArrow.style.opacity = '1';
            topArrow.style.pointerEvents = 'auto';
        } else {
            topArrow.style.opacity = '0';
            topArrow.style.pointerEvents = 'none';
        }
    });

    topArrow.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ===========================
// CONTACT FORM SUBMISSION
// ===========================
const sendBtn = document.querySelector('.send-btn');
const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');

if (sendBtn) {
    sendBtn.addEventListener('click', (e) => {
        e.preventDefault();
        let isValid = true;

        formInputs.forEach(input => {
            input.style.borderColor = '#d0d0d0';
            if (input.hasAttribute('required') || input.value.trim() !== '') return;
            if (input.value.trim() === '') {
                isValid = false;
                input.style.borderColor = '#e24b4a';
            }
        });

        const nameInput = document.querySelector('input[placeholder="Your Name"]');
        const emailInput = document.querySelector('input[placeholder="Your Email"]');
        const messageInput = document.querySelector('textarea');

        let hasError = false;

        if (nameInput && nameInput.value.trim() === '') {
            nameInput.style.borderColor = '#e24b4a';
            hasError = true;
        }
        if (emailInput && emailInput.value.trim() === '') {
            emailInput.style.borderColor = '#e24b4a';
            hasError = true;
        }
        if (messageInput && messageInput.value.trim() === '') {
            messageInput.style.borderColor = '#e24b4a';
            hasError = true;
        }

        if (!hasError) {
            const originalText = sendBtn.textContent;
            sendBtn.textContent = 'Message Sent!';
            sendBtn.style.background = '#2ecc71';
            sendBtn.disabled = true;

            formInputs.forEach(input => input.value = '');

            setTimeout(() => {
                sendBtn.textContent = originalText;
                sendBtn.style.background = '#1a5f7a';
                sendBtn.disabled = false;
            }, 3000);
        }
    });

    // Clear red border on input
    formInputs.forEach(input => {
        input.addEventListener('input', () => {
            input.style.borderColor = '#d0d0d0';
        });
    });
}

// ===========================
// NEWSLETTER SUBSCRIBE
// ===========================
const newsletterBtns = document.querySelectorAll('.newsletter button');

newsletterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const input = btn.previousElementSibling;
        if (input && input.value.trim() !== '' && input.value.includes('@')) {
            const originalText = btn.textContent;
            btn.textContent = 'Subscribed!';
            btn.style.backgroundColor = '#2ecc71';
            input.value = '';
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.backgroundColor = '';
            }, 3000);
        } else if (input) {
            input.style.outline = '2px solid #e24b4a';
            setTimeout(() => input.style.outline = '', 2000);
        }
    });
});

// ===========================
// SMOOTH SCROLL FOR ALL LINKS
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ===========================
// SCROLL REVEAL ANIMATION
// ===========================
const revealElements = document.querySelectorAll(
    '.why-card, .service-card, .service-detail-card, .project-card, .team-card, .testi-card, .about-grid, .section'
);

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    revealObserver.observe(el);
});

// ===========================
// PARTNER LOGOS HOVER PAUSE
// ===========================
const partnerLogos = document.querySelectorAll('.partner-logos img');
partnerLogos.forEach(logo => {
    logo.addEventListener('mouseenter', () => {
        logo.style.filter = 'grayscale(0%)';
        logo.style.opacity = '1';
    });
    logo.addEventListener('mouseleave', () => {
        logo.style.filter = 'grayscale(100%)';
        logo.style.opacity = '0.6';
    });
});