import { AppPage } from './app.po';
import { by, element, browser, ExpectedConditions as EC, protractor } from 'protractor';
import {} from 'jasmine';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display header', async () => {
    await page.navigateTo();
    const headerText = await element(by.css('h2')).getText();
    expect(headerText).toEqual("Share Board name with other");
  });

  it('should add block by button "Add email"', async () => {
    await page.navigateTo();
    await element(by.buttonText('Add email')).click();
    const eBlocks = await element.all(by.css('email-block'));
    const count = eBlocks.length;
    expect(count).toEqual(2);
  });

  it('should add delete default block', async () => {
    await page.navigateTo();
    await element(by.css('.icon-x')).click();
    const eBlocks = await element.all(by.css('email-block'));
    const count = eBlocks.length;
    expect(count).toBe(0);
  });

  it('check add valid/invalid emails', async () => {
    await page.navigateTo();
    // delete default block
    await element(by.css('.icon-x')).click();

    element.all(by.css('email-block')).then(blocks => {
      expect(blocks.length).toBe(0);
    });

    element(by.css('textarea')).sendKeys('a, a@b.cd, d;').then(() => {
      element.all(by.css('email-block')).then(blocks => {
        expect(blocks.length).toBe(3);
      });
      element.all(by.css('.invalid-block')).then(blocks => {
        expect(blocks.length).toBe(2);
      });
      element.all(by.css('email-block:not(.invalid-block)')).then(blocks => {
        expect(blocks.length).toBe(1);
      });
    });
  });

  it('should not add double block', async () => {
    await page.navigateTo();
    // delete default block
    await element(by.css('.icon-x')).click();
    await element(by.css('textarea')).sendKeys('a, a;');
    const blocks = await element.all(by.css('email-block'));
    expect(blocks.length).toBe(1);
  });

  it('should not add empty block', async () => {
    await page.navigateTo();
    // delete default block
    await element(by.css('.icon-x')).click();
    await element(by.css('textarea')).sendKeys('a,, ,   ,;,  ;,,;');
    const blocks = await element.all(by.css('email-block'));
    expect(blocks.length).toBe(1);
  });

  it('should add block by focusout', async () => {
    await page.navigateTo();
    await element(by.css('textarea')).sendKeys('testMail');
    await element(by.css('h2')).click();
    const blocks = await element.all(by.css('email-block'));
    expect(blocks.length).toBe(2);
  });

  it('should add block by enter', async () => {
    await page.navigateTo();
    await element(by.css('textarea')).sendKeys('testMail');
    await browser.actions().sendKeys(protractor.Key.ENTER).perform();
    const blocks = await element.all(by.css('email-block'));
    expect(blocks.length).toBe(2);
  });

  it('should get mails count', async () => {
    await page.navigateTo();
    await element(by.buttonText('Get email count')).click();
    await browser.wait(EC.alertIsPresent(), 1000);
    await expect(true).toBeTruthy();
  });
});
