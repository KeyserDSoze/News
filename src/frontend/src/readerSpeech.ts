import { useCallback, useEffect, useRef, useState } from 'react';
import type { Locale } from './types';

export type SpeechState={supported:boolean;active:string|null;paused:boolean;error:string|null;start:(id:string,text:string)=>void;pause:()=>void;resume:()=>void;stop:()=>void};

function chunkText(text:string,max=210):string[]{
 const words=text.replace(/\s+/g,' ').trim().split(' ');
 const out:string[]=[];let part='';
 for(const word of words){
  if((part+' '+word).trim().length>max&&part){out.push(part);part=word;}
  else part=part?part+' '+word:word;
 }
 if(part)out.push(part);
 return out;
}

export function useArticleSpeech(locale:Locale,identity:string):SpeechState{
 const supported=typeof window!=='undefined'&&'speechSynthesis' in window&&'SpeechSynthesisUtterance' in window;
 const [active,setActive]=useState<string|null>(null),[paused,setPaused]=useState(false),[error,setError]=useState<string|null>(null);
 const run=useRef(0);
 const stop=useCallback(()=>{
  run.current++;
  if(supported)window.speechSynthesis.cancel();
  setActive(null);setPaused(false);
 },[supported]);
 useEffect(()=>()=>{run.current++;if(supported)window.speechSynthesis.cancel();},[supported,locale,identity]);
 const start=useCallback((id:string,text:string)=>{
  if(!supported){setError(locale==='it'?'Sintesi vocale non disponibile nel browser.':'Speech synthesis is unavailable in this browser.');return;}
  stop();setError(null);
  const token=run.current;
  const engine=window.speechSynthesis;
  const chunks=chunkText(text);
  if(!chunks.length)return;
  const lang=locale==='it'?'it-IT':'en-GB';
  setActive(id);
  const speak=(index:number)=>{
   if(run.current!==token)return;
   if(index>=chunks.length){setActive(null);setPaused(false);return;}
   const utterance=new SpeechSynthesisUtterance(chunks[index]);
   utterance.lang=lang;utterance.rate=1;utterance.pitch=1;
   const voices=engine.getVoices();
   utterance.voice=voices.find(v=>v.lang.toLowerCase()===lang.toLowerCase())||
     voices.find(v=>v.lang.toLowerCase().startsWith(locale))||null;
   utterance.onend=()=>speak(index+1);
   utterance.onerror=(event)=>{
    if(run.current!==token)return;
    if(event.error==='canceled'||event.error==='interrupted')return;
    setError(locale==='it'?'Lettura vocale interrotta dal dispositivo.':'Speech playback stopped by the device.');
    setActive(null);setPaused(false);
   };
   engine.speak(utterance);
  };
  speak(0);
 },[supported,locale,stop]);
 const pause=useCallback(()=>{if(supported&&active){window.speechSynthesis.pause();setPaused(true);}},[supported,active]);
 const resume=useCallback(()=>{if(supported&&active){window.speechSynthesis.resume();setPaused(false);}},[supported,active]);
 return {supported,active,paused,error,start,pause,resume,stop};
}
