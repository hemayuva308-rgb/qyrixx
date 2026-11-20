/* Talking to the backend: leads (enquiries, bookings, domain and publish requests) and studio websites.
   Leads go to POST /api/lead (saved in Firestore + emailed to the team).
   Without Firebase (demo mode) everything is also kept in this browser's localStorage so the CRM and studio still work. */
import {getFirestore,collection,query,orderBy,limit,onSnapshot,doc,updateDoc,deleteDoc,getDoc,getDocs,setDoc,where,serverTimestamp} from 'firebase/firestore';
import {app} from './auth';
import {CFG} from './config';

export const db=app?getFirestore(app):null;
const LS={get:(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}},set:(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v));dispatchEvent(new CustomEvent('qx-ls',{detail:k}));return true}catch{return false}}};
const uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,8);

export const isAdmin=user=>!!user&&(user.demo||CFG.admins.includes(String(user.email||'').toLowerCase()));

/* ---------- leads ---------- */
export async function sendLead(data){
 const body={...data,page:location.pathname};
 let r;
 try{
  const res=await fetch('/api/lead',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(body)});
  r=await res.json().catch(()=>({ok:false,error:'Unexpected server reply.'}));
  if(!res.ok&&r.ok!==false)r={ok:false,error:'Server error '+res.status};
 }catch{r={ok:false,error:'Could not reach the server. Check your connection and try again.'}}
 if(r.ok&&!r.stored){const a=LS.get('qx-leads',[]);a.unshift({id:'local-'+uid(),...body,status:'new',createdAt:new Date().toISOString(),local:true});LS.set('qx-leads',a.slice(0,200))}
 return r;
}

const toLead=d=>{const x=d.data();return {id:d.id,...x,createdAt:x.createdAt?.toDate?x.createdAt.toDate().toISOString():x.createdAt}};
/* live list for the CRM; returns an unsubscribe function */
export function watchLeads(cb,onErr){
 if(!db){cb(LS.get('qx-leads',[]));const f=e=>(e.key||e.detail)==='qx-leads'&&cb(LS.get('qx-leads',[]));addEventListener('storage',f);addEventListener('qx-ls',f);return()=>{removeEventListener('storage',f);removeEventListener('qx-ls',f)}}
 return onSnapshot(query(collection(db,'leads'),orderBy('createdAt','desc'),limit(500)),s=>cb(s.docs.map(toLead)),onErr);
}
export async function updateLead(id,patch){
 if(!db||String(id).startsWith('local-')){const a=LS.get('qx-leads',[]).map(l=>l.id===id?{...l,...patch}:l);LS.set('qx-leads',a);return a}
 await updateDoc(doc(db,'leads',id),patch);
}
export async function removeLead(id){
 if(!db||String(id).startsWith('local-')){LS.set('qx-leads',LS.get('qx-leads',[]).filter(l=>l.id!==id));return}
 await deleteDoc(doc(db,'leads',id));
}

/* ---------- studio websites ---------- */
const cloud=user=>db&&user&&!user.demo;
export async function listSites(user){
 if(!cloud(user))return LS.get('qx-sites',[]).sort((a,b)=>(b.updatedAt||'').localeCompare(a.updatedAt||''));
 const s=await getDocs(query(collection(db,'sites'),where('ownerUid','==',user.uid)));
 return s.docs.map(d=>({id:d.id,...d.data(),updatedAt:d.data().updatedAt?.toDate?.().toISOString?.()||''})).sort((a,b)=>(b.updatedAt||'').localeCompare(a.updatedAt||''));
}
export async function loadSite(user,id){
 if(!cloud(user))return LS.get('qx-sites',[]).find(x=>x.id===id)||null;
 const d=await getDoc(doc(db,'sites',id));return d.exists()?{id:d.id,...d.data()}:null;
}
export const newSiteId=uid;
/* returns {ok, error}; Firestore documents are limited to 1 MB, so very large pictures are refused */
export async function saveSite(user,site){
 const data={...site,updatedAt:new Date().toISOString()};delete data.id;
 const size=JSON.stringify(data).length;
 if(size>950000)return {ok:false,error:'This website is too large to save (pictures take too much space). Use fewer or smaller pictures.'};
 if(!cloud(user)){const a=LS.get('qx-sites',[]).filter(x=>x.id!==site.id);a.unshift({...data,id:site.id});return LS.set('qx-sites',a.slice(0,30))?{ok:true}:{ok:false,error:'Browser storage is full. Remove a picture or an old website.'}}
 try{await setDoc(doc(db,'sites',site.id),{...data,ownerUid:user.uid,ownerEmail:user.email||'',updatedAt:serverTimestamp()});return {ok:true}}
 catch(e){return {ok:false,error:'Could not save: '+(e.code||e.message)}}
}
export async function deleteSite(user,id){
 if(!cloud(user)){LS.set('qx-sites',LS.get('qx-sites',[]).filter(x=>x.id!==id));return}
 await deleteDoc(doc(db,'sites',id));
}
