/** @type {import('tailwindcss').Config} */
module.exports = {
  // Enable class-based dark mode for the theme toggle
  darkMode: 'class',

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
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },

      // ── Color Palette ─────────────────────────────────────────────────────
      colors: {
        // Primary accent — Infrastructure / Links
        indigo: {
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
        },
        // Success / Health
        emerald: {
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
        },
        // Warning / Logs
        amber: {
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
        },
      },

      // ── Backgrounds & Patterns ────────────────────────────────────────────
      backgroundImage: {
        // Dot-grid overlay for the hero section
        'grid-dot': `radial-gradient(circle, rgba(99,102,241,0.15) 1px, transparent 1px)`,
        // Subtle linear gradient for cards
        'card-gradient': 'linear-gradient(135deg, rgba(39,39,42,0.8) 0%, rgba(24,24,27,0.9) 100%)',
      },
      backgroundSize: {
        'grid-dot': '28px 28px',
      },

      // ── Spacing & Sizing ──────────────────────────────────────────────────
      maxWidth: {
        'reading': '72ch',   // Optimal reading width for posts
        'wide': '90ch',      // Wide layout for pages
      },

      // ── Borders ───────────────────────────────────────────────────────────
      borderWidth: {
        '0.5': '0.5px',
      },

      // ── Animations ────────────────────────────────────────────────────────
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        'strike-through': {
          from: { '--tw-line-through-opacity': '0', width: '0%' },
          to:   { '--tw-line-through-opacity': '1', width: '100%' },
        },
        'glitch': {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-2px)' },
          '40%': { transform: 'translateX(2px)' },
          '60%': { transform: 'translateX(-1px)' },
          '80%': { transform: 'translateX(1px)' },
        },
      },
      animation: {
        'blink': 'blink 1s step-end infinite',
        'fade-in': 'fade-in 0.4s ease-out both',
        'glitch': 'glitch 0.3s ease-in-out',
      },

      // ── Box Shadow / Glow ─────────────────────────────────────────────────
      boxShadow: {
        'glow-indigo': '0 0 20px -5px rgba(99,102,241,0.4)',
        'glow-emerald': '0 0 20px -5px rgba(16,185,129,0.3)',
        'card': '0 4px 24px -4px rgba(0,0,0,0.5)',
      },

      // ── Typography plugin customisation ───────────────────────────────────
      typography: (theme) => ({
        invert: {
          css: {
            '--tw-prose-body': theme('colors.zinc.300'),
            '--tw-prose-headings': theme('colors.zinc.100'),
            '--tw-prose-links': theme('colors.indigo.400'),
            '--tw-prose-bold': theme('colors.zinc.100'),
            '--tw-prose-counters': theme('colors.zinc.400'),
            '--tw-prose-bullets': theme('colors.zinc.600'),
            '--tw-prose-hr': theme('colors.zinc.800'),
            '--tw-prose-quotes': theme('colors.zinc.300'),
            '--tw-prose-quote-borders': theme('colors.amber.400'),
            '--tw-prose-captions': theme('colors.zinc.500'),
            '--tw-prose-code': theme('colors.emerald.300'),
            '--tw-prose-pre-code': theme('colors.zinc.200'),
            '--tw-prose-pre-bg': theme('colors.zinc.900'),
            '--tw-prose-th-borders': theme('colors.zinc.700'),
            '--tw-prose-td-borders': theme('colors.zinc.800'),
          },
        },
        // Light mode prose
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.zinc.700'),
            '--tw-prose-headings': theme('colors.zinc.900'),
            '--tw-prose-links': theme('colors.indigo.600'),
            '--tw-prose-quote-borders': theme('colors.amber.500'),
            '--tw-prose-code': theme('colors.indigo.600'),
            '--tw-prose-pre-bg': theme('colors.zinc.100'),
          },
        },
      }),
    },
  },

  plugins: [
    require('@tailwindcss/typography'),
  ],
};
