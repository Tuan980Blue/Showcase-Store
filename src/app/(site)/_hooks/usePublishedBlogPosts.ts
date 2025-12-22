'use client';

import { useCallback, useEffect, useState } from 'react';
import { blogPostService, blogCategoryService } from '@/service/services';
import type {
  BlogPostResponseDto,
  BlogCategoryResponseDto,
} from '@/types/blog.types';

interface UsePublishedBlogPostsReturn {
  posts: BlogPostResponseDto[];
  categories: BlogCategoryResponseDto[];
  loading: boolean;
  categoriesLoading: boolean;
  error: string | null;
  reloadPosts: () => Promise<void>;
  reloadCategories: () => Promise<void>;
}

/**
 * Public-only hook to load published blog posts and their categories for the site.
 * Uses includeUnpublished = false so it only surfaces content meant for public display.
 */
export const usePublishedBlogPosts = (): UsePublishedBlogPostsReturn => {
  const [posts, setPosts] = useState<BlogPostResponseDto[]>([]);
  const [categories, setCategories] = useState<BlogCategoryResponseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPosts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      // Public site only needs published posts
      const data = await blogPostService.getAllPosts(false);
      setPosts(data);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Failed to load blog posts';
      setError(message);
      console.error('Error loading published blog posts:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const loadCategories = useCallback(async () => {
    try {
      setCategoriesLoading(true);
      const data = await blogCategoryService.getAllCategories();
      setCategories(data);
    } catch (err: unknown) {
      console.error('Error loading blog categories for site:', err);
    } finally {
      setCategoriesLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadPosts();
  }, [loadPosts]);

  useEffect(() => {
    void loadCategories();
  }, [loadCategories]);

  return {
    posts,
    categories,
    loading,
    categoriesLoading,
    error,
    reloadPosts: loadPosts,
    reloadCategories: loadCategories,
  };
};


