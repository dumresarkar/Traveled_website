const body = document.body;
const themeToggle = document.getElementById('themeToggle');
const heroSlides = Array.from(document.querySelectorAll('[data-slide]'));
const revealElements = document.querySelectorAll('.reveal');
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxCloseButton = document.querySelector('.lightbox-close');
const heroSection = document.querySelector('.hero-section');
const navLinks = document.querySelectorAll('.navbar .nav-link');

const savedTheme = localStorage.getItem('travelled-series-theme');
if (savedTheme === 'dark') {
  body.dataset.theme = 'dark';
}

themeToggle.addEventListener('click', () => {
  const nextTheme = body.dataset.theme === 'dark' ? 'light' : 'dark';
  body.dataset.theme = nextTheme;
  localStorage.setItem('travelled-series-theme', nextTheme);
});

let slideIndex = 0;
const showSlide = () => {
  heroSlides.forEach((slide, index) => slide.classList.toggle('is-active', index === slideIndex));
};
if (heroSlides.length > 1) {
  setInterval(() => {
    slideIndex = (slideIndex + 1) % heroSlides.length;
    showSlide();
  }, 5500);
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
    }
  });
}, { threshold: 0.18 });

revealElements.forEach((element) => observer.observe(element));

const closeLightbox = () => {
  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  lightboxImage.src = '';
  body.classList.remove('lightbox-open');
};

const openLightbox = (item) => {
  const fullImage = item.getAttribute('data-full');
  const caption = item.getAttribute('data-caption') || item.querySelector('img')?.alt || '';
  lightboxImage.src = fullImage;
  lightboxImage.alt = caption;
  lightboxCaption.textContent = caption;
  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
  body.classList.add('lightbox-open');
};

galleryItems.forEach((item) => {
  item.addEventListener('click', () => openLightbox(item));
});

lightboxCloseButton.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && lightbox.classList.contains('is-open')) {
    closeLightbox();
  }
});

const updateHeroParallax = () => {
  const offset = window.scrollY * 0.14;
  heroSection.style.setProperty('--hero-offset', `${offset}px`);
};
window.addEventListener('scroll', updateHeroParallax, { passive: true });
updateHeroParallax();

const heroVisual = document.querySelector('[data-hero-tilt]');
if (heroSection && heroVisual) {
  heroSection.addEventListener('pointermove', (event) => {
    const bounds = heroSection.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 24;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 24;
    heroSection.style.setProperty('--hero-x', `${x}px`);
    heroSection.style.setProperty('--hero-y', `${y}px`);
  });

  heroSection.addEventListener('pointerleave', () => {
    heroSection.style.setProperty('--hero-x', '0px');
    heroSection.style.setProperty('--hero-y', '0px');
  });
}

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    const navCollapse = document.getElementById('siteNav');
    if (navCollapse.classList.contains('show')) {
      bootstrap.Collapse.getOrCreateInstance(navCollapse).hide();
    }
  });
});

document.querySelector('.contact-form').addEventListener('submit', (event) => {
  event.preventDefault();
  alert('Thanks for reaching out. This form is ready to connect to a backend or email service.');
});
