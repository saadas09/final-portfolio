from pathlib import Path
from playwright.sync_api import sync_playwright,expect
import sys,json
r=Path(__file__).resolve().parent.parent / '.qa'
url=sys.argv[1] if len(sys.argv)>1 else 'http://127.0.0.1:5173/'
with sync_playwright() as p:
 b=p.chromium.launch(channel='chrome',headless=True)
 page=b.new_page(viewport={'width':1440,'height':1000},reduced_motion='reduce',permissions=['clipboard-read','clipboard-write'])
 errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
 page.goto(url,wait_until='networkidle')
 page.get_by_role('button',name='Save featured FindUrWay',exact=True).click()
 page.get_by_role('button',name='Save featured Maroc Modis LMS',exact=True).click()
 page.reload(wait_until='networkidle')
 expect(page.get_by_role('button',name='Unsave featured FindUrWay')).to_have_attribute('aria-pressed','true')
 page.get_by_role('button',name='Explore all 14 projects',exact=True).click()
 search=page.get_by_role('searchbox',name='Search projects')
 search.fill('Airflow');expect(page.locator('.index-row')).to_have_count(1)
 search.fill('no-matches-ever');expect(page.locator('.explorer-empty')).to_be_visible()
 page.get_by_role('button',name='Show every project').click();expect(page.locator('.index-row')).to_have_count(14)
 page.get_by_role('button',name='Saved (2)',exact=True).click();expect(page.locator('.index-row')).to_have_count(2)
 page.get_by_role('button',name='Compare saved projects',exact=True).click();expect(page.locator('.comparison-grid article')).to_have_count(2)
 page.get_by_role('button',name='Copy shortlist',exact=False).click()
 text=page.evaluate('navigator.clipboard.readText()');assert 'FindUrWay' in text and 'Maroc Modis LMS' in text
 page.get_by_role('button',name='Surprise me',exact=True).click();expect(page.get_by_role('dialog')).to_be_visible();page.keyboard.press('Escape')
 page.get_by_role('button',name='Remove Maroc Modis LMS from shortlist',exact=True).click();expect(page.locator('.comparison-grid article')).to_have_count(1)
 for width in [320,390,768,1440]:
  page.set_viewport_size({'width':width,'height':1000})
  assert page.evaluate('document.documentElement.scrollWidth')<=width
  page.locator('.art-gallery').evaluate('(e)=>window.scrollTo({top:e.offsetTop-100,behavior:"instant"})')
  for image in page.locator('.generated-cover img').all():
   image.scroll_into_view_if_needed();assert image.evaluate('(e)=>e.complete&&e.naturalWidth>0')
  page.locator('.art-gallery').evaluate('(e)=>window.scrollTo({top:e.offsetTop-100,behavior:"instant"})')
  page.screenshot(path=str(r/f'gallery-{width}.png'))
  page.locator('.explorer-tools').scroll_into_view_if_needed();page.screenshot(path=str(r/f'explorer-{width}.png'))
 page.get_by_role('button',name='Read FindUrWay',exact=True).click();expect(page.get_by_role('dialog')).to_be_visible();page.keyboard.press('Escape')
 assert not errors,errors
 print(json.dumps({'result':'PASS','checks':['search and empty state','bookmark persistence','saved filter','comparison and removal','clipboard shortlist','random project','four loaded artworks','responsive layouts'],'errors':errors}))
 b.close()
