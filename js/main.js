// ============================================================================
// ANIMATIONS & SCROLL INTERACTIONS
// ============================================================================

function updateNavClipPath() {
  const nav = document.getElementById('main-nav');
  if (!nav) return;

  const rect = nav.getBoundingClientRect();
  const progress = Math.max(0, Math.min(1, 1 - (rect.top - 10) / (window.innerHeight * 0.90)));
  nav.style.clipPath = `inset(0 ${50 - (progress * 50)}% 0 ${50 - (progress * 50)}%)`;
}

function updateHomeOpacity() {
  const home = document.getElementById('home');
  if (!home) return;

  const rect = home.getBoundingClientRect();
  const midpoint = home.offsetHeight / 2;
  const scrollPast = Math.max(0, -rect.top - midpoint);
  home.style.opacity = Math.max(0, 1 - (scrollPast / (midpoint * 0.25)));
}

function handleLearnMoreClick() {
  const btn = document.querySelector('#cta-buttons .btn-outline');
  const nav = document.getElementById('main-nav');

  if (btn && nav) {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      nav.scrollIntoView({ behavior: 'smooth' });
    });
  }
}

function initScrollListeners() {
  window.addEventListener('scroll', () => {
    updateHomeOpacity();
    updateNavClipPath();
  }, { passive: true });

  updateHomeOpacity();
  updateNavClipPath();
}

function initScrollInteractivity() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  });

  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });
}

// ============================================================================
// YEAR TABS (course-details.html)
// ============================================================================
function initYearTabs() {
  const tabs = document.querySelectorAll('.year-tab');
  const panels = document.querySelectorAll('.year-panel');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // deactivate all
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));

      // activate clicked
      tab.classList.add('active');
      const target = document.getElementById('year-' + tab.dataset.year);
      if (target) target.classList.add('active');
    });
  });
}

// ============================================================================
// FAQ ACCORDION
// ============================================================================
function initFAQAccordion() {
  const btns = document.querySelectorAll('.accordion-btn');
  if (!btns.length) return;

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.accordion-item');
      const isOpen = item.classList.contains('open');

      // Find parent accordion container
      const accordion = item.closest('.accordion') || item.parentElement;
      const siblings = accordion.querySelectorAll('.accordion-item');
      
      // close all siblings
      siblings.forEach(s => s.classList.remove('open'));

      // toggle current
      if (!isOpen) item.classList.add('open');
    });
  });
}

// ============================================================================
// SCROLL-TRIGGERED REVEAL
// ============================================================================
function initScrollReveals() {
  const selectors = [
    '.prereq-card',
    '.step-item',
    '.outcome-card',
    '.instructor-card',
    '.testi-card',
    '.support-card',
    '.resource-card',
    '.reminder-card',
    '.why-card',
    '.accolade-item',
    '.advisor-card',
    '.i-card',
    '.stat-box',
    '.info-chip'
  ];

  selectors.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.classList.add('reveal');
      // stagger delay
      el.style.transitionDelay = (i % 4) * 0.1 + 's';
    });
  });

  // IntersectionObserver
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ============================================================================
// CONTACT FORM HANDLING
// ============================================================================
function handleFormSubmit() {
  const note = document.getElementById('formNote');
  if (note) {
    note.style.display = 'block';
    note.classList.add('visible');
    // hide after 4s
    setTimeout(() => {
      note.style.display = 'none';
      note.classList.remove('visible');
    }, 4000);
  }
}

// Expose globally for inline onclick
window.handleFormSubmit = handleFormSubmit;

// ============================================================================
// NAVBAR ACTIVE STATE
// ============================================================================
function initNavbarActiveState() {
  const navLinks = document.querySelectorAll('#main-nav a');
  const currentPath = window.location.pathname;
  const currentPage = currentPath.split('/').pop() || 'index.html';

  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    const linkPage = linkPath.split('/').pop();

    // Remove active class from all links
    link.classList.remove('active');

    // Add active class to current page
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// ============================================================================
// NAVBAR SCROLL BEHAVIOR
// ============================================================================
function initNavbarScroll() {
  const nav = document.getElementById('main-nav');
  if (!nav) return;

  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add shadow on scroll
    if (currentScroll > 10) {
      nav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
      nav.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
    } else {
      nav.style.boxShadow = 'none';
      nav.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    }

    lastScroll = currentScroll;
  }, { passive: true });
}

// ============================================================================
// INIT
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
  handleLearnMoreClick();
  initScrollListeners();
  initScrollInteractivity();
  initYearTabs();
  initFAQAccordion();
  initScrollReveals();
  initNavbarActiveState();
  initNavbarScroll();
});
