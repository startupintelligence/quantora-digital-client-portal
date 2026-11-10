import {useState,type FormEvent} from "react";
import {Navigate} from "react-router-dom";
import {sendPasswordResetEmail} from "firebase/auth";
import {auth} from "../lib/firebase";
import {useAuth} from "../lib/auth";
import {isAdminRole} from "../lib/types";

export function Login(){
 const {firebaseUser,profile,loading,login,logout}=useAuth();
 const [email,setEmail]=useState("");const [password,setPassword]=useState("");
 const [error,setError]=useState("");const [notice,setNotice]=useState("");const [busy,setBusy]=useState(false);
 if(firebaseUser&&profile)return <Navigate to={isAdminRole(profile.role)?"/admin/dashboard":"/portal/dashboard"} replace/>;
 if(loading)return <div className="center">Loading secure workspace…</div>;
 if(firebaseUser&&!profile)return <div className="center"><section className="panel"><h2>Account setup pending</h2><p>Your sign-in is valid, but QD has not assigned a portal profile yet. Contact your administrator, then sign out and try again.</p><button className="secondary" onClick={()=>logout()}>Sign out</button></section></div>;
 const submit=async(e:FormEvent)=>{e.preventDefault();setBusy(true);setError("");setNotice("");try{await login(email,password);}catch{setError("Email or password is incorrect. If you need access, contact your QD project manager.");}finally{setBusy(false);}};
 const reset=async()=>{setError("");setNotice("");if(!email.trim()){setError("Enter your email address first.");return;}try{await sendPasswordResetEmail(auth,email.trim());setNotice("If an account exists for this email, a password reset link has been sent.");}catch{setError("We could not send a reset email. Check the address and Firebase email settings.");}};
 return <div className="login"><section className="login-left"><div className="brand"><span className="mark">Q</span><span><b>QUANTORA</b><small>DIGITAL WORKSPACE</small></span></div><div className="hero"><p className="eyebrow">A BETTER WAY TO WORK TOGETHER</p><h1>Your work.<br/>In clear view.</h1><p>One shared space for project progress, decisions and communication.</p></div><small>QUANTORA DIGITAL · CLIENT SERVICES</small></section><section className="login-right"><form onSubmit={submit}><p className="eyebrow">WELCOME BACK</p><h2>Sign in to your portal</h2><p className="muted">Use the email address invited by Quantora Digital.</p><label>Email address<input type="email" required autoComplete="username" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@company.com"/></label><label>Password<input type="password" required autoComplete="current-password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Your password"/></label>{error&&<p className="error" role="alert">{error}</p>}{notice&&<p className="notice" role="status">{notice}</p>}<button className="primary" disabled={busy}>{busy?"Signing in…":"Sign in"}</button><button className="link-button" type="button" onClick={reset}>Forgot password?</button><small>Need access? Contact your Quantora Digital project manager.</small></form></section></div>;
}