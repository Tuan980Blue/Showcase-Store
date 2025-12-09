// Common API constants and configuration

export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8080/api',
  timeout: 15000,
} as const;

export const STORAGE_KEYS = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  REQUEST_TIMEOUT: 408,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export const ERROR_MESSAGES = {
  NETWORK: 'Unable to connect to server. Please check your connection.',
  TIMEOUT: 'Request timed out. Please try again.',
  UNKNOWN: 'An unexpected error occurred. Please try again later.',
} as const;

