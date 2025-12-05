"use client";

import Link from "next/link";
import {useEffect, useRef, useState} from "react";
import Image from "next/image";
import { HiHome, HiShoppingBag, HiViewGrid, HiBookOpen, HiMail, HiInformationCircle, HiChevronDown } from "react-icons/hi";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isMainNavFixed, setIsMainNavFixed] = useState(false);
    const headerRef = useRef<HTMLDivElement | null>(null);
    const bottomNavRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (!headerRef.current) return;
            const headerBottom = headerRef.current.getBoundingClientRect().bottom;
            setIsMainNavFixed(headerBottom <= 50);
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, {passive: true});
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle search logic here
        console.log('Searching for:', searchQuery);
    };

    const navItems = [
        {id: 'home', label: 'TRANG CHỦ', path: '/', icon: HiHome},
        {id: 'products', label: 'TẤT CẢ SẢN PHẨM', path: '/products', icon: HiShoppingBag},
        {id: 'categories', label: 'DANH MỤC', path: '/categories', hasDropdown: true, icon: HiViewGrid},
        {id: 'blog', label: 'BLOG HƯỚNG DẪN KỸ THUẬT', path: '/blog', hasDropdown: true, icon: HiBookOpen},
        {id: 'contact', label: 'DỊCH VỤ', path: '/about', icon: HiMail},
        {id: 'about', label: 'GIỚI THIỆU', path: '/about', icon: HiInformationCircle},
    ];

    return (
        <nav
            className="relative shadow-lg"
            ref={headerRef}
            style={{ backgroundColor: "var(--bg-light)", color: "var(--text-dark)" }}
        >
            {/* Top Information Bar */}
            <div
                className="border-b"
                style={{ backgroundColor: "var(--bg-light)", borderColor: "var(--border-light)" }}
            >
                <div className="container mx-auto px-1 sm:px-4 py-0.5 sm:py-2">
                    <div
                        className="flex flex-wrap items-center justify-between gap-0.5 sm:gap-2"
                        style={{ color: "var(--text-green)" }}
                    >
                        {/* Left - Address */}
                        <div className="flex items-center gap-0.5 sm:gap-2 mb-0 md:mb-0">
                            <svg className="w-2.5 h-2.5 sm:w-4 sm:h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                            </svg>
                            <span className="text-[6px] md:text-[8px] lg:text-sm text-red-500 leading-tight">
                                451 Âu Dương Lân, Phường 3, Quận 8, TPHCM
                            </span>
                        </div>

                        {/* Middle - Email */}
                        <div className="flex items-center gap-0.5 sm:gap-2 mb-0 md:mb-0">
                            <svg className="w-2.5 h-2.5 sm:w-4 sm:h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                            <span className="text-[6px] md:text-[8px] lg:text-sm text-red-500 leading-tight break-all">
                                dientutuananhhcm@gmail.com
                            </span>
                        </div>

                        {/* Right - Zalo Contact */}
                        <div className="flex items-center gap-0.5 sm:gap-2">
                            <svg className="w-2.5 h-2.5 sm:w-4 sm:h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                            </svg>
                            <span className="text-[6px] md:text-[8px] lg:text-xs text-red-500 leading-tight">
                                TƯ VẤN, GIẢI ĐÁP, HƯỚNG DẪN, MUA HÀNG (ZALO): 0941210212 - 0941210212
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Header Section */}
            <div
                className="border-b"
                style={{ backgroundColor: "var(--bg-light)", borderColor: "var(--border-light)" }}
            >
                <div className="container mx-auto px-4 py-4">
                    <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-6">
                        {/* Left - Logo */}
                        <div className="flex items-center gap-4 flex-shrink-0">
                            <div
                                className="flex items-center justify-center rounded-xl"
                            >
                                <Image
                                    src="/logo1.png"
                                    alt="Điện tử Tuấn Anh Logo"
                                    width={82}
                                    height={82}
                                    className="object-contain"
                                    priority
                                />
                            </div>
                            <div className="flex flex-col">
                                <Link
                                    href="/"
                                    className="text-sm sm:text-lg md:text-xl font-bold leading-tight transition-all duration-200 hover:text-opacity-70"
                                    style={{
                                        color: "var(--brand-navy)",
                                        textTransform: "uppercase",
                                        letterSpacing: "0.02em",
                                    }}
                                >
                                    Điện Tử Tuấn Anh
                                </Link>

                                <p
                                    className="text-[11px] md:text-xs font-semibold mt-1 uppercase tracking-wide"
                                    style={{ color: "var(--brand-green)" }}
                                >
                                    www.dientutuananh.com
                                </p>
                                <p
                                    className="text-xs md:text-sm mt-1 font-medium"
                                    style={{ color: "var(--text-medium)" }}
                                >
                                    Chuyên điện tử &amp; gia dụng, giá tốt mỗi ngày
                                </p>
                            </div>
                        </div>

                        {/* Middle - Search Bar */}
                        <div className="flex-1 w-full lg:max-w-2xl">
                            <form onSubmit={handleSearch} className="flex">
                                <div className="flex-1 relative">
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Tìm kiếm sản phẩm..."
                                        className="w-full px-4 py-2 pl-10 border rounded focus:outline-none"
                                        style={{
                                            borderColor: "var(--border-light)",
                                            color: "var(--text-dark)",
                                            backgroundColor: "var(--bg-mint)",
                                        }}
                                    />
                                    <svg
                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        style={{ color: "var(--text-light)" }}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <button
                                    type="submit"
                                    className="px-6 py-2 rounded transition-colors font-medium"
                                    style={{
                                        backgroundColor: "var(--btn-primary)",
                                        color: "var(--text-inverse)",
                                    }}
                                >
                                    Tìm kiếm
                                </button>
                            </form>
                            <p
                                className="text-xs mt-1 italic"
                                style={{ color: "var(--text-light)" }}
                            >
                                Tìm sản phẩm: Đèn, Chuột, Máy đo huyết áp, Camera...
                            </p>
                        </div>

                        {/* Right - Action Icons */}
                        <div className="flex items-center gap-2 lg:gap-4">
                            {[
                                {
                                    id: "tiktok",
                                    href: "https://vt.tiktok.com/ZSHTcp7yt31UR-XNxQ0/",
                                    label: "Tiktok Shop",
                                    icon: "/tiktok.png",
                                },
                                {
                                    id: "shopee",
                                    href: "https://vn.shp.ee/E74Wp9t",
                                    label: "Shopee",
                                    icon: "/shopee.png",
                                },
                                {
                                    id: "zalo",
                                    href: "https://zalo.me/0941210212",
                                    label: "Zalo",
                                    icon: "/zalo.png",
                                },
                            ].map((item) => (
                                <Link
                                    key={item.id}
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center gap-2 rounded-full border px-3 py-1.5 bg-white/90 hover:bg-white shadow-sm hover:shadow-md transition-all"
                                    style={{ borderColor: "var(--border-light)", color: "var(--text-medium)" }}
                                >
                                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 group-hover:bg-slate-200">
                                        <Image
                                            src={item.icon}
                                            alt={item.label}
                                            width={18}
                                            height={18}
                                            className="object-contain"
                                        />
                                    </span>
                                    <span className="flex flex-col leading-tight">
                                        <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">
                                            Mua ngay
                                        </span>
                                        <span className="text-xs font-semibold">
                                            {item.label}
                                        </span>
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Navigation Bar */}
            <div 
                ref={bottomNavRef}
                className={`transition-all duration-300 ${isMainNavFixed ? 'fixed top-0 left-0 right-0 z-50 shadow-lg' : ''}`}
                style={{
                    backgroundColor: "var(--brand-navy)",
                    color: "var(--text-inverse)",
                }}
            >
                <div className="container mx-auto px-1 lg:px-2">
                    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 lg:gap-10 py-3">
                        {navItems.map((item) => {
                            const IconComponent = item.icon;
                            return (
                                <Link
                                    key={item.id}
                                    href={item.path}
                                    className="flex items-center gap-0 sm:gap-1 lg:gap-2 transition-colors font-medium hover:opacity-80"
                                    style={{ color: "var(--text-inverse)" }}
                                >
                                    {IconComponent && (
                                        <IconComponent 
                                            className="w-3 h-3 lg:w-5 lg:h-5 flex-shrink-0"
                                            style={{ color: "var(--icon-main)" }}
                                        />
                                    )}
                                    <span className="text-[5px] sm:text-[10px] lg:text-[12px] xl:text-base">{item.label}</span>
                                    {item.hasDropdown && (
                                        <HiChevronDown className="w-3 h-3 lg:w-5 lg:h-5 flex-shrink-0" />
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Spacer to prevent content jump when nav is fixed */}
            {isMainNavFixed && (
                <div className="h-14"></div>
            )}
        </nav>
    );
};

export default Navbar;
