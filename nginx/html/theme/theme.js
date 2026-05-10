/**
 * Modern Theme Switcher - Dark/Light/Classic
 * Default: Dark Mode
 * Saves preference to localStorage
 */
(function() {
  'use strict';

  var THEME_KEY = 'site-theme';
  var currentTheme = localStorage.getItem(THEME_KEY) || 'dark';

  // Apply theme on load (before DOM ready to prevent flash)
  document.documentElement.setAttribute('data-theme', currentTheme);

  // Build UI after DOM ready
  function init() {
    // Create toggle button
    var wrapper = document.createElement('div');
    wrapper.className = 'theme-toggle-wrapper';
    wrapper.innerHTML =
      '<button class="theme-toggle-btn" title="切换主题" aria-label="主题切换">' +
        getIcon(currentTheme) +
      '</button>' +
      '<div class="theme-panel" role="menu">' +
        '<button class="theme-option' + (currentTheme==='dark'?' active':'') + '" data-theme="dark">' +
          '🌙  暗黑模式' +
        '</button>' +
        '<button class="theme-option' + (currentTheme==='light'?' active':'') + '" data-theme="light">' +
          '☀️  白色模式' +
        '</button>' +
        '<button class="theme-option' + (currentTheme==='classic'?' active':'') + '" data-theme="classic">' +
          '📄  经典模式' +
        '</button>' +
      '</div>';

    document.body.appendChild(wrapper);

    // Events
    var btn = wrapper.querySelector('.theme-toggle-btn');
    var panel = wrapper.querySelector('.theme-panel');
    var options = wrapper.querySelectorAll('.theme-option');

    btn.addEventListener('click', function(e) {
      e.preventDefault();
      panel.classList.toggle('open');
    });

    options.forEach(function(opt) {
      opt.addEventListener('click', function(e) {
        e.preventDefault();
        var theme = this.getAttribute('data-theme');
        setTheme(theme, wrapper, btn);
      });
    });

    // Close panel on outside click
    document.addEventListener('click', function(e) {
      if (!wrapper.contains(e.target)) {
        panel.classList.remove('open');
      }
    });

    // Keyboard shortcut: Ctrl+Shift+T
    document.addEventListener('keydown', function(e) {
      if (e.ctrlKey && e.shiftKey && e.key === 'T') {
        e.preventDefault();
        var themes = ['dark', 'light', 'classic'];
        var idx = themes.indexOf(currentTheme);
        var next = themes[(idx + 1) % 3];
        setTheme(next, wrapper, btn);
      }
    });
  }

  function setTheme(theme, wrapper, btn) {
    currentTheme = theme;
    localStorage.setItem(THEME_KEY, theme);
    document.documentElement.setAttribute('data-theme', theme);

    if (wrapper) {
      var opts = wrapper.querySelectorAll('.theme-option');
      opts.forEach(function(o) {
        o.classList.toggle('active', o.getAttribute('data-theme') === theme);
      });
      wrapper.querySelector('.theme-panel').classList.remove('open');
    }
    if (btn) {
      btn.innerHTML = getIcon(theme);
    }
  }

  function getIcon(theme) {
    switch (theme) {
      case 'dark':  return '🌙';
      case 'light': return '☀️';
      case 'classic': return '📄';
      default:      return '🌙';
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
