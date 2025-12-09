import { API_CONFIG, ERROR_MESSAGES, HTTP_STATUS, STORAGE_KEYS } from './constants';
import { buildQueryString, getErrorMessage, isBrowser, isNetworkError } from './utils';

export class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(status: number, message: string, data?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

type RequestOptions = {
  params?: Record<string, string | number | boolean | null | undefined>;
  body?: unknown;
  headers?: HeadersInit;
};

class ApiClient {
  private token: string | null = null;
  private readonly baseURL: string;

  constructor(baseURL: string = API_CONFIG.baseURL) {
    this.baseURL = baseURL.replace(/\/$/, '');
    if (isBrowser()) {
      this.token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
    }
  }

  setToken(token: string | null): void {
    this.token = token;
    if (isBrowser()) {
      if (token) {
        localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, token);
      } else {
        localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
      }
    }
  }

  getToken(): string | null {
    if (this.token) return this.token;
    if (isBrowser()) {
      const stored = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
      this.token = stored;
      return stored;
    }
    return null;
  }

  clearToken(): void {
    this.setToken(null);
    if (isBrowser()) {
      localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    }
  }

  private buildHeaders(extraHeaders?: HeadersInit): HeadersInit {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(extraHeaders as Record<string, string> | undefined),
    };

    const token = this.getToken();
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return headers;
  }

  private async request<T>(
    method: string,
    url: string,
    options?: RequestOptions
  ): Promise<T> {
    const queryString = buildQueryString(options?.params);
    const fullUrl = `${this.baseURL}${url}${queryString}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout);

    try {
      const response = await fetch(fullUrl, {
        method,
        headers: this.buildHeaders(options?.headers),
        body:
          options?.body !== undefined ? JSON.stringify(options.body) : undefined,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const contentType = response.headers.get('content-type');
      const data =
        contentType && contentType.includes('application/json')
          ? await response.json().catch(() => null)
          : await response.text().catch(() => null);

      if (!response.ok) {
        throw new ApiError(
          response.status,
          getErrorMessage(response.status, (data as any)?.message ?? response.statusText),
          data
        );
      }

      if (response.status === HTTP_STATUS.NO_CONTENT) {
        return undefined as T;
      }

      return data as T;
    } catch (error: unknown) {
      clearTimeout(timeoutId);

      if (error instanceof ApiError) {
        throw error;
      }

      if ((error as any)?.name === 'AbortError') {
        throw new ApiError(HTTP_STATUS.REQUEST_TIMEOUT, ERROR_MESSAGES.TIMEOUT);
      }

      if (isNetworkError(error)) {
        throw new ApiError(
          HTTP_STATUS.INTERNAL_SERVER_ERROR,
          ERROR_MESSAGES.NETWORK
        );
      }

      throw new ApiError(
        HTTP_STATUS.INTERNAL_SERVER_ERROR,
        ERROR_MESSAGES.UNKNOWN,
        error
      );
    }
  }

  get<T>(url: string, params?: RequestOptions['params']): Promise<T> {
    return this.request<T>('GET', url, { params });
  }

  post<T>(url: string, body?: unknown): Promise<T> {
    return this.request<T>('POST', url, { body });
  }

  put<T>(url: string, body?: unknown): Promise<T> {
    return this.request<T>('PUT', url, { body });
  }

  delete<T>(url: string): Promise<T> {
    return this.request<T>('DELETE', url);
  }
}

export const apiClient = new ApiClient();

export { ApiClient };

