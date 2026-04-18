/* ── NAV scroll state ── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ── Hero parallax ── */
const heroParallax = document.getElementById('heroParallax');
window.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 24;
  const y = (e.clientY / window.innerHeight - 0.5) * 16;
  heroParallax.style.transform = `translate(${x}px, ${y}px)`;
}, { passive: true });

/* ── Scroll parallax for hero layers ── */
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  if (heroParallax && scrollY < window.innerHeight) {
    heroParallax.style.transform = `translateY(${scrollY * 0.4}px)`;
  }
}, { passive: true });

/* ── Reveal on scroll ── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('is-visible'), i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('[data-reveal]').forEach(el => revealObserver.observe(el));

/* ── Countdown timer ── */
function updateCountdown() {
  const target = new Date();
  target.setDate(target.getDate() + 7);
  target.setHours(23, 59, 59, 0);

  const now = new Date();
  const diff = target - now;

  if (diff <= 0) return;

  const days  = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins  = Math.floor((diff % 3600000)  / 60000);

  const pad = n => String(n).padStart(2, '0');
  document.getElementById('cd-days').textContent  = pad(days);
  document.getElementById('cd-hours').textContent = pad(hours);
  document.getElementById('cd-mins').textContent  = pad(mins);
}
updateCountdown();
setInterval(updateCountdown, 30000);

/* ── Online count ticker ── */
(function animateCount() {
  const el = document.getElementById('onlineCount');
  if (!el) return;
  const base = 24381;
  setInterval(() => {
    const delta = Math.floor(Math.random() * 40 - 20);
    const newVal = Math.max(20000, base + delta);
    el.textContent = newVal.toLocaleString('ko-KR');
  }, 3000);
})();

/* ── Character switcher ── */
const chars = {
  검귀: { atk: '92%', def: '55%', spd: '78%', desc: '혼을 담은 검으로 적을 베는 근거리 특화 딜러' },
  독왕: { atk: '70%', def: '45%', spd: '95%', desc: '맹독으로 적을 서서히 무너뜨리는 기민한 암살자' },
  화령: { atk: '88%', def: '40%', spd: '65%', desc: '불꽃 혼령을 소환해 광역 피해를 입히는 술사' },
  빙선: { atk: '60%', def: '80%', spd: '50%', desc: '얼음으로 적을 봉인하는 강력한 제어 특화 지원가' },
};

document.querySelectorAll('.char-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.char-btn').forEach(b => b.classList.remove('char-btn--active'));
    btn.classList.add('char-btn--active');

    const key = btn.dataset.char;
    const data = chars[key];
    if (!data) return;

    const card = btn.closest('.bento__card--character');
    const fills = card.querySelectorAll('.stat__fill');
    const vals  = [data.atk, data.def, data.spd];
    fills.forEach((fill, i) => {
      fill.style.setProperty('--pct', '0%');
      requestAnimationFrame(() => {
        setTimeout(() => fill.style.setProperty('--pct', vals[i]), 30);
      });
    });

    card.querySelector('.character__name').textContent = key;
    card.querySelector('.character__desc').textContent = data.desc;
  });
});

/* ── Hamburger (mobile) ── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav__links');
hamburger?.addEventListener('click', () => {
  const open = navLinks.style.display === 'flex';
  navLinks.style.display = open ? 'none' : 'flex';
  navLinks.style.flexDirection = 'column';
  navLinks.style.position = 'absolute';
  navLinks.style.top = '64px';
  navLinks.style.left = '0';
  navLinks.style.right = '0';
  navLinks.style.background = 'var(--ink-1)';
  navLinks.style.padding = '1.5rem';
  navLinks.style.gap = '1.25rem';
  navLinks.style.borderBottom = '1px solid var(--border)';
});
