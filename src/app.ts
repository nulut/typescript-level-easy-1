import * as express from 'express';
import config from './config';
import Logger from './loaders/logger';

async function startServer() {
  const app: express.Application = express();

  await require('./loaders').default({ expressApp: app });

  app.listen(config.port, err => {
    if (err) {
      Logger.error(err);
      return;
    }
    Logger.info(`🛡️  Server listening on port: ${config.port} 🛡️`);
  });
}

startServer();
