/* eslint-disable max-classes-per-file, no-useless-constructor, no-param-reassign, class-methods-use-this */

import { Selector, ClientFunction } from 'testcafe';
import BasePage from './basePage';

class BookCard {
  constructor(private selector: Selector) {}

  get title() {
    return this.selector.find('.book-card__title');
  }

  get author() {
    return this.selector.find('.book-card__author');
  }

  get likeAction() {
    return this.selector.withAttribute('dataTestid', 'like-button');
  }

  get relativeDate() {
    return this.selector.withAttribute('dataTestid', 'relative-date');
  }
}

const removeImagesOnAllCards = ClientFunction(() =>
  (document.querySelectorAll('.book-card') as NodeListOf<HTMLElement>).forEach(c => {
    c.style.backgroundImage = 'none';
    c.style.background = 'green';
  })
);

export default class HomePage extends BasePage {
  constructor(t: TestController, baseUrl: string) {
    super(t, baseUrl, 'home', '.main-layout');
  }

  async getBookCards() {
    const bookCardSelector = await Selector('.book-card');

    return Array.from(
      { length: await bookCardSelector.count },
      (_, idx) => new BookCard(bookCardSelector.nth(idx))
    );
  }

  async prepareForScreenshot() {
    await this.t.resizeWindow(1280, 800);
    await removeImagesOnAllCards();
  }

  get booksContainer() {
    return Selector('.main-layout__books');
  }

  async takeScreenshotOfBooksContainer() {
    await this.prepareForScreenshot();
    await this.t.takeScreenshot();
  }
}
