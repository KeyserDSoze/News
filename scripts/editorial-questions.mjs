// Editorial Q&A safeguards shared by the static archive and automated newsroom.
// Deterministic checks catch repetitive filler; substantive relevance still
// requires reviewing the article and independent sources.
const genericPatterns=[
 /^quali elementi risultano documentati\??$/iu,
 /^cosa resta da verificare\??$/iu,
 /^cosa resta incerto\??$/iu,
 /^che cosa (?:non )?sappiamo\??$/iu,
 /^è una scoperta fatta il \d{1,2} \w+\??$/iu,
 /^i risultati dimostrano una guarigione universale\??$/iu,
 /^la terapia è automaticamente approvata\??$/iu,
 /^what (?:remains|is) (?:unknown|uncertain|established|to be verified)\??$/iu,
 /^was (?:it|this) (?:a )?discover(?:y|ed) (?:made )?(?:on |today|this edition)/iu,
 /^do (?:the )?results (?:show|prove) (?:a )?(?:universal|complete) cure\??$/iu,
 /^is (?:the )?(?:therapy|treatment) automatically approved\??$/iu
];
export function normalizedEditorialText(value){
 return String(value||'').normalize('NFKD').replace(/[\u0300-\u036f]/g,'')
  .toLowerCase().replace(/[^\p{L}\p{N}]+/gu,' ').trim();
}
export function questionQualityIssues(article){
 const errors=[],qs=Array.isArray(article?.questions)?article.questions:[];
 if(!qs.length)return ['at least one factual question and answer required'];
 const seen=new Set();
 for(let i=0;i<qs.length;i++){
  const q=qs[i];
  if(typeof q?.question!=='string'||typeof q?.answer!=='string')continue;
  const prompt=q.question.trim(),answer=q.answer.trim();
  const key=normalizedEditorialText(prompt);
  if(seen.has(key))errors.push('duplicate question '+(i+1));
  seen.add(key);
  if(genericPatterns.some(re=>re.test(prompt)))errors.push('generic editorial question '+(i+1));
  if(normalizedEditorialText(answer).length<18)errors.push('answer too short to be informative '+(i+1));
  if((article.unknowns||[]).some(u=>normalizedEditorialText(u)===normalizedEditorialText(answer)))
   errors.push('answer duplicates the unknowns section '+(i+1));
 }
 return errors;
}
