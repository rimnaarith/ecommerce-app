import { StatusCodes } from 'http-status-codes';

class AppError extends Error {
  statusCode: number;
  code?: string;
  constructor (message: string, statusCode?: StatusCodes, code?: string) {
    super(message);
    this.statusCode = statusCode ?? StatusCodes.INTERNAL_SERVER_ERROR;
    this.code = code;
    Error.captureStackTrace(this, this.constructor); // Captures stack trace without polluting it with this constructor
  }
}

export {
  AppError
};