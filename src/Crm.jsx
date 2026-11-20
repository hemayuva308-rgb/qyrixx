/* CRM: every enquiry, booking, domain and publish request from the website, live from Firestore.
   Only team admins (CFG.admins / VITE_ADMIN_EMAILS, also enforced in firestore.rules) can open it. */
import {useEffect,useMemo,useState} from 'react';
import {Link} from 'react-router-dom';
import {useAuth} from './auth';
import {watchLeads,updateLead,removeLead,isAdmin,db} from './backend';

const STATUS=[['new','New'],['contacted','Contacted'],['proposal','Proposal sent'],['won','Won'],['lost','Lost']];
const TYPE={enquiry:'Enquiry',booking:'Booking',domain:'Domain',support:'Support',site:'Website publish',chat:'Chat'};
const SHOW=[['email','Email'],['phone','Phone'],['company','Company'],['category','Category'],['service','Service'],['budget','Budget'],['timeline','Timeline'],['date','Preferred date'],['domain','Domain'],['siteName','Website'],['template','Template'],['page','Sent from']];
const when=s=>{if(!s)return '';const d=new Date(s);return isNaN(d)?'':d.toLocaleString('en-IN',{day:'numeric',month:'short',hour:'numeric',minute:'2-digit'})};

function Detail({l,onClose}){
 const [notes,setNotes]=useState(l.notes||''),[msg,setMsg]=useState('');
 useEffect(()=>{setNotes(l.notes||'');setMsg('')},[l.id]);
 const save=async patch=>{try{await updateLead(l.id,patch);setMsg('Saved.')}catch(e){setMsg('Could not save: '+(e.code||e.message))}};
 const subject=encodeURIComponent(`Re: your ${TYPE[l.type]?.toLowerCase()||'request'} with QYRIXX`);
 return <aside className="crm-d" aria-label="Lead details">
  <div className="crm-dh"><div><span className={'crm-t t-'+l.type}>{TYPE[l.type]||l.type}</span><h2>{l.name}</h2><small>{when(l.createdAt)}</small></div>
   <button type="button" className="crm-x" onClick={onClose} aria-label="Close details">×</button></div>
  <label htmlFor="crm-st">Status</label>
  <select id="crm-st" value={l.status||'new'} onChange={e=>save({status:e.target.value})}>{STATUS.map(([k,n])=><option key={k} value={k}>{n}</option>)}</select>
  <dl>{SHOW.filter(([k])=>l[k]).map(([k,n])=><div key={k}><dt>{n}</dt><dd>{k==='email'?<a href={'mailto:'+l.email}>{l.email}</a>:l[k]}</dd></div>)}</dl>
  {l.message&&<><h3>Message</h3><p className="crm-msg">{l.message}</p></>}
  <label htmlFor="crm-n">Team notes</label>
  <textarea id="crm-n" rows="4" value={notes} onChange={e=>setNotes(e.target.value)} placeholder="Calls, quotes, next steps…"/>
  <div className="row"><button type="button" className="pill sm" onClick={()=>save({notes})}>Save notes</button>
   <a className="pill sm ol" href={`mailto:${l.email}?subject=${subject}`}>Reply by email</a>
   <button type="button" className="pill sm ol crm-del" onClick={async()=>{if(confirm('Delete this lead permanently?')){await removeLead(l.id);onClose()}}}>Delete</button></div>
  <p className="ok" role="status">{msg}</p>
 </aside>;
}

export default function Crm(){
 const {user}=useAuth(),[leads,setLeads]=useState(null),[err,setErr]=useState(''),[st,setSt]=useState('all'),[ty,setTy]=useState('all'),[q,setQ]=useState(''),[sel,setSel]=useState(null);
 const admin=isAdmin(user);
 useEffect(()=>admin?watchLeads(setLeads,e=>setErr(e.code==='permission-denied'?'This account is not allowed to read leads. Add its email to firestore.rules and VITE_ADMIN_EMAILS.':'Could not load leads: '+(e.code||e.message))):undefined,[admin]);
 const counts=useMemo(()=>Object.fromEntries(STATUS.map(([k])=>[k,(leads||[]).filter(l=>(l.status||'new')===k).length])),[leads]);
 const list=useMemo(()=>(leads||[]).filter(l=>(st==='all'||(l.status||'new')===st)&&(ty==='all'||l.type===ty)&&(!q||JSON.stringify(l).toLowerCase().includes(q.toLowerCase()))),[leads,st,ty,q]);
 const cur=list.find(l=>l.id===sel)||(leads||[]).find(l=>l.id===sel);
 if(!admin)return <div className="dsh-in"><h1>CRM</h1><p className="lead">Only the QYRIXX team can open the CRM.</p><Link className="pill" to="/app">Back to dashboard</Link></div>;
 return <div className="dsh-in crm">
  <div className="crm-top"><div><h1>CRM</h1><p className="lead">Every enquiry, booking, domain and publish request from the website. New ones are also emailed to the team.</p></div></div>
  {!db&&<p className="dsh-demo" style={{margin:'0 0 16px'}}>Demo mode: Firebase is not connected, so this list shows only requests sent from this browser.</p>}
  {err&&<p className="er" role="alert">{err}</p>}
  <div className="crm-stats">{STATUS.map(([k,n])=><button type="button" key={k} className={st===k?'on':''} onClick={()=>setSt(st===k?'all':k)}><b>{counts[k]||0}</b><span>{n}</span></button>)}</div>
  <div className="crm-f">
   <input type="search" placeholder="Search name, email, service…" value={q} onChange={e=>setQ(e.target.value)} aria-label="Search leads"/>
   <select value={ty} onChange={e=>setTy(e.target.value)} aria-label="Filter by type"><option value="all">All types</option>{Object.entries(TYPE).map(([k,n])=><option key={k} value={k}>{n}</option>)}</select>
   <select value={st} onChange={e=>setSt(e.target.value)} aria-label="Filter by status"><option value="all">All statuses</option>{STATUS.map(([k,n])=><option key={k} value={k}>{n}</option>)}</select>
  </div>
  <div className={'crm-g'+(cur?' has-d':'')}>
   <div className="crm-l" role="list">
    {leads===null&&!err&&<p className="lead">Loading…</p>}
    {leads&&!list.length&&<div className="box">No requests {leads.length?'match these filters':'yet'}.</div>}
    {list.map(l=><button type="button" role="listitem" key={l.id} className={'crm-r'+(l.id===sel?' on':'')+((l.status||'new')==='new'?' is-new':'')} onClick={()=>setSel(l.id)}>
     <span className={'crm-t t-'+l.type}>{TYPE[l.type]||l.type}</span>
     <span className="crm-n"><b>{l.name}</b><small>{l.service||l.domain||l.siteName||l.category||l.email}</small></span>
     <span className="crm-s">{STATUS.find(([k])=>k===(l.status||'new'))?.[1]}</span>
     <time>{when(l.createdAt)}</time></button>)}
   </div>
   {cur&&<Detail l={cur} onClose={()=>setSel(null)}/>}
  </div>
 </div>;
}
