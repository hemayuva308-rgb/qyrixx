/* Website studio: pick a template, edit it (text in place, pictures, colours, fonts, sections),
   then request publishing with a domain. Sites are saved to Firestore (or this browser in demo mode). */
import {useCallback,useEffect,useRef,useState} from 'react';
import {Link,useNavigate,useParams} from 'react-router-dom';
import {useAuth} from '../auth';
import {listSites,loadSite,saveSite,deleteSite,newSiteId,sendLead} from '../backend';
import {lookup} from '../Sections';
import {MockSite} from '../Media';
import Site from './Site';
import {TEMPLATES,FONTS,PALETTES,SECTION_TYPES,siteFromTemplate,newSection,dupSection} from './templates';
import './studio.css';

const DEVICES=[['desktop','Desktop',1280],['tablet','Tablet',820],['mobile','Phone',390]];
const LABEL={kicker:'Small line above title',title:'Title',text:'Text',cta:'Main button',cta2:'Second button',quote:'Review',author:'Name',address:'Address',email:'Email',hours:'Opening hours',name:'Name',price:'Price'};
const LONG=['text','quote'];
const tplIndex=name=>Math.max(0,TEMPLATES.findIndex(t=>t.name===name));
const setIn=(o,[k,...rest],v)=>{const c=Array.isArray(o)?[...o]:{...o};c[k]=rest.length?setIn(o[k],rest,v):v;return c};

/* shrink a picture so it fits in the saved website (max 1400 px, JPEG) */
const shrink=file=>new Promise((ok,bad)=>{const r=new FileReader();r.onerror=bad;r.onload=()=>{const im=new Image();im.onerror=bad;im.onload=()=>{
 const s=Math.min(1,1400/Math.max(im.width,im.height)),cv=document.createElement('canvas');cv.width=Math.round(im.width*s);cv.height=Math.round(im.height*s);
 cv.getContext('2d').drawImage(im,0,0,cv.width,cv.height);ok(cv.toDataURL('image/jpeg',.78))};im.src=r.result};r.readAsDataURL(file)});

const I={back:'M15 5l-7 7 7 7',undo:'M9 14L4 9l5-5M4 9h10a6 6 0 0 1 0 12h-3',redo:'M15 14l5-5-5-5M20 9H10a6 6 0 0 0 0 12h3',up:'M6 15l6-6 6 6',down:'M6 9l6 6 6-6',
 eye:'M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z',off:'M3 3l18 18M10.6 10.6a2 2 0 0 0 2.8 2.8M9.9 5.1A10 10 0 0 1 12 5c6.5 0 10 7 10 7a17 17 0 0 1-3.2 4M6.6 6.6C3.9 8.3 2 12 2 12s3.5 7 10 7a9.7 9.7 0 0 0 5.4-1.6',
 copy:'M9 9h11v11H9zM5 15H4V4h11v1',trash:'M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3',plus:'M12 5v14M5 12h14',play:'M7 4l13 8-13 8z',x:'M6 6l12 12M18 6L6 18',layers:'M12 3l9 5-9 5-9-5zM3 13l9 5 9-5',brush:'M14 4l6 6-9 9H5v-6zM12 6l6 6'};
const Svg=({d,s=18})=><svg viewBox="0 0 24 24" width={s} height={s} aria-hidden="true"><path d={d} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
const IconBtn=({d,label,...p})=><button type="button" className="st-ib" aria-label={label} title={label} {...p}><Svg d={d}/></button>;

/* ---------------- My websites (dashboard page) ---------------- */
export function MySites(){
 const {user}=useAuth(),[sites,setSites]=useState(null),[er,setEr]=useState('');
 useEffect(()=>{listSites(user).then(setSites).catch(e=>setEr('Could not load your websites: '+(e.code||e.message)))},[user]);
 return <div className="dsh-in st-mine">
  <h1>My websites</h1><p className="lead">Start from a template, edit everything in the studio, then publish it on your own domain.</p>
  <h2 className="st-h2">Start from a template</h2>
  <div className="st-tpls">{TEMPLATES.map((t,k)=><Link key={t.name} className="tpl" to={'/studio/new/'+k}><span className="tpl-th static"><MockSite v={k}/></span><b>{t.name}</b></Link>)}</div>
  <h2 className="st-h2">Your websites</h2>
  {er&&<p className="er">{er}</p>}
  {sites===null&&!er&&<p className="lead">Loading…</p>}
  {sites&&!sites.length&&<div className="box">No websites yet. Pick a template above to start.</div>}
  <div className="st-sites">{(sites||[]).map(s=><div key={s.id} className="st-site">
   <Link to={'/studio/'+s.id} className="tpl-th static"><MockSite v={tplIndex(s.template)}/></Link>
   <div className="st-site-t"><b>{s.name}</b><small>{s.template} · {s.status==='requested'?'Publish requested':'Draft'}{s.domain?' · '+s.domain:''}</small></div>
   <div className="row"><Link className="pill sm" to={'/studio/'+s.id}>Open in studio</Link>
    <button type="button" className="pill sm ol" onClick={async()=>{if(confirm(`Delete "${s.name}"? This cannot be undone.`)){await deleteSite(user,s.id);setSites(x=>x.filter(y=>y.id!==s.id))}}}>Delete</button></div>
  </div>)}</div>
 </div>;
}

/* /studio/new/:k creates a website from template k and opens it */
export function NewSite(){
 const {k}=useParams(),{user}=useAuth(),nav=useNavigate(),[er,setEr]=useState(''),done=useRef(false);
 useEffect(()=>{if(done.current)return;done.current=true;const id=newSiteId(),site={id,...siteFromTemplate(+k||0)};
  saveSite(user,site).then(r=>r.ok?nav('/studio/'+id,{replace:true}):setEr(r.error))},[]);
 return <div className="st-load">{er?<><p className="er">{er}</p><Link className="pill" to="/app/sites">Back</Link></>:<p>Creating your website…</p>}</div>;
}

/* ---------------- inspector: fields of the selected section ---------------- */
function PicField({src,label,onPick,onClear}){
 return <div className="st-picf"><span className="st-thumb">{src?<img src={src} alt=""/>:<Svg d="M4 5h16v14H4zM4 16l5-5 4 4 3-3 4 4"/>}</span>
  <div><b>{label}</b><div className="row"><button type="button" className="pill sm" onClick={onPick}>{src?'Replace':'Upload'}</button>{src&&<button type="button" className="pill sm ol" onClick={onClear}>Remove</button>}</div></div></div>;
}
function Inspector({s,onField,onPick,act,first,last}){
 const d=s.data,T=SECTION_TYPES[s.type];
 const field=(k,v,p)=><label key={p.join('.')} className="st-f"><span>{LABEL[k]||k}</span>
  {LONG.includes(k)?<textarea rows="3" value={v} onChange={e=>onField(p,e.target.value)}/>:<input value={v} onChange={e=>onField(p,e.target.value)}/>}</label>;
 return <div className="st-insp">
  <div className="st-insp-h"><b>{T?.n||s.type}</b><div className="st-acts">
   <IconBtn d={I.up} label="Move up" disabled={first} onClick={()=>act('up')}/><IconBtn d={I.down} label="Move down" disabled={last} onClick={()=>act('down')}/>
   <IconBtn d={s.hidden?I.off:I.eye} label={s.hidden?'Show section':'Hide section'} onClick={()=>act('hide')}/>
   <IconBtn d={I.copy} label="Duplicate" onClick={()=>act('dup')}/><IconBtn d={I.trash} label="Delete section" onClick={()=>act('del')}/></div></div>
  {s.type==='hero'&&<label className="st-f"><span>Layout</span><select value={d.layout} onChange={e=>onField(['layout'],e.target.value)}><option value="split">Text and picture side by side</option><option value="center">Centred</option><option value="cover">Full picture behind text</option></select></label>}
  {Object.entries(d).map(([k,v])=>{
   if(k==='layout')return null;
   if(k==='image')return <PicField key={k} src={v} label="Picture" onPick={()=>onPick([k])} onClear={()=>onField([k],'')}/>;
   if(k==='images')return <div key={k} className="st-group"><span className="st-gl">Pictures</span>{v.map((src,i)=><PicField key={i} src={src} label={'Picture '+(i+1)} onPick={()=>onPick([k,i])} onClear={()=>onField([k,i],'')}/>)}
    <div className="row"><button type="button" className="pill sm ol" onClick={()=>onField([k],[...v,''])}>Add picture</button>{v.length>1&&<button type="button" className="pill sm ol" onClick={()=>onField([k],v.slice(0,-1))}>Remove last</button>}</div></div>;
   if(k==='items')return <div key={k} className="st-group"><span className="st-gl">Items</span>{v.map((it,i)=><div key={i} className="st-item">
     <div className="st-item-h"><b>Item {i+1}</b><IconBtn d={I.trash} label={'Remove item '+(i+1)} onClick={()=>onField([k],v.filter((_,j)=>j!==i))}/></div>
     {Object.entries(it).map(([kk,vv])=>field(kk,vv,[k,i,kk]))}</div>)}
    <button type="button" className="pill sm ol" onClick={()=>onField([k],[...v,Object.fromEntries(Object.keys(v[0]||{title:'',text:''}).map(x=>[x,'']))])}>Add item</button></div>;
   return typeof v==='string'?field(k,v,[k]):null;})}
  <p className="st-tip">Tip: you can also click any text on the page and type.</p>
 </div>;
}

/* ---------------- publish & domain ---------------- */
const TLDS=['in','com','co.in','store','tech','net'];
function Publish({site,user,onClose,onDone}){
 const [step,setStep]=useState(1),[mode,setMode]=useState('new'),[nm,setNm]=useState((site.brand||site.name).toLowerCase().replace(/[^a-z0-9]+/g,'').slice(0,40)),[tld,setTld]=useState('in'),
  [own,setOwn]=useState(''),[chk,setChk]=useState(null),[name,setName]=useState(user?.displayName||''),[email,setEmail]=useState(user?.email||''),[note,setNote]=useState(''),[st,setSt]=useState({});
 const domain=mode==='new'?(nm?`${nm}.${tld}`:''):own.trim().toLowerCase().replace(/^https?:\/\//,'').replace(/^www\./,'').replace(/\/.*$/,'');
 const check=async()=>{if(!/^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(nm))return setChk({er:'Use letters, numbers and dashes only.'});setChk({busy:true});const r=await lookup(domain);setChk({r})};
 const okDomain=/^[a-z0-9-]+(\.[a-z0-9-]+)+$/.test(domain);
 const submit=async e=>{e.preventDefault();
  if(!name.trim())return setSt({er:'Enter your name.'});if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))return setSt({er:'Enter a valid email address.'});
  setSt({busy:true});
  const r=await sendLead({type:'site',name:name.trim(),email:email.trim(),domain,siteId:site.id,siteName:site.name,template:site.template,message:`${mode==='new'?'New domain':'Customer already owns the domain'}: ${domain}${note.trim()?'\n\n'+note.trim():''}`,uid:user?.uid||''});
  if(!r.ok)return setSt({er:r.error});
  setSt({});setStep(4);onDone(domain)};
 return <div className="st-modal" role="dialog" aria-modal="true" aria-labelledby="pub-h"><div className="st-modal-in">
  <div className="st-modal-h"><h2 id="pub-h">{step===4?'Request sent':'Publish your website'}</h2><IconBtn d={I.x} label="Close" onClick={onClose}/></div>
  {step<4&&<ol className="st-steps">{['Website','Domain','Your details'].map((x,i)=><li key={x} className={step===i+1?'on':step>i+1?'done':''}>{x}</li>)}</ol>}
  {step===1&&<div className="st-pb"><p>Your website <b>{site.name}</b> is saved. Next, choose the address people will type to visit it.</p>
   <ul className="st-check"><li>Check every page on the Phone view before publishing.</li><li>Replace sample text and add your own pictures.</li><li>Our team checks the site, connects the domain and sets up SSL for you.</li></ul>
   <div className="row"><button type="button" className="pill" onClick={()=>setStep(2)}>Choose a domain</button><button type="button" className="pill ol" onClick={onClose}>Keep editing</button></div></div>}
  {step===2&&<div className="st-pb">
   <div className="st-seg" role="radiogroup" aria-label="Domain option">
    <button type="button" role="radio" aria-checked={mode==='new'} className={mode==='new'?'on':''} onClick={()=>setMode('new')}>Get a new domain</button>
    <button type="button" role="radio" aria-checked={mode==='own'} className={mode==='own'?'on':''} onClick={()=>setMode('own')}>I already have one</button></div>
   {mode==='new'?<><label className="st-f"><span>Domain name</span><div className="st-dom"><span>www.</span><input value={nm} onChange={e=>{setNm(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g,''));setChk(null)}} aria-label="Domain name"/>
     <select value={tld} onChange={e=>{setTld(e.target.value);setChk(null)}} aria-label="Ending">{TLDS.map(x=><option key={x} value={x}>.{x}</option>)}</select></div></label>
    <div className="row"><button type="button" className="pill sm ol" onClick={check} disabled={!nm||chk?.busy}>{chk?.busy?'Checking…':'Check availability'}</button></div>
    {chk?.er&&<p className="er">{chk.er}</p>}
    {chk?.r&&<p className={chk.r==='free'?'ok':chk.r==='taken'?'er':'st-note'} role="status">{chk.r==='free'?`${domain} looks available.`:chk.r==='taken'?`${domain} is already taken. Try another name or ending.`:'Could not check right now. You can still continue; we confirm before buying.'}</p>}
    <p className="st-note">The availability check is a hint. We confirm with the registrar before buying. The domain is registered in your name.</p></>
   :<><label className="st-f"><span>Your domain</span><input value={own} onChange={e=>setOwn(e.target.value)} placeholder="yourbusiness.in"/></label>
    <p className="st-note">We send you the DNS records to add at your registrar, or set them up with you.</p></>}
   <div className="row"><button type="button" className="pill" disabled={!okDomain||(mode==='new'&&chk?.r==='taken')} onClick={()=>setStep(3)}>Continue</button><button type="button" className="pill ol" onClick={()=>setStep(1)}>Back</button></div></div>}
  {step===3&&<form className="st-pb" onSubmit={submit} noValidate>
   <p>We will publish <b>{site.name}</b> on <b>{domain}</b> and email you when it is live.</p>
   <label className="st-f"><span>Your name *</span><input value={name} onChange={e=>setName(e.target.value)} autoComplete="name"/></label>
   <label className="st-f"><span>Email address *</span><input type="email" value={email} onChange={e=>setEmail(e.target.value)} autoComplete="email"/></label>
   <label className="st-f"><span>Anything we should know? (optional)</span><textarea rows="3" value={note} onChange={e=>setNote(e.target.value)}/></label>
   <p className="er" role="alert">{st.er}</p>
   <div className="row"><button type="submit" className="pill" disabled={st.busy}>{st.busy?'Sending…':'Send publish request'}</button><button type="button" className="pill ol" onClick={()=>setStep(2)}>Back</button></div></form>}
  {step===4&&<div className="st-pb"><p className="ok">Thank you. Our team has your request for <b>{domain}</b>.</p><p>We will check the website, set up the domain and SSL, and email <b>{email}</b> with the next steps. You can keep editing; we publish the latest saved version.</p>
   <div className="row"><button type="button" className="pill" onClick={onClose}>Done</button></div></div>}
 </div></div>;
}

/* ---------------- the editor ---------------- */
export default function Studio(){
 const {id}=useParams(),{user}=useAuth(),nav=useNavigate();
 const [site,setSite]=useState(null),[err,setErr]=useState(''),[sel,setSel]=useState(null),[dev,setDev]=useState('desktop'),[tab,setTab]=useState('sections'),
  [preview,setPreview]=useState(false),[save,setSave]=useState('saved'),[pub,setPub]=useState(false),[panel,setPanel]=useState(''),[,bump]=useState(0);
 const past=useRef([]),future=useRef([]);
 const fileRef=useRef(),pick=useRef(null),loaded=useRef(false);
 useEffect(()=>{loadSite(user,id).then(s=>s?setSite(s):setErr('This website was not found.')).catch(e=>setErr('Could not open: '+(e.code||e.message)))},[id]);
 /* every change goes through here so undo works */
 const change=useCallback(fn=>{setSite(cur=>{const next=fn(cur);if(next===cur)return cur;past.current=[...past.current.slice(-49),cur];future.current=[];return next});bump(x=>x+1)},[]);
 const undo=useCallback(()=>{setSite(cur=>{const p=past.current;if(!p.length)return cur;past.current=p.slice(0,-1);future.current=[cur,...future.current];return p[p.length-1]});bump(x=>x+1)},[]);
 const redo=useCallback(()=>{setSite(cur=>{const f=future.current;if(!f.length)return cur;future.current=f.slice(1);past.current=[...past.current,cur];return f[0]});bump(x=>x+1)},[]);
 /* autosave */
 useEffect(()=>{if(!site)return;if(!loaded.current){loaded.current=true;return}setSave('saving');
  const t=setTimeout(()=>saveSite(user,site).then(r=>setSave(r.ok?'saved':r.error)),1100);return()=>clearTimeout(t)},[site]);
 useEffect(()=>{const k=e=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='z'&&!e.target.isContentEditable&&!/INPUT|TEXTAREA/.test(e.target.tagName)){e.preventDefault();e.shiftKey?redo():undo()}};addEventListener('keydown',k);return()=>removeEventListener('keydown',k)},[]);
 useEffect(()=>{const b=e=>{if(save==='saving'){e.preventDefault();e.returnValue=''}};addEventListener('beforeunload',b);return()=>removeEventListener('beforeunload',b)},[save]);

 if(err)return <div className="st-load"><p className="er">{err}</p><Link className="pill" to="/app/sites">My websites</Link></div>;
 if(!site)return <div className="st-load"><p>Opening the studio…</p></div>;

 const secs=site.sections,cur=secs.find(s=>s.id===sel),idx=secs.findIndex(s=>s.id===sel);
 const setData=(sid,p,v)=>change(s=>({...s,sections:s.sections.map(x=>x.id===sid?{...x,data:setIn(x.data,p,v)}:x)}));
 const setTheme=(k,v)=>change(s=>({...s,theme:{...s.theme,[k]:v}}));
 const act=a=>change(s=>{const a2=[...s.sections],i=a2.findIndex(x=>x.id===sel);if(i<0)return s;
  if(a==='up'&&i>0)[a2[i-1],a2[i]]=[a2[i],a2[i-1]];else if(a==='down'&&i<a2.length-1)[a2[i+1],a2[i]]=[a2[i],a2[i+1]];
  else if(a==='hide')a2[i]={...a2[i],hidden:!a2[i].hidden};else if(a==='dup')a2.splice(i+1,0,dupSection(a2[i]));
  else if(a==='del'){if(!confirm('Delete this section?'))return s;a2.splice(i,1);setSel(null)}return {...s,sections:a2}});
 const add=type=>{const n=newSection(type);change(s=>{const a2=[...s.sections],i=a2.findIndex(x=>x.id===sel);a2.splice(i<0?a2.length:i+1,0,n);return {...s,sections:a2}});setSel(n.id);setPanel('edit')};
 const openPick=(sid,p)=>{pick.current={sid,p};fileRef.current.value='';fileRef.current.click()};
 const onFile=async e=>{const f=e.target.files[0],t=pick.current;if(!f||!t)return;
  if(!f.type.startsWith('image/'))return alert('Choose a picture file (JPG, PNG or WebP).');
  try{const url=await shrink(f);setData(t.sid,t.p,url)}catch{alert('Could not read this picture. Try another file.')}};
 const width=DEVICES.find(d=>d[0]===dev)[2];

 return <div className={'st'+(preview?' preview':'')}>
  <header className="st-top">
   <Link to="/app/sites" className="st-ib st-back" aria-label="Back to my websites" title="My websites"><Svg d={I.back}/></Link>
   <input className="st-name" value={site.name} onChange={e=>{const v=e.target.value;change(s=>({...s,name:v}))}} aria-label="Website name"/>
   <span className={'st-save'+(save!=='saved'&&save!=='saving'?' bad':'')} role="status">{save==='saved'?'Saved':save==='saving'?'Saving…':save}</span>
   <div className="st-seg st-dev" role="radiogroup" aria-label="Preview size">{DEVICES.map(([k,n])=><button key={k} type="button" role="radio" aria-checked={dev===k} className={dev===k?'on':''} onClick={()=>setDev(k)}>{n}</button>)}</div>
   <IconBtn d={I.undo} label="Undo" onClick={undo} disabled={!past.current.length}/><IconBtn d={I.redo} label="Redo" onClick={redo} disabled={!future.current.length}/>
   <button type="button" className="pill sm ol st-prev" onClick={()=>{setPreview(p=>!p);setSel(null)}}>{preview?'Back to editing':'Preview'}</button>
   <button type="button" className="pill sm st-pub" onClick={()=>setPub(true)}>{site.status==='requested'?'Publish again':'Publish'}</button>
  </header>
  {!preview&&<div className="st-mtabs"><button type="button" className={panel==='left'?'on':''} onClick={()=>setPanel(panel==='left'?'':'left')}><Svg d={I.layers}/>Sections &amp; design</button>
   <button type="button" className={panel==='edit'?'on':''} disabled={!cur} onClick={()=>setPanel(panel==='edit'?'':'edit')}><Svg d={I.brush}/>Edit section</button></div>}
  <div className="st-body">
   {!preview&&<aside className={'st-left'+(panel==='left'?' open':'')} aria-label="Sections and design">
    <div className="st-tabs" role="tablist"><button type="button" role="tab" aria-selected={tab==='sections'} className={tab==='sections'?'on':''} onClick={()=>setTab('sections')}>Sections</button>
     <button type="button" role="tab" aria-selected={tab==='design'} className={tab==='design'?'on':''} onClick={()=>setTab('design')}>Design</button></div>
    {tab==='sections'?<div className="st-pane">
     <ul className="st-secs">{secs.map((s,i)=><li key={s.id}><button type="button" className={'st-sec'+(s.id===sel?' on':'')+(s.hidden?' off':'')} onClick={()=>{setSel(s.id);setPanel('edit')}}>
      <span className="st-sn">{i+1}</span><span className="st-st"><b>{SECTION_TYPES[s.type]?.n}</b><small>{s.data.title||s.data.quote||''}</small></span></button>
      <IconBtn d={s.hidden?I.off:I.eye} label={s.hidden?'Show section':'Hide section'} onClick={()=>change(x=>({...x,sections:x.sections.map(y=>y.id===s.id?{...y,hidden:!y.hidden}:y)}))}/></li>)}</ul>
     <label className="st-f"><span>Add a section {cur?'below the selected one':'at the end'}</span>
      <select value="" onChange={e=>e.target.value&&add(e.target.value)}><option value="">Choose a section…</option>{Object.entries(SECTION_TYPES).map(([k,t])=><option key={k} value={k}>{t.n}</option>)}</select></label>
    </div>:<div className="st-pane">
     <label className="st-f"><span>Business name (shown in the menu)</span><input value={site.brand||''} onChange={e=>{const v=e.target.value;change(s=>({...s,brand:v}))}}/></label>
     <span className="st-gl">Colour sets</span>
     <div className="st-pals">{PALETTES.map((p,i)=><button key={i} type="button" className="st-pal" aria-label={'Colour set '+(i+1)} onClick={()=>change(s=>({...s,theme:{...s.theme,primary:p[0],accent:p[1],bg:p[2],ink:p[3]}}))}>{p.map((c,j)=><i key={j} style={{background:c}}/>)}</button>)}</div>
     <div className="st-cols">{[['primary','Main colour'],['accent','Second colour'],['bg','Background'],['ink','Text']].map(([k,n])=><label key={k} className="st-col"><input type="color" value={site.theme[k]} onChange={e=>setTheme(k,e.target.value)}/><span>{n}</span></label>)}</div>
     <label className="st-f"><span>Fonts</span><select value={site.theme.font} onChange={e=>setTheme('font',e.target.value)}>{FONTS.map(f=><option key={f.k} value={f.k}>{f.n}</option>)}</select></label>
     <label className="st-f"><span>Corner roundness: {site.theme.radius}px</span><input type="range" min="0" max="28" value={site.theme.radius} onChange={e=>setTheme('radius',+e.target.value)}/></label>
    </div>}
   </aside>}
   <main className="st-canvas" onClick={()=>!preview&&setSel(null)}>
    <div className="st-frame" style={{width:dev==='desktop'?'100%':width,maxWidth:width}} onClick={e=>e.stopPropagation()}>
     <Site site={site} edit={!preview} sel={sel} onSelect={id=>{setSel(id);setPanel('edit')}} onText={(sid,p,v)=>setData(sid,p,v)} onImage={openPick}/>
    </div>
   </main>
   {!preview&&<aside className={'st-right'+(panel==='edit'&&cur?' open':'')} aria-label="Edit section">
    {cur?<Inspector s={cur} first={idx===0} last={idx===secs.length-1} act={act} onField={(p,v)=>setData(cur.id,p,v)} onPick={p=>openPick(cur.id,p)}/>
     :<div className="st-empty"><b>Select a section</b><p>Click any part of the page to edit it here, or click a text to type directly on the page.</p></div>}
   </aside>}
  </div>
  <input ref={fileRef} type="file" accept="image/*" hidden onChange={onFile}/>
  {pub&&<Publish site={site} user={user} onClose={()=>setPub(false)} onDone={domain=>change(s=>({...s,status:'requested',domain}))}/>}
 </div>;
}
