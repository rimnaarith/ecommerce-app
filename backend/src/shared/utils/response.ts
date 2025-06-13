import { Response } from 'express';
import { SuccessResponse, ErrorResponse } from '../types/response.js';
import { StatusCodes } from 'http-status-codes';

function sendSuccess<T>(res: Response, data: T, statusCode: StatusCodes = StatusCodes.OK): Response {
  const incomingTime = Number(res.get('incomingTime'))
  const response: SuccessResponse<T> = {
    status: 'success',
    processedTime: isNaN(incomingTime) ? 0 : Date.now() - incomingTime,
    data,
  };
  return res.status(statusCode).json(response);
}

function sendError(res: Response, message: string, statusCode: StatusCodes = StatusCodes.INTERNAL_SERVER_ERROR,stack?: string, code?: string, details?: any): Response {
  const response: ErrorResponse = {
    status: 'failure',
    message,
    details,
    stack: process.env.NODE_ENV === 'production' ? undefined : stack,
    code
  };
  return res.status(statusCode).json(response);
}

export {
  sendSuccess,
  sendError
}