/* eslint-disable @typescript-eslint/no-var-requires */
const app = require('./server-dist/server.bundle');

const port = 3001;
const addr = '0.0.0.0';

app.listen(port, addr, () => {
  console.info(`Listening at http://${addr}:${port}`);
});
