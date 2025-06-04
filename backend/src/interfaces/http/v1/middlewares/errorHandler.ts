import { ErrorRequestHandler } from "express";
import { sendError } from "@/shared/utils/response";
import { AppError } from "@/shared/errors";
import { StatusCodes } from "http-status-codes";

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof AppError) {
    sendError(res, err.message, err.statusCode, err.stack, err.code)
  } else {
    sendError(res, 'Something went wrong.', StatusCodes.INTERNAL_SERVER_ERROR, err.stack)
  }
}

export {
  errorHandler
}