import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { APP_VERSION, RELEASES, releaseDate } from './releases';
import { sectionHref } from './routes';
import type { Locale } from './types';

export default function ReleasePage({locale}:{locale:Locale}) {
 const it=locale==='it';
 return <main className="container releases-page" id="content">
  <a className="back-link" href={sectionHref('world')}><ArrowLeft size={16}/>{it?'Torna a O':'Back to O'}</a>
  <div className="detail-kicker">O / {it?'NOTE DI RILASCIO':'RELEASE NOTES'}</div>
  <h1>{it?'Le novità di O':'What’s new in O'}<span>.</span></h1>
  <p className="release-intro">{it?'Ogni versione dell’app ha una cronologia delle modifiche. Le notizie quotidiane vengono aggiornate indipendentemente.':'Every app version has a published change history. Daily news updates are independent.'}</p>
  <div className="release-current">O · v{APP_VERSION}<span>{it?'Versione attuale':'Current version'}</span></div>
  {RELEASES.map(release=><article className="release-entry" key={release.version}>
    <div className="release-meta"><span>v{release.version}</span><time dateTime={release.date}>{releaseDate(release.date,locale)}</time></div>
    <h2>{release[locale].title}</h2>
    <ul>{release[locale].highlights.map((item,i)=><li key={i}><CheckCircle2 size={17}/>{item}</li>)}</ul>
    <p>{release[locale].details}</p>
  </article>)}
 </main>;
}
