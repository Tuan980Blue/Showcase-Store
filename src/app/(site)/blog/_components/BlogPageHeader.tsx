'use client';

import React from 'react';

interface BlogPageHeaderProps {
  title?: string;
  description?: string;
  postCount?: number;
}

const BlogPageHeader: React.FC<BlogPageHeaderProps> = ({
  title = 'Blog Hướng Dẫn Kỹ Thuật',
  description = 'Khám phá các bài viết chia sẻ kinh nghiệm, hướng dẫn lắp đặt và tối ưu hệ thống trưng bày',
  postCount = 0,
}) => {
  return (
    <div className="mb-8">
      <div className="mb-4">
        <p 
          className="mb-2 text-xs font-semibold uppercase tracking-[0.2em]"
          style={{ color: 'var(--text-light)' }}
        >
          Góc chia sẻ & kiến thức
        </p>
        <h1 
          className="mb-3 text-3xl font-bold sm:text-4xl lg:text-5xl"
          style={{ color: 'var(--text-dark)' }}
        >
          {title}
        </h1>
        <p 
          className="max-w-3xl text-base leading-relaxed sm:text-lg"
          style={{ color: 'var(--text-medium)' }}
        >
          {description}
        </p>
      </div>
      
      {postCount > 0 && (
        <div 
          className="inline-flex items-center gap-2 rounded-full px-4 py-2"
          style={{ 
            backgroundColor: 'var(--bg-mint)',
            color: 'var(--text-medium)',
          }}
        >
          <span 
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: 'var(--brand-green)' }}
          />
          <span className="text-sm font-medium">
            {postCount} {postCount === 1 ? 'bài viết' : 'bài viết'}
          </span>
        </div>
      )}
    </div>
  );
};

export default BlogPageHeader;

