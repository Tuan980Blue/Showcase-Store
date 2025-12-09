import { ERROR_MESSAGES, HTTP_STATUS } from './constants';

type Primitive = string | number | boolean | null | undefined;

// Convert a params object into a query string, skipping undefined/null values
export function buildQueryString(params?: Record<string, Primitive>): string {
  if (!params) return '';

  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    searchParams.append(key, String(value));
  });

  const query = searchParams.toString();
  return query ? `?${query}` : '';
}

export function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

export function isNetworkError(error: unknown): boolean {
  if (error instanceof TypeError) return true;
  if (error instanceof Error && error.name === 'AbortError') return true;
  return false;
}

export function getErrorMessage(status: number, fallback?: string): string {
  switch (status) {
    case HTTP_STATUS.BAD_REQUEST:
      return 'Invalid request data';
    case HTTP_STATUS.UNAUTHORIZED:
      return 'Authentication required';
    case HTTP_STATUS.FORBIDDEN:
      return 'You do not have permission to perform this action';
    case HTTP_STATUS.NOT_FOUND:
      return 'Requested resource was not found';
    case HTTP_STATUS.REQUEST_TIMEOUT:
      return ERROR_MESSAGES.TIMEOUT;
    default:
      return fallback ?? ERROR_MESSAGES.UNKNOWN;
  }
}

export function formatError(error: unknown): string {
  if (error instanceof Error) return error.message;
  return ERROR_MESSAGES.UNKNOWN;
}

