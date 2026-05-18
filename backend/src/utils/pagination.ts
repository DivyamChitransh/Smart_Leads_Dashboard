import { env } from '../config/env';
import { PaginationMeta } from '../types';

export const getPaginationMeta = (
  totalRecords: number,
  page: number,
  limit: number
): PaginationMeta => {
  const totalPages = Math.ceil(totalRecords / limit) || 1;
  const currentPage = Math.min(page, totalPages);

  return {
    currentPage,
    totalPages,
    totalRecords,
    pageSize: limit,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
  };
};

export const parsePagination = (
  page?: number,
  limit?: number
): { page: number; limit: number; skip: number } => {
  const parsedPage = Math.max(1, page ?? 1);
  const parsedLimit = Math.min(50, Math.max(1, limit ?? env.DEFAULT_PAGE_SIZE));
  const skip = (parsedPage - 1) * parsedLimit;

  return { page: parsedPage, limit: parsedLimit, skip };
};
