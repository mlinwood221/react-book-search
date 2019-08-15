/* eslint-disable no-useless-constructor */

import { Selector, RequestLogger } from 'testcafe';

export default class BasePage {
  constructor(
    protected t: TestController,
    private baseUrl: string,
    public relativeUrl: string,
    private mainCssSelector: string
  ) {}

  async open() {
    await this.t.navigateTo(`${this.baseUrl}/${this.relativeUrl}`);
    await Selector(this.mainCssSelector)();
  }

  async startLoggingServerResponses() {
    const logger = RequestLogger(null, {
      logResponseBody: true,
      stringifyResponseBody: true
    });
    await this.t.addRequestHooks(logger);
    return logger;
  }
}
