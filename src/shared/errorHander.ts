import logger from '../config/logger';
import { Request, Response, NextFunction } from 'express';
import ApiError from './ApiError';

export default (err: ApiError, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.message);

  err.send(res);
}