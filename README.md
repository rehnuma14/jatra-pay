# JATRA.PAY

A simple static site for a cashless public transport fare payment system demo.

**Live demo:** https://rehnuma14.github.io/jatra-pay/

**Contents**
- `index.html` — Home page
- `html/` — Additional pages (dashboard, notifications, reports, settings, about, login, register)
- `css/` — Stylesheets for each page
- `js/` — JavaScript for each page (theme toggle, sidebar, basic UX)
- `img/` — Images used by the site

**Quick start (view locally)**
1. Open the project folder in your file explorer.
2. Open `index.html` in a browser (double-click or right-click → Open with your browser).

No build tools or package managers are required — this is a static site.

**Development checks**
- Ensure all asset links are relative to the page location (e.g. pages in `html/` use `../css/...`, `../js/...`, `../img/...`).
- If changes don't appear in the browser, try a hard refresh: `Ctrl+Shift+R`.

**Enable / reconfigure GitHub Pages**
If you need to (re)deploy to GitHub Pages:

1. From the repository on GitHub go to `Settings` → `Pages`.
2. Under "Build and deployment" set the source to `Branch: main` and folder `/ (root)`.
3. Save. The site will build and the live URL will be shown (typically `https://<username>.github.io/jatra-pay/`).

You can also use the GitHub CLI from your project folder:

**Theme / Dark mode**
- Dark mode is toggled by the theme button in the top-right and stored in `localStorage`.
- Shared theme code lives in `js/dash.js`; page-specific files (e.g. `js/home.js`) add page behaviour.
- CSS variables and the `.dark-theme-variables` selector are used for dark theme styles.

**Folder structure**
```
index.html
html/
  ├─ dash.html
  ├─ notif.html
  ├─ report.html
  ├─ set.html
  ├─ abt.html
  ├─ login.html
  └─ regis.html
css/
  ├─ dash.css
  ├─ home.css
  └─ ...
js/
  ├─ dash.js
  ├─ home.js
  └─ ...
img/
  └─ (images)
```

**Notes & troubleshooting**
- If pages show broken links, check the relative paths — pages inside `html/` must prefix assets with `../`.
- If dark mode doesn't persist, check browser settings and console for JS errors.
- If you want me to add a `LICENSE` or CI, tell me which license or CI provider you prefer.

**Contact / Next steps**
If you want, I can:
- Add a small `index` redirect so `index.html` links open sub-pages in a single-page app style.
- Add basic form validation to `regis.html` and `login.html`.
- Add a `LICENSE` file (MIT/Apache/etc.) — tell me which license you prefer.
