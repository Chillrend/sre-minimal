/**
 * SRE-Minimalist Ghost Theme — main.js
 * Handles: theme toggle, mobile nav, reading progress, header scroll behaviour
 */

(function () {
  'use strict';

  // ── Theme Toggle (dark / light) ──────────────────────────────────────────
  const THEME_KEY = 'sre-theme';
  const html = document.documentElement;

  function applyTheme(theme) {
    if (theme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    localStorage.setItem(THEME_KEY, theme);
    updateThemeIcon(theme);
  }

  function updateThemeIcon(theme) {
    const sunIcon  = document.getElementById('theme-icon-sun');
    const moonIcon = document.getElementById('theme-icon-moon');
    if (!sunIcon || !moonIcon) return;
    if (theme === 'dark') {
      sunIcon.classList.remove('hidden');
      moonIcon.classList.add('hidden');
    } else {
      sunIcon.classList.add('hidden');
      moonIcon.classList.remove('hidden');
    }
  }

  function initTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = saved || (prefersDark ? 'dark' : 'light');
    applyTheme(theme);
  }

  function toggleTheme() {
    const current = html.classList.contains('dark') ? 'dark' : 'light';
    applyTheme(current === 'dark' ? 'light' : 'dark');
  }

  // ── Mobile Navigation ────────────────────────────────────────────────────
  function initMobileNav() {
    const burger  = document.getElementById('nav-burger');
    const overlay = document.getElementById('nav-overlay');
    const close   = document.getElementById('nav-close');

    if (!burger || !overlay) return;

    burger.addEventListener('click', () => {
      overlay.classList.remove('translate-x-full', 'opacity-0', 'pointer-events-none');
      overlay.classList.add('translate-x-0', 'opacity-100');
      document.body.style.overflow = 'hidden';
    });

    function closeNav() {
      overlay.classList.add('translate-x-full', 'opacity-0', 'pointer-events-none');
      overlay.classList.remove('translate-x-0', 'opacity-100');
      document.body.style.overflow = '';
    }

    if (close) close.addEventListener('click', closeNav);

    // Close on backdrop click
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeNav();
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeNav();
    });
  }

  // ── Header Scroll Blur ───────────────────────────────────────────────────
  function initHeaderScroll() {
    const header = document.getElementById('gh-head');
    if (!header) return;

    let lastY = 0;
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y > 20) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
      lastY = y;
    }, { passive: true });
  }

  // ── Reading Progress Bar ─────────────────────────────────────────────────
  function initReadingProgress() {
    const bar  = document.getElementById('reading-progress');
    const post = document.querySelector('.gh-content.is-body');
    if (!bar || !post) return;

    window.addEventListener('scroll', () => {
      const { top, height } = post.getBoundingClientRect();
      const winH = window.innerHeight;
      const scrolled = Math.min(Math.max(-top / (height - winH), 0), 1);
      bar.style.width = (scrolled * 100) + '%';
    }, { passive: true });
  }

  // ── Smooth Anchor Scroll ─────────────────────────────────────────────────
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', (e) => {
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // ── Active Nav Link ──────────────────────────────────────────────────────
  function initActiveNav() {
    const current = window.location.pathname;
    document.querySelectorAll('.nav-link').forEach(link => {
      const href = link.getAttribute('href');
      if (href && href !== '/' && current.startsWith(href)) {
        link.classList.add('active');
      } else if (href === '/' && current === '/') {
        link.classList.add('active');
      }
    });
  }

  // ── External Link Indicator ──────────────────────────────────────────────
  function initExternalLinks() {
    document.querySelectorAll('.gh-content.is-body a').forEach(link => {
      if (link.hostname && link.hostname !== window.location.hostname) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      }
    });
  }

  // ── Init ─────────────────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initMobileNav();
    initHeaderScroll();
    initReadingProgress();
    initSmoothScroll();
    initActiveNav();
    initExternalLinks();

    // Wire up theme toggle button
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) themeBtn.addEventListener('click', toggleTheme);
  });

})();
