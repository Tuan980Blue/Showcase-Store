'use client';

import React from 'react';
import Link from 'next/link';
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi';
import type { BlogPostResponseDto } from '@/types/blog.types';

interface BlogNavigationProps {
  currentPost: BlogPostResponseDto;
  previousPost: BlogPostResponseDto | null;
  nextPost: BlogPostResponseDto | null;
}

const BlogNavigation: React.FC<BlogNavigationProps> = ({
  currentPost,
  previousPost,
  nextPost,
}) => {
  return (
    <nav 
      className="mt-12 grid grid-cols-1 gap-4 border-t pt-8 md:grid-cols-2"
      style={{ borderColor: 'var(--border-light)' }}
    >
      {/* Previous Post */}
      <div>
        {previousPost ? (
          <Link
            href={`/blog/${previousPost.slug}`}
            className="group flex flex-col rounded-xl border p-4 transition-all duration-200 hover:border-[var(--brand-green)] hover:shadow-md"
            style={{ 
              borderColor: 'var(--border-light)',
              backgroundColor: 'white',
            }}
          >
            <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wider">
              <HiArrowLeft className="h-3 w-3 transition-transform duration-200 group-hover:-translate-x-1" />
              <span style={{ color: 'var(--text-light)' }}>BÀI VIẾT TRƯỚC</span>
            </div>
            <h3 
              className="line-clamp-2 text-base font-semibold transition-colors duration-200 group-hover:text-[var(--brand-green)]"
              style={{ color: 'var(--text-dark)' }}
            >
              {previousPost.title}
            </h3>
          </Link>
        ) : (
          <div 
            className="flex flex-col rounded-xl border p-4 opacity-50"
            style={{ 
              borderColor: 'var(--border-light)',
              backgroundColor: 'var(--bg-grey)',
            }}
          >
            <div className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-wider">
              <HiArrowLeft className="h-3 w-3" />
              <span style={{ color: 'var(--text-light)' }}>BÀI VIẾT TRƯỚC</span>
            </div>
            <p 
              className="text-sm"
              style={{ color: 'var(--text-light)' }}
            >
              Không có bài viết trước
            </p>
          </div>
        )}
      </div>

      {/* Next Post */}
      <div>
        {nextPost ? (
          <Link
            href={`/blog/${nextPost.slug}`}
            className="group flex flex-col rounded-xl border p-4 text-right transition-all duration-200 hover:border-[var(--brand-green)] hover:shadow-md"
            style={{ 
              borderColor: 'var(--border-light)',
              backgroundColor: 'white',
            }}
          >
            <div className="mb-2 flex items-center justify-end gap-2 text-xs font-medium uppercase tracking-wider">
              <span style={{ color: 'var(--text-light)' }}>BÀI VIẾT TIẾP THEO</span>
              <HiArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-1" />
            </div>
            <h3 
              className="line-clamp-2 text-base font-semibold transition-colors duration-200 group-hover:text-[var(--brand-green)]"
              style={{ color: 'var(--text-dark)' }}
            >
              {nextPost.title}
            </h3>
          </Link>
        ) : (
          <div 
            className="flex flex-col rounded-xl border p-4 text-right opacity-50"
            style={{ 
              borderColor: 'var(--border-light)',
              backgroundColor: 'var(--bg-grey)',
            }}
          >
            <div className="mb-2 flex items-center justify-end gap-2 text-xs font-medium uppercase tracking-wider">
              <span style={{ color: 'var(--text-light)' }}>BÀI VIẾT TIẾP THEO</span>
              <HiArrowRight className="h-3 w-3" />
            </div>
            <p 
              className="text-sm"
              style={{ color: 'var(--text-light)' }}
            >
              Không có bài viết tiếp theo
            </p>
          </div>
        )}
      </div>
    </nav>
  );
};

export default BlogNavigation;

