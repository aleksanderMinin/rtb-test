import { AppPage } from './app.po';
import {} from 'jasmine';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo().then((result: string) => {
      expect(result).toEqual("Welcome to rtb-test!");
    });
  });
});
