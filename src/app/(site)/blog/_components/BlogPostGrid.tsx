'use client';

import React from 'react';
import BlogPostCard from './BlogPostCard';
import type { BlogPostResponseDto } from '@/types/blog.types';

interface BlogPostGridProps {
  posts: BlogPostResponseDto[];
  loading?: boolean;
  error?: string | null;
}

const BlogPostGrid: React.FC<BlogPostGridProps> = ({
  posts,
  loading = false,
  error = null,
}) => {
  // Render skeleton loading state
  const renderSkeleton = () => (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse overflow-hidden rounded-xl border bg-white"
          style={{ borderColor: 'var(--border-light)' }}
        >
          <div 
            className="h-48 w-full"
            style={{ backgroundColor: 'var(--bg-grey)' }}
          />
          <div className="p-4 sm:p-5">
            <div 
              className="mb-2 h-3 w-24 rounded-full"
              style={{ backgroundColor: 'var(--bg-grey)' }}
            />
            <div 
              className="mb-3 h-5 w-full rounded-full"
              style={{ backgroundColor: 'var(--bg-grey)' }}
            />
            <div 
              className="mb-2 h-4 w-full rounded-full"
              style={{ backgroundColor: 'var(--bg-grey)' }}
            />
            <div 
              className="h-4 w-3/4 rounded-full"
              style={{ backgroundColor: 'var(--bg-grey)' }}
            />
          </div>
        </div>
      ))}
    </div>
  );

  // Render error state
  const renderError = () => (
    <div 
      className="rounded-xl border p-8 text-center"
      style={{ 
        borderColor: 'var(--state-error)',
        backgroundColor: 'rgba(230, 80, 80, 0.05)',
      }}
    >
      <p 
        className="mb-2 text-base font-medium sm:text-lg"
        style={{ color: 'var(--state-error)' }}
      >
        {error || 'Đã xảy ra lỗi khi tải bài viết'}
      </p>
      <p 
        className="text-sm"
        style={{ color: 'var(--text-light)' }}
      >
        Vui lòng thử lại sau
      </p>
    </div>
  );

  // Render empty state
  const renderEmpty = () => (
    <div 
      className="rounded-xl border border-dashed p-12 text-center"
      style={{ 
        borderColor: 'var(--border-light)',
        backgroundColor: 'white',
      }}
    >
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full" style={{ backgroundColor: 'var(--bg-mint)' }}>
        <svg
          className="h-8 w-8"
          style={{ color: 'var(--brand-green)' }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      </div>
      <h3 
        className="mb-2 text-lg font-semibold"
        style={{ color: 'var(--text-dark)' }}
      >
        Chưa có bài viết nào
      </h3>
      <p 
        className="text-sm"
        style={{ color: 'var(--text-medium)' }}
      >
        Nội dung chia sẻ kinh nghiệm và hướng dẫn kỹ thuật sẽ sớm được cập nhật.
      </p>
    </div>
  );

  if (loading) {
    return renderSkeleton();
  }

  if (error) {
    return renderError();
  }

  if (posts.length === 0) {
    return renderEmpty();
  }

  // Separate featured post (first one) from regular posts
  const featuredPost = posts[0];
  const regularPosts = posts.slice(1);

  return (
    <div className="space-y-6">
      {/* Featured Post - Larger card */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <BlogPostCard post={featuredPost} priority={true} featured={true} />
      </div>

      {/* Regular Posts Grid */}
      {regularPosts.length > 0 && (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {regularPosts.map((post, index) => (
            <BlogPostCard 
              key={post.id} 
              post={post} 
              priority={index < 3}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogPostGrid;

