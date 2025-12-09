// Blog Types

// Blog Category Types
export interface CreateBlogCategoryDto {
  name: string;
  description?: string | null;
}

export interface UpdateBlogCategoryDto {
  name?: string | null;
  description?: string | null;
}

export interface BlogCategoryResponseDto {
  id: number;
  name: string;
  slug: string;
  description?: string | null;
  createdAt: string; // ISO 8601 date string
  updatedAt: string; // ISO 8601 date string
  blogPostCount: number;
}

// Blog Post Types
export interface CreateBlogPostDto {
  title: string;
  summary: string;
  content: string;
  posterUrl?: string | null;
  youtubeUrl?: string | null;
  categoryId: number;
  isPublished?: boolean;
}

export interface UpdateBlogPostDto {
  title?: string | null;
  summary?: string | null;
  content?: string | null;
  posterUrl?: string | null;
  youtubeUrl?: string | null;
  categoryId?: number | null;
  isPublished?: boolean | null;
}

export interface BlogPostResponseDto {
  id: number;
  title: string;
  slug: string;
  summary: string;
  content: string;
  posterUrl?: string | null;
  youtubeUrl?: string | null;
  categoryId: number;
  categoryName: string;
  isPublished: boolean;
  createdAt: string; // ISO 8601 date string
  updatedAt: string; // ISO 8601 date string
  publishedAt?: string | null; // ISO 8601 date string
}

