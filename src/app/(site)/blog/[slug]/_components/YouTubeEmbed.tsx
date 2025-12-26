'use client';

import React from 'react';

interface YouTubeEmbedProps {
  youtubeUrl: string;
  title?: string;
}

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ youtubeUrl, title }) => {
  // Extract video ID from various YouTube URL formats
  const getVideoId = (url: string): string | null => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }

    return null;
  };

  const videoId = getVideoId(youtubeUrl);

  if (!videoId) {
    return (
      <div 
        className="rounded-xl border p-6 text-center"
        style={{ 
          borderColor: 'var(--border-light)',
          backgroundColor: 'var(--bg-grey)',
        }}
      >
        <p style={{ color: 'var(--text-light)' }}>
          Không thể tải video YouTube. URL không hợp lệ.
        </p>
      </div>
    );
  }

  return (
    <div className="my-8">
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl border shadow-lg" style={{ borderColor: 'var(--border-light)' }}>
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title || 'YouTube video player'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    </div>
  );
};

export default YouTubeEmbed;

