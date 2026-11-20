import {useEffect,useRef,useState} from 'react';
import {Link,NavLink,Navigate,Outlet,useLocation} from 'react-router-dom';
import {CATS,pshort,hash} from './data';
import {CFG,IMG} from './config';
import {useAuth} from './auth';
import {useI18n,LANGS} from './i18n';
import Chatbot from './Chatbot';

/* ---------- language switch (used on the website and in the dashboard) ---------- */
export function LangSwitch({dark}){
 const {lang,setLang,t}=useI18n(),[o,setO]=useState(false),ref=useRef(null),cur=LANGS.find(l=>l[0]===lang);
 useEffect(()=>{
  if(!o)return;
  const c=e=>!ref.current?.contains(e.target)&&setO(false),k=e=>e.key==='Escape'&&setO(false);
  addEventListener('click',c);addEventListener('keydown',k);return()=>{removeEventListener('click',c);removeEventListener('keydown',k)};
 },[o]);
 return <div className={'lang'+(dark?' dark':'')} ref={ref}>
  <button type="button" className="lang-b" aria-haspopup="listbox" aria-expanded={o} onClick={()=>setO(!o)} aria-label={t('nav.lang')}>
   <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="1.7"/><path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18" fill="none" stroke="currentColor" strokeWidth="1.7"/></svg>
   <span>{cur[2]}</span></button>
  <ul className={'lang-m'+(o?' open':'')} role="listbox" aria-label={t('nav.lang')}>
   {LANGS.map(([c,n])=><li key={c} role="option" aria-selected={c===lang}><button type="button" className={c===lang?'on':''} onClick={()=>{setLang(c);setO(false)}}>{n}{c===lang&&<i>✓</i>}</button></li>)}
  </ul></div>;
}

/* ---------- header ---------- */
function Header(){
 const {t,catName}=useI18n(),[mega,setMega]=useState(false),[nav,setNav]=useState(false),[ac,setAc]=useState(0),{user,logout}=useAuth(),loc=useLocation();
 useEffect(()=>{setMega(false);setNav(false)},[loc.pathname,loc.hash]);
 useEffect(()=>{
  const k=e=>e.key==='Escape'&&setMega(false),c=e=>!e.target.closest('.mega')&&!e.target.closest('#sv')&&setMega(false);
  addEventListener('keydown',k);addEventListener('click',c);return()=>{removeEventListener('keydown',k);removeEventListener('click',c)};
 },[]);
 const c=CATS[ac];
 return <header className="hd"><div className="bar">
  <Link className="logo" to="/" aria-label="QYRIXX home"><img src={IMG.logo} alt="Qyrixx"/><span></span></Link>
  <button className="burger" aria-label="Menu" aria-expanded={nav} onClick={()=>setNav(!nav)}>☰</button>
  <div className={'nvs'+(nav?' open':'')}>
   <button className="nv" id="sv" aria-expanded={mega} aria-controls="mega" onClick={()=>setMega(!mega)}>{t('nav.services')} <i className="ch"/></button>
   <NavLink className="nv" to="/app/projects">{t('nav.projects')}</NavLink><NavLink className="nv" to="/app/products">{t('nav.products')}</NavLink>
   <NavLink className="nv" to="/pricing">{t('nav.pricing')}</NavLink><i className="sep"/><NavLink className="nv" to="/about">{t('nav.about')}</NavLink><Link className="nv" to="/contact">{t('nav.contact')}</Link>
   <span className="sp"/>
   <LangSwitch/>
   {user?<><Link className="login" to="/app">{t('nav.dashboard')}</Link><button className="login" onClick={logout}>{t('nav.logout')}</button></>:<Link className="login" to="/login" state={{from:loc.pathname}}>{t('nav.login')}</Link>}
   <Link className="pill" to="/contact">{t('nav.start')}</Link>
   <div className={'mega'+(mega?' open':'')} id="mega"><div className="mg">
    <ul className="mg-cats" aria-label={t('nav.pick')}>{CATS.map((x,k)=><li key={x.slug}>
     <button type="button" className={k===ac?'on':''} aria-pressed={k===ac} onClick={()=>setAc(k)}><span className="n">{String(k+1).padStart(2,'0')}</span><span>{catName(k)}</span><i className="arr" aria-hidden="true"/></button></li>)}</ul>
    <div className="mg-subs" key={ac}>
     <div className="mg-hd"><div><b>{catName(ac)}</b><span>{c.b}</span></div><Link to={'/services/'+c.slug}>{t('nav.count',{n:c.items.length})} →</Link></div>
     <ul className="mg-grid">{c.items.map((s,i)=><li key={s.slug} style={{'--i':i}}>
      <Link to={`/services/${c.slug}/${s.slug}`} target="_blank" rel="noopener" title={t('nav.newTab')}><span>{s.n}</span><small>{pshort(s)}</small><em aria-hidden="true">↗</em></Link></li>)}</ul>
    </div>
   </div>
   <Link className="mb" to="/services"><b>{t('nav.all')} →</b><span>{t('nav.allSub')}</span></Link></div>
  </div></div></header>;
}

function Footer(){
 const {t,catName}=useI18n();
 return <footer><div className="w"><div className="fg">
  <div><div className="logo"><img src={IMG.logo} alt=""/><span>QYRIXX</span></div><p style={{color:'var(--mut)'}}>{CFG.tagline}. {t('foot.tag')} {CFG.city}.</p></div>
  <div><h6>{t('nav.services')}</h6>{CATS.map((c,k)=><Link key={c.slug} to={'/services/'+c.slug}>{catName(k)}</Link>)}</div>
  <div><h6>{t('nav.contact')}</h6><Link to="/contact">{t('hero.start')}</Link><a href={'mailto:'+CFG.email}>{CFG.email}</a>
   {Object.entries(CFG.social).filter(([,u])=>u).map(([k,u])=><a key={k} href={u} target="_blank" rel="noopener noreferrer">{k}</a>)}
   <Link to="/privacy">{t('foot.priv')}</Link><Link to="/terms">{t('foot.terms')}</Link></div></div>
  <p className="cp">© {new Date().getFullYear()} QYRIXX. {t('foot.rights')}</p></div></footer>;
}

export function PublicLayout(){
 return <><Header/><main><Outlet/></main><Footer/><Chatbot/></>;
}

export function Protected({children}){
 const {user,loading}=useAuth(),loc=useLocation();
 if(loading)return <div className="w ph1"><p>Checking login…</p></div>;
 return user?children:<Navigate to="/login" state={{from:loc.pathname}} replace/>;
}
