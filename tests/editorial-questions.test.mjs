import {test} from 'node:test';
import assert from 'node:assert/strict';
import {questionQualityIssues,normalizedEditorialText} from '../scripts/editorial-questions.mjs';

test('rejects repeated questions, edition metadata and vague formulas',()=>{
 const story={unknowns:['Unknown results.'],questions:[
 {question:'What remains unknown?',answer:'There are no verified results available.'},
 {question:'What remains unknown?',answer:'Unknown results.'}
 ]};
 assert.ok(questionQualityIssues(story).some(s=>s.includes('generic')));
 assert.ok(questionQualityIssues(story).some(s=>s.includes('duplicate question')));
 assert.ok(questionQualityIssues(story).some(s=>s.includes('unknowns')));
});
test('rejects the template questions shown in published October drafts',()=>{
 const cases=['Quali elementi risultano documentati?','Cosa resta da verificare?','È una scoperta fatta il 25 ottobre?','I risultati dimostrano una guarigione universale?','La terapia è automaticamente approvata?','What remains unknown?'];
 for(const question of cases) assert.ok(questionQualityIssues({unknowns:['Uncertainty.'],questions:[{question,answer:'An answer long enough to make the test meaningful.'}]}).some(s=>s.includes('generic')),question);
});
test('accepts pertinent question-answer pairs without duplicated unknowns',()=>{
 const article={unknowns:['Long-term safety data remain incomplete.'],questions:[
 {question:'What does full-duplex speech allow Dessa to do?',answer:'It can listen and speak concurrently, including when a user interrupts.'},
 {question:'Do company demos constitute independent benchmarks?',answer:'No. Selected recordings have not yet been validated through independent performance testing.'}
 ]};
 assert.deepEqual(questionQualityIssues(article),[]);
 assert.equal(normalizedEditorialText('È una PROVA?'),'e una prova');
});
