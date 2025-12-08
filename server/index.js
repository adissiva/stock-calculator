import express from 'express';
import logger from './logger.js';
import argv from './argv.js';
import port from './port.js';
import setup from './middlewares/frontendMiddleware.js';
import { resolve } from 'path';

const isDev = process.env.NODE_ENV !== 'production';

async function startServer() {
  const app = express();

  // If you need a backend, e.g. an API, add your custom backend-specific middleware here
  // app.use('/api', myApi);
  // In production we need to pass these values in instead of relying on webpack
  await setup(app, {
    outputPath: resolve(process.cwd(), 'build'),
    publicPath: '/',
  });

  // Start your app.
  app.listen(port, (err) => {
    if (err) {
      return logger.error(err.message);
    }
    // Connect to ngrok in dev mode
    if (isDev && process.env.ENABLE_TUNNEL) {
      (async () => {
        try {
          const ngrok = (await import('ngrok')).default;
          const url = await ngrok.connect(port);
          logger.info(`API is exposed at ${url}`);
        } catch (err) {
          logger.error(`Ngrok connection failed: ${err.message}`);
        }
      })();
    } else {
      logger.info(`API is running on http://localhost:${port}`);
    }
  });
}

startServer().catch((err) => {
  logger.error(`Failed to start server: ${err.message}`);
  process.exit(1);
});
