// ===== YEAR =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// ===== MOBILE MENU =====
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobile-menu');
burger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ===== TYPED EFFECT =====
const phrases = [
  'Studente di Informatica',
  'Web Developer',
  'Problem Solver',
  'Open Source Enthusiast',
];
let phraseIdx = 0, charIdx = 0, deleting = false;
const typedEl = document.getElementById('typed');

function tick() {
  const current = phrases[phraseIdx];
  if (!deleting) {
    typedEl.textContent = current.slice(0, ++charIdx);
    if (charIdx === current.length) {
      setTimeout(() => { deleting = true; tick(); }, 1800);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, --charIdx);
    if (charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
    }
  }
  setTimeout(tick, deleting ? 50 : 80);
}
tick();

// ===== FADE IN ON SCROLL =====
const observer = new IntersectionObserver(
  entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
  { threshold: 0.12 }
);
document.querySelectorAll(
  '.about-grid, .skill-category, .project-card, .contact-card, .contact-form, .about-card'
).forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// ===== CONTACT FORM =====
document.getElementById('contact-form').addEventListener('submit', function (e) {
  e.preventDefault();
  const note = document.getElementById('form-note');
  note.textContent = '';
  note.className = 'form-note';

  const name = this.name.value.trim();
  const email = this.email.value.trim();
  const message = this.message.value.trim();

  if (!name || !email || !message) {
    note.textContent = 'Compila tutti i campi.';
    note.classList.add('error');
    return;
  }

  // Apre il client email con i dati precompilati
  const subject = encodeURIComponent(`[Portfolio] Messaggio da ${name}`);
  const body = encodeURIComponent(`Nome: ${name}\nEmail: ${email}\n\n${message}`);
  window.location.href = `mailto:gpeluso03@gmail.com?subject=${subject}&body=${body}`;

  note.textContent = '✓ Apertura client email in corso…';
  this.reset();
});
