/* eslint-disable global-require */

import addProdMiddlewares from './addProdMiddlewares.js';
import addDevMiddlewares from './addDevMiddlewares.js';

/** frontend middleware */
export default async (app, options) => {
  const isProduction = process.env.NODE_ENV === 'production';

  if (isProduction) {
    addProdMiddlewares(app, options);
  } else {
    const { default: webpackConfig } =
      await import('../../internals/webpack/webpack.local.js');
    addDevMiddlewares(app, webpackConfig);
  }
  return app;
};
