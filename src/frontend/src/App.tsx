import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowRight, BookOpen, Check, ChevronDown, Globe2, Moon, Sun, ExternalLink, Layers3, Menu, X } from 'lucide-react';
import { useArchive, mediaUrl } from './data';
import { categoryKeys, formatDate, messages } from './i18n';
import type { Article, Category, Edition, Locale } from './types';
function initialLocale(): Locale {
  try { const stored = localStorage.getItem('og-language'); if(stored==='it'||stored==='en') return stored; } catch {}
  return navigator.language.toLowerCase().startsWith('it') ? 'it' : 'en';
}
function initialTheme(): 'light'|'dark' {
  try { const stored=localStorage.getItem('og-theme'); if(stored==='light'||stored==='dark') return stored; } catch {}
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
function Picture({article,locale}:{article:Article;locale:Locale}) {
 const [broken,setBroken]=useState(false);
 return <figure className={'news-picture '+(broken?'broken':'')}>
   {!broken && <img src={mediaUrl(article.image.src)} alt={article.image.alt} loading={article.rank===1?'eager':'lazy'} onError={()=>setBroken(true)} />}
   {broken && <div className="image-fallback"><Layers3 size={48}/></div>}
   <figcaption><span>{article.image.kind==='illustration' ? (locale==='it'?'Illustrazione':'Illustration') : (locale==='it'?'Foto':'Photo')}: {article.image.credit}</span><a href={article.image.sourceUrl} target="_blank" rel="noopener noreferrer" aria-label="Image source"><ExternalLink size={12}/></a></figcaption>
 </figure>;
}
function Story({article,locale,featured=false}:{article:Article;locale:Locale;featured?:boolean}) {
 const t=messages[locale];
 return <article id={'story-'+article.id} className={'story '+(featured?'story-featured':'')}>
   <div className="story-image-wrap"><Picture article={article} locale={locale}/></div>
   <div className="story-content">
     <div className="story-meta"><span className="story-number">{String(article.rank).padStart(2,'0')}</span><span className="dot"/><span>{t.categories[article.category]}</span><span className="meta-spacer"/><span className="sources-pill"><Check size={12}/>{article.sources.length} {t.sources.toLowerCase()}</span></div>
     <h3><a href={'#story-'+article.id}>{article.title}</a></h3>
     <p className="dek">{article.dek}</p>
     <p className="summary">{article.summary}</p>
     <details className="analysis">
       <summary><span>{t.examine}</span><ChevronDown size={17}/></summary>
       <div className="analysis-body">
         <section><h4><span className="small-symbol">●</span> {t.facts}</h4><ul>{article.facts.map((fact,i)=><li key={i}>{fact}</li>)}</ul></section>
         <section><h4><span className="small-symbol">◒</span> {t.perspectives}</h4><ul>{article.perspectives.map((claim,i)=><li key={i}>{claim}</li>)}</ul></section>
         <section><h4><span className="small-symbol">?</span> {t.unknowns}</h4><ul>{article.unknowns.map((item,i)=><li key={i}>{item}</li>)}</ul></section>
         <section className="source-list"><h4>{t.sourcesLabel}</h4>{article.sources.map(s=><a key={s.url} href={s.url} target="_blank" rel="noopener noreferrer"><span><strong>{s.outlet}</strong><small>{s.title}</small></span><ExternalLink size={15}/></a>)}</section>
       </div>
     </details>
   </div>
 </article>;
}
function Day({edition,locale,activeCategory,first=false}:{edition:Edition;locale:Locale;activeCategory:Category|'all';first?:boolean}) {
 const t=messages[locale];
 const articles=activeCategory==='all'?edition.articles:edition.articles.filter(a=>a.category===activeCategory);
 return <section className="edition" aria-label={formatDate(edition.date,locale)} data-date={edition.date}>
   <div className="edition-heading"><div className="edition-left"><div className="eyebrow"><span className="red-square"/>{first?t.today:t.archive}</div><h2>{first?t.issue:formatDate(edition.date,locale)}</h2><p>{first?t.count:edition.editorialNote}</p></div><div className="edition-tag"><span>{t.edition} / {edition.date.replaceAll('-','.')}</span><strong>{String(edition.articles.length).padStart(2,'0')}</strong></div></div>
   {articles.length>0?<div className="story-grid">{articles.map((article,i)=><Story key={article.id} article={article} locale={locale} featured={first&&activeCategory==='all'&&i===0}/>)}</div>:<div className="empty-filter">{locale==='it'?'Nessuna notizia in questa categoria per l’edizione.':'No stories in this category for this edition.'}</div>}
 </section>;
}
export default function App() {
 const [locale,setLocale]=useState<Locale>(initialLocale);
 const [theme,setTheme]=useState<'light'|'dark'>(initialTheme);
 const [category,setCategory]=useState<Category|'all'>('all');
 const [menu,setMenu]=useState(false);
 const {active,dates,visible,loading,error,showNext,nextReady,hasMore}=useArchive(locale);
 const t=messages[locale];
 const marker=useRef<HTMLDivElement>(null);
 useEffect(()=>{document.documentElement.dataset.theme=theme;document.documentElement.lang=locale;try{localStorage.setItem('og-theme',theme);localStorage.setItem('og-language',locale);}catch{}},[theme,locale]);
 useEffect(()=>{
   if(!hasMore||!nextReady||loading||!marker.current)return;
   const observer=new IntersectionObserver(entries=>{if(entries[0]?.isIntersecting)showNext();},{rootMargin:'650px'});
   observer.observe(marker.current);
   return ()=>observer.disconnect();
 },[hasMore,nextReady,loading,showNext,visible]);
 const switchLocale=(value:Locale)=>{setLocale(value);setMenu(false)};
 return <div className="site-shell">
   <div className="topline"><div className="container topline-inner"><span>{locale==='it'?'UNA PROSPETTIVA PIÙ NITIDA SULL’ATTUALITÀ':'A CLEARER VIEW OF WHAT MATTERS'}</span><span>{dates[0]?formatDate(dates[0],locale):formatDate(new Date().toISOString().slice(0,10),locale)}</span></div></div>
   <header className="masthead container">
     <a className="wordmark" href="#top" aria-label="Oggettivizzatore home"><span className="wordmark-symbol">O<span>.</span></span><span>OGGETTIVIZZATORE</span></a>
     <nav className={'main-nav '+(menu?'open':'')} aria-label="Main navigation">
       <a href="#editions" onClick={()=>setMenu(false)}>{t.issue}</a><a href="#method" onClick={()=>setMenu(false)}>{t.methodology}</a>
       <a href="https://github.com/KeyserDSoze/News" target="_blank" rel="noopener noreferrer">GitHub <ExternalLink size={13}/></a>
     </nav>
     <div className="header-actions">
       <button type="button" className="lang-btn" onClick={()=>switchLocale(locale==='it'?'en':'it')} aria-label={locale==='it'?t.english:t.italian}><Globe2 size={17}/><span>{locale.toUpperCase()}</span><span className="lang-arrow">↔</span></button>
       <button type="button" className="icon-btn" aria-label={theme==='dark'?t.light:t.dark} onClick={()=>setTheme(theme==='dark'?'light':'dark')}>{theme==='dark'?<Sun size={20}/>:<Moon size={20}/>}</button>
       <button type="button" className="mobile-menu icon-btn" aria-label="Menu" aria-expanded={menu} onClick={()=>setMenu(!menu)}>{menu?<X size={20}/>:<Menu size={20}/>}</button>
     </div>
   </header>
   <div className="container"><div className="masthead-rule"><span>{t.strapline}</span><span>EST. 2026 <span className="separator">/</span> IT · EN</span></div></div>
   <main id="top">
     <div className="hero container"><div><div className="hero-kicker"><span className="live-mark"/> {locale==='it'?'IL GIORNALE CHE VA OLTRE I TITOLI':'THE BRIEFING BEYOND THE HEADLINES'}</div><h1>{locale==='it'?<>Più fatti.<br/><em>Meno rumore.</em></>:<>More facts.<br/><em>Less noise.</em></>}</h1><p>{t.subtitle} {t.about}</p><a className="hero-link" href="#editions">{locale==='it'?'Esplora la rassegna':'Explore the briefing'} <ArrowDown size={17}/></a></div><div className="hero-emblem" aria-hidden="true"><div className="emblem-ring"><span>O</span><i/></div><div className="emblem-caption">THE FACTS<br/>IN FOCUS.</div></div></div>
     <div className="section-band"><div className="container band-inner"><span><span className="band-mark">✳</span> {locale==='it'?'SELEZIONE EDITORIALE INDIPENDENTE':'INDEPENDENT EDITORIAL SELECTION'}</span><span>{locale==='it'?'10 STORIE AL GIORNO':'10 STORIES PER DAY'} <span className="band-slash">/</span> {locale==='it'?'FONTI SEMPRE VISIBILI':'SOURCES ALWAYS VISIBLE'}</span></div></div>
     <div id="editions" className="container publication">
       <div className="filter-bar"><div className="filter-label"><BookOpen size={16}/>{locale==='it'?'Esplora per tema':'Explore by topic'}</div><div className="filters" role="group" aria-label="Filter category"><button className={category==='all'?'selected':''} onClick={()=>setCategory('all')}>{t.all}</button>{categoryKeys.map(key=><button key={key} className={category===key?'selected':''} onClick={()=>setCategory(key)}>{t.categories[key]}</button>)}</div></div>
       {loading&&<div className="load-state" role="status"><div className="loader"/>{t.loading}</div>}
       {error&&!loading&&active.length===0&&<div className="load-state" role="alert">{t.error} <button onClick={()=>location.reload()}>{t.retry}</button></div>}
       {active.map((edition,i)=><Day key={edition.date} edition={edition} locale={locale} activeCategory={category} first={i===0}/>)}
       {hasMore&&!loading&&<div className="archive-marker" ref={marker} role="status">{t.more} <div className="loader"/></div>}
       {!hasMore&&!loading&&dates.length>0&&<div className="archive-end"><span>✳</span>{t.end}</div>}
       {!loading&&dates.length===0&&!error&&<div className="load-state">No editions published yet.</div>}
     </div>
   </main>
   <footer id="method"><div className="container footer-grid"><div><div className="footer-logo">O<span>.</span></div><h2>{t.methodology}</h2><p>{t.about} {t.mediaNotice}</p><a className="footer-link" href="https://github.com/KeyserDSoze/News/blob/main/docs/EDITORIAL_POLICY.md" target="_blank" rel="noopener noreferrer">{t.methodologyLink} <ArrowRight size={16}/></a></div><div className="footer-side"><div className="footer-rule">01 / {locale==='it'?'TRASPARENZA':'TRANSPARENCY'}</div><p>{t.footnote}</p><div className="footer-rule">02 / OPEN SOURCE</div><a href="https://github.com/KeyserDSoze/News" target="_blank" rel="noopener noreferrer">{t.openSource} <ExternalLink size={14}/></a></div></div><div className="footer-bottom container"><span>© {new Date().getFullYear()} OGGETTIVIZZATORE</span><span>FACTS FIRST. ALWAYS.</span></div></footer>
 </div>;
}
