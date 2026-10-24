import { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown, Globe2 } from 'lucide-react';
import type { Locale } from './types';

export default function LanguageMenu({locale,onChange}:{locale:Locale;onChange:(locale:Locale)=>void}){
 const [open,setOpen]=useState(false);
 const container=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  if(!open)return;
  const outside=(event:PointerEvent)=>{if(!container.current?.contains(event.target as Node))setOpen(false);};
  const escape=(event:KeyboardEvent)=>{if(event.key==='Escape')setOpen(false);};
  document.addEventListener('pointerdown',outside);
  document.addEventListener('keydown',escape);
  return()=>{document.removeEventListener('pointerdown',outside);document.removeEventListener('keydown',escape);};
 },[open]);
 return <div className="language-menu" ref={container}>
  <button type="button" className="lang-btn" aria-label={locale==='it'?'Seleziona lingua':'Select language'}
    aria-haspopup="menu" aria-expanded={open} onClick={()=>setOpen(x=>!x)}>
    <Globe2 size={17}/><span>{locale.toUpperCase()}</span><ChevronDown size={14} className={open?'chevron-open':''}/>
  </button>
  {open&&<div className="language-options" role="menu" aria-label={locale==='it'?'Lingua del sito':'Site language'}>
    {([['it','Italiano'],['en','English']] as const).map(([value,name])=>
      <button type="button" role="menuitemradio" aria-checked={locale===value}
        key={value} onClick={()=>{onChange(value);setOpen(false);}}>
        <span className="language-code">{value.toUpperCase()}</span><span>{name}</span>
        {locale===value&&<Check size={15}/>}
      </button>)}
  </div>}
 </div>;
}
