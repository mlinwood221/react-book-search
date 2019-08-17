import Koa from 'koa';
import fs from 'fs';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter, StaticRouterContext } from 'react-router';
import { matchPath } from 'react-router-dom';
import { Store } from 'redux';
import { promisify } from 'util';
import { XMLHttpRequest } from 'xmlhttprequest';
import sprite from 'svg-sprite-loader/runtime/sprite.build';
import { RouteModuleInfo } from '../routes/types';
import App from '../App';
import { appendReducerServer } from '../redux/append-reducer';
import configureEpic from '../redux/combined-epics';
import createReduxStore from '../redux/store';
import getRoutes from '../routes';

// Add XMLHttpRequest support on the server
declare const global: {
  XMLHttpRequest: unknown;
};
global.XMLHttpRequest = XMLHttpRequest;

function parseDistFolder() {
  return JSON.parse(
    fs.readFileSync(path.join(__dirname, '../dist/manifest.json'), 'utf8')
  );
}

const distFiles = parseDistFolder();

async function renderFullPage(
  html: string,
  preloadedState: {},
  asyncChunksScriptTags: string
) {
  // See the following for security issues around embedding JSON in HTML:
  // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
  const preloadedStateScript = `<script>
    window.__PRELOADED_STATE__ = 
    ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
  </script>`;

  const data = await promisify(fs.readFile)(
    path.join(__dirname, '../dist/index.html'),
    'utf8'
  );
  return data.replace(
    '<div id="app"></div>',
    `${sprite.stringify()}
    <div id="app">${html}</div>${preloadedStateScript}${asyncChunksScriptTags}`
  );
}

async function getAsyncChunksScriptTags(loadedChunkNames: string[]) {
  const fileContents = await Promise.all(
    loadedChunkNames
      .map(chunkName => distFiles[`${chunkName}.js`])
      .map(fileName =>
        promisify(fs.readFile)(path.join(__dirname, `../dist/${fileName}`), 'utf8')
      )
  );
  return fileContents.map(content => `<script>${content}</script>`).join('');
}

async function renderPageWithReduxStateAndInlineScripts(
  state: {},
  loadedChunkNames: string[],
  renderedHtml: string
) {
  // Write initial async chuncks
  const asyncChunksScriptTags = await getAsyncChunksScriptTags(loadedChunkNames);
  return renderFullPage(renderedHtml, state, asyncChunksScriptTags);
}

function renderApp(
  store,
  url: string,
  reactRouterStaticContext: {},
  loadedChunkNames: string[]
) {
  return renderToString(
    <Provider store={store}>
      <StaticRouter location={url} context={reactRouterStaticContext}>
        <App loadedChunkNames={loadedChunkNames} />
      </StaticRouter>
    </Provider>
  );
}

function waitForInitialData(
  store: Store,
  url: string,
  reactRouterStaticContext: {},
  loadedChunkNames: string[]
): Promise<string> {
  return new Promise(resolve => {
    let unsubscribe: () => void;
    function handleStoreChange() {
      if (store.getState().ssr && store.getState().ssr.ready) {
        resolve(renderApp(store, url, reactRouterStaticContext, loadedChunkNames));
        unsubscribe();
      }
    }
    unsubscribe = store.subscribe(handleStoreChange);
  });
}

export default async function handleRender(
  ctx: Koa.Context,
  next: () => Promise<unknown>
) {
  const epicConfig = configureEpic();
  const store = createReduxStore(epicConfig.rootEpic);
  const loadedChunkNames: string[] = [];
  const appendAsyncReducer = (newModuleInfo: RouteModuleInfo) => {
    appendReducerServer(store, newModuleInfo);
  };

  const routeMatch = getRoutes(
    loadedChunkNames,
    appendAsyncReducer,
    epicConfig.epicSubject$
  )
    .map(route => ({
      ...route,
      reactRouterMatch: matchPath(ctx.request.path, route)
    }))
    .find(r => !!r.reactRouterMatch);

  const reactRouterStaticContext: StaticRouterContext = {};

  if (routeMatch && routeMatch.loadSSRData)
    routeMatch.loadSSRData(
      store.dispatch,
      routeMatch.reactRouterMatch ? routeMatch.reactRouterMatch.params : null
    );

  const renderedHtml = routeMatch
    ? await waitForInitialData(
      store,
      ctx.request.url,
      reactRouterStaticContext,
      loadedChunkNames
    )
    : renderApp(store, ctx.request.url, reactRouterStaticContext, loadedChunkNames);

  const renderedPage = await renderPageWithReduxStateAndInlineScripts(
    store.getState(),
    loadedChunkNames,
    renderedHtml
  );

  if (reactRouterStaticContext.url) ctx.response.redirect(reactRouterStaticContext.url);
  else ctx.body = renderedPage;
  await next();
}
