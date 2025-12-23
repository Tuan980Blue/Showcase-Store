'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
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

    const renderSkeletonCards = () => (
        <div className="grid gap-4 sm:gap-5 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
                <div
                    key={index}
                    className="animate-pulse rounded-2xl border border-[var(--border-light)] bg-white/80 p-4 sm:p-5"
                >
                    <div className="mb-3 h-40 rounded-xl bg-[var(--bg-grey)]" />
                    <div className="mb-2 h-4 w-24 rounded-full bg-[var(--bg-grey)]" />
                    <div className="mb-3 h-5 w-4/5 rounded-full bg-[var(--bg-grey)]" />
                    <div className="h-4 w-full rounded-full bg-[var(--bg-grey)]" />
                </div>
            ))}
        </div>
    );

    const renderErrorState = () => (
        <div className="rounded-2xl border border-dashed border-[var(--state-error)] bg-white/80 px-4 py-3 text-sm text-[var(--text-medium)] sm:px-5">
            <div className="flex items-start gap-2">
                <span className="mt-[2px] h-2 w-2 rounded-full bg-[var(--state-error)]" />
                <div>
                    <p className="font-medium text-[var(--state-error)]">
                        Không tải được bài viết mới.
                    </p>
                    <p className="text-xs text-[var(--text-light)]">
                        {error || 'Vui lòng thử lại sau hoặc truy cập trang blog để xem thêm nội dung.'}
                    </p>
                </div>
            </div>
        </div>
    );

    const renderEmptyState = () => (
        <div className="rounded-2xl border border-dashed border-[var(--border-light)] bg-white/80 px-4 py-4 text-sm text-[var(--text-medium)] sm:px-5">
            <p className="font-medium text-[var(--text-dark)]">
                Chưa có bài viết nào được xuất bản.
            </p>
            <p className="mt-1 text-xs text-[var(--text-light)]">
                Nội dung chia sẻ kinh nghiệm, hướng dẫn lắp đặt và tối ưu hệ thống sẽ sớm được cập nhật.
            </p>
        </div>
    );

    return (
        <section className="border-t border-[var(--border-light)] bg-[var(--bg-light)] py-10 sm:py-12">
            <div className="container mx-auto px-4 lg:px-6">
                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <div className="flex flex-col gap-2">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--text-light)]">
                            Góc chia sẻ & kiến thức
                        </p>
                        <h2 className="text-2xl sm:text-3xl font-semibold text-[var(--text-dark)]">
                            Bài viết mới nhất
                        </h2>
                        <p className="max-w-2xl text-sm sm:text-base text-[var(--text-medium)] leading-relaxed">
                            Cập nhật xu hướng, kinh nghiệm triển khai và các mẹo tối ưu hệ thống để bạn
                            khai thác tối đa giá trị từ thiết bị và giải pháp trưng bày.
                        </p>
                    </div>

                    <Link
                        href="/blog"
                        className="mt-1 inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[var(--brand-navy)] underline-offset-4 hover:text-[var(--brand-green)] hover:underline"
                    >
                        Xem tất cả bài viết
                        <span className="text-xs">↗</span>
                    </Link>
                </div>

                {loading && renderSkeletonCards()}

                {!loading && error && renderErrorState()}

                {!loading && !error && visiblePosts.length === 0 && renderEmptyState()}

                {!loading && !error && visiblePosts.length > 0 && (
                    <div className="grid gap-4 sm:gap-5 md:grid-cols-3">
                        {visiblePosts.map((post: BlogPostResponseDto) => {
                            const slug = post.slug;
                            const href = slug ? `/blog/${slug}` : '/blog';
                            const publishedAt = post.publishedAt ?? post.createdAt;
                            const category = post.categoryName;
                            const author = 'Showcase Team';

                            const dateLabel = publishedAt
                                ? new Date(publishedAt).toLocaleDateString('vi-VN', {
                                      day: '2-digit',
                                      month: '2-digit',
                                      year: 'numeric',
                                  })
                                : 'Đang cập nhật';

                            const title = post.title ?? 'Bài viết chưa có tiêu đề';
                            const excerpt =
                                post.summary ||
                                'Nội dung bài viết sẽ được cập nhật đầy đủ trong thời gian sắp tới.';

                            const thumbnail = post.posterUrl || null;

                            return (
                                <Link
                                    key={post.id ?? slug ?? title}
                                    href={href}
                                    className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--border-light)] bg-white/90 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[var(--brand-green)] hover:shadow-lg"
                                >
                                    <div className="relative h-40 w-full overflow-hidden rounded-b-none bg-[var(--bg-grey)]">
                                        {thumbnail ? (
                                            <Image
                                                src={thumbnail}
                                                alt={title}
                                                fill
                                                sizes="(max-width: 768px) 100vw, 33vw"
                                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center text-xs text-[var(--text-light)]">
                                                Hình ảnh sẽ được cập nhật
                                            </div>
                                        )}
                                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-black/10 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                                        <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/40 mix-blend-screen opacity-60" />
                                    </div>

                                    <div className="flex flex-1 flex-col p-4 sm:p-5">
                                        <div className="mb-2 flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-[var(--text-light)]">
                                            <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-green)]" />
                                            <span>{dateLabel}</span>
                                        </div>
                                        <h3 className="mb-2 line-clamp-2 text-base sm:text-lg font-semibold text-[var(--text-dark)]">
                                            {title}
                                        </h3>
                                        <div className="mb-3 flex flex-wrap items-center gap-2">
                                            {category ? (
                                                <span className="rounded-full bg-[var(--bg-mint)] px-2 py-1 text-[11px] font-medium text-[var(--text-light)]">
                                                    {category}
                                                </span>
                                            ) : null}
                                            <span className="rounded-full border border-[var(--border-light)] px-2 py-1 text-[11px] text-[var(--text-light)]">
                                                Mới
                                            </span>
                                        </div>
                                        <p className="mb-4 line-clamp-3 text-sm text-[var(--text-medium)] leading-relaxed">
                                            {excerpt}
                                        </p>
                                        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-1 text-xs font-medium text-[var(--brand-navy)]">
                                            <span className="inline-flex items-center gap-1 text-[var(--text-medium)]">
                                                <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-green)]" />
                                                <span>{author}</span>
                                            </span>
                                            <span className="inline-flex items-center gap-1">
                                                Đọc bài viết
                                                <span className="text-[10px] transition-transform duration-200 group-hover:translate-x-0.5">
                                                    ↗
                                                </span>
                                            </span>
                                            <span className="rounded-full bg-[var(--bg-mint)] px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] text-[var(--text-light)]">
                                                Blog
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
};

export default BlogTeaserSection;


