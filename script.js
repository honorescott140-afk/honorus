// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
  });
});

// ===== TYPING ANIMATION =====
const words = ['Systèmes Embarqués', 'IoT & Connectivité', 'Firmware C/C++', 'RTOS & FreeRTOS', 'Conception PCB', 'Robotique'];
let wIdx = 0, cIdx = 0, deleting = false;
const typingEl = document.getElementById('typing-text');
function type() {
  const word = words[wIdx];
  typingEl.textContent = deleting ? word.substring(0, cIdx--) : word.substring(0, cIdx++);
  if (!deleting && cIdx > word.length) { deleting = true; setTimeout(type, 1800); return; }
  if (deleting && cIdx < 0) { deleting = false; wIdx = (wIdx + 1) % words.length; cIdx = 0; }
  setTimeout(type, deleting ? 50 : 90);
}
type();

// ===== PARTICLES =====
const particlesContainer = document.getElementById('particles');
for (let i = 0; i < 40; i++) {
  const p = document.createElement('div');
  p.className = 'particle';
  p.style.cssText = `left:${Math.random()*100}%;animation-duration:${6+Math.random()*10}s;animation-delay:${Math.random()*8}s;width:${1+Math.random()*2}px;height:${1+Math.random()*2}px;`;
  particlesContainer.appendChild(p);
}

// ===== SKILL BARS ANIMATION =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-fill').forEach(bar => bar.classList.add('animated'));
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skill-category').forEach(el => observer.observe(el));

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.project-card, .about-card, .timeline-item, .skill-category, .contact-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  revealObserver.observe(el);
});

// ===== CONTACT FORM → WHATSAPP =====
const WHATSAPP_NUMBER = '243991926394'; // Numéro sans le +
const form = document.getElementById('contact-form');
const successMsg = document.getElementById('form-success');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const btn = document.getElementById('submit-btn');
  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value.trim();
  const message = document.getElementById('message').value.trim();

  // Validation rapide
  if (!name || !message) return;

  // Animation bouton
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Redirection WhatsApp...';
  btn.disabled = true;

  // Construction du message WhatsApp
  const waText =
    `👋 *Nouveau message depuis votre portfolio*\n\n` +
    `👤 *Nom :* ${name}\n` +
    `📧 *Email :* ${email || 'Non renseigné'}\n` +
    `📌 *Sujet :* ${subject || 'Non renseigné'}\n\n` +
    `💬 *Message :*\n${message}`;

  const waURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`;

  setTimeout(() => {
    // Ouvrir WhatsApp dans un nouvel onglet
    window.open(waURL, '_blank');

    // Reset formulaire
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Envoyer le message';
    btn.disabled = false;
    successMsg.classList.add('show');
    form.reset();
    setTimeout(() => successMsg.classList.remove('show'), 5000);
  }, 800);
});

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 80) current = s.getAttribute('id'); });
  navItems.forEach(a => {
    a.style.color = a.getAttribute('href') === '#'+current ? 'var(--primary)' : '';
  });
});
