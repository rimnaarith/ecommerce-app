import { Request, Response, NextFunction } from "express";

/**
 * Set incoming request time
 */
export function requestTime(_req: Request, res: Response, next: NextFunction) {
  res.append('incomingTime', Date.now().toString())
  next()
}
