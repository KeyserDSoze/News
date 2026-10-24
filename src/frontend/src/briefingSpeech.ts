import {useCallback} from 'react';
import {useAudioPlayer} from './audioPlayer';
import {formatDate,sectionName} from './i18n';
import {sectionHref} from './routes';
import type {Edition,Locale,Section} from './types';

/** Scoped playback controls only: the actual engine lives above the router. */
export function useBriefingSpeech(edition:Edition|null,section:Section,locale:Locale){
 const player=useAudioPlayer();
 const key=section+'/'+(edition?.date||'')+'/'+locale+':briefing';
 const active=player.session?.key===key;
 const play=useCallback(()=>{
   if(!edition?.articles.length)return;
   const prefix=locale==='it'?'Notizia ':'Story ';
   const items=edition.articles.slice().sort((a,b)=>a.rank-b.rank).map((article,i)=>({
     title:article.title,
     text:(i===0?(locale==='it'?'La rassegna del giorno. ':'Today’s briefing. ')+
       sectionName(section,locale)+'. '+formatDate(edition.date,locale)+'. ':'')+
       prefix+(i+1)+'. '+article.title+'. '+article.dek+'. '+article.summary
   }));
   player.start({key,title:(locale==='it'?'Rassegna ':'Briefing ')+sectionName(section,locale)+
     ' · '+formatDate(edition.date,locale),href:sectionHref(section),kind:'briefing',locale,items});
 },[edition,section,locale,key,player.start]);
 return {supported:player.supported,active:!!active,paused:!!active&&!!player.session?.paused,
   current:active?player.session!.itemIndex+1:null,total:edition?.articles.length||0,
   error:active?player.error:null,play,pause:player.pause,resume:player.resume,stop:player.stop};
}
export type BriefingSpeech=ReturnType<typeof useBriefingSpeech>;
