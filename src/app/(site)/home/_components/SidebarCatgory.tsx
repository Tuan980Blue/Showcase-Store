"use client";

import { useMemo, useState } from 'react';
import type { CategoryResponseDto } from '@/types/category.types';
import { HiChevronDown, HiSearch } from 'react-icons/hi';

interface SidebarCategoryProps {
  categories: CategoryResponseDto[];
  loading: boolean;
  error: string | null;
  selectedCategoryId?: string | 'all';
  onSelectCategory?: (categoryId: string | 'all') => void;
}

const SidebarCatgory: React.FC<SidebarCategoryProps> = ({
  categories,
  loading,
  error,
  selectedCategoryId,
  onSelectCategory,
}) => {
  const [expanded, setExpanded] = useState(true);
  const [query, setQuery] = useState('');
  
  // Sync with external selectedCategoryId prop
  const selectedId = selectedCategoryId ?? 'all';

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return categories;
    return categories.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        (c.slug && c.slug.toLowerCase().includes(q))
    );
  }, [categories, query]);

  const handleSelect = (id: string | 'all') => {
    onSelectCategory?.(id);
  };

  return (
    <div
      className="rounded-lg border p-3 sm:p-4 shadow-sm lg:max-h-[calc(100vh-100px)] lg:overflow-auto"
      style={{
        backgroundColor: 'var(--bg-light)',
        color: 'var(--text-dark)',
        borderColor: 'var(--border-light)',
      }}
    >
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="flex w-full items-center justify-between rounded-md px-2 py-1 text-left transition-colors hover:bg-[var(--bg-mint)]"
      >
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-[var(--brand-navy)] sm:text-xs">
            Danh mục sản phẩm
          </p>
          <p className="text-[10px] text-[var(--text-light)]">
            Tìm nhanh theo nhóm hàng
          </p>
        </div>
        <HiChevronDown
          className={`h-4 w-4 transition-transform ${expanded ? 'rotate-180' : ''}`}
        />
      </button>

      {expanded && (
        <div className="mt-3 space-y-3">
          {/* Search box */}
          <div className="relative">
            <HiSearch className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-light)]" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Tìm danh mục..."
              className="w-full rounded-md border pl-8 pr-2 py-2 text-xs sm:text-sm focus:outline-none"
              style={{
                borderColor: 'var(--border-light)',
                backgroundColor: 'var(--bg-mint)',
                color: 'var(--text-dark)',
              }}
            />
          </div>

          {loading && (
            <p className="text-xs text-[var(--text-light)] sm:text-sm">
              Đang tải danh mục...
            </p>
          )}

          {error && !loading && (
            <p className="text-xs text-red-500 sm:text-sm">
              Không thể tải danh mục. Vui lòng thử lại sau.
            </p>
          )}

          {!loading && !error && filtered.length === 0 && (
            <p className="text-xs text-[var(--text-light)] sm:text-sm">
              Không tìm thấy danh mục phù hợp.
            </p>
          )}

          {!loading && !error && filtered.length > 0 && (
            <ul className="mt-1 space-y-1.5 text-xs sm:text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => handleSelect('all')}
                  className={`flex w-full items-center justify-between rounded px-2 py-1 text-left transition-colors hover:bg-[var(--bg-mint)] ${
                    selectedId === 'all' ? 'bg-[var(--bg-mint)] font-semibold' : ''
                  }`}
                >
                  <span className="text-[var(--text-dark)]">Tất cả sản phẩm</span>
                </button>
              </li>
              {filtered.map((category) => (
                <li key={category.id}>
                  <button
                    type="button"
                    onClick={() => handleSelect(category.id.toString())}
                    className={`flex w-full items-center justify-between rounded px-2 py-1 text-left transition-colors hover:bg-[var(--bg-mint)] ${
                      selectedId === category.id.toString()
                        ? 'bg-[var(--bg-mint)] font-semibold'
                        : ''
                    }`}
                  >
                    <span className="text-[var(--text-dark)]">{category.name}</span>
                    {typeof category.productCount === 'number' && (
                      <span className="ml-1 text-[11px] text-[var(--text-light)]">
                        {category.productCount}
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default SidebarCatgory;