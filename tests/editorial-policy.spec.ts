import { expect, test } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

test('current editorial standards define the same half-level segmented impact scale as the UI', () => {
 const read=(file:string)=>readFileSync(resolve('../..',file),'utf8');
 const policy=read('docs/EDITORIAL_POLICY.md');
 const readme=read('README.md');
 const architecture=read('docs/ARCHITECTURE.md');
 const contributing=read('docs/CONTRIBUTING.md');
 expect(policy).toContain('Scala d’impatto'.replace('’',"'"));
 expect(policy).toContain('five rising segments');
 expect(policy).toContain('cinque tacche');
 expect(policy).toContain('0.5 increments');
 expect(policy).toContain('incrementi di 0,5');
 expect(readme).toContain('five graduated segments');
 expect(architecture).toContain('0.5–5.0');
 expect(contributing).toContain('maximum level 5.0');
 // Normative, current guidance must not still define impact as stars.
 for (const file of [policy,readme,architecture,contributing]) {
   expect(file).not.toMatch(/(?:\d[\d.–-]*\s*stars?|\d[\d.,–-]*\s*stell[ae]|half-star|five-star|five stars|star[- ]based rating)/i);
 }
});
