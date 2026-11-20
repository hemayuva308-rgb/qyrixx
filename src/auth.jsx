import {createContext,useContext,useEffect,useRef,useState} from 'react';
import {initializeApp} from 'firebase/app';
import {getAuth,onAuthStateChanged,RecaptchaVerifier,signInWithPhoneNumber,GoogleAuthProvider,signInWithPopup,signOut} from 'firebase/auth';
import {CFG} from './config';
export const OK=!!CFG.firebase.apiKey;
export const app=OK?initializeApp(CFG.firebase):null;
const auth=app?getAuth(app):null;
/* Demo preview: only works while Firebase is NOT configured, so you can look at the dashboard before adding keys. */
const PV='qx-preview';
export const preview=on=>{try{on?sessionStorage.setItem(PV,'1'):sessionStorage.removeItem(PV)}catch{}};
const isPv=()=>{try{return !OK&&sessionStorage.getItem(PV)==='1'}catch{return false}};
const Ctx=createContext(null);
export const useAuth=()=>useContext(Ctx);
export function AuthProvider({children}){
 const [user,setUser]=useState(()=>isPv()?{displayName:'Demo user',email:'demo@preview',demo:true}:null),[loading,setLoading]=useState(OK),conf=useRef(null),rv=useRef(null);
 useEffect(()=>OK?onAuthStateChanged(auth,u=>{setUser(u);setLoading(false)}):undefined,[]);
 const api={user,loading,
  sendOtp:async(n,btnId)=>{rv.current=rv.current||new RecaptchaVerifier(auth,btnId,{size:'invisible'});conf.current=await signInWithPhoneNumber(auth,'+91'+n,rv.current)},
  confirmOtp:code=>conf.current.confirm(code),
  google:()=>signInWithPopup(auth,new GoogleAuthProvider()),
  logout:()=>{if(user?.demo){preview(false);setUser(null);return}return signOut(auth)}};
 return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}
