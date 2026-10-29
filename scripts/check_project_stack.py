from pathlib import Path
from playwright.sync_api import sync_playwright, expect
import json
import sys

url = sys.argv[1] if len(sys.argv) > 1 else 'http://127.0.0.1:5173/'
output = Path(__file__).resolve().parent.parent / '.qa'
output.mkdir(exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(channel='chrome', headless=True)
    page = browser.new_page(viewport={'width': 1440, 'height': 900}, reduced_motion='no-preference')
    errors = []
    page.on('pageerror', lambda error: errors.append(str(error)))
    page.goto(url, wait_until='networkidle')
    page.evaluate('document.fonts.ready')
    cards = page.locator('.art-gallery .feature-card')
    anchors = page.locator('.stack-anchor')

    def scroll_to_card(index):
        position = anchors.nth(index).evaluate('(e) => e.getBoundingClientRect().top + scrollY')
        top = cards.nth(index).evaluate('(e) => parseFloat(getComputedStyle(e).top)')
        page.evaluate('(y) => scrollTo({top:y,behavior:"instant"})', position - top)
        page.wait_for_timeout(200)

    def assert_control_visible(control):
        assert control.evaluate('''(e) => {
            const r=e.getBoundingClientRect();
            return r.top >= 0 && r.bottom <= innerHeight + 1 &&
                e.contains(document.elementFromPoint(r.x+r.width/2,r.y+r.height/2));
        }''')

    for width, height in [(1440, 900), (390, 844), (320, 568), (844, 390), (768, 1024)]:
        page.set_viewport_size({'width': width, 'height': height})
        page.wait_for_timeout(400)
        assert page.evaluate('document.documentElement.scrollWidth <= innerWidth')
        for index in range(4):
            scroll_to_card(index)
            card = cards.nth(index)
            assert card.evaluate('(e) => getComputedStyle(e).position') == 'sticky'
            control = card.locator('.project-open')
            assert_control_visible(control)
            control.click()
            expect(page.get_by_role('dialog')).to_be_visible()
            page.keyboard.press('Escape')
            expect(control).to_be_focused()
            page.screenshot(path=str(output / f'stack-{width}-{index}.png')) if index == 1 else None
        # Reverse scroll restores the first card and its usable controls.
        scroll_to_card(0)
        assert_control_visible(cards.first.locator('.project-open'))
        assert cards.first.locator('.feature-surface').evaluate(
            '(e) => new DOMMatrix(getComputedStyle(e).transform).a') > 0.999
        first_top = cards.first.bounding_box()['y']
        next_y = anchors.nth(1).evaluate('(e) => e.getBoundingClientRect().top + scrollY')
        start = min(height * 0.85, first_top + cards.first.bounding_box()['height'] * 0.85)
        page.evaluate('(y) => scrollTo({top:y,behavior:"instant"})', next_y - (start + first_top) / 2)
        page.wait_for_timeout(200)
        assert abs(cards.first.bounding_box()['y'] - first_top) < 2
        scale = cards.first.locator('.feature-surface').evaluate(
            '(e) => new DOMMatrix(getComputedStyle(e).transform).a')
        assert 0.95 < scale < 0.999, scale
        page.screenshot(path=str(output / f'stack-{width}-transition.png'))
        scroll_to_card(3)
        page.keyboard.press('Tab')
        for selector in ['.art-bookmark', '.project-open']:
            control = cards.first.locator(selector)
            control.focus()
            page.wait_for_timeout(200)
            assert_control_visible(control)

    # A covered card must become visible when reached using the keyboard.
    scroll_to_card(3)
    page.keyboard.press('Tab')
    cards.first.locator('.project-open').focus()
    page.wait_for_timeout(200)
    assert_control_visible(cards.first.locator('.project-open'))

    page.emulate_media(reduced_motion='reduce')
    page.wait_for_timeout(200)
    for card in cards.all():
        assert card.evaluate('(e) => getComputedStyle(e).position') == 'relative'
        assert card.locator('.feature-surface').evaluate('(e) => getComputedStyle(e).transform') == 'none'
    page.emulate_media(reduced_motion='no-preference')
    page.wait_for_timeout(200)
    scroll_to_card(1)
    assert_control_visible(cards.nth(1).locator('.project-open'))
    page.locator('.index-toggle').click()
    expect(page.locator('.index-row')).to_have_count(14)
    assert not errors, errors
    print(json.dumps({'result': 'PASS', 'checks': ['five viewport sizes', 'four stacked projects',
        'forward and reverse transitions', 'dialog controls and focus return', 'covered card keyboard access',
        'reduced motion and re-enable', 'full project index'], 'errors': errors}))
    browser.close()
