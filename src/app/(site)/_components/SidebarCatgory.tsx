"use client";

import React, { useState } from 'react';
import Link from 'next/link';

interface Category {
    id: string;
    name: string;
    path: string;
    icon: React.ReactNode;
}

const SidebarCatgory = () => {
    const [isOpen, setIsOpen] = useState(false);

    const categories: Category[] = [
        {
            id: 'ic',
            name: 'IC',
            path: '/danh-muc/ic',
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                    <circle cx="8" cy="8" r="1.5"/>
                    <circle cx="16" cy="8" r="1.5"/>
                    <circle cx="8" cy="16" r="1.5"/>
                    <circle cx="16" cy="16" r="1.5"/>
                </svg>
            )
        },
        {
            id: 'arduino',
            name: 'ARDUINO, MODULE',
            path: '/danh-muc/arduino-module',
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    <rect x="4" y="4" width="16" height="16" fill="currentColor" opacity="0.3"/>
                    <circle cx="8" cy="8" r="1"/>
                    <circle cx="16" cy="8" r="1"/>
                    <circle cx="8" cy="16" r="1"/>
                    <circle cx="16" cy="16" r="1"/>
                    <line x1="12" y1="4" x2="12" y2="20" stroke="currentColor" strokeWidth="1"/>
                    <line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="1"/>
                </svg>
            )
        },
        {
            id: 'diode',
            name: 'DIODE, TRANSITOR, FET',
            path: '/danh-muc/diode-transistor-fet',
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4 12l8-8v6h8v4h-8v6l-8-8z"/>
                    <line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="2"/>
                </svg>
            )
        },
        {
            id: 'resistor',
            name: 'ĐIỆN TRỞ - BIẾN TRỞ',
            path: '/danh-muc/dien-tro-bien-tro',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path d="M4 12h16M4 12l4-4M4 12l4 4M20 12l-4-4M20 12l-4 4"/>
                </svg>
            )
        },
        {
            id: 'capacitor',
            name: 'TỤ ĐIỆN, CUỘN CẢM, CẦU CHÌ',
            path: '/danh-muc/tu-dien-cuon-cam-cau-chi',
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <line x1="4" y1="8" x2="4" y2="16" stroke="currentColor" strokeWidth="2"/>
                    <line x1="20" y1="8" x2="20" y2="16" stroke="currentColor" strokeWidth="2"/>
                    <line x1="4" y1="12" x2="20" y2="12" stroke="currentColor" strokeWidth="1"/>
                </svg>
            )
        },
        {
            id: 'led',
            name: 'LED, LCD, CẢM BIẾN',
            path: '/danh-muc/led-lcd-cam-bien',
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="6" fill="currentColor" opacity="0.3"/>
                    <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" fill="none"/>
                    <line x1="12" y1="2" x2="12" y2="6" stroke="currentColor" strokeWidth="2"/>
                    <line x1="12" y1="18" x2="12" y2="22" stroke="currentColor" strokeWidth="2"/>
                    <line x1="2" y1="12" x2="6" y2="12" stroke="currentColor" strokeWidth="2"/>
                    <line x1="18" y1="12" x2="22" y2="12" stroke="currentColor" strokeWidth="2"/>
                </svg>
            )
        },
        {
            id: 'connector',
            name: 'CỔNG KẾT NỐI, NÚT NHẤN',
            path: '/danh-muc/cong-ket-noi-nut-nhan',
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <rect x="2" y="8" width="6" height="8" rx="1"/>
                    <rect x="16" y="8" width="6" height="8" rx="1"/>
                    <line x1="8" y1="12" x2="16" y2="12" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="4" cy="12" r="1"/>
                    <circle cx="20" cy="12" r="1"/>
                </svg>
            )
        },
        {
            id: 'tools',
            name: 'DỤNG CỤ, PHỤ KIỆN ĐIỆN TỬ',
            path: '/danh-muc/dung-cu-phu-kien-dien-tu',
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round"/>
                </svg>
            )
        },
        {
            id: 'industrial',
            name: 'ĐIỆN CÔNG NGHIỆP - CƠ KHÍ',
            path: '/danh-muc/dien-cong-nghiep-co-khi',
            icon: (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 1v6m0 6v6M23 12h-6m-6 0H1" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.5"/>
                </svg>
            )
        },
        {
            id: 'household',
            name: 'SẢN PHẨM GIA DỤNG',
            path: '/danh-muc/san-pham-gia-dung',
            icon: (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
            )
        }
    ];

    return (
        <div
            className="w-full max-w-xs shadow-lg rounded-lg overflow-hidden"
            style={{ backgroundColor: "var(--bg-light)", color: "var(--text-dark)" }}
        >
            {/* Header */}
            <div
                className="px-4 py-3 flex items-center gap-3"
                style={{ backgroundColor: "var(--brand-navy)", color: "var(--text-inverse)" }}
            >
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-1 rounded transition-colors"
                    style={{ backgroundColor: "transparent" }}
                    aria-label="Toggle menu"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                <h2 className="font-bold text-lg uppercase">
                    DANH MỤC SẢN PHẨM
                </h2>
            </div>

            {/* Category List */}
            <div
                className="divide-y"
                style={{ borderColor: "var(--border-light)" }}
            >
                {categories.map((category) => (
                    <Link
                        key={category.id}
                        href={category.path}
                        className="flex items-center gap-3 px-4 py-3 transition-colors group"
                        style={{ backgroundColor: "var(--bg-light)" }}
                    >
                        <div
                            className="flex-shrink-0"
                            style={{ color: "var(--icon-sub)" }}
                        >
                            {category.icon}
                        </div>
                        <span
                            className="flex-1 font-medium text-sm"
                            style={{ color: "var(--text-medium)" }}
                        >
                            {category.name}
                        </span>
                        <svg 
                            className="w-4 h-4 transition-colors"
                            style={{ color: "var(--icon-main)" }}
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default SidebarCatgory;