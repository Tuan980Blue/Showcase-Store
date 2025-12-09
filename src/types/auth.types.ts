// Authentication Types

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresAt: string; // ISO 8601 date string
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface AuthErrorResponse {
  message: string;
}

