/**
 * SRE-Minimalist Ghost Theme — search.js
 * Implements live search using the Ghost Content API.
 * Runs only when #search-input exists on the page.
 */

(function () {
  'use strict';

  // ── Config ────────────────────────────────────────────────────────────────
  // GHOST_URL and GHOST_KEY are injected via data attributes on #search-root
  const root      = document.getElementById('search-root');
  if (!root) return;

  const ghostUrl  = root.dataset.ghostUrl;
  const ghostKey  = root.dataset.contentKey;
  const input     = document.getElementById('search-input');
  const results   = document.getElementById('search-results');
  const status    = document.getElementById('search-status');
  const cursor    = document.getElementById('search-cursor');

  if (!input || !results) return;

  // ── Blinking cursor ───────────────────────────────────────────────────────
  let cursorVisible = true;
  setInterval(() => {
    if (!cursor) return;
    cursorVisible = !cursorVisible;
    cursor.style.opacity = cursorVisible ? '1' : '0';
  }, 530);

  // ── Debounce ─────────────────────────────────────────────────────────────
  function debounce(fn, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  // ── Render a single result card ────────────────────────────────────────
  function renderCard(post) {
    const tag = post.primary_tag ? post.primary_tag.name : '';
    const date = post.published_at
      ? new Date(post.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
      : '';
    const excerpt = post.custom_excerpt || post.excerpt || '';
    const image = post.feature_image
      ? `<img src="${post.feature_image}" alt="" class="w-full h-40 object-cover rounded-t-xl opacity-80" loading="lazy">`
      : '';

    return `
      <a href="${post.url}" class="glass-card block no-underline group animate-fade-in">
        ${image}
        <div class="p-5 space-y-2">
          ${tag ? `<span class="mono-badge">${tag}</span>` : ''}
          <h2 class="font-mono font-semibold text-zinc-100 group-hover:text-indigo-300 transition-colors text-lg leading-snug">
            ${post.title}
          </h2>
          ${excerpt ? `<p class="text-zinc-400 text-sm line-clamp-2">${excerpt}</p>` : ''}
          <p class="text-zinc-600 font-mono text-xs">${date}</p>
        </div>
      </a>
    `;
  }

  // ── Perform search ────────────────────────────────────────────────────────
  async function performSearch(query) {
    if (!query || query.trim().length < 2) {
      results.innerHTML = '';
      setStatus('');
      return;
    }

    setStatus('Searching...');

    try {
      const url = `${ghostUrl}/ghost/api/content/posts/?key=${ghostKey}&filter=title:~'${encodeURIComponent(query)}'&fields=title,url,excerpt,custom_excerpt,feature_image,published_at,primary_tag&include=tags&limit=12`;
      const res  = await fetch(url);

      if (!res.ok) throw new Error(`API error ${res.status}`);

      const data = await res.json();
      const posts = data.posts || [];

      if (posts.length === 0) {
        results.innerHTML = '';
        setStatus(`<span class="text-amber-400 font-mono">// no results for "${query}"</span>`);
        return;
      }

      setStatus(`<span class="text-emerald-400 font-mono">// ${posts.length} result${posts.length !== 1 ? 's' : ''} found</span>`);
      results.innerHTML = posts.map(renderCard).join('');

    } catch (err) {
      setStatus(`<span class="text-red-400 font-mono">// ERROR: ${err.message}</span>`);
      console.error('[search.js]', err);
    }
  }

  function setStatus(html) {
    if (status) status.innerHTML = html;
  }

  // ── Wire up input ─────────────────────────────────────────────────────────
  const debouncedSearch = debounce(performSearch, 300);

  input.addEventListener('input', () => {
    debouncedSearch(input.value);
  });

  // Handle URL query param ?q=
  const params = new URLSearchParams(window.location.search);
  const initialQuery = params.get('q') || '';
  if (initialQuery) {
    input.value = initialQuery;
    performSearch(initialQuery);
  }

  // Auto-focus on page load
  input.focus();

})();
