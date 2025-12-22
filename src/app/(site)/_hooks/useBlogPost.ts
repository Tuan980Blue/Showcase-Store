'use client';

import { useCallback, useEffect, useState } from 'react';
import { blogPostService } from '@/service/services';
import type { BlogPostResponseDto } from '@/types/blog.types';

interface UseBlogPostOptions {
  id?: number;
  slug?: string;
  enabled?: boolean;
}

interface UseBlogPostReturn {
  post: BlogPostResponseDto | null;
  loading: boolean;
  error: string | null;
  reload: () => Promise<void>;
}

/**
 * Public-only hook to load a single blog post by id or slug.
 * Intended for public blog detail pages; it does not expose any admin mutations.
 */
export const useBlogPost = (options: UseBlogPostOptions): UseBlogPostReturn => {
  const { id, slug } = options;
  const enabled = options.enabled ?? Boolean(id || slug);

  const [post, setPost] = useState<BlogPostResponseDto | null>(null);
  const [loading, setLoading] = useState<boolean>(Boolean(enabled));
  const [error, setError] = useState<string | null>(null);

  const loadPost = useCallback(async () => {
    if (!enabled || (!id && !slug)) return;

    try {
      setLoading(true);
      setError(null);

      const data = id
        ? await blogPostService.getPostById(id)
        : await blogPostService.getPostBySlug(slug as string);

      setPost(data);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Failed to load blog post';
      setError(message);
      console.error('Error loading blog post for site:', err);
    } finally {
      setLoading(false);
    }
  }, [enabled, id, slug]);

  useEffect(() => {
    void loadPost();
  }, [loadPost]);

  return {
    post,
    loading,
    error,
    reload: loadPost,
  };
};


