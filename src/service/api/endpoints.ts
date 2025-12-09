// Centralized API endpoint definitions aligned with the backend controllers
export const API_ENDPOINTS = {
  AUTH: {
    BASE: '/auth',
    LOGIN: '/auth/login',
    REFRESH: '/auth/refresh',
  },
  PRODUCTS: {
    BASE: '/api/products',
    BY_ID: (id: string) => `/products/${id}`,
    BY_SLUG: (slug: string) => `/products/slug/${slug}`,
    BULK: '/products/bulk',
  },
  CATEGORIES: {
    BASE: '/categories',
    BY_ID: (id: number) => `/categories/${id}`,
    BY_SLUG: (slug: string) => `/categories/slug/${slug}`,
  },
  BLOG_POSTS: {
    BASE: '/blog-posts',
    BY_ID: (id: number) => `/blog-posts/${id}`,
    BY_SLUG: (slug: string) => `/blog-posts/slug/${slug}`,
    BY_CATEGORY: (categoryId: number) => `/blog-posts/category/${categoryId}`,
  },
  BLOG_CATEGORIES: {
    BASE: '/blog-categories',
    BY_ID: (id: number) => `/blog-categories/${id}`,
    BY_SLUG: (slug: string) => `/blog-categories/slug/${slug}`,
  },
  SEARCH: {
    PRODUCTS: '/search/products',
  },
} as const;
