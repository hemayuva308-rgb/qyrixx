import {useEffect,useRef,useState} from 'react';

export const reduce=()=>typeof matchMedia!=='undefined'&&matchMedia('(prefers-reduced-motion:reduce)').matches;

/* Fade / slide / zoom in once when scrolled into view. dir: up | left | right | zoom | flip */
export function Reveal({as:T='div',dir='up',delay=0,className='',style,children,...rest}){
 const ref=useRef(null),[on,setOn]=useState(reduce);
 useEffect(()=>{
  if(on||!ref.current)return;
  const io=new IntersectionObserver(([e])=>{if(e.isIntersecting){setOn(true);io.disconnect()}},{threshold:.12,rootMargin:'0px 0px -5% 0px'});
  io.observe(ref.current);return()=>io.disconnect();
 },[on]);
 return <T ref={ref} className={`rv rv-${dir}${on?' in':''} ${className}`} style={{'--d':delay+'ms',...style}} {...rest}>{children}</T>;
}

/* Moves slower or faster than the page while scrolling. speed 0.1 = subtle, negative = opposite way */
export function Parallax({as:T='div',speed=.15,className='',style,children}){
 const ref=useRef(null);
 useEffect(()=>{
  if(reduce())return;
  let raf=0;
  const upd=()=>{raf=0;const el=ref.current;if(!el)return;const r=el.getBoundingClientRect();el.style.setProperty('--py',((r.top+r.height/2-innerHeight/2)*-speed).toFixed(1)+'px')};
  const on=()=>{if(!raf)raf=requestAnimationFrame(upd)};
  upd();addEventListener('scroll',on,{passive:true});addEventListener('resize',on);
  return()=>{removeEventListener('scroll',on);removeEventListener('resize',on);cancelAnimationFrame(raf)};
 },[speed]);
 return <T ref={ref} className={'px '+className} style={style}>{children}</T>;
}

/* Sets --p (0 to 1) on the element as it scrolls through the screen */
export function useScrollProgress(){
 const ref=useRef(null);
 useEffect(()=>{
  const el=ref.current;if(!el)return;
  if(reduce()){el.style.setProperty('--p',1);return}
  let raf=0;
  const upd=()=>{raf=0;const r=el.getBoundingClientRect(),h=innerHeight;const p=(h*.75-r.top)/(r.height+h*.25);el.style.setProperty('--p',Math.max(0,Math.min(1,p)).toFixed(3))};
  const on=()=>{if(!raf)raf=requestAnimationFrame(upd)};
  upd();addEventListener('scroll',on,{passive:true});addEventListener('resize',on);
  return()=>{removeEventListener('scroll',on);removeEventListener('resize',on);cancelAnimationFrame(raf)};
 },[]);
 return ref;
}

/* Endless horizontal ticker. Pauses on hover. */
export function Marquee({speed=40,reverse,className='',children}){
 return <div className={'mq '+className} style={{'--dur':speed+'s','--dir':reverse?'reverse':'normal'}}>
  <div className="mq-track"><div className="mq-grp">{children}</div><div className="mq-grp" aria-hidden="true">{children}</div></div></div>;
}

/* Words that roll upward one by one (like the Wix word slider) */
export function WordSlider({words,every=2200}){
 const n=words.length,list=[...words,words[0]],[i,setI]=useState(0),[snap,setSnap]=useState(false);
 useEffect(()=>{setI(0)},[words]);
 useEffect(()=>{
  if(reduce())return;
  const t=setInterval(()=>setI(x=>x+1),every);return()=>clearInterval(t);
 },[every,n]);
 useEffect(()=>{
  if(i!==n)return;
  const a=setTimeout(()=>{setSnap(true);setI(0)},900),b=setTimeout(()=>setSnap(false),960);
  return()=>{clearTimeout(a);clearTimeout(b)};
 },[i,n]);
 const w=Math.max(...words.map(x=>x.length));
 return <span className="ws" style={{'--w':w+'ch'}} aria-label={words[0]}>
  <span className="ws-col" aria-hidden="true" style={{transform:`translateY(${-i*100/(n+1)}%)`,transition:snap?'none':'transform .85s cubic-bezier(.2,1,0,1)'}}>
   {list.map((x,k)=><span key={k}>{x}</span>)}</span></span>;
}

/* Counts up when visible */
export function Counter({to,prefix='',suffix='',ms=1400}){
 const ref=useRef(null),[v,setV]=useState(reduce()?to:0);
 useEffect(()=>{
  if(reduce()){setV(to);return}
  const io=new IntersectionObserver(([e])=>{
   if(!e.isIntersecting)return;io.disconnect();
   const t0=performance.now(),tick=t=>{const k=Math.min(1,(t-t0)/ms);setV(Math.round(to*(1-Math.pow(1-k,3))));if(k<1)requestAnimationFrame(tick)};requestAnimationFrame(tick);
  },{threshold:.4});
  io.observe(ref.current);return()=>io.disconnect();
 },[to,ms]);
 return <span ref={ref}>{prefix}{v.toLocaleString('en-IN')}{suffix}</span>;
}

/* Soft blurred sky-blue and purple circles that rotate, change colour and follow the pointer */
/* Animated background blobs removed: backgrounds are now static (see .hero in styles.css) */
export function Circles(){return null}

/* Thin bar at the top that fills as the page is scrolled */
export function PageProgress(){
 const ref=useRef(null);
 useEffect(()=>{
  let raf=0;
  const upd=()=>{raf=0;const d=document.documentElement,m=d.scrollHeight-innerHeight;ref.current?.style.setProperty('--sp',m>0?Math.min(1,scrollY/m).toFixed(3):0)};
  const on=()=>{if(!raf)raf=requestAnimationFrame(upd)};
  upd();addEventListener('scroll',on,{passive:true});addEventListener('resize',on);
  return()=>{removeEventListener('scroll',on);removeEventListener('resize',on);cancelAnimationFrame(raf)};
 },[]);
 return <div ref={ref} className="pgbar" aria-hidden="true"/>;
}
