// Product Types

export interface CreateProductDto {
  name: string;
  description: string;
  price: number;
  imageUrl?: string | null;
  shopeeLink?: string | null;
  tiktokLink?: string | null;
  categoryId: number;
  metaTitle?: string | null;
  metaDescription?: string | null;
}

export interface UpdateProductDto {
  name?: string | null;
  description?: string | null;
  price?: number | null;
  imageUrl?: string | null;
  shopeeLink?: string | null;
  tiktokLink?: string | null;
  categoryId?: number | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  isActive?: boolean | null;
}

export interface BulkCreateProductDto {
  products: CreateProductDto[];
}

export interface ProductResponseDto {
  id: string; // Guid as string
  name: string;
  slug: string;
  description: string;
  price: number;
  imageUrl?: string | null;
  shopeeLink?: string | null;
  tiktokLink?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  categoryId: number;
  categoryName: string;
  isActive: boolean;
  createdAt: string; // ISO 8601 date string
  updatedAt: string; // ISO 8601 date string
}

export interface ProductListItemDto {
  id: string; // Guid as string
  name: string;
  imageUrl?: string | null;
  price: number;
  slug: string;
  categoryName: string;
  shopeeLink?: string | null;
  tikTokLink?: string | null;
}

