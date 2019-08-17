import Router from 'koa-router';
import * as dataMock from './data-mock';

const apiRouter = new Router({
  prefix: '/api'
});

apiRouter.get('/books', ctx => {
  const result = dataMock.getPagedBooksSearch({
    page: ctx.query.page ? parseInt(ctx.query.page, 10) : 1,
    category: Array.isArray(ctx.query.category)
      ? ctx.query.category[0]
      : ctx.query.category,
    genre: Array.isArray(ctx.query.genre) ? ctx.query.genre[0] : ctx.query.genre,
    query: Array.isArray(ctx.query.query) ? ctx.query.query[0] : ctx.query.query
  });

  ctx.set('X-total-count', result.totalPages.toString());
  ctx.body = result.books;
});

apiRouter.param('bookId', (id, ctx, next) => {
  const result = dataMock.getBookById(id);
  ctx.book = result;
  return next();
});

apiRouter.get('/books/:bookId', ctx => {
  ctx.body = ctx.book;
});

apiRouter.patch('/books/:bookId', ctx => {
  ctx.book.liked = ctx.request.body.liked;
  ctx.book.likes += ctx.request.body.liked ? 1 : -1;
  ctx.body = ctx.book;
});

apiRouter.get('/searchCategories', ctx => {
  ctx.body = dataMock.bookCategories;
});

apiRouter.get('/searchGenres', ctx => {
  ctx.body = dataMock.bookGenres;
});

export default apiRouter;
