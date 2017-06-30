import { BooksClientPage } from './app.po';

describe('books-client App', function() {
  let page: BooksClientPage;

  beforeEach(() => {
    page = new BooksClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
