/**
 * End-to-end post-deploy smoke check from the GitHub Actions runner.
 * Checks actual CDN-hosted HTML and JS rather than only the local build.
 */
const origin=(process.env.SITE_ORIGIN||'https://onews.app').replace(/\/$/,'');
const timeout=12000;
async function checked(url) {
 const res=await fetch(url,{redirect:'follow',headers:{'Cache-Control':'no-cache'},signal:AbortSignal.timeout(timeout)});
 if(!res.ok)throw new Error(url+' HTTP '+res.status);
 return res;
}
async function verify(){
 const entry=await checked(origin+'/?smoke='+Date.now());
 const html=await entry.text();
 const js=html.match(/\bsrc="(\/assets\/[^"]+\.js)"/);
 if(!js)throw new Error('Homepage did not serve the root-relative Vite JavaScript bundle (legacy /News/ prefix or HTML not deployed)');
 const bundle=await checked(origin+js[1]);
 const bundleBody=await bundle.text();
 if(bundleBody.length<1000||bundleBody.startsWith('<!doctype'))throw new Error('Vite JavaScript bundle is missing or returns HTML');
 const manifest=await (await checked(origin+'/manifest.webmanifest')).json();
 if(manifest.scope!=='/'||manifest.start_url!=='/')throw new Error('PWA still scoped outside custom-domain root');
 const article='/article/world/2026-10-24/oleshky-humanitarian-ceasefire/';
 const articleHTML=await (await checked(origin+article)).text();
 if(!articleHTML.includes('https://onews.app'+article))throw new Error('Article canonical permalink still uses legacy domain');
 await checked(origin+'/releases/');
 console.log('Verified LIVE',origin,'JavaScript',js[1],'PWA root scope, article permalink, and release notes.');
}
let error;
for(let attempt=1;attempt<=7;attempt++){
 try{await verify();process.exit(0);}catch(err){
   error=err;
   console.warn('Live check '+attempt+'/7:',err.message);
   if(attempt<7)await new Promise(resolve=>setTimeout(resolve,6000));
 }
}
console.error('Custom domain verification failed:',error?.message);
process.exit(1);
