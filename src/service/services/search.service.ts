/**
 * Search Service
 * Xử lý các API liên quan đến tìm kiếm
 */

import { apiClient } from '../api/client';
import { API_ENDPOINTS } from '../api/endpoints';
import type { ProductListItemDto } from '@/types/product.types';

export const searchService = {
  /**
   * Tìm kiếm sản phẩm theo từ khóa
   * @param query - Từ khóa tìm kiếm
   * @param includeInactive - Bao gồm sản phẩm không active (mặc định: false)
   * @returns Danh sách sản phẩm khớp
   * @throws Error nếu query rỗng
   */
  async searchProducts(
    query: string,
    includeInactive: boolean = false
  ): Promise<ProductListItemDto[]> {
    if (!query || query.trim() === '') {
      throw new Error('Từ khóa tìm kiếm không được để trống');
    }

    return apiClient.get<ProductListItemDto[]>(
      API_ENDPOINTS.SEARCH.PRODUCTS,
      {
        q: query.trim(),
        includeInactive,
      }
    );
  },
};

