/* Renders a studio website from its data. In edit mode every text is editable in place and every
   picture can be replaced; the same component is used for the live preview. */
import {FONTS} from './templates';

const Ic={arrow:<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
 pin:<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="9.5" r="2.5" fill="currentColor"/></svg>,
 mail:<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M3 7l9 6 9-6" fill="none" stroke="currentColor" strokeWidth="2"/></svg>,
 clock:<svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M12 7v5l3 2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>,
 img:<svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="3" fill="none" stroke="currentColor" strokeWidth="1.8"/><circle cx="9" cy="10" r="2" fill="currentColor"/><path d="M4 18l5-5 4 4 3-3 4 4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>};

/* editable text */
function E({v,p,as:Tag='span',className='',ph='Type here',multi,c}){
 if(!c.edit)return v?<Tag className={className}>{v}</Tag>:null;
 return <Tag key={v} className={className+' qs-e'} contentEditable suppressContentEditableWarning spellCheck data-ph={ph} role="textbox" aria-multiline={!!multi} aria-label={ph}
  onBlur={e=>{const t=e.currentTarget.innerText.replace(/\n{3,}/g,'\n\n').trim();if(t!==v)c.text(p,t)}}
  onKeyDown={e=>{if(e.key==='Enter'&&!multi){e.preventDefault();e.currentTarget.blur()}if(e.key==='Escape')e.currentTarget.blur()}}
  onClick={e=>e.stopPropagation()}>{v}</Tag>;
}
/* picture or placeholder */
function Pic({src,p,c,className='',label='Picture'}){
 const inner=src?<img src={src} alt=""/>:<div className="qs-ph"><i/><i/>{Ic.img}<span>{c.edit?'Add picture':label}</span></div>;
 if(!c.edit)return <div className={'qs-pic '+className}>{inner}</div>;
 return <button type="button" className={'qs-pic qs-pick '+className} onClick={e=>{e.stopPropagation();c.image(p)}} aria-label={src?'Replace picture':'Add picture'}>{inner}<span className="qs-pick-l">{src?'Replace picture':'Add picture'}</span></button>;
}
const Btn=({v,p,c,alt})=>(v||c.edit)?<span className={'qs-btn'+(alt?' alt':'')}><E v={v} p={p} c={c} ph="Button text"/>{!alt&&Ic.arrow}</span>:null;

const S={
 hero:(d,c)=><header className={'qs-hero l-'+(d.layout||'split')}>
  {d.layout==='cover'&&<Pic src={d.image} p={['image']} c={c} className="qs-cover" label="Cover picture"/>}
  <div className="qs-hero-t"><E v={d.kicker} p={['kicker']} c={c} className="qs-kick" ph="Small line above the title"/>
   <E as="h1" v={d.title} p={['title']} c={c} ph="Headline" multi/>
   <E as="p" v={d.text} p={['text']} c={c} ph="A short description" multi/>
   <div className="qs-row"><Btn v={d.cta} p={['cta']} c={c}/><Btn v={d.cta2} p={['cta2']} c={c} alt/></div></div>
  {d.layout!=='cover'&&<Pic src={d.image} p={['image']} c={c} className="qs-hero-i" label="Main picture"/>}
 </header>,
 features:(d,c)=><section className="qs-sec"><E as="h2" v={d.title} p={['title']} c={c} ph="Section title"/>
  <div className="qs-feat">{d.items.map((it,i)=><div key={i} className="qs-card"><b className="qs-num">{String(i+1).padStart(2,'0')}</b>
   <E as="h3" v={it.title} p={['items',i,'title']} c={c} ph="Title"/><E as="p" v={it.text} p={['items',i,'text']} c={c} ph="Description" multi/></div>)}</div></section>,
 about:(d,c)=><section className="qs-sec qs-about"><Pic src={d.image} p={['image']} c={c} label="About picture"/>
  <div><E as="h2" v={d.title} p={['title']} c={c} ph="Section title"/><E as="p" v={d.text} p={['text']} c={c} ph="Your story" multi/></div></section>,
 list:(d,c)=><section className="qs-sec"><E as="h2" v={d.title} p={['title']} c={c} ph="Section title"/>
  <div className="qs-list">{d.items.map((it,i)=><div key={i} className="qs-li"><div><E as="h3" v={it.name} p={['items',i,'name']} c={c} ph="Name"/><E as="p" v={it.text} p={['items',i,'text']} c={c} ph="Description" multi/></div>
   <E v={it.price} p={['items',i,'price']} c={c} className="qs-price" ph="Price"/></div>)}</div></section>,
 gallery:(d,c)=><section className="qs-sec"><E as="h2" v={d.title} p={['title']} c={c} ph="Section title"/>
  <div className="qs-gal">{d.images.map((src,i)=><Pic key={i} src={src} p={['images',i]} c={c} label={'Picture '+(i+1)}/>)}</div></section>,
 testimonial:(d,c)=><section className="qs-sec qs-quote"><span className="qs-qm" aria-hidden="true">“</span>
  <E as="blockquote" v={d.quote} p={['quote']} c={c} ph="What the customer said" multi/><E v={d.author} p={['author']} c={c} className="qs-auth" ph="Name"/></section>,
 cta:(d,c)=><section className="qs-sec"><div className="qs-band"><div><E as="h2" v={d.title} p={['title']} c={c} ph="Title"/><E as="p" v={d.text} p={['text']} c={c} ph="Description" multi/></div><Btn v={d.cta} p={['cta']} c={c}/></div></section>,
 contact:(d,c)=><section className="qs-sec qs-contact"><div><E as="h2" v={d.title} p={['title']} c={c} ph="Section title"/><E as="p" v={d.text} p={['text']} c={c} ph="Description" multi/>
   <ul>{[['address',Ic.pin,'Address'],['email',Ic.mail,'Email'],['hours',Ic.clock,'Opening hours']].filter(([k])=>d[k]||c.edit).map(([k,ic,ph])=><li key={k}>{ic}<E v={d[k]} p={[k]} c={c} ph={ph}/></li>)}</ul></div>
  <div className="qs-form" aria-hidden="true"><span>Your name</span><span>Email address</span><span className="tall">Message</span><Btn v={d.cta} p={['cta']} c={c}/></div></section>};

export const fontOf=k=>FONTS.find(f=>f.k===k)||FONTS[0];
export default function Site({site,edit=false,sel,onSelect,onText,onImage}){
 const th=site.theme,f=fontOf(th.font),hero=site.sections.find(s=>s.type==='hero'&&!s.hidden);
 const NAV={features:'Why us',about:'About',gallery:'Gallery',contact:'Contact'};
 const links=site.sections.filter(s=>!s.hidden&&(NAV[s.type]||s.type==='list')).slice(0,4).map(s=>({id:s.id,l:NAV[s.type]||(s.data.title.split(' ').length<=2?s.data.title:'Services')}));
 return <div className={'qs'+(edit?' editing':'')} style={{'--p':th.primary,'--a':th.accent,'--bg':th.bg,'--ink':th.ink,'--r':th.radius+'px','--fh':`"${f.head}",system-ui,sans-serif`,'--fb':`"${f.body}",system-ui,sans-serif`}}>
  <link rel="stylesheet" href={`https://fonts.googleapis.com/css2?family=${f.q}&display=swap`}/>
  <nav className="qs-nav"><b className="qs-brand">{site.brand||site.name}</b><span className="qs-links">{links.map(s=><span key={s.id}>{s.l}</span>)}</span>{hero?.data.cta&&<span className="qs-btn sm">{hero.data.cta}</span>}</nav>
  {site.sections.map(s=>{if(s.hidden&&!edit)return null;const R=S[s.type];if(!R)return null;
   const c={edit,text:(p,v)=>onText(s.id,p,v),image:p=>onImage(s.id,p)};
   return <div key={s.id} className={'qs-s'+(edit&&sel===s.id?' sel':'')+(s.hidden?' off':'')} onClick={edit?()=>onSelect(s.id):undefined} data-label={edit?s.type:undefined}>{R(s.data,c)}</div>})}
  <footer className="qs-foot">© {new Date().getFullYear()} {site.brand||site.name}</footer>
 </div>;
}
