import {useCallback} from 'react';
import {useAudioPlayer} from './audioPlayer';
import type {Locale} from './types';

export type SpeechState={
 supported:boolean;active:string|null;paused:boolean;error:string|null;
 start:(id:string,text:string,label?:string)=>void;
 pause:()=>void;resume:()=>void;stop:()=>void;
};

/** A scoped view of the global player. Unmounting an article never stops narration. */
export function useArticleSpeech(locale:Locale,identity:string,title?:string,href?:string):SpeechState{
 const player=useAudioPlayer();
 const prefix=identity+':';
 const active=player.session?.locale===locale&&player.session?.key.startsWith(prefix)
   ?player.session.key.slice(prefix.length):null;
 const start=useCallback((id:string,text:string,label?:string)=>{
   player.start({key:prefix+id,kind:id==='body'?'body':'article',locale,
    title:title||label||'O',href:href||window.location.pathname,
    items:[{title:label||title||'O',text}]});
 },[player.start,prefix,locale,title,href]);
 return {supported:player.supported,active,paused:!!active&&!!player.session?.paused,
   error:active?player.error:null,start,pause:player.pause,resume:player.resume,stop:player.stop};
}
