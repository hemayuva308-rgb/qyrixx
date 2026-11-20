import {useEffect,useRef,useState} from 'react';
import {Link,useNavigate,useParams,useLocation,useSearchParams} from 'react-router-dom';
import {CATS,PKGS,price,isCustom,pshort,hash} from './data';import {CFG,IMG} from './config';import {sendLead} from './backend';import {useAuth,OK,preview} from './auth';
import {useI18n} from './i18n';import {Reveal,Parallax,Marquee,Circles,PageProgress} from './fx';import {Art} from './Art';import {DemoPlayer} from './Media';
import {Hero,ImageRows,ServicesShowcase,Demos,ProductWeek,Domain,Process,TeamWords,Packages,PackageCards,Calculator,FAQ,Cta} from './Sections';
export const useTitle=(t,d)=>useEffect(()=>{document.title=t;if(d)document.querySelector('meta[name=description]')?.setAttribute('content',d)},[t,d]);
export const Card=({to,b,p,x,k,v,blank,cls=''})=><Link className={'card '+cls} to={to} {...(blank?{target:'_blank',rel:'noopener'}:{})}>{k!=null&&<div className="card-art"><Art k={k} v={v}/></div>}<div className="t"><b>{b}</b>{p&&<p>{p}</p>}{x&&<div className="pr">{x}</div>}</div></Link>;

export function Home(){
 useTitle('QYRIXX | Build • Innovate • Grow','QYRIXX digital agency in Chennai: websites, software, mobile apps, UI/UX, AI automation, cloud and digital marketing.');
 return <><Hero/><ImageRows/><ServicesShowcase/><Demos/><ProductWeek/><Domain/><Process/><TeamWords/><Packages/><FAQ/><Cta/></>;
}

/* Pricing page: the 3 packages with prices + a calculator. This is the only place prices are shown. */
export function Pricing(){
 const {t}=useI18n();useTitle('Pricing | QYRIXX','QYRIXX packages and a pricing calculator.');
 return <><div className="w ph1"><h1>{t('pr.title')}</h1><p className="lead">{t('pr.sub')}</p></div>
  <section className="sec" style={{paddingTop:8}}><div className="w"><PackageCards prices/><p className="lead small">{t('pk.note')}</p></div></section>
  <section className="sec soft"><div className="w narrow"><Reveal className="sh"><h2>{t('calc.title')}</h2><p className="lead">{t('calc.sub')}</p></Reveal><Reveal><Calculator/></Reveal></div></section></>;
}

/* About page (opened from the About link in the menu). Put your photo at public/assets/about.jpg */
export function AboutPage(){
 const {t}=useI18n(),[ok,setOk]=useState(true);useTitle('About | QYRIXX','About QYRIXX and its founder.');
 return <section className="sec"><div className="w about-g">
  <Reveal dir="left" className="about-ph">{ok?<img src="/assets/img/hema.jpeg" alt="Hema Malini, founder of QYRIXX" onError={()=>setOk(false)}/>:<div className="about-mono" aria-hidden="true">HM</div>}</Reveal>
  <Reveal dir="right" className="about-tx"><h1>{t('sec.about')}</h1><p className="lead">{t('about.p')}</p><div className="box"><p>{t('about.m')}</p><p>{t('about.v')}</p></div>
   <Link className="pill" to="/contact">{t('hero.start')}</Link></Reveal></div></section>;
}

export function Services({embedded}){
 const {t,catName}=useI18n(),base=embedded?'/app':'';
 useTitle('Services | QYRIXX');const [sp]=useSearchParams(),[c,setC]=useState(0),[q,setQ]=useState(sp.get('q')||'');
 useEffect(()=>{setQ(sp.get('q')||'')},[sp]);
 const ql=q.trim().toLowerCase();
 const list=ql?CATS.flatMap((x,ci)=>x.items.filter(s=>s.n.toLowerCase().includes(ql)).map(s=>({s,ci}))):CATS[c].items.map(s=>({s,ci:c}));
 return <><div className="w ph1"><h1>{t('nav.services')}</h1><p className="lead">{t('nav.allSub')}</p>
  <label htmlFor="q" className="crumb" style={{display:'block'}}>{t('dash.search')}</label><input id="q" className="sr" type="search" value={q} onChange={e=>setQ(e.target.value)} placeholder="chatbot, SEO, logo"/>
  <div className="tabs" role="group" aria-label={t('dash.cats')}>{CATS.map((x,k)=><button key={x.slug} aria-pressed={!ql&&k===c} onClick={()=>{setQ('');setC(k)}}>{catName(k)}</button>)}</div></div>
  <section style={{paddingTop:8}}><div className="w"><div className="cards">{list.length?list.map(({s,ci},i)=><Reveal key={ci+s.slug} delay={(i%3)*60}><Card to={`${base}/services/${CATS[ci].slug}/${s.slug}`} b={s.n} p={catName(ci)} x={price(s)}/></Reveal>):<p>{t('dash.noRes')}</p>}</div></div></section></>;
}

export function Category({embedded}){
 const {cat}=useParams(),{t,catName}=useI18n(),ci=CATS.findIndex(c=>c.slug===cat),c=CATS[ci],base=embedded?'/app':'';useTitle(c?c.n+' | QYRIXX':'Not found',c&&c.b);
 if(!c)return <NotFound/>;
 return <><div className="w ph1 cat-h"><div><div className="crumb"><Link to={base+'/services'}>{t('nav.services')}</Link> / {catName(ci)}</div><h1>{catName(ci)}</h1><p className="lead">{c.b}</p></div>
  <div className="cat-art"><Art k={ci} v={hash(c.slug,6)}/></div></div>
  <section style={{paddingTop:8}}><div className="w"><div className="cards">{c.items.map((s,i)=><Reveal key={s.slug} delay={(i%3)*60}><Card to={`${base}/services/${c.slug}/${s.slug}`} b={s.n} p={isCustom(ci,s.n)?t('svcpage.cq'):t('svcpage.tap')} x={price(s)}/></Reveal>)}</div></div></section></>;
}

export function Service({embedded}){
 const {cat,svc}=useParams(),nav=useNavigate(),loc=useLocation(),{user}=useAuth(),{t,catName,getList}=useI18n(),dlg=useRef(),[dt,setDt]=useState(''),[nt,setNt]=useState(''),[bm,setBm]=useState(''),[bs,setBs]=useState({});
 const ci=CATS.findIndex(c=>c.slug===cat),c=CATS[ci],s=c&&c.items.find(x=>x.slug===svc);
 useTitle(s?`${s.n} | ${c.n} | QYRIXX`:'Not found',s&&`${s.n} from QYRIXX. ${c.b}`);
 if(!s)return <NotFound/>;
 const cu=isCustom(ci,s.n),v=hash(s.slug,6),base=embedded?'/app':'';
 const book=()=>user?dlg.current.showModal():nav('/login',{state:{from:loc.pathname}});
 const send=async e=>{e.preventDefault();const em=(user.email||bm).trim();
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em))return setBs({er:'Enter a valid email address so we can confirm your booking.'});
  setBs({busy:true});
  const r=await sendLead({type:'booking',name:user.displayName||em,email:em,phone:user.phoneNumber||'',category:c.n,service:s.n,date:dt,message:nt.trim(),uid:user.uid||''});
  setBs(r.ok?{done:true}:{er:r.error})};
 return <article className="svp">
  <PageProgress/>
  <header className="svp-hero"><Circles/><div className="w hero-in">
   <div className="crumb"><Link to={base+'/services'}>{t('nav.services')}</Link> / <Link to={base+'/services/'+c.slug}>{catName(ci)}</Link> / {s.n}</div>
   <h1>{s.n}</h1><p className="lead">{c.b}</p>
      <div className="row ctr"><button className="pill" onClick={book}>{t('svcpage.book')}</button><Link className="pill bl" to="/contact" state={{cat:ci,svc:s.n}}>{cu?t('svcpage.custom'):t('svcpage.quote')}</Link></div>
   <Parallax speed={.1} className="svp-art"><div className="hv"><Art k={ci} v={v} label={s.n}/></div></Parallax>
  </div></header>
  <div className="strip" aria-hidden="true"><Marquee speed={60}>{c.items.map(x=><span key={x.slug}>{x.n}</span>)}</Marquee></div>
  <section className="sec"><div className="w"><Reveal className="sh"><h2>{t('svcpage.get')}</h2></Reveal>
   <div className="get">{getList(ci).map((x,i)=><Reveal key={x} dir={i%2?'right':'left'} delay={i*80} className="get-i"><span className="gn">{i+1}</span><p>{x}</p></Reveal>)}</div></div></section>
  <section className="sec soft"><div className="w"><Reveal className="sh"><h2>{t('svcpage.look')}</h2></Reveal>
   <div className="look">
    <Parallax speed={.14}><Reveal dir="zoom"><Art k={ci} v={(v+1)%6}/></Reveal></Parallax>
    <Parallax speed={-.05}>{ci===0||ci===4?<div className="dpw"><DemoPlayer v={hash(s.slug,7)} t={t}/></div>:<Reveal dir="zoom" delay={120}><Art k={ci} v={(v+3)%6}/></Reveal>}</Parallax>
    <Parallax speed={.2}><Reveal dir="zoom" delay={200}><Art k={ci} v={(v+2)%6}/></Reveal></Parallax>
   </div></div></section>
  <Process/>
  <section className="sec tight"><div className="w narrow"><Reveal className="box"><b>{t('svcpage.price')}</b><ul><li>{t('svcpage.p1')}</li><li>{t('svcpage.p2')}</li><li>{t('svcpage.p3')}</li></ul></Reveal></div></section>
  <section className="sec"><div className="w"><Reveal className="sh"><h2>{t('svcpage.more',{c:catName(ci)})}</h2></Reveal>
   <div className="cards">{c.items.filter(x=>x!==s).slice(0,6).map((x,i)=><Reveal key={x.slug} delay={(i%3)*70}><Card to={`${base}/services/${c.slug}/${x.slug}`} b={x.n} x={price(x)}/></Reveal>)}</div></div></section>
  <dialog ref={dlg}><form id="bf" onSubmit={send}><h2 style={{fontSize:26}}>{t('svcpage.book')}: {s.n}</h2>
   <label htmlFor="dt">Preferred date (optional)</label><input id="dt" type="date" value={dt} onChange={e=>setDt(e.target.value)}/>
   <label htmlFor="nt">Notes</label><textarea id="nt" rows="3" value={nt} onChange={e=>setNt(e.target.value)}/>
   {!user?.email&&<><label htmlFor="bm">Email address *</label><input id="bm" type="email" autoComplete="email" value={bm} onChange={e=>setBm(e.target.value)}/></>}
   {bs.done?<p className="ok" role="status">Booking request sent. We will confirm the date by email.</p>:<p style={{color:'var(--mut)',fontSize:14}}>We confirm every booking by email.</p>}
   <p className="er" role="alert">{bs.er}</p>
   <div className="row">{!bs.done&&<button className="pill" type="submit" disabled={bs.busy}>{bs.busy?'Sending…':'Send booking request'}</button>}<button className="pill ol" type="button" onClick={()=>{dlg.current.close();setBs({})}}>{bs.done?'Close':'Cancel'}</button></div></form></dialog></article>;
}

export function Login(){
 useTitle('Log in | QYRIXX');const a=useAuth(),nav=useNavigate(),{state}=useLocation();
 const [ph,setPh]=useState(''),[otp,setOtp]=useState(''),[step,setStep]=useState(1),[er,setEr]=useState('');
 useEffect(()=>{if(a.user)nav(state?.from||'/app',{replace:true})},[a.user]);
 const send=async()=>{setEr('');if(!OK)return setEr('Login is not configured yet.');
  try{if(step===2){if(!/^\d{6}$/.test(otp))return setEr('Enter the 6-digit OTP.');await a.confirmOtp(otp);return}
   if(!/^[6-9]\d{9}$/.test(ph))return setEr('Enter a valid 10-digit mobile number.');await a.sendOtp(ph,'send-otp');setStep(2)}
  catch(e){setEr(step===2?'Wrong or expired OTP. Try again.':'Could not send OTP: '+(e.code||e.message))}};
 const g=async()=>{setEr('');if(!OK)return setEr('Login is not configured yet.');try{await a.google()}catch(e){setEr('Google sign-in failed: '+(e.code||e.message))}};
 return <div className="lg"><h1>Log in to QYRIXX</h1><p style={{color:'var(--mut)'}}>Log in to view projects and products and to book a service.</p>
  {!OK&&<div className="nt">Login is not configured yet. Add your Firebase keys in .env (see README.md).</div>}
  <label htmlFor="ph">Mobile number</label><div className="ph"><span>+91</span><input id="ph" inputMode="numeric" maxLength={10} autoComplete="tel-national" value={ph} onChange={e=>setPh(e.target.value.replace(/\D/g,''))}/></div>
  {step===2&&<><label htmlFor="otp">6-digit OTP</label><input id="otp" inputMode="numeric" maxLength={6} autoComplete="one-time-code" value={otp} onChange={e=>setOtp(e.target.value.replace(/\D/g,''))}/></>}
  <button className="pill" id="send-otp" onClick={send}>{step===2?'Verify OTP':'Send OTP'}</button><div className="or">or</div>
  <button className="pill ol" onClick={g}>Continue with Google</button>{!OK&&<button className="pill bl" onClick={()=>{preview(true);location.assign('/app')}}>Preview the dashboard (demo mode)</button>}<p className="er" role="alert">{er}</p></div>;
}

const BUD=['Not sure yet','Under ₹10,000','₹10,000–₹25,000','₹25,000–₹50,000','₹50,000–₹1,00,000','Above ₹1,00,000'],TL=['Flexible','Within 2 weeks','1 month','2–3 months','3+ months'];
export function Contact(){
 useTitle('Start a project | QYRIXX');const {state}=useLocation(),{user}=useAuth();
 const type=state?.type||'enquiry';
 const [v,setV]=useState({name:user?.displayName||'',email:user?.email||'',phone:'',co:'',cat:state?.cat??(type==='support'?7:''),svc:state?.svc??'',bud:BUD[0],tl:TL[0],msg:state?.msg||'',cm:'Email',pp:false,website:''}),[er,setEr]=useState({}),[st,setSt]=useState({});
 const set=k=>e=>setV(o=>({...o,[k]:e.target.type==='checkbox'?e.target.checked:e.target.value,...(k==='cat'?{svc:''}:{})}));
 const svcs=v.cat==='pkg'?PKGS.map(p=>p[0]):v.cat===''?[]:CATS[+v.cat].items.map(s=>s.n);
 const submit=async e=>{e.preventDefault();const E={},t=k=>String(v[k]).trim(),dg=t('phone').replace(/\D/g,'');
  if(!t('name'))E.name='Enter your name.';if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t('email')))E.email='Enter a valid email address.';
  if(t('phone')&&(!/^[+\d][\d\s-]*$/.test(t('phone'))||dg.length<10||dg.length>13))E.phone='Enter a valid phone number (10 digits) or leave it empty.';
  if(v.cat==='')E.cat='Choose a service category.';if(!t('msg'))E.msg='Describe your project.';if(!v.pp)E.pp='Please confirm you have read the Privacy Policy.';
  setEr(E);if(Object.keys(E).length)return;
  setSt({busy:true});
  const r=await sendLead({type,name:t('name'),email:t('email'),phone:t('phone'),company:t('co'),category:v.cat==='pkg'?'Package':CATS[+v.cat].n,service:v.svc,budget:v.bud,timeline:v.tl,message:t('msg')+(v.cm!=='Email'?`\n\nPreferred contact: ${v.cm}`:''),domain:state?.domain||'',uid:user?.uid||'',website:v.website});
  setSt(r.ok?{done:true}:{er:r.error});if(r.ok)scrollTo({top:0,behavior:'smooth'})};
 const F=({k,l,full,children})=><div className={'f'+(full?' full':'')}><label htmlFor={k}>{l}</label>{children}<span className="er">{er[k]}</span></div>;
 const title=type==='support'?'Get help':type==='domain'?'Set up your domain':'Start a project';
 if(st.done)return <div className="w ph1"><h1>Thank you</h1><div className="box sent" role="status"><p className="lead" style={{margin:0}}>We have received your request and will reply to <b>{v.email}</b> with the next steps, usually within one working day.</p></div>
  <div className="row" style={{marginTop:24}}><Link className="pill" to="/">Back to home</Link><button className="pill ol" type="button" onClick={()=>{setSt({});setV(o=>({...o,msg:''}))}}>Send another request</button></div></div>;
 return <div className="w ph1"><h1>{title}</h1><p className="lead">Tell us what you need and we reply by email with a written proposal. Email: <a href={'mailto:'+CFG.email}>{CFG.email}</a> · {CFG.city}</p>
  <form className="fm" onSubmit={submit} noValidate>
   <F k="name" l="Full name *"><input id="name" value={v.name} onChange={set('name')} autoComplete="name"/></F>
   <F k="email" l="Email address *"><input id="email" type="email" value={v.email} onChange={set('email')} autoComplete="email"/></F>
   <F k="phone" l="Phone number (optional)"><input id="phone" type="tel" value={v.phone} onChange={set('phone')} autoComplete="tel"/></F>
   <F k="co" l="Company / organisation"><input id="co" value={v.co} onChange={set('co')}/></F>
   <F k="cat" l="Service category *"><select id="cat" value={v.cat} onChange={set('cat')}><option value="">Select a category</option>{CATS.map((c,i)=><option key={c.slug} value={i}>{c.n}</option>)}<option value="pkg">Package</option></select></F>
   <F k="svc" l="Specific service"><select id="svc" value={v.svc} onChange={set('svc')}><option value="">Not sure / general enquiry</option>{svcs.map(n=><option key={n}>{n}</option>)}</select></F>
   <F k="bud" l="Estimated budget"><select id="bud" value={v.bud} onChange={set('bud')}>{BUD.map(b=><option key={b}>{b}</option>)}</select></F>
   <F k="tl" l="Preferred timeline"><select id="tl" value={v.tl} onChange={set('tl')}>{TL.map(b=><option key={b}>{b}</option>)}</select></F>
   <F k="msg" l="Project description / requirements *" full><textarea id="msg" rows="4" value={v.msg} onChange={set('msg')}/></F>
   <F k="cm" l="Preferred contact method"><select id="cm" value={v.cm} onChange={set('cm')}><option>Email</option><option>Phone call</option></select></F>
   <div className="hp" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" tabIndex={-1} autoComplete="off" value={v.website} onChange={set('website')}/></div>
   <F k="pp" l="" full><label style={{fontWeight:400}}><input id="pp" type="checkbox" style={{width:'auto',minHeight:0}} checked={v.pp} onChange={set('pp')}/> I have read the <Link to="/privacy">Privacy Policy</Link> *</label></F>
   <div className="full"><p className="er" role="alert">{st.er}</p><button className="pill" type="submit" disabled={st.busy}>{st.busy?'Sending…':'Send request'}</button></div></form></div>;
}

export const Gallery=({title,items,ph,empty})=>{useTitle(title+' | QYRIXX');return <><div className="w ph1"><h1>{title}</h1></div>
 <section style={{paddingTop:8}}><div className="w">{items.length?<div className="cards">{items.map(x=><a key={x.name} className="card" href={x.url||'#'}><img src={x.img||ph} alt="" loading="lazy"/><div className="t"><b>{x.name}</b><p>{x.desc}</p></div></a>)}</div>:<div className="box">{empty}</div>}</div></section></>};
export const Legal=({title,html})=>{useTitle(title+' | QYRIXX');return <div className="w ph1 legal" dangerouslySetInnerHTML={{__html:html}}/>};
export const NotFound=()=>{useTitle('Page not found | QYRIXX');return <div className="w ph1"><h1>Page not found</h1><p className="lead">That page does not exist.</p><Link className="pill" to="/">Go home</Link></div>};
