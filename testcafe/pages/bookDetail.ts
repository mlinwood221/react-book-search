/* eslint-disable max-classes-per-file, no-useless-constructor, no-param-reassign, class-methods-use-this */

import { Selector, ClientFunction } from 'testcafe';
import BasePage from './basePage';

const removeImage = ClientFunction(() => {
  ([
    document.querySelector('.book-detail__image'),
    document.querySelector('.book-detail__author-img')
  ] as HTMLImageElement[]).forEach(img => {
    img.src = '';
    img.style.background = 'green';
  });
});

export default class BookDetailPage extends BasePage {
  constructor(t: TestController, baseUrl: string) {
    super(t, baseUrl, 'book/b508538873', '.book-detail');
  }

  async prepareForScreenshot() {
    await this.t.resizeWindow(1280, 800);
    await removeImage();
  }

  get img() {
    return Selector('.book-detail__image');
  }

  get status() {
    return Selector('.book-detail__status');
  }

  get description() {
    return Selector('.book-detail__description');
  }

  get footer() {
    return Selector('.book-detail__footer');
  }

  async takeScreenshot() {
    await this.prepareForScreenshot();
    await this.t.takeScreenshot();
  }
}
