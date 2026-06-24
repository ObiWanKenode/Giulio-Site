// ===== ANNO FOOTER =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== HAMBURGER =====
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
});

document.addEventListener('click', (e) => {
  if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// ===== NAVBAR SHADOW ON SCROLL =====
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  header.style.boxShadow = window.scrollY > 10
    ? '0 4px 24px rgba(0,0,0,0.5)'
    : 'none';
}, { passive: true });

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const delay = el.dataset.delay || 0;
    setTimeout(() => el.classList.add('visible'), delay);
    revealObserver.unobserve(el);
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===== 3D CARD TILT =====
document.querySelectorAll('.tilt').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const cx   = rect.left + rect.width  / 2;
    const cy   = rect.top  + rect.height / 2;
    const dx   = (e.clientX - cx) / (rect.width  / 2);
    const dy   = (e.clientY - cy) / (rect.height / 2);
    const rotX =  dy * -8;
    const rotY =  dx *  8;
    card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) scale(1)';
  });
});

// ===== BUTTON RIPPLE =====
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const rect   = btn.getBoundingClientRect();
    const size   = Math.max(rect.width, rect.height) * 2;
    const x      = e.clientX - rect.left - size / 2;
    const y      = e.clientY - rect.top  - size / 2;

    const ripple = document.createElement('span');
    Object.assign(ripple.style, {
      position:     'absolute',
      width:        size + 'px',
      height:       size + 'px',
      left:         x + 'px',
      top:          y + 'px',
      borderRadius: '50%',
      background:   'rgba(255,255,255,0.25)',
      transform:    'scale(0)',
      pointerEvents:'none',
      animation:    'ripple .55s ease-out forwards',
    });

    if (getComputedStyle(btn).position === 'static') btn.style.position = 'relative';
    btn.style.overflow = 'hidden';
    btn.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  });
});

// Inject ripple keyframe once
if (!document.getElementById('ripple-style')) {
  const s = document.createElement('style');
  s.id = 'ripple-style';
  s.textContent = '@keyframes ripple { to { transform: scale(1); opacity: 0; } }';
  document.head.appendChild(s);
}

// ===== GRADIENT ORB FOLLOWS CURSOR (subtle) =====
const orb = document.createElement('div');
Object.assign(orb.style, {
  position:     'fixed',
  width:        '500px',
  height:       '500px',
  borderRadius: '50%',
  background:   'radial-gradient(circle, rgba(10,132,255,.06) 0%, transparent 70%)',
  pointerEvents:'none',
  zIndex:       '0',
  transition:   'left .8s ease, top .8s ease',
  transform:    'translate(-50%, -50%)',
});
document.body.appendChild(orb);

document.addEventListener('mousemove', (e) => {
  orb.style.left = e.clientX + 'px';
  orb.style.top  = e.clientY + 'px';
}, { passive: true });
