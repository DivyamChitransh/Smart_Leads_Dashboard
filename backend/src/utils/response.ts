import { Response } from 'express';
import { ApiSuccessResponse, PaginationMeta } from '../types';

export const sendSuccess = <T>(
  res: Response,
  statusCode: number,
  message: string,
  data: T,
  pagination?: PaginationMeta
): Response => {
  const body: ApiSuccessResponse<T> = {
    success: true,
    message,
    data,
    ...(pagination && { pagination }),
  };
  return res.status(statusCode).json(body);
};
