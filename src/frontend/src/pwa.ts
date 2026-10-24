import { useEffect, useState } from 'react';
import { APP_VERSION } from './releases';

interface InstallPromptEvent extends Event {
  prompt:()=>Promise<void>;
  userChoice:Promise<{outcome:'accepted'|'dismissed';platform:string}>;
}
let deferredInstall:InstallPromptEvent|null=null;
const listeners=new Set<()=>void>();
function notify(){listeners.forEach(callback=>callback());}
function isStandalone(){
 return window.matchMedia('(display-mode: standalone)').matches ||
  (navigator as Navigator & {standalone?:boolean}).standalone===true;
}
export function usePwaInstall(){
 const [installed,setInstalled]=useState(isStandalone);
 const [canPrompt,setCanPrompt]=useState(Boolean(deferredInstall));
 useEffect(()=>{
  const onBefore=(event:Event)=>{event.preventDefault();deferredInstall=event as InstallPromptEvent;notify();};
  const onInstalled=()=>{deferredInstall=null;setInstalled(true);notify();};
  const update=()=>{setCanPrompt(Boolean(deferredInstall));setInstalled(isStandalone());};
  listeners.add(update);
  window.addEventListener('beforeinstallprompt',onBefore);
  window.addEventListener('appinstalled',onInstalled);
  return()=>{listeners.delete(update);window.removeEventListener('beforeinstallprompt',onBefore);window.removeEventListener('appinstalled',onInstalled);};
 },[]);
 async function install(){
  if(!deferredInstall)return false;
  const event=deferredInstall;deferredInstall=null;notify();
  await event.prompt();
  const choice=await event.userChoice;
  return choice.outcome==='accepted';
 }
 return {installed,canPrompt,install};
}
export function registerPwa(){
 if(!('serviceWorker' in navigator)||!window.isSecureContext)return;
 window.addEventListener('load',()=>{
  const scope=import.meta.env.BASE_URL;
  const hadController=Boolean(navigator.serviceWorker.controller);
  let reloaded=false;
  navigator.serviceWorker.addEventListener('controllerchange',()=>{
   if(reloaded||!hadController)return;
   reloaded=true;
   // Keep place and search state on the next load through the existing session history.
   sessionStorage.setItem('o-reload-scroll',String(window.scrollY));
   window.location.reload();
  });
  navigator.serviceWorker.register(scope+'sw.js',{scope,updateViaCache:'none'}).then(reg=>{
   const check=()=>{if(navigator.onLine&&document.visibilityState==='visible')void reg.update().catch(()=>{});};
   check();
   document.addEventListener('visibilitychange',check);
   window.addEventListener('online',check);
   window.setInterval(check,30*60*1000);
  }).catch(error=>console.warn('Service worker registration',error));
 });
}
export { APP_VERSION };
