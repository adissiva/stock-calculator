import path from 'path';
import url from 'url';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import { fileURLToPath } from 'url';
import fs from 'fs';

function createWebpackMiddleware(compiler, publicPath) {
  return webpackDevMiddleware(compiler, {
    publicPath,
    stats: 'errors-only'
  });
}

export default async function addDevMiddlewares(app, webpackConfig) {
  const compiler = webpack(webpackConfig);
  const middleware = createWebpackMiddleware(
    compiler,
    webpackConfig.output.publicPath
  );

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));

  //const fs = middleware.fileSystem;

  // Dynamically import the mock API setup
  try {
    const { addMockAPI } = await import('../../internals/mock-server/index.js');
    const constantsPath = path.resolve(
      process.cwd(),
      `app/common/services/http/constants.${process.env.SERVER_ENV}.js`
    );
    const fileUrl = new URL(`file://${constantsPath}`).href;
    await addMockAPI(app, fileUrl);
  } catch (err) {
    console.warn('Could not load mock API:', err.message);
  }

  app.get('*', (req, res) => {
    const filename =
      url.parse(req.url).pathname === `${process.env.APP_CONTEXT}landing`
        ? 'landing'
        : 'index';
    fs.readFile(
      path.join(compiler.outputPath, `${filename}.html`),
      (err, file) => {
        if (err) {
          res.sendStatus(404);
        } else {
          res.send(file.toString());
        }
      }
    );
  });
}
