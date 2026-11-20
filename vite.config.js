import {defineConfig,loadEnv} from 'vite';import react from '@vitejs/plugin-react';
/* In `npm run dev`, POST /api/lead runs the same code as the Vercel function (server/lead.js). */
const api=()=>({name:'qyrixx-api',configureServer(server){
 const env=loadEnv(server.config.mode,process.cwd(),'');Object.assign(process.env,env);
 server.middlewares.use('/api/lead',async(req,res)=>{const m=await server.ssrLoadModule('/server/lead.js');await m.default(req,res)});
}});
export default defineConfig({plugins:[react(),api()]});
