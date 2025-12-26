'use client';

import React, { useMemo } from 'react';
import { useParams } from 'next/navigation';
import { useBlogPost, usePublishedBlogPosts } from '@/app/(site)/_hooks';
import {
  BlogDetailHeader,
  BlogContent,
  SocialShare,
  BlogNavigation,
  RelatedPosts,
} from './_components';

const BlogDetailPage: React.FC = () => {
  const params = useParams();
  const slug = params?.slug as string;

  // Fetch current post
  const { post, loading, error } = useBlogPost({ slug });

  // Fetch all posts for navigation and related posts
  const { posts: allPosts } = usePublishedBlogPosts();

  // Find previous and next posts
  const { previousPost, nextPost, relatedPosts } = useMemo(() => {
    if (!post || !allPosts.length) {
      return { previousPost: null, nextPost: null, relatedPosts: [] };
    }

    // Sort posts by published date
    const sortedPosts = [...allPosts].sort((a, b) => {
      const dateA = new Date(a.publishedAt ?? a.createdAt).getTime();
      const dateB = new Date(b.publishedAt ?? b.createdAt).getTime();
      return dateB - dateA; // Newest first
    });

    // Find current post index
    const currentIndex = sortedPosts.findIndex((p) => p.id === post.id);

    // Get previous and next posts
    const previousPost = currentIndex > 0 ? sortedPosts[currentIndex - 1] : null;
    const nextPost = currentIndex < sortedPosts.length - 1 ? sortedPosts[currentIndex + 1] : null;

    // Get related posts from same category
    const relatedPosts = allPosts
      .filter((p) => p.categoryId === post.categoryId && p.id !== post.id)
      .slice(0, 3);

    return { previousPost, nextPost, relatedPosts };
  }, [post, allPosts]);

  // Loading state
  if (loading) {
    return (
      <div 
        className="min-h-screen w-full"
        style={{ 
          backgroundColor: 'var(--bg-light)',
          color: 'var(--text-dark)',
        }}
      >
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="animate-pulse space-y-8">
              <div className="h-12 w-3/4 rounded bg-[var(--bg-grey)]" />
              <div className="h-64 w-full rounded-xl bg-[var(--bg-grey)]" />
              <div className="space-y-4">
                <div className="h-4 w-full rounded bg-[var(--bg-grey)]" />
                <div className="h-4 w-full rounded bg-[var(--bg-grey)]" />
                <div className="h-4 w-3/4 rounded bg-[var(--bg-grey)]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !post) {
    return (
      <div 
        className="min-h-screen w-full"
        style={{ 
          backgroundColor: 'var(--bg-light)',
          color: 'var(--text-dark)',
        }}
      >
        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div 
              className="rounded-xl border p-8 text-center"
              style={{ 
                borderColor: 'var(--state-error)',
                backgroundColor: 'rgba(230, 80, 80, 0.05)',
              }}
            >
              <h1 
                className="mb-2 text-2xl font-bold"
                style={{ color: 'var(--state-error)' }}
              >
                Không tìm thấy bài viết
              </h1>
              <p 
                className="mb-6 text-base"
                style={{ color: 'var(--text-medium)' }}
              >
                {error || 'Bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.'}
              </p>
              <a
                href="/blog"
                className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:opacity-90"
                style={{ backgroundColor: 'var(--brand-green)' }}
              >
                Quay lại danh sách bài viết
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const fullUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <div 
      className="min-h-screen w-full"
      style={{ 
        backgroundColor: 'var(--bg-light)',
        color: 'var(--text-dark)',
      }}
    >
      {/* Main Container */}
      <div className="container mx-auto px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <BlogDetailHeader post={post} />

          {/* Content */}
          <div 
            className="mb-8 rounded-xl border bg-white p-6 sm:p-8 shadow-sm"
            style={{ borderColor: 'var(--border-light)' }}
          >
            <BlogContent post={post} />
          </div>

          {/* Social Share */}
          <div className="mb-8">
            <SocialShare
              title={post.title}
              url={fullUrl}
              summary={post.summary}
            />
          </div>

          {/* Navigation */}
          <BlogNavigation
            currentPost={post}
            previousPost={previousPost}
            nextPost={nextPost}
          />

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <RelatedPosts
              posts={relatedPosts}
              currentPostId={post.id}
              categoryName={post.categoryName}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPage;

