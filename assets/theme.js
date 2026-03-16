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
    coral:  { main: '#e86b58', soft: '#f08d7d', bg: '#fef5f4', bgDark: 'rgba(232, 107, 88, 0.12)' },
    teal:   { main: '#0d9488', soft: '#5eead4', bg: '#ccfbf1', bgDark: 'rgba(13, 148, 136, 0.2)' },
    blue:   { main: '#2563eb', soft: '#93c5fd', bg: '#dbeafe', bgDark: 'rgba(37, 99, 235, 0.2)' },
    green:  { main: '#059669', soft: '#6ee7b7', bg: '#d1fae5', bgDark: 'rgba(5, 150, 105, 0.2)' },
    violet: { main: '#7c3aed', soft: '#a78bfa', bg: '#ede9fe', bgDark: 'rgba(124, 58, 237, 0.2)' }
  };

  var accentOrder = ['coral', 'teal', 'blue', 'green', 'violet'];

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

    if (isDark) root.classList.add('theme-dark');
    else root.classList.remove('theme-dark');
  }

  var controlStyles =
    '.theme-controls{display:flex;align-items:center;gap:0.75rem;}' +
    '.theme-controls__toggle{display:inline-flex;align-items:center;justify-content:center;width:2.25rem;height:2.25rem;padding:0;border:1px solid var(--border);background:var(--card-bg);border-radius:var(--radius,0.5rem);color:var(--text-muted);cursor:pointer;transition:color .2s,border-color .2s,background .2s;} .theme-controls__toggle:hover{color:var(--text);border-color:var(--accent-soft);}' +
    '.theme-controls__toggle svg{width:1.1rem;height:1.1rem;}' +
    '.theme-controls__accents{display:flex;align-items:center;gap:0.35rem;} .theme-controls__accents span{font-family:inherit;font-size:0.7rem;color:var(--text-light);margin-right:0.25rem;}' +
    '.theme-controls__swatch{width:1.25rem;height:1.25rem;border-radius:50%;border:2px solid transparent;padding:0;cursor:pointer;transition:transform .15s,border-color .2s,box-shadow .2s;} .theme-controls__swatch:hover{transform:scale(1.12);}' +
    '.theme-controls__swatch.is-active{border-color:var(--text);box-shadow:0 0 0 1px var(--bg);}';

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

    var toggleBtn = document.createElement('button');
    toggleBtn.type = 'button';
    toggleBtn.className = 'theme-controls__toggle';
    toggleBtn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    toggleBtn.innerHTML = theme === 'dark'
      ? '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>'
      : '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>';
    wrap.appendChild(toggleBtn);

    var accentWrap = document.createElement('div');
    accentWrap.className = 'theme-controls__accents';
    var label = document.createElement('span');
    label.textContent = 'Accent';
    accentWrap.appendChild(label);
    accentOrder.forEach(function (key) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'theme-controls__swatch' + (key === accentKey ? ' is-active' : '');
      btn.setAttribute('aria-label', 'Accent color ' + key);
      btn.style.background = accents[key].main;
      btn.dataset.accent = key;
      accentWrap.appendChild(btn);
    });
    wrap.appendChild(accentWrap);

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

    accentWrap.querySelectorAll('.theme-controls__swatch').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var key = btn.dataset.accent;
        if (!key) return;
        accentKey = key;
        setStoredAccent(accentKey);
        applyTheme(theme, accentKey);
        accentWrap.querySelectorAll('.theme-controls__swatch').forEach(function (b) {
          b.classList.toggle('is-active', b.dataset.accent === accentKey);
        });
      });
    });

    el.appendChild(wrap);
  }

  function init() {
    var theme = getPreferredTheme();
    var accent = getPreferredAccent();
    applyTheme(theme, accent);

    var container = document.getElementById('theme-controls');
    if (container) injectControls(container);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.MikeSiteTheme = {
    apply: applyTheme,
    injectControls: injectControls,
    getTheme: getPreferredTheme,
    getAccent: getPreferredAccent
  };
})();
