'use client';

import React from 'react';
import Link from 'next/link';
import {HiHome, HiChevronRight, HiViewGrid} from 'react-icons/hi';

interface CategoryPageHeaderProps {
    title?: string;
    description?: string;
    categoryCount?: number;
}

const CategoryPageHeader: React.FC<CategoryPageHeaderProps> = ({
                                                                   title = 'Tất cả danh mục',
                                                                   description = 'Khám phá các danh mục sản phẩm đa dạng của chúng tôi',
                                                                   categoryCount,
                                                               }) => {
    return (
        <div className="mb-6 sm:mb-8">
            {/* Breadcrumbs */}
            <nav className="mb-4 flex items-center gap-2 text-sm text-[var(--text-light)]">
                <Link
                    href="/"
                    className="flex items-center gap-1 transition-colors duration-200 hover:text-[var(--brand-green)]"
                >
                    <HiHome className="h-4 w-4"/>
                    <span>Trang chủ</span>
                </Link>
                <HiChevronRight className="h-4 w-4"/>
                <span className="text-[var(--text-medium)]">Danh mục</span>
            </nav>

            {/* Header Content */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="flex items-start gap-4">
                    <div
                        className="flex h-12 w-12 items-center justify-center rounded-xl"
                        style={{
                            backgroundColor: 'var(--bg-mint)',
                        }}
                    >
                        <HiViewGrid
                            className="h-6 w-6"
                            style={{color: 'var(--brand-green)'}}
                        />
                    </div>
                    <div>
                        <h1
                            className="text-lg font-bold text-[var(--text-dark)] sm:text-xl lg:text-2xl"
                        >
                            {title}
                        </h1>
                        <p className="mt-2 text-sm text-[var(--text-medium)] sm:text-base">
                            {description}
                        </p>
                    </div>
                </div>
                {categoryCount !== undefined && (
                    <div
                        className="rounded-lg px-4 py-2 text-center sm:text-right"
                        style={{
                            backgroundColor: 'var(--bg-mint)',
                        }}
                    >
                        <p className="text-xs text-[var(--text-light)] sm:text-sm">
                            Tổng cộng
                        </p>
                        <p
                            className="text-lg font-bold text-[var(--brand-green)] sm:text-xl"
                        >
                            {categoryCount.toLocaleString('vi-VN')} danh mục
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CategoryPageHeader;

