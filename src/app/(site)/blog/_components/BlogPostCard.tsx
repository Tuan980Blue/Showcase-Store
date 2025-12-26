'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HiCalendar, HiUser, HiArrowRight } from 'react-icons/hi';
import type { BlogPostResponseDto } from '@/types/blog.types';

interface BlogPostCardProps {
  post: BlogPostResponseDto;
  priority?: boolean;
  featured?: boolean;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ 
  post, 
  priority = false,
  featured = false,
}) => {
  const publishedAt = post.publishedAt ?? post.createdAt;
  const dateLabel = publishedAt
    ? new Date(publishedAt).toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    : 'Đang cập nhật';

  const href = `/blog/${post.slug}`;
  const thumbnail = post.posterUrl;
  const title = post.title ?? 'Bài viết chưa có tiêu đề';
  const excerpt = post.summary || 'Nội dung bài viết sẽ được cập nhật đầy đủ trong thời gian sắp tới.';
  const category = post.categoryName;

  if (featured) {
    return (
      <article
        className="group relative col-span-1 flex flex-col overflow-hidden rounded-2xl border bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl md:col-span-2 lg:col-span-2"
        style={{ 
          borderColor: 'var(--border-light)',
        }}
      >
        {/* Image Container - Larger for featured */}
        <Link href={href} className="relative block h-64 w-full overflow-hidden md:h-80">
          {thumbnail ? (
            <Image
              src={thumbnail}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, 66vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              priority={priority}
            />
          ) : (
            <div 
              className="flex h-full w-full items-center justify-center"
              style={{ backgroundColor: 'var(--bg-grey)' }}
            >
              <span 
                className="text-sm"
                style={{ color: 'var(--text-light)' }}
              >
                Hình ảnh sẽ được cập nhật
              </span>
            </div>
          )}
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          
          {/* Featured Badge */}
          <div className="absolute top-4 left-4">
            <span 
              className="inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold backdrop-blur-sm"
              style={{
                backgroundColor: 'rgba(47, 191, 113, 0.95)',
                color: 'var(--text-inverse)',
              }}
            >
              Nổi bật
            </span>
          </div>

          {/* Category Badge */}
          {category && (
            <div className="absolute top-4 right-4">
              <span 
                className="inline-flex items-center rounded-full px-3 py-1.5 text-xs font-medium backdrop-blur-sm"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  color: 'var(--brand-green)',
                }}
              >
                {category}
              </span>
            </div>
          )}
        </Link>

        {/* Content */}
        <div className="flex flex-1 flex-col p-6">
          {/* Meta Info */}
          <div className="mb-3 flex flex-wrap items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5">
              <HiCalendar className="h-4 w-4" style={{ color: 'var(--text-light)' }} />
              <span style={{ color: 'var(--text-light)' }}>{dateLabel}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <HiUser className="h-4 w-4" style={{ color: 'var(--text-light)' }} />
              <span style={{ color: 'var(--text-light)' }}>Showcase Team</span>
            </div>
          </div>

          {/* Title */}
          <Link href={href}>
            <h3 
              className="mb-3 line-clamp-2 text-xl font-bold leading-tight transition-colors duration-200 group-hover:opacity-80 sm:text-2xl"
              style={{ color: 'var(--text-dark)' }}
            >
              {title}
            </h3>
          </Link>

          {/* Excerpt */}
          <p 
            className="mb-4 line-clamp-3 text-sm leading-relaxed sm:text-base"
            style={{ color: 'var(--text-medium)' }}
          >
            {excerpt}
          </p>

          {/* Read More Link */}
          <div className="mt-auto">
            <Link
              href={href}
              className="inline-flex items-center gap-2 text-sm font-semibold transition-all duration-200 group-hover:gap-3"
              style={{ color: 'var(--brand-green)' }}
            >
              <span>Đọc bài viết</span>
              <HiArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      className="group flex flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[var(--brand-green)] hover:shadow-lg"
      style={{ 
        borderColor: 'var(--border-light)',
      }}
    >
      {/* Image Container */}
      <Link href={href} className="relative block aspect-video w-full overflow-hidden">
        {thumbnail ? (
          <Image
            src={thumbnail}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority={priority}
          />
        ) : (
          <div 
            className="flex h-full w-full items-center justify-center"
            style={{ backgroundColor: 'var(--bg-grey)' }}
          >
            <span 
              className="text-xs"
              style={{ color: 'var(--text-light)' }}
            >
              Hình ảnh sẽ được cập nhật
            </span>
          </div>
        )}
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        
        {/* Category Badge */}
        {category && (
          <div className="absolute top-3 left-3">
            <span 
              className="inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-medium backdrop-blur-sm sm:text-xs"
              style={{
                backgroundColor: 'rgba(47, 191, 113, 0.9)',
                color: 'var(--text-inverse)',
              }}
            >
              {category}
            </span>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        {/* Meta Info */}
        <div className="mb-2 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] sm:text-xs">
          <span 
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: 'var(--brand-green)' }}
          />
          <span style={{ color: 'var(--text-light)' }}>{dateLabel}</span>
        </div>

        {/* Title */}
        <Link href={href}>
          <h3 
            className="mb-2 line-clamp-2 text-base font-semibold leading-tight transition-colors duration-200 group-hover:opacity-80 sm:text-lg"
            style={{ color: 'var(--text-dark)' }}
          >
            {title}
          </h3>
        </Link>

        {/* Excerpt */}
        <p 
          className="mb-3 line-clamp-3 text-sm leading-relaxed"
          style={{ color: 'var(--text-medium)' }}
        >
          {excerpt}
        </p>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <div className="flex items-center gap-1.5 text-xs">
            <HiUser className="h-3.5 w-3.5" style={{ color: 'var(--text-light)' }} />
            <span style={{ color: 'var(--text-medium)' }}>Showcase Team</span>
          </div>
          <Link
            href={href}
            className="inline-flex items-center gap-1 text-xs font-semibold transition-all duration-200 group-hover:gap-1.5"
            style={{ color: 'var(--brand-green)' }}
          >
            <span>Đọc thêm</span>
            <HiArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default BlogPostCard;

