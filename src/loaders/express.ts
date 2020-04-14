import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import routes from '../api';
import config from '../config';

interface Error {
  status: number;
  message: string;
  name: string;
}
// :package: Install packages and configure express and logger
export default ({ app }: { app: express.Application }) => {
  // Health Check Endpoint
  app.get('/status', (req, res) => {
    res.status(200).end();
  });
  app.head('/status', (req, res) => {
    res.status(200).end();
  });

  // Reverse Proxy
  app.enable('trust proxy');

  // CORS Configuration
  app.use(cors());

  // Middleware that transforms the raw string of req.body into json
  app.use(bodyParser.json());

  // Load API routes
  app.use(config.api.prefix, routes());

  app.use((req, res, next) => {
    const err = new Error('Not Found');
    res.status(404);
    next(err);
  });

  // error handlers
  app.use(
    (
      err: Error,
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      if (err.name === 'UnauthorizedError') {
        return res.status(err.status).send({ message: err.message }).end();
      }
      return next(err);
    }
  );

  //
  app.use((err: Error, req: express.Request, res: express.Response) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
  });
};
