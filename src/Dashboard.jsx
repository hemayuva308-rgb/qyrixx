import {useEffect,useRef,useState} from 'react';
import {Link,NavLink,Outlet,useLocation,useNavigate} from 'react-router-dom';
import {CATS,find,pshort,hash} from './data';
import {IMG,wa,DEMO_VIDEOS,REELS,POSTERS} from './config';
import {useAuth} from './auth';
import {useI18n} from './i18n';
import {Reveal,Circles} from './fx';
import {MockSite,DemoPlayer,Reel,Poster} from './Media';
import {LangSwitch} from './Shell';
import Chatbot,{openChat} from './Chatbot';

const Chev=()=><i className="arr" aria-hidden="true"/>;

function Side({close}){
 const {t,catName}=useI18n(),{user}=useAuth(),loc=useLocation();
 const m=loc.pathname.match(/^\/app\/services\/([^/]+)/),[open,setOpen]=useState(m?m[1]:null);
 useEffect(()=>{if(m)setOpen(m[1])},[loc.pathname]);
 const name=user.displayName||user.phoneNumber||user.email||'';
 return <nav className="sd" aria-label={t('dash.menu')}>
  <div className="sd-me"><b>{name}</b><span>{t('dash.role')}</span></div>
  <NavLink end to="/app" className="sd-i" onClick={close}>{t('dash.discover')}</NavLink>
  <div className="sd-sep"/>
  <p className="sd-h">{t('dash.services')}</p>
  <NavLink end to="/app/services" className="sd-i" onClick={close}>{t('dash.viewAll')}</NavLink>
  {CATS.map((c,k)=><div key={c.slug} className={'sd-c'+(open===c.slug?' open':'')}>
   <button type="button" className="sd-i" aria-expanded={open===c.slug} onClick={()=>setOpen(open===c.slug?null:c.slug)}><span>{catName(k)}</span><Chev/></button>
   <div className="sd-sub"><ul>
    <li><NavLink end to={'/app/services/'+c.slug} onClick={close}>{t('nav.count',{n:c.items.length})}</NavLink></li>
    {c.items.map(s=><li key={s.slug}><NavLink to={`/app/services/${c.slug}/${s.slug}`} onClick={close}>{s.n}<small>{pshort(s)}</small></NavLink></li>)}
   </ul></div></div>)}
  <div className="sd-sep"/>
  <NavLink to="/app/projects" className="sd-i" onClick={close}>{t('dash.projects')}</NavLink>
  <NavLink to="/app/products" className="sd-i" onClick={close}>{t('dash.products')}</NavLink>
  <div className="sd-sep"/>
  <a className="sd-i" href={wa('Hi QYRIXX, I need help.')} target="_blank" rel="noopener">{t('dash.support')}</a>
  <Link className="sd-i" to="/" onClick={close}>{t('dash.home')}</Link>
 </nav>;
}

export default function Dashboard(){
 const {user,logout}=useAuth(),{t}=useI18n(),nav=useNavigate(),loc=useLocation(),[side,setSide]=useState(false),[menu,setMenu]=useState(false),[q,setQ]=useState(''),ref=useRef(null);
 useEffect(()=>{setSide(false);setMenu(false)},[loc.pathname]);
 useEffect(()=>{if(!menu)return;const c=e=>!ref.current?.contains(e.target)&&setMenu(false);addEventListener('click',c);return()=>removeEventListener('click',c)},[menu]);
 const ini=(user.displayName||user.email||user.phoneNumber||'U').trim().charAt(0).toUpperCase();
 return <div className="dsh">
  <header className="dsh-top">
   <button type="button" className="dsh-burger" aria-label={t('dash.menu')} aria-expanded={side} onClick={()=>setSide(!side)}>☰</button>
   <Link to="/app" className="dsh-logo" aria-label="QYRIXX"><img src="/assets/logo-light.svg" alt=""/><span>QYRIXX</span></Link>
   <form className="dsh-q" role="search" onSubmit={e=>{e.preventDefault();nav('/app/services?q='+encodeURIComponent(q))}}>
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M16 16l5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
    <input value={q} onChange={e=>setQ(e.target.value)} placeholder={t('dash.search')} aria-label={t('dash.search')}/></form>
   <span className="sp"/>
   <LangSwitch dark/>
   <button type="button" className="dsh-ai" onClick={()=>openChat()}><svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true"><path d="M12 2l2.2 6.3L20 10l-5.8 1.7L12 18l-2.2-6.3L4 10l5.8-1.7z" fill="currentColor"/></svg><span>{t('dash.ai')}</span></button>
   <div className="dsh-me" ref={ref}><button type="button" className="av" aria-haspopup="menu" aria-expanded={menu} onClick={()=>setMenu(!menu)} aria-label={user.displayName||user.email||''}>{ini}</button>
    <div className={'dsh-pop'+(menu?' open':'')} role="menu"><Link role="menuitem" to="/">{t('dash.home')}</Link><button role="menuitem" type="button" onClick={async()=>{await logout();nav('/')}}>{t('nav.logout')}</button></div></div>
  </header>
  <div className="dsh-body">
   <aside className={'dsh-side'+(side?' open':'')}><Side close={()=>setSide(false)}/></aside>
   {side&&<button type="button" className="dsh-scrim" aria-label="Close" onClick={()=>setSide(false)}/>}
   <main className="dsh-main">{user.demo&&<p className="dsh-demo">{t('dash.preview')}</p>}<Outlet/></main>
  </div>
  <Chatbot/>
 </div>;
}

/* ---------------- Discover ---------------- */
function Scroller({children}){
 const r=useRef(null);
 return <div className="scr"><div className="scr-in" ref={r}>{children}</div>
  <button type="button" className="scr-nx" aria-label="Next" onClick={()=>r.current?.scrollBy({left:r.current.clientWidth*.75,behavior:'smooth'})}><svg viewBox="0 0 24 24" width="20" height="20"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg></button></div>;
}
const Row=({title,right,children})=><section className="dr"><Reveal className="dr-h"><h2>{title}</h2>{right}</Reveal>{children}</section>;
const svcLink=({c,s})=>`/app/services/${c.slug}/${s.slug}`;

function Videos(){
 const {t}=useI18n(),names=t('tpl'),[cur,setCur]=useState(0),[play,setPlay]=useState(true);
 return <div className="dv">
  <div className="dv-main"><DemoPlayer key={cur} v={cur} src={DEMO_VIDEOS[cur]||undefined} playing={play} onToggle={()=>setPlay(p=>!p)} t={t}/></div>
  <ul className="dv-list">{names.map((n,k)=><li key={n}><button type="button" className={k===cur?'on':''} onClick={()=>{if(k===cur)setPlay(p=>!p);else{setCur(k);setPlay(true)}}}>
   <span className="dv-th static">{DEMO_VIDEOS[k]?<video src={DEMO_VIDEOS[k]} muted playsInline preload="metadata" tabIndex={-1} aria-hidden="true"/>:<MockSite v={k}/>}</span>
   <span className="dv-t"><b>{n}</b><em>{k===cur&&play?'❚❚ '+t('demo.pause'):'▶ '+t('demo.play')}</em></span></button></li>)}</ul></div>;
}

export function Discover(){
 const {t}=useI18n(),{user}=useAuth(),names=t('tpl'),name=(user.displayName||user.email||'').split(' ')[0].split('@')[0];
 const reels=REELS.map(find).filter(Boolean),posters=POSTERS.map(find).filter(Boolean);
 return <>
  <section className="banner"><Circles className="in"/><div className="banner-t"><small>{t('dash.hello',{n:name||'👋'})}</small><h1>{t('dash.bannerT')}</h1><p>{t('dash.bannerS')}</p></div>
   <Link className="pill wh" to="/contact">{t('dash.new')}</Link></section>
  <div className="dsh-in">
   <Row title={t('dash.templates')} right={<Link className="dr-l" to="/app/services/website-development">{t('dash.viewAll')}</Link>}>
    <Scroller>{names.map((n,k)=><Link key={n} className="tpl" to="/app/services/website-development/business-website"><span className="tpl-th static"><MockSite v={k}/></span><b>{n}</b></Link>)}</Scroller></Row>
   <Row title={t('dash.videos')} right={<span className="dr-l">{names.length}</span>}><Reveal dir="zoom"><Videos/></Reveal></Row>
   <Row title={t('dash.reels')}>
    <Scroller>{reels.map((f,i)=><Link key={f.s.slug} to={svcLink(f)} className="reel-l"><Reel ci={f.ci} v={hash(f.s.slug,6)} name={f.s.n} price={pshort(f.s)}/></Link>)}</Scroller></Row>
   <Row title={t('dash.posters')}>
    <div className="posters">{posters.map((f,i)=><Reveal key={f.s.slug} dir="zoom" delay={(i%4)*80}><Link to={svcLink(f)} className="poster-l"><Poster name={f.s.n} price={pshort(f.s)} v={i} ci={f.ci}/></Link></Reveal>)}</div></Row>
  </div></>;
}
