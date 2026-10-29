from pathlib import Path
from playwright.sync_api import sync_playwright, expect
import json
import sys

url = sys.argv[1] if len(sys.argv) > 1 else 'http://127.0.0.1:4173/'
output = Path(__file__).resolve().parent.parent / '.qa'
output.mkdir(exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(channel='chrome', headless=True)
    page = browser.new_page(viewport={'width': 1440, 'height': 1000})
    errors = []
    page.on('pageerror', lambda error: errors.append(str(error)))
    page.add_init_script('''
      window.webglDraws = 0;
      for (const kind of [WebGLRenderingContext, WebGL2RenderingContext]) {
        for (const method of ['drawElements', 'drawArrays']) {
          const original = kind.prototype[method];
          kind.prototype[method] = function(...args) {
            window.webglDraws++;
            return original.apply(this, args);
          };
        }
      }
    ''')
    requests = []
    page.on('request', lambda request: requests.append(request.url))
    page.goto(url, wait_until='domcontentloaded', timeout=90000)
    assert not any('fonts.googleapis.com' in request or 'fonts.gstatic.com' in request for request in requests)
    assert any('/fonts/' in request and '.woff2' in request for request in requests)
    expect(page.locator('.sculpture')).to_have_class('sculpture is-ready', timeout=90000)
    assert not any('ProjectDialogContent-' in request for request in requests)
    assert page.locator('#about').evaluate('(e)=>e.compareDocumentPosition(document.querySelector("#projects")) & Node.DOCUMENT_POSITION_FOLLOWING')
    expect(page.locator('#about')).to_contain_text('final-year engineering student')
    expect(page.locator('.feature-credit')).to_have_count(4)

    page.locator('#about').scroll_into_view_if_needed()
    page.wait_for_timeout(500)
    before = page.evaluate('window.webglDraws')
    page.wait_for_timeout(500)
    assert page.evaluate('window.webglDraws') == before, 'Offscreen WebGL kept rendering'
    page.screenshot(path=str(output / 'personal-profile-desktop.png'))
    page.locator('#experience').scroll_into_view_if_needed()
    page.wait_for_timeout(1000)
    page.screenshot(path=str(output / 'experience-desktop.png'))
    for index, title in enumerate(['Maroc Modis LMS', 'SavoirExpert Document Tracking']):
        page.locator('.journey-description button').nth(index).click()
        expect(page.get_by_role('dialog')).to_be_visible()
        if index == 0:
            expect(page.get_by_role('dialog').locator('h2')).to_have_text(title)
        else:
            expect(page.get_by_role('dialog').locator('h2')).to_contain_text('SavoirExpert')
        page.keyboard.press('Escape')
    assert any('ProjectDialogContent-' in request for request in requests)

    page.evaluate('scrollTo({top:0,behavior:"instant"})')
    page.wait_for_timeout(400)
    before = page.evaluate('window.webglDraws')
    page.wait_for_timeout(400)
    assert page.evaluate('window.webglDraws') > before, 'WebGL failed to resume'
    page.get_by_role('button', name='Pause animations', exact=True).click()
    page.wait_for_timeout(200)
    before = page.evaluate('window.webglDraws')
    page.wait_for_timeout(400)
    assert page.evaluate('window.webglDraws') == before, 'Paused WebGL kept rendering'
    page.locator('.sculpture-canvas').focus()
    page.keyboard.press('ArrowRight')
    page.wait_for_timeout(200)
    assert page.evaluate('window.webglDraws') > before, 'Paused keyboard interaction did not render'

    for width in [320, 390, 768, 1024, 1440, 1920]:
        page.set_viewport_size({'width': width, 'height': 900})
        page.wait_for_timeout(250)
        assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), width
        page.locator('#about').scroll_into_view_if_needed()
        page.screenshot(path=str(output / f'personal-profile-{width}.png'))
    assert not errors, errors

    saver = browser.new_page(viewport={'width': 390, 'height': 844}, is_mobile=True, has_touch=True)
    saver.add_init_script('Object.defineProperty(navigator, "connection", {value:{saveData:true,effectiveType:"4g"},configurable:true})')
    saver_requests = []
    saver.on('request', lambda request: saver_requests.append(request.url))
    saver.goto(url, wait_until='domcontentloaded', timeout=90000)
    saver.wait_for_timeout(2000)
    assert not any('three.module' in request for request in saver_requests)
    expect(saver.locator('.sculpture-fallback')).to_be_visible()
    saver.get_by_role('button', name='Discover Moroccan Darija OCR', exact=True).click()
    expect(saver.get_by_role('dialog')).to_be_visible()
    print(json.dumps({'result': 'PASS', 'checks': ['personal context before work', 'experience project links',
        'six responsive widths', 'local fonts', 'deferred project details', 'no offscreen or paused WebGL drawing',
        '3D resumes and keyboard works', 'data saver skips 3D download and retains projects'], 'errors': errors}))
    browser.close()
