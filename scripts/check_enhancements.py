from pathlib import Path
from playwright.sync_api import sync_playwright,expect
import sys,json
r=Path(__file__).resolve().parent.parent / '.qa'
base=sys.argv[1] if len(sys.argv)>1 else 'http://127.0.0.1:5173/'
with sync_playwright() as p:
 b=p.chromium.launch(channel='chrome',headless=True)
 page=b.new_page(viewport={'width':1440,'height':1000},permissions=['clipboard-read','clipboard-write'])
 errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
 page.goto(base,wait_until='networkidle')
 page.locator('#skills').evaluate('(e)=>window.scrollTo({top:e.offsetTop,behavior:"instant"})')
 page.wait_for_timeout(1100)
 tabs=page.get_by_role('tab');tabs.nth(1).click()
 page.wait_for_timeout(80)
 assert page.locator('#expertise-panel').evaluate('(e)=>getComputedStyle(e).transform')!='none'
 tabs.nth(2).click();tabs.nth(0).click();tabs.nth(1).click()
 page.wait_for_timeout(1000)
 expect(page.get_by_role('tabpanel')).to_contain_text('Azure Functions')
 assert float(page.get_by_role('tabpanel').evaluate('(e)=>getComputedStyle(e).opacity'))==1
 page.screenshot(path=str(r/'expertise-new.png'))
 page.emulate_media(reduced_motion='reduce')
 for id in ['findurway','lms','darija']:
  page.goto(base+'?project='+id,wait_until='networkidle')
  expect(page.get_by_role('dialog')).to_be_visible()
  expect(page.locator('.architecture li')).to_have_count(6)
  for image in page.locator('.case-gallery img').all():
   image.scroll_into_view_if_needed()
   expect(image).to_be_visible()
   assert image.evaluate('(e)=>e.complete && e.naturalWidth>0')
  page.get_by_role('button',name='Copy a link to this case study').click()
  assert '?project='+id in page.evaluate('navigator.clipboard.readText()')
  page.keyboard.press('Escape')
  assert '?project=' not in page.url
 for width in [390,1440]:
  page.set_viewport_size({'width':width,'height':1000})
  page.goto(base,wait_until='networkidle')
  for selector,label in [('.feature-learning','lms'),('.feature-ocr','ocr'),('#about','about')]:
   page.locator(selector).evaluate('(e)=>window.scrollTo({top:e.getBoundingClientRect().top+scrollY-100,behavior:"instant"})')
   page.screenshot(path=str(r/f'{label}-{width}-new.png'))
  page.goto(base+'?project=darija',wait_until='networkidle')
  assert page.get_by_role('dialog').evaluate('(e)=>e.scrollWidth<=e.clientWidth')
 assert not errors,errors
 print(json.dumps({'result':'PASS','fluid_switches':True,'deep_links':3,'real_images_loaded':True,'errors':errors}))
 b.close()

