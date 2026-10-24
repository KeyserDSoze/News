import {createContext,useCallback,useContext,useEffect,useRef,useState} from 'react';
import type {PropsWithChildren} from 'react';
import type {Locale} from './types';

export type AudioItem={title:string;text:string};
export type AudioRequest={
  key:string;
  title:string;
  href:string;
  kind:'briefing'|'article'|'body';
  locale:Locale;
  items:AudioItem[];
};
export type AudioSession={
  key:string;title:string;href:string;kind:AudioRequest['kind'];
  locale:Locale;itemIndex:number;itemCount:number;currentTitle:string;paused:boolean;
};
type AudioContextValue={
  supported:boolean;session:AudioSession|null;error:string|null;
  start:(request:AudioRequest)=>void;pause:()=>void;resume:()=>void;stop:()=>void;
};

const AudioContext=createContext<AudioContextValue|null>(null);
function splitSpeech(text:string){
  const words=text.replace(/\s+/g,' ').trim().split(' ');
  const chunks:string[]=[];
  let part='';
  for(const word of words){
    if(part&&(part+' '+word).length>210){chunks.push(part);part=word;}
    else part=part?part+' '+word:word;
  }
  if(part)chunks.push(part);
  return chunks;
}

/** One speech engine for the entire SPA. Route changes never unmount this provider. */
export function AudioProvider({children}:PropsWithChildren){
  const supported=typeof window!=='undefined'&&
    'speechSynthesis' in window&&'SpeechSynthesisUtterance' in window;
  const [session,setSession]=useState<AudioSession|null>(null);
  const [error,setError]=useState<string|null>(null);
  const generation=useRef(0);
  const currentUtterance=useRef<SpeechSynthesisUtterance|null>(null);

  const stop=useCallback(()=>{
    generation.current++;
    currentUtterance.current=null;
    if(supported)window.speechSynthesis.cancel();
    setSession(null);
  },[supported]);

  useEffect(()=>()=>{generation.current++;currentUtterance.current=null;
    if(supported)window.speechSynthesis.cancel();
  },[supported]);

  const start=useCallback((request:AudioRequest)=>{
    if(!supported){
      setError(request.locale==='it'?'Sintesi vocale non disponibile nel dispositivo.':'Speech synthesis unavailable on this device.');
      return;
    }
    // Cancel the previous session before playing the replacement. Stale onend
    // events cannot advance either the old or new queue.
    generation.current++;
    const run=generation.current;
    window.speechSynthesis.cancel();
    currentUtterance.current=null;
    setError(null);
    const items=request.items.map(item=>({...item,chunks:splitSpeech(item.text)}))
      .filter(item=>item.chunks.length>0);
    if(!items.length){setSession(null);return;}
    const engine=window.speechSynthesis;
    const lang=request.locale==='it'?'it-IT':'en-GB';
    const voices=engine.getVoices();
    const voice=voices.find(v=>v.lang.toLowerCase()===lang.toLowerCase())
      ||voices.find(v=>v.lang.toLowerCase().startsWith(request.locale))||null;
    const base={key:request.key,title:request.title,href:request.href,
      kind:request.kind,locale:request.locale,itemCount:items.length};
    setSession({...base,itemIndex:0,currentTitle:items[0].title,paused:false});
    const read=(itemIndex:number,chunkIndex:number)=>{
      if(generation.current!==run)return;
      if(itemIndex>=items.length){
        currentUtterance.current=null;setSession(null);return;
      }
      const item=items[itemIndex];
      if(chunkIndex>=item.chunks.length){read(itemIndex+1,0);return;}
      setSession(previous=>previous?.key===request.key?
        {...previous,itemIndex,currentTitle:item.title}:previous);
      const utterance=new SpeechSynthesisUtterance(item.chunks[chunkIndex]);
      utterance.lang=lang;utterance.voice=voice;utterance.rate=1;utterance.pitch=1;
      utterance.onend=()=>{if(generation.current===run){
        currentUtterance.current=null;read(itemIndex,chunkIndex+1);
      }};
      utterance.onerror=(event)=>{
        if(generation.current!==run||event.error==='canceled'||event.error==='interrupted')return;
        setError(request.locale==='it'?'Lettura interrotta dal dispositivo.':'Speech playback stopped by the device.');
        generation.current++;currentUtterance.current=null;setSession(null);
      };
      currentUtterance.current=utterance;
      engine.speak(utterance);
    };
    read(0,0);
  },[supported]);

  const pause=useCallback(()=>{
    if(!supported)return;
    window.speechSynthesis.pause();
    setSession(previous=>previous?{...previous,paused:true}:null);
  },[supported]);
  const resume=useCallback(()=>{
    if(!supported)return;
    window.speechSynthesis.resume();
    setSession(previous=>previous?{...previous,paused:false}:null);
  },[supported]);
  return <AudioContext.Provider value={{supported,session,error,start,pause,resume,stop}}>
    {children}
  </AudioContext.Provider>;
}
export function useAudioPlayer(){
  const context=useContext(AudioContext);
  if(!context)throw new Error('AudioProvider is required for every speech control');
  return context;
}
