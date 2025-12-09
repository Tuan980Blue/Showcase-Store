/**
 * Product Service
 * Xử lý các API liên quan đến sản phẩm
 */

import { apiClient } from '../api/client';
import { API_ENDPOINTS } from '../api/endpoints';
import type {
  CreateProductDto,
  UpdateProductDto,
  BulkCreateProductDto,
  ProductResponseDto,
  ProductListItemDto,
} from '@/types/product.types';

export const productService = {
  /**
   * Lấy tất cả sản phẩm
   * @param includeInactive - Bao gồm sản phẩm không active (mặc định: false)
   * @returns Danh sách sản phẩm
   */
  async getAllProducts(includeInactive: boolean = false): Promise<ProductListItemDto[]> {
    return apiClient.get<ProductListItemDto[]>(
      API_ENDPOINTS.PRODUCTS.BASE,
      { includeInactive }
    );
  },

  /**
   * Lấy sản phẩm theo ID
   * @param id - Product ID (Guid string)
   * @returns Chi tiết sản phẩm
   */
  async getProductById(id: string): Promise<ProductResponseDto> {
    return apiClient.get<ProductResponseDto>(
      API_ENDPOINTS.PRODUCTS.BY_ID(id)
    );
  },

  /**
   * Lấy sản phẩm theo slug
   * @param slug - Product slug
   * @returns Chi tiết sản phẩm
   */
  async getProductBySlug(slug: string): Promise<ProductResponseDto> {
    return apiClient.get<ProductResponseDto>(
      API_ENDPOINTS.PRODUCTS.BY_SLUG(slug)
    );
  },

  /**
   * Tạo sản phẩm mới (Chỉ Admin)
   * @param product - Dữ liệu sản phẩm
   * @returns Sản phẩm đã tạo
   */
  async createProduct(product: CreateProductDto): Promise<ProductResponseDto> {
    return apiClient.post<ProductResponseDto>(
      API_ENDPOINTS.PRODUCTS.BASE,
      product
    );
  },

  /**
   * Tạo nhiều sản phẩm cùng lúc (Chỉ Admin)
   * @param products - Mảng dữ liệu sản phẩm
   * @returns Mảng sản phẩm đã tạo
   */
  async createBulkProducts(
    products: CreateProductDto[]
  ): Promise<ProductResponseDto[]> {
    const bulkDto: BulkCreateProductDto = { products };
    return apiClient.post<ProductResponseDto[]>(
      API_ENDPOINTS.PRODUCTS.BULK,
      bulkDto
    );
  },

  /**
   * Cập nhật sản phẩm (Chỉ Admin)
   * @param id - Product ID (Guid string)
   * @param product - Dữ liệu sản phẩm cập nhật
   * @returns Sản phẩm đã cập nhật
   */
  async updateProduct(
    id: string,
    product: UpdateProductDto
  ): Promise<ProductResponseDto> {
    return apiClient.put<ProductResponseDto>(
      API_ENDPOINTS.PRODUCTS.BY_ID(id),
      product
    );
  },

  /**
   * Xóa sản phẩm (Chỉ Admin)
   * @param id - Product ID (Guid string)
   */
  async deleteProduct(id: string): Promise<void> {
    return apiClient.delete<void>(API_ENDPOINTS.PRODUCTS.BY_ID(id));
  },
};

