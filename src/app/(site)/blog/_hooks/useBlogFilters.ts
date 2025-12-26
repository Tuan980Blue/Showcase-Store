'use client';

import { useMemo } from 'react';
import type { BlogPostResponseDto } from '@/types/blog.types';
import type { BlogFilterState } from '../_components/BlogFilters';

interface UseBlogFiltersProps {
  posts: BlogPostResponseDto[];
  filterState: BlogFilterState;
}

export const useBlogFilters = ({ posts, filterState }: UseBlogFiltersProps) => {
  const filteredPosts = useMemo(() => {
    let result = [...posts];

    // Filter by search query
    if (filterState.searchQuery.trim()) {
      const query = filterState.searchQuery.toLowerCase().trim();
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.summary.toLowerCase().includes(query) ||
          post.categoryName.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (filterState.categoryId !== 'all') {
      result = result.filter((post) => post.categoryId === filterState.categoryId);
    }

    // Sort posts
    switch (filterState.sortBy) {
      case 'oldest':
        result.sort((a, b) => {
          const dateA = new Date(a.publishedAt ?? a.createdAt).getTime();
          const dateB = new Date(b.publishedAt ?? b.createdAt).getTime();
          return dateA - dateB;
        });
        break;
      case 'title':
        result.sort((a, b) => a.title.localeCompare(b.title, 'vi'));
        break;
      case 'newest':
      default:
        result.sort((a, b) => {
          const dateA = new Date(a.publishedAt ?? a.createdAt).getTime();
          const dateB = new Date(b.publishedAt ?? b.createdAt).getTime();
          return dateB - dateA;
        });
        break;
    }

    return result;
  }, [posts, filterState]);

  return {
    filteredPosts,
  };
};

