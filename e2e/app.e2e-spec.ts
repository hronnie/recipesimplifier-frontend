import { RecipesimplifierFrontendPage } from './app.po';

describe('recipesimplifier-frontend App', () => {
  let page: RecipesimplifierFrontendPage;

  beforeEach(() => {
    page = new RecipesimplifierFrontendPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
