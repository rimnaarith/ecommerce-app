import { RequestHandler } from 'express';
import { verifyToken } from '@/shared/utils/jwt.js';
import { StatusCodes } from 'http-status-codes';
import { TokenExpiredError } from 'jsonwebtoken';
import { sendError } from '@/shared/utils/response.js';

const verifyAccessToken: RequestHandler = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    sendError(res, 'Unauthorized', StatusCodes.UNAUTHORIZED);
    return;
  }
  const token = authHeader.slice(7);
  verifyToken(token)
    .then(payload => {
      req.payload = payload;
      next();
    })
    .catch(err => {
      D.APP(err);
      if (err instanceof TokenExpiredError) {
        sendError(res, 'Token expired', StatusCodes.UNAUTHORIZED);
      } else {
        sendError(res, 'Invalid token', StatusCodes.UNAUTHORIZED);
      }
    });
};

export {
  verifyAccessToken
};