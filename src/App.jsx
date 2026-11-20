import {useEffect} from 'react';
import {Routes,Route,Navigate,useLocation} from 'react-router-dom';
import {IMG,PROJECTS,PRODUCTS} from './config';
import {Home,Services,Category,Service,Login,Contact,Legal,Gallery,NotFound,Pricing,AboutPage} from './Pages';
import {PRIVACY,TERMS} from './legal';
import {PublicLayout,Protected} from './Shell';
import Dashboard,{Discover} from './Dashboard';
import Crm from './Crm';
import Studio,{MySites,NewSite} from './studio/Studio';
import {useI18n} from './i18n';

export default function App(){
 const {pathname,hash}=useLocation(),{t}=useI18n();
 useEffect(()=>{if(hash){setTimeout(()=>document.querySelector(hash)?.scrollIntoView(),0)}else scrollTo(0,0)},[pathname,hash]);
 return <Routes>
  <Route element={<PublicLayout/>}>
   <Route path="/" element={<Home/>}/>
   <Route path="/services" element={<Services/>}/>
   <Route path="/services/:cat" element={<Category/>}/>
   <Route path="/services/:cat/:svc" element={<Service/>}/>
   <Route path="/pricing" element={<Pricing/>}/><Route path="/about" element={<AboutPage/>}/><Route path="/login" element={<Login/>}/><Route path="/contact" element={<Contact/>}/>
   <Route path="/projects" element={<Navigate to="/app/projects" replace/>}/><Route path="/products" element={<Navigate to="/app/products" replace/>}/>
   <Route path="/privacy" element={<Legal title="Privacy Policy (Draft)" html={PRIVACY}/>}/><Route path="/terms" element={<Legal title="Terms & Conditions (Draft)" html={TERMS}/>}/>
   <Route path="*" element={<NotFound/>}/>
  </Route>
  <Route path="/studio/new/:k" element={<Protected><NewSite/></Protected>}/>
  <Route path="/studio/:id" element={<Protected><Studio/></Protected>}/>
  <Route path="/app" element={<Protected><Dashboard/></Protected>}>
   <Route index element={<Discover/>}/>
   <Route path="services" element={<Services embedded/>}/>
   <Route path="services/:cat" element={<Category embedded/>}/>
   <Route path="services/:cat/:svc" element={<Service embedded/>}/>
   <Route path="projects" element={<Gallery title={t('dash.projects')} items={PROJECTS} ph={IMG.project} empty={t('dash.projSoon')}/>}/>
   <Route path="products" element={<Gallery title={t('dash.products')} items={PRODUCTS} ph={IMG.product} empty={t('dash.prodSoon')}/>}/>
   <Route path="crm" element={<Crm/>}/>
   <Route path="sites" element={<MySites/>}/>
  </Route>
 </Routes>;
}
