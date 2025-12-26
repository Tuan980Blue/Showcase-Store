'use client';

import React from 'react';
import { HiViewGrid, HiViewList } from 'react-icons/hi';

export type ViewMode = 'grid' | 'list';

interface ViewToggleProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ viewMode, onViewModeChange }) => {
  return (
    <div 
      className="inline-flex items-center gap-1 rounded-lg border p-1"
      style={{ 
        borderColor: 'var(--border-light)',
        backgroundColor: 'var(--bg-light)',
      }}
    >
      <button
        onClick={() => onViewModeChange('grid')}
        className={`flex items-center justify-center rounded-md p-2 transition-all duration-200 ${
          viewMode === 'grid' ? 'shadow-sm' : ''
        }`}
        style={{
          backgroundColor: viewMode === 'grid' ? 'white' : 'transparent',
          color: viewMode === 'grid' ? 'var(--brand-green)' : 'var(--text-light)',
        }}
        onMouseEnter={(e) => {
          if (viewMode !== 'grid') {
            e.currentTarget.style.color = 'var(--text-medium)';
          }
        }}
        onMouseLeave={(e) => {
          if (viewMode !== 'grid') {
            e.currentTarget.style.color = 'var(--text-light)';
          }
        }}
        aria-label="Xem dạng lưới"
      >
        <HiViewGrid className="h-4 w-4 sm:h-5 sm:w-5" />
      </button>
      <button
        onClick={() => onViewModeChange('list')}
        className={`flex items-center justify-center rounded-md p-2 transition-all duration-200 ${
          viewMode === 'list' ? 'shadow-sm' : ''
        }`}
        style={{
          backgroundColor: viewMode === 'list' ? 'white' : 'transparent',
          color: viewMode === 'list' ? 'var(--brand-green)' : 'var(--text-light)',
        }}
        onMouseEnter={(e) => {
          if (viewMode !== 'list') {
            e.currentTarget.style.color = 'var(--text-medium)';
          }
        }}
        onMouseLeave={(e) => {
          if (viewMode !== 'list') {
            e.currentTarget.style.color = 'var(--text-light)';
          }
        }}
        aria-label="Xem dạng danh sách"
      >
        <HiViewList className="h-4 w-4 sm:h-5 sm:w-5" />
      </button>
    </div>
  );
};

export default ViewToggle;

