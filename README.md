# QYRIXX (React + Vite + React Router + Firebase Auth)

## Run
```
npm install
npm run dev        # http://localhost:5173
npm run build      # output in dist/
```
Deploy `dist/` to Netlify/Vercel (`public/_redirects` and `vercel.json` handle page routing).

## Login (Phone OTP + Google)
1. Firebase console: create project, add a Web app, copy keys into `.env` (see `.env.example`).
2. Authentication > Sign-in method: enable **Phone** and **Google**.
3. Authentication > Settings > Authorized domains: add `localhost` and your live domain.
4. Real SMS OTP needs the Blaze plan; use Firebase test phone numbers for free testing.
Projects/Products are hidden behind login in the browser only. Do not put private data there; real protection needs a backend.

## What is new in this version
- **Theme**: white page with a soft sky-blue / purple glow on the sides. Buttons are black or blue only. Hero content is centred.
- **Animations from the Wix reference**: rotating blurred circles, shimmering "Ask QYRIXX about ..." text, word slider, marquee, coverflow gallery, FAQ accordion, filling process line, counters, scroll reveal. All in `src/fx.jsx` and `src/styles.css`.
- **Homepage sections** (`src/Sections.jsx`): hero + ask bar, services showcase (pick a category, see its services), website demo videos, Product of the week, Domain finder, process, stats, packages, FAQ, about, CTA.
- **Services menu** (`src/Shell.jsx`): click a category, its sub-categories appear, click one and it opens in a **new tab**.
- **Service page** (`src/Pages.jsx`): animated illustration (loop), parallax images, scroll progress bar, marquee, process line.
- **Images**: every category has an animated SVG scene in `src/Art.jsx`; each service gets its own colours automatically. Posters are drawn in `src/Media.jsx`. No image files to maintain.
- **Chatbot** (`src/Chatbot.jsx`): floating assistant on the website and dashboard. It answers from your price list and FAQ (rule-based, no AI API, no server).
- **Languages**: English, Tamil, Hindi (switch in the header). Texts are in `src/i18n.jsx`.
- **After login** (`src/Dashboard.jsx`, route `/app`): Wix-Studio style dashboard. Sidebar with Services (click a category to expand its sub-services), Discover page with templates, demo videos, reels and posters. Projects and Products now live at `/app/projects` and `/app/products`.

## Things you should know
- **Demo videos** are animated website mock-ups. To use real recordings put `.mp4` files in `public/assets/videos/` and list them in `DEMO_VIDEOS` in `src/config.js`.
- **Reels / posters** are built from `REELS` and `POSTERS` in `src/config.js` (service names, prices come from `data.js`).
- **Product of the week** changes automatically every calendar week through `PRODUCTS_OF_WEEK` in `src/config.js`.
- **Domain finder** asks Google's public DNS service from the visitor's browser. It is only a hint; the registrar confirms availability.
- **Dashboard preview**: while Firebase keys are NOT set, the Login page shows "Preview the dashboard (demo mode)". It disappears once Firebase is configured.
- **Translations**: Tamil and Hindi texts should be checked by a native speaker. Service names and short category descriptions in `data.js` stay in English.
- Fonts (Sora, Noto Sans Tamil, Noto Sans Devanagari) load from Google Fonts. Login, Contact and legal pages are English only.

## Edit
- `src/config.js`: phone, WhatsApp, email, social links, PROJECTS, PRODUCTS, PRODUCTS_OF_WEEK, DEMO_VIDEOS, REELS, POSTERS.
- `src/i18n.jsx`: all website texts in English / Tamil / Hindi (hero lines are here now, not in config).
- `src/data.js`: services, prices, packages.
- `public/assets/awing.svg` and `logo-light.svg`: logo (dark and light versions). `project.svg` / `product.svg`: placeholders for the Projects and Products pages.
- Legal pages: `src/legal.js` (drafts, need legal review).

## Where to change pictures and videos (src/config.js)
- Hero video (big frame on the homepage): copy an .mp4 to `public/assets/videos/` and set `HERO_VIDEO='/assets/videos/hero.mp4'`. Empty = picture (`HERO_POSTER`).
- 7 demo videos: set `DEMO_VIDEOS` (order: Restaurant, Clinic, Clothing store, Real estate, Agency, Portfolio, School). `DEMO_POSTERS` are the pictures shown until a video is added.
- Pictures: `CAT_IMAGES` (services), `GALLERY` (sliding rows), `FAQ_IMAGES`. Files are in `public/assets/img/`.
- Logo: `public/assets/logo.svg`. Founder photo for the About page: `public/assets/about.jpg`.
- Prices are hidden everywhere except the Pricing page (`/pricing`): packages + calculator (prices come from `src/data.js`).
