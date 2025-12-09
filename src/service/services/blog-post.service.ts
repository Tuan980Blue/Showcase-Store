/**
 * Blog Post Service
 * Xử lý các API liên quan đến bài viết blog
 */

import { apiClient } from '../api/client';
import { API_ENDPOINTS } from '../api/endpoints';
import type {
  CreateBlogPostDto,
  UpdateBlogPostDto,
  BlogPostResponseDto,
} from '@/types/blog.types';

export const blogPostService = {
  /**
   * Lấy tất cả bài viết blog
   * @param includeUnpublished - Bao gồm bài viết chưa publish (mặc định: false)
   * @returns Danh sách bài viết
   */
  async getAllPosts(includeUnpublished: boolean = false): Promise<BlogPostResponseDto[]> {
    return apiClient.get<BlogPostResponseDto[]>(
      API_ENDPOINTS.BLOG_POSTS.BASE,
      { includeUnpublished }
    );
  },

  /**
   * Lấy bài viết theo ID
   * @param id - Blog post ID
   * @returns Chi tiết bài viết
   */
  async getPostById(id: number): Promise<BlogPostResponseDto> {
    return apiClient.get<BlogPostResponseDto>(
      API_ENDPOINTS.BLOG_POSTS.BY_ID(id)
    );
  },

  /**
   * Lấy bài viết theo slug
   * @param slug - Blog post slug
   * @returns Chi tiết bài viết
   */
  async getPostBySlug(slug: string): Promise<BlogPostResponseDto> {
    return apiClient.get<BlogPostResponseDto>(
      API_ENDPOINTS.BLOG_POSTS.BY_SLUG(slug)
    );
  },

  /**
   * Lấy bài viết theo category ID
   * @param categoryId - Blog category ID
   * @param includeUnpublished - Bao gồm bài viết chưa publish (mặc định: false)
   * @returns Danh sách bài viết trong category
   */
  async getPostsByCategory(
    categoryId: number,
    includeUnpublished: boolean = false
  ): Promise<BlogPostResponseDto[]> {
    return apiClient.get<BlogPostResponseDto[]>(
      API_ENDPOINTS.BLOG_POSTS.BY_CATEGORY(categoryId),
      { includeUnpublished }
    );
  },

  /**
   * Tạo bài viết mới (Chỉ Admin)
   * @param post - Dữ liệu bài viết
   * @returns Bài viết đã tạo
   */
  async createPost(post: CreateBlogPostDto): Promise<BlogPostResponseDto> {
    return apiClient.post<BlogPostResponseDto>(
      API_ENDPOINTS.BLOG_POSTS.BASE,
      post
    );
  },

  /**
   * Cập nhật bài viết (Chỉ Admin)
   * @param id - Blog post ID
   * @param post - Dữ liệu bài viết cập nhật
   * @returns Bài viết đã cập nhật
   */
  async updatePost(
    id: number,
    post: UpdateBlogPostDto
  ): Promise<BlogPostResponseDto> {
    return apiClient.put<BlogPostResponseDto>(
      API_ENDPOINTS.BLOG_POSTS.BY_ID(id),
      post
    );
  },

  /**
   * Xóa bài viết (Chỉ Admin)
   * @param id - Blog post ID
   */
  async deletePost(id: number): Promise<void> {
    return apiClient.delete<void>(API_ENDPOINTS.BLOG_POSTS.BY_ID(id));
  },
};

