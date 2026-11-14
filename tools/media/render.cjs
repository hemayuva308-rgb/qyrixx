/* Renders tools/media/studio.html into public/assets/posters/*.jpg and public/assets/reels/*.mp4 (+ .jpg cover).
   Needs: the dev server running (npm run dev), Playwright with Chromium, and ffmpeg.
   Usage: node tools/media/render.cjs [posters|reels] [http://localhost:5173] */
const {chromium}=require('playwright'),{spawn}=require('child_process'),fs=require('fs'),path=require('path');
const what=process.argv[2]||'all',base=(process.argv[3]||'http://localhost:5173')+'/tools/media/studio.html',pub=path.join(__dirname,'../../public/assets');
const slug=s=>s.toLowerCase().replace(/&/g,'and').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const FPS=30,SECS=6;
(async()=>{
 const b=await chromium.launch();
 const open=async(q,w,h,scale)=>{const p=await b.newPage({viewport:{width:w,height:h},deviceScaleFactor:scale});await p.goto(base+q,{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);return p};
 const p0=await open('?poster=0',1080,1350,1),N=await p0.evaluate(()=>window.NAMES);await p0.close();
 if(what!=='reels'){fs.mkdirSync(pub+'/posters',{recursive:true});
  for(let i=0;i<N.posters.length;i++){const p=await open('?poster='+i,1080,1350,.8);await p.screenshot({path:`${pub}/posters/${slug(N.posters[i])}.jpg`,quality:86,type:'jpeg'});await p.close();console.log('poster',N.posters[i])}}
 if(what!=='posters'){fs.mkdirSync(pub+'/reels',{recursive:true});
  for(let i=0;i<N.reels.length;i++){const p=await open('?reel='+i,720,1280,1),out=`${pub}/reels/${slug(N.reels[i])}`;
   const seek=t=>p.evaluate(t=>document.getAnimations().forEach(a=>{a.pause();a.currentTime=t}),t);
   const ff=spawn('ffmpeg',['-y','-loglevel','error','-f','image2pipe','-framerate',String(FPS),'-c:v','mjpeg','-i','-','-c:v','libx264','-preset','slow','-crf','24','-pix_fmt','yuv420p','-movflags','+faststart','-an',out+'.mp4'],{stdio:['pipe','inherit','inherit']});
   for(let f=0;f<FPS*SECS;f++){await seek(f*1000/FPS);ff.stdin.write(await p.screenshot({type:'jpeg',quality:95}))}
   ff.stdin.end();await new Promise(r=>ff.on('close',r));
   await seek(5300);await p.screenshot({path:out+'.jpg',type:'jpeg',quality:84});await p.close();console.log('reel',N.reels[i])}}
 await b.close()})();
