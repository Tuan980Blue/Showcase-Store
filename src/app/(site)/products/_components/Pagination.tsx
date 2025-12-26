'use client';

import React from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
}) => {
  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('ellipsis');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('ellipsis');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('ellipsis');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row sm:gap-6">
      {/* Info */}
      <div 
        className="text-xs sm:text-sm"
        style={{ color: 'var(--text-light)' }}
      >
        Hiển thị <span className="font-semibold" style={{ color: 'var(--text-dark)' }}>{startItem}</span> -{' '}
        <span className="font-semibold" style={{ color: 'var(--text-dark)' }}>{endItem}</span> trong tổng số{' '}
        <span className="font-semibold" style={{ color: 'var(--text-dark)' }}>{totalItems}</span> sản phẩm
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`flex items-center gap-1 rounded-lg border px-3 py-2 text-sm font-medium transition-all duration-200 sm:px-4 ${
            currentPage === 1 ? 'cursor-not-allowed opacity-50' : 'hover:shadow-sm'
          }`}
          style={{
            borderColor: 'var(--border-light)',
            backgroundColor: currentPage === 1 ? 'var(--bg-grey)' : 'white',
            color: currentPage === 1 ? 'var(--text-light)' : 'var(--text-dark)',
          }}
          onMouseEnter={(e) => {
            if (currentPage !== 1) {
              e.currentTarget.style.borderColor = 'var(--brand-green)';
              e.currentTarget.style.color = 'var(--brand-green)';
            }
          }}
          onMouseLeave={(e) => {
            if (currentPage !== 1) {
              e.currentTarget.style.borderColor = 'var(--border-light)';
              e.currentTarget.style.color = 'var(--text-dark)';
            }
          }}
        >
          <HiChevronLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Trước</span>
        </button>

        <div className="flex items-center gap-1">
          {getPageNumbers().map((page, index) => {
            if (page === 'ellipsis') {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="px-2 text-sm"
                  style={{ color: 'var(--text-light)' }}
                >
                  ...
                </span>
              );
            }

            const pageNum = page as number;
            const isActive = pageNum === currentPage;

            return (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-semibold transition-all duration-200 sm:h-10 sm:w-10 ${
                  isActive ? 'shadow-sm' : 'hover:shadow-sm'
                }`}
                style={{
                  backgroundColor: isActive ? 'var(--bg-mint)' : 'white',
                  color: isActive ? 'var(--brand-green)' : 'var(--text-dark)',
                  border: isActive ? 'none' : '1px solid var(--border-light)',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = 'var(--brand-green)';
                    e.currentTarget.style.color = 'var(--brand-green)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = 'var(--border-light)';
                    e.currentTarget.style.color = 'var(--text-dark)';
                  }
                }}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`flex items-center gap-1 rounded-lg border px-3 py-2 text-sm font-medium transition-all duration-200 sm:px-4 ${
            currentPage === totalPages ? 'cursor-not-allowed opacity-50' : 'hover:shadow-sm'
          }`}
          style={{
            borderColor: 'var(--border-light)',
            backgroundColor: currentPage === totalPages ? 'var(--bg-grey)' : 'white',
            color: currentPage === totalPages ? 'var(--text-light)' : 'var(--text-dark)',
          }}
          onMouseEnter={(e) => {
            if (currentPage !== totalPages) {
              e.currentTarget.style.borderColor = 'var(--brand-green)';
              e.currentTarget.style.color = 'var(--brand-green)';
            }
          }}
          onMouseLeave={(e) => {
            if (currentPage !== totalPages) {
              e.currentTarget.style.borderColor = 'var(--border-light)';
              e.currentTarget.style.color = 'var(--text-dark)';
            }
          }}
        >
          <span className="hidden sm:inline">Sau</span>
          <HiChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;

