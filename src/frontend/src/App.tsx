import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, Check, ChevronRight, ExternalLink, Moon, Sun, Clock3, Link2, Search as SearchIcon, Tag, Target } from 'lucide-react';
import SearchPage, { tagHref } from './SearchPage';
import { useArchive, useStoryIndex, getJSON, mediaUrl } from './data';
import { loadEdition, warmEdition, storedEdition } from './editionCache';
import type { NewsIndex } from './types';
import { formatDate, messages, sectionName } from './i18n';
import { sections, storyHref, storyKey } from './types';
import type { Article, Edition, Locale, Section, StoryIndex, StoryPreview, StoryRef } from './types';
import { currentPath, isAppRoute, normalizeLegacyRoute, routeFromPath, sectionHref, searchHref } from './routes';
import type { Route } from './routes';
import AppMenu from './AppMenu';
import ReleasePage from './ReleasePage';
import { ArticleActions } from './ArticleActions';
import { buildArticleExports } from './articleExport';
import ArticleToolbar from './ArticleToolbar';
import LanguageMenu from './LanguageMenu';
import { useArticleSpeech } from './readerSpeech';
import { useBriefingSpeech } from './briefingSpeech';
import type { BriefingSpeech } from './briefingSpeech';
import BriefingPlayer from './BriefingPlayer';
function initialLocale():Locale {
  try {const stored=localStorage.getItem('og-language');if(stored==='it'||stored==='en')return stored;}catch{}
  return navigator.language.toLowerCase().startsWith('it')?'it':'en';
}
function initialTheme():'light'|'dark' {
  try {const stored=localStorage.getItem('og-theme');if(stored==='light'||stored==='dark')return stored;}catch{}
  return window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';
}
function Picture({article,locale,section='world'}:{article:Article;locale:Locale;section?:Section}){
  const [stage,setStage]=useState(0);
  useEffect(()=>setStage(0),[article.image.src]);
  const fallback=article.image.fallbackSrc||'fallback/'+section+'.svg';
  const image=stage===0?article.image.src:stage===1?fallback:null;
  const attribution=stage===0?article.image.sourceUrl:article.image.fallbackSrc?
   'https://github.com/KeyserDSoze/News/blob/main/'+article.image.fallbackSrc:
   'https://github.com/KeyserDSoze/News/blob/main/src/frontend/public/fallback/'+section+'.svg';
  const credit=stage===0?article.image.credit+' · '+article.image.license:
    (locale==='it'?'Illustrazione editoriale originale · non è una foto dell’evento':'Original editorial illustration · not a photograph of the event');
  return <figure className="news-picture">
    {image?<img src={mediaUrl(image)} alt={stage===0?article.image.alt:credit} loading={article.rank===1?'eager':'lazy'} onError={()=>setStage(n=>Math.min(2,n+1))}/>:
      <div className="image-fallback"><span>O.</span><small>{locale==='it'?'Illustrazione editoriale':'Editorial illustration'}</small></div>}
    <figcaption><span>{credit}</span><a href={attribution} target="_blank" rel="noopener noreferrer" aria-label={locale==='it'?'Fonte immagine':'Image source'}><ExternalLink size={13}/></a></figcaption>
  </figure>;
}
function Tags({article,locale}:{article:Article;locale:Locale}){
  return <div className="story-tags" aria-label={messages[locale].tagLabel}>{article.tags?.map(tag=><a key={tag} href={tagHref(tag)}><Tag size={12}/>{tag}</a>)}</div>;
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
function Impact({article,section,locale,compact=false}:{article:Article;section:Section;locale:Locale;compact?:boolean}) {
 const t=messages[locale];
 return <div className={'impact '+(compact?'impact-compact':'')} aria-label={t.impactLabel+': '+article.impact+'/5. '+article.impactReason} title={article.impactReason}>
  <Target size={compact?15:18} className="impact-symbol" aria-hidden="true"/>
  <span className="impact-pips" aria-hidden="true">{Array.from({length:5},(_,i)=><span key={i} className={article.impact>=i+1?'filled':article.impact>=i+.5?'half':''}/>)}</span>
  <span className="impact-score">{article.impact}/5</span>
  {!compact&&<span className="impact-explanation"><strong>{t.impactLabel} · {t.impactScope[section]}</strong>{article.impactReason}</span>}
 </div>;
}
function StoryCard({article,date,section,locale,index,featured=false}:{article:Article;date:string;section:Section;locale:Locale;index:StoryIndex|null;featured?:boolean}){
  const t=messages[locale],ref={date,section,id:article.id};
  return <article className={'story '+(featured?'story-featured':'')} data-story-id={article.id} data-scroll-anchor={section+'/'+date+'/'+article.id}>
    <div className="story-image-wrap"><Picture article={article} locale={locale} section={section}/></div>
    <div className="story-content">
      <div className="story-meta"><span className="story-number">{String(article.rank).padStart(2,'0')}</span><span className="dot"/><span>{t.categories[article.category]}</span><span className="meta-spacer"/><span className="sources-pill"><Check size={12}/>{article.sources.length} {t.sources.toLowerCase()}</span></div>
      <h3><a href={storyHref(ref)}>{article.title}</a></h3>
      <p className="dek">{article.dek}</p><p className="summary">{article.summary}</p><Impact article={article} section={section} locale={locale} compact/><Tags article={article} locale={locale}/>
      <div className="story-bottom"><LatestLabel item={ref} index={index} locale={locale}/><a className="read-story" href={storyHref(ref)}>{t.examine} <ArrowRight size={16}/></a></div>
    </div>
  </article>;
}
function Day({edition,locale,section,first,index,reader}:{edition:Edition;locale:Locale;section:Section;first:boolean;index:StoryIndex|null;reader?:BriefingSpeech}){
  const t=messages[locale];
  return <section className="edition" data-date={edition.date} aria-label={formatDate(edition.date,locale)}>
    <div className="edition-heading"><div className="edition-left">
      <div className="eyebrow"><span className="red-square"/>{first?t.today:t.archive}</div>
      <h2>{first?t.issue:formatDate(edition.date,locale)}</h2>
      {!first&&<p>{edition.editorialNote}</p>}
    </div><div className="edition-heading-tools">
      <span className="edition-date">{t.edition} / {edition.date.replaceAll('-','.')}</span>
      {first&&reader&&<BriefingPlayer reader={reader} locale={locale}/>}
    </div></div>
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
    return ref!==key && !(article.threadId && s.threadId===article.threadId) && (linked.has(ref)||s.related?.some(other=>storyKey(other)===key));
  });
  const t=messages[locale];
  return <>
    {dossier.length>1&&<section className="dossier" aria-label={t.historical}>
      <div className="detail-kicker"><Clock3 size={17}/>{t.historical}</div>
      <h2>{t.historical}</h2>
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
function ArticleView({route,locale,index,returnTo}:{route:Extract<Route,{kind:'article'}>;locale:Locale;index:StoryIndex|null;returnTo:string}){
  const [edition,setEdition]=useState<Edition|null>(()=>warmEdition(route.date,route.section,locale));
  const [error,setError]=useState(false),[linkCopied,setLinkCopied]=useState(false),[retry,setRetry]=useState(0);
  const copyTimer=useRef<ReturnType<typeof setTimeout>|null>(null);
  useEffect(()=>()=>{if(copyTimer.current)clearTimeout(copyTimer.current);},[]);
  useEffect(()=>{
    let alive=true;
    setEdition(warmEdition(route.date,route.section,locale));setError(false);setLinkCopied(false);
    // Read the copy already on disk immediately; the network revision is checked in parallel.
    void storedEdition(route.date,route.section,locale).then(value=>{
      if(alive&&value)setEdition(current=>current??value);
    });
    void getJSON<NewsIndex>('news/index.json')
      .then(manifest=>loadEdition(route.date,route.section,locale,manifest.revision||String(manifest.version)))
      .then(({edition})=>{if(alive)setEdition(edition);})
      .catch(err=>{console.error('Article load failed',err);if(alive)setError(true);});
    return()=>{alive=false;};
  },[route.date,route.section,locale,retry]);
  const article=edition?.articles.find(x=>x.id===route.id),t=messages[locale];
  const [shareError,setShareError]=useState(false);
  const reader=useArticleSpeech(locale,route.section+'/'+route.date+'/'+route.id);
  const canonicalUrl = () => new URL(storyHref(route),window.location.origin).href;
  const copyLink=async()=>{
    const url=canonicalUrl();
    try{
      if(navigator.clipboard?.writeText) await navigator.clipboard.writeText(url);
      else {
        const input=document.createElement('textarea');
        input.value=url;input.style.position='fixed';input.style.opacity='0';
        document.body.appendChild(input);input.select();
        const didCopy=document.execCommand('copy');input.remove();
        if(!didCopy)throw new Error('Clipboard unavailable');
      }
      setLinkCopied(true);setShareError(false);
      if(copyTimer.current)clearTimeout(copyTimer.current);
      copyTimer.current=setTimeout(()=>setLinkCopied(false),2500);
    }catch{setShareError(true);}
  };
  const share=async()=>{
    const details={title:article?.title||'O',text:article?.dek||'',url:canonicalUrl()};
    if(navigator.share){
      try{await navigator.share(details);return;}
      catch(e){if(e instanceof DOMException&&e.name==='AbortError')return;}
    }
    await copyLink();
  };
  if(!article)return <main className="container article-loading">
    <a className="back-link" href={returnTo}><ArrowLeft size={17}/>{t.back}</a>
    <div className="article-loading-body">
      {error?<><p role="alert">{t.error}</p>
        <button type="button" className="share-button" onClick={()=>setRetry(n=>n+1)}>{t.retry}</button></>:
        <><span className="loader"/><p role="status">{t.loading}</p>
        <div className="article-skeleton"/><div className="article-skeleton short"/></>}
    </div>
  </main>;
  const paragraphs=article.body?.length?article.body:[article.facts.join(' '),article.perspectives.join(' ')];
  const questions=article.questions?.length?article.questions:article.unknowns.map(s=>({question:t.unknowns,answer:s}));
  const exports=buildArticleExports(article,locale,route.section,route.date,index);
  const fullTools=<ArticleToolbar locale={locale} returnTo={returnTo}
    markdown={exports.markdown} speech={exports.speech} reader={reader}
    onShare={share} onCopyLink={copyLink} linkCopied={linkCopied}/>;
  const body=exports.parts.find(p=>p.id==='body');
  return <main className="article-view container" id="content">
    <div className="article-mobile-controls">{fullTools}</div>
    {reader.error&&<p className="reader-error" role="alert">{reader.error}</p>}
    {shareError&&<p className="share-error" role="alert">{locale==='it'?'Non è stato possibile copiare il link.':'Could not copy the link.'}</p>}
    <div className="article-layout">
      <div className="article-main">
    <div className="article-hero"><div className="detail-kicker"><span className="red-square"/>{sectionName(route.section,locale)} <span className="separator">/</span> {formatDate(route.date,locale)} <span className="separator">/</span> {String(article.rank).padStart(2,'0')}</div>
      <h1>{article.title}</h1><p className="article-dek">{article.dek}</p>
      <Impact article={article} section={route.section} locale={locale}/><Tags article={article} locale={locale}/><div className="article-source-meta"><Check size={15}/>{article.sources.length} {t.sources.toLowerCase()} <span>·</span> O / {t.name}</div>
    </div>
    <section className="article-summary" aria-label={t.summary}><div className="article-summary-heading"><span className="summary-bullet">O.</span><h2>{t.summary}</h2></div><p>{article.summary}</p></section>
        <Picture article={article} locale={locale} section={route.section}/>
        <section className="article-body"><div className="detail-kicker"><BookOpen size={17}/>{t.fullStory}</div>
          <h2>{t.fullStory}</h2>
          {body&&<div className="body-listen"><ArticleActions id="body" label={body.title}
            speechText={body.speech} locale={locale} reader={reader} onlySpeech/></div>}
          {paragraphs.map((p,i)=><p key={i}>{p}</p>)}
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
      <aside className="article-aside">{fullTools}</aside>
    </div>
    <a href={returnTo} className="article-return"><ArrowLeft size={17}/>{t.back}</a>
  </main>;
}
function SectionPage({section,locale,index,enabled}:{section:Section;locale:Locale;index:StoryIndex|null;enabled:boolean}){
  const {active,dates,visible,loading,error,showNext,nextReady,hasMore}=useArchive(locale,section);
  const marker=useRef<HTMLDivElement>(null),t=messages[locale];
  const reader=useBriefingSpeech(active[0]||null,section,locale,enabled);
  useEffect(()=>{
    if(!hasMore||!nextReady||loading||!marker.current)return;
    const observer=new IntersectionObserver(entries=>{if(entries[0]?.isIntersecting)showNext();},{rootMargin:'650px'});
    observer.observe(marker.current);
    return()=>observer.disconnect();
  },[hasMore,nextReady,loading,showNext,visible]);
  return <main id="content">
    <div className="container publication" id="editions">
      {loading&&<div className="load-state" role="status"><span className="loader"/>{t.loading}</div>}
      {error&&!loading&&active.length===0&&<div className="load-state" role="alert">{t.error} <button onClick={()=>location.reload()}>{t.retry}</button></div>}
      {!loading&&dates.length===0&&!error&&<div className="pending-edition"><span className="pending-index">{String(sections.indexOf(section)+1).padStart(2,'0')} / 04</span><div className="eyebrow"><span className="red-square"/>{t.pendingTag}</div><h2>{t.pendingTitle}</h2><p>{t.pendingText}</p><a className="back-link" href={sectionHref("world")}>{sectionName('world',locale)} <ArrowRight size={17}/></a></div>}
      {active.map((edition,i)=><Day key={edition.date} edition={edition} locale={locale} section={section} first={i===0} index={index} reader={i===0?reader:undefined}/>)}
      {hasMore&&!loading&&<div className="archive-marker" ref={marker} role="status">{t.more} <span className="loader"/></div>}
      {!hasMore&&!loading&&dates.length>0&&<div className="archive-end"><span>✳</span>{t.end}</div>}
    </div>
  </main>;
}
export default function App(){
  const [locale,setLocale]=useState<Locale>(initialLocale),[theme,setTheme]=useState<'light'|'dark'>(initialTheme);
  const [route,setRoute]=useState<Route>(()=>{
    normalizeLegacyRoute();
    return routeFromPath();
  });
  const [visited,setVisited]=useState<Section[]>(()=>route.kind==='section'?[route.section]:[]);
  const [searchSeen,setSearchSeen]=useState(route.kind==='search');
  const [searchTag,setSearchTag]=useState(route.kind==='search'?route.tag:'');
  const [returnTo,setReturnTo]=useState<string>(route.kind==='article'?sectionHref(route.section):sectionHref('world'));
  type ScrollSnapshot={y:number;anchor?:string;relativeTop?:number};
  const scrollRef=useRef<Record<string,ScrollSnapshot>>((()=>{
    try{
      const values=JSON.parse(sessionStorage.getItem('o-scroll-positions')||'{}') as Record<string,number|ScrollSnapshot>;
      return Object.fromEntries(Object.entries(values).map(([path,value])=>
        [path,typeof value==='number'?{y:value}:value]));
    }catch{return {};}
  })());
  const cancelRestore=useRef<null|(()=>void)>(null);
  const current=useRef<{route:Route;path:string}>({route,path:currentPath()});
  const index=useStoryIndex(locale),t=messages[locale],selected=route.kind==='section'||route.kind==='article'?route.section:'world';
  useEffect(()=>{
    if('scrollRestoration' in history)history.scrollRestoration='manual';
    const record=(path:string,clicked?:Element|null)=>{
      const container=clicked?.closest<HTMLElement>('[data-scroll-anchor]');
      scrollRef.current[path]={
        y:window.scrollY,
        ...(container?.dataset.scrollAnchor?{
          anchor:container.dataset.scrollAnchor,
          relativeTop:container.getBoundingClientRect().top
        }:{})
      };
      try{sessionStorage.setItem('o-scroll-positions',JSON.stringify(scrollRef.current));}catch{}
    };
    // Scroll restoration is tied to the originating story, not to how far
    // the user subsequently scrolls through its full article.
    const restore=(incoming:Route,destination:string)=>{
      cancelRestore.current?.();
      let cancelled=false;
      const interrupt=()=>{cancelled=true;stop();};
      const timers:number[]=[];
      let frame=0;
      const stop=()=>{
        timers.forEach(window.clearTimeout);
        if(frame)cancelAnimationFrame(frame);
        window.removeEventListener('wheel',interrupt);
        window.removeEventListener('touchstart',interrupt);
        window.removeEventListener('pointerdown',interrupt);
        window.removeEventListener('keydown',interrupt);
      };
      cancelRestore.current=stop;
      window.addEventListener('wheel',interrupt,{passive:true});
      window.addEventListener('touchstart',interrupt,{passive:true});
      window.addEventListener('pointerdown',interrupt,{passive:true});
      window.addEventListener('keydown',interrupt);
      const snapshot=scrollRef.current[destination];
      const apply=()=>{
        if(cancelled||currentPath()!==destination)return;
        if(incoming.kind==='article'||incoming.kind==='releases'){
          window.scrollTo({top:0,left:0,behavior:'instant'});
          return;
        }
        // Prefer the actual story card/result as an anchor: lazy images and
        // edition growth cannot shift the restored card several days away.
        const element=snapshot?.anchor
          ?Array.from(document.querySelectorAll<HTMLElement>('[data-scroll-anchor]'))
            .find(node=>node.dataset.scrollAnchor===snapshot.anchor&&!node.closest('[hidden]'))
          :undefined;
        const desired=element&&snapshot?.relativeTop!==undefined
          ?window.scrollY+element.getBoundingClientRect().top-snapshot.relativeTop
          :snapshot?.y??0;
        window.scrollTo({top:Math.max(0,desired),left:0,behavior:'instant'});
      };
      frame=requestAnimationFrame(()=>{frame=requestAnimationFrame(apply);});
      // React updates the visible section before the first frame, but when
      // the archive or search is being reconstructed further attempts are needed.
      if(incoming.kind==='section'||incoming.kind==='search')
        for(const delay of [90,260,600,1100,1800])
          timers.push(window.setTimeout(apply,delay));
      else timers.push(window.setTimeout(apply,80));
      timers.push(window.setTimeout(stop,2000));
    };
    const activate=(previous:string)=>{
      const incoming=routeFromPath(),destination=currentPath();
      if((current.current.route.kind==='section'||current.current.route.kind==='search')&&incoming.kind==='article')
        setReturnTo(previous);
      current.current={route:incoming,path:destination};
      setRoute(incoming);
      if(incoming.kind==='section')setVisited(old=>old.includes(incoming.section)?old:[...old,incoming.section]);
      if(incoming.kind==='search'){setSearchSeen(true);setSearchTag(incoming.tag);}
      restore(incoming,destination);
    };
    const onClick=(event:MouseEvent)=>{
      if(event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
      if(!(event.target instanceof Element))return;
      const anchor=event.target.closest<HTMLAnchorElement>('a[href]');
      if(!anchor||anchor.hasAttribute('download')||(anchor.target&&anchor.target!=='_self'))return;
      const url=new URL(anchor.href,window.location.href);
      if(url.origin!==window.location.origin||!isAppRoute(url.pathname)||url.hash)return;
      event.preventDefault();
      const target=url.pathname+url.search;
      if(target===currentPath()){window.scrollTo({top:0,left:0,behavior:'instant'});return;}
      const previous=current.current.path;
      record(previous,anchor);
      history.pushState(null,'',target);
      activate(previous);
    };
    const onPopState=()=>{
      const previous=current.current.path;
      record(previous);
      activate(previous);
    };
    const onPageHide=()=>record(current.current.path);
    document.addEventListener('click',onClick);
    window.addEventListener('popstate',onPopState);
    window.addEventListener('pagehide',onPageHide);
    return()=>{
      cancelRestore.current?.();
      document.removeEventListener('click',onClick);
      window.removeEventListener('popstate',onPopState);
      window.removeEventListener('pagehide',onPageHide);
    };
  },[]);
  useEffect(()=>{
    let raw:string|null=null;
    try{raw=sessionStorage.getItem('o-reload-scroll');sessionStorage.removeItem('o-reload-scroll');}catch{}
    if(raw===null)return;
    const destination=currentPath(),desired=Number(raw);
    if(!Number.isFinite(desired)||desired<0)return;
    let cancelled=false;
    const cancelledByUser=()=>{cancelled=true;};
    window.addEventListener('wheel',cancelledByUser,{passive:true});
    window.addEventListener('touchstart',cancelledByUser,{passive:true});
    const timers=[80,250,650,1400].map(ms=>window.setTimeout(()=>{
      if(!cancelled&&currentPath()===destination)window.scrollTo({top:desired,left:0,behavior:'instant'});
    },ms));
    return()=>{
      timers.forEach(window.clearTimeout);
      window.removeEventListener('wheel',cancelledByUser);
      window.removeEventListener('touchstart',cancelledByUser);
    };
  },[]);
  useEffect(()=>{
    document.documentElement.dataset.theme=theme;document.documentElement.lang=locale;
    document.title='O — '+(route.kind==='search'?t.search:route.kind==='releases'?(locale==='it'?'Note di rilascio':'Release notes'):route.kind==='article'?'News':sectionName(selected,locale));
    try{localStorage.setItem('og-theme',theme);localStorage.setItem('og-language',locale);}catch{}
  },[theme,locale,selected,route.kind,t.search]);
  const changeLocale=(lang:Locale)=>setLocale(lang);
  return <div className="site-shell">
    <header className="masthead container">
      <a className="wordmark o-brand" href={sectionHref("world")} aria-label="O — home"><span className="wordmark-symbol">O<span>.</span></span><span className="brand-definition"><small>{t.name}</small><small>{locale==='it'?'0 pubblicità · 0 sensazionalismi':'0 ads · 0 clickbait'}</small></span></a>
      <div className="header-actions">
        <a className={'header-search '+(route.kind==='search'?'active':'')} href={searchHref()} aria-label={t.searchOpen}><SearchIcon size={18}/><span>{t.search}</span></a>
        <LanguageMenu locale={locale} onChange={changeLocale}/>
        <button type="button" className="icon-btn" aria-label={theme==='dark'?t.light:t.dark} onClick={()=>setTheme(theme==='dark'?'light':'dark')}>{theme==='dark'?<Sun size={20}/>:<Moon size={20}/>}</button>
        <AppMenu locale={locale}/>
      </div>
    </header>
    <div className="container"><nav className="four-nav" aria-label={locale==='it'?'Sezioni':'Sections'}>{sections.map((s,i)=><a key={s} href={sectionHref(s)} className={route.kind==='section'&&selected===s?'active':''} aria-current={route.kind==='section'&&selected===s?'page':undefined}><small>{String(i+1).padStart(2,'0')}</small><strong>{sectionName(s,locale)}</strong></a>)}</nav></div>
    {visited.map(s=><div key={s} data-section-root={s} hidden={route.kind!=='section'||route.section!==s}><SectionPage section={s} locale={locale} index={index} enabled={route.kind==='section'&&route.section===s}/></div>)}
    {searchSeen&&<div data-search-root hidden={route.kind!=='search'}><SearchPage locale={locale} presetTag={searchTag}/></div>}
    {route.kind==='article'&&<ArticleView key={locale+'/'+route.section+'/'+route.date+'/'+route.id} route={route} locale={locale} index={index} returnTo={returnTo}/>}
    {route.kind==='releases'&&<ReleasePage locale={locale}/>}
    <footer id="method"><div className="container footer-grid"><div><div className="footer-logo">O<span>.</span></div><h2>{t.definition}</h2><p>{t.about} {t.mediaNotice}</p><p className="zero-footer">{t.zero1} <span>/</span> {t.zero2}</p><a className="footer-link" href="https://github.com/KeyserDSoze/News/blob/main/docs/EDITORIAL_POLICY.md" target="_blank" rel="noopener noreferrer">{t.methodologyLink} <ArrowRight size={16}/></a></div>
      <div className="footer-side"><div className="footer-rule">01 / {t.methodology.toUpperCase()}</div><p>{t.footnote}</p><div className="footer-rule">02 / OPEN SOURCE</div><a href="https://github.com/KeyserDSoze/News" target="_blank" rel="noopener noreferrer">{t.openSource} <ExternalLink size={14}/></a></div></div>
      <div className="footer-bottom container"><span>© {new Date().getFullYear()} O — {t.name.toUpperCase()}</span><span>ZERO ADS. FACTS FIRST.</span></div>
    </footer>
  </div>;
}
