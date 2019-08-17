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
  await homePage.takeScreenshot();
});

let logger: RequestLogger;

fixture('SSR Home route').beforeEach(async t => {
  homePage = new HomePage(t, global.baseUrl);
  logger = await homePage.startLoggingServerResponses();
  await homePage.open();
});

test('server response returns redux state', async t => {
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

test('server response returns pre-rendered HTML', async t => {
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

test('browser does not request route bundle', async t => {
  await t
    .expect(logger.contains(record => /\/home\..{20}\.bundle\.js/.test(record.request.url)))
    .notOk();
});
