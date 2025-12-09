/**
 * Category Service
 * Xử lý các API liên quan đến danh mục
 */

import { apiClient } from '../api/client';
import { API_ENDPOINTS } from '../api/endpoints';
import type {
  CreateCategoryDto,
  UpdateCategoryDto,
  BulkCreateCategoryDto,
  CategoryResponseDto,
} from '@/types/category.types';

export const categoryService = {
  /**
   * Lấy tất cả danh mục
   * @returns Danh sách danh mục
   */
  async getAllCategories(): Promise<CategoryResponseDto[]> {
    return apiClient.get<CategoryResponseDto[]>(API_ENDPOINTS.CATEGORIES.BASE);
  },

  /**
   * Lấy danh mục theo ID
   * @param id - Category ID
   * @returns Chi tiết danh mục
   */
  async getCategoryById(id: number): Promise<CategoryResponseDto> {
    return apiClient.get<CategoryResponseDto>(
      API_ENDPOINTS.CATEGORIES.BY_ID(id)
    );
  },

  /**
   * Lấy danh mục theo slug
   * @param slug - Category slug
   * @returns Chi tiết danh mục
   */
  async getCategoryBySlug(slug: string): Promise<CategoryResponseDto> {
    return apiClient.get<CategoryResponseDto>(
      API_ENDPOINTS.CATEGORIES.BY_SLUG(slug)
    );
  },

  /**
   * Tạo nhiều danh mục cùng lúc (Chỉ Admin)
   * @param categories - Mảng dữ liệu danh mục
   * @returns Mảng danh mục đã tạo
   */
  async createBulkCategories(
    categories: CreateCategoryDto[]
  ): Promise<CategoryResponseDto[]> {
    const bulkDto: BulkCreateCategoryDto = { categories };
    return apiClient.post<CategoryResponseDto[]>(
      API_ENDPOINTS.CATEGORIES.BASE,
      bulkDto
    );
  },

  /**
   * Cập nhật danh mục (Chỉ Admin)
   * @param id - Category ID
   * @param category - Dữ liệu danh mục cập nhật
   * @returns Danh mục đã cập nhật
   */
  async updateCategory(
    id: number,
    category: UpdateCategoryDto
  ): Promise<CategoryResponseDto> {
    return apiClient.put<CategoryResponseDto>(
      API_ENDPOINTS.CATEGORIES.BY_ID(id),
      category
    );
  },

  /**
   * Xóa danh mục (Chỉ Admin)
   * Lưu ý: Không thể xóa nếu danh mục có sản phẩm
   * @param id - Category ID
   */
  async deleteCategory(id: number): Promise<void> {
    return apiClient.delete<void>(API_ENDPOINTS.CATEGORIES.BY_ID(id));
  },
};

