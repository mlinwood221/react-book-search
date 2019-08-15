/* eslint-disable no-param-reassign */
import HomePage from '../pages/home';

let homePage: HomePage;

declare const global: {
  baseUrl: string;
};

fixture('Home route').beforeEach(async t => {
  homePage = new HomePage(t, global.baseUrl);
});

test('book cards are visible', async t => {
  await homePage.open();
  const bookCards = await homePage.getBookCards();
  await t.expect(bookCards.length).eql(10);
  await homePage.takeScreenshotOfBooksContainer();
});

test('SSR home route, returns redux state', async t => {
  const logger = await homePage.startLoggingServerResponses();
  await homePage.open();

  await t
    .expect(
      logger.contains(
        record =>
          typeof record.response.body === 'string' &&
          new RegExp(
            `window.__PRELOADED_STATE__\\s*=\\s*\\{.+"${
              homePage.relativeUrl
            }":\\{.+\\}.+\\}`
          ).test(record.response.body)
      )
    )
    .ok();
});

test('SSR home route, returns pre-rendered HTML', async t => {
  const logger = await homePage.startLoggingServerResponses();
  await homePage.open();

  await Promise.all(
    [
      /<div id="app"><div>.+?<\/div><\/div>/,
      /<div class="main-layout__books">.+?<\/div>/
    ].map(async searchPattern =>
      t
        .expect(
          logger.contains(
            record =>
              typeof record.response.body === 'string' &&
              searchPattern.test(record.response.body)
          )
        )
        .ok()
    )
  );

  await t
    .expect(
      logger.contains(
        record =>
          typeof record.response.body === 'string' &&
          record.response.body.match(/<div class="book-card" style=".+?">.+?<\/div>/g)
            .length === 10
      )
    )
    .ok();
});
