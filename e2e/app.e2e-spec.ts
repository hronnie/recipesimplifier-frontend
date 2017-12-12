import { FreemarketFrontendPage } from './app.po';

describe('freemarket-frontend App', () => {
  let page: FreemarketFrontendPage;

  beforeEach(() => {
    page = new FreemarketFrontendPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
