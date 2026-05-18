import { PaginationMeta } from '../../types';
import { Button } from '../ui/Button';

interface PaginationProps {
  pagination: PaginationMeta;
  onPageChange: (page: number) => void;
}

export const Pagination = ({ pagination, onPageChange }: PaginationProps) => (
  <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
    <p className="text-sm text-gray-600 dark:text-gray-400">
      Showing page {pagination.currentPage} of {pagination.totalPages} ({pagination.totalRecords}{' '}
      total leads)
    </p>
    <div className="flex gap-2">
      <Button
        variant="secondary"
        size="sm"
        disabled={!pagination.hasPrevPage}
        onClick={() => onPageChange(pagination.currentPage - 1)}
      >
        Previous
      </Button>
      <Button
        variant="secondary"
        size="sm"
        disabled={!pagination.hasNextPage}
        onClick={() => onPageChange(pagination.currentPage + 1)}
      >
        Next
      </Button>
    </div>
  </div>
);
