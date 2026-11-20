/* Starting points for the website studio. Each template is a list of sections with sample content
   that the customer edits. Order matches the dashboard template cards and the demo videos. */
export const FONTS=[
 {k:'sora',n:'Sora',head:'Sora',body:'Sora',q:'Sora:wght@400;600;700;800'},
 {k:'serif',n:'Playfair + Inter',head:'Playfair Display',body:'Inter',q:'Playfair+Display:wght@600;700&family=Inter:wght@400;500;600'},
 {k:'poppins',n:'Poppins',head:'Poppins',body:'Poppins',q:'Poppins:wght@400;500;600;700'},
 {k:'dm',n:'DM Serif + DM Sans',head:'DM Serif Display',body:'DM Sans',q:'DM+Serif+Display&family=DM+Sans:wght@400;500;700'},
 {k:'grotesk',n:'Space Grotesk',head:'Space Grotesk',body:'Space Grotesk',q:'Space+Grotesk:wght@400;500;700'}];
export const PALETTES=[
 ['#e11d48','#fb7185','#fff7f8','#1a1014'],['#0ea5e9','#38bdf8','#f3fbff','#0b1b26'],['#111111','#8b5cf6','#faf8ff','#111111'],
 ['#116dff','#7dd3fc','#f5f8ff','#0b1530'],['#660016','#c3e3fc','#ffffff','#0c0c0c'],['#0f766e','#5eead4','#f3fbf9','#0b1f1d'],['#f59e0b','#38bdf8','#fffbf2','#1f1405']];

/* section types and what can be added from the "Add section" menu */
export const SECTION_TYPES={
 hero:{n:'Hero banner',d:()=>({kicker:'Welcome',title:'Your headline goes here',text:'One or two lines about what you offer and who it is for.',cta:'Get started',cta2:'Learn more',image:'',layout:'split'})},
 features:{n:'Highlights',d:()=>({title:'Why choose us',items:[{title:'First point',text:'A short line that explains it.'},{title:'Second point',text:'A short line that explains it.'},{title:'Third point',text:'A short line that explains it.'}]})},
 about:{n:'About',d:()=>({title:'About us',text:'Tell visitors your story: who you are, what you do and why you do it.',image:''})},
 list:{n:'List with prices',d:()=>({title:'What we offer',items:[{name:'Item one',text:'Short description',price:'₹499'},{name:'Item two',text:'Short description',price:'₹799'},{name:'Item three',text:'Short description',price:'₹999'}]})},
 gallery:{n:'Picture gallery',d:()=>({title:'Gallery',images:['','','','']})},
 testimonial:{n:'Customer review',d:()=>({quote:'Write what a happy customer said about you.',author:'Customer name'})},
 cta:{n:'Call to action',d:()=>({title:'Ready to get started?',text:'Tell visitors what to do next.',cta:'Contact us'})},
 contact:{n:'Contact',d:()=>({title:'Visit or contact us',text:'We reply within one working day.',address:'Your street address, City',email:'hello@yourbusiness.in',hours:'Mon–Sat, 10 am – 7 pm',cta:'Send a message'})}};

const sec=(type,data)=>({type,data:{...SECTION_TYPES[type]?.d?.(),...data}});
const T=(name,brand,pal,font,sections)=>({name,brand,theme:{primary:pal[0],accent:pal[1],bg:pal[2],ink:pal[3],font,radius:16},sections});

export const TEMPLATES=[
 T('Restaurant','Saffron',PALETTES[0],'serif',[
  sec('hero',{kicker:'Family kitchen · Since 2015',title:'Fresh food, cooked the way you remember',text:'Home-style meals made every morning with seasonal ingredients. Dine in, take away or order for delivery.',cta:'See the menu',cta2:'Book a table',layout:'split'}),
  sec('features',{title:'Why guests come back',items:[{title:'Fresh every day',text:'Vegetables and spices bought every morning.'},{title:'Family recipes',text:'Dishes passed down for three generations.'},{title:'Fast delivery',text:'Hot food at your door in about 30 minutes.'}]}),
  sec('list',{title:'Our menu',items:[{name:'Veg meals',text:'Rice, sambar, rasam, two curries, curd',price:'₹180'},{name:'Chicken biryani',text:'Seeraga samba rice, raita, brinjal curry',price:'₹260'},{name:'Masala dosa',text:'Crispy dosa with potato masala and chutneys',price:'₹90'},{name:'Filter coffee',text:'Strong, frothy and made fresh',price:'₹40'}]}),
  sec('gallery',{title:'From our kitchen'}),
  sec('testimonial',{quote:'The biryani tastes exactly like my grandmother made it. We order every Sunday.',author:'A regular guest'}),
  sec('contact',{title:'Visit us',text:'Walk in, call ahead or order online.',hours:'Every day, 11 am – 11 pm',cta:'Book a table'})]),
 T('Clinic','CareWell',PALETTES[1],'sora',[
  sec('hero',{kicker:'Family health clinic',title:'Care you can trust, close to home',text:'Experienced doctors, short waiting times and clear advice for the whole family.',cta:'Book an appointment',cta2:'Our services',layout:'split'}),
  sec('features',{title:'How we care for you',items:[{title:'Same-day visits',text:'Book in the morning, see a doctor the same day.'},{title:'Clear advice',text:'We explain every test and treatment in plain words.'},{title:'Family records',text:'Your history in one place for every visit.'}]}),
  sec('list',{title:'Services',items:[{name:'General consultation',text:'Check-ups, fever, cold and everyday care',price:'₹400'},{name:'Child health',text:'Vaccinations and growth check-ups',price:'₹500'},{name:'Health check package',text:'Blood tests, ECG and doctor review',price:'₹1,999'}]}),
  sec('about',{title:'Meet the doctor',text:'Write about the lead doctor: qualifications, experience and what patients can expect at their first visit.'}),
  sec('contact',{title:'Book a visit',text:'Choose a time that suits you. We confirm by email.',hours:'Mon–Sat, 9 am – 8 pm',cta:'Book an appointment'})]),
 T('Clothing store','Atelier',PALETTES[2],'dm',[
  sec('hero',{kicker:'New season',title:'Clothes made to be lived in',text:'Soft fabrics, honest prices and fits that work every day.',cta:'Shop new arrivals',cta2:'Our story',layout:'cover'}),
  sec('list',{title:'New arrivals',items:[{name:'Linen shirt',text:'Breathable linen in five colours',price:'₹1,499'},{name:'Cotton kurta',text:'Hand block print, relaxed fit',price:'₹1,299'},{name:'Wide-leg trousers',text:'High-rise, soft drape',price:'₹1,799'}]}),
  sec('gallery',{title:'The lookbook'}),
  sec('about',{title:'Our story',text:'Tell customers who makes your clothes, where the fabric comes from and what makes your store different.'}),
  sec('contact',{title:'Visit the store',text:'Try everything on before you buy.',hours:'Tue–Sun, 11 am – 9 pm',cta:'Get directions'})]),
 T('Real estate','Haven',PALETTES[3],'sora',[
  sec('hero',{kicker:'Homes in your city',title:'Find a home that fits your life',text:'Verified listings, honest advice and help with every step from visit to keys.',cta:'View homes',cta2:'Talk to an agent',layout:'split'}),
  sec('list',{title:'Featured homes',items:[{name:'2 BHK apartment',text:'1,050 sq ft · near metro · ready to move',price:'₹68 L'},{name:'3 BHK villa',text:'1,850 sq ft · private garden · gated community',price:'₹1.4 Cr'},{name:'Studio apartment',text:'520 sq ft · furnished · for rent',price:'₹18,000/mo'}]}),
  sec('features',{title:'Why buy with us',items:[{title:'Verified listings',text:'Every document checked before we list.'},{title:'Site visits',text:'We take you to every home you shortlist.'},{title:'Loan help',text:'We work with leading banks for you.'}]}),
  sec('testimonial',{quote:'They showed us only homes that matched our budget and handled all the paperwork.',author:'A happy home owner'}),
  sec('contact',{title:'Talk to an agent',text:'Tell us what you are looking for.',cta:'Request a call back'})]),
 T('Agency','Orbit',PALETTES[4],'grotesk',[
  sec('hero',{kicker:'Creative studio',title:'Brands, websites and campaigns that get noticed',text:'A small team of designers and developers who care about your results.',cta:'See our work',cta2:'Start a project',layout:'center'}),
  sec('features',{title:'What we do',items:[{title:'Brand identity',text:'Logos, colours and guidelines.'},{title:'Websites',text:'Fast, mobile-friendly websites.'},{title:'Marketing',text:'Social media and ad campaigns.'}]}),
  sec('about',{title:'How we work',text:'Describe your process: a discovery call, a written proposal, design rounds and a launch plan.'}),
  sec('testimonial',{quote:'They understood our business in one meeting and delivered ahead of time.',author:'A client'}),
  sec('cta',{title:'Have a project in mind?',text:'Tell us about it and get a proposal in two days.',cta:'Start a project'}),
  sec('contact',{title:'Say hello'})]),
 T('Portfolio','Folio',PALETTES[2].map((c,i)=>i===0?'#0f172a':i===1?'#a78bfa':c),'sora',[
  sec('hero',{kicker:'Designer & developer',title:'Hi, I design and build digital products',text:'I help start-ups and small businesses turn ideas into clear, usable websites and apps.',cta:'See my work',cta2:'Download CV',layout:'split'}),
  sec('gallery',{title:'Selected work'}),
  sec('about',{title:'About me',text:'Write a few lines about your background, the tools you use and the kind of work you enjoy.'}),
  sec('list',{title:'Experience',items:[{name:'Product designer',text:'Company name · 2023 – now',price:''},{name:'UI developer',text:'Company name · 2021 – 2023',price:''},{name:'Freelance',text:'Websites for local businesses · 2019 – 2021',price:''}]}),
  sec('contact',{title:'Let’s work together',text:'I reply to every message within a day.',address:'',hours:'',cta:'Email me'})]),
 T('School','Bright',PALETTES[6],'poppins',[
  sec('hero',{kicker:'Admissions open',title:'A happy place to learn and grow',text:'Small classes, caring teachers and a curriculum that builds confidence.',cta:'Apply now',cta2:'Visit the campus',layout:'split'}),
  sec('features',{title:'Why parents choose us',items:[{title:'Small classes',text:'Every child gets attention.'},{title:'Activities',text:'Sports, music, art and clubs.'},{title:'Safe campus',text:'CCTV, transport and trained staff.'}]}),
  sec('list',{title:'Programs',items:[{name:'Kindergarten',text:'Ages 3–5 · play-based learning',price:''},{name:'Primary school',text:'Grades 1–5',price:''},{name:'Middle school',text:'Grades 6–8',price:''}]}),
  sec('gallery',{title:'Life at school'}),
  sec('contact',{title:'Admissions',text:'Book a campus visit or ask about fees.',hours:'Mon–Fri, 9 am – 4 pm',cta:'Enquire now'})])];

const rid=()=>Math.random().toString(36).slice(2,9);
export function siteFromTemplate(k){
 const t=TEMPLATES[k]||TEMPLATES[0];
 return {name:`${t.brand} website`,template:t.name,brand:t.brand,theme:{...t.theme},status:'draft',
  sections:t.sections.map(s=>({id:rid(),type:s.type,data:JSON.parse(JSON.stringify(s.data))}))};
}
export const newSection=type=>({id:rid(),type,data:SECTION_TYPES[type].d()});
export const dupSection=s=>({...JSON.parse(JSON.stringify(s)),id:rid()});
