// Optional browser integration check; uses an existing Playwright install, no downloads.
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),output=path.join(root,'public');
const moduleArg=process.argv.indexOf('--playwright'),browserArg=process.argv.indexOf('--browser');
const playwright=require(moduleArg>=0?process.argv[moduleArg+1]:'playwright');
const config=JSON.parse(fs.readFileSync(path.join(root,'vercel.json'),'utf8'));
const headers=Object.fromEntries(config.headers[0].headers.map(h=>[h.key,h.value]));
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.jpg':'image/jpeg','.png':'image/png','.webp':'image/webp','.svg':'image/svg+xml'};
const checks=[];
const server=http.createServer((req,res)=>{
  try{
    let name=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    if(name==='/')name='/index.html';
    if(!path.extname(name))name+='.html';
    const file=path.resolve(output,'.'+name);
    if(!file.startsWith(output+path.sep)||!fs.existsSync(file)||!fs.statSync(file).isFile()){res.writeHead(404,headers);res.end();return;}
    res.writeHead(200,{...headers,'Content-Type':mime[path.extname(file)]||'application/octet-stream'});
    res.end(fs.readFileSync(file));
  }catch{res.writeHead(400,headers);res.end();}
});
(async()=>{
  let browser;
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const url='http://127.0.0.1:'+server.address().port;
  try{
    browser=await playwright.chromium.launch({headless:true,...(browserArg>=0?{executablePath:process.argv[browserArg+1]}:{})});
    const context=await browser.newContext({viewport:{width:1440,height:1000}});
    await context.route('https://fonts.googleapis.com/**',route=>route.abort());
    await context.route('https://fonts.gstatic.com/**',route=>route.abort());
    const page=await context.newPage(),errors=[],dialogs=[];
    page.on('pageerror',e=>errors.push(e.message));
    page.on('dialog',async dialog=>{dialogs.push(dialog.message());await dialog.accept();});
    await page.goto(url+'/collection.html',{waitUntil:'domcontentloaded'});
    assert.equal(await page.locator('#boutiqueProductGrid [data-detail]').count(),20);
    await page.locator('#addFragranceBtn').click();
    await page.locator('#edit-name').fill('<img src=x onerror=alert(1)> QA');
    await page.locator('#edit-brand').fill('QA maker');
    await page.locator('#edit-bottleSize').fill('50');
    await page.locator('#edit-remainingMl').fill('40');
    await page.locator('#edit-occasions').fill('gym');
    await page.locator('#edit-autumn').fill('80');
    await page.locator('#edit-photo').setInputFiles({name:'owner.jpg',mimeType:'image/jpeg',buffer:fs.readFileSync(path.join(output,'assets/bottles/cropped/after_effect_fa_paris.jpg'))});
    await page.locator('#editorError').filter({hasText:'Photo ready'}).waitFor();
    await page.locator('#addFragranceForm button[type=submit]').click();
    await page.locator('#addBottleModal').waitFor({state:'hidden'});
    assert.equal(await page.locator('#boutiqueProductGrid [data-detail]').count(),21);
    assert.equal(await page.evaluate(()=>document.activeElement.id),'addFragranceBtn');
    const id=await page.evaluate(()=>collection.find(i=>i.brand==='QA maker').id);
    assert.deepEqual(await page.evaluate(id=>collection.find(i=>i.id===id).occasions,id),['Gym']);
    assert.equal(dialogs.length,0);
    checks.push('add/photo upload/unknown fields/HTML escaping/focus');
    await page.locator('[data-detail="'+id+'"]').click();
    await page.locator('#detailRemaining').fill('25');
    await page.locator('[data-save-volume="'+id+'"]').click();
    await page.locator('#detailModal').waitFor({state:'hidden'});
    await page.reload({waitUntil:'domcontentloaded'});
    assert.equal(await page.evaluate(id=>collection.find(i=>i.id===id).remainingMl,id),25);
    checks.push('remaining volume persisted after reload');
    const promise=page.waitForEvent('download');await page.locator('#exportInventoryBtn').click();
    const download=await promise,backup=fs.readFileSync(await download.path());
    await page.locator('#importInventoryFile').setInputFiles({name:'invalid.json',mimeType:'application/json',buffer:Buffer.from('null')});
    await page.locator('#importPreview').filter({hasText:'Import rejected'}).waitFor();
    assert.equal(await page.locator('#boutiqueProductGrid [data-detail]').count(),21);
    await page.locator('[data-detail="'+id+'"]').click();await page.locator('[data-delete="'+id+'"]').click();
    await page.locator('#detailModal').waitFor({state:'hidden'});
    assert.equal(await page.locator('#boutiqueProductGrid [data-detail]').count(),20);
    await page.locator('#importInventoryFile').setInputFiles({name:'restore.json',mimeType:'application/json',buffer:backup});
    await page.locator('#applyImportBtn').waitFor({state:'visible'});await page.locator('#applyImportBtn').click();
    await page.locator('#importPreview').filter({hasText:'Backup applied'}).waitFor();
    assert.equal(await page.locator('#boutiqueProductGrid [data-detail]').count(),21);
    checks.push('JSON export/rejected import/delete/restore');
    await page.locator('[data-detail="'+id+'"]').click();await page.locator('#modalCloseBtn').focus();await page.keyboard.press('Shift+Tab');
    assert(await page.evaluate(()=>document.getElementById('detailModal').contains(document.activeElement)));
    await page.keyboard.press('Escape');
    assert.equal(await page.evaluate(()=>document.activeElement.dataset.detail),id);
    await page.locator('[data-detail="'+id+'"]').click();await page.locator('[data-edit="'+id+'"]').click();await page.keyboard.press('Escape');
    assert.equal(await page.evaluate(()=>document.activeElement.dataset.detail),id);
    checks.push('dialog focus containment/Escape/return from nested editor');
    const second=await context.newPage();await second.goto(url+'/collection.html',{waitUntil:'domcontentloaded'});
    await page.locator('#addFragranceBtn').click();await page.locator('#edit-name').fill('Stale tab');await page.locator('#edit-brand').fill('Owner');
    await second.locator('#addFragranceBtn').click();await second.locator('#edit-name').fill('Other tab');await second.locator('#edit-brand').fill('Owner');await second.locator('#addFragranceForm button[type=submit]').click();await second.locator('#addBottleModal').waitFor({state:'hidden'});
    await page.locator('#addFragranceForm button[type=submit]').click();await page.locator('#editorError').filter({hasText:'Another tab changed'}).waitFor();
    assert(await page.evaluate(()=>collection.some(i=>i.name==='Other tab')));
    assert(!await page.evaluate(()=>collection.some(i=>i.name==='Stale tab')));
    await page.keyboard.press('Escape');await second.close();
    checks.push('stale-tab edit refused without overwriting other tab');
    await page.goto(url+'/index.html',{waitUntil:'domcontentloaded'});
    await page.locator('#sotdOccasionSelect').selectOption('Gym');await page.locator('#sotdTimeSelect').selectOption('night');
    assert(await page.evaluate(()=>getInSeasonCandidates(sotdActiveSeason).every(c=>c.item.occasions.includes('Gym'))));
    checks.push('recommendation occasion/time controls');
    await page.goto(url+'/layering.html',{waitUntil:'domcontentloaded'});
    assert.equal(await page.locator('.duo-editorial-card').count(),4);
    assert(await page.locator('#layeringDuosContainer').innerText().then(text=>text.includes('Caution:')&&text.includes('editorial, untested')));
    await page.locator('#modeInteractiveStudioBtn').click();
    await page.locator('#baseFragranceSelect').selectOption('user-pp-navy-intense-0061');
    assert.equal(await page.locator('.companion-rank-card').count(),0);
    assert((await page.locator('#rankedCompanionsContainer').innerText()).includes('No listed pairing meets'));
    await page.locator('#baseFragranceSelect').selectOption('user-after-effect-fa-paris');
    assert.equal(await page.locator('.companion-rank-card').count(),3);
    assert(await page.locator('.companion-synergy-score').allTextContents().then(values=>values.every(value=>Number(value)>=90)));
    checks.push('four reviewed pairs, explicit cautions, minimum90 and Navy empty state');
    for(const size of [{width:1440,height:1000},{width:375,height:812}]){
      await page.setViewportSize(size);
      for(const theme of ['light','dark']){
        await page.evaluate(t=>localStorage.setItem('atelier_theme',t),theme);
        for(const file of ['index.html','collection.html','occasions.html','layering.html','guide.html']){
          await page.goto(url+'/'+file,{waitUntil:'domcontentloaded'});
          assert.equal(await page.locator('html').getAttribute('data-theme'),theme);
          assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),file+' overflow');
          checks.push(file+' '+size.width+' '+theme);
        }
      }
    }
    await page.goto(url+'/collection.html',{waitUntil:'domcontentloaded'});await page.locator('#mobileMenuBtn').click();await page.keyboard.press('Escape');assert.equal(await page.evaluate(()=>document.activeElement.id),'mobileMenuBtn');
    checks.push('mobile drawer Escape/focus return');
    const response=await page.request.get(url+'/assets/bottles/user_photos/shelf_1_pp_row.jpg');assert.equal(response.status(),404);
    checks.push('source originals absent from output');
    assert.deepEqual(errors,[]);
    console.log(JSON.stringify({passed:checks.length,checks,pageErrors:errors,notes:['Fonts blocked for deterministic offline layout checks; fallback typography exercised.']},null,2));
  }finally{if(browser)await browser.close();await new Promise(resolve=>server.close(resolve));}
})().catch(error=>{console.error(error);process.exitCode=1;});
