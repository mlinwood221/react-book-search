import Koa from 'koa';
import serve from 'koa-static';
import compress from 'koa-compress';
import bodyParser from 'koa-bodyparser';
import api from './api';
import ssr from './ssr';

const app = new Koa();

// Serve static files
app
  .use(
    serve('dist', {
      index: false
    })
  )
  .use(compress())
  .use(bodyParser());

app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
  ctx.set('Access-Control-Allow-Headers', 'content-type');
  ctx.set('access-control-expose-headers', 'x-total-count');
  await next();
});

app.use(api.routes()).use(api.allowedMethods());

// This is fired every time the server side receives a request
app.use(ssr);

export default app;
