(function () {
  'use strict';

  var STORAGE_THEME = 'mike-site-theme';
  var STORAGE_ACCENT = 'mike-site-accent';

  var lightBase = {
    bg: '#f7f5f1',
    text: '#1a1a1a',
    textMuted: '#4a4a4a',
    textLight: '#6b6b6b',
    border: '#e2dfda',
    cardBg: '#ffffff',
    codeBg: '#f0eeeb'
  };

  var darkBase = {
    bg: '#161513',
    text: '#f0eeeb',
    textMuted: '#a8a49f',
    textLight: '#7d7974',
    border: '#2d2a27',
    cardBg: '#1e1c19',
    codeBg: '#252320'
  };

  var accents = {
    coral: { main: '#e86b58', soft: '#f08d7d', bg: '#fef5f4', bgDark: 'rgba(232, 107, 88, 0.12)' },
    teal:  { main: '#0d9488', soft: '#5eead4', bg: '#ccfbf1', bgDark: 'rgba(13, 148, 136, 0.2)' },
    blue:  { main: '#2563eb', soft: '#93c5fd', bg: '#dbeafe', bgDark: 'rgba(37, 99, 235, 0.2)' },
    green: { main: '#059669', soft: '#6ee7b7', bg: '#d1fae5', bgDark: 'rgba(5, 150, 105, 0.2)' }
  };

  var accentOrder = ['coral', 'teal', 'blue', 'green'];

  function getStoredTheme() {
    try {
      return localStorage.getItem(STORAGE_THEME) || '';
    } catch (e) {
      return '';
    }
  }

  function getStoredAccent() {
    try {
      return localStorage.getItem(STORAGE_ACCENT) || '';
    } catch (e) {
      return '';
    }
  }

  function setStoredTheme(theme) {
    try {
      if (theme) localStorage.setItem(STORAGE_THEME, theme);
      else localStorage.removeItem(STORAGE_THEME);
    } catch (e) {}
  }

  function setStoredAccent(accent) {
    try {
      if (accent) localStorage.setItem(STORAGE_ACCENT, accent);
      else localStorage.removeItem(STORAGE_ACCENT);
    } catch (e) {}
  }

  function getPreferredTheme() {
    var stored = getStoredTheme();
    if (stored === 'light' || stored === 'dark') return stored;
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
      return 'dark';
    return 'light';
  }

  function getPreferredAccent() {
    var stored = getStoredAccent();
    if (accentOrder.indexOf(stored) !== -1) return stored;
    return 'coral';
  }

  function applyTheme(theme, accentKey) {
    theme = theme || getPreferredTheme();
    accentKey = accentKey || getPreferredAccent();
    var isDark = theme === 'dark';
    var base = isDark ? darkBase : lightBase;
    var accent = accents[accentKey] || accents.coral;
    var accentBg = isDark ? accent.bgDark : accent.bg;

    var root = document.documentElement;
    root.style.setProperty('--bg', base.bg);
    root.style.setProperty('--text', base.text);
    root.style.setProperty('--text-muted', base.textMuted);
    root.style.setProperty('--text-light', base.textLight);
    root.style.setProperty('--border', base.border);
    root.style.setProperty('--card-bg', base.cardBg);
    root.style.setProperty('--code-bg', base.codeBg);
    root.style.setProperty('--accent', accent.main);
    root.style.setProperty('--accent-soft', accent.soft);
    root.style.setProperty('--accent-bg', accentBg);
    root.style.setProperty('--divider', accent.main);

    if (isDark) root.classList.add('theme-dark');
    else root.classList.remove('theme-dark');
  }

  var controlStyles =
    '.theme-controls{display:flex;align-items:center;gap:0.75rem;}' +
    '.theme-controls__toggle{display:inline-flex;align-items:center;justify-content:center;width:2.25rem;height:2.25rem;padding:0;border:1px solid var(--border);background:var(--card-bg);border-radius:var(--radius,0.5rem);color:var(--text-muted);cursor:pointer;transition:color .2s,border-color .2s,background .2s;} .theme-controls__toggle:hover{color:var(--text);border-color:var(--accent-soft);} .theme-controls__toggle:focus-visible{outline:2px solid var(--accent-soft);outline-offset:2px;}' +
    '.theme-controls__toggle svg{width:1.1rem;height:1.1rem;}' +
    '.theme-controls__accent-wrap{position:relative;}' +
    '.theme-controls__accent-btn{display:inline-flex;align-items:center;justify-content:center;width:2.25rem;height:2.25rem;padding:0;font-family:inherit;background:var(--card-bg);border:1px solid var(--border);border-radius:var(--radius,0.5rem);cursor:pointer;box-sizing:border-box;} .theme-controls__accent-btn:hover,.theme-controls__accent-btn:focus{border-color:var(--accent-soft);} .theme-controls__accent-btn:focus-visible{outline:2px solid var(--accent-soft);outline-offset:2px;}' +
    '.theme-controls__accent-btn .theme-controls__swatch{width:1.1rem;height:1.1rem;border-radius:50%;border:none;flex-shrink:0;display:block;}' +
    '.theme-controls__accent-dropdown{position:absolute;top:100%;right:0;margin-top:0.25rem;display:none;flex-direction:column;align-items:center;gap:0.2rem;padding:0.35rem;background:var(--card-bg);border:1px solid var(--border);border-radius:var(--radius);box-shadow:0 4px 12px rgba(0,0,0,0.1);z-index:10;}' +
    '.theme-controls__accent-dropdown.is-open{display:flex;}' +
    '.theme-controls__accent-dropdown .theme-controls__swatch{width:1.5rem;height:1.5rem;border-radius:50%;border:2px solid transparent;padding:0;cursor:pointer;transition:transform .15s,border-color .2s,box-shadow .2s;background:var(--swatch-color);} .theme-controls__accent-dropdown .theme-controls__swatch:hover{transform:scale(1.1);} .theme-controls__accent-dropdown .theme-controls__swatch.is-active{border-color:var(--text);box-shadow:0 0 0 1px var(--bg);}';

  var lightIslandStyles =
    'html.theme-dark .mermaid-wrap,html.theme-dark .mini-diagram,html.theme-dark .diagram-screenshot-wrap{background:#f7f5f1!important;border-color:#e2dfda!important;}' +
    'html.theme-dark .card-portrait{background:#f7f5f1!important;border-color:#e2dfda!important;}' +
    'html.theme-dark .mermaid-wrap svg text,html.theme-dark .mini-diagram svg text,html.theme-dark .diagram-screenshot-wrap svg text{fill:#1a1a1a!important;}' +
    'html.theme-dark .mermaid-wrap svg rect,html.theme-dark .mini-diagram svg rect,html.theme-dark .diagram-screenshot-wrap svg rect{fill:#f7f5f1!important;stroke:#e2dfda!important;}' +
    'html.theme-dark .mermaid-wrap svg path,html.theme-dark .mini-diagram svg path,html.theme-dark .diagram-screenshot-wrap svg path{stroke:#1a1a1a!important;}' +
    'html.theme-dark .mermaid-wrap svg line,html.theme-dark .mini-diagram svg line,html.theme-dark .diagram-screenshot-wrap svg line{stroke:#1a1a1a!important;}' +
    'html.theme-dark .mermaid-wrap svg polygon,html.theme-dark .mini-diagram svg polygon,html.theme-dark .diagram-screenshot-wrap svg polygon{fill:#f7f5f1!important;stroke:#e2dfda!important;}' +
    'html.theme-dark .mermaid-wrap svg circle,html.theme-dark .mini-diagram svg circle,html.theme-dark .diagram-screenshot-wrap svg circle,html.theme-dark .mermaid-wrap svg ellipse,html.theme-dark .mini-diagram svg ellipse,html.theme-dark .diagram-screenshot-wrap svg ellipse{fill:#f7f5f1!important;stroke:#e2dfda!important;}';

  function injectControls(container) {
    var el = typeof container === 'string' ? document.querySelector(container) : container;
    if (!el) return;

    var theme = getPreferredTheme();
    var accentKey = getPreferredAccent();

    var style = document.createElement('style');
    style.textContent = controlStyles;
    document.head.appendChild(style);


    var wrap = document.createElement('div');
    wrap.className = 'theme-controls';
    wrap.setAttribute('aria-label', 'Theme and accent color');

    var accentWrap = document.createElement('div');
    accentWrap.className = 'theme-controls__accent-wrap';
    var accentBtn = document.createElement('button');
    accentBtn.type = 'button';
    accentBtn.className = 'theme-controls__accent-btn';
    accentBtn.setAttribute('aria-label', 'Accent color');
    accentBtn.setAttribute('aria-haspopup', 'true');
    accentBtn.setAttribute('aria-expanded', 'false');
    var currentSwatch = document.createElement('span');
    currentSwatch.className = 'theme-controls__swatch';
    currentSwatch.style.background = accents[accentKey].main;
    accentBtn.appendChild(currentSwatch);
    accentWrap.appendChild(accentBtn);
    var dropdown = document.createElement('div');
    dropdown.className = 'theme-controls__accent-dropdown';
    dropdown.setAttribute('role', 'menu');
    dropdown.setAttribute('aria-label', 'Choose accent color');
    accentOrder.forEach(function (key) {
      var swatchBtn = document.createElement('button');
      swatchBtn.type = 'button';
      swatchBtn.className = 'theme-controls__swatch' + (key === accentKey ? ' is-active' : '');
      swatchBtn.setAttribute('role', 'menuitem');
      swatchBtn.setAttribute('aria-label', 'Accent ' + key);
      swatchBtn.style.setProperty('--swatch-color', accents[key].main);
      swatchBtn.style.background = accents[key].main;
      swatchBtn.dataset.accent = key;
      dropdown.appendChild(swatchBtn);
    });
    accentWrap.appendChild(dropdown);
    wrap.appendChild(accentWrap);

    accentBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = dropdown.classList.toggle('is-open');
      accentBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    dropdown.querySelectorAll('.theme-controls__swatch').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var key = btn.dataset.accent;
        if (!key || accentOrder.indexOf(key) === -1) return;
        accentKey = key;
        setStoredAccent(accentKey);
        applyTheme(theme, accentKey);
        currentSwatch.style.background = accents[accentKey].main;
        dropdown.classList.remove('is-open');
        accentBtn.setAttribute('aria-expanded', 'false');
        dropdown.querySelectorAll('.theme-controls__swatch').forEach(function (b) {
          b.classList.toggle('is-active', b.dataset.accent === accentKey);
          b.style.background = accents[b.dataset.accent].main;
        });
      });
    });
    document.addEventListener('click', function () {
      dropdown.classList.remove('is-open');
      accentBtn.setAttribute('aria-expanded', 'false');
    });

    var toggleBtn = document.createElement('button');
    toggleBtn.type = 'button';
    toggleBtn.className = 'theme-controls__toggle';
    toggleBtn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    toggleBtn.innerHTML = theme === 'dark'
      ? '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>'
      : '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>';
    wrap.appendChild(toggleBtn);

    toggleBtn.addEventListener('click', function () {
      var next = theme === 'dark' ? 'light' : 'dark';
      theme = next;
      setStoredTheme(theme);
      applyTheme(theme, accentKey);
      toggleBtn.setAttribute('aria-label', next === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      toggleBtn.innerHTML = next === 'dark'
        ? '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>'
        : '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>';
    });

    el.appendChild(wrap);
  }

  function injectDiagramOverrides() {
    var existing = document.getElementById('theme-light-islands');
    if (existing) existing.remove();
    var style = document.createElement('style');
    style.id = 'theme-light-islands';
    style.textContent = lightIslandStyles;
    document.body.appendChild(style);
  }

  function init() {
    var theme = getPreferredTheme();
    var accent = getPreferredAccent();
    applyTheme(theme, accent);

    var container = document.getElementById('theme-controls');
    if (container) injectControls(container);
    injectDiagramOverrides();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.MikeSiteTheme = {
    apply: applyTheme,
    injectControls: injectControls,
    injectDiagramOverrides: injectDiagramOverrides,
    getTheme: getPreferredTheme,
    getAccent: getPreferredAccent
  };
})();
