"use client";

import Link from "next/link";
import {useEffect, useRef, useState} from "react";
import Image from "next/image";
import { HiHome, HiShoppingBag, HiViewGrid, HiBookOpen, HiMail, HiInformationCircle, HiChevronDown } from "react-icons/hi";
import "@/styles/santa-animations.css";
import { usePublicCategories } from "@/app/(site)/_hooks";
import SearchBar from "./SearchBar";

const Navbar = () => {
    const [isMainNavFixed, setIsMainNavFixed] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const headerRef = useRef<HTMLDivElement | null>(null);
    const bottomNavRef = useRef<HTMLDivElement | null>(null);
    const {
        categories,
        loading: categoriesLoading,
        error: categoriesError,
        reload: reloadCategories,
    } = usePublicCategories();

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

    const navItems = [
        {id: 'home', label: 'TRANG CHỦ', path: '/', icon: HiHome},
        {id: 'products', label: 'TẤT CẢ SẢN PHẨM', path: '/products', icon: HiShoppingBag},
        {id: 'categories', label: 'DANH MỤC', path: '/categories', hasDropdown: true, icon: HiViewGrid},
        {id: 'blog', label: 'BLOG HƯỚNG DẪN KỸ THUẬT', path: '/blog', icon: HiBookOpen},
        {id: 'contact', label: 'DỊCH VỤ', path: '/about', icon: HiMail},
        {id: 'about', label: 'GIỚI THIỆU', path: '/about', icon: HiInformationCircle},
    ];

    return (
        <nav
                className="relative shadow-lg overflow-visible"
                ref={headerRef}
                style={{ backgroundColor: "var(--bg-light)", color: "var(--text-dark)" }}
            >
                {/* Animated Santa Claus in Corner */}
                <div 
                    className="fixed top-2 right-2 sm:top-10 lg:top-24 sm:right-4 z-[60] pointer-events-none santa-container"
                >
                    <div className="relative">
                        <svg 
                            width="70" 
                            height="70" 
                            viewBox="0 0 100 100" 
                            className="drop-shadow-lg santa-svg"
                            style={{
                                filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.4))'
                            }}
                        >
                            {/* Santa Hat */}
                            <path d="M50 5 L20 35 L15 30 L10 35 L5 30 L0 35 L0 25 Q0 5 15 5 L50 5 Z" fill="#DC2626"/>
                            <path d="M50 5 L20 35 L15 30 L10 35 L5 30 L0 35 L0 25 Q0 5 15 5 L50 5 Z" fill="#EF4444" opacity="0.8"/>
                            <circle cx="42" cy="22" r="4" fill="white"/>
                            <circle cx="38" cy="20" r="3" fill="white"/>
                            <circle cx="46" cy="20" r="2.5" fill="white"/>
                            
                            {/* Santa Face */}
                            <circle cx="50" cy="50" r="28" fill="#FED7AA" stroke="#FBBF24" strokeWidth="1"/>
                            <circle cx="42" cy="42" r="5" fill="#1F2937"/>
                            <circle cx="58" cy="42" r="5" fill="#1F2937"/>
                            <circle cx="44" cy="44" r="2" fill="white"/>
                            <circle cx="60" cy="44" r="2" fill="white"/>
                            <ellipse cx="50" cy="55" rx="10" ry="6" fill="#DC2626"/>
                            
                            {/* Beard */}
                            <path d="M50 58 Q35 75 30 82 Q42 78 50 70 Q58 78 70 82 Q65 75 50 58 Z" fill="white" opacity="0.95"/>
                            <path d="M50 60 Q40 72 36 78 Q45 75 50 68 Q55 75 64 78 Q60 72 50 60 Z" fill="#F3F4F6"/>
                            
                            {/* Body */}
                            <ellipse cx="50" cy="88" rx="22" ry="18" fill="#DC2626"/>
                            <ellipse cx="50" cy="88" rx="20" ry="16" fill="#EF4444" opacity="0.7"/>
                            
                            {/* Belt */}
                            <rect x="30" y="80" width="40" height="8" fill="#1F2937"/>
                            <rect x="45" y="82" width="10" height="4" fill="#FBBF24"/>
                            
                            {/* Sparkles for festive effect */}
                            <circle cx="15" cy="15" r="1.5" fill="#FBBF24" opacity="0.8">
                                <animate attributeName="opacity" values="0.3;1;0.3" dur="1.5s" repeatCount="indefinite"/>
                            </circle>
                            <circle cx="85" cy="20" r="1.5" fill="#FBBF24" opacity="0.8">
                                <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite"/>
                            </circle>
                            <circle cx="20" cy="85" r="1.5" fill="#FBBF24" opacity="0.8">
                                <animate attributeName="opacity" values="0.3;1;0.3" dur="1.8s" repeatCount="indefinite"/>
                            </circle>
                        </svg>
                </div>
            </div>

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
                        {/* Top Row - Logo + Action Icons (Mobile) / Logo Only (Desktop) */}
                        <div className="flex items-center justify-between w-full lg:w-auto lg:justify-start gap-2 lg:gap-4 flex-shrink-0">
                            {/* Left - Logo */}
                            <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                                <div
                                    className="flex items-center justify-center rounded-xl"
                                >
                                    <Image
                                        src="/logo1.png"
                                        alt="Điện tử Tuấn Anh Logo"
                                        width={82}
                                        height={82}
                                        className="object-contain w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-[82px] lg:h-[82px]"
                                        priority
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <Link
                                        href="/"
                                        className="text-sm sm:text-lg font-bold leading-tight transition-all duration-200 hover:text-opacity-70"
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

                            {/* Action Icons - Mobile (top with logo) */}
                            <div className="flex items-center gap-1 lg:hidden">
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
                                        className="group flex items-center justify-center rounded-md border px-1 py-0.5 bg-white/90 hover:bg-white shadow-xs hover:shadow-sm transition-all"
                                        style={{ borderColor: "var(--border-light)", color: "var(--text-medium)" }}
                                        title={item.label}
                                    >
                                        <span className="flex h-4 w-4 items-center justify-center flex-shrink-0">
                                            <Image
                                                src={item.icon}
                                                alt={item.label}
                                                width={12}
                                                height={12}
                                                className="object-contain w-3 h-3"
                                            />
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Middle - Search Bar */}
                        <div className={"flex-1 w-full lg:max-w-2xl"}>
                            <SearchBar />
                        </div>

                        {/* Right - Action Icons - Desktop */}
                        <div className="hidden lg:flex items-center gap-2">
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
                                    className="group flex items-center gap-1 rounded-lg border px-2 py-1 bg-white/90 hover:bg-white shadow-xs hover:shadow-sm transition-all"
                                    style={{ borderColor: "var(--border-light)", color: "var(--text-medium)" }}
                                    title={item.label}
                                >
                                    <span className="flex h-6 w-6 items-center justify-center flex-shrink-0">
                                        <Image
                                            src={item.icon}
                                            alt={item.label}
                                            width={20}
                                            height={20}
                                            className="object-contain w-5 h-5"
                                        />
                                    </span>
                                    <span className="text-[10px] font-medium leading-tight whitespace-nowrap">
                                        {item.label}
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
                                <div
                                    key={item.id}
                                    className="relative"
                                    onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.id)}
                                    onMouseLeave={() => item.hasDropdown && setActiveDropdown(null)}
                                >
                                    <Link
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
                                        <span className="text-[6px] sm:text-[10px] lg:text-[14px] xl:text-base">{item.label}</span>
                                        {item.hasDropdown && (
                                            <HiChevronDown className="w-3 h-3 lg:w-5 lg:h-5 flex-shrink-0" />
                                        )}
                                    </Link>

                                    {item.id === "categories" && (
                                        <div
                                            className={`absolute left-1/2 z-[70] mt-2 w-max -translate-x-1/2 rounded-lg border bg-white text-slate-800 shadow-xl transition-all duration-200 ${
                                                activeDropdown === item.id
                                                    ? "visible opacity-100 translate-y-0"
                                                    : "invisible opacity-0 -translate-y-1"
                                            }`}
                                            style={{ borderColor: "var(--border-light)" }}
                                        >
                                            <div className="px-3 py-2 border-b text-xs font-semibold uppercase tracking-wide text-slate-600"
                                                 style={{ borderColor: "var(--border-light)" }}>
                                                Danh mục sản phẩm
                                            </div>

                                            <div className="max-h-72 overflow-auto">
                                                {categoriesLoading && (
                                                    <p className="px-3 py-2 text-xs text-slate-500">
                                                        Đang tải danh mục...
                                                    </p>
                                                )}

                                                {categoriesError && !categoriesLoading && (
                                                    <div className="px-3 py-2 text-xs text-red-600 space-y-1">
                                                        <p>Không thể tải danh mục.</p>
                                                        <button
                                                            type="button"
                                                            onClick={() => reloadCategories()}
                                                            className="text-[11px] font-semibold text-[var(--brand-navy)] hover:underline"
                                                        >
                                                            Thử lại
                                                        </button>
                                                    </div>
                                                )}

                                                {!categoriesLoading && !categoriesError && categories.length === 0 && (
                                                    <p className="px-3 py-2 text-xs text-slate-500">
                                                        Chưa có danh mục.
                                                    </p>
                                                )}

                                                {!categoriesLoading && !categoriesError && categories.length > 0 && (
                                                    <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-0.5 py-1">
                                                        {categories.map((category) => (
                                                            <li key={category.id}>
                                                                <Link
                                                                    href={`/?category=${category.slug}`}
                                                                    className="flex items-center justify-between gap-2 px-3 py-2 text-xs hover:bg-slate-100 transition-colors rounded"
                                                                    onClick={() => setActiveDropdown(null)}
                                                                >
                                                                    <span className="text-slate-800 line-clamp-1">{category.name}</span>
                                                                    {typeof category.productCount === "number" && (
                                                                        <span className="ml-2 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] text-slate-600">
                                                                            {category.productCount}
                                                                        </span>
                                                                    )}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
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
