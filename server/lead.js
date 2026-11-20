/* Shared lead handler: used by the Vercel function (api/lead.js) and by the Vite dev server.
   1) validates the request, 2) saves it in Firestore (collection "leads"), 3) emails the team.
   Environment (set in Vercel > Project > Settings > Environment Variables):
     VITE_FIREBASE_API_KEY, VITE_FIREBASE_PROJECT_ID  (already used by the site)
     GMAIL_USER          Gmail address that sends the mail, e.g. qyrixx2026@gmail.com
     GMAIL_APP_PASSWORD  16-character Gmail "App password" (Google Account > Security > App passwords)
     LEAD_NOTIFY_TO      who receives the mail (default qyrixx2026@gmail.com) */
import nodemailer from 'nodemailer';

const TYPES=['enquiry','booking','domain','support','site','chat'];
const FIELDS={name:120,email:160,phone:20,company:120,category:80,service:120,budget:60,timeline:60,message:4000,domain:120,siteId:80,siteName:120,template:60,date:20,page:200,uid:128};
const NOTIFY_TO=()=>process.env.LEAD_NOTIFY_TO||'qyrixx2026@gmail.com';
const hits=new Map();/* best-effort limit: 8 requests per IP per 10 minutes (per server instance) */
const limited=ip=>{const now=Date.now(),a=(hits.get(ip)||[]).filter(t=>now-t<6e5);a.push(now);hits.set(ip,a);return a.length>8};

export function clean(body){
 if(!body||typeof body!=='object')return {error:'Invalid request.'};
 if(body.website)return {spam:true};/* honeypot field, humans leave it empty */
 const type=TYPES.includes(body.type)?body.type:'enquiry',lead={type};
 for(const [k,max] of Object.entries(FIELDS)){const v=body[k];if(v==null||v==='')continue;lead[k]=String(v).replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g,'').trim().slice(0,max)}
 if(!lead.email||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email))return {error:'Enter a valid email address.'};
 if(!lead.name)return {error:'Enter your name.'};
 if(type==='domain'&&!lead.domain)return {error:'Enter a domain.'};
 if(!['domain','site','booking'].includes(type)&&!lead.message)return {error:'Write a short message.'};
 return {lead};
}

async function saveToFirestore(lead){
 const key=process.env.VITE_FIREBASE_API_KEY,pid=process.env.VITE_FIREBASE_PROJECT_ID;
 if(!key||!pid)return null;
 const fields={status:{stringValue:'new'},createdAt:{timestampValue:new Date().toISOString()}};
 for(const [k,v] of Object.entries(lead))fields[k]={stringValue:v};
 const r=await fetch(`https://firestore.googleapis.com/v1/projects/${pid}/databases/(default)/documents/leads?key=${key}`,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({fields})});
 if(!r.ok)throw new Error('Firestore '+r.status+': '+(await r.text()).slice(0,200));
 const j=await r.json();return j.name.split('/').pop();
}

const LABEL={enquiry:'New project enquiry',booking:'New booking request',domain:'New domain request',support:'New support request',site:'Website publish request',chat:'New chat question'};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
async function sendMail(lead,id){
 const user=process.env.GMAIL_USER,pass=process.env.GMAIL_APP_PASSWORD;
 if(!user||!pass)return false;
 const t=nodemailer.createTransport({service:'gmail',auth:{user,pass}});
 const rows=Object.entries(lead).filter(([k])=>k!=='type').map(([k,v])=>`<tr><td style="padding:6px 14px 6px 0;color:#666;vertical-align:top">${esc(k)}</td><td style="padding:6px 0;white-space:pre-wrap">${esc(v)}</td></tr>`).join('');
 const subject=`${LABEL[lead.type]}: ${lead.name}${lead.service?' · '+lead.service:''}${lead.domain?' · '+lead.domain:''}`;
 await t.sendMail({from:`QYRIXX Website <${user}>`,to:NOTIFY_TO(),replyTo:lead.email,subject,
  text:Object.entries(lead).map(([k,v])=>`${k}: ${v}`).join('\n')+(id?`\n\nCRM id: ${id}`:''),
  html:`<div style="font:15px/1.5 Arial,sans-serif;color:#111"><h2 style="margin:0 0 12px;color:#660016">${esc(LABEL[lead.type])}</h2><table>${rows}</table>${id?`<p style="color:#666;font-size:13px">CRM id: ${esc(id)} · open the dashboard CRM to update its status.</p>`:''}</div>`});
 return true;
}

/* Node-style handler: works on Vercel (req.body parsed) and in the Vite dev server (body read here). */
export default async function handler(req,res){
 const send=(code,obj)=>{res.statusCode=code;res.setHeader('content-type','application/json');res.end(JSON.stringify(obj))};
 if(req.method!=='POST')return send(405,{ok:false,error:'Use POST.'});
 let body=req.body;
 if(body===undefined){let raw='';for await(const c of req){raw+=c;if(raw.length>2e4)return send(413,{ok:false,error:'Too large.'})}try{body=JSON.parse(raw||'{}')}catch{return send(400,{ok:false,error:'Invalid JSON.'})}}
 else if(typeof body==='string'){try{body=JSON.parse(body)}catch{return send(400,{ok:false,error:'Invalid JSON.'})}}
 const ip=String(req.headers['x-forwarded-for']||req.socket?.remoteAddress||'').split(',')[0].trim();
 if(limited(ip))return send(429,{ok:false,error:'Too many requests. Please try again in a few minutes.'});
 const c=clean(body);
 if(c.spam)return send(200,{ok:true});
 if(c.error)return send(400,{ok:false,error:c.error});
 let id=null,stored=false,mailed=false;const problems=[];
 try{id=await saveToFirestore(c.lead);stored=!!id}catch(e){problems.push(e.message)}
 try{mailed=await sendMail(c.lead,id)}catch(e){problems.push('mail: '+e.message)}
 if(problems.length)console.error('lead problems',problems);
 if(!stored&&!mailed&&(process.env.VITE_FIREBASE_PROJECT_ID||process.env.GMAIL_USER))return send(502,{ok:false,error:'We could not send your request right now. Please email us instead.'});
 send(200,{ok:true,id,stored,mailed});
}
