/* ─────────────────────────────────────────────
   DGS CV site — main.js
   print buttons · scroll-spy nav · reveal · year
───────────────────────────────────────────── */

// ── Print / Save as PDF ─────────────────────
document.querySelectorAll('[data-print]').forEach(btn => {
  btn.addEventListener('click', () => window.print());
});

// ── Footer year ─────────────────────────────
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ── Reduced-motion flag ─────────────────────
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ── Reveal sections on scroll ───────────────
const revealTargets = document.querySelectorAll('.reveal');
if (reduced || !('IntersectionObserver' in window)) {
  revealTargets.forEach(el => el.classList.add('in'));
} else {
  const revealIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        revealIO.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  revealTargets.forEach(el => revealIO.observe(el));
}

// ── Scroll-spy: highlight the active nav link ─
const navLinks = Array.from(document.querySelectorAll('.nav a[href^="#"]'));
const spySections = navLinks
  .map(a => document.querySelector(a.getAttribute('href')))
  .filter(Boolean);

function setActive(id) {
  navLinks.forEach(a =>
    a.classList.toggle('active', a.getAttribute('href') === '#' + id)
  );
}

if ('IntersectionObserver' in window && spySections.length) {
  const spyIO = new IntersectionObserver(entries => {
    // pick the section closest to the top of the viewport
    const visible = entries
      .filter(e => e.isIntersecting)
      .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
    if (visible.length) setActive(visible[0].target.id);
  }, { rootMargin: '-20% 0px -65% 0px' });

  spySections.forEach(s => spyIO.observe(s));
}
