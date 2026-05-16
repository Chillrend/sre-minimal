/** @type {import('tailwindcss').Config} */
module.exports = {
  // Scan all Handlebars templates and JS files for utility classes
  content: [
    './*.hbs',
    './**/*.hbs',
    './assets/js/**/*.js',
  ],

  theme: {
    extend: {
      // ── Typography ────────────────────────────────────────────────────────
      fontFamily: {
        display: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        mono:    ['"IBM Plex Mono"', 'monospace'],
      },

      fontSize: {
        'display': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '600' }],
        'h1':      ['1.85rem', { lineHeight: '1.2', fontWeight: '600' }],
        'body':    ['0.92rem', { lineHeight: '1.55' }],
        'label':   ['0.72rem', { lineHeight: '1.4', letterSpacing: '0.04em' }],
      },

      // ── Color Palette — DevOps Graphite ────────────────────────────────
      colors: {
        gx: {
          primary:    '#E8ECF1',
          secondary:  '#8893A1',
          tertiary:   '#3EC893',
          neutral:    '#121418',
          surface:    '#1A1D22',
          'on-primary': '#0A0B0D',
          border:     '#2A2D33',
        },
      },

      // ── Border Radius ──────────────────────────────────────────────────
      borderRadius: {
        'gx-sm': '3px',
        'gx-md': '6px',
        'gx-lg': '10px',
      },

      // ── Max Width ──────────────────────────────────────────────────────
      maxWidth: {
        'reading': '72ch',
        'wide':    '90ch',
      },

      // ── Borders ────────────────────────────────────────────────────────
      borderWidth: {
        '0.5': '0.5px',
      },

      // ── Backgrounds ────────────────────────────────────────────────────
      backgroundImage: {
        'grid-dot': `radial-gradient(circle, rgba(62,200,147,0.08) 1px, transparent 1px)`,
      },
      backgroundSize: {
        'grid-dot': '28px 28px',
      },

      // ── Animations ─────────────────────────────────────────────────────
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'blink':   'blink 1s step-end infinite',
        'fade-in': 'fade-in 0.4s ease-out both',
      },

      // ── Typography plugin customisation ────────────────────────────────
      typography: () => ({
        graphite: {
          css: {
            '--tw-prose-body':          '#E8ECF1',
            '--tw-prose-headings':      '#E8ECF1',
            '--tw-prose-links':         '#3EC893',
            '--tw-prose-bold':          '#E8ECF1',
            '--tw-prose-counters':      '#8893A1',
            '--tw-prose-bullets':       '#8893A1',
            '--tw-prose-hr':            '#2A2D33',
            '--tw-prose-quotes':        '#8893A1',
            '--tw-prose-quote-borders': '#3EC893',
            '--tw-prose-captions':      '#8893A1',
            '--tw-prose-code':          '#3EC893',
            '--tw-prose-pre-code':      '#E8ECF1',
            '--tw-prose-pre-bg':        '#1A1D22',
            '--tw-prose-th-borders':    '#2A2D33',
            '--tw-prose-td-borders':    '#2A2D33',
          },
        },
      }),
    },
  },

  plugins: [
    require('@tailwindcss/typography'),
  ],
};
