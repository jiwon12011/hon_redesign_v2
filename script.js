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

/* ── Class selector ── */
const classData = {
  검귀: {
    desc: '혼을 담은 검으로 적을 베는 근거리 특화 딜러. 빠른 콤보와 강력한 단일 타격이 특기.',
    stats: [92, 55, 78, 60],
    hue: '0',
    emoji: '⚔️',
  },
  독왕: {
    desc: '맹독으로 적을 서서히 무너뜨리는 기민한 암살자. 지속 피해와 회피 특기.',
    stats: [70, 45, 95, 75],
    hue: '120',
    emoji: '☠️',
  },
  화령: {
    desc: '불꽃 혼령을 소환해 광역 피해를 입히는 술사. 강력한 범위기로 전장을 지배.',
    stats: [88, 40, 65, 50],
    hue: '30',
    emoji: '🔥',
  },
  빙선: {
    desc: '얼음으로 적을 봉인하는 강력한 제어 특화 지원가. 파티 시너지 최고.',
    stats: [60, 80, 50, 90],
    hue: '200',
    emoji: '❄️',
  },
};

const classTabs  = document.querySelectorAll('.class-tab');
const className  = document.getElementById('className');
const classDesc  = document.getElementById('classDesc');
const classStats = document.getElementById('classStats');
const classImg   = document.getElementById('classImgPlaceholder');
const classSection = document.querySelector('.class-section');

function switchClass(key) {
  const d = classData[key];
  if (!d) return;

  // tab UI
  classTabs.forEach(t => t.classList.toggle('class-tab--active', t.dataset.class === key));

  // text
  className.textContent = key;
  classDesc.textContent = d.desc;
  classImg.textContent  = d.emoji;

  // stats animate
  const fills = classStats.querySelectorAll('.class-stat__fill');
  const vals  = classStats.querySelectorAll('.class-stat__val');
  fills.forEach((f, i) => {
    f.style.setProperty('--p', '0%');
    requestAnimationFrame(() =>
      setTimeout(() => {
        f.style.setProperty('--p', d.stats[i] + '%');
        if (vals[i]) vals[i].textContent = d.stats[i];
      }, 30 + i * 40)
    );
  });

  // section ambient glow
  if (classSection) {
    classSection.style.setProperty('--class-hue', d.hue);
    classSection.style.background = `radial-gradient(ellipse 60% 50% at 70% 50%, hsl(${d.hue},60%,18%) 0%, #0d0d16 60%)`;
  }
  // stat bar color
  fills.forEach(f => {
    f.style.background = `linear-gradient(90deg, hsl(${d.hue},80%,50%), hsl(${Number(d.hue)+30},80%,65%))`;
  });
}

classTabs.forEach(btn => {
  btn.addEventListener('click', () => switchClass(btn.dataset.class));
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
