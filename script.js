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
  /* 중원 */
  무사:   { faction:'중원', desc:'강호를 지키는 정파의 검사. 강인한 체력과 정교한 검술로 전장 최전선을 담당한다.', stats:[88,70,72,80], hue:'25',  emoji:'⚔️' },
  자객:   { faction:'중원', desc:'그림자 속에서 단숨에 적의 숨통을 끊는 암살 특화 직업. 기습과 독침이 주무기.', stats:[85,35,98,55], hue:'150', emoji:'🗡️' },
  도사:   { faction:'중원', desc:'하늘의 이치를 읽고 부적과 술법으로 적을 제압하는 도교 술사.', stats:[90,45,60,65], hue:'45',  emoji:'☯️' },
  역사:   { faction:'중원', desc:'타고난 괴력과 두터운 갑옷으로 파티를 지키는 최강의 방어 전사.', stats:[75,95,48,85], hue:'10',  emoji:'💪' },
  사수:   { faction:'중원', desc:'원거리에서 정확한 화살로 적을 제압하는 원거리 딜러. 이동하며 전투가 가능.', stats:[82,40,88,60], hue:'200', emoji:'🏹' },
  군사:   { faction:'중원', desc:'전략과 지휘로 파티 전체를 강화하는 지원 특화 직업. 버프와 디버프의 달인.', stats:[55,65,65,92], hue:'220', emoji:'🛡️' },
  /* 마교 */
  아사신: { faction:'마교', desc:'마교의 그림자 첩자. 환영술과 독으로 적을 혼란에 빠트리는 위험한 암살자.', stats:[92,28,96,50], hue:'280', emoji:'🌑' },
  마기:   { faction:'마교', desc:'금지된 마력을 다루는 술사. 파괴적인 광역기와 저주 마법으로 전장을 불태운다.', stats:[95,30,58,45], hue:'300', emoji:'🔮' },
  예니체리:{ faction:'마교', desc:'마교의 정예 전투부대. 화약 무기와 마력을 결합한 중거리 전투 전문가.', stats:[80,55,80,70], hue:'260', emoji:'⚡' },
};

const classTabs    = document.querySelectorAll('.class-tab');
const className    = document.getElementById('className');
const classFaction = document.getElementById('classFaction');
const classDesc    = document.getElementById('classDesc');
const classStats   = document.getElementById('classStats');
const classImg     = document.getElementById('classImgPlaceholder');
const classSection = document.querySelector('.class-section');

const factionColor = { '중원': '#e8c97a', '마교': '#c47aff' };

function switchClass(key) {
  const d = classData[key];
  if (!d) return;

  classTabs.forEach(t => t.classList.toggle('class-tab--active', t.dataset.class === key));

  className.textContent    = key;
  classDesc.textContent    = d.desc;
  classImg.textContent     = d.emoji;
  classFaction.textContent = d.faction;
  classFaction.style.color = factionColor[d.faction] || 'var(--flame)';

  const fills = classStats.querySelectorAll('.class-stat__fill');
  const vals  = classStats.querySelectorAll('.class-stat__val');
  const barColor = d.faction === '마교'
    ? `linear-gradient(90deg, hsl(${d.hue},70%,55%), hsl(${Number(d.hue)+30},70%,70%))`
    : `linear-gradient(90deg, hsl(${d.hue},80%,50%), hsl(${Number(d.hue)+30},80%,65%))`;

  fills.forEach((f, i) => {
    f.style.background = barColor;
    f.style.setProperty('--p', '0%');
    requestAnimationFrame(() =>
      setTimeout(() => {
        f.style.setProperty('--p', d.stats[i] + '%');
        if (vals[i]) vals[i].textContent = d.stats[i];
      }, 30 + i * 40)
    );
  });

  if (classSection) {
    classSection.style.background =
      `radial-gradient(ellipse 60% 50% at 70% 50%, hsl(${d.hue},50%,15%) 0%, #0d0d16 65%)`;
  }
}

classTabs.forEach(btn => btn.addEventListener('click', () => switchClass(btn.dataset.class)));

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
