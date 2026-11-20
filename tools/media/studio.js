/* Posters and reels for the dashboard. Text comes from the site's own copy (service names, category lines, tagline). */
const LD='/assets/logo.svg',LL='/assets/logo-light.svg',TAG='Build • Innovate • Grow',CITY='Chennai, Tamil Nadu, India';
const dark=t=>t==='A'||t==='B',logo=t=>dark(t)?LL:LD;
const bar=(w,c='',s='')=>`<span class="bar ${c}" style="width:${w}px;${s}"></span>`;
const ic={heart:'<path d="M12 20s-7-4.4-7-9.6C5 7.6 7 6 9 6c1.3 0 2.4.7 3 1.7C12.6 6.7 13.7 6 15 6c2 0 4 1.6 4 4.4C19 15.6 12 20 12 20z"/>',chat:'<path d="M5 6h14v10H10l-4 3v-3H5z"/>',send:'<path d="M4 11l16-7-6 16-3-6z"/>',mail:'<path d="M3 6h18v12H3z"/><path d="M3 7l9 7 9-7"/>',cur:'<path d="M5 3v16l4.5-3.6L12.6 22l3-1.4-3-6.4H18z" fill="#fff" stroke="#000" stroke-width="1.4"/>'};
const svg=(p,sz=34,st='#111')=>`<svg viewBox="0 0 24 24" width="${sz}" height="${sz}" fill="none" stroke="${st}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${p}</svg>`;

/* ---------- poster visuals ---------- */
const V=[
/* 0 Brand Identity Kit */()=>`
 <div class="abs" style="left:560px;top:6px;font-size:150px;font-weight:600;letter-spacing:-.05em;color:#660016;line-height:1">Aa<div style="font-size:22px;letter-spacing:.14em;font-weight:500;color:#3a2a2e;margin-top:4px">SORA · 300–700</div></div>
 <div class="abs sh" style="left:84px;top:36px;width:440px;height:262px;border-radius:26px;background:#0b0b0d;transform:rotate(-6deg);display:flex;align-items:center;justify-content:center;gap:18px;color:#fff;font-size:46px;font-weight:700;letter-spacing:.06em"><img src="${LL}" style="height:70px">QYRIXX</div>
 <div class="abs sh" style="left:300px;top:214px;width:440px;height:262px;border-radius:26px;background:#fff;transform:rotate(4deg);padding:36px"><img src="${LD}" style="height:50px">
  <div style="margin-top:62px">${bar(210,'k')}${bar(150,'','margin-top:16px')}${bar(250,'','margin-top:10px')}</div></div>
 <div class="abs sh" style="left:800px;top:52px;width:212px;border-radius:26px;background:#fff;padding:18px;display:grid;gap:12px;font-size:19px;font-weight:600;color:#111">
  ${[['#660016','Maroon'],['#0c0c0c','Black'],['#c3e3fc','Sky'],['#ffffff','White']].map(([c,n])=>`<div style="display:flex;align-items:center;gap:14px"><i style="width:62px;height:62px;border-radius:16px;background:${c};border:1px solid #e3e6ee"></i><span>${n}<br><small style="font-weight:400;color:#667;font-size:15px">${c.toUpperCase()}</small></span></div>`).join('')}</div>
 <div class="abs sh grad" style="left:640px;top:330px;width:150px;height:150px;border-radius:50%;display:grid;place-items:center;transform:rotate(-10deg)"><img src="${LL}" style="width:92px"></div>`,
/* 1 Social Media Poster */()=>`
 <div class="phone" style="left:96px;top:6px"><div class="scr" style="padding:62px 0 0">
  <div style="display:flex;align-items:center;gap:12px;padding:0 18px 14px"><i class="grad" style="width:44px;height:44px;border-radius:50%;display:grid;place-items:center"><img src="${LL}" style="width:26px"></i><b style="font-size:19px">qyrixx</b></div>
  <div style="width:372px;height:372px;background:#0b0b0d;color:#fff;padding:30px;display:flex;flex-direction:column;justify-content:space-between"><img src="${LL}" style="width:58px">
   <div style="font-size:50px;font-weight:600;line-height:1.02;letter-spacing:-.04em">Build.<br>Innovate.<br><span style="color:#e2506b">Grow.</span></div></div>
  <div style="display:flex;gap:16px;padding:14px 18px">${svg(ic.heart)}${svg(ic.chat)}${svg(ic.send)}</div>
  <div style="padding:0 18px">${bar(230,'k')}${bar(300,'','margin-top:12px')}</div></div></div>
 <div class="abs sh" style="left:560px;top:26px;width:330px;height:330px;border-radius:30px;background:#fff;color:#660016;padding:34px;transform:rotate(5deg);font-size:47px;font-weight:600;line-height:1.04;letter-spacing:-.04em;display:flex;flex-direction:column;justify-content:space-between">Create.<br>Build.<br>Launch.<br>Grow.<img src="${LD}" style="width:54px;align-self:flex-end;margin-top:-58px"></div>
 <div class="abs sh" style="left:650px;top:400px;width:330px;height:330px;border-radius:30px;background:#0b0b0d;transform:rotate(-4deg);display:grid;place-items:center"><img src="${LL}" style="width:170px"></div>`,
/* 2 Landing Page */()=>`
 <div class="browser sh" style="left:72px;top:6px;width:936px;height:478px"><div class="bt"><i></i><i></i><i></i><u>www.yourbusiness.in</u></div>
  <div style="display:flex;align-items:center;gap:26px;padding:20px 34px"><img src="${LD}" style="height:30px">${bar(70)}${bar(70)}${bar(70)}<span class="pill" style="margin-left:auto;font-size:15px;padding:10px 22px">Start a Project</span></div>
  <div style="display:grid;grid-template-columns:1.1fr .9fr;gap:30px;padding:14px 34px 0;align-items:center">
   <div><div style="font-size:45px;font-weight:600;line-height:1.06;letter-spacing:-.035em">Turn your ideas into digital experiences.</div>
    <div style="margin:18px 0 22px">${bar(330)}${bar(250,'','margin-top:11px')}</div>
    <span class="pill" style="font-size:16px;padding:12px 26px">Start a Project</span> <span class="pill m" style="font-size:16px;padding:12px 26px;margin-left:8px">Get a Quote</span></div>
   <div class="grad" style="height:236px;border-radius:24px;position:relative;overflow:hidden"><i style="position:absolute;right:34px;top:30px;width:64px;height:64px;border-radius:50%;background:#fff;opacity:.9"></i><i style="position:absolute;left:-10px;right:-10px;bottom:-70px;height:170px;background:#fff;opacity:.22;transform:rotate(-8deg)"></i></div></div></div>`,
/* 3 Figma UI/UX Design */()=>`
 <div class="abs sh" style="left:72px;top:6px;width:936px;height:478px;border-radius:24px;background:#1b1c20;overflow:hidden">
  <div class="abs" style="left:0;top:0;bottom:0;width:66px;background:#25262c;display:grid;align-content:start;gap:16px;padding:22px 16px">${[1,0,0,0,0].map(o=>`<i style="width:34px;height:34px;border-radius:9px;background:${o?'#d0324f':'#3a3c45'}"></i>`).join('')}</div>
  <div class="abs" style="left:112px;top:30px;color:#8b8e99;font-size:16px">Wireframe</div>
  <div class="abs" style="left:112px;top:60px;width:300px;height:380px;border-radius:14px;border:2px dashed #555863;padding:22px">
   <i style="display:block;height:20px;width:120px;border:2px solid #555863;border-radius:6px"></i><i style="display:block;height:130px;margin:18px 0;border:2px solid #555863;border-radius:10px;background:linear-gradient(to top right,transparent 49.5%,#555863 49.5%,#555863 50.5%,transparent 50.5%)"></i>
   ${[200,150,220].map(w=>`<i style="display:block;height:12px;width:${w}px;border:2px solid #555863;border-radius:6px;margin-top:12px"></i>`).join('')}<i style="display:block;height:38px;width:120px;border:2px solid #555863;border-radius:19px;margin-top:22px"></i></div>
  <div class="abs" style="left:470px;top:30px;color:#fff;font-size:16px">Design</div>
  <div class="abs" style="left:470px;top:60px;width:300px;height:380px;border-radius:14px;background:#fff;padding:22px;outline:3px solid #d0324f;outline-offset:3px">
   <img src="${LD}" style="height:22px;display:block"><div class="grad" style="height:130px;margin:16px 0;border-radius:12px"></div>
   ${bar(200,'k')}${bar(150,'','margin-top:12px')}${bar(220,'','margin-top:10px')}<span class="pill m" style="width:120px;height:38px;margin-top:20px;font-size:14px">Start</span></div>
  <div class="abs" style="right:0;top:0;bottom:0;width:128px;background:#25262c;padding:26px 20px;display:grid;align-content:start;gap:16px">
   <i class="bar" style="width:70px;background:#555863;height:10px"></i>${['#660016','#0c0c0c','#c3e3fc','#fff'].map(c=>`<div style="display:flex;gap:10px;align-items:center"><i style="width:30px;height:30px;border-radius:50%;background:${c};border:1px solid #555863"></i><i class="bar" style="width:44px;height:8px;background:#555863"></i></div>`).join('')}</div>
  <div class="abs" style="left:742px;top:326px"><svg viewBox="0 0 24 24" width="46" height="46">${ic.cur}</svg><span class="pill m" style="font-size:15px;padding:7px 14px;margin:-6px 0 0 30px;display:flex">QYRIXX</span></div></div>`,
/* 4 Email Marketing */()=>`
 <div class="abs" style="left:96px;top:60px;width:560px;height:380px;border-radius:26px;background:#fff;opacity:.28;transform:rotate(-7deg)"></div>
 <div class="abs" style="left:430px;top:60px;width:560px;height:380px;border-radius:26px;background:#fff;opacity:.28;transform:rotate(7deg)"></div>
 <div class="abs sh" style="left:190px;top:4px;width:700px;height:486px;border-radius:28px;background:#fff;padding:30px 36px;color:#111">
  <div style="display:flex;align-items:center;gap:16px"><i class="grad" style="width:58px;height:58px;border-radius:50%;display:grid;place-items:center"><img src="${LL}" style="width:34px"></i><div><b style="font-size:22px">QYRIXX</b>${bar(190,'','margin-top:8px;height:10px')}</div></div>
  <div class="grad" style="height:178px;border-radius:20px;margin:24px 0 22px;display:flex;align-items:center;padding:0 34px;color:#fff;font-size:42px;font-weight:600;letter-spacing:-.03em;line-height:1.05">Build • Innovate • Grow</div>
  ${bar(420,'k')}${bar(560,'','margin-top:14px')}${bar(480,'','margin-top:10px')}
  <span class="pill m" style="font-size:18px;padding:13px 32px;margin-top:24px">Start a Project</span></div>
 <div class="abs sh" style="left:820px;top:-6px;width:118px;height:118px;border-radius:50%;background:#0b0b0d;display:grid;place-items:center">${svg(ic.mail,58,'#fff')}</div>`,
/* 5 WhatsApp Automation */()=>{const m=(me,t)=>`<div style="align-self:${me?'flex-end':'flex-start'};max-width:270px;padding:13px 17px;border-radius:${me?'20px 20px 6px 20px':'20px 20px 20px 6px'};background:${me?'#660016':'#fff'};color:${me?'#fff':'#111'};font-size:18px;line-height:1.35;box-shadow:0 3px 10px rgba(0,0,0,.07)">${t}</div>`;return `
 <div class="phone" style="left:340px;top:6px"><div class="scr" style="background:#f3e9eb">
  <div style="background:#0b0b0d;color:#fff;padding:56px 20px 16px;display:flex;align-items:center;gap:13px"><i class="grad" style="width:46px;height:46px;border-radius:50%;display:grid;place-items:center"><img src="${LL}" style="width:28px"></i><div><b style="font-size:19px">Your business</b><div style="font-size:14px;color:#5fd38d">online</div></div></div>
  <div style="display:flex;flex-direction:column;gap:13px;padding:20px 16px">${m(0,'Hi, are you open today?')}${m(1,'Yes, we are open from 9 am to 9 pm.')}${m(1,'Would you like to book a slot?')}${m(0,'Yes please, 5 pm')}${m(1,'Done. Your 5 pm slot is booked ✓')}</div></div></div>
 <div class="abs sh" style="left:64px;top:120px;width:300px;border-radius:24px;background:#fff;padding:22px;display:flex;gap:16px;align-items:center;transform:rotate(-5deg)"><i class="grad" style="flex:none;width:54px;height:54px;border-radius:16px;display:grid;place-items:center">${svg(ic.chat,30,'#fff')}</i><div>${bar(150,'k')}${bar(110,'','margin-top:10px')}</div></div>
 <div class="abs sh" style="left:760px;top:300px;width:250px;border-radius:24px;background:#0b0b0d;padding:22px;display:flex;gap:14px;align-items:center;transform:rotate(5deg)"><i style="flex:none;width:50px;height:50px;border-radius:50%;background:#fff;display:grid;place-items:center">${svg('<path d="M6 12.5l4 4 8-9"/>',28,'#660016')}</i><div>${bar(110,'w')}${bar(76,'','margin-top:10px;background:#555')}</div></div>`},
/* 6 Resume Building */()=>{const sec=(t,rows)=>`<div style="font-size:15px;letter-spacing:.16em;font-weight:700;color:#660016;margin:24px 0 12px">${t}</div>${rows}`;return `
 <div class="abs" style="left:330px;top:26px;width:580px;height:760px;border-radius:16px;background:#fff;opacity:.2;transform:rotate(7deg)"></div>
 <div class="abs sh" style="left:250px;top:6px;width:580px;height:760px;border-radius:16px;background:#fff;padding:42px 46px;color:#111">
  <div style="display:flex;gap:22px;align-items:center;padding-bottom:24px;border-bottom:2px solid #eceff5"><i class="grad" style="width:92px;height:92px;border-radius:50%;position:relative;overflow:hidden;flex:none"><i style="position:absolute;left:31px;top:20px;width:30px;height:30px;border-radius:50%;background:#fff"></i><i style="position:absolute;left:16px;top:58px;width:60px;height:60px;border-radius:50%;background:#fff"></i></i>
   <div>${bar(250,'k','height:22px;border-radius:11px')}${bar(170,'m','margin-top:14px;height:12px')}${bar(210,'','margin-top:12px;height:10px')}</div></div>
  ${sec('EXPERIENCE',[[300,430,380],[260,410,330]].map(r=>`<div style="display:flex;gap:16px;margin-bottom:16px"><i style="width:12px;height:12px;border-radius:50%;background:#660016;margin-top:2px;flex:none"></i><div>${bar(r[0],'k')}${bar(r[1],'','margin-top:10px;height:10px')}${bar(r[2],'','margin-top:8px;height:10px')}</div></div>`).join(''))}
  ${sec('SKILLS',`<div style="display:flex;flex-wrap:wrap;gap:10px">${[110,84,130,96,120,90].map((w,i)=>`<i style="height:34px;width:${w}px;border-radius:17px;background:${i%3?'#eceff5':'#0b0b0d'}"></i>`).join('')}</div>`)}
  ${sec('EDUCATION',bar(280,'k')+bar(380,'','margin-top:10px;height:10px'))}</div>
 <div class="abs sh" style="left:770px;top:90px;width:104px;height:104px;border-radius:50%;background:#d0324f;display:grid;place-items:center">${svg('<path d="M6 12.5l4 4 8-9"/>',54,'#fff')}</div>`},
/* 7 Cloud Server Setup */()=>`
 <svg class="abs" style="left:310px;top:0;filter:drop-shadow(0 26px 40px rgba(30,42,85,.2))" width="460" height="250" viewBox="0 0 460 250"><g fill="#fff"><circle cx="130" cy="150" r="74"/><circle cx="236" cy="108" r="98"/><circle cx="338" cy="158" r="70"/><rect x="80" y="150" width="310" height="80" rx="40"/></g><path d="M186 150l34 34 62-70" fill="none" stroke="#660016" stroke-width="20" stroke-linecap="round" stroke-linejoin="round"/></svg>
 ${[0,1,2].map(i=>`<i class="abs" style="left:${226+i*312}px;top:${i===1?236:214}px;height:${i===1?86:108}px;border-left:5px dashed #660016;opacity:.55"></i>`).join('')}
 ${['Compute','Storage','Backup'].map((n,i)=>`<div class="abs sh" style="left:${72+i*320}px;top:326px;width:296px;height:150px;border-radius:24px;background:#0b0b0d;padding:24px 26px;color:#fff"><div style="display:flex;gap:10px;align-items:center"><i style="width:14px;height:14px;border-radius:50%;background:#5fd38d"></i><i style="width:14px;height:14px;border-radius:50%;background:#d0324f"></i><b style="margin-left:auto;font-size:18px;font-weight:500;color:#aab">${n}</b></div>
  ${bar(170,'','margin-top:26px;background:#2c2e36')}${bar(240,'','margin-top:12px;background:#2c2e36')}</div>`).join('')}`];

const POSTERS=[
 ['Brand Identity Kit','UI/UX & Branding','Interface design and brand assets.',['Logo and brand files in common formats','Consistent colours and typography','Revisions as set in your proposal'],'D','a'],
 ['Social Media Poster','UI/UX & Branding','Interface design and brand assets.',['Consistent colours and typography','Revisions as set in your proposal'],'A','b'],
 ['Landing Page','Website Development','Websites and web apps built to your content and goals.',['Mobile-friendly pages that fit every screen','Fast loading and clean code','Testing on mobile and desktop before handover'],'C','a'],
 ['Figma UI/UX Design','UI/UX & Branding','Interface design and brand assets.',['Figma screens ready for development','Consistent colours and typography','Revisions as set in your proposal'],'B','a'],
 ['Email Marketing','Digital Marketing','Marketing and content to grow your audience.',['A clear monthly plan and calendar','Content and creatives prepared for you','A performance report each month'],'A','a'],
 ['WhatsApp Automation','AI & Automation','AI assistants and automation for repetitive work.',['Built around your own business questions','Hand-over to a human when the bot is unsure'],'D','b'],
 ['Resume Building','Career Services','Resume, portfolio and project help for job seekers and students.',['Resume written for your target role','LinkedIn profile review'],'B','b'],
 ['Cloud Server Setup','Hosting & Cloud','Setup, migration and management of your hosting and cloud.',['Setup on AWS, Azure or Google Cloud','SSL, backups and monitoring','Domain and DNS connected'],'C','a']];
const poster=i=>{const [n,cat,sub,pts,t,lay]=POSTERS[i],P=`<ul class="pts">${pts.map(x=>`<li>${x}</li>`).join('')}</ul>`;
 return `<div class="po ${t} ${lay}"><div class="top"><img src="${logo(t)}">QYRIXX<span>${cat}</span></div><h1>${n}</h1><p class="sub">${sub}</p>
  ${lay==='a'?`<div class="vis"><div class="mid">${V[i]()}</div></div>${P}<div class="ft"><b>${TAG}</b><span>${CITY}</span></div>`:`${P}<div class="vis">${V[i]()}</div>`}</div>`};

/* ---------- reels (6 seconds, loop) ---------- */
const S=[
/* 0 Logo Design */()=>`
 <div class="abs fd" style="--d:.7s;left:60px;top:0;width:600px;height:430px;border-radius:30px;background:#17181c;background-image:linear-gradient(#24262c 1px,transparent 1px),linear-gradient(90deg,#24262c 1px,transparent 1px);background-size:40px 40px;background-position:-1px -1px"></div>
 <div class="abs fd" style="--d:1s;left:190px;top:95px;width:340px;height:240px;border:2px solid #d0324f"></div>
 ${[[190,95],[530,95],[190,335],[530,335]].map(([x,y],i)=>`<i class="abs pop" style="--d:${1.05+i*.08}s;left:${x-8}px;top:${y-8}px;width:16px;height:16px;background:#fff;border:2px solid #d0324f"></i>`).join('')}
 <img class="abs ty" style="--d:1.2s;--dur:1.3s;--n:26;left:215px;top:117px;width:290px" src="${LL}">
 ${['#660016','#d0324f','#c3e3fc','#fff'].map((c,i)=>`<i class="abs pop" style="--d:${2.8+i*.14}s;left:${60+i*98}px;top:470px;width:82px;height:82px;border-radius:50%;background:${c}"></i>`).join('')}
 <div class="abs pop" style="--d:3.5s;left:466px;top:462px;width:194px;height:98px;border-radius:22px;background:#fff;display:flex;align-items:center;justify-content:center;gap:10px;color:#111;font-weight:700;font-size:22px;letter-spacing:.06em"><img src="${LD}" style="height:34px">QYRIXX</div>`,
/* 1 Static Website */()=>`
 <div class="browser sh up" style="--d:.7s;left:48px;top:0;width:624px;height:610px"><div class="bt"><i></i><i></i><i></i><u>www.yourbusiness.in</u></div>
  <div class="fd" style="--d:1.1s;display:flex;align-items:center;gap:20px;padding:20px 28px"><img src="${LD}" style="height:28px">${bar(56)}${bar(56)}<span class="pill" style="margin-left:auto;width:112px;height:36px"></span></div>
  <div style="padding:10px 28px">${`<span class="bar k gw" style="--d:1.4s;width:400px;height:30px;border-radius:15px"></span><span class="bar k gw" style="--d:1.55s;width:290px;height:30px;border-radius:15px;margin-top:12px"></span><span class="bar gw" style="--d:1.8s;width:360px;margin-top:22px"></span><span class="bar gw" style="--d:1.9s;width:260px;margin-top:10px"></span>`}
   <span class="pill m pop" id="cta" style="--d:2.2s;width:170px;height:50px;margin-top:24px;font-size:17px;animation:pop .55s cubic-bezier(.3,1.5,.5,1) 2.2s both,press .4s ease 4.45s">Get a Quote</span></div>
  <div class="grad up" style="--d:2.5s;margin:14px 28px 0;height:150px;border-radius:20px;position:relative;overflow:hidden"><i style="position:absolute;right:30px;top:26px;width:50px;height:50px;border-radius:50%;background:#fff;opacity:.9"></i></div>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px;padding:16px 28px">${[0,1,2].map(i=>`<div class="up" style="--d:${2.9+i*.14}s;height:90px;border-radius:16px;background:#f1f4fb;padding:16px">${bar(90,'k','height:10px')}${bar(120,'','margin-top:10px;height:8px')}</div>`).join('')}</div></div>
 <svg class="abs" viewBox="0 0 24 24" width="54" height="54" style="left:520px;top:520px;--x:-330px;--y:-250px;animation:fd .3s ease 3.4s both,cur .9s cubic-bezier(.4,0,.2,1) 3.5s both;filter:drop-shadow(0 6px 8px rgba(0,0,0,.3))">${ic.cur}</svg>`,
/* 2 AI Chatbot Development */()=>{const m=(me,t,d,x='')=>`<div class="up" style="--d:${d}s;align-self:${me?'flex-end':'flex-start'};max-width:400px;padding:18px 24px;border-radius:${me?'28px 28px 8px 28px':'28px 28px 28px 8px'};background:${me?'#0b0b0d':'#f1f4fb'};color:${me?'#fff':'#111'};font-size:25px;line-height:1.3;${x}">${t}</div>`;return `
 <div class="abs sh up" style="--d:.7s;left:56px;top:0;width:608px;height:630px;border-radius:38px;background:#fff;overflow:hidden;color:#111">
  <div style="background:#0b0b0d;color:#fff;padding:24px 28px;display:flex;align-items:center;gap:16px"><i class="grad" style="width:60px;height:60px;border-radius:50%;display:grid;place-items:center"><img src="${LL}" style="width:36px"></i><div><b style="font-size:25px">Assistant</b><div style="font-size:18px;color:#5fd38d">online</div></div></div>
  <div style="display:flex;flex-direction:column;gap:16px;padding:26px 24px">
   ${m(1,'Do you deliver on Sundays?',1.1)}
   ${m(0,'Yes, we deliver every day from 9 am to 9 pm.',2.2)}
   ${m(1,'Great, book one for me',3.1)}
   ${m(0,`<span style="display:flex;gap:9px;padding:6px 2px">${[0,1,2].map(i=>`<i style="width:13px;height:13px;border-radius:50%;background:#d0324f;animation:blink 1s ease ${i*.16}s infinite"></i>`).join('')}</span>`,3.7,'animation:up .5s ease 3.7s both,out .25s ease 4.35s forwards;position:absolute;left:24px;top:406px')}
   ${m(0,'Done. Your order is confirmed ✓',4.5)}</div></div>`},
/* 3 SEO Services */()=>`
 <div class="abs sh up" style="--d:.7s;left:48px;top:0;width:624px;height:86px;border-radius:43px;background:#fff;display:flex;align-items:center;gap:18px;padding:0 30px;color:#111;font-size:27px;font-weight:500">
  <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="#d0324f" stroke-width="2.6" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5L21 21"/></svg><span class="ty" style="--d:1.1s;--dur:1.1s;--n:21">your business near me</span></div>
 <div class="abs sh up" style="--d:2.2s;left:48px;top:112px;width:624px;height:300px;border-radius:30px;background:#fff;padding:24px 28px;display:grid;gap:18px;align-content:start">
  ${[0,1,2].map(i=>`<div class="lf" style="--d:${2.45+i*.18}s;display:flex;gap:18px;align-items:center"><i style="flex:none;width:58px;height:58px;border-radius:16px;${i?'background:#f1f4fb':'background:linear-gradient(135deg,#d0324f,#660016)'}"></i><div>${bar(i?300:380,i?'':'k','height:16px;border-radius:8px')}${bar(i?230:280,'l','margin-top:12px;height:12px;background:#dfe5f0')}</div></div>`).join('')}</div>
 <div class="abs sh up" style="--d:3.2s;left:48px;top:436px;width:624px;height:196px;border-radius:30px;background:#0b0b0d;padding:22px 28px"><i class="bar" style="width:150px;background:#3a3c45"></i>
  <svg viewBox="0 0 560 120" width="568" height="122" style="margin-top:14px;overflow:visible"><path class="dr" style="--d:3.5s;--dur:1.2s" pathLength="1" d="M4 104 L90 86 L170 94 L260 60 L350 66 L440 30 L548 10" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/><circle class="pop" style="--d:4.65s;transform-box:fill-box;transform-origin:center" cx="548" cy="10" r="12" fill="#d0324f"/></svg></div>`,
/* 4 Company App */()=>{const scr=c=>`<div style="flex:none;width:372px;padding:66px 22px 0">${c}</div>`;return `
 <div class="up" style="--d:.7s;position:absolute;left:160px;top:0;width:400px;height:820px"><div class="phone" style="left:0;top:0;transform:scale(.8);transform-origin:top center"><div class="scr"><div style="display:flex;width:372px;height:100%;animation:slide 3.6s cubic-bezier(.5,0,.2,1) 1.4s both">
   ${scr(`${bar(120,'','height:10px')}${bar(220,'k','margin-top:12px;height:24px;border-radius:12px')}<div class="grad" style="height:170px;border-radius:24px;margin:24px 0;padding:22px">${bar(130,'w')}${bar(90,'w','margin-top:12px;opacity:.6')}</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">${[0,1,2,3].map(i=>`<i style="height:104px;border-radius:20px;background:${i===3?'#0b0b0d':'#f1f4fb'}"></i>`).join('')}</div>`)}
   ${scr(`${bar(160,'k','height:24px;border-radius:12px')}<div style="display:grid;gap:14px;margin-top:24px">${[0,1,2,3,4].map(i=>`<div style="display:flex;gap:14px;align-items:center;padding:14px;border-radius:20px;background:#f1f4fb"><i style="width:52px;height:52px;border-radius:50%;background:${['#660016','#0b0b0d','#d0324f','#c3e3fc','#660016'][i]}"></i><div>${bar(150,'k','height:11px')}${bar(100,'','margin-top:9px;height:9px')}</div></div>`).join('')}</div>`)}
   ${scr(`<i class="grad" style="display:block;width:110px;height:110px;border-radius:50%;margin:10px auto 18px"></i>${bar(180,'k','height:22px;border-radius:11px;margin:0 auto')}${bar(120,'','margin:12px auto 0')}<div style="display:flex;align-items:flex-end;gap:14px;height:210px;margin-top:34px;padding:22px;border-radius:24px;background:#f1f4fb">${[70,120,90,160,130].map((h,i)=>`<i style="flex:1;height:${h}px;border-radius:10px;background:${i%2?'#660016':'#d0324f'}"></i>`).join('')}</div><span class="pill" style="width:100%;height:56px;margin-top:22px"></span>`)}
  </div></div></div></div>
 <div class="abs sh pop" style="--d:2.6s;left:400px;top:70px;width:270px;border-radius:24px;background:#fff;padding:20px;display:flex;gap:14px;align-items:center"><i class="grad" style="flex:none;width:50px;height:50px;border-radius:15px;display:grid;place-items:center"><img src="${LL}" style="width:30px"></i><div>${bar(130,'k','height:12px')}${bar(96,'','margin-top:9px;height:10px')}</div></div>
 <div class="abs sh pop" style="--d:4s;left:50px;top:350px;width:104px;height:104px;border-radius:50%;background:#d0324f;display:grid;place-items:center">${svg('<path d="M6 12.5l4 4 8-9"/>',54,'#fff')}</div>`},
/* 5 Domain Setup */()=>`
 <div class="abs sh up" style="--d:.7s;left:48px;top:0;width:624px;height:92px;border-radius:46px;background:#fff;display:flex;align-items:center;gap:18px;padding:0 14px 0 22px;color:#111;font-size:29px;font-weight:600">
  <i class="grad" style="flex:none;width:52px;height:52px;border-radius:50%;display:grid;place-items:center">${svg('<rect x="6" y="11" width="12" height="9" rx="2" fill="#fff" stroke="none"/><path d="M8.5 11V8a3.5 3.5 0 0 1 7 0v3"/>',30,'#fff')}</i>
  <span class="ty" style="--d:1.1s;--dur:1.3s;--n:19">www.yourbusiness.in</span>
  <i class="pop" style="--d:2.6s;margin-left:auto;flex:none;width:92px;height:64px;border-radius:32px;background:#0b0b0d;display:grid;place-items:center">${svg('<path d="M6 12.5l4 4 8-9"/>',34,'#fff')}</i></div>
 ${['.com','.in','.tech','.store'].map((d,i)=>`<span class="abs pop sh" style="--d:${2.9+i*.13}s;left:${48+i*158}px;top:122px;width:142px;height:62px;border-radius:31px;display:grid;place-items:center;font-size:24px;font-weight:600;${i===1?'background:linear-gradient(135deg,#d0324f,#660016);color:#fff':'background:#fff;color:#111'}">${d}</span>`).join('')}
 <div class="browser sh up" style="--d:3.5s;left:48px;top:218px;width:624px;height:410px"><div class="bt"><i></i><i></i><i></i><u>www.yourbusiness.in</u></div>
  <i class="gw" style="--d:3.8s;display:block;height:5px;background:#d0324f;animation-duration:.5s"></i>
  <div class="fd" style="--d:4.2s;display:grid;grid-template-columns:1fr 1fr;gap:24px;padding:30px;align-items:center"><div>${bar(230,'k','height:26px;border-radius:13px')}${bar(170,'k','height:26px;border-radius:13px;margin-top:12px')}${bar(240,'','margin-top:22px')}${bar(190,'','margin-top:10px')}<span class="pill m" style="width:140px;height:46px;margin-top:22px"></span></div><div class="grad" style="height:260px;border-radius:22px"></div></div></div>`];
const REELS=[['Logo Design','UI/UX & Branding','B'],['Static Website','Website Development','C'],['AI Chatbot Development','AI & Automation','A'],['SEO Services','Digital Marketing','D'],['Company App','Mobile App Development','B'],['Domain Setup','Hosting & Cloud','C']];
const reel=i=>{const [n,cat,t]=REELS[i],w=n.split(' '),lines=w.length>2?[w.slice(0,-1).join(' '),w[w.length-1]]:w;
 return `<div class="re ${t}"><div class="rtop"><img src="${logo(t)}">QYRIXX</div>
  <h1>${lines.map((x,k)=>`<span class="up" style="--d:${.15+k*.14}s">${x}</span>`).join('')}</h1>
  <div class="stage">${S[i]()}</div>
  <div class="end up" style="--d:4.7s"><span>${TAG}</span><small>${cat.split(' ')[0]}</small></div>
  <div class="prog"><i></i></div><i class="veil"></i></div>`};

const q=new URLSearchParams(location.search),root=document.getElementById('root');
root.innerHTML=q.has('poster')?poster(+q.get('poster')):q.has('reel')?reel(+q.get('reel')):POSTERS.map((_,i)=>poster(i)).join('');
window.NAMES={posters:POSTERS.map(p=>p[0]),reels:REELS.map(r=>r[0])};
