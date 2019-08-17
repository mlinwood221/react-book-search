/* eslint-disable @typescript-eslint/no-var-requires, import/no-extraneous-dependencies, no-console */
const createTestCafe = require('testcafe');
const utils = require('./utils');
const compareScreenshots = require('./compare-imgs');
const app = require('../server-dist/server.bundle');

const port = 3001;
const addr = 'localhost';
const isBaseScreenshot = process.argv.slice(2).includes('--base-screenshots');
const isLive = process.argv.slice(2).includes('--live');
let testcafe = null;

// Disable gzip compression, so TestCafe's RequestLogger works properly
app.use(ctx => {
  ctx.compress = false;
});
const server = app.listen(port, addr, () => {
  global.baseUrl = `http://${addr}:${port}`;

  createTestCafe()
    .then(tc => {
      testcafe = tc;

      const runner = isLive ? testcafe.createLiveModeRunner() : testcafe.createRunner();
      return runner
        .src(['testcafe/tests/*.ts'])
        .browsers(['chrome:headless'])
        .screenshots(
          utils.getScreenshotsPath(isBaseScreenshot),
          true,
          '${BROWSER}/${FIXTURE}-${TEST}-${FILE_INDEX}' // eslint-disable-line
        )
        .run();
    })
    .then(failedCount => {
      console.log(`Tests failed: ${failedCount}`);
      if (failedCount === 0 && !isBaseScreenshot && !isLive) return compareScreenshots();
      return undefined;
    })
    .then(() => {
      testcafe.close();
      server.close();
    })
    .catch(ex => {
      console.error('Error:', ex.message);
      testcafe.close();
      server.close();
      process.exit(1);
    });
});
