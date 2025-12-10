/**
 * Cloudinary Service
 * Xử lý các API liên quan đến Cloudinary image upload
 */

import { apiClient } from '../api/client';
import { API_ENDPOINTS } from '../api/endpoints';
import type {
  CloudinaryUploadResultDto,
  CloudinaryTransformOptionsDto,
  CloudinaryUploadFromUrlDto,
  CloudinaryDeleteResponseDto,
} from '@/types/cloudinary.types';

export const cloudinaryService = {
  /**
   * Upload một file ảnh lên Cloudinary
   * @param file - File ảnh cần upload
   * @param folder - Thư mục trong Cloudinary (tùy chọn, ví dụ: "products", "blog/images")
   * @returns Kết quả upload với các URL ảnh
   */
  async uploadImage(
    file: File,
    folder?: string | null
  ): Promise<CloudinaryUploadResultDto> {
    const formData = new FormData();
    formData.append('file', file);

    const params = folder ? { folder } : undefined;
    return apiClient.upload<CloudinaryUploadResultDto>(
      API_ENDPOINTS.CLOUDINARY.UPLOAD,
      formData,
      params
    );
  },

  /**
   * Upload ảnh từ URL lên Cloudinary
   * @param imageUrl - URL của ảnh cần upload
   * @param folder - Thư mục trong Cloudinary (tùy chọn)
   * @returns Kết quả upload với các URL ảnh
   */
  async uploadImageFromUrl(
    imageUrl: string,
    folder?: string | null
  ): Promise<CloudinaryUploadResultDto> {
    const request: CloudinaryUploadFromUrlDto = {
      imageUrl,
      folder: folder ?? null,
    };
    return apiClient.post<CloudinaryUploadResultDto>(
      API_ENDPOINTS.CLOUDINARY.UPLOAD_FROM_URL,
      request
    );
  },

  /**
   * Xóa ảnh khỏi Cloudinary
   * @param publicId - Public ID của ảnh cần xóa (ví dụ: "products/abc123xyz")
   * @returns Thông báo xóa thành công
   */
  async deleteImage(publicId: string): Promise<CloudinaryDeleteResponseDto> {
    return apiClient.delete<CloudinaryDeleteResponseDto>(
      API_ENDPOINTS.CLOUDINARY.DELETE(publicId)
    );
  },

  /**
   * Lấy URL ảnh đã được transform với các tùy chọn chỉnh sửa
   * @param publicId - Public ID của ảnh
   * @param options - Các tùy chọn transform (width, height, crop, quality, format, etc.)
   * @returns Kết quả transform với URL ảnh đã chỉnh sửa
   */
  async transformImage(
    publicId: string,
    options?: CloudinaryTransformOptionsDto | null
  ): Promise<CloudinaryUploadResultDto> {
    return apiClient.post<CloudinaryUploadResultDto>(
      API_ENDPOINTS.CLOUDINARY.TRANSFORM(publicId),
      options ?? {}
    );
  },
};

