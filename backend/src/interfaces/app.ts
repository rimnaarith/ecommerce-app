import express from 'express';

import { errorHandler } from './http/v1/middlewares/errorHandler';
import { registerGlobalMiddlewares } from './http/v1/middlewares/global';
import v1Routes from './http/v1/routes'

const app = express();


registerGlobalMiddlewares(app);

// Health check
app.get('/healthcheck', (_req, res) => {
  res.status(200).send({'message':'OK'});
})

app.use('/api/v1', v1Routes)


// Error handling middleware
app.use(errorHandler);


export default app