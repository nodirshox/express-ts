import logger from '../config/logger';
import { Request, Response, NextFunction } from 'express';
import ApiError from './ApiError';
import { ValidationError } from 'express-validation';

export default (err: Error & { details: any }, req: Request, res: Response, next: NextFunction) => {
  let currentError: ApiError;
  logger.error(err.message);
  if (err.name === 'ValidationError' || err instanceof ValidationError) {
    currentError = new ApiError(400, 'VALIDATION_ERROR');
    currentError.setErrors(err.details);
  } else if (err instanceof ApiError) {
    currentError = err;
  } else {
    currentError = new ApiError(500);
  }
  currentError.send(res);
}