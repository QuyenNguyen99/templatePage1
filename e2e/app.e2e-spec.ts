import { Template1Page } from './app.po';

describe('template1 App', function() {
  let page: Template1Page;

  beforeEach(() => {
    page = new Template1Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
