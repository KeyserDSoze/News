import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, BookOpen, Check, ChevronRight, Copy, ExternalLink, Globe2, Layers3, Moon, Sun, Menu, X, Clock3, Link2 } from 'lucide-react';
import { useArchive, useStoryIndex, getJSON, editionUrl, mediaUrl } from './data';
import { formatDate, messages, sectionName } from './i18n';
import { sections, sectionSize, storyHref, storyKey } from './types';
import type { Article, Edition, Locale, Section, StoryIndex, StoryPreview, StoryRef } from './types';
type Route = {kind:'section';section:Section} | {kind:'article';section:Section;date:string;id:string};
function routeFromHash(): Route {
  const parts=window.location.hash.replace(/^#\/?/,'').split('/').map(decodeURIComponent);
  const section=sections.find(s=>s===parts[0]);
  if(section)return {kind:'section',section};
  if(parts[0]==='article' && sections.includes(parts[1] as Section) && /^\d{4}-\d{2}-\d{2}$/.test(parts[2]||'') && /^[a-z0-9-]+$/.test(parts[3]||'')){
    return {kind:'article',section:parts[1] as Section,date:parts[2],id:parts[3]};
  }
  return {kind:'section',section:'world'};
}
function initialLocale():Locale {
  try {const stored=localStorage.getItem('og-language');if(stored==='it'||stored==='en')return stored;}catch{}
  return navigator.language.toLowerCase().startsWith('it')?'it':'en';
}
function initialTheme():'light'|'dark' {
  try {const stored=localStorage.getItem('og-theme');if(stored==='light'||stored==='dark')return stored;}catch{}
  return window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';
}
function Picture({article,locale}:{article:Article;locale:Locale}){
  const [broken,setBroken]=useState(false);
  const fallback=broken&&Boolean(article.image.fallbackSrc);
  const attribution=fallback?'https://github.com/KeyserDSoze/News/blob/main/'+article.image.fallbackSrc:article.image.sourceUrl;
  const credit=fallback?'Oggettivizzatore · original artwork':article.image.credit+' · '+article.image.license;
  return <figure className="news-picture">
    {(!broken||fallback)&&<img src={mediaUrl(fallback?article.image.fallbackSrc!:article.image.src)}
      alt={fallback?(locale==='it'?'Illustrazione editoriale originale':'Original editorial illustration'):article.image.alt}
      loading={article.rank===1?'eager':'lazy'} onError={()=>setBroken(true)}/>}
    {broken&&!fallback&&<div className="image-fallback"><Layers3 size={45}/></div>}
    <figcaption><span>{credit}</span><a href={attribution} target="_blank" rel="noopener noreferrer" aria-label={locale==='it'?'Fonte immagine':'Image source'}><ExternalLink size={13}/></a></figcaption>
  </figure>;
}
function Sources({article,locale}:{article:Article;locale:Locale}){
  const t=messages[locale];
  return <section className="full-sources" aria-label={t.sourcesLabel}><h2>{t.sourcesLabel} <small>{article.sources.length}</small></h2>
    <div className="full-source-grid">{article.sources.map(s=><a href={s.url} key={s.url} target="_blank" rel="noopener noreferrer" className="source-tile">
      <span className="source-mark"><Check size={14}/>{s.outlet}</span><span className="source-title">{s.title}</span>
      <span className="source-date">{s.publishedAt.slice(0,10)} <ExternalLink size={14}/></span>
    </a>)}</div>
  </section>;
}
function LatestLabel({item,index,locale}:{item:StoryRef;index:StoryIndex|null;locale:Locale}){
  const preview=index?.stories.find(s=>storyKey(s)===storyKey(item));
  if(!preview?.threadId)return null;
  const newer=index?.stories.some(s=>s.threadId===preview.threadId && s.date>item.date);
  return newer?<span className="update-pill"><Clock3 size={12}/>{messages[locale].updated}</span>:null;
}
function StoryCard({article,date,section,locale,index,featured=false}:{article:Article;date:string;section:Section;locale:Locale;index:StoryIndex|null;featured?:boolean}){
  const t=messages[locale],ref={date,section,id:article.id};
  return <article className={'story '+(featured?'story-featured':'')} data-story-id={article.id}>
    <a className="story-image-wrap" href={storyHref(ref)} aria-label={article.title}><Picture article={article} locale={locale}/></a>
    <div className="story-content">
      <div className="story-meta"><span className="story-number">{String(article.rank).padStart(2,'0')}</span><span className="dot"/><span>{t.categories[article.category]}</span><span className="meta-spacer"/><span className="sources-pill"><Check size={12}/>{article.sources.length} {t.sources.toLowerCase()}</span></div>
      <h3><a href={storyHref(ref)}>{article.title}</a></h3>
      <p className="dek">{article.dek}</p><p className="summary">{article.summary}</p>
      <div className="story-bottom"><LatestLabel item={ref} index={index} locale={locale}/><a className="read-story" href={storyHref(ref)}>{t.examine} <ArrowRight size={16}/></a></div>
    </div>
  </article>;
}
function Day({edition,locale,section,first,index}:{edition:Edition;locale:Locale;section:Section;first:boolean;index:StoryIndex|null}){
  const t=messages[locale];
  return <section className="edition" data-date={edition.date} aria-label={formatDate(edition.date,locale)}>
    <div className="edition-heading"><div className="edition-left">
      <div className="eyebrow"><span className="red-square"/>{first?t.today:t.archive}</div>
      <h2>{first?t.issue:formatDate(edition.date,locale)}</h2>
      <p>{first?t.sectionDescriptions[section]:edition.editorialNote}</p>
    </div><div className="edition-tag"><span>{t.edition} / {edition.date.replaceAll('-','.')}</span><strong>{String(edition.articles.length).padStart(2,'0')}</strong></div></div>
    <div className="story-grid">{edition.articles.map((article,i)=><StoryCard key={article.id} article={article} date={edition.date} section={section} locale={locale} index={index} featured={first&&i===0}/>)}</div>
  </section>;
}
function StoryLink({story,locale,label}:{story:StoryPreview;locale:Locale;label?:string}){
  return <a href={storyHref(story)} className="related-story">
    <span className="related-date">{label||formatDate(story.date,locale)} <ChevronRight size={14}/></span>
    <strong>{story.title}</strong><span>{story.dek}</span>
  </a>;
}
function StoryRelationships({article,date,section,locale,index}:{article:Article;date:string;section:Section;locale:Locale;index:StoryIndex|null}){
  if(!index)return null;
  const me:StoryRef={date,section,id:article.id},key=storyKey(me);
  const dossier=article.threadId?index.stories.filter(s=>s.threadId===article.threadId).sort((a,b)=>a.date.localeCompare(b.date)): [];
  const earlier=dossier.filter(s=>s.date<date && storyKey(s)!==key),later=dossier.filter(s=>s.date>date && storyKey(s)!==key);
  const linked=new Set((article.related||[]).map(storyKey));
  const connected=index.stories.filter(s=>{
    const ref=storyKey(s);
    return ref!==key && s.threadId!==article.threadId && (linked.has(ref)||s.related?.some(other=>storyKey(other)===key));
  });
  const t=messages[locale];
  return <>
    {dossier.length>1&&<section className="dossier" aria-label={t.historical}>
      <div className="detail-kicker"><Clock3 size={17}/>{t.historical}</div>
      <h2>{locale==='it'?'Un dossier in evoluzione':'An evolving story'}</h2>
      {article.threadRecap&&<p className="thread-recap">{article.threadRecap}</p>}
      <div className="timeline">{dossier.map(story=><div className={'timeline-item '+(storyKey(story)===key?'timeline-current':'')} key={storyKey(story)}>
        <div className="timeline-dot"/><div>
          <span className="timeline-date">{formatDate(story.date,locale)} {storyKey(story)===key?'· '+t.current:''}</span>
          <h3><a href={storyHref(story)}>{story.title}</a></h3><p>{story.summary}</p>
        </div>
      </div>)}</div>
      {(earlier.length>0||later.length>0)&&<div className="dossier-nav">{earlier.length>0&&<span>{t.earlier}: {earlier.length}</span>}{later.length>0&&<span className="dossier-new"><Clock3 size={13}/>{t.later}: {later.length}</span>}</div>}
    </section>}
    {connected.length>0&&<section className="related"><div className="detail-kicker"><Link2 size={17}/>{t.connected}</div>
      <div className="related-grid">{connected.map(s=><StoryLink key={storyKey(s)} story={s} locale={locale}/>)}</div>
    </section>}
  </>;
}
function ArticleView({route,locale,index}:{route:Extract<Route,{kind:'article'}>;locale:Locale;index:StoryIndex|null}){
  const [edition,setEdition]=useState<Edition|null>(null),[error,setError]=useState(false),[copied,setCopied]=useState(false);
  useEffect(()=>{
    let alive=true;setEdition(null);setError(false);setCopied(false);
    getJSON<Edition>(editionUrl(route.date,route.section,locale)).then(e=>{if(alive)setEdition(e);}).catch(()=>{if(alive)setError(true);});
    return()=>{alive=false;};
  },[route.date,route.section,locale]);
  const article=edition?.articles.find(x=>x.id===route.id),t=messages[locale];
  const copyLink=async()=>{try{await navigator.clipboard.writeText(window.location.href);setCopied(true);}catch{setCopied(false);}};
  if(!article)return <main className="container article-loading"><a className="back-link" href={'#/'+route.section}><ArrowLeft size={17}/>{t.back}</a><p role="status">{error?t.error:t.loading}</p></main>;
  const paragraphs=article.body?.length?article.body:[article.facts.join(' '),article.perspectives.join(' ')];
  const questions=article.questions?.length?article.questions:article.unknowns.map(s=>({question:t.unknowns,answer:s}));
  return <main className="article-view container" id="content">
    <div className="article-toolbar"><a className="back-link" href={'#/'+route.section}><ArrowLeft size={17}/>{t.back}</a><button onClick={copyLink} className="share-button"><Copy size={16}/>{copied?t.copied:t.share}</button></div>
    <div className="article-hero"><div className="detail-kicker"><span className="red-square"/>{sectionName(route.section,locale)} <span className="separator">/</span> {formatDate(route.date,locale)} <span className="separator">/</span> {String(article.rank).padStart(2,'0')}</div>
      <h1>{article.title}</h1><p className="article-dek">{article.dek}</p>
      <div className="article-source-meta"><Check size={15}/>{article.sources.length} {t.sources.toLowerCase()} <span>·</span> O / {t.name}</div>
    </div>
    <section className="article-summary" aria-label={t.summary}><div className="article-summary-heading"><span className="summary-bullet">O.</span><h2>{t.summary}</h2></div><p>{article.summary}</p></section>
    <div className="article-layout">
      <div className="article-main">
        <Picture article={article} locale={locale}/>
        <section className="article-body"><div className="detail-kicker"><BookOpen size={17}/>{t.fullStory}</div>
          <h2>{t.fullStory}</h2>{paragraphs.map((p,i)=><p key={i}>{p}</p>)}
          <div className="context-panel"><h3>{t.facts}</h3><ul>{article.facts.map((f,i)=><li key={i}>{f}</li>)}</ul></div>
          <div className="context-panel perspectives-panel"><h3>{t.perspectives}</h3><ul>{article.perspectives.map((p,i)=><li key={i}>{p}</li>)}</ul></div>
        </section>
        <StoryRelationships article={article} date={route.date} section={route.section} locale={locale} index={index}/>
        <Sources article={article} locale={locale}/>
        <section className="article-assessment" aria-label={t.assessment}>
          <div className="detail-kicker"><span className="red-square"/>{t.assessment}</div>
          <h2>{t.assessment}</h2>
          {questions.map((q,i)=><div className="objective-question" key={i}><span className="question-index">{String(i+1).padStart(2,'0')}</span><div><h3>{q.question}</h3><p>{q.answer}</p></div></div>)}
          {article.unknowns.map((s,i)=><p key={i} className="assessment-note"><strong>{t.unknowns}:</strong> {s}</p>)}
        </section>
      </div>
      <aside className="article-aside"><div className="aside-card"><span>O<span className="accent-dot">.</span></span><strong>{t.definition}</strong><p>{t.tagline}</p><div className="aside-rule"/><p>{t.about}</p></div></aside>
    </div>
    <a href={'#/'+route.section} className="article-return"><ArrowLeft size={17}/>{t.back}</a>
  </main>;
}
function SectionPage({section,locale,index}:{section:Section;locale:Locale;index:StoryIndex|null}){
  const {active,dates,visible,loading,error,showNext,nextReady,hasMore}=useArchive(locale,section);
  const marker=useRef<HTMLDivElement>(null),t=messages[locale];
  useEffect(()=>{
    if(!hasMore||!nextReady||loading||!marker.current)return;
    const observer=new IntersectionObserver(entries=>{if(entries[0]?.isIntersecting)showNext();},{rootMargin:'650px'});
    observer.observe(marker.current);
    return()=>observer.disconnect();
  },[hasMore,nextReady,loading,showNext,visible]);
  return <main id="content">
    <section className="hero container"><div>
      <div className="hero-kicker"><span className="live-mark"/>{t.sectionLabel}</div>
      {section==='world'?<h1>{locale==='it'?<>Più fatti.<br/><em>Meno rumore.</em></>:<>More facts.<br/><em>Less noise.</em></>}</h1>:<h1 className="hero-section-heading">{sectionName(section,locale)}<em>.</em></h1>}
      <p>{t.sectionDescriptions[section]} {t.about}</p>
      <a className="hero-link" href="#editions">{locale==='it'?'Esplora la rassegna':'Explore the briefing'} <ArrowDown size={17}/></a>
    </div><div className="hero-emblem" aria-hidden="true"><div className="emblem-ring"><span>O</span><i/></div><div className="emblem-caption">{t.zero1}<br/>{t.zero2}</div></div></section>
    <div className="section-band"><div className="container band-inner"><span><span className="band-mark">✳</span> {t.sectionNames[section].toUpperCase()} <span className="band-slash">/</span> {sectionSize[section]} {locale==='it'?'NOTIZIE PER EDIZIONE':'STORIES PER EDITION'}</span><span>{t.tagline.toUpperCase()}</span></div></div>
    <div className="container publication" id="editions">
      {loading&&<div className="load-state" role="status"><span className="loader"/>{t.loading}</div>}
      {error&&!loading&&active.length===0&&<div className="load-state" role="alert">{t.error} <button onClick={()=>location.reload()}>{t.retry}</button></div>}
      {!loading&&dates.length===0&&!error&&<div className="pending-edition"><span className="pending-index">{String(sections.indexOf(section)+1).padStart(2,'0')} / 04</span><div className="eyebrow"><span className="red-square"/>{t.pendingTag}</div><h2>{t.pendingTitle}</h2><p>{t.pendingText}</p><a className="back-link" href="#/world">{sectionName('world',locale)} <ArrowRight size={17}/></a></div>}
      {active.map((edition,i)=><Day key={edition.date} edition={edition} locale={locale} section={section} first={i===0} index={index}/>)}
      {hasMore&&!loading&&<div className="archive-marker" ref={marker} role="status">{t.more} <span className="loader"/></div>}
      {!hasMore&&!loading&&dates.length>0&&<div className="archive-end"><span>✳</span>{t.end}</div>}
    </div>
  </main>;
}
export default function App(){
  const [locale,setLocale]=useState<Locale>(initialLocale),[theme,setTheme]=useState<'light'|'dark'>(initialTheme);
  const [route,setRoute]=useState<Route>(routeFromHash),[menu,setMenu]=useState(false);
  const index=useStoryIndex(locale),t=messages[locale],selected=route.section;
  useEffect(()=>{
    const onHash=()=>{setRoute(routeFromHash());setMenu(false);window.scrollTo({top:0,behavior:'instant'});};
    window.addEventListener('hashchange',onHash);
    return()=>window.removeEventListener('hashchange',onHash);
  },[]);
  useEffect(()=>{
    document.documentElement.dataset.theme=theme;document.documentElement.lang=locale;document.title='O — '+t.name+' · '+sectionName(selected,locale);
    try{localStorage.setItem('og-theme',theme);localStorage.setItem('og-language',locale);}catch{}
  },[theme,locale,selected,t.name]);
  const changeLocale=(lang:Locale)=>{setLocale(lang);setMenu(false);};
  return <div className="site-shell">
    <div className="topline"><div className="container topline-inner"><span>O / {t.name.toUpperCase()}</span><span>{t.tagline}</span></div></div>
    <header className="masthead container">
      <a className="wordmark o-brand" href="#/world" aria-label="O — home"><span className="wordmark-symbol">O<span>.</span></span><span className="brand-definition"><strong>O</strong><small>{t.name}</small></span></a>
      <div className="header-actions">
        <button type="button" className="lang-btn" onClick={()=>changeLocale(locale==='it'?'en':'it')} aria-label={locale==='it'?t.english:t.italian}><Globe2 size={17}/><span>{locale.toUpperCase()}</span><span className="lang-arrow">↔</span></button>
        <button type="button" className="icon-btn" aria-label={theme==='dark'?t.light:t.dark} onClick={()=>setTheme(theme==='dark'?'light':'dark')}>{theme==='dark'?<Sun size={20}/>:<Moon size={20}/>}</button>
        <button className="mobile-menu icon-btn" type="button" onClick={()=>setMenu(!menu)} aria-expanded={menu} aria-label="Menu">{menu?<X size={20}/>:<Menu size={20}/>}</button>
      </div>
    </header>
    <div className="container"><nav className={'four-nav '+(menu?'four-nav-open':'')} aria-label={locale==='it'?'Sezioni':'Sections'}>{sections.map((s,i)=><a key={s} href={'#/'+s} className={selected===s?'active':''} aria-current={selected===s?'page':undefined} onClick={()=>setMenu(false)}><small>{String(i+1).padStart(2,'0')}</small><strong>{sectionName(s,locale)}</strong><span>{String(sectionSize[s]).padStart(2,'0')}</span></a>)}</nav></div>
    {route.kind==='article'?<ArticleView route={route} locale={locale} index={index}/>:<SectionPage key={route.section} section={route.section} locale={locale} index={index}/>}
    <footer id="method"><div className="container footer-grid"><div><div className="footer-logo">O<span>.</span></div><h2>{t.definition}</h2><p>{t.about} {t.mediaNotice}</p><p className="zero-footer">{t.zero1} <span>/</span> {t.zero2}</p><a className="footer-link" href="https://github.com/KeyserDSoze/News/blob/main/docs/EDITORIAL_POLICY.md" target="_blank" rel="noopener noreferrer">{t.methodologyLink} <ArrowRight size={16}/></a></div>
      <div className="footer-side"><div className="footer-rule">01 / {t.methodology.toUpperCase()}</div><p>{t.footnote}</p><div className="footer-rule">02 / OPEN SOURCE</div><a href="https://github.com/KeyserDSoze/News" target="_blank" rel="noopener noreferrer">{t.openSource} <ExternalLink size={14}/></a></div></div>
      <div className="footer-bottom container"><span>© {new Date().getFullYear()} O — {t.name.toUpperCase()}</span><span>ZERO ADS. FACTS FIRST.</span></div>
    </footer>
  </div>;
}
