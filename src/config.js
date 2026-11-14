/* ===== Edit here ===== */
export const CFG={brand:'QYRIXX',tagline:'Build • Innovate • Grow',
 phone:'9941116919', wa:'919941116919', /* business number: confirm 9941116919 or 9943116919 */
 email:'qyrixx26@gmail.com',city:'Chennai, Tamil Nadu, India',
 firebase:{apiKey:import.meta.env.VITE_FIREBASE_API_KEY,authDomain:import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,projectId:import.meta.env.VITE_FIREBASE_PROJECT_ID,appId:import.meta.env.VITE_FIREBASE_APP_ID},
 headlines:['Design with impact. Deliver at scale.','Build smarter. Innovate faster.','Turn your ideas into digital experiences.','Technology that helps your business grow.','Create. Build. Launch. Grow.'],
 sub:'QYRIXX combines thoughtful design, modern development and intelligent automation to turn ideas into digital experiences.',
 social:{Instagram:'',LinkedIn:'',GitHub:''}};
/* Image slots: replace files in /public/assets with the same names */
export const IMG={logo:'/assets/logo.svg',about:'/assets/about.jpg',hero:'/assets/hero.svg',cat:i=>`/assets/cat-${i+1}.svg`,project:'/assets/project.svg',product:'/assets/product.svg'};
/* Visible only after login. Fields: name, desc, img (optional), url (optional) */
export const PROJECTS=[];
export const PRODUCTS=[];
export const wa=t=>`https://wa.me/${CFG.wa}?text=${encodeURIComponent(t)}`;

/* ===== New: edit these to change the homepage and dashboard ===== */
/* Product of the week rotates automatically by calendar week through this list: [category name, service name]
   (names must match src/data.js exactly) */
export const PRODUCTS_OF_WEEK=[
 ['Business Solutions','Billing & Invoice Solution'],
 ['AI & Automation','AI Chatbot Development'],
 ['Business Solutions','CRM Solution'],
 ['Mobile App Development','Food Delivery App'],
 ['Website Development','E-commerce Website']];

/* ===== VIDEOS (files are in public/assets/videos/) ===== */
/* Videos are videos: they go in the *_VIDEO / DEMO_VIDEOS lists. Pictures (.jpg) go in the *_POSTER / *_IMAGES lists. */

/* HERO VIDEO: big frame under the ask bar on the homepage */
export const HERO_VIDEO='/assets/videos/hemavideo.mp4';
export const HERO_POSTER='';   /* leave empty when a video is used */

/* 7 DEMO VIDEOS. Order of the cards:
   1 Restaurant, 2 Clinic, 3 Clothing store, 4 Real estate, 5 Agency, 6 Portfolio, 7 School
   Change the file names below to move a video to a different card. '' = show the picture from DEMO_POSTERS instead.
   (#t=0.1 just makes the first frame show before playing) */
export const DEMO_VIDEOS=[
 '/assets/videos/video1.mp4#t=0.1',   /* 1 Restaurant */
 '/assets/videos/video2.mp4#t=0.1',   /* 2 Clinic */
 '/assets/videos/video3.mp4#t=0.1',   /* 3 Clothing store */
 '/assets/videos/video4.mp4#t=0.1',   /* 4 Real estate */
 '/assets/videos/video5.mp4#t=0.1',   /* 5 Agency */
 '/assets/videos/intasia.mp4#t=0.1',  /* 6 Portfolio */
 ''];                                 /* 7 School (no video yet, shows picture) */
/* Optional picture for a demo card whose video is '' (same order as above), e.g. '/assets/img/school.jpg'.
   Left empty, the card shows the built-in animated demo of that kind of site. */
export const DEMO_POSTERS=[];

/* ===== PICTURES (files are in public/assets/img/) ===== */
/* Service categories (9, same order as src/data.js). Each category has its own built-in animated illustration
   in the brand colours, so no two look alike. To use your own picture for a category, put its path in that
   position, e.g. ['/assets/img/web.jpg','','', ...]. '' = built-in illustration. */
export const CAT_IMAGES=[];
/* Product of the week: built-in illustration per product. To use your own picture: {'CRM Solution':'/assets/img/crm.jpg'} */
export const PRODUCT_IMAGES={};

/* Pictures in the two sliding rows under the hero (need at least 8). Do NOT leave this empty. */
export const GALLERY=['molina','bakery','car','caras','elite','velvetique','kiko','luna','mamonde','springdale','finnegan','everwood'].map(n=>`/assets/img/${n}.jpg`);
/* Pictures beside the FAQ (one per question, changes as each question opens). Each question has a built-in
   illustration that matches its topic. To use your own picture for a question, put its path in that position. */
export const FAQ_IMAGES=[];

/* Reels shown in the dashboard (service names). Each one plays its video from public/assets/reels/<service-name>.mp4
   (cover picture: the .jpg with the same name). Posters use public/assets/posters/<service-name>.jpg.
   File names are the service name in lower case with dashes, e.g. 'Logo Design' -> logo-design.mp4.
   A service without a file falls back to the built-in animated card. To remake the files: tools/media/render.cjs */
export const mediaFile=(dir,name,ext)=>`/assets/${dir}/${name.toLowerCase().replace(/&/g,'and').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}.${ext}`;
export const REELS=['Logo Design','Static Website','AI Chatbot Development','SEO Services','Company App','Domain Setup'];
/* Posters shown in the dashboard: service names */
export const POSTERS=['Brand Identity Kit','Social Media Poster','Landing Page','Figma UI/UX Design','Email Marketing','WhatsApp Automation','Resume Building','Cloud Server Setup'];
export const weekOfYear=(d=new Date())=>{const t=new Date(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate()));const n=t.getUTCDay()||7;t.setUTCDate(t.getUTCDate()+4-n);const y=new Date(Date.UTC(t.getUTCFullYear(),0,1));return Math.ceil(((t-y)/864e5+1)/7)};
export const daysToMonday=(d=new Date())=>{const n=d.getDay()||7;return 8-n};