from pathlib import Path
from playwright.sync_api import sync_playwright, expect
import json
import sys

ROOT=Path(__file__).resolve().parent.parent / '.qa'
ROOT.mkdir(exist_ok=True)
url=sys.argv[1] if len(sys.argv)>1 else 'http://127.0.0.1:5173/'
with sync_playwright() as p:
    browser=p.chromium.launch(channel='chrome',headless=True)
    context=browser.new_context(viewport={'width':1440,'height':1000},reduced_motion='reduce',permissions=['clipboard-read','clipboard-write'])
    page=context.new_page()
    errors=[]
    page.on('pageerror',lambda e:errors.append(str(e)))
    page.goto(url,wait_until='networkidle')
    expect(page).to_have_title('Saad Abs — AI, Data & Software Engineering')
    expect(page.locator('.project-card')).to_have_count(6)
    page.get_by_role('button',name='Data 02',exact=True).click()
    expect(page.locator('.art-caption h2')).to_have_text('Connections, engineered.')
    page.get_by_role('button',name='Software 03',exact=True).click()
    expect(page.locator('.art-caption h2')).to_have_text('Ideas, made useful.')
    page.get_by_role('button',name='AI 01',exact=True).click()

    page.get_by_role('button',name='Data & Cloud',exact=True).click()
    expect(page.locator('.project-card')).to_have_count(3)
    expect(page.locator('.project-card h3')).to_have_text(['FindUrWay','A Little Light. A Connected World.','Career2Life'])
    page.get_by_role('button',name='AI & ML',exact=True).click()
    expect(page.locator('.project-card')).to_have_count(6)
    page.get_by_role('button',name='All work',exact=True).click()
    page.get_by_role('button',name='Explore all 14 projects',exact=True).click()
    expect(page.locator('.project-card')).to_have_count(14)
    names=page.locator('.project-card h3 button').all_text_contents()
    for name in names:
        trigger=page.get_by_role('button',name='Explore '+name,exact=True)
        trigger.click()
        dialog=page.get_by_role('dialog')
        expect(dialog).to_be_visible()
        expect(dialog.locator('h2')).to_have_text(name)
        expect(dialog.locator('.case-study-block')).to_have_count(3)
        assert page.evaluate('document.body.style.overflow')=='hidden'
        if name=='FindUrWay':
            page.screenshot(path=str(ROOT/'project-dialog.png'))
            close=page.get_by_role('button',name='Close project',exact=True)
            close.focus()
            page.keyboard.press('Shift+Tab')
            assert page.evaluate('document.querySelector("dialog").contains(document.activeElement)')
        page.keyboard.press('Escape')
        expect(page.get_by_role('dialog')).to_have_count(0)
        expect(trigger).to_be_focused()
        assert page.evaluate('document.body.style.overflow')!='hidden'
    page.get_by_role('button',name='Show selected work',exact=True).click()
    expect(page.locator('.project-card')).to_have_count(6)

    tabs=page.get_by_role('tab')
    tabs.nth(0).focus()
    page.keyboard.press('ArrowDown')
    expect(tabs.nth(1)).to_have_attribute('aria-selected','true')
    expect(tabs.nth(1)).to_be_focused()
    expect(page.get_by_role('tabpanel')).to_contain_text('Azure Functions')
    page.keyboard.press('End')
    expect(tabs.nth(2)).to_be_focused()
    expect(page.get_by_role('tabpanel')).to_contain_text('Odoo')
    page.get_by_role('tabpanel').get_by_role('button',name='Maroc Modis LMS',exact=True).click()
    expect(page.get_by_role('dialog')).to_be_visible()
    page.get_by_role('button',name='Close project',exact=True).click()

    downloads=[]
    for anchor in page.locator('.resume-download').all():
        href=anchor.get_attribute('href')
        response=context.request.get(url.rstrip('/')+href if href.startswith('/') else href)
        assert response.ok, f'Failed PDF: {href}'
        assert response.body().startswith(b'%PDF'), f'Invalid PDF: {href}'
        with page.expect_download() as info:
            anchor.click()
        download=info.value
        assert download.suggested_filename.startswith('Saad-Abs-CV')
        assert download.failure() is None
        downloads.append(download.suggested_filename)
    assert len(set(downloads))==4
    assert 'cv_de_saad' not in page.content()
    page.get_by_role('button',name='Copy email address').click()
    expect(page.get_by_role('status')).to_have_text('Email copied')
    assert page.evaluate('navigator.clipboard.readText()')=='hmssaad156@gmail.com'
    assert page.locator('.email-row a').get_attribute('href')=='mailto:hmssaad156@gmail.com'

    widths=[320,360,390,650,768,900,1024,1440,1920]
    for width in widths:
        page.set_viewport_size({'width':width,'height':900})
        page.goto(url,wait_until='networkidle')
        assert page.evaluate('document.documentElement.scrollWidth')<=width, f'Horizontal overflow at {width}'
        assert page.locator('h1').evaluate('(e)=>e.getBoundingClientRect().right')<=width
    page.set_viewport_size({'width':390,'height':844})
    page.goto(url,wait_until='networkidle')
    page.get_by_role('button',name='Open menu',exact=True).click()
    expect(page.get_by_role('navigation')).to_be_visible()
    page.get_by_role('navigation').get_by_role('link',name='CV library',exact=True).click()
    expect(page.get_by_role('button',name='Open menu',exact=True)).to_have_attribute('aria-expanded','false')
    expect(page.get_by_role('navigation')).not_to_be_visible()
    for section in ['hero','projects','skills','about','resumes','contact']:
        page.locator('#'+section).evaluate('(e)=>window.scrollTo(0,e.getBoundingClientRect().top+window.scrollY-90)')
        page.screenshot(path=str(ROOT/f'mobile-{section}-detail.png'))
    page.locator('#projects').scroll_into_view_if_needed()
    page.get_by_role('button',name='Explore FindUrWay',exact=True).click()
    expect(page.get_by_role('dialog')).to_be_visible()
    assert page.get_by_role('dialog').evaluate('(e)=>e.scrollWidth<=e.clientWidth')
    page.screenshot(path=str(ROOT/'mobile-dialog.png'))
    page.keyboard.press('Escape')
    assert not errors, errors
    print(json.dumps({'result':'PASS','projects_opened':len(names),'downloads':downloads,'responsive_widths':widths,'console_errors':errors,'checks':['discipline selector','project filters','14 case study dialogs','Escape and focus restoration','dialog focus containment','expertise keyboard navigation','PDF contents and downloads','clipboard copy','mobile navigation','reduced motion','responsive overflow']},indent=2))
    browser.close()
