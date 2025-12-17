/* ...existing code... */
// Minimal interactive behavior: mobile nav toggle, smooth scroll, simple form validation
const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');

navToggle.addEventListener('click', () => {
  siteNav.classList.toggle('open');
  // Toggles aria-expanded for screen readers
  navToggle.setAttribute('aria-expanded', String(siteNav.classList.contains('open')));
});

// smooth scroll for anchor links
document.querySelectorAll('.site-nav a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const href = a.getAttribute('href');
    if (href.length > 1) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({behavior:'smooth', block:'start'});
      
      // CRITICAL: Close the mobile menu after clicking a link
      if (siteNav.classList.contains('open')) {
        siteNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    }
  });
});

// simple contact form handling
const form = document.getElementById('contactForm');
const formMsg = document.getElementById('formMsg');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();
  if (!name || !email || !message) {
    formMsg.textContent = 'Please complete all fields.';
    return;
  }
  // fake submit
  formMsg.textContent = 'Sending...';
  setTimeout(() => {
    form.reset();
    formMsg.textContent = 'Thanks — we will reply within 48 hours.';
  }, 800);
});

// Set current year in the footer
document.getElementById('year').textContent = new Date().getFullYear();
