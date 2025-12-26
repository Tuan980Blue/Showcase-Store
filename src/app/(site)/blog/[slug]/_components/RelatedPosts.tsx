'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HiBookOpen, HiArrowRight } from 'react-icons/hi';
import type { BlogPostResponseDto } from '@/types/blog.types';

interface RelatedPostsProps {
  posts: BlogPostResponseDto[];
  currentPostId: number;
  categoryName: string;
}

const RelatedPosts: React.FC<RelatedPostsProps> = ({
  posts,
  currentPostId,
  categoryName,
}) => {
  // Filter out current post and limit to 3
  const relatedPosts = posts
    .filter((post) => post.id !== currentPostId)
    .slice(0, 3);

  if (relatedPosts.length === 0) {
    return null;
  }

  return (
    <section className="mt-12">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <HiBookOpen className="h-5 w-5" style={{ color: 'var(--brand-green)' }} />
          <h2 
            className="text-xl font-bold sm:text-2xl"
            style={{ color: 'var(--text-dark)' }}
          >
            Bài viết liên quan
          </h2>
        </div>
        <Link
          href="/blog"
          className="text-sm font-medium transition-colors duration-200 hover:opacity-80"
          style={{ color: 'var(--brand-green)' }}
        >
          Xem tất cả
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {relatedPosts.map((post) => {
          const publishedAt = post.publishedAt ?? post.createdAt;
          const dateLabel = publishedAt
            ? new Date(publishedAt).toLocaleDateString('vi-VN', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
              })
            : 'Đang cập nhật';

          return (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className="group flex flex-col overflow-hidden rounded-xl border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[var(--brand-green)] hover:shadow-lg"
              style={{ borderColor: 'var(--border-light)' }}
            >
              {/* Image */}
              <div className="relative aspect-video w-full overflow-hidden">
                {post.posterUrl ? (
                  <Image
                    src={post.posterUrl}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-4">
                <div className="mb-2 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em]">
                  <span 
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: 'var(--brand-green)' }}
                  />
                  <span style={{ color: 'var(--text-light)' }}>{dateLabel}</span>
                </div>
                <h3 
                  className="mb-2 line-clamp-2 text-base font-semibold leading-tight transition-colors duration-200 group-hover:text-[var(--brand-green)]"
                  style={{ color: 'var(--text-dark)' }}
                >
                  {post.title}
                </h3>
                <p 
                  className="mb-3 line-clamp-2 text-sm leading-relaxed"
                  style={{ color: 'var(--text-medium)' }}
                >
                  {post.summary}
                </p>
                <div className="mt-auto flex items-center gap-2 text-xs font-semibold">
                  <span style={{ color: 'var(--brand-green)' }}>Đọc thêm</span>
                  <HiArrowRight className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-1" style={{ color: 'var(--brand-green)' }} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default RelatedPosts;

