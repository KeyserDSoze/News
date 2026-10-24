import type { Article, Locale, Section, StoryIndex, StoryRef } from './types';
import { formatDate, messages, sectionName } from './i18n';
import { storyHref, storyKey } from './types';

export type ArticlePart='summary'|'body'|'facts'|'perspectives'|'dossier'|'sources'|'assessment';
export interface ExportPart { id:ArticlePart; title:string; markdown:string; speech:string; }
export interface ArticleExports { parts:ExportPart[]; markdown:string; speech:string; }
const md=(s:string)=>s.replace(/\\/g,'\\\\').replace(/([*_\\[\\]#|])/g,'\\$1').replace(/\r?\n/g,' ');
const lines=(label:string,values:string[])=>values.length?'## '+label+'\n\n'+values.map(v=>'- '+md(v)).join('\n'):'';
const baseUrl=()=>typeof window!=='undefined'?window.location.origin:'https://keyserdsoze.github.io';
function makePart(id:ArticlePart,title:string,content:string,speech:string):ExportPart {
  return {id,title,markdown:content.trim()+'\n',speech:speech.trim()};
}
export function buildArticleExports(article:Article,locale:Locale,section:Section,date:string,index:StoryIndex|null):ArticleExports {
 const t=messages[locale];
 const parts:ExportPart[]=[];
 const context=`${sectionName(section,locale)} — ${formatDate(date,locale)}`;
 const summary=makePart('summary',t.summary,'## '+t.summary+'\n\n'+md(article.summary),t.summary+'. '+article.summary);
 parts.push(summary);
 const paragraphs=article.body?.length?article.body:[article.facts.join(' '),article.perspectives.join(' ')];
 parts.push(makePart('body',t.fullStory,'## '+t.fullStory+'\n\n'+paragraphs.map(md).join('\n\n'),t.fullStory+'. '+paragraphs.join('\n')));
 parts.push(makePart('facts',t.facts,lines(t.facts,article.facts),t.facts+'. '+article.facts.join('. ')));
 parts.push(makePart('perspectives',t.perspectives,lines(t.perspectives,article.perspectives),t.perspectives+'. '+article.perspectives.join('. ')));
 if(article.threadId&&index){
  const dossier=index.stories.filter(s=>s.threadId===article.threadId).sort((a,b)=>a.date.localeCompare(b.date));
  if(dossier.length>1){
   const mdLine=dossier.map(s=>`- **${formatDate(s.date,locale)}:** [${md(s.title)}](${baseUrl()+storyHref(s)}) — ${md(s.summary)}`).join('\n');
   const speechText=[article.threadRecap||'',...dossier.map(s=>formatDate(s.date,locale)+'. '+s.title+'. '+s.summary)].join('\n');
   parts.push(makePart('dossier',t.historical,'## '+t.historical+'\n\n'+(article.threadRecap?md(article.threadRecap)+'\n\n':'')+mdLine,t.historical+'. '+speechText));
  }
 }
 const sourcesMd=article.sources.map(s=>`- [${md(s.outlet)} — ${md(s.title)}](${s.url}) (${s.publishedAt.slice(0,10)}; ${s.role})`).join('\n');
 parts.push(makePart('sources',t.sourcesLabel,'## '+t.sourcesLabel+'\n\n'+sourcesMd,t.sourcesLabel+'. '+article.sources.map(s=>s.outlet+'. '+s.title).join('. ')));
 const questions=article.questions?.length?article.questions:article.unknowns.map(s=>({question:t.unknowns,answer:s}));
 const assessmentMd='## '+t.assessment+'\n\n'+questions.map(q=>'**'+md(q.question)+'**\n\n'+md(q.answer)).join('\n\n')+
  '\n\n'+lines(t.unknowns,article.unknowns);
 parts.push(makePart('assessment',t.assessment,assessmentMd,t.assessment+'. '+questions.map(q=>q.question+'. '+q.answer).join('. ')+'. '+t.unknowns+'. '+article.unknowns.join('. ')));
 const title='# '+md(article.title);
 const header=[title,'',md(article.dek),'',`**${context}** · ${t.impactLabel}: ${article.impact}/5`,'',md(article.impactReason),'',article.tags.map(v=>'#'+v).join(' '),'',
 `[O — ${t.name}](${baseUrl()+storyHref({section,date,id:article.id})})`,''];
 const image=article.image.src.startsWith('https://')?article.image.src:baseUrl()+(import.meta.env.BASE_URL||'/News/')+article.image.src.replace(/^\//,'');
 const imageMarkdown=`![${md(article.image.alt)}](${image})\n\n*${md(article.image.credit)} · ${md(article.image.license)} — [${locale==='it'?'Fonte immagine':'Image source'}](${article.image.sourceUrl})*`;
 const final=[...header,...parts.map(p=>p.markdown),imageMarkdown].join('\n\n').trim()+'\n';
 const oral=[article.title,article.dek,context,...parts.map(p=>p.speech)].join('\n\n');
 return {parts,markdown:final,speech:oral};
}
