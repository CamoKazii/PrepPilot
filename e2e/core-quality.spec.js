import{test,expect}from'@playwright/test';
import AxeBuilder from'@axe-core/playwright';

test.beforeEach(async({page})=>{await page.addInitScript(()=>localStorage.clear());await page.goto('./');await page.waitForLoadState('networkidle')});

test('dashboard has no serious or critical accessibility violations',async({page})=>{const results=await new AxeBuilder({page}).disableRules(['color-contrast']).analyze();const blocking=results.violations.filter(item=>['serious','critical'].includes(item.impact));expect(blocking,blocking.map(item=>`${item.id}: ${item.help}`).join('\n')).toEqual([])});

test('keyboard users can skip to main content',async({page})=>{await page.keyboard.press('Tab');const skip=page.getByRole('link',{name:'Skip to main content'});await expect(skip).toBeFocused();await page.keyboard.press('Enter');await expect(page.locator('#main-content')).toBeFocused()});

test('route changes restore focus to the page heading',async({page})=>{await page.getByRole('link',{name:'Recipes'}).click();await expect(page.getByRole('heading',{level:1,name:/Choose and scale/})).toBeFocused()});

test('mobile layout has no horizontal overflow',async({page,isMobile})=>{test.skip(!isMobile);const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);expect(overflow).toBeLessThanOrEqual(1)});

test('core recipe planner shopping navigation remains available',async({page})=>{await page.getByRole('link',{name:'Recipes'}).click();await expect(page.getByRole('heading',{level:1})).toContainText('Choose and scale');await page.getByRole('link',{name:'Planner'}).click();await expect(page.locator('#main-content h1')).toBeVisible();await page.getByRole('link',{name:'Shopping list'}).click();await expect(page.locator('#main-content')).toBeVisible()});
