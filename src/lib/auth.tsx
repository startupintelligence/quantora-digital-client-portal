import {createContext,useContext,useEffect,useMemo,useState,type ReactNode} from "react";
import {onAuthStateChanged,signInWithEmailAndPassword,signOut,type User} from "firebase/auth";
import {doc,getDoc} from "firebase/firestore";
import {auth,db} from "./firebase";
import type {PortalUser} from "./types";
type Ctx={firebaseUser:User|null;profile:PortalUser|null;loading:boolean;login:(e:string,p:string)=>Promise<void>;logout:()=>Promise<void>};
const Context=createContext<Ctx|null>(null);
export function AuthProvider({children}:{children:ReactNode}){const [firebaseUser,setFirebaseUser]=useState<User|null>(null);const [profile,setProfile]=useState<PortalUser|null>(null);const [loading,setLoading]=useState(true);
useEffect(()=>onAuthStateChanged(auth,async u=>{setFirebaseUser(u);if(u){try{const s=await getDoc(doc(db,"users",u.uid));const d=s.data();setProfile(s.exists()?{uid:u.uid,email:u.email??"",displayName:String(d?.displayName??u.displayName??u.email??"Member"),role:d?.role,organizationId:d?.organizationId} as PortalUser:null);}catch{setProfile(null);}}else setProfile(null);setLoading(false);}),[]);
const value=useMemo(()=>({firebaseUser,profile,loading,login:async(e:string,p:string)=>{await signInWithEmailAndPassword(auth,e.trim(),p);},logout:async()=>{await signOut(auth);}}),[firebaseUser,profile,loading]);return <Context.Provider value={value}>{children}</Context.Provider>;}
export function useAuth(){const v=useContext(Context);if(!v)throw new Error("useAuth requires AuthProvider");return v;}