import { Headphones, Pause, Play, Square } from 'lucide-react';
import type { BriefingSpeech } from './briefingSpeech';
import type { Locale } from './types';

export default function BriefingPlayer({reader,locale}:{reader:BriefingSpeech;locale:Locale}){
 const it=locale==='it';
 return <div className="briefing-audio" role="group"
   aria-label={it?'Ascolto della rassegna del giorno':'Daily briefing playback'}>
  {!reader.active?
    <button type="button" className="briefing-play" onClick={reader.play} disabled={!reader.supported||reader.total===0}
      title={!reader.supported?(it?'Sintesi vocale non disponibile sul dispositivo':'Speech synthesis unavailable on this device'):undefined}>
      <Headphones size={17}/>{it?'Ascolta la rassegna':'Listen to briefing'}
    </button>:
    <>
      <span className="briefing-progress" role="status" aria-live="off">
       {it?'Notizia':'Story'} {reader.current} / {reader.total}
      </span>
      <button type="button" className="briefing-play" onClick={reader.paused?reader.resume:reader.pause}
        aria-label={reader.paused?(it?'Riprendi la rassegna':'Resume briefing'):(it?'Metti in pausa la rassegna':'Pause briefing')}>
       {reader.paused?<Play size={16}/>:<Pause size={16}/>}
       {reader.paused?(it?'Riprendi':'Pausa'):(it?'Pausa':'Pause')}
      </button>
      <button type="button" className="briefing-stop" onClick={reader.stop}
        aria-label={it?'Interrompi la rassegna':'Stop briefing'}>
       <Square size={13}/>{it?'Ferma':'Stop'}
      </button>
    </>}
  {reader.error&&<span className="briefing-audio-error" role="alert">{reader.error}</span>}
 </div>;
}
