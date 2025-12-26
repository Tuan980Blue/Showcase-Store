'use client';

import React from 'react';
import type { BlogPostResponseDto } from '@/types/blog.types';

interface BlogContentProps {
  post: BlogPostResponseDto;
}

const BlogContent: React.FC<BlogContentProps> = ({ post }) => {
  // Check if content contains HTML or is plain text
  const isHTML = /<[a-z][\s\S]*>/i.test(post.content);

  // Extract YouTube video ID from various URL formats
  const getYouTubeEmbedUrl = (url: string): string | null => {
    if (!url) return null;
    
    // Handle different YouTube URL formats
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
    ];
    
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return `https://www.youtube.com/embed/${match[1]}`;
      }
    }
    
    // If already an embed URL, return as is
    if (url.includes('youtube.com/embed/')) {
      return url;
    }
    
    return null;
  };

  const youtubeEmbedUrl = post.youtubeUrl ? getYouTubeEmbedUrl(post.youtubeUrl) : null;

  return (
    <article className="prose prose-lg max-w-none">
      {isHTML ? (
        <div
          dangerouslySetInnerHTML={{ __html: post.content }}
          className="blog-content"
          style={{
            color: 'var(--text-dark)',
          }}
        />
      ) : (
        <div
          className="whitespace-pre-wrap leading-relaxed"
          style={{
            color: 'var(--text-dark)',
            fontSize: '1.125rem',
            lineHeight: '1.75rem',
          }}
        >
          {post.content.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph || '\u00A0'}
            </p>
          ))}
        </div>
      )}

      {/* YouTube Video Embed */}
      {youtubeEmbedUrl && (
        <div className="my-8">
          <div className="relative aspect-video w-full overflow-hidden rounded-xl border" style={{ borderColor: 'var(--border-light)' }}>
            <iframe
              src={youtubeEmbedUrl}
              title={post.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>
        </div>
      )}

      <style jsx global>{`
        .blog-content {
          color: var(--text-dark);
          line-height: 1.75;
        }
        .blog-content h1,
        .blog-content h2,
        .blog-content h3,
        .blog-content h4,
        .blog-content h5,
        .blog-content h6 {
          color: var(--text-dark);
          font-weight: 700;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        .blog-content h1 {
          font-size: 2.25rem;
        }
        .blog-content h2 {
          font-size: 1.875rem;
        }
        .blog-content h3 {
          font-size: 1.5rem;
        }
        .blog-content p {
          margin-bottom: 1.25rem;
          line-height: 1.75;
        }
        .blog-content ul,
        .blog-content ol {
          margin-bottom: 1.25rem;
          padding-left: 1.5rem;
        }
        .blog-content li {
          margin-bottom: 0.5rem;
        }
        .blog-content a {
          color: var(--brand-green);
          text-decoration: underline;
          transition: color 0.2s;
        }
        .blog-content a:hover {
          color: var(--btn-primary-hover);
        }
        .blog-content img {
          max-width: 100%;
          height: auto;
          border-radius: 0.75rem;
          margin: 1.5rem 0;
        }
        .blog-content blockquote {
          border-left: 4px solid var(--brand-green);
          padding-left: 1rem;
          margin: 1.5rem 0;
          font-style: italic;
          color: var(--text-medium);
        }
        .blog-content code {
          background-color: var(--bg-grey);
          padding: 0.125rem 0.375rem;
          border-radius: 0.25rem;
          font-size: 0.875em;
          color: var(--text-dark);
        }
        .blog-content pre {
          background-color: var(--bg-grey);
          padding: 1rem;
          border-radius: 0.5rem;
          overflow-x: auto;
          margin: 1.5rem 0;
        }
        .blog-content pre code {
          background-color: transparent;
          padding: 0;
        }
      `}</style>
    </article>
  );
};

export default BlogContent;
