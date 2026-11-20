import {useEffect,useRef,useState} from 'react';
import {Link} from 'react-router-dom';
import {CATS,pshort} from './data';
import {CFG} from './config';
import {useI18n} from './i18n';

/* Open the chat from anywhere: openChat('What does a website cost?') */
export const openChat=text=>window.dispatchEvent(new CustomEvent('qx-chat',{detail:{text:text||''}}));

const norm=s=>s.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu,' ').replace(/\s+/g,' ').trim();
const STOP=['and','the','setup','solution','system','services','service','management'];
function matchService(q){
 const qs=norm(q);let best=null,sc=0;
 CATS.forEach((c,ci)=>c.items.forEach(s=>{
  const w=norm(s.n).split(' ').filter(x=>x.length>2&&!STOP.includes(x));if(!w.length)return;
  const hit=w.filter(x=>qs.includes(x)).length,r=hit/w.length;
  if(hit&&r>=.6&&r+hit/10>sc){sc=r+hit/10;best={ci,c,s}}
 }));
 return best;
}
/* keyword intents (English, Tamil, Hindi and common Tanglish spellings). First match wins. */
const INT=[
 ['ans.hello',/^(hi+|hello|hey|vanakkam|namaste)\b|வணக்கம்|नमस्ते/],
 ['ans.ai',/chat ?bot|\bai\b|automat|voice agent|சாட்|தானியக்க|चैटबॉट|ऑटोमेशन/],
 ['ans.contact',/contact|whatsapp|phone|call|e-?mail|number|தொடர்பு|எண்|संपर्क|नंबर/],
 ['ans.start',/\bstart\b|begin|how (do|to) i|get started|தொடங்க|ஆரம்ப|शुरू/],
 ['ans.app',/\bapps?\b|mobile|android|\bios\b|ஆப்|ऐप|मोबाइल/],
 ['ans.logo',/logo|brand|design|figma|லோகோ|பிராண்ட்|लोगो|ब्रांड/],
 ['ans.seo',/\bseo\b|marketing|\bads?\b|social media|விளம்பர|मार्केटिंग/],
 ['ans.domain',/domain|host|\bssl\b|cloud|\baws\b|server|டொமைன்|ஹோஸ்ட்|डोमेन|होस्ट/],
 ['ans.support',/maintenance|support|\bbug|\bfix|பராமரிப்பு|ஆதரவு|मेंटेनेंस|सपोर्ट/],
 ['ans.web',/web ?site|\bweb\b|landing|store|e-?commerce|இணைய|वेबसाइट/],
 ['ans.price',/price|cost|how much|rate|fee|charge|vilai|evlo|விலை|எவ்வளவு|ஆகும்|कीमत|कितना|कितनी/]];

function answer(q,t,catName){
 const m=matchService(q);
 if(m)return {text:t('ans.svc',{n:m.s.n,c:catName(m.ci),p:pshort(m.s)}),link:{to:`/services/${m.c.slug}/${m.s.slug}`,label:t('ans.open')}};
 const s=q.toLowerCase();
 for(const [k,re] of INT)if(re.test(s))return {text:t(k),wa:k==='ans.contact'||k==='ans.start',q};
 return {text:t('ans.fb'),wa:true,q};
}

export default function Chatbot(){
 const {t,catName}=useI18n(),[open,setOpen]=useState(false),[msgs,setMsgs]=useState([]),[typing,setTyping]=useState(false),[val,setVal]=useState(''),[tip,setTip]=useState(false);
 const end=useRef(null),inp=useRef(null),seeded=useRef(false);
 const say=text=>{
  const q=text.trim();if(!q)return;
  setMsgs(m=>[...m,{r:'me',text:q}]);setTyping(true);
  setTimeout(()=>{setMsgs(m=>[...m,{r:'bot',...answer(q,t,catName)}]);setTyping(false)},650+Math.min(q.length*12,500));
 };
 useEffect(()=>{const h=e=>{setOpen(true);const x=e.detail?.text;if(x)setTimeout(()=>say(x),250)};window.addEventListener('qx-chat',h);return()=>window.removeEventListener('qx-chat',h)});
 useEffect(()=>{if(open&&!seeded.current){seeded.current=true;setTyping(true);setTimeout(()=>{setMsgs([{r:'bot',text:t('chat.hi'),chips:true}]);setTyping(false)},500)}if(open)setTimeout(()=>inp.current?.focus(),300)},[open]);
 useEffect(()=>{end.current?.scrollIntoView({behavior:'smooth',block:'end'})},[msgs,typing,open]);
 useEffect(()=>{const a=setTimeout(()=>{try{if(sessionStorage.getItem('qx-tip'))return;sessionStorage.setItem('qx-tip','1')}catch{}setTip(true)},4500),b=setTimeout(()=>setTip(false),12000);return()=>{clearTimeout(a);clearTimeout(b)}},[]);
 useEffect(()=>{if(!open)return;const k=e=>e.key==='Escape'&&setOpen(false);addEventListener('keydown',k);return()=>removeEventListener('keydown',k)},[open]);
 const submit=e=>{e.preventDefault();say(val);setVal('')};
 return <>
  {!open&&tip&&<button type="button" className="cb-tip" onClick={()=>{setTip(false);setOpen(true)}}>{t('hero.ask')} …</button>}
  <button type="button" className={'cb-fab'+(open?' hide':'')} onClick={()=>{setTip(false);setOpen(true)}} aria-label={t('chat.open')}>
   <span className="orb"/><svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><path d="M4 5h16v11H9l-5 4z" fill="#fff"/><circle cx="9" cy="10.5" r="1.2" fill="#000"/><circle cx="12.5" cy="10.5" r="1.2" fill="#000"/><circle cx="16" cy="10.5" r="1.2" fill="#000"/></svg></button>
  <section className={'cb'+(open?' open':'')} role="dialog" aria-label={t('chat.title')} aria-hidden={!open}>
   <header><span className="orb sm"/><div><b>{t('chat.title')}</b><small><i/>{t('chat.online')}</small></div>
    <button type="button" onClick={()=>setOpen(false)} aria-label={t('chat.close')}>×</button></header>
   <div className="cb-body">
    {msgs.map((m,i)=><div key={i} className={'cb-m '+m.r}>
     <p>{m.text}</p>
     {m.link&&<Link className="cb-a" to={m.link.to} target="_blank" rel="noopener">{m.link.label} ↗</Link>}
     {m.wa&&<Link className="cb-a wa" to="/contact" state={{type:'support',msg:m.q||''}}>{t('chat.wa')} →</Link>}
     {m.chips&&<div className="cb-chips">{t('chat.chips').map(c=><button type="button" key={c} onClick={()=>say(c)}>{c}</button>)}</div>}
    </div>)}
    {typing&&<div className="cb-m bot"><p className="dots"><i/><i/><i/></p></div>}
    <div ref={end}/>
   </div>
   <form onSubmit={submit}><input ref={inp} value={val} onChange={e=>setVal(e.target.value)} placeholder={t('chat.ph')} aria-label={t('chat.ph')}/><button type="submit" aria-label={t('chat.send')}><svg viewBox="0 0 24 24" width="20" height="20"><path d="M3 11l18-8-8 18-2-8z" fill="currentColor"/></svg></button></form>
   <small className="cb-ft">{CFG.email}</small>
  </section></>;
}
