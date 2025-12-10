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

  private buildHeaders(extraHeaders?: HeadersInit, isFormData: boolean = false): HeadersInit {
    const headers: Record<string, string> = {
      ...(extraHeaders as Record<string, string> | undefined),
    };

    // Don't set Content-Type for FormData - browser will set it with boundary
    if (!isFormData) {
      headers['Content-Type'] = 'application/json';
    }

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

    const isFormData = options?.body instanceof FormData;
    let body: BodyInit | null | undefined;
    if (isFormData) {
      body = options?.body as FormData;
    } else if (options?.body !== undefined) {
      body = JSON.stringify(options.body);
    }

    try {
      const response = await fetch(fullUrl, {
        method,
        headers: this.buildHeaders(options?.headers, isFormData),
        body,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const contentType = response.headers.get('content-type');
      const data =
        contentType && contentType.includes('application/json')
          ? await response.json().catch(() => null)
          : await response.text().catch(() => null);

      const errorMessage =
        typeof data === 'object' &&
        data !== null &&
        'message' in data &&
        typeof (data as { message?: unknown }).message === 'string'
          ? (data as { message: string }).message
          : response.statusText;

      if (!response.ok) {
        throw new ApiError(
          response.status,
          getErrorMessage(response.status, errorMessage),
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

      const errorName =
        typeof error === 'object' && error !== null && 'name' in error
          ? (error as { name?: unknown }).name
          : undefined;

      if (errorName === 'AbortError') {
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

  /**
   * Upload file using FormData
   * @param url - API endpoint URL
   * @param formData - FormData object containing the file
   * @param params - Optional query parameters
   */
  upload<T>(url: string, formData: FormData, params?: RequestOptions['params']): Promise<T> {
    return this.request<T>('POST', url, {
      body: formData,
      params,
    });
  }
}

export const apiClient = new ApiClient();

export { ApiClient };

