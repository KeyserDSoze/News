import { useEffect, useRef, useState } from 'react';
import { ArrowRight, BookOpen, Download, ExternalLink, Menu, Smartphone, X } from 'lucide-react';
import { APP_VERSION } from './releases';
import { usePwaInstall } from './pwa';
import { releasesHref } from './routes';
import type { Locale } from './types';

export default function AppMenu({locale}:{locale:Locale}){
 const [open,setOpen]=useState(false),[instructions,setInstructions]=useState(false);
 const install=usePwaInstall(),panel=useRef<HTMLDivElement>(null);
 const it=locale==='it';
 useEffect(()=>{
  if(!open)return;
  const close=(event:MouseEvent)=>{if(panel.current&&!panel.current.contains(event.target as Node))setOpen(false);};
  const escape=(event:KeyboardEvent)=>{if(event.key==='Escape')setOpen(false);};
  document.addEventListener('pointerdown',close);
  document.addEventListener('keydown',escape);
  return()=>{document.removeEventListener('pointerdown',close);document.removeEventListener('keydown',escape);};
 },[open]);
 const ios=/iPad|iPhone|iPod/.test(navigator.userAgent)||(/Macintosh/.test(navigator.userAgent)&&navigator.maxTouchPoints>1);
 const message=ios?
  (it?'In Safari tocca Condividi (il quadrato con la freccia), poi «Aggiungi alla schermata Home».':'In Safari tap Share (the box with an arrow), then “Add to Home Screen”.'):
  (it?'Apri il menu del browser e scegli «Installa app» oppure «Aggiungi alla schermata Home», se disponibile.':'Open your browser menu and choose “Install app” or “Add to Home Screen”, if available.');
 return <div className="app-menu" ref={panel}>
  <button type="button" className="icon-btn menu-open" aria-expanded={open} aria-haspopup="true"
    aria-label={it?'Menu di O':'O menu'} onClick={()=>setOpen(o=>!o)}>{open?<X size={20}/>:<Menu size={20}/>}</button>
  {open&&<div className="app-menu-panel" role="menu" aria-label={it?'Menu principale':'Main menu'}>
    <div className="app-menu-intro"><span className="menu-o">O<span>.</span></span><div><strong>{it?'Oggettivizzatore':'Objectivizer'}</strong><small>{it?'0 pubblicità. 0 sensazionalismi.':'0 ads. 0 clickbait.'}</small></div></div>
    <a role="menuitem" href={releasesHref()} onClick={()=>setOpen(false)} className="menu-line">
      <BookOpen size={17}/><span><strong>{it?'Note di rilascio':'Release notes'}</strong><small>v{APP_VERSION}</small></span><ArrowRight size={16}/>
    </a>
    <button role="menuitem" type="button" className="menu-line" onClick={async()=>{
      if(install.installed){setInstructions(!instructions);return;}
      if(install.canPrompt)await install.install();
      else setInstructions(v=>!v);
    }}><Download size={17}/><span><strong>{install.installed?(it?'App già installata':'App installed'):(it?'Installa O':'Install O')}</strong>
      <small>{it?'Android · iPhone · desktop':'Android · iPhone · desktop'}</small></span><ArrowRight size={16}/></button>
    {instructions&&<div className="install-help"><Smartphone size={18}/><p>{install.installed?(it?'Stai già usando O come app. Gli aggiornamenti si installano automaticamente.':'You are already using O as an app. Updates install automatically.'):message}</p></div>}
    <a role="menuitem" className="menu-line" href="https://github.com/KeyserDSoze/News/blob/main/docs/EDITORIAL_POLICY.md"
      target="_blank" rel="noopener noreferrer"><BookOpen size={17}/><span><strong>{it?'Il nostro metodo':'Our methodology'}</strong></span><ExternalLink size={15}/></a>
    <div className="app-menu-footer">O · v{APP_VERSION} <span>{it?'Aggiornamenti automatici':'Automatic updates'}</span></div>
  </div>}
 </div>;
}
