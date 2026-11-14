import {useEffect,useRef,useState} from 'react';
import {Link} from 'react-router-dom';
import {CATS,PKGS,pshort,hash,findIn,U,inr} from './data';
import {CFG,wa,PRODUCTS_OF_WEEK,DEMO_VIDEOS,DEMO_POSTERS,CAT_IMAGES,GALLERY,FAQ_IMAGES,HERO_VIDEO,HERO_POSTER,weekOfYear,daysToMonday} from './config';
import {useI18n} from './i18n';
import {Reveal,Parallax,WordSlider,useScrollProgress,reduce} from './fx';
import {DemoPlayer,Coverflow} from './Media';
import {openChat} from './Chatbot';

const Head=({h,p,id})=><Reveal className="sh"><h2 id={id}>{h}</h2>{p&&<p className="lead">{p}</p>}</Reveal>;

/* ---------------- Hero: headline + ask bar + one big video/image frame ---------------- */
function AskBar(){
 const {t}=useI18n(),words=t('hero.words'),[w,setW]=useState(0),[v,setV]=useState('');
 useEffect(()=>{if(reduce())return;const x=setInterval(()=>setW(n=>(n+1)%words.length),2600);return()=>clearInterval(x)},[words.length]);
 const go=e=>{e.preventDefault();openChat(v.trim()||`${t('hero.ask')} ${words[w]}`);setV('')};
 return <form className="ask" onSubmit={go}>
   <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M12 2l2.2 6.3L20 10l-5.8 1.7L12 18l-2.2-6.3L4 10l5.8-1.7zM19 15l1 2.6 2.6 1-2.6 1-1 2.6-1-2.6-2.6-1 2.6-1z" fill="currentColor"/></svg>
   <div className="ask-in"><input value={v} onChange={e=>setV(e.target.value)} aria-label={t('hero.ask')}/>
    {!v&&<span className="ask-ph" aria-hidden="true">{t('hero.ask')} <em key={w} className="shim">{words[w]}</em></span>}</div>
   <button className="pill" type="submit">{t('hero.askBtn')}</button>
  </form>;
}

function HeroStage(){
 const {t}=useI18n();
 return <div className="stage">
  <Parallax speed={.04} className="st-main"><div className="st-frame"><div className="st-bar"><i/><i/><i/></div>
   <DemoPlayer v={4} src={HERO_VIDEO||undefined} poster={HERO_POSTER} controls={!!HERO_VIDEO} t={t}/></div></Parallax>
 </div>;
}

export function Hero(){
 const {t}=useI18n(),heads=t('hero.h'),[i,setI]=useState(0),[out,setOut]=useState(false);
 useEffect(()=>{if(reduce())return;let a;const x=setInterval(()=>{setOut(true);a=setTimeout(()=>{setI(n=>(n+1)%heads.length);setOut(false)},450)},5200);return()=>{clearInterval(x);clearTimeout(a)}},[heads.length]);
 return <section className="hero"><div className="w hero-in">
  <h1 className={'rot'+(out?' out':'')}>{heads[i%heads.length]}</h1>
  <AskBar/>
  <HeroStage/>
 </div></section>;
}

/* ---------------- Image rows: two rows of pictures slide left / right as you scroll ---------------- */
export function ImageRows(){
 const ref=useRef(null);
 useEffect(()=>{
  const el=ref.current;if(!el)return;
  if(reduce()){el.style.setProperty('--p',.5);return}
  let raf=0;
  const upd=()=>{raf=0;const r=el.getBoundingClientRect(),h=innerHeight;el.style.setProperty('--p',Math.max(0,Math.min(1,(h-r.top)/(h+r.height))).toFixed(3))};
  const on=()=>{if(!raf)raf=requestAnimationFrame(upd)};
  upd();addEventListener('scroll',on,{passive:true});addEventListener('resize',on);
  return()=>{removeEventListener('scroll',on);removeEventListener('resize',on);cancelAnimationFrame(raf)};
 },[]);
 const a=[...GALLERY.slice(0,6),...GALLERY.slice(0,2)],b=[...GALLERY.slice(6),...GALLERY.slice(6,8)].reverse();
 return <div className="gal" ref={ref} aria-hidden="true">
  <div className="gal-r a">{a.map((s,i)=><img key={i} className="gal-i" src={s} alt="" loading="lazy"/>)}</div>
  <div className="gal-r b">{b.map((s,i)=><img key={i} className="gal-i" src={s} alt="" loading="lazy"/>)}</div>
 </div>;
}

/* ---------------- Services: pick a category, see its services (auto-advances) ---------------- */
export function ServicesShowcase(){
 const {t,catName}=useI18n(),[a,setA]=useState(0),[hold,setHold]=useState(false),c=CATS[a];
 useEffect(()=>{if(hold||reduce())return;const x=setTimeout(()=>setA(n=>(n+1)%CATS.length),7000);return()=>clearTimeout(x)},[a,hold]);
 return <section id="services" className="sec"><div className="w">
  <div className="sv" onMouseEnter={()=>setHold(true)} onMouseLeave={()=>setHold(false)} onFocus={()=>setHold(true)} onBlur={()=>setHold(false)}>
   <ul className="sv-list" role="tablist" aria-orientation="vertical">{CATS.map((x,k)=><li key={x.slug}>
    <button type="button" role="tab" aria-selected={k===a} className={k===a?'on':''} onClick={()=>setA(k)}>
     <span className="n">{String(k+1).padStart(2,'0')}</span><span className="nm">{catName(k)}</span>{k===a&&!hold&&<i className="fill" key={a}/>}</button></li>)}</ul>
   <div className="sv-panel" key={a} role="tabpanel">
    <div className="sv-art"><img className="sv-img" src={CAT_IMAGES[a%CAT_IMAGES.length]} alt={catName(a)} loading="lazy"/></div>
    <div className="sv-txt"><h3>{catName(a)}</h3><p>{c.b}</p>
     <ul className="sv-chips">{c.items.map((s,i)=><li key={s.slug} style={{'--i':i}}><Link to={`/services/${c.slug}/${s.slug}`} target="_blank" rel="noopener">{s.n}</Link></li>)}</ul>
     <Link className="pill" to={'/services/'+c.slug}>{t('svc.explore',{n:catName(a)})}</Link></div>
   </div>
  </div></div></section>;
}

/* ---------------- 7 demo videos (black & white), first month free ---------------- */
export function Demos(){
 const {t}=useI18n(),names=t('tpl'),[paused,setPaused]=useState(false);
 return <section id="demos" className="sec soft demos">
  <Coverflow n={names.length} label={names[0]}
   card={(k,on)=><DemoPlayer v={k} src={DEMO_VIDEOS[k]||undefined} poster={DEMO_POSTERS[k]} playing={on&&!paused} onToggle={()=>setPaused(p=>!p)} controls={on} t={t}/>}
   info={i=><><b>{names[i]}</b><span className="free">{t('demo.free')}</span><Link className="pill" to="/contact" state={{cat:0,svc:'Business Website'}}>{t('demo.use')}</Link></>}/>
 </section>;
}

/* ---------------- Product of the week (rotates every calendar week), no price ---------------- */
export function ProductWeek(){
 const {t,catName,getList}=useI18n(),idx=weekOfYear()%PRODUCTS_OF_WEEK.length,f=findIn(...PRODUCTS_OF_WEEK[idx]);
 if(!f)return null;
 const {ci,s,c}=f;
 return <section id="product" className="sec"><div className="w"><div className="potw">
  <Reveal dir="left" className="potw-txt">
   <span className="badge"><i/>{t('sec.potw')}</span>
   <h2>{s.n}</h2><p className="by">{t('potw.by')} · {catName(ci)}</p>
   <p className="lead">{t('potw.d')[idx]||c.b}</p>
   <ul className="ticks">{getList(ci).slice(0,3).map((x,i)=><li key={x} style={{'--i':i}}>{x}</li>)}</ul>
   <div className="potw-p"><small>{t('potw.next',{n:daysToMonday()})}</small></div>
   <div className="row"><button type="button" className="pill" onClick={()=>openChat(s.n)}>{t('potw.ask')}</button>
    <Link className="pill bl" to={`/services/${c.slug}/${s.slug}`} target="_blank" rel="noopener">{t('potw.view')}</Link></div>
  </Reveal>
  <Reveal dir="right" className="potw-art"><Parallax speed={.07}><img className="potw-img" src={CAT_IMAGES[ci%CAT_IMAGES.length]} alt={s.n} loading="lazy"/></Parallax></Reveal>
 </div></div></section>;
}

/* ---------------- Domain finder (uses Google's public DNS API from the browser) ---------------- */
const TLDS=['com','in','co.in','net','store','tech'];
async function lookup(d){
 try{const r=await fetch('https://dns.google/resolve?name='+encodeURIComponent(d)+'&type=NS',{headers:{accept:'application/dns-json'}});const j=await r.json();return j.Status===3?'free':j.Status===0?'taken':'unknown'}
 catch{return 'unknown'}
}
export function Domain(){
 const {t}=useI18n(),[v,setV]=useState(''),[res,setRes]=useState(null),[er,setEr]=useState('');
 const run=async e=>{
  e.preventDefault();
  const n=v.trim().toLowerCase().replace(/^https?:\/\//,'').replace(/^www\./,'').split(/[./]/)[0];
  if(!/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(n)){setEr(t('dom.bad'));return}
  setEr('');setRes(TLDS.map(x=>({d:n+'.'+x,s:'wait'})));
  setRes(await Promise.all(TLDS.map(async x=>({d:n+'.'+x,s:await lookup(n+'.'+x)}))));
 };
 const busy=res?.some(r=>r.s==='wait'),free=res?.find(r=>r.s==='free');
 return <section id="domain" className="sec soft"><div className="w dom">
  <div className="dom-l"><Head h={t('sec.domain')} p={t('sec.domainSub')}/>
   <Reveal delay={120}><form className="dom-f" onSubmit={run}><span className="www">www.</span>
    <input value={v} onChange={e=>setV(e.target.value)} placeholder={t('dom.ph')} aria-label={t('dom.ph')} maxLength={63}/>
    <button className="pill" type="submit" disabled={busy}>{busy?t('dom.checking'):t('dom.check')}</button></form>
    <p className="er" role="alert">{er}</p>
    {res&&<ul className="dom-r">{res.map((r,i)=><li key={r.d} className={r.s} style={{'--i':i}}>
     <span className="ic" aria-hidden="true">{r.s==='free'?'✓':r.s==='taken'?'×':r.s==='wait'?'':'?'}</span><b>{r.d}</b>
     <small>{r.s==='free'?t('dom.free'):r.s==='taken'?t('dom.taken'):r.s==='wait'?t('dom.checking'):t('dom.unknown')}</small></li>)}</ul>}
    {free&&!busy&&<a className="pill bl" href={wa(`Hi QYRIXX, I would like domain setup for ${free.d}.`)} target="_blank" rel="noopener">{t('dom.cta',{d:free.d})}</a>}
    <p className="note">{t('dom.note')}</p></Reveal></div>
  <Reveal dir="zoom" className="dom-art" aria-hidden="true">
   <svg viewBox="0 0 300 300" className="globe"><defs><linearGradient id="gl" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#38bdf8"/><stop offset="1" stopColor="#8b5cf6"/></linearGradient></defs>
    <circle cx="150" cy="150" r="108" fill="url(#gl)" opacity=".14"/><circle cx="150" cy="150" r="108" fill="none" stroke="url(#gl)" strokeWidth="3"/>
    <ellipse className="mer m1" cx="150" cy="150" rx="108" ry="40" fill="none" stroke="url(#gl)" strokeWidth="2"/>
    <ellipse className="mer m2" cx="150" cy="150" rx="40" ry="108" fill="none" stroke="url(#gl)" strokeWidth="2"/>
    <ellipse className="mer m3" cx="150" cy="150" rx="78" ry="108" fill="none" stroke="url(#gl)" strokeWidth="2" opacity=".6"/>
    <g className="orbit"><circle cx="150" cy="30" r="9" fill="#000"/></g><g className="orbit o2"><circle cx="258" cy="150" r="7" fill="#116dff"/></g>
    <rect x="86" y="132" width="128" height="36" rx="18" fill="#fff" stroke="#e3e8f2"/><text x="150" y="156" textAnchor="middle" fontSize="15" fontWeight="700" fill="#000" style={{fontFamily:'Sora, sans-serif'}}>.com  .in  .tech</text></svg>
  </Reveal></div></section>;
}

/* ---------------- Process: cards stack on top of each other as you scroll ---------------- */
export function Process({head=true}){
 const {t}=useI18n(),steps=t('proc');
 return <section id="process" className="sec"><div className="w">
  {head&&<Head h={t('sec.process')} p={t('sec.processSub')}/>}
  <ol className="stk">{steps.map(([h,p],i)=><li key={h} className="stk-c" style={{'--i':i}}><span className="stk-n">{String(i+1).padStart(2,'0')}</span><div><h3>{h}</h3><p>{p}</p></div></li>)}</ol>
 </div></section>;
}

export function TeamWords(){
 const {t}=useI18n();
 return <section className="sec tight"><Reveal className="w teamw"><p>{t('team.l')}</p><h2><WordSlider words={t('team.w')}/></h2></Reveal></section>;
}

/* ---------------- Packages: only 3 on the home page (no prices). Prices live on /pricing ---------------- */
export const HOME_PKGS=PKGS.slice(0,3);
export function PackageCards({prices}){
 const {t}=useI18n();
 return <div className="cards cols3">{HOME_PKGS.map((p,i)=><Reveal key={p[0]} delay={i*90}><div className="card pk"><b>{p[0]}</b><p>{p[2]}</p>{prices&&<div className="pr">{p[1]}</div>}
   <p><Link className="pill ol sm" to="/contact" state={{cat:'pkg',svc:p[0]}}>{t('pk.get')}</Link></p></div></Reveal>)}</div>;
}
export function Packages(){
 const {t}=useI18n();
 return <section id="packages" className="sec"><div className="w"><Head h={t('sec.packages')}/>
  <PackageCards/>
  <div className="row ctr" style={{marginTop:28}}><Link className="pill" to="/pricing">{t('pk.viewPricing')}</Link></div></div></section>;
}

/* ---------------- Pricing calculator (used on the Pricing page) ---------------- */
export function Calculator(){
 const {t,catName}=useI18n(),[ci,setCi]=useState(0),[sv,setSv]=useState(''),[rows,setRows]=useState([]);
 const items=CATS[ci].items,cur=items.find(x=>x.slug===sv)||items[0];
 const add=()=>setRows(r=>{const k=ci+'|'+cur.slug,f=r.find(x=>x.k===k);return f?r.map(x=>x.k===k?{...x,q:x.q+1}:x):[...r,{k,s:cur,ci,q:1}]});
 const setQ=(k,q)=>setRows(r=>q<1?r.filter(x=>x.k!==k):r.map(x=>x.k===k?{...x,q:Math.min(q,99)}:x));
 const sum=f=>rows.filter(f).reduce((n,r)=>n+r.s.p*r.q,0),one=sum(r=>r.s.u!=='m'),mon=sum(r=>r.s.u==='m');
 return <div className="calc">
  <div className="calc-pick">
   <label htmlFor="cc">{t('calc.cat')}</label><select id="cc" value={ci} onChange={e=>{setCi(+e.target.value);setSv('')}}>{CATS.map((c,k)=><option key={c.slug} value={k}>{catName(k)}</option>)}</select>
   <label htmlFor="cs">{t('calc.svc')}</label><select id="cs" value={cur.slug} onChange={e=>setSv(e.target.value)}>{items.map(s=><option key={s.slug} value={s.slug}>{s.n} – {inr(s.p)}{s.u?' '+U[s.u]:''}</option>)}</select>
   <button type="button" className="pill" onClick={add}>{t('calc.add')}</button></div>
  <div className="calc-out">
   {rows.length===0?<p className="calc-empty">{t('calc.empty')}</p>:<ul className="calc-l">{rows.map(r=><li key={r.k}><span className="cn">{r.s.n}<small>{inr(r.s.p)}{r.s.u?' '+U[r.s.u]:''}</small></span>
    <span className="cq"><button type="button" aria-label="−" onClick={()=>setQ(r.k,r.q-1)}>−</button><b>{r.q}</b><button type="button" aria-label="+" onClick={()=>setQ(r.k,r.q+1)}>+</button></span><span className="ct">{inr(r.s.p*r.q)}</span></li>)}</ul>}
   <div className="calc-t"><div><span>{t('calc.one')}</span><b>{inr(one)}</b></div>{mon>0&&<div><span>{t('calc.mon')}</span><b>{inr(mon)}</b></div>}</div>
   <p className="calc-n">{t('calc.note')}</p>
   <Link className="pill" to="/contact" state={rows[0]?{cat:rows[0].ci,svc:rows[0].s.n}:undefined}>{t('calc.quote')}</Link>
  </div></div>;
}

/* ---------------- FAQ: scroll and the questions open one by one, with a picture (like Wix) ---------------- */
export function FAQ({id='faq'}){
 const {t}=useI18n(),qs=t('faq'),n=qs.length,ref=useRef(null),[a,setA]=useState(0);
 useEffect(()=>{
  const upd=()=>{const el=ref.current;if(!el)return;const r=el.getBoundingClientRect(),tot=r.height-innerHeight;if(tot<=0)return;setA(Math.min(n-1,Math.max(0,Math.floor(-r.top/tot*n))))};
  upd();addEventListener('scroll',upd,{passive:true});addEventListener('resize',upd);
  return()=>{removeEventListener('scroll',upd);removeEventListener('resize',upd)};
 },[n]);
 const jump=i=>{const el=ref.current;if(!el)return;const r=el.getBoundingClientRect(),tot=r.height-innerHeight;scrollTo({top:scrollY+r.top+(i+.5)/n*tot,behavior:reduce()?'auto':'smooth'})};
 return <section id={id} className="faqs soft" ref={ref} style={{'--n':n}}><div className="faqs-st"><div className="w faqs-g">
  <div className="faqs-l"><h2>{t('sec.faq')}</h2>
   <ul>{qs.map(([q,ans],i)=><li key={q} className={'fq'+(a===i?' open':'')}>
    <button type="button" aria-expanded={a===i} aria-controls={'fa'+i} onClick={()=>jump(i)}><span>{q}</span></button>
    <div className="fq-a" id={'fa'+i} role="region"><div><p>{ans}</p></div></div></li>)}</ul></div>
  <div className="faqs-img" aria-hidden="true">{qs.map((_,i)=><img key={i} className={a===i?'on':''} src={FAQ_IMAGES[i%FAQ_IMAGES.length]} alt="" loading="lazy"/>)}</div>
 </div></div></section>;
}

/* ---------------- Final call to action: headline + one button ---------------- */
export function Cta(){
 const {t}=useI18n();
 return <section className="sec tight"><div className="w"><Reveal dir="zoom" className="cta"><div className="cta-in">
  <h2>{t('cta.t')}</h2>
  <div className="row ctr"><Link className="pill" to="/contact">{t('hero.start')}</Link></div></div></Reveal></div></section>;
}
