/**
 * Blog Category Service
 * Xử lý các API liên quan đến danh mục blog
 */

import { apiClient } from '../api/client';
import { API_ENDPOINTS } from '../api/endpoints';
import type {
  CreateBlogCategoryDto,
  UpdateBlogCategoryDto,
  BlogCategoryResponseDto,
} from '@/types/blog.types';

export const blogCategoryService = {
  /**
   * Lấy tất cả danh mục blog
   * @returns Danh sách danh mục blog
   */
  async getAllCategories(): Promise<BlogCategoryResponseDto[]> {
    return apiClient.get<BlogCategoryResponseDto[]>(
      API_ENDPOINTS.BLOG_CATEGORIES.BASE
    );
  },

  /**
   * Lấy danh mục blog theo ID
   * @param id - Blog category ID
   * @returns Chi tiết danh mục blog
   */
  async getCategoryById(id: number): Promise<BlogCategoryResponseDto> {
    return apiClient.get<BlogCategoryResponseDto>(
      API_ENDPOINTS.BLOG_CATEGORIES.BY_ID(id)
    );
  },

  /**
   * Lấy danh mục blog theo slug
   * @param slug - Blog category slug
   * @returns Chi tiết danh mục blog
   */
  async getCategoryBySlug(slug: string): Promise<BlogCategoryResponseDto> {
    return apiClient.get<BlogCategoryResponseDto>(
      API_ENDPOINTS.BLOG_CATEGORIES.BY_SLUG(slug)
    );
  },

  /**
   * Tạo danh mục blog mới (Chỉ Admin)
   * @param category - Dữ liệu danh mục blog
   * @returns Danh mục blog đã tạo
   */
  async createCategory(
    category: CreateBlogCategoryDto
  ): Promise<BlogCategoryResponseDto> {
    return apiClient.post<BlogCategoryResponseDto>(
      API_ENDPOINTS.BLOG_CATEGORIES.BASE,
      category
    );
  },

  /**
   * Cập nhật danh mục blog (Chỉ Admin)
   * @param id - Blog category ID
   * @param category - Dữ liệu danh mục blog cập nhật
   * @returns Danh mục blog đã cập nhật
   */
  async updateCategory(
    id: number,
    category: UpdateBlogCategoryDto
  ): Promise<BlogCategoryResponseDto> {
    return apiClient.put<BlogCategoryResponseDto>(
      API_ENDPOINTS.BLOG_CATEGORIES.BY_ID(id),
      category
    );
  },

  /**
   * Xóa danh mục blog (Chỉ Admin)
   * Lưu ý: Không thể xóa nếu danh mục có bài viết
   * @param id - Blog category ID
   */
  async deleteCategory(id: number): Promise<void> {
    return apiClient.delete<void>(API_ENDPOINTS.BLOG_CATEGORIES.BY_ID(id));
  },
};

