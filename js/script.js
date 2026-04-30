// ========================
//  MOBILE MENU TOGGLE
// ========================
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');
});

// Close menu when a link is clicked
navMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navMenu.classList.remove('open'));
});

// ========================
//  HERO SLIDER
// ========================
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let currentSlide = 0;
let heroInterval;

function goToSlide(index) {
  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');
  currentSlide = (index + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}

function startHeroSlider() {
  heroInterval = setInterval(() => goToSlide(currentSlide + 1), 4500);
}

dots.forEach(dot => {
  dot.addEventListener('click', () => {
    clearInterval(heroInterval);
    goToSlide(parseInt(dot.dataset.index));
    startHeroSlider();
  });
});

startHeroSlider();

// ========================
//  PROJECT SLIDER
// ========================
const projTrack = document.getElementById('proj-track');
const projSlides = projTrack.querySelectorAll('.proj-slide');
const pdots = document.querySelectorAll('.pdot');
let currentProj = 0;

function goToProject(index) {
  currentProj = (index + projSlides.length) % projSlides.length;
  projTrack.style.transform = `translateX(-${currentProj * 100}%)`;
  pdots.forEach((d, i) => d.classList.toggle('active', i === currentProj));
}

document.getElementById('proj-prev').addEventListener('click', () => goToProject(currentProj - 1));
document.getElementById('proj-next').addEventListener('click', () => goToProject(currentProj + 1));

pdots.forEach((dot, i) => dot.addEventListener('click', () => goToProject(i)));

// Auto-advance project slider
setInterval(() => goToProject(currentProj + 1), 5000);

// ========================
//  TESTIMONIALS SLIDER
// ========================
const testiTrack = document.getElementById('testi-track');
const tdots = document.querySelectorAll('.tdot');
let currentTesti = 0;

// Determine cards visible based on viewport
function getVisibleCards() {
  if (window.innerWidth < 768) return 1;
  if (window.innerWidth < 1024) return 2;
  return 4;
}

function goToTesti(index) {
  const visible = getVisibleCards();
  const maxIndex = Math.ceil(testiTrack.children.length / visible) - 1;
  currentTesti = Math.max(0, Math.min(index, maxIndex));
  // Each card is 25% width for 4-up, adjust shift by percentage
  const cardWidth = 100 / visible;
  testiTrack.style.transform = `translateX(-${currentTesti * cardWidth * visible}%)`;
  tdots.forEach((d, i) => d.classList.toggle('active', i === currentTesti));
}

tdots.forEach((dot, i) => dot.addEventListener('click', () => goToTesti(i)));

setInterval(() => goToTesti(currentTesti + 1), 6000);

window.addEventListener('resize', () => goToTesti(0));

// ========================
//  NAVBAR SCROLL SHADOW
// ========================
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 10) {
    navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.12)';
  } else {
    navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.08)';
  }
});

// ========================
//  SCROLL ANIMATIONS
// ========================
const animateOnScroll = () => {
  const cards = document.querySelectorAll('.why-card, .service-card, .testi-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(24px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease, box-shadow 0.3s ease';
    observer.observe(card);
  });
};

document.addEventListener('DOMContentLoaded', animateOnScroll);