# SRE-Minimalist

> An engineering-first Ghost CMS theme for SRE/infrastructure bloggers.

A high-contrast dark-mode theme built with Tailwind CSS v3, `@tailwindcss/typography`, and Vanilla JS. Designed to feel like a professional dashboard or IDE — not just a blog.

---

## ✨ Features

| Feature | Details |
|---|---|
| **Dark / Light Mode** | Toggle button in header, persisted to `localStorage` |
| **Animated Headline** | Glitch/correction sequence: `efficient → scalable → mostly` |
| **Live Search** | Ghost Content API, debounced, terminal-style UI at `/search/` |
| **Ghost Portal** | Subscribe button wired to Ghost Portal for membership |
| **Glassmorphism Cards** | `backdrop-blur` + `bg-zinc-900/60` post & project cards |
| **Syntax Highlighting** | `@tailwindcss/typography prose-invert` + custom code/callout styles |
| **Reading Progress** | Thin indigo bar at top of screen on post pages |
| **Terminal 404** | Kernel panic–style error page with blinking cursor |
| **Responsive** | Mobile-first grid, full-screen mobile nav overlay |
| **Ghost Helpers** | `{{img_url}}`, `{{content}}`, `{{excerpt}}`, `{{title}}` correctly used |

---

## 🗂️ File Structure

```
sre-minimalist/
├── README.md
├── package.json           — Theme metadata & npm scripts
├── tailwind.config.js     — JIT config, tokens, dark mode
├── postcss.config.js      — PostCSS pipeline
├── gulpfile.js            — Build: CSS → assets/built/
├── routes.yaml            — Ghost route for /search/
├── .gitignore
│
├── assets/
│   ├── css/screen.css     — Tailwind + @layer components/utilities
│   ├── js/
│   │   ├── main.js        — Nav, theme toggle, progress bar
│   │   ├── home-anim.js   — Headline glitch animation
│   │   └── search.js      — Content API live search
│   └── built/             — Compiled output (auto-generated)
│
├── partials/
│   ├── navigation.hbs     — Fixed header, theme toggle, Portal button
│   ├── post-card.hbs      — Reusable post card
│   └── pagination.hbs     — Prev/next page nav
│
├── default.hbs            — Master layout (html/head/body)
├── index.hbs              — Homepage hero + stack + projects + posts
├── post.hbs               — Single post whitepaper view
├── page.hbs               — Wide static page
├── tag.hbs                — Tag archive
├── author.hbs             — Author archive
├── search.hbs             — Custom search page
├── error.hbs              — Generic error
└── error-404.hbs          — Terminal kernel panic 404
```

---

## 🛠️ Local Development

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [npm](https://npmjs.com) v9+
- A running Ghost instance (local or remote)

### 1. Install dependencies

```bash
cd sre-minimalist
npm install
```

### 2. Start the dev build (watch mode)

```bash
npm run dev
```

This runs Gulp in watch mode. Tailwind JIT will recompile `assets/built/screen.css` on every `.hbs` or `.css` change.

### 3. Load the theme in Ghost

**Option A — Symlink (recommended for local Ghost):**

```bash
# From the Ghost content/themes directory
ln -s /path/to/sre-minimalist .
```

Then in Ghost Admin → **Design → Change theme**, select **sre-minimalist**.

**Option B — Upload zip:**

```bash
npm run zip
# Produces sre-minimalist.zip
```

Upload via Ghost Admin → **Design → Change theme → Upload theme**.

---

## 🚀 Production Build

```bash
npm run build
```

This compiles a minified, autoprefixed CSS bundle to `assets/built/screen.css` with `cssnano`.

To also produce the zip for upload:

```bash
npm run zip
```

---

## 🌐 Deploying to a Live Ghost Site

### Method 1: Ghost Admin Upload (Simplest)

1. Run `npm run zip` → produces `sre-minimalist.zip`
2. Log into your Ghost Admin (e.g. `https://yourdomain.com/ghost`)
3. Go to **Settings → Design → Change theme**
4. Click **Upload theme** and select the zip
5. Click **Activate**

### Method 2: Direct File Copy (VPS/Server)

If you have SSH access to your Ghost server:

```bash
# Build first
npm run build

# Copy the theme (excluding node_modules and built sources)
rsync -av --exclude='node_modules' --exclude='*.zip' \
  /path/to/sre-minimalist/ \
  user@your-server:/var/www/ghost/content/themes/sre-minimalist/
```

Then restart Ghost:

```bash
ssh user@your-server
cd /var/www/ghost
ghost restart
```

Activate the theme in Ghost Admin as above.

### Method 3: GitHub → Ghost (CI/CD)

1. Push your theme to a GitHub repo
2. Use **[GitHub Actions](https://ghost.org/docs/themes/)** to auto-deploy on push
3. Or integrate with **Railway / Render** Ghost deployments that mount the themes directory

---

## ⚙️ Ghost Configuration Requirements

### Content API Key (for Search)

The `/search/` page uses the Ghost Content API. You need to provide your **Content API key**:

1. Ghost Admin → **Settings → Integrations → Add custom integration**
2. Name it `SRE Search`
3. Copy the **Content API Key**
4. In Ghost Admin → **Settings → Code injection → Site header**, add:

```html
<meta name="ghost-content-api-key" content="YOUR_CONTENT_API_KEY">
```

> **Note:** The `search.hbs` template uses `{{@site.content_api_key}}` which Ghost exposes automatically if you configure a custom integration via the Admin API. If it's blank, use the Code injection method above and update `search.js` to read it from the meta tag.

### Routes (for /search/ page)

After activating the theme, upload `routes.yaml` via:

**Ghost Admin → Settings → Labs → Beta features → Routes → Upload routes.yaml**

The file is included in the theme root. This maps `/search/` to the `search.hbs` template.

### Ghost Portal (Subscribe Button)

The subscribe button in the nav uses `data-portal="signup"`. Ghost Portal is enabled by default on Ghost Pro and self-hosted Ghost 4+. No extra configuration needed.

---

## 🎨 Customisation

### Design Tokens

Edit `tailwind.config.js` to change the colour palette, fonts, or animations:

```js
// Change accent from indigo to teal:
colors: {
  indigo: {
    500: '#14b8a6', // teal-500
  }
}
```

### Custom CSS

Add custom styles to `assets/css/screen.css` inside `@layer components {}` or `@layer utilities {}`.

### Navigation Links

Manage navigation in **Ghost Admin → Settings → Design → Navigation**.

---

## 🧪 Theme Validation

Run [GScan](https://gscan.ghost.org) to validate the theme:

```bash
npm test
# or
npx gscan .
```

---

## 📄 License

MIT © — See [Ghost Theme License](https://ghost.org/docs/themes/)
