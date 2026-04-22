/**
 * SRE-Minimalist Ghost Theme — home-anim.js
 * "Glitch/Correction" animated headline for the homepage.
 *
 * Sequence:
 *   "I write [efficient] codes"
 *   → Strike through "efficient"
 *   → Fade in "scalable"
 *   → Strike through "scalable"
 *   → Fade in ", mostly."
 */

(function () {
  'use strict';

  const delay = ms => new Promise(res => setTimeout(res, ms));

  async function runAnimation() {
    const allSpan   = document.getElementById('anim-target');
    const afterSpan = document.getElementById('anim-after');
    if (!allSpan || !afterSpan) return;

    // ── Step 1: Strike out "efficient" ────────────────────────────────────
    await delay(1200);
    allSpan.classList.add('is-struck');

    // Glitch twitch
    allSpan.style.animation = 'glitch 0.3s ease-in-out';
    await delay(300);
    allSpan.style.animation = '';

    // ── Step 2: Fade in "scalable" ────────────────────────────────────────
    await delay(600);
    const scalable = document.createElement('span');
    scalable.innerText = 'scalable';
    scalable.id = 'anim-scalable';
    scalable.className = 'anim-word anim-highlight';
    allSpan.insertAdjacentElement('afterend', scalable);

    void scalable.offsetWidth; // Force reflow
    await delay(30);
    scalable.classList.add('is-visible');

    // ── Step 3: Strike out "scalable" ─────────────────────────────────────
    await delay(2000);
    scalable.classList.add('is-struck');
    scalable.classList.remove('anim-highlight');
    scalable.style.animation = 'glitch 0.3s ease-in-out';
    await delay(300);
    scalable.style.animation = '';

    // ── Step 4: Fade in ", mostly." ───────────────────────────────────────
    await delay(600);
    const mostly = document.createElement('span');
    mostly.innerText = ', mostly.';
    mostly.id = 'anim-mostly';
    mostly.className = 'anim-word text-amber-400';
    afterSpan.insertAdjacentElement('afterend', mostly);

    void mostly.offsetWidth; // Force reflow
    await delay(30);
    mostly.classList.add('is-visible');
  }

  document.addEventListener('DOMContentLoaded', () => {
    // Only run on the homepage
    if (document.getElementById('gh-home')) {
      runAnimation();
    }
  });

})();
