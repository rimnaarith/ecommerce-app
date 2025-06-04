import express, { Express } from 'express';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import favicon from 'serve-favicon';
import path from 'path';

import { requestTime } from './requestTime'; // example custom middleware

export const registerGlobalMiddlewares = (app: Express) => {
  // Serve favicon
  app.use(favicon(path.join(__dirname, '../../../../../public/favicon.ico')));

  app.use(express.json());
  
  // Use cookie-parser to handle cookies
  app.use(cookieParser());
  
  app.use(compression());
  app.use(requestTime);
};