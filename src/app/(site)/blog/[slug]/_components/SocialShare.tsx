'use client';

import React from 'react';
import { HiShare, HiOutlineClipboard } from 'react-icons/hi';

interface SocialShareProps {
  title: string;
  url: string;
  summary?: string;
}

const SocialShare: React.FC<SocialShareProps> = ({ title, url, summary }) => {
  const fullUrl = typeof window !== 'undefined' ? window.location.href : url;
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(fullUrl);
  const encodedSummary = encodeURIComponent(summary || '');

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    zalo: `https://zalo.me/share?url=${encodedUrl}&title=${encodedTitle}`,
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      alert('Đã sao chép liên kết!');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div 
      className="rounded-xl border p-4 sm:p-6"
      style={{ 
        borderColor: 'var(--border-light)',
        backgroundColor: 'white',
      }}
    >
      <div className="mb-4 flex items-center gap-2">
        <HiShare className="h-5 w-5" style={{ color: 'var(--brand-green)' }} />
        <h3 
          className="text-base font-semibold sm:text-lg"
          style={{ color: 'var(--text-dark)' }}
        >
          Chia sẻ bài viết
        </h3>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:opacity-90"
          style={{ backgroundColor: '#1877F2' }}
        >
          <span>Facebook</span>
        </a>

        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:opacity-90"
          style={{ backgroundColor: '#1DA1F2' }}
        >
          <span>Twitter</span>
        </a>

        <a
          href={shareLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:opacity-90"
          style={{ backgroundColor: '#0077B5' }}
        >
          <span>LinkedIn</span>
        </a>

        <a
          href={shareLinks.zalo}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:opacity-90"
          style={{ backgroundColor: '#0068FF' }}
        >
          <span>Zalo</span>
        </a>

        <button
          onClick={handleCopyLink}
          className="flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-all duration-200 hover:opacity-80"
          style={{
            borderColor: 'var(--border-light)',
            color: 'var(--text-medium)',
            backgroundColor: 'white',
          }}
        >
          <HiOutlineClipboard className="h-4 w-4" />
          <span>Sao chép liên kết</span>
        </button>
      </div>
    </div>
  );
};

export default SocialShare;

