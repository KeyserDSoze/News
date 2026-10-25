import {test} from 'node:test';
import assert from 'node:assert/strict';
import {romeDate,safeUrl,canonical,publisherKey,validateSources,duplicate,fullArticleCheck,validatePair,assembleEdition,DESKS} from '../scripts/auto-publisher-core.mjs';
const after=Date.parse('2026-10-26T22:00:00Z'),before=Date.parse('2026-10-21T00:00:00Z');
test('Rome local date follows daylight savings',()=>{
 assert.equal(romeDate(new Date('2026-10-25T00:30:00Z')),'2026-10-25');
 assert.equal(romeDate(new Date('2026-10-25T23:30:00Z')),'2026-10-26');
});
test('private URL and plain HTTP are rejected',()=>{
 for(const u of ['http://reuters.com','https://localhost','https://127.0.0.1','https://10.1.2.3','https://u:p@google.com'])assert.equal(safeUrl(u),null);
 assert.equal(canonical('https://www.reuters.com/world/example/?a=3'),'reuters.com/world/example');
});
test('URLs from the same owner do not count as independent',()=>{
 const a={outlet:'Reuters',title:'First',url:'https://www.reuters.com/world/story',publishedAt:'2026-10-24',role:'reporting'};
 const b={outlet:'Reuters Connect',title:'Second',url:'https://www.reutersconnect.com/item/other',publishedAt:'2026-10-24',role:'reporting'};
 assert.equal(publisherKey(a),publisherKey(b));
 assert.equal(validateSources([a,b],[a.url,b.url],before,after).ok,false);
 const c={...b,outlet:'AP',url:'https://apnews.com/article/other'};
 assert.equal(validateSources([a,c],[a.url,c.url],before,after).ok,true);
 assert.equal(validateSources([a,c],[a.url],before,after).ok,false);
});
test('repeat source URL or near-identical story is a duplicate',()=>{
 const old=[{id:'first',title:'Major protests in Rome over transport costs and wages',urls:['reuters.com/world/example']}];
 assert.equal(duplicate({id:'new',title:'Other',sources:[{url:'https://www.reuters.com/world/example'}]},old,[]),true);
 assert.equal(duplicate({id:'different',title:'Quantum computer research',sources:[{url:'https://apnews.com/article/other'}]},old,[]),false);
});
test('articles must have substantial bilingual details; quotas cannot be padded',()=>{
 const sample={title:'Researchers document a clearly measured clinical outcome',dek:'A randomized trial in a defined group reports a relevant finding.',summary:'The study found an effect in a selected population but leaves follow-up questions open.',impactReason:'The measured outcome could matter for a limited patient group.',category:'society',impact:2.5,tags:['trial','medical-study','oncology'],body:Array(4).fill('A carefully written paragraph distinguishes measured data from the scientists interpretations of their trial. The participants were selected according to a fixed protocol and there were uncertainties about longer term effectiveness and adverse events. It is important to describe these constraints alongside the comparison with standard treatment and the size of the sample.'),facts:['The randomized study enrolled a defined group of participants.'],perspectives:['Investigators described the result as grounds for future research.'],unknowns:['Long-term adverse effects and clinical implications remain uncertain.'],questions:[{question:'Which people took part in this study?',answer:'Only those satisfying the prespecified trial eligibility criteria.'}]};
 assert.deepEqual(fullArticleCheck(sample,'en'),[]);
 assert.deepEqual(validatePair({it:sample,en:sample},[{url:'https://reuters.com'},{url:'https://apnews.com'}],'valid-article-id',1),[]);
 assert.ok(fullArticleCheck({...sample,body:['a']},'en').length>0);
 assert.throws(()=>assembleEdition('2026-10-26','world','it',[sample]),/need 10 validated articles/);
 assert.equal(DESKS.world,10);assert.equal(DESKS.science,5);
});
