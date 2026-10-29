from pathlib import Path
from playwright.sync_api import sync_playwright,expect
import sys,json
r=Path(__file__).resolve().parent.parent/'.qa'
url=sys.argv[1] if len(sys.argv)>1 else 'http://127.0.0.1:5173/'
with sync_playwright() as p:
 b=p.chromium.launch(channel='chrome',headless=True)
 page=b.new_page(viewport={'width':1440,'height':1000},reduced_motion='reduce')
 errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
 page.goto(url,wait_until='networkidle')
 for button in page.locator('.rail-project').all():
  button.click();expect(page.get_by_role('dialog')).to_be_visible();page.keyboard.press('Escape');expect(button).to_be_focused()
 with page.expect_download() as d:page.get_by_role('link',name='Get my CV',exact=True).click()
 assert d.value.suggested_filename=='Saad-Abs-CV.pdf'
 for width in [320,390,768,1440,1920]:
  page.set_viewport_size({'width':width,'height':1000})
  page.evaluate('scrollTo({top:0,behavior:"instant"})')
  page.wait_for_timeout(250)
  assert page.evaluate('document.documentElement.scrollWidth')<=width
  intro=page.locator('.hero-intro p').bounding_box();proof=page.locator('.hero-proof').bounding_box()
  if width<650: assert proof['x']>intro['x']
  page.screenshot(path=str(r/f'hero-refresh-{width}.png'))
 expect(page.get_by_text('AI-GENERATED CONCEPT ART',exact=False)).to_have_count(0)
 for img in page.locator('.art-gallery .generated-cover img').all():
  img.scroll_into_view_if_needed();expect(img).to_be_visible();assert img.evaluate('(e)=>e.complete&&e.naturalWidth>0')
 page.locator('.art-gallery').evaluate('(e)=>scrollTo({top:e.offsetTop-100,behavior:"instant"})')
 page.screenshot(path=str(r/'product-gallery.png'))
 assert not errors,errors
 print(json.dumps({'result':'PASS','checks':['three hero project shortcuts','hero CV download','responsive hero','four product previews','removed generation captions'],'errors':errors}))
 b.close()
