(function () {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('primary-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });

    nav.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Theme — the initial value is applied before first paint by the inline
  // script in <head>. Here we (a) let the toggle flip + persist an explicit
  // choice, and (b) follow the OS appearance live so the site switches to
  // night mode on its own (e.g. macOS scheduled dark mode at sunset) for
  // visitors who haven't picked a theme themselves.
  const root = document.documentElement;
  const themeToggle = document.querySelector('.theme-toggle');
  const label = (theme) =>
    theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';

  const applyTheme = (theme) => {
    root.setAttribute('data-theme', theme);
    if (themeToggle) themeToggle.setAttribute('aria-label', label(theme));
  };

  const storedTheme = () => {
    try {
      const t = localStorage.getItem('theme');
      return t === 'light' || t === 'dark' ? t : null;
    } catch (e) {
      return null;
    }
  };

  if (themeToggle) {
    applyTheme(root.getAttribute('data-theme') || 'light');
    themeToggle.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      // An explicit click pins the choice and opts out of auto-switching.
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  // Follow the OS light/dark preference as it changes, unless the visitor has
  // explicitly chosen a theme via the toggle (their choice wins).
  const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const followSystem = (e) => {
    if (storedTheme()) return;
    applyTheme(e.matches ? 'dark' : 'light');
  };
  if (darkQuery.addEventListener) darkQuery.addEventListener('change', followSystem);
  else if (darkQuery.addListener) darkQuery.addListener(followSystem); // older Safari

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Elevate the header once the page is scrolled
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Scroll-reveal: rise + fade elements as they enter the viewport.
  // Mark <html> as JS-capable so the hidden initial state applies (CSS gates
  // it behind .js). This runs synchronously before first paint, so there's
  // no flash of hidden content and no-JS users see everything.
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion && 'IntersectionObserver' in window) {
    document.documentElement.classList.add('js');

    const reveal = (el) => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    };

    // Grouped items animate in with a gentle stagger
    const groups = document.querySelectorAll(
      '.section .grid, .about-stack, .pdf-list, .release-list, .news-list, .timeline, .link-list'
    );
    const groupObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.querySelectorAll(':scope > *').forEach((el, i) => {
            el.style.transitionDelay = Math.min(i * 70, 420) + 'ms';
            reveal(el);
          });
          obs.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.08 }
    );
    groups.forEach((group) => {
      group.querySelectorAll(':scope > *').forEach((el) => el.classList.add('reveal'));
      groupObserver.observe(group);
    });

    // Section headings + ledes reveal individually
    const singles = document.querySelectorAll(
      '.section h2, .section > .container > .section-lede, .section > .container > .papers-h'
    );
    const singleObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          reveal(entry.target);
          obs.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.2 }
    );
    singles.forEach((el) => {
      el.classList.add('reveal');
      singleObserver.observe(el);
    });
  }

  const links = Array.from(document.querySelectorAll('.primary-nav a[href^="#"]'));
  const sections = links
    .map((a) => document.querySelector(a.getAttribute('href')))
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    const byId = new Map(links.map((a) => [a.getAttribute('href').slice(1), a]));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            links.forEach((l) => l.classList.remove('active'));
            const link = byId.get(entry.target.id);
            if (link) link.classList.add('active');
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
  }
})();
