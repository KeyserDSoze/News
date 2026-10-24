import { useCallback, useEffect, useRef, useState } from 'react';
import { formatDate, sectionName } from './i18n';
import type { Edition, Locale, Section } from './types';

/** Play today's ordered stories as a single narrated press briefing. */
export function useBriefingSpeech(edition:Edition|null,section:Section,locale:Locale,enabled:boolean){
  const supported=typeof window!=='undefined'&&'speechSynthesis' in window&&'SpeechSynthesisUtterance' in window;
  const [active,setActive]=useState(false);
  const [paused,setPaused]=useState(false);
  const [current,setCurrent]=useState<number|null>(null);
  const [error,setError]=useState<string|null>(null);
  const token=useRef(0);

  const stop=useCallback(()=>{
    token.current++;
    if(supported)window.speechSynthesis.cancel();
    setActive(false);setPaused(false);setCurrent(null);
  },[supported]);

  // Mounted sections remain in the DOM to preserve scroll state; hidden ones must not speak.
  useEffect(()=>{
    if(!enabled)stop();
  },[enabled,stop]);
  useEffect(()=>()=>{
    token.current++;
    if(supported)window.speechSynthesis.cancel();
  },[supported,locale,section,edition?.date]);

  const play=useCallback(()=>{
    if(!supported||!enabled||!edition?.articles.length)return;
    stop();setError(null);
    const run=token.current;
    const engine=window.speechSynthesis;
    const language=locale==='it'?'it-IT':'en-GB';
    const voice=engine.getVoices().find(v=>v.lang.toLowerCase()===language.toLowerCase())||
      engine.getVoices().find(v=>v.lang.toLowerCase().startsWith(locale))||null;
    const stories=edition.articles.slice().sort((a,b)=>a.rank-b.rank);
    const intro=locale==='it'
      ?'La rassegna del giorno. '+sectionName(section,locale)+'. '+formatDate(edition.date,locale)+'. '
      :'Today’s briefing. '+sectionName(section,locale)+'. '+formatDate(edition.date,locale)+'. ';
    const paragraphs=stories.map((story,i)=>
      (i===0?intro:'')+
      (locale==='it'?'Notizia ':'Story ')+(i+1)+'. '+
      story.title+'. '+story.dek+'. '+story.summary);
    const chunks=paragraphs.map(text=>{
      const words=text.replace(/\s+/g,' ').trim().split(' ');
      const result:string[]=[];let part='';
      for(const word of words){
        if((part+' '+word).trim().length>210&&part){result.push(part);part=word;}
        else part=part?part+' '+word:word;
      }
      if(part)result.push(part);
      return result;
    });
    setActive(true);setPaused(false);
    const read=(story:number,chunk:number)=>{
      if(token.current!==run)return;
      if(story>=chunks.length){
        setActive(false);setPaused(false);setCurrent(null);
        return;
      }
      if(chunk>=chunks[story].length){read(story+1,0);return;}
      setCurrent(story+1);
      const utterance=new SpeechSynthesisUtterance(chunks[story][chunk]);
      utterance.lang=language;utterance.rate=1;utterance.pitch=1;utterance.voice=voice;
      utterance.onend=()=>read(story,chunk+1);
      utterance.onerror=event=>{
        if(token.current!==run||event.error==='interrupted'||event.error==='canceled')return;
        setError(locale==='it'?'Lettura interrotta dal dispositivo.':'Playback stopped by the device.');
        stop();
      };
      engine.speak(utterance);
    };
    read(0,0);
  },[edition,enabled,locale,section,stop,supported]);

  const pause=useCallback(()=>{
    if(supported&&active){window.speechSynthesis.pause();setPaused(true);}
  },[active,supported]);
  const resume=useCallback(()=>{
    if(supported&&active){window.speechSynthesis.resume();setPaused(false);}
  },[active,supported]);
  return {supported,active,paused,current,total:edition?.articles.length||0,error,play,pause,resume,stop};
}
export type BriefingSpeech=ReturnType<typeof useBriefingSpeech>;
