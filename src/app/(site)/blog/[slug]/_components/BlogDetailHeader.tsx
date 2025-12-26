'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HiCalendar, HiUser, HiArrowLeft, HiBookOpen } from 'react-icons/hi';
import type { BlogPostResponseDto } from '@/types/blog.types';

interface BlogDetailHeaderProps {
  post: BlogPostResponseDto;
}

const BlogDetailHeader: React.FC<BlogDetailHeaderProps> = ({ post }) => {
  const publishedAt = post.publishedAt ?? post.createdAt;
  const dateLabel = publishedAt
    ? new Date(publishedAt).toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    : 'Đang cập nhật';

  const thumbnail = post.posterUrl;
  const title = post.title ?? 'Bài viết chưa có tiêu đề';
  const category = post.categoryName;

  return (
    <header className="relative mb-8">
      {/* Back Button */}
      <Link
        href="/blog"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200 hover:opacity-80"
        style={{ color: 'var(--brand-green)' }}
      >
        <HiArrowLeft className="h-4 w-4" />
        <span>Quay lại danh sách bài viết</span>
      </Link>

      {/* Category Badge */}
      {category && (
        <div className="mb-4">
          <Link
            href={`/blog?categoryId=${post.categoryId}`}
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 hover:opacity-80"
            style={{
              backgroundColor: 'var(--bg-mint)',
              color: 'var(--brand-green)',
            }}
          >
            <HiBookOpen className="h-4 w-4" />
            <span>{category}</span>
          </Link>
        </div>
      )}

      {/* Title */}
      <h1 
        className="mb-6 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl"
        style={{ color: 'var(--text-dark)' }}
      >
        {title}
      </h1>

      {/* Meta Information */}
      <div className="mb-6 flex flex-wrap items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <HiCalendar className="h-4 w-4" style={{ color: 'var(--text-light)' }} />
          <span style={{ color: 'var(--text-medium)' }}>{dateLabel}</span>
        </div>
        <div className="flex items-center gap-2">
          <HiUser className="h-4 w-4" style={{ color: 'var(--text-light)' }} />
          <span style={{ color: 'var(--text-medium)' }}>Showcase Team</span>
        </div>
        {post.updatedAt && post.updatedAt !== post.createdAt && (
          <div className="flex items-center gap-2">
            <span 
              className="text-xs"
              style={{ color: 'var(--text-light)' }}
            >
              Cập nhật: {new Date(post.updatedAt).toLocaleDateString('vi-VN')}
            </span>
          </div>
        )}
      </div>

      {/* Featured Image */}
      {thumbnail && (
        <div className="relative mb-8 aspect-video w-full overflow-hidden rounded-2xl">
          <Image
            src={thumbnail}
            alt={title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      )}

      {/* Summary/Excerpt */}
      {post.summary && (
        <div 
          className="mb-8 rounded-xl border-l-4 p-4"
          style={{
            borderLeftColor: 'var(--brand-green)',
            backgroundColor: 'var(--bg-mint)',
          }}
        >
          <p 
            className="text-base leading-relaxed sm:text-lg"
            style={{ color: 'var(--text-medium)' }}
          >
            {post.summary}
          </p>
        </div>
      )}
    </header>
  );
};

export default BlogDetailHeader;
