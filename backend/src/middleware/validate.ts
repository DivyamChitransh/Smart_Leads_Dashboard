import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/ApiError';
import { ValidationResult } from '../utils/validation';

type ValidationTarget = 'body' | 'query' | 'params';

export const validate =
  <T>(validator: (input: unknown) => ValidationResult<T>, target: ValidationTarget = 'body') =>
  (req: Request, _res: Response, next: NextFunction): void => {
    const result = validator(req[target]);

    if (!result.ok) {
      next(new ApiError(400, 'Validation failed', result.errors));
      return;
    }

    if (target === 'body') {
      req.body = result.data;
    } else if (target === 'query') {
      Object.assign(req.query, result.data);
    } else {
      Object.assign(req.params, result.data);
    }

    next();
  };
