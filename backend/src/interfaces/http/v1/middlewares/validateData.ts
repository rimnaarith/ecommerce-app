import { NextFunction, Response, Request } from "express";
import { z, ZodError } from "zod";
import { sendError } from '@/shared/utils/response.js'
import { StatusCodes } from "http-status-codes";

export function validateBody(schema: z.ZodType) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map(issue => ({
          message: issue.message,
        }))
        sendError(res, 'Invalid data', StatusCodes.BAD_REQUEST, error.stack, undefined, errorMessages)
      } else {
        sendError(res,'Internal Server Error',StatusCodes.INTERNAL_SERVER_ERROR)
      }
    }
  };
}