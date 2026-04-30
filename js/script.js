// script.js

// ===========================
// NAVBAR MOBILE TOGGLE
// ===========================
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('open');
        }
    });
}

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
    if (slides[index]) slides[index].classList.add('active');
    if (dots[index]) dots[index].classList.add('active');
    currentSlide = index;
}

function nextSlide() {
    goToSlide((currentSlide + 1) % slides.length);
}

function startSlider() {
    if (slides.length > 0) {
        slideInterval = setInterval(nextSlide, 4000);
    }
}

if (slides.length > 0) {
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            clearInterval(slideInterval);
            goToSlide(parseInt(dot.dataset.index));
            startSlider();
        });
    });
    startSlider();
}

// ===========================
// FEATURED PROJECTS SLIDER
// ===========================
const projTrack = document.getElementById('proj-track');
const projPrev = document.getElementById('proj-prev');
const projNext = document.getElementById('proj-next');
const projSlides = document.querySelectorAll('.proj-slide');
const pdots = document.querySelectorAll('.pdot');
let currentProj = 0;

function goToProject(index) {
    if (!projTrack) return;
    currentProj = index;
    projTrack.style.transform = `translateX(-${currentProj * 100}%)`;
    pdots.forEach(d => d.classList.remove('active'));
    if (pdots[currentProj]) pdots[currentProj].classList.add('active');
}

if (projTrack) {
    if (projNext) {
        projNext.addEventListener('click', () => {
            goToProject((currentProj + 1) % projSlides.length);
        });
    }
    if (projPrev) {
        projPrev.addEventListener('click', () => {
            goToProject((currentProj - 1 + projSlides.length) % projSlides.length);
        });
    }
    pdots.forEach((dot, i) => {
        dot.addEventListener('click', () => goToProject(i));
    });
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
    if (!testiTrack) return;
    const visible = getVisibleCards();
    const maxIndex = Math.max(0, testiCards.length - visible);
    currentTesti = Math.min(index, maxIndex);
    const cardWidth = testiCards[0] ? testiCards[0].offsetWidth + 22 : 0;
    testiTrack.style.transform = `translateX(-${currentTesti * cardWidth}px)`;
    tdots.forEach(d => d.classList.remove('active'));
    if (tdots[currentTesti]) tdots[currentTesti].classList.add('active');
}

function startTesti() {
    if (testiTrack) {
        testiInterval = setInterval(() => {
            const visible = getVisibleCards();
            const maxIndex = Math.max(0, testiCards.length - visible);
            goToTesti(currentTesti >= maxIndex ? 0 : currentTesti + 1);
        }, 4000);
    }
}

if (testiTrack) {
    tdots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            clearInterval(testiInterval);
            goToTesti(i);
            startTesti();
        });
    });
    startTesti();
    window.addEventListener('resize', () => goToTesti(0));
}

// ===========================
// BACK TO TOP VISIBILITY
// ===========================
const topArrow = document.querySelector('.top-arrow');

if (topArrow) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            topArrow.style.opacity = '1';
            topArrow.style.pointerEvents = 'auto';
        } else {
            topArrow.style.opacity = '0';
            topArrow.style.pointerEvents = 'none';
        }
    });
    topArrow.style.opacity = '0';
    topArrow.style.transition = 'opacity 0.3s ease';
    topArrow.style.pointerEvents = 'none';
}

// ===========================
// ACTIVE NAV LINK
// ===========================
const navLinks = document.querySelectorAll('nav#nav-menu ul li a');
const currentPage = window.location.pathname.split('/').pop();

navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    }
});