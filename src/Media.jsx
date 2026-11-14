import {useEffect,useRef,useState} from 'react';
import {Art,PAL} from './Art';
import {reduce} from './fx';

/* ---------- animated "website demo" (stands in for a recorded video) ---------- */
const TPL=[['Saffron','#e11d48','#fb7185','#fff1f2'],['CareWell','#0ea5e9','#38bdf8','#f0f9ff'],['Atelier','#111111','#8b5cf6','#faf5ff'],['Haven','#116dff','#7dd3fc','#eff6ff'],['Orbit','#8b5cf6','#116dff','#f5f3ff'],['Folio','#0f172a','#a78bfa','#f8fafc'],['Bright','#f59e0b','#38bdf8','#fffbeb']];
const Glyph=({v})=><svg viewBox="0 0 100 80" aria-hidden="true">{[
 <><circle cx="50" cy="40" r="30" fill="#fff"/><circle className="fa" cx="50" cy="40" r="20"/><circle cx="50" cy="40" r="8" fill="#fff" opacity=".6"/></>,
 <><rect className="fa" x="38" y="12" width="24" height="56" rx="6"/><rect className="fa" x="22" y="28" width="56" height="24" rx="6"/></>,
 <path className="fa" d="M30 26l20-10 20 10 8 10-12 6v26H34V42l-12-6z"/>,
 <><path className="fa" d="M14 40L50 10l36 30v30H14z"/><rect x="42" y="46" width="16" height="24" fill="#fff"/></>,
 <><circle className="fa" cx="34" cy="40" r="20"/><rect className="fb" x="50" y="20" width="36" height="36" rx="9"/></>,
 <><rect className="fa" x="14" y="12" width="34" height="26" rx="6"/><rect className="fb" x="52" y="12" width="34" height="26" rx="6"/><rect className="fb" x="14" y="42" width="34" height="26" rx="6"/><rect className="fa" x="52" y="42" width="34" height="26" rx="6"/></>,
 <><path className="fa" d="M12 22q19-9 38 0 19-9 38 0v44q-19-9-38 0-19-9-38 0z"/><path d="M50 22v44" stroke="#fff" strokeWidth="2"/></>][v%7]}</svg>;

export function MockSite({v=0}){
 const [name,a,b,tone]=TPL[v%TPL.length];
 return <div className="ms" style={{'--ma':a,'--mb':b,'--mt':tone}} aria-hidden="true">
  <div className="ms-nav"><b>{name}</b><i/><i/><i/><span/></div>
  <div className="ms-page">
   <div className="ms-hero"><div className="ms-h"><u/><u/><u/><s/></div><div className="ms-img"><Glyph v={v}/></div></div>
   <div className="ms-row">{[0,1,2].map(i=><div key={i} className="ms-card"><em/><u/><u/></div>)}</div>
   <div className="ms-band"><u/><u/></div>
   <div className="ms-row">{[0,1,2].map(i=><div key={i} className="ms-card"><em/><u/><u/></div>)}</div>
   <div className="ms-foot"/>
  </div>
  <span className="ms-cur"/>
 </div>;
}

const Ic=({p})=><svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">{p?<path d="M7 5h4v14H7zM13 5h4v14h-4z" fill="currentColor"/>:<path d="M8 5l11 7-11 7z" fill="currentColor"/>}</svg>;

/* Shows src (a real .mp4) if given, otherwise the animated demo. Click the button to pause or play. */
export function DemoPlayer({v=0,src,poster,playing,onToggle,controls=true,className='',t}){
 const vid=useRef(null),[own,setOwn]=useState(true),on=playing??own;
 useEffect(()=>{const el=vid.current;if(!el)return;on?el.play().catch(()=>{}):el.pause()},[on,src]);
 const tog=onToggle||(()=>setOwn(x=>!x));
 return <div className={'dp '+className+(on?'':' paused')}>
  {src?<video ref={vid} src={src} poster={poster} muted loop playsInline preload="metadata"/>:poster?<img src={poster} alt="" loading="lazy"/>:<MockSite v={v}/>}
  {controls&&src&&<button type="button" className="dp-btn" onClick={tog} aria-label={on?t('demo.pause'):t('demo.play')}><Ic p={on}/></button>}
  {src&&<div className="dp-bar"><i/></div>}
 </div>;
}

/* ---------- vertical reel card ---------- */
export function Reel({ci=0,v=0,name,price,className=''}){
 return <div className={'reel '+className}>
  <div className="reel-top"><span className="live"/>QYRIXX</div>
  <div className="reel-art"><Art k={ci} v={v}/></div>
  <div className="reel-cap"><b>{name}</b><span>{price}</span></div>
  <div className="reel-bar"><i/></div>
 </div>;
}

/* ---------- poster (SVG, no image files needed) ---------- */
const wrap=(s,n=14)=>{const out=[];let cur='';for(const w of s.split(' ')){if((cur+' '+w).trim().length>n&&cur){out.push(cur);cur=w}else cur=(cur+' '+w).trim()}if(cur)out.push(cur);return out.slice(0,3)};
export function Poster({name,price,v=0,ci=0}){
 const [a,b]=PAL[v%PAL.length],lay=v%4,lines=wrap(name),dark=lay===0||lay===2,fg=dark?'#fff':'#000',id='pg'+v+ci;
 return <svg className="poster" viewBox="0 0 300 375" role="img" aria-label={name+' '+price}>
  <defs><linearGradient id={id} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={a}/><stop offset="1" stopColor={b}/></linearGradient></defs>
  <rect width="300" height="375" fill={lay===0?`url(#${id})`:lay===2?'#000':lay===3?'#fff':'#f5f7ff'}/>
  {lay===0&&<><circle className="p-spin" cx="230" cy="86" r="70" fill="#fff" opacity=".16"/><circle cx="60" cy="330" r="90" fill="#fff" opacity=".12"/></>}
  {lay===1&&<><circle className="p-bob" cx="226" cy="96" r="62" fill={a} opacity=".85"/><rect className="p-bob2" x="20" y="150" width="90" height="90" rx="28" fill={b} opacity=".75"/></>}
  {lay===2&&<><circle className="p-spin" cx="150" cy="120" r="78" fill="none" stroke={`url(#${id})`} strokeWidth="14" strokeDasharray="60 22"/><circle cx="150" cy="120" r="34" fill={`url(#${id})`}/></>}
  {lay===3&&<><path d="M0 0h300v190H0z" fill={`url(#${id})`} opacity=".9"/><circle className="p-bob" cx="150" cy="190" r="56" fill="#fff"/><circle cx="150" cy="190" r="34" fill={`url(#${id})`}/></>}
  <text x="24" y={lay===3?262:250} fill={fg} fontSize="30" fontWeight="700" style={{fontFamily:'Sora, system-ui, sans-serif'}}>{lines.map((l,i)=><tspan key={i} x="24" dy={i?34:0}>{l}</tspan>)}</text>
  {price&&<><rect x="24" y="322" width={22+price.length*10.5} height="34" rx="17" fill={dark?'#fff':'#000'}/>
  <text x="38" y="344" fill={dark?'#000':'#fff'} fontSize="15" fontWeight="700" style={{fontFamily:'Sora, system-ui, sans-serif'}}>{price}</text></>}
  <text x="276" y="344" textAnchor="end" fill={fg} opacity=".7" fontSize="13" fontWeight="700" style={{fontFamily:'Sora, system-ui, sans-serif'}}>QYRIXX</text>
 </svg>;
}

/* ---------- coverflow: centre card big, neighbours stacked and tilted (like the Wix gallery) ---------- */
export function Coverflow({n,card,info,every=6500,label}){
 const [i,setI]=useState(0),[hold,setHold]=useState(false),sx=useRef(null);
 useEffect(()=>{if(hold||reduce())return;const t=setInterval(()=>setI(x=>(x+1)%n),every);return()=>clearInterval(t)},[hold,n,every]);
 const go=d=>setI(x=>(x+d+n)%n);
 const off=k=>{let o=k-i;if(o>n/2)o-=n;if(o<-n/2)o+=n;return o};
 return <div className="cf" role="region" aria-roledescription="carousel" aria-label={label}
  onMouseEnter={()=>setHold(true)} onMouseLeave={()=>setHold(false)}
  onTouchStart={e=>{sx.current=e.touches[0].clientX}} onTouchEnd={e=>{const d=e.changedTouches[0].clientX-sx.current;if(Math.abs(d)>40)go(d<0?1:-1)}}>
  <div className="cf-stage">{Array.from({length:n},(_,k)=>{const o=off(k);
   return <div key={k} className={'cf-card'+(o===0?' on':'')+(Math.abs(o)>2?' off':'')} style={{'--o':o,'--a':Math.abs(o)}} aria-hidden={o!==0} onClick={()=>o!==0&&setI(k)}>{card(k,o===0)}</div>})}</div>
  <button type="button" className="cf-nav l" onClick={()=>go(-1)} aria-label="Previous"><svg viewBox="0 0 24 24" width="22" height="22"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
  <button type="button" className="cf-nav r" onClick={()=>go(1)} aria-label="Next"><svg viewBox="0 0 24 24" width="22" height="22"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/></svg></button>
  <div className="cf-info" aria-live="polite">{info(i)}</div>
  <div className="cf-dots">{Array.from({length:n},(_,k)=><button type="button" key={k} className={k===i?'on':''} onClick={()=>setI(k)} aria-label={'Slide '+(k+1)}><i/></button>)}</div>
 </div>;
}
