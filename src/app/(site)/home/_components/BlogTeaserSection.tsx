'use client';

import React from 'react';
import Link from 'next/link';
import type { BlogPostResponseDto } from '@/types/blog.types';

interface BlogTeaserSectionProps {
  posts: BlogPostResponseDto[];
  loading: boolean;
  error: string | null;
}

const BlogTeaserSection: React.FC<BlogTeaserSectionProps> = ({
  posts,
  loading,
  error,
}) => {
  const visiblePosts = posts.slice(0, 3);

  return (
    <section
      className="border-t"
      style={{ borderColor: 'var(--border-light)', backgroundColor: 'var(--bg-light)' }}
    >
      <div className="container mx-auto px-2 sm:px-4 lg:px-6 py-4 lg:py-8">
        <div className="flex items-center justify-between gap-2">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--brand-navy)] sm:text-base">
              Blog &amp; hướng dẫn kỹ thuật
            </h2>
            <p className="text-xs text-[var(--text-light)] sm:text-sm">
              Mẹo sử dụng đồ điện tử, hướng dẫn chọn mua, bảo dưỡng thiết bị.
            </p>
          </div>
          <Link
            href="/blog"
            className="hidden text-xs font-semibold text-[var(--brand-green)] hover:underline sm:inline"
          >
            Xem tất cả
          </Link>
        </div>

        <div className="mt-3 sm:mt-4">
          {loading && (
            <p className="text-xs text-[var(--text-light)] sm:text-sm">
              Đang tải bài viết...
            </p>
          )}
          {error && !loading && (
            <p className="text-xs text-red-500 sm:text-sm">
              Không thể tải bài viết. Vui lòng thử lại sau.
            </p>
          )}
          {!loading && !error && !visiblePosts.length && (
            <p className="text-xs text-[var(--text-light)] sm:text-sm">
              Nội dung blog sẽ được cập nhật trong thời gian tới.
            </p>
          )}

          {!loading && !error && visiblePosts.length > 0 && (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
              {visiblePosts.map((post) => (
                <article
                  key={post.id}
                  className="flex flex-col rounded-lg border bg-white p-3 text-xs shadow-sm sm:p-4 sm:text-sm"
                  style={{ borderColor: 'var(--border-light)' }}
                >
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-[var(--brand-green)] sm:text-[11px]">
                    {post.categoryName}
                  </p>
                  <h3 className="mt-1 line-clamp-2 text-[var(--text-dark)]">
                    {post.title}
                  </h3>
                  <p className="mt-1 line-clamp-3 text-[11px] text-[var(--text-light)] sm:text-xs">
                    {post.summary || post.content}
                  </p>
                  <div className="mt-2 flex-1" />
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-2 inline-flex text-[11px] font-semibold text-[var(--brand-navy)] hover:underline sm:text-xs"
                  >
                    Xem chi tiết
                  </Link>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BlogTeaserSection;


