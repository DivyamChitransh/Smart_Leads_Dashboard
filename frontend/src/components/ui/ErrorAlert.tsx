interface ErrorAlertProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorAlert = ({ message, onRetry }: ErrorAlertProps) => (
  <div className="rounded-[1.5rem] border border-red-200 bg-red-50/90 p-4 shadow-sm dark:border-red-800 dark:bg-red-950/80">
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        <div className="mt-1 h-9 w-9 rounded-2xl bg-red-200 text-red-700 dark:bg-red-900 dark:text-red-200">
          <svg className="m-auto h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div>
          <p className="text-sm font-semibold text-red-800 dark:text-red-200">{message}</p>
        </div>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="rounded-full border border-red-200 px-3 py-1.5 text-sm font-semibold text-red-700 transition hover:bg-red-100 dark:border-red-700 dark:text-red-200 dark:hover:bg-red-900/50"
        >
          Try again
        </button>
      )}
    </div>
  </div>
);
