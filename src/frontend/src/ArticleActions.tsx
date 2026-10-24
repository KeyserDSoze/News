import { useState } from 'react';
import { Check, Copy, Headphones, Pause, Play, Square } from 'lucide-react';
import type { Locale } from './types';
import type { SpeechState } from './readerSpeech';

interface Props { id:string; label:string; markdown:string; speechText:string; locale:Locale; reader:SpeechState; full?:boolean; }
export function ArticleActions({id,label,markdown,speechText,locale,reader,full=false}:Props) {
 const [copied,setCopied]=useState(false),[error,setError]=useState(false);
 const it=locale==='it';
 async function copy(){
  try{
   if(navigator.clipboard?.writeText)await navigator.clipboard.writeText(markdown);
   else {
    const el=document.createElement('textarea');el.value=markdown;el.style.position='fixed';el.style.opacity='0';
    document.body.appendChild(el);el.select();const ok=document.execCommand('copy');el.remove();
    if(!ok)throw new Error('Clipboard unavailable');
   }
   setCopied(true);setError(false);
  }catch{setError(true);}
 }
 const active=reader.active===id;
 return <div className={'reader-actions '+(full?'reader-actions-full':'')} role="group" aria-label={(it?'Strumenti per ':'Tools for ')+label}>
   <button type="button" title={it?'Copia in Markdown':'Copy as Markdown'} aria-label={(it?'Copia in Markdown: ':'Copy as Markdown: ')+label}
     onClick={copy}><Copy size={15}/><span>{copied?(it?'Copiato':'Copied'):(it?'Markdown':'Markdown')}</span></button>
   {reader.supported&&(!active?
     <button type="button" title={it?'Ascolta con la voce del dispositivo':'Listen using device voice'} aria-label={(it?'Ascolta: ':'Listen: ')+label}
       onClick={()=>reader.start(id,speechText)}><Headphones size={16}/><span>{it?'Ascolta':'Listen'}</span></button>:
     <>
       <button type="button" aria-label={(reader.paused?(it?'Riprendi: ':'Resume: '):(it?'Pausa: ':'Pause: '))+label}
         onClick={reader.paused?reader.resume:reader.pause}>{reader.paused?<Play size={15}/>:<Pause size={15}/>}<span>{reader.paused?(it?'Riprendi':'Resume'):(it?'Pausa':'Pause')}</span></button>
       <button type="button" aria-label={(it?'Interrompi: ':'Stop: ')+label} onClick={reader.stop}><Square size={14}/><span>{it?'Ferma':'Stop'}</span></button>
     </>)}
   {copied&&!error&&<span className="sr-only" role="status"><Check size={13}/>{it?'Markdown copiato':'Markdown copied'}</span>}
   {error&&<span role="alert" className="reader-error">{it?'Copia non riuscita':'Copy failed'}</span>}
 </div>;
}
