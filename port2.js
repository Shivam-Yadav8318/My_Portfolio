// Mobile nav toggle
const menuToggle = document.getElementById('menu-toggle');
const navbar = document.getElementById('navbar');

function toggleNav() {
  navbar.classList.toggle('open');
}

menuToggle.addEventListener('click', toggleNav);
menuToggle.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') toggleNav();
});

// Active link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar a');

function setActiveLink() {
  let current = '';
  const scrollY = window.pageYOffset;

  sections.forEach(sec => {
    const top = sec.offsetTop - 120;
    const height = sec.offsetHeight;
    if (scrollY >= top && scrollY < top + height) current = sec.getAttribute('id');
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href').replace('#', '');
    if (href === current) link.classList.add('active');
  });
}

window.addEventListener('scroll', setActiveLink);

// 3D tilt effect (vanilla)
const tiltElems = document.querySelectorAll('[data-tilt]');
tiltElems.forEach(el => {
  const maxTilt = 10; // degrees
  let rect;

  function handleMove(e) {
    rect = rect || el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = (x / rect.width) * 2 - 1;  // -1 to 1
    const py = (y / rect.height) * 2 - 1; // -1 to 1
    const rx = -py * maxTilt;
    const ry = px * maxTilt;
    el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
  }

  function reset() {
    el.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateZ(0)';
    rect = null;
  }

  el.addEventListener('mousemove', handleMove);
  el.addEventListener('mouseleave', reset);
  el.addEventListener('mouseenter', () => { rect = el.getBoundingClientRect(); });
});

// Parallax subtle on hero
const home = document.getElementById('home');
const homeContent = document.querySelector('.home-content');
const homeImg = document.querySelector('.home-img');

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  if (!home) return;
  const speedContent = 0.08;
  const speedImg = 0.12;
  homeContent.style.transform = `translateY(${scrolled * speedContent}px)`;
  homeImg.style.transform = `translateY(${scrolled * speedImg}px)`;
});

// Contact form validation
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const name = form.name;
    const email = form.email;
    const message = form.message;

    // Name
    if (!name.value.trim()) {
      setError(name, 'Name is required');
      valid = false;
    } else {
      clearError(name);
    }

    // Email
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!email.value.trim()) {
      setError(email, 'Email is required');
      valid = false;
    } else if (!re.test(email.value.trim())) {
      setError(email, 'Enter a valid email');
      valid = false;
    } else {
      clearError(email);
    }

    // Message
    if (!message.value.trim() || message.value.trim().length < 10) {
      setError(message, 'Please write at least 10 characters');
      valid = false;
    } else {
      clearError(message);
    }

    if (valid) {
      alert('Thanks for reaching out! I will get back to you soon.');
      form.reset();
    }
  });

  function setError(field, msg) {
    const small = field.parentElement.querySelector('.error');
    small.textContent = msg;
    field.style.borderColor = '#ff6b6b';
  }

  function clearError(field) {
    const small = field.parentElement.querySelector('.error');
    small.textContent = '';
    field.style.borderColor = 'rgba(255,255,255,0.12)';
  }
}

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();