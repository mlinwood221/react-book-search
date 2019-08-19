/* eslint-disable @typescript-eslint/no-var-requires */
const { server } = require('./server-dist/server.bundle');

server.listen(3001, () => {
  // eslint-disable-next-line no-console
  console.info('Listening at 3001');
});
