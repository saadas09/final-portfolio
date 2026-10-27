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
    page.evaluate('document.fonts.ready')
    expect(page).to_have_title('Saad Abs — AI, Data & Software Engineering')
    expect(page.locator('html')).to_have_attribute('data-motion','off')
    expect(page.locator('.feature-card')).to_have_count(4)
    expect(page.locator('.sculpture')).to_have_class('sculpture is-ready',timeout=20000)
    sculpture=page.locator('.sculpture-canvas')
    initial=sculpture.screenshot()
    sculpture.focus()
    page.keyboard.press('ArrowRight')
    page.wait_for_timeout(150)
    assert sculpture.screenshot()!=initial, 'Keyboard rotation did not change the sculpture'
    for i,label in enumerate(['CONNECTION','CREATION','INTELLIGENCE']):
        page.locator('.hero-modes button').nth([1,2,0][i]).click()
        expect(page.locator('.sculpture-caption')).to_contain_text(label)
    for trigger in page.locator('.project-open').all():
        trigger.click()
        expect(page.get_by_role('dialog')).to_be_visible()
        page.keyboard.press('Escape')
        expect(trigger).to_be_focused()
    page.get_by_role('button',name='Explore all 14 projects',exact=True).click()
    expect(page.locator('.index-row')).to_have_count(14)
    page.get_by_role('button',name='Data & Cloud',exact=True).click()
    expect(page.locator('.index-row')).to_have_count(3)
    page.get_by_role('button',name='AI & ML',exact=True).click()
    expect(page.locator('.index-row')).to_have_count(6)
    page.get_by_role('button',name='All work',exact=True).click()
    names=page.locator('.index-row').evaluate_all('(els)=>els.map(e=>e.getAttribute("aria-label").replace(/^Read /,""))')
    for name in names:
        trigger=page.get_by_role('button',name='Read '+name,exact=True)
        trigger.click()
        dialog=page.get_by_role('dialog')
        expect(dialog).to_be_visible()
        expect(dialog.locator('h2')).to_have_text(name)
        expect(dialog.locator('.case-study-block')).to_have_count(3)
        assert page.evaluate('document.body.style.overflow')=='hidden'
        assert dialog.evaluate('(e)=>e.scrollWidth<=e.clientWidth'),name
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
    page.get_by_role('button',name='Close index',exact=True).click()
    expect(page.locator('#index-content')).not_to_be_visible()
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
    expect(page.locator('.copy-status')).to_have_text('Email copied')
    assert page.evaluate('navigator.clipboard.readText()')=='hmssaad156@gmail.com'
    assert page.locator('.email-row a').get_attribute('href')=='mailto:hmssaad156@gmail.com'
    widths=[320,360,390,650,768,900,1024,1440,1920]
    for width in widths:
        page.set_viewport_size({'width':width,'height':900})
        page.evaluate('window.scrollTo({top:0,behavior:"instant"})')
        page.wait_for_timeout(120)
        assert page.evaluate('document.documentElement.scrollWidth')<=width, f'Horizontal overflow at {width}'
        for name in page.locator('.hero-name>span').all():
            assert name.evaluate('(e)=>e.getBoundingClientRect().right')<=width+.5, f'Clipped name at {width}'
        for heading in page.locator('h2,h3').all():
            if heading.is_visible():
                assert heading.evaluate('(e)=>e.scrollWidth<=e.clientWidth+2'), f'Heading overflow at {width}: {heading.inner_text()}'
    page.set_viewport_size({'width':390,'height':844})
    page.goto(url,wait_until='networkidle')
    page.get_by_role('button',name='Open menu',exact=True).click()
    expect(page.get_by_role('navigation')).to_be_visible()
    page.get_by_role('navigation').locator('a[href="#resumes"]').click()
    expect(page.get_by_role('button',name='Open menu',exact=True)).to_have_attribute('aria-expanded','false')
    expect(page.get_by_role('navigation')).not_to_be_visible()
    for section in ['hero','projects','skills','about','resumes','contact']:
        page.locator('#'+section).evaluate('(e)=>window.scrollTo({top:e.getBoundingClientRect().top+window.scrollY-90,behavior:"instant"})')
        page.screenshot(path=str(ROOT/f'mobile-{section}-detail.png'))
    page.get_by_role('button',name='Explore FindUrWay',exact=True).click()
    expect(page.get_by_role('dialog')).to_be_visible()
    assert page.get_by_role('dialog').evaluate('(e)=>e.scrollWidth<=e.clientWidth')
    page.screenshot(path=str(ROOT/'mobile-dialog.png'))
    page.keyboard.press('Escape')
    # Exercise the animated layout as well as the reduced-motion layout.
    page.set_viewport_size({'width':1440,'height':1000})
    page.emulate_media(reduced_motion='no-preference')
    page.goto(url,wait_until='networkidle')
    expect(page.locator('html')).to_have_attribute('data-motion','on')
    page.wait_for_timeout(2000)
    page.screenshot(path=str(ROOT/'desktop-hero-final.png'))
    for trigger in page.locator('.project-open').all():
        trigger.click(timeout=10000)
        expect(page.get_by_role('dialog')).to_be_visible()
        page.keyboard.press('Escape')
    page.get_by_role('button',name='Explore all 14 projects',exact=True).click()
    page.locator('#skills').evaluate('(e)=>window.scrollTo({top:e.getBoundingClientRect().top+window.scrollY-110,behavior:"instant"})')
    page.wait_for_timeout(1500)
    assert float(page.locator('#skills [data-reveal]').evaluate('(e)=>getComputedStyle(e).opacity'))>.99
    page.get_by_role('button',name='Pause animations',exact=True).click()
    expect(page.locator('html')).to_have_attribute('data-motion','off')
    assert page.locator('.feature-card').first.evaluate('(e)=>getComputedStyle(e).position')=='relative'
    assert page.locator('.manifesto-star').evaluate('(e)=>getComputedStyle(e).animationPlayState')=='paused'
    # WebGL failure retains an illustration and all portfolio content.
    fallback=context.new_page()
    fallback.add_init_script('''const getContext=HTMLCanvasElement.prototype.getContext; HTMLCanvasElement.prototype.getContext=function(type,...args){if(type.includes('webgl'))return null;return getContext.call(this,type,...args);};''')
    fallback.goto(url,wait_until='networkidle')
    expect(fallback.locator('.sculpture-fallback')).to_be_visible()
    expect(fallback.locator('.sculpture')).not_to_have_class('sculpture is-ready')
    expect(fallback.locator('.resume-download')).to_have_count(4)
    assert not errors,errors
    result={'result':'PASS','projects_opened':len(names),'downloads':downloads,'responsive_widths':widths,'console_errors':errors,'checks':['3D keyboard rotation and modes','four featured projects','project filters','14 case study dialogs','Escape and focus restoration','dialog focus containment','expertise keyboard navigation','PDF contents and downloads','clipboard copy','mobile navigation','reduced motion and pause control','animated stacking and dynamic layout refresh','responsive text and overflow','WebGL fallback']}
    (ROOT/'verification-result.json').write_text(json.dumps(result,indent=2))
    print(json.dumps(result,indent=2))
    browser.close()
