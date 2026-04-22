'use strict';

const { src, dest, watch, series, parallel } = require('gulp');
const postcss = require('gulp-postcss');
const concat  = require('gulp-concat');
const uglify  = require('gulp-uglify');
const rename  = require('gulp-rename');
const zip     = require('gulp-zip');
const gulpZip = zip.default || zip;   // gulp-zip v6 is ESM; CJS interop returns { default: fn }

const isProd = process.env.NODE_ENV === 'production';

// ── Paths ─────────────────────────────────────────────────────────────────────
const paths = {
  css: {
    src:  'assets/css/screen.css',
    dest: 'assets/built/',
  },
  js: {
    src:  ['assets/js/main.js', 'assets/js/home-anim.js', 'assets/js/search.js'],
    dest: 'assets/built/',
  },
};

// ── CSS Task ──────────────────────────────────────────────────────────────────
function css(done) {
  const plugins = [
    require('tailwindcss'),
    require('autoprefixer'),
  ];

  if (isProd) {
    plugins.push(require('cssnano')({ preset: 'default' }));
  }

  // Only pass sourcemaps option when in dev — Gulp 5 chokes on sourcemaps:false
  const srcOpts  = isProd ? {} : { sourcemaps: true };
  const destOpts = isProd ? {} : { sourcemaps: '.' };

  return src(paths.css.src, srcOpts)
    .on('error', function (err) { console.error('[css:src]', err.message); done(err); })
    .pipe(postcss(plugins))
    .on('error', function (err) { console.error('[css:postcss]', err.message); done(err); })
    .pipe(rename('screen.css'))
    .pipe(dest(paths.css.dest, destOpts));
}

// ── JS Task ───────────────────────────────────────────────────────────────────
function js() {
  const srcOpts  = isProd ? {} : { sourcemaps: true };
  const destOpts = isProd ? {} : { sourcemaps: '.' };

  let stream = src(paths.js.src, srcOpts)
    .on('error', console.error)
    .pipe(concat('main.min.js'));

  if (isProd) {
    stream = stream.pipe(uglify()).on('error', console.error);
  }

  return stream.pipe(dest(paths.js.dest, destOpts));
}

// ── Zip Task (Ghost Admin upload) ─────────────────────────────────────────────
function zipTheme() {
  return src([
    '**/*',
    '!node_modules/**',
    '!dist/**',
    '!*.zip',
    '!.git/**',
    '!.gitignore',
  ])
    .pipe(gulpZip('sre-minimalist.zip'))
    .pipe(dest('.'));
}

// ── Watch Task ────────────────────────────────────────────────────────────────
function watchFiles() {
  watch(
    ['assets/css/**/*.css', '*.hbs', '**/*.hbs', 'tailwind.config.js'],
    css
  );
  watch('assets/js/**/*.js', js);
}

// ── Exports ───────────────────────────────────────────────────────────────────
const build = parallel(css, js);

exports.css     = css;
exports.js      = js;
exports.build   = build;
exports.zip     = zipTheme;
exports.default = series(build, watchFiles);


