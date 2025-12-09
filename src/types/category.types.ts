// Category Types

export interface CreateCategoryDto {
  name: string;
  description?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
}

export interface UpdateCategoryDto {
  name?: string | null;
  description?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
}

export interface BulkCreateCategoryDto {
  categories: CreateCategoryDto[];
}

export interface CategoryResponseDto {
  id: number;
  name: string;
  slug: string;
  description?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  createdAt: string; // ISO 8601 date string
  updatedAt: string; // ISO 8601 date string
  productCount: number;
}

