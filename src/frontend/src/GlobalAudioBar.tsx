import {Headphones,Pause,Play,Square} from 'lucide-react';
import {useAudioPlayer} from './audioPlayer';
import type {Locale} from './types';

/** Persistent across internal routes; dismisses itself when the queue ends or is stopped. */
export default function GlobalAudioBar({locale}:{locale:Locale}){
 const {session,pause,resume,stop}=useAudioPlayer();
 if(!session)return null;
 const it=locale==='it';
 const section=session.kind==='briefing'?(it?'Rassegna in ascolto':'Playing briefing')
   :session.kind==='body'?(it?'Testo della notizia':'Story body')
     :(it?'Articolo completo':'Full article');
 return <div className="global-audio-dock" role="region" aria-label={it?'Lettore audio attivo':'Active audio player'}>
   <div className="global-audio-content">
     <span className="global-audio-icon" aria-hidden="true"><Headphones size={19}/></span>
     <div className="global-audio-details">
       <span className="global-audio-kicker">{section}
         {session.kind==='briefing'&&<span className="global-audio-number"> · {it?'Notizia':'Story'} {session.itemIndex+1}/{session.itemCount}</span>}
       </span>
       <a href={session.href} className="global-audio-title" title={session.currentTitle}>
         {session.kind==='briefing'?session.currentTitle:session.title}
       </a>
     </div>
     <div className="global-audio-buttons">
       <button type="button" onClick={session.paused?resume:pause}
         aria-label={session.paused?(it?'Riprendi audio':'Resume audio'):(it?'Metti in pausa audio':'Pause audio')}>
         {session.paused?<Play size={17}/>:<Pause size={17}/>}
         <span>{session.paused?(it?'Riprendi':'Resume'):(it?'Pausa':'Pause')}</span>
       </button>
       <button type="button" onClick={stop} aria-label={it?'Interrompi audio':'Stop audio'}>
         <Square size={15}/><span>{it?'Ferma':'Stop'}</span>
       </button>
     </div>
   </div>
 </div>;
}
