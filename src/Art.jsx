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

/* ---------- extra scenes: FAQ pictures and product-of-the-week pictures ---------- */
const L=({x,y,w,h=8,c='#cfd8ea',cls,d})=><rect className={cls} style={d?{animationDelay:d+'s'}:undefined} x={x} y={y} width={w} height={h} rx={h/2} fill={c}/>;
const Tick=({x,y,r=1,c='#fff'})=><path d={`M${x-7*r} ${y}l${5*r} ${5*r} ${10*r}-${11*r}`} stroke={c} strokeWidth={3.4*r} fill="none" strokeLinecap="round" strokeLinejoin="round"/>;

/* FAQ 1: what QYRIXX does (website + app + results) */
const FDoes=({g,s,a,b})=><g>
 <g className="a-float" filter={s}>
  <rect x="34" y="50" width="236" height="170" rx="14" fill="#fff"/>
  <path d="M34 64a14 14 0 0 1 14-14h208a14 14 0 0 1 14 14v12H34z" fill="#eef2fb"/>
  <circle cx="50" cy="63" r="3.5" fill="#ff7a7a"/><circle cx="62" cy="63" r="3.5" fill="#ffc861"/><circle cx="74" cy="63" r="3.5" fill="#5fd38d"/>
  <L x={52} y={94} w={98} h={14} c={g} cls="a-grow"/><L x={52} y={118} w={116} cls="a-grow a-d1"/><L x={52} y={134} w={88} cls="a-grow a-d2"/>
  <rect x="52" y="158" width="62" height="22" rx="11" fill="#000"/>
  <rect x="184" y="92" width="62" height="88" rx="10" fill="#f1f4fb"/>
 </g>
 <g className="a-float a-d2" filter={s}>
  <rect x="244" y="78" width="108" height="190" rx="22" fill="#000"/><rect x="250" y="86" width="96" height="174" rx="16" fill="#fff"/>
  <rect x="258" y="98" width="80" height="48" rx="10" fill={g}/><circle className="a-pulse" cx="318" cy="114" r="8" fill="#fff" opacity=".85"/>
  <L x={258} y={156} w={58}/><L x={258} y={170} w={40} c="#e3e8f3"/>
  <rect x="258" y="188" width="37" height="30" rx="8" fill="#f1f4fb"/><rect x="301" y="188" width="37" height="30" rx="8" fill="#f1f4fb"/>
  <rect x="258" y="230" width="80" height="18" rx="9" fill="#000"/>
 </g>
 <g className="a-rise" filter={s}><rect x="58" y="206" width="126" height="58" rx="14" fill="#fff"/>
  {[14,24,18,32].map((h,i)=><rect key={i} className="a-bar" style={{animationDelay:i*.25+'s'}} x={74+i*16} y={250-h} width="10" height={h} rx="3" fill={i%2?b:a}/>)}
  <L x={146} y={226} w={26} c={g}/><L x={146} y={240} w={18}/></g>
</g>;

/* FAQ 2: how to start (your brief -> written proposal) */
const FStart=({g,s,b})=><g>
 <g className="a-float" filter={s}><rect x="40" y="56" width="152" height="188" rx="16" fill="#fff"/>
  <L x={58} y={76} w={72} h={10} c="#111"/>
  {[0,1,2].map(i=><g key={i}><rect x="58" y={100+i*34} width="116" height="24" rx="8" fill="#f1f4fb"/><L x={68} y={108+i*34} w={48+i*16} cls="a-grow" d={i*.3}/></g>)}
  <rect x="58" y="206" width="66" height="22" rx="11" fill="#000"/></g>
 <path className="a-flow" d="M202 150h40" stroke={b} strokeWidth="3" strokeDasharray="6 8" fill="none"/>
 <path d="M238 141l11 9-11 9" stroke={b} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
 <g className="a-float a-d2" filter={s}><rect x="260" y="66" width="106" height="150" rx="14" fill="#fff"/>
  <path d="M260 80a14 14 0 0 1 14-14h78a14 14 0 0 1 14 14v22H260z" fill={g}/><L x={274} y={80} w={46} c="#fff"/>
  <L x={274} y={118} w={78}/><L x={274} y={134} w={60}/><L x={274} y={150} w={70}/>
  <L x={274} y={178} w={34} h={10} c="#111"/></g>
 <g className="a-pulse"><circle cx="352" cy="216" r="24" fill="#000"/><Tick x={351} y={217}/></g>
</g>;

/* FAQ 3: what affects the price (scope controls) */
const FScope=({g,s,a})=><g className="a-float">
 <g filter={s}><rect x="56" y="44" width="288" height="212" rx="18" fill="#fff"/></g>
 <L x={78} y={66} w={96} h={10} c="#111"/>
 {[.72,.42,.88].map((p,i)=><g key={i}>
  <L x={78} y={98+i*40} w={54+i*10}/>
  <L x={78} y={114+i*40} w={244} h={6} c="#e6ebf5"/><L x={78} y={114+i*40} w={244*p} h={6} c={g}/>
  <circle className="a-pulse" style={{animationDelay:i*.5+'s'}} cx={78+244*p} cy={117+i*40} r="9" fill="#fff" stroke={a} strokeWidth="3.5"/></g>)}
 {[0,1,2].map(i=><rect key={i} x={78+i*84} y="218" width="74" height="22" rx="11" fill={i?'#f1f4fb':'#000'}/>)}
</g>;

/* FAQ 4: what QYRIXX can build (six kinds of work) */
const FBuild=({g,s,a,b})=><g>
 {[0,1,2,3,4,5].map(i=>{const x=58+(i%3)*98,y=i<3?52:156,dk=i===4,gr=i===0,fg=dk||gr?'#fff':'#111',sub=dk?'#3a3f4d':gr?'rgba(255,255,255,.55)':'#cfd8ea';
  return <g key={i} className="a-rise" style={{animationDelay:i*.3+'s'}} filter={s}>
   <rect x={x} y={y} width="88" height="92" rx="16" fill={dk?'#000':gr?g:'#fff'}/>
   {i===0&&<><rect x={x+20} y={y+20} width="48" height="34" rx="6" fill="none" stroke={fg} strokeWidth="3"/><path d={`M${x+20} ${y+31}h48`} stroke={fg} strokeWidth="3"/></>}
   {i===1&&<><rect x={x+31} y={y+16} width="26" height="42" rx="7" fill="none" stroke={fg} strokeWidth="3"/><circle cx={x+44} cy={y+50} r="2.4" fill={fg}/></>}
   {i===2&&[12,22,16,30].map((h,j)=><rect key={j} x={x+22+j*12} y={y+56-h} width="8" height={h} rx="2.5" fill={j%2?b:a}/>)}
   {i===3&&<><circle cx={x+44} cy={y+37} r="19" fill={g}/><circle cx={x+37} cy={y+34} r="3" fill="#fff"/><circle cx={x+51} cy={y+34} r="3" fill="#fff"/><path d={`M${x+36} ${y+43}q8 6 16 0`} stroke="#fff" strokeWidth="2.6" fill="none" strokeLinecap="round"/></>}
   {i===4&&<path d={`M${x+22} ${y+52}c8-34 18-34 22-12s14 14 22-18`} stroke="#fff" strokeWidth="3.4" fill="none" strokeLinecap="round"/>}
   {i===5&&<g fill={a}><circle cx={x+34} cy={y+42} r="10"/><circle cx={x+47} cy={y+34} r="14"/><circle cx={x+58} cy={y+44} r="9"/><rect x={x+26} y={y+40} width="40" height="13" rx="6.5"/></g>}
   <L x={x+20} y={y+70} w={48} h={7} c={sub}/></g>})}
</g>;

/* FAQ 5: what a project costs (calculator + written quote) */
const FCost=({g,s,a})=><g>
 <g className="a-float" filter={s}><rect x="62" y="40" width="156" height="220" rx="20" fill="#fff"/>
  <rect x="78" y="56" width="124" height="48" rx="12" fill="#000"/>
  <text x="92" y="88" fontSize="22" fontWeight="700" fill="#fff" style={F}>₹</text><L x={134} y={74} w={54} h={12} c="#fff" cls="a-grow"/>
  {Array.from({length:12}).map((_,i)=><rect key={i} x={78+(i%3)*43} y={118+Math.floor(i/3)*33} width="38" height="26" rx="8" fill={i===11?g:'#f1f4fb'}/>)}
 </g>
 <g className="a-wob"><g filter={s}><path d="M250 76h62l34 34-34 34h-62a10 10 0 0 1-10-10V86a10 10 0 0 1 10-10z" fill={g}/></g>
  <circle cx="312" cy="110" r="7" fill="#fff"/><L x={254} y={98} w={36} c="#fff"/><L x={254} y={114} w={24} c="rgba(255,255,255,.6)"/></g>
 <g className="a-rise" filter={s}><rect x="236" y="184" width="124" height="56" rx="16" fill="#fff"/>
  <circle cx="264" cy="212" r="14" fill="#000"/><Tick x={263} y={213} r={.7}/><L x={288} y={202} w={56} c="#111"/><L x={288} y={218} w={38}/></g>
</g>;

/* FAQ 6: hosting (servers kept safe and running) */
const FHost=({g,s,a})=><g>
 {[0,1,2].map(i=>{const dk=i===1,y=62+i*62;return <g key={i} className="a-rise" style={{animationDelay:i*.35+'s'}} filter={s}>
  <rect x="48" y={y} width="204" height="50" rx="13" fill={dk?'#000':'#fff'}/>
  <circle className="a-led" style={{animationDelay:i*.4+'s'}} cx="72" cy={y+25} r="5" fill="#5fd38d"/><circle className="a-led" style={{animationDelay:i*.4+.25+'s'}} cx="89" cy={y+25} r="5" fill={a}/>
  <L x={108} y={y+21} w={78} c={dk?'#3a3f4d':'#cfd8ea'}/>
  {[0,1,2,3].map(j=><rect key={j} x={204+j*9} y={y+15} width="4" height="20" rx="2" fill={dk?'#3a3f4d':'#dfe6f4'}/>)}</g>})}
 <g className="a-float a-d1" filter={s}><path d="M312 80l48 17v42c0 26-22 40-48 50-26-10-48-24-48-50V97z" fill={g}/><Tick x={311} y={138} r={1.5}/></g>
</g>;

/* FAQ 7: domain (your own address) */
const FDomain=({g,s,b})=><g>
 <g><ellipse cx="200" cy="124" rx="150" ry="88" fill="none" stroke={b} strokeOpacity=".4" strokeDasharray="4 7"/>
  <circle cx="50" cy="124" r="7" fill={b}/><circle cx="350" cy="124" r="5" fill="#000"/></g>
 <g className="a-float" filter={s}><rect x="36" y="92" width="328" height="64" rx="32" fill="#fff"/>
  <circle cx="70" cy="124" r="17" fill={g}/><rect x="63" y="122" width="14" height="11" rx="3" fill="#fff"/><path d="M66 122v-4a4 4 0 0 1 8 0v4" stroke="#fff" strokeWidth="2.4" fill="none"/>
  <text x="98" y="130" fontSize="17" fontWeight="600" fill="#111" style={F}>www.yourbusiness</text>
  <rect x="294" y="104" width="58" height="40" rx="20" fill="#000"/><Tick x={322} y={125} r={.9}/></g>
 {['.com','.in','.tech'].map((d,i)=><g key={d} className="a-rise" style={{animationDelay:i*.35+'s'}} filter={s}>
  <rect x={70+i*92} y="192" width="78" height="40" rx="20" fill={i?'#fff':g}/>
  <text x={109+i*92} y="218" textAnchor="middle" fontSize="15" fontWeight="600" fill={i?'#111':'#fff'} style={F}>{d}</text></g>)}
</g>;

/* FAQ 8: SEO (search, pages and steady growth) */
const FSeo=({g,s,a})=><g>
 <g className="a-float" filter={s}><rect x="46" y="44" width="308" height="52" rx="26" fill="#fff"/>
  <circle cx="78" cy="68" r="9" fill="none" stroke={a} strokeWidth="3.5"/><path d="M85 75l8 8" stroke={a} strokeWidth="3.5" strokeLinecap="round"/>
  <L x={106} y={65} w={128} cls="a-grow"/><rect x="290" y="54" width="52" height="32" rx="16" fill="#000"/></g>
 <g filter={s}><rect x="46" y="112" width="194" height="146" rx="16" fill="#fff"/></g>
 {[0,1,2].map(i=><g key={i}><rect x="62" y={128+i*42} width="24" height="24" rx="7" fill={i?'#f1f4fb':g}/>
  <L x={98} y={130+i*42} w={i?96:118} c={i?'#cfd8ea':'#111'}/><L x={98} y={144+i*42} w={70-i*8} c="#e3e8f3"/></g>)}
 <g filter={s}><rect x="254" y="112" width="100" height="146" rx="16" fill="#000"/></g>
 <L x={270} y={130} w={44} c="#3a3f4d"/>
 <path className="a-draw" pathLength="1" d="M270 232l22-24 16 12 30-46" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
 <circle className="a-pulse" cx="338" cy="174" r="6" fill={a}/>
</g>;

/* Product: billing and invoices */
const PBill=({g,s})=><g>
 <g className="a-float" filter={s}><rect x="104" y="32" width="192" height="236" rx="16" fill="#fff"/>
  <circle cx="134" cy="62" r="12" fill={g}/><L x={154} y={52} w={62} h={9} c="#111"/><L x={154} y={67} w={40} h={6}/>
  <rect x="236" y="50" width="44" height="22" rx="11" fill="#f1f4fb"/>
  {[0,1,2,3].map(i=><g key={i}><L x={122} y={100+i*26} w={84-i*10} cls="a-grow" d={i*.25}/><L x={248} y={100+i*26} w={32} c="#dfe6f4"/></g>)}
  <path d="M122 206h158" stroke="#e6ebf5" strokeWidth="2"/>
  <L x={122} y={224} w={50} h={10} c="#111"/><rect x="210" y="216" width="70" height="26" rx="13" fill={g}/><L x={224} y={225} w={42} c="#fff"/></g>
 <g className="a-rise" filter={s}><rect x="24" y="186" width="98" height="62" rx="13" fill="#000"/>
  <rect x="37" y="200" width="22" height="16" rx="5" fill={g}/><L x={37} y={228} w={58} h={6} c="#fff"/></g>
 <g className="a-pulse"><circle cx="318" cy="96" r="26" fill="#000"/><Tick x={317} y={97}/></g>
</g>;

/* Product: AI chatbot */
const PChat=({g,s,a})=><g>
 <g className="a-float" filter={s}><rect x="86" y="30" width="228" height="240" rx="20" fill="#fff"/>
  <path d="M86 50a20 20 0 0 1 20-20h188a20 20 0 0 1 20 20v28H86z" fill="#000"/>
  <circle cx="116" cy="54" r="14" fill={g}/><circle cx="111" cy="52" r="2.4" fill="#fff"/><circle cx="121" cy="52" r="2.4" fill="#fff"/><path d="M110 59q6 4 12 0" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round"/>
  <L x={140} y={46} w={70} c="#fff"/><L x={140} y={60} w={40} h={6} c="#5fd38d"/>
  <rect x="102" y="94" width="130" height="38" rx="14" fill="#f1f4fb"/><L x={116} y={104} w={96} cls="a-grow"/><L x={116} y={118} w={64}/>
  <rect x="176" y="142" width="122" height="30" rx="14" fill={g}/><L x={190} y={153} w={84} c="#fff"/>
  <rect x="102" y="182" width="74" height="32" rx="14" fill="#f1f4fb"/>
  {[0,1,2].map(i=><circle key={i} className="a-dot" style={{animationDelay:i*.2+'s'}} cx={122+i*17} cy="198" r="5" fill={a}/>)}
  <rect x="102" y="226" width="160" height="30" rx="15" fill="#f1f4fb"/><circle cx="283" cy="241" r="15" fill="#000"/><path d="M277 241h11m-4-5l5 5-5 5" stroke="#fff" strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/></g>
 <g className="a-rise a-d2" filter={s}><rect x="30" y="118" width="74" height="40" rx="14" fill="#fff"/><circle cx="50" cy="138" r="9" fill={g}/><L x={66} y={134} w={26}/></g>
</g>;

/* Product: CRM */
const PCrm=({g,s,a,b})=><g>
 <g className="a-float" filter={s}><rect x="36" y="40" width="328" height="220" rx="18" fill="#fff"/></g>
 <L x={56} y={58} w={84} h={10} c="#111"/><rect x="300" y="52" width="46" height="22" rx="11" fill="#000"/>
 {[3,2,1].map((n,c)=><g key={c}><L x={56+c*100} y={90} w={44} h={7} c={c===2?a:'#cfd8ea'}/>
  {Array.from({length:n}).map((_,r)=>{const won=c===2,x=56+c*100,y=108+r*46;return <g key={r} className={r===0?'a-rise':undefined} style={{animationDelay:c*.4+'s'}}>
   <rect x={x} y={y} width="88" height="38" rx="10" fill={won?g:'#f1f4fb'}/>
   <circle cx={x+17} cy={y+19} r="9" fill={won?'#fff':[a,b,'#000'][(c+r)%3]}/><L x={x+33} y={y+11} w={42} h={6} c={won?'#fff':'#b9c4da'}/><L x={x+33} y={y+23} w={28} h={5} c={won?'rgba(255,255,255,.6)':'#dfe6f4'}/></g>})}</g>)}
 <g className="a-pulse"><circle cx="346" cy="232" r="24" fill="#000"/><Tick x={345} y={233}/></g>
</g>;

/* Product: food delivery app */
const PFood=({g,s,a,b})=><g>
 <g className="a-float" filter={s}><rect x="72" y="34" width="136" height="232" rx="24" fill="#000"/><rect x="78" y="42" width="124" height="216" rx="18" fill="#fff"/>
  <rect x="118" y="46" width="44" height="6" rx="3" fill="#000"/>
  <L x={90} y={66} w={60} h={9} c="#111"/>
  {[0,1].map(i=><g key={i}><rect x="90" y={86+i*66} width="100" height="56" rx="12" fill={i?'#f1f4fb':g}/>
   <circle cx="116" cy={114+i*66} r="16" fill="#fff"/><circle cx="116" cy={114+i*66} r="9" fill={i?a:b} opacity={i?1:.85}/>
   <L x={140} y={104+i*66} w={40} h={6} c={i?'#b9c4da':'#fff'}/><L x={140} y={118+i*66} w={26} h={6} c={i?'#dfe6f4':'rgba(255,255,255,.6)'}/></g>)}
  <rect x="90" y="222" width="100" height="24" rx="12" fill="#000"/></g>
 <path className="a-flow" d="M232 226c40 0 20-70 62-70s28-40 32-60" stroke={b} strokeWidth="3" strokeDasharray="6 8" fill="none"/>
 <circle cx="232" cy="226" r="8" fill="#000"/>
 <g className="a-bob"><path d="M326 46c-14 0-24 10-24 23 0 17 24 37 24 37s24-20 24-37c0-13-10-23-24-23z" fill={g}/><circle cx="326" cy="69" r="9" fill="#fff"/></g>
 <g className="a-rise" filter={s}><rect x="246" y="196" width="118" height="50" rx="16" fill="#fff"/><circle cx="270" cy="221" r="12" fill="none" stroke={a} strokeWidth="3.5"/><path d="M270 214v7l5 3" stroke={a} strokeWidth="2.6" fill="none" strokeLinecap="round"/><L x={292} y={212} w={56} c="#111"/><L x={292} y={226} w={36}/></g>
</g>;

/* Product: online store */
const PShop=({g,s,a})=><g>
 <g className="a-float" filter={s}><rect x="36" y="46" width="316" height="212" rx="16" fill="#fff"/>
  <path d="M36 62a16 16 0 0 1 16-16h284a16 16 0 0 1 16 16v14H36z" fill="#eef2fb"/>
  <circle cx="54" cy="61" r="3.5" fill="#ff7a7a"/><circle cx="66" cy="61" r="3.5" fill="#ffc861"/><circle cx="78" cy="61" r="3.5" fill="#5fd38d"/><rect x="100" y="55" width="150" height="12" rx="6" fill="#fff"/>
  {[0,1,2].map(i=><g key={i}><rect x={54+i*98} y="92" width="84" height="70" rx="12" fill={i===1?g:'#f1f4fb'}/>
   <circle className={i===1?'a-pulse':undefined} cx={96+i*98} cy="127" r="17" fill="#fff" opacity={i===1?.9:1}/>
   <L x={54+i*98} y={172} w={62}/><L x={54+i*98} y={186} w={34} c="#111"/>
   <rect x={54+i*98} y="204" width="84" height="26" rx="13" fill={i===1?'#000':'#f1f4fb'}/></g>)}</g>
 <g className="a-rise" filter={s}><circle cx="340" cy="56" r="28" fill="#000"/>
  <path d="M326 46h5l4 16h14l3-11h-19" stroke="#fff" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/><circle cx="337" cy="68" r="2.4" fill="#fff"/><circle cx="347" cy="68" r="2.4" fill="#fff"/>
  <circle cx="358" cy="38" r="9" fill={a}/></g>
</g>;

const FAQS=[FDoes,FStart,FScope,FBuild,FCost,FHost,FDomain,FSeo];
/* Product-of-the-week pictures, by service name. A service that is not listed here uses its category picture. */
const NAMED={'Billing & Invoice Solution':PBill,'AI Chatbot Development':PChat,'CRM Solution':PCrm,'Food Delivery App':PFood,'E-commerce Website':PShop};
/* Brand colours (same maroon as the buttons) */
const BRAND=['#d0324f','#660016'];

const SCENES=[Web,Design,AI,Biz,Mobile,Mkt,Cloud,Support,Career];

/* k = category index (0-8), v = colour variant (0-5).
   tone="brand" uses the maroon brand colours. faq = FAQ picture number. name = service name (product pictures).
   cover = fill the whole box behind it (used by the FAQ picture frame). */
export function Art({k=0,v=0,className='',label='',tone,faq,name,cover}){
 const [a,b]=tone==='brand'?BRAND:PAL[v%PAL.length],id=useId().replace(/:/g,''),S=faq!=null?FAQS[faq%FAQS.length]:(name&&NAMED[name])||SCENES[k%SCENES.length];
 return <svg className={'art '+(cover?'art-cover ':'')+className} viewBox="0 0 400 300" role={label?'img':undefined} aria-label={label||undefined} aria-hidden={label?undefined:true} style={{'--a':a,'--b':b}}>
  <defs>
   <linearGradient id={id+'g'} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={a}/><stop offset="1" stopColor={b}/></linearGradient>
   <linearGradient id={id+'bg'} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={a} stopOpacity=".14"/><stop offset="1" stopColor={b} stopOpacity=".24"/></linearGradient>
   <filter id={id+'s'} x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="8" stdDeviation="9" floodColor="#1e2a55" floodOpacity=".16"/></filter>
   <clipPath id={id+'c'}><rect x="140" y="48" width="120" height="200" rx="16"/></clipPath>
  </defs>
  {cover?<rect x="-400" y="-300" width="1200" height="900" fill={`url(#${id}bg)`}/>:<rect width="400" height="300" rx="26" fill={`url(#${id}bg)`}/>}
  <circle className="a-orb a-o1" cx="70" cy="70" r="46" fill={a} opacity=".18"/>
  <circle className="a-orb a-o2" cx="340" cy="240" r="58" fill={b} opacity=".2"/>
  <S g={`url(#${id}g)`} s={`url(#${id}s)`} c={`url(#${id}c)`} a={a} b={b}/>
 </svg>;
}
