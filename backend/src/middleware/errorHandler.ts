import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { ApiError } from '../utils/ApiError';
import { ApiErrorResponse } from '../types';

export const notFoundHandler = (req: Request, _res: Response, next: NextFunction): void => {
  next(new ApiError(404, `Route ${req.method} ${req.originalUrl} not found`));
};

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  let statusCode = 500;
  let message = 'Internal server error';
  let errors: Record<string, string[]> | undefined;

  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
    errors = err.errors;
  } else if (err instanceof mongoose.Error.ValidationError) {
    statusCode = 400;
    message = 'Validation failed';
    errors = {};
    Object.values(err.errors).forEach((e) => {
      const field = e.path;
      if (!errors![field]) errors![field] = [];
      errors![field].push(e.message);
    });
  } else if ((err as { code?: number }).code === 11000) {
    statusCode = 409;
    message = 'Record already exists';
  } else if (err instanceof mongoose.Error.CastError) {
    statusCode = 400;
    message = 'Invalid request';
  } else if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = err.name === 'TokenExpiredError' ? 'Session expired' : 'Invalid token';
  }

  if (statusCode >= 500) {
    console.error(err);
  }

  const response: ApiErrorResponse = {
    success: false,
    message,
    ...(errors && Object.keys(errors).length > 0 && { errors }),
  };

  res.status(statusCode).json(response);
};
