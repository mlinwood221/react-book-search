/* eslint-disable no-param-reassign */
import BookDetailPage from '../pages/bookDetail';

let bookDetailPage: BookDetailPage;

declare const global: {
  baseUrl: string;
};

fixture('Book detail route').beforeEach(async t => {
  bookDetailPage = new BookDetailPage(t, global.baseUrl);
});

test('book detail elements are visible', async t => {
  await bookDetailPage.open();
  await t.expect(bookDetailPage.img.visible).ok();
  await t.expect(bookDetailPage.status.visible).ok();
  await t.expect(bookDetailPage.description.visible).ok();
  await t.expect(bookDetailPage.footer.visible).ok();
  await bookDetailPage.takeScreenshot();
});

let logger: RequestLogger;

fixture('SSR Book detail route').beforeEach(async t => {
  bookDetailPage = new BookDetailPage(t, global.baseUrl);
  logger = await bookDetailPage.startLoggingServerResponses();
  await bookDetailPage.open();
});

test('server response returns redux state', async t => {
  await t
    .expect(
      logger.contains(
        record =>
          typeof record.response.body === 'string' &&
          /window.__PRELOADED_STATE__\s*=\s*\{.+"details":\{.+\}.+\}/.test(
            record.response.body
          )
      )
    )
    .ok();
});

test('server response returns pre-rendered HTML', async t => {
  await Promise.all(
    [
      /<article class="book-detail">.+?<\/article>/,
      /<img class="book-detail__image"/,
      /<div class="book-detail__status">.+?<\/div>/,
      /<div class="book-detail__description">.+?<\/div>/,
      /<footer class="book-detail__footer">.+?<\/footer>/
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
});

test('browser does not request route bundle', async t => {
  await t
    .expect(
      logger.contains(record => /\/details\..{20}\.bundle\.js/.test(record.request.url))
    )
    .notOk();
});
