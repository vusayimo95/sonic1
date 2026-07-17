const root = document.documentElement;
const body = document.body;
const navToggle = document.querySelector('[data-nav-toggle]');
const navMenu = document.querySelector('[data-nav-menu]');
const footerTitle = document.querySelector('[data-footer-title]');

const setFooterTitle = () => {
  if (!footerTitle) return;
  const compact = window.matchMedia('(max-width: 640px)').matches;
  footerTitle.textContent = compact
    ? footerTitle.dataset.shortTitle || footerTitle.dataset.fullTitle || ''
    : footerTitle.dataset.fullTitle || footerTitle.dataset.shortTitle || '';
};

const setYear = () => {
  document.querySelectorAll('[data-year]').forEach((node) => {
    node.textContent = new Date().getFullYear();
  });
};

const closeMenu = () => {
  if (!navToggle || !navMenu) return;
  body.classList.remove('nav-open');
  navToggle.setAttribute('aria-expanded', 'false');
};

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    body.classList.toggle('nav-open', !expanded);
    navToggle.setAttribute('aria-expanded', String(!expanded));
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 760) {
      closeMenu();
    }
  });
}

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (event) => {
    const targetId = anchor.getAttribute('href');
    if (!targetId || targetId === '#') return;
    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.replaceState(null, '', targetId);
    closeMenu();
  });
});

document.querySelectorAll('[data-faq-question]').forEach((button) => {
  const answer = button.closest('.faq-item')?.querySelector('.faq-answer');
  if (!answer) return;

  button.addEventListener('click', () => {
    const item = button.closest('.faq-item');
    const expanded = button.getAttribute('aria-expanded') === 'true';

    document.querySelectorAll('.faq-item.is-open').forEach((openItem) => {
      if (openItem === item) return;
      openItem.classList.remove('is-open');
      openItem.querySelector('[data-faq-question]')?.setAttribute('aria-expanded', 'false');
      const openAnswer = openItem.querySelector('.faq-answer');
      if (openAnswer) {
        openAnswer.style.maxHeight = '0px';
      }
    });

    button.setAttribute('aria-expanded', String(!expanded));
    item?.classList.toggle('is-open', !expanded);
    answer.style.maxHeight = expanded ? '0px' : `${answer.scrollHeight}px`;
  });
});

window.addEventListener('resize', setFooterTitle);
window.addEventListener('load', setFooterTitle);

root.style.setProperty('--header-height', `${document.querySelector('.site-header')?.offsetHeight || 78}px`);
setFooterTitle();
setYear();
