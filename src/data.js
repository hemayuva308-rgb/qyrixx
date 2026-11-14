/* Prices, services, packages: edit here, then run build.py */
export const U={m:'per month',t:'per task',d:'per design',s:'per session',c:'per campaign',w:'per workflow',p:'per project',v:'per video',k:'per package',a:'per audit',i:'per incident'};
export const CATS=[
['Website Development','Websites and web apps built to your content and goals.','Static Website|6999;Dynamic Website|12999;Business Website|16999;Portfolio Website|4999;Landing Page|3999;Blog Website|7999;E-commerce Website|19999;Custom Web Application|34999;Website Maintenance|1499|m;Website Redesign|5999;Software Development|29999'],
['UI/UX & Branding','Interface design and brand assets.','Figma UI/UX Design|4999;Website UI Design|3999;Mobile App UI Design|7999;Logo Design|1499;Brand Identity Kit|5999;Social Media Poster|499|d'],
['AI & Automation','AI assistants and automation for repetitive work.','AI Chatbot Development|7999;AI Voice Agent|14999;AI Lead Generation|4999;WhatsApp Automation|4999;AI Customer Support|11999;AI Sales Automation|11999;AI Content Generation Setup|2999;AI Document Processing|14999;RAG System|19999;AI Agent Development|14999;n8n Workflow Automation|4999|w;Email Automation|2999;AI Resume Automation|7999;AI Data Analysis|4999;AI Recommendation System|14999'],
['Business Solutions','Software to run day-to-day business operations.','CRM Solution|19999;ERP Solution|39999;Tuition Management System|12999;Inventory Management|12999;Billing & Invoice Solution|6999;HR Management System|14999;Appointment Management|6999;Project Management System|14999;Customer Support / Helpdesk|11999;Employee / Client Portal|14999;Business Analytics Dashboard|7999;Booking & Reservation System|11999;Order Management|11999;Procurement Management|19999;Business Process Automation|7999'],
['Mobile App Development','Mobile apps for your business or idea.','Company App|29999;E-commerce App|49999;Food Delivery App|59999;Education App|39999;Healthcare App|59999;Real Estate App|39999;Fitness App|39999;Service Booking App|39999;Travel App|49999;Finance / Expense App|39999;Logistics App|59999;Event Management App|39999;Social / Community App|69999;AI-Powered App|69999;Marketplace App|79999'],
['Digital Marketing','Marketing and content to grow your audience.','Social Media Management|7999|m;Social Media Marketing|5999|m;SEO Services|7999|m;Google Ads Management|4999|m;Social Media Ads Management|4999|m;Content Marketing|5999|m;Email Marketing|3999|m;Influencer Marketing Management|4999|c;Branding Strategy|5999|p;Marketing Strategy|7999|p;Lead Generation Campaign|5999|c;Video / Reel Editing|999|v;Graphic Design Package|2999|k;Website SEO Audit|2999|a;Digital Marketing Consultation|1999|s'],
['Hosting & Cloud','Setup, migration and management of your hosting and cloud.','Website Hosting Setup|1999;Domain Setup|999;Cloud Server Setup|4999;Cloud Migration|7999;AWS Setup|4999;Azure Setup|4999;Google Cloud Setup|4999;Database Setup|2999;Cloud Storage Setup|2999;Backup Setup|2999;SSL Setup|999;CDN Setup|2999;Deployment / CI-CD Setup|5999;Cloud Infrastructure Management|4999|m;Server Monitoring Setup|2999'],
['Support & Maintenance','Ongoing fixes, updates and technical support.','Website Bug Fixing|1499|t;Website Maintenance|1999|m;Web Application Maintenance|4999|m;Mobile App Maintenance|5999|m;Software Support|2999|m;Database Maintenance|2999|m;Security Updates|1999|t;Performance Optimization|3999|t;Backup & Recovery Setup|2999;Technical Consultation|1499|s;Feature Enhancement|2999|t;Emergency Support|2999|i'],
['Career Services','Resume, portfolio and project help for job seekers and students.','Resume Building|1499;Portfolio Website|4999;LinkedIn Profile Optimization|2999;Career Guidance|1999|s;Project Development|9999;AI Career Assistant Setup|14999']
].map(([n,b,l])=>({n,b,items:l.split(';').map(x=>{const [a,p,u]=x.split('|');return{n:a,p:+p,u:u||''}})}));
export const PKGS=[
['Website Starter Package','₹6,999–₹12,999','Static or dynamic website. Pages and features set in your proposal.'],
['Business Website Package','₹16,999–₹29,999','Business website with more pages and features, scoped per proposal.'],
['E-commerce Starter Package','₹19,999–₹39,999','Online store. Product count, payments and integrations set in your proposal.'],
['UI/UX Starter Package','₹4,999–₹9,999','Figma design. Screen count decides the price.'],
['Brand Launch Kit','₹5,999–₹12,999','Brand identity assets. Items included are listed in your proposal.'],
['Automation Starter Package','₹4,999–₹14,999','Workflow and email/WhatsApp automation. Number of workflows decides the price.'],
['AI Assistant Starter Package','₹7,999–₹19,999','AI chatbot or assistant. AI API and provider charges are extra.'],
['Cloud Launch Package','₹4,999–₹12,999','Hosting, domain and cloud setup. Cloud usage billed separately.'],
['Monthly Website Care','₹2,999–₹5,999/month','Ongoing maintenance. Scope of tasks agreed in writing.'],
['Digital Growth Package','₹14,999–₹29,999/month','Digital marketing services. Ad budgets are extra.'],
['Custom Software MVP','Starting at ₹49,999','First version of custom software. Request a custom quote.'],
['Mobile App MVP','Starting at ₹79,999','First version of a mobile app. Request a custom quote.']];
export const CUSTOM=/App$|ERP|CRM|Custom|Software Development|RAG|Agent|Procurement/;

export const slug=s=>s.toLowerCase().replace(/&/g,'and').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
CATS.forEach(c=>{c.slug=slug(c.n);c.items.forEach(s=>s.slug=slug(s.n))});
export const inr=n=>'\u20b9'+n.toLocaleString('en-IN');
export const price=s=>'';/* prices are hidden on the site; they are shown only on /pricing */
export const isCustom=(ci,n)=>ci===4||CUSTOM.test(n);

/* ---- helpers added for the new UI ---- */
export const find=name=>{for(let ci=0;ci<CATS.length;ci++){const s=CATS[ci].items.find(x=>x.n===name);if(s)return{ci,s,c:CATS[ci]}}return null};
export const findIn=(catName,name)=>{const ci=CATS.findIndex(c=>c.n===catName);if(ci<0)return null;const s=CATS[ci].items.find(x=>x.n===name);return s?{ci,s,c:CATS[ci]}:null};
const SH={m:'/month',t:'/task',d:'/design',s:'/session',c:'/campaign',w:'/workflow',p:'/project',v:'/video',k:'/package',a:'/audit',i:'/incident'};
export const pshort=s=>'';
export const totalServices=CATS.reduce((n,c)=>n+c.items.length,0);
export const minPrice=Math.min(...CATS.flatMap(c=>c.items.map(i=>i.p)));
/* stable 0..n-1 number from a string, used to give every service its own colours */
export const hash=(str,n)=>{let h=7;for(const ch of str)h=(h*31+ch.charCodeAt(0))>>>0;return h%n};
