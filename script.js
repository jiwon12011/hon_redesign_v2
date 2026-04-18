/* ── NAV scroll ── */
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 20);
window.addEventListener('scroll', onScroll, { passive: true });

/* ── Hamburger ── */
const hamburger = document.getElementById('hamburger');
const navDrawer  = document.getElementById('navDrawer');
hamburger?.addEventListener('click', () => {
  const open = navDrawer.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', open);
});
navDrawer?.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => navDrawer.classList.remove('open'))
);

/* ── Hero parallax (scroll) ── */
const heroInk = document.querySelector('.hero__ink');
window.addEventListener('scroll', () => {
  if (!heroInk) return;
  const y = window.scrollY;
  if (y < window.innerHeight) heroInk.style.transform = `translateY(${y * 0.3}px)`;
}, { passive: true });

/* ── Scroll reveal ── */
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('is-visible'), i * 70);
      revealObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
document.querySelectorAll('[data-reveal]').forEach(el => revealObs.observe(el));

/* ── Stat bars animate when visible ── */
const barObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-fill').forEach(fill => {
        const p = fill.style.getPropertyValue('--p');
        fill.style.setProperty('--p', '0%');
        requestAnimationFrame(() =>
          setTimeout(() => fill.style.setProperty('--p', p), 50)
        );
      });
      barObs.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.social-tile').forEach(el => barObs.observe(el));

/* ── News tabs ── */
document.querySelectorAll('.tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(b => b.classList.remove('tab--active'));
    btn.classList.add('tab--active');
    /* filter logic can be extended */
  });
});

/* ── Hall of fame filter pills ── */
document.querySelectorAll('.hall__filters .pill').forEach(pill => {
  pill.addEventListener('click', () => {
    pill.closest('.hall__filters').querySelectorAll('.pill')
      .forEach(p => p.classList.remove('pill--active'));
    pill.classList.add('pill--active');
  });
});

/* ── Search input focus glow ── */
document.querySelectorAll('.search-input').forEach(input => {
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const q = input.value.trim();
      if (q) console.log('검색:', q); /* replace with real search */
    }
  });
});

/* ── Live ticker pause on hover already via CSS ── */

/* ── Smooth nav link highlight on section enter ── */
const sections = document.querySelectorAll('section[id], div[id]');
const navLinks  = document.querySelectorAll('.nav__links a');
const sectionObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${id}` ? 'var(--ink)' : '';
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(s => sectionObs.observe(s));
