/* ===== ANNO FOOTER ===== */
document.querySelectorAll('#year').forEach(el => el.textContent = new Date().getFullYear());

/* ===== CUSTOM CURSOR ===== */
const dot  = Object.assign(document.createElement('div'), { className: 'cursor-dot' });
const ring = Object.assign(document.createElement('div'), { className: 'cursor-ring' });
document.body.append(dot, ring);

let mX = window.innerWidth / 2, mY = window.innerHeight / 2;
let rX = mX, rY = mY;

document.addEventListener('mousemove', e => {
  mX = e.clientX; mY = e.clientY;
  dot.style.left  = mX + 'px';
  dot.style.top   = mY + 'px';
});

(function animateRing() {
  rX += (mX - rX) * .1;
  rY += (mY - rY) * .1;
  ring.style.left = rX + 'px';
  ring.style.top  = rY + 'px';
  requestAnimationFrame(animateRing);
})();

document.querySelectorAll('a, button, .tilt, .skill-card, .contatto-card').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});
document.addEventListener('mousedown', () => document.body.classList.add('cursor-click'));
document.addEventListener('mouseup',   () => document.body.classList.remove('cursor-click'));

/* ===== SCROLL PROGRESS BAR ===== */
const bar = Object.assign(document.createElement('div'), { className: 'scroll-progress' });
document.body.prepend(bar);

window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
  bar.style.width = Math.min(pct, 100) + '%';
}, { passive: true });

/* ===== HAMBURGER ===== */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', open);
  });
  document.addEventListener('click', e => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
  navLinks.querySelectorAll('a').forEach(l => l.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  }));
}

/* ===== NAVBAR SHADOW ===== */
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  header.style.boxShadow = window.scrollY > 10 ? '0 4px 30px rgba(0,0,0,.6)' : 'none';
}, { passive: true });

/* ===== CANVAS PARTICLES ===== */
const canvas = document.createElement('canvas');
Object.assign(canvas.style, {
  position:'fixed', top:'0', left:'0', width:'100%', height:'100%',
  pointerEvents:'none', zIndex:'0', opacity:'.55',
});
document.body.insertBefore(canvas, document.body.firstChild);
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas, { passive: true });

const PARTICLE_COUNT = 55;
const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
  x:   Math.random() * canvas.width,
  y:   Math.random() * canvas.height,
  r:   Math.random() * 1.4 + .4,
  vx:  (Math.random() - .5) * .28,
  vy:  (Math.random() - .5) * .28,
  alpha: Math.random() * .5 + .15,
  hue: 200 + Math.random() * 60,
}));

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw connections
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < 130) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        const alpha = (1 - dist / 130) * .15;
        ctx.strokeStyle = `rgba(59,130,246,${alpha})`;
        ctx.lineWidth = .6;
        ctx.stroke();
      }
    }
  }

  // Draw particles
  particles.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0) p.x = canvas.width;
    if (p.x > canvas.width) p.x = 0;
    if (p.y < 0) p.y = canvas.height;
    if (p.y > canvas.height) p.y = 0;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${p.hue},80%,65%,${p.alpha})`;
    ctx.fill();
  });

  requestAnimationFrame(drawParticles);
}
drawParticles();

/* ===== SCROLL REVEAL ===== */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const delay = parseInt(e.target.dataset.delay || '0');
    setTimeout(() => e.target.classList.add('visible'), delay);
    observer.unobserve(e.target);
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

/* ===== 3D TILT ===== */
document.querySelectorAll('.tilt').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r   = card.getBoundingClientRect();
    const dx  = (e.clientX - r.left  - r.width  / 2) / (r.width  / 2);
    const dy  = (e.clientY - r.top   - r.height / 2) / (r.height / 2);
    card.style.transform = `perspective(900px) rotateX(${-dy * 7}deg) rotateY(${dx * 7}deg) scale(1.025)`;
    card.style.boxShadow = `${-dx * 12}px ${-dy * 12}px 40px rgba(59,130,246,.15), 0 20px 60px rgba(0,0,0,.5)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform  = 'perspective(900px) rotateX(0) rotateY(0) scale(1)';
    card.style.boxShadow  = '';
  });
});

/* ===== MAGNETIC BUTTONS ===== */
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r  = btn.getBoundingClientRect();
    const dx = (e.clientX - r.left - r.width  / 2) * .28;
    const dy = (e.clientY - r.top  - r.height / 2) * .28;
    btn.style.transform = `translate(${dx}px, ${dy}px) translateY(-2px)`;
  });
  btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });

  // Ripple
  btn.addEventListener('click', e => {
    const r    = btn.getBoundingClientRect();
    const size = Math.max(r.width, r.height) * 2.2;
    const s    = document.createElement('span');
    Object.assign(s.style, {
      position: 'absolute', borderRadius: '50%', pointerEvents: 'none',
      width: size + 'px', height: size + 'px',
      left: (e.clientX - r.left - size/2) + 'px',
      top:  (e.clientY - r.top  - size/2) + 'px',
      background: 'rgba(255,255,255,.2)',
      transform: 'scale(0)', animation: '_ripple .55s ease-out forwards',
    });
    btn.appendChild(s);
    s.addEventListener('animationend', () => s.remove());
  });
});

/* inject ripple keyframe */
if (!document.getElementById('_rk')) {
  const st = document.createElement('style');
  st.id = '_rk';
  st.textContent = '@keyframes _ripple { to { transform:scale(1); opacity:0; } }';
  document.head.appendChild(st);
}

/* ===== GRADIENT TEXT on hero name ===== */
document.querySelectorAll('.hero-name, .page-hero h1').forEach(el => {
  el.classList.add('gradient-text');
});

/* ===== CURSOR ORB follows mouse ===== */
const orb2 = document.createElement('div');
Object.assign(orb2.style, {
  position:'fixed', width:'450px', height:'450px', borderRadius:'50%',
  background:'radial-gradient(circle, rgba(59,130,246,.055) 0%, transparent 70%)',
  pointerEvents:'none', zIndex:'0',
  transition:'left .9s cubic-bezier(.16,1,.3,1), top .9s cubic-bezier(.16,1,.3,1)',
  transform:'translate(-50%,-50%)',
});
document.body.appendChild(orb2);
document.addEventListener('mousemove', e => {
  orb2.style.left = e.clientX + 'px';
  orb2.style.top  = e.clientY + 'px';
}, { passive: true });
