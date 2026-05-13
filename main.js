// ─── CUSTOM CURSOR ───
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top  = e.clientY + 'px';
});
document.querySelectorAll('a, button, .stat-card, .skill-tag').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('big'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('big'));
});

// ─── SCROLL REVEAL ───
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 120);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(el => observer.observe(el));

// ─── ANIMATED COUNTERS ───
function animateCount(el, target) {
  if (el.dataset.special) return;
  let current = 0;
  const step = Math.ceil(target / 40);
  const timer = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current;
    if (current >= target) clearInterval(timer);
  }, 30);
}
const countObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('[data-count]').forEach(el => {
        const target = parseInt(el.dataset.count);
        if (!isNaN(target)) animateCount(el, target);
      });
      countObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stats-grid').forEach(el => countObserver.observe(el));

// ─── PARALLAX HERO CIRCLES ───
const c1 = document.querySelector('.hero-bg-circle.c1');
const c2 = document.querySelector('.hero-bg-circle.c2');
document.addEventListener('mousemove', e => {
  const x = (e.clientX / window.innerWidth - .5) * 20;
  const y = (e.clientY / window.innerHeight - .5) * 20;
  c1.style.transform = `translate(${x}px, ${y}px)`;
  c2.style.transform = `translate(${-x * .6}px, ${-y * .6}px)`;
});
