import { ApiTwoPage } from './app.po';

describe('api-two App', () => {
  let page: ApiTwoPage;

  beforeEach(() => {
    page = new ApiTwoPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
