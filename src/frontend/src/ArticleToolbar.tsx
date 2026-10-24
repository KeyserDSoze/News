import { ArrowLeft, Check, Copy, Share2 } from 'lucide-react';
import { ArticleActions } from './ArticleActions';
import type { SpeechState } from './readerSpeech';
import type { Locale } from './types';

export default function ArticleToolbar({locale,returnTo,markdown,speech,reader,
 onShare,onCopyLink,linkCopied}:{
 locale:Locale;returnTo:string;markdown:string;speech:string;reader:SpeechState;
 onShare:()=>void;onCopyLink:()=>void;linkCopied:boolean;
}){
 const it=locale==='it';
 return <div className="command-panel" aria-label={it?'Comandi articolo':'Article controls'}>
  <a className="command-back" href={returnTo}><ArrowLeft size={16}/>{it?'Torna alla rassegna':'Back to the briefing'}</a>
  <div className="command-panel-heading">{it?'LETTURA E CONDIVISIONE':'READ & SHARE'}</div>
  <div className="command-buttons">
   <button type="button" className="share-button" onClick={onShare}><Share2 size={16}/>{it?'Condividi':'Share'}</button>
   <button type="button" className="share-button" onClick={onCopyLink} aria-label={it?'Copia link':'Copy link'}>
    {linkCopied?<Check size={16}/>:<Copy size={16}/>}<span>{linkCopied?(it?'Link copiato':'Link copied'):(it?'Copia link':'Copy link')}</span>
   </button>
   <ArticleActions id="full" label={it?'Articolo completo':'Full article'} markdown={markdown}
     speechText={speech} locale={locale} reader={reader} full/>
  </div>
  <p className="command-caption">{it?'Ascolta l’intero articolo o copia il testo completo con tutte le fonti.':'Listen to the entire article, or copy it with every source.'}</p>
 </div>;
}
