import * as express from 'express';
import expressLoader from './express';
import Logger from './logger';

export default async ({ expressApp }: { expressApp: express.Application }) => {
  //TODO:add Database Loader
  // Logger.info('✌️ DB loaded and connected!');

  await expressLoader({ app: expressApp });
  Logger.info('🐾 Express Loaded 🐾');
};
