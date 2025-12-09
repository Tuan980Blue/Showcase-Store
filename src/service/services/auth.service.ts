/**
 * Authentication Service
 * Xử lý các API liên quan đến authentication
 */

import { apiClient } from '../api/client';
import { API_ENDPOINTS } from '../api/endpoints';
import { STORAGE_KEYS } from '../api/constants';
import type {
  LoginRequest,
  LoginResponse,
  RefreshTokenRequest,
} from '@/types/auth.types';

export const authService = {
  /**
   * Đăng nhập với username và password
   * @param credentials - Thông tin đăng nhập
   * @returns Response chứa access token và refresh token
   */
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials
    );

    // Lưu token vào API client và localStorage
    apiClient.setToken(response.accessToken);

    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, response.refreshToken);
    }

    return response;
  },

  /**
   * Làm mới access token bằng refresh token
   * @param refreshToken - Refresh token
   * @returns Response mới chứa tokens mới
   */
  async refreshToken(refreshToken: string): Promise<LoginResponse> {
    const request: RefreshTokenRequest = { refreshToken };
    const response = await apiClient.post<LoginResponse>(
      API_ENDPOINTS.AUTH.REFRESH,
      request
    );

    // Cập nhật tokens đã lưu
    apiClient.setToken(response.accessToken);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, response.refreshToken);
    }

    return response;
  },

  /**
   * Đăng xuất - xóa tất cả tokens đã lưu
   */
  logout(): void {
    apiClient.clearToken();
  },

  /**
   * Kiểm tra xem user đã đăng nhập chưa
   * @returns True nếu có access token
   */
  isAuthenticated(): boolean {
    return apiClient.getToken() !== null;
  },

  /**
   * Lấy refresh token từ localStorage
   * @returns Refresh token hoặc null
   */
  getRefreshToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
    }
    return null;
  },
};

