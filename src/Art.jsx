import {useId} from 'react';

/* Colour pairs. Every service gets one (see hash() in data.js), so each service page looks different. */
export const PAL=[['#38bdf8','#6366f1'],['#8b5cf6','#38bdf8'],['#116dff','#a78bfa'],['#0ea5e9','#8b5cf6'],['#6366f1','#7dd3fc'],['#a78bfa','#60a5fa']];
const F={fontFamily:'Sora, system-ui, sans-serif'};

const Web=({g,s})=><g className="a-float">
 <g filter={s}><rect x="52" y="44" width="296" height="196" rx="14" fill="#fff"/></g>
 <path d="M52 58a14 14 0 0 1 14-14h268a14 14 0 0 1 14 14v14H52z" fill="#eef2fb"/>
 <circle cx="68" cy="58" r="4" fill="#ff7a7a"/><circle cx="82" cy="58" r="4" fill="#ffc861"/><circle cx="96" cy="58" r="4" fill="#5fd38d"/>
 <rect x="120" y="52" width="150" height="12" rx="6" fill="#fff"/>
 <rect className="a-grow" x="70" y="92" width="130" height="16" rx="8" fill={g}/>
 <rect className="a-grow a-d1" x="70" y="116" width="100" height="9" rx="4.5" fill="#cfd8ea"/>
 <rect className="a-grow a-d2" x="70" y="132" width="116" height="9" rx="4.5" fill="#cfd8ea"/>
 <rect x="70" y="154" width="64" height="22" rx="11" fill="#000"/>
 <rect x="216" y="88" width="112" height="92" rx="12" fill={g}/>
 <circle className="a-pulse" cx="296" cy="112" r="12" fill="#fff" opacity=".85"/>
 <path d="M216 180L250 146 276 168 294 154 328 180z" fill="#fff" opacity=".35"/>
 {[70,150,230].map((x,i)=><rect key={x} className="a-rise" style={{animationDelay:i*.35+'s'}} x={x} y="196" width="68" height="30" rx="8" fill="#f1f4fb"/>)}
 <path className="a-cursor" d="M0 0v18l5-4 4 9 4-2-4-9h7z" fill="#000" stroke="#fff" strokeWidth="1.5"/>
</g>;

const Design=({g,s,a,b})=><g>
 <g className="a-float" filter={s}><rect x="64" y="44" width="200" height="210" rx="14" fill="#fff"/></g>
 <path d="M92 200L110 140M240 100L226 140" stroke={b} strokeWidth="1.5" strokeDasharray="3 3"/>
 <path className="a-draw" pathLength="1" d="M92 200C110 90 150 80 170 150S226 210 240 100" fill="none" stroke={g} strokeWidth="6" strokeLinecap="round"/>
 {[[92,200],[170,150],[240,100]].map(([x,y],i)=><rect key={i} x={x-5} y={y-5} width="10" height="10" fill="#fff" stroke={a} strokeWidth="2"/>)}
 {[[304,70,a],[330,108,b],[298,146,'#000']].map(([x,y,c],i)=><circle key={i} className="a-bob" style={{animationDelay:i*.6+'s'}} cx={x} cy={y} r="18" fill={c}/>)}
 <g className="a-pen"><path d="M0 0l14-5 24-24-9-9-24 24z" fill="#000"/><path d="M0 0l14-5-9-9z" fill={a}/></g>
</g>;

const AI=({g,s,a,b})=><g>
 <g className="a-spin" style={{transformBox:'view-box',transformOrigin:'200px 150px'}}>
  <circle cx="200" cy="150" r="96" fill="none" stroke={b} strokeOpacity=".5" strokeDasharray="4 6"/>
  <circle cx="200" cy="54" r="10" fill={a}/><circle cx="296" cy="150" r="8" fill={b}/><circle cx="132" cy="218" r="9" fill={a}/>
 </g>
 <circle className="a-pulse" cx="200" cy="150" r="48" fill={g}/>
 <circle cx="190" cy="144" r="5" fill="#fff"/><circle cx="210" cy="144" r="5" fill="#fff"/>
 <path d="M188 160q12 9 24 0" stroke="#fff" strokeWidth="4" fill="none" strokeLinecap="round"/>
 <g className="a-float" filter={s}><rect x="40" y="70" width="104" height="46" rx="16" fill="#fff"/>
  {[68,92,116].map((x,i)=><circle key={x} className="a-dot" style={{animationDelay:i*.2+'s'}} cx={x} cy="93" r="6" fill={a}/>)}</g>
 <g className="a-float a-d2" filter={s}><rect x="262" y="196" width="100" height="44" rx="16" fill="#000"/>
  <rect x="278" y="210" width="68" height="7" rx="3.5" fill="#fff" opacity=".9"/><rect x="278" y="223" width="44" height="7" rx="3.5" fill="#fff" opacity=".5"/></g>
</g>;

const Biz=({g,s,a,b})=><g className="a-float">
 <g filter={s}><rect x="46" y="40" width="308" height="220" rx="16" fill="#fff"/></g>
 <rect x="62" y="56" width="80" height="10" rx="5" fill="#cfd8ea"/>
 {[0,1,2].map(i=><rect key={i} x={62+i*98} y="78" width="88" height="40" rx="10" fill="#f1f4fb"/>)}
 <rect x="72" y="90" width="40" height="8" rx="4" fill={g}/><rect x="72" y="104" width="24" height="6" rx="3" fill="#cfd8ea"/>
 {[40,70,52,92,64,84].map((h,i)=><rect key={i} className="a-bar" style={{animationDelay:i*.25+'s'}} x={66+i*26} y={238-h} width="16" height={h} rx="4" fill={i%2?b:a}/>)}
 <circle cx="292" cy="186" r="34" fill="none" stroke="#e6ebf5" strokeWidth="12"/>
 <g transform="rotate(-90 292 186)"><circle className="a-donut" pathLength="100" cx="292" cy="186" r="34" fill="none" stroke={g} strokeWidth="12" strokeLinecap="round" strokeDasharray="68 32"/></g>
 <text x="292" y="191" textAnchor="middle" fontSize="14" fontWeight="700" fill="#111" style={F}>68%</text>
</g>;

const Mobile=({g,s,c,a,b})=><g>
 <g className="a-float" filter={s}>
  <rect x="134" y="40" width="132" height="216" rx="22" fill="#000"/>
  <rect x="140" y="48" width="120" height="200" rx="16" fill="#fff"/>
  <g clipPath={c}><g className="a-scroll">
   {Array.from({length:6}).map((_,i)=><g key={i}><rect x="150" y={62+i*58} width="100" height="48" rx="10" fill={i%2?'#f1f4fb':g}/>
    <circle cx="170" cy={86+i*58} r="10" fill={i%2?g:'#fff'} opacity={i%2?1:.8}/><rect x="188" y={80+i*58} width="52" height="7" rx="3.5" fill={i%2?'#cfd8ea':'#fff'} opacity={i%2?1:.85}/></g>)}
  </g></g>
  <rect x="180" y="52" width="40" height="6" rx="3" fill="#000"/>
 </g>
 <g className="a-pop" filter={s}><rect x="236" y="70" width="112" height="38" rx="14" fill="#fff"/><circle cx="256" cy="89" r="9" fill={g}/>
  <rect x="272" y="82" width="62" height="6" rx="3" fill="#cfd8ea"/><rect x="272" y="93" width="40" height="6" rx="3" fill="#e3e8f3"/></g>
 <g className="a-heart"><path d="M72 190c0-9 12-12 16-4 4-8 16-5 16 4 0 10-16 20-16 20s-16-10-16-20z" fill={b}/></g>
</g>;

const Mkt=({g,s,a,b})=><g>
 <g className="a-float" filter={s}><rect x="46" y="60" width="230" height="190" rx="16" fill="#fff"/></g>
 {[34,58,48,90,76,118].map((h,i)=><rect key={i} className="a-bar" style={{animationDelay:i*.2+'s'}} x={66+i*34} y={232-h} width="22" height={h} rx="6" fill={i%2?b:a}/>)}
 <path className="a-draw" pathLength="1" d="M66 190L112 160 146 172 188 124 226 136 262 96" fill="none" stroke="#000" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
 <g className="a-wob"><path d="M300 110l56-28v96l-56-28z" fill={g}/><rect x="282" y="118" width="26" height="44" rx="8" fill="#000"/><path d="M312 170l8 32h-18z" fill="#000"/></g>
 {[0,1,2].map(i=><path key={i} className="a-wave" style={{animationDelay:i*.5+'s'}} d="M366 112q16 16 0 32" stroke={a} strokeWidth="4" fill="none" strokeLinecap="round"/>)}
 <g className="a-up"><path d="M330 236c0-8 10-10 14-3 4-7 14-5 14 3 0 9-14 17-14 17s-14-8-14-17z" fill={b}/></g>
</g>;

const Cloud=({g,s,a,b})=><g>
 <g className="a-float" filter={s}>
  <g fill="#fff"><circle cx="150" cy="104" r="34"/><circle cx="204" cy="86" r="44"/><circle cx="254" cy="112" r="32"/><rect x="128" y="104" width="152" height="42" rx="21"/></g>
  <path d="M188 116l12 12 24-26" stroke={a} strokeWidth="8" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
 </g>
 {[110,200,290].map(x=><path key={x} className="a-flow" d={`M${x} 210V160`} stroke={b} strokeWidth="3" strokeDasharray="6 8" fill="none"/>)}
 {[70,160,250].map((x,i)=><g key={x} filter={s}><rect x={x} y="212" width="80" height="44" rx="10" fill="#000"/>
  <rect x={x+10} y="224" width="34" height="6" rx="3" fill="#2b3350"/>
  <circle className="a-led" style={{animationDelay:i*.4+'s'}} cx={x+64} cy="227" r="4" fill={a}/><circle className="a-led" style={{animationDelay:i*.4+.2+'s'}} cx={x+52} cy="227" r="4" fill="#5fd38d"/>
  <rect x={x+10} y="238" width="60" height="6" rx="3" fill="#2b3350"/></g>)}
</g>;

const Gear=({cx,cy,r,n,fill,cls})=><g className={cls} style={{transformBox:'view-box',transformOrigin:`${cx}px ${cy}px`}}>
 {Array.from({length:n}).map((_,i)=><rect key={i} x={cx-r*.16} y={cy-r*1.22} width={r*.32} height={r*.5} rx={r*.06} fill={fill} transform={`rotate(${i*360/n} ${cx} ${cy})`}/>)}
 <circle cx={cx} cy={cy} r={r} fill={fill}/><circle cx={cx} cy={cy} r={r*.42} fill="#fff"/></g>;
const Support=({g,s,b})=><g>
 <Gear cx={150} cy={150} r={62} n={8} fill={g} cls="a-spin"/>
 <Gear cx={252} cy={90} r={32} n={6} fill={b} cls="a-spin a-rev"/>
 <g className="a-pulse" filter={s}><path d="M268 154l50 18v44c0 26-24 40-50 50-26-10-50-24-50-50v-44z" fill="#000"/>
  <path d="M246 214l16 16 32-34" stroke="#fff" strokeWidth="9" fill="none" strokeLinecap="round" strokeLinejoin="round"/></g>
</g>;

const Career=({g,s,b})=><g>
 <g className="a-float" filter={s}><rect x="86" y="36" width="190" height="228" rx="16" fill="#fff"/></g>
 <circle cx="130" cy="86" r="24" fill={g}/><circle cx="130" cy="80" r="8" fill="#fff" opacity=".9"/><path d="M114 100a16 14 0 0 1 32 0z" fill="#fff" opacity=".9"/>
 <rect x="168" y="70" width="86" height="10" rx="5" fill="#111"/><rect x="168" y="90" width="60" height="8" rx="4" fill="#cfd8ea"/>
 {[130,150,170,190].map((y,i)=><rect key={y} className="a-grow" style={{animationDelay:i*.3+'s'}} x="106" y={y} width={150-i*22} height="8" rx="4" fill="#dfe6f4"/>)}
 <rect x="106" y="224" width="150" height="12" rx="6" fill="#e6ebf5"/><rect className="a-fill" x="106" y="224" width="150" height="12" rx="6" fill={g}/>
 <polygon className="a-spin" points="310,56 320,80 346,82 326,98 332,124 310,110 288,124 294,98 274,82 300,80" fill={b}/>
 <g className="a-pop"><circle cx="322" cy="204" r="26" fill="#000"/><path d="M310 204l9 9 17-19" stroke="#fff" strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></g>
</g>;

const SCENES=[Web,Design,AI,Biz,Mobile,Mkt,Cloud,Support,Career];

/* k = category index (0-8), v = colour variant (0-5) */
export function Art({k=0,v=0,className='',label=''}){
 const [a,b]=PAL[v%PAL.length],id=useId().replace(/:/g,''),S=SCENES[k%SCENES.length];
 return <svg className={'art '+className} viewBox="0 0 400 300" role={label?'img':undefined} aria-label={label||undefined} aria-hidden={label?undefined:true} style={{'--a':a,'--b':b}}>
  <defs>
   <linearGradient id={id+'g'} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={a}/><stop offset="1" stopColor={b}/></linearGradient>
   <linearGradient id={id+'bg'} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={a} stopOpacity=".14"/><stop offset="1" stopColor={b} stopOpacity=".24"/></linearGradient>
   <filter id={id+'s'} x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="8" stdDeviation="9" floodColor="#1e2a55" floodOpacity=".16"/></filter>
   <clipPath id={id+'c'}><rect x="140" y="48" width="120" height="200" rx="16"/></clipPath>
  </defs>
  <rect width="400" height="300" rx="26" fill={`url(#${id}bg)`}/>
  <circle className="a-orb a-o1" cx="70" cy="70" r="46" fill={a} opacity=".18"/>
  <circle className="a-orb a-o2" cx="340" cy="240" r="58" fill={b} opacity=".2"/>
  <S g={`url(#${id}g)`} s={`url(#${id}s)`} c={`url(#${id}c)`} a={a} b={b}/>
 </svg>;
}
