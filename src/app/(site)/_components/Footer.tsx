import React from 'react';
import Link from 'next/link';
import Image from "next/image";
import EnhancedPopcornAnimation from "@/app/(site)/_components/EnhancedPopcornAnimation";

const Footer = () => {
    return (
        <footer
            className="relative overflow-hidden"
            style={{ backgroundColor: "var(--bg-light)", color: "var(--text-dark)" }}
        >
            <EnhancedPopcornAnimation/>
            {/* Decorative top border */}
            <div 
                className="h-0.5 sm:h-1 w-full"
                style={{ background: "linear-gradient(90deg, var(--brand-navy) 0%, var(--brand-green) 100%)" }}
            />

            {/* Main Footer Content */}
            <div className="container mx-auto px-2 sm:px-4 lg:px-6 py-1.5 sm:py-4 lg:py-6">
                {/* Top Section - Navigation Links */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 lg:gap-6">
                    {/* CHÍNH SÁCH (POLICIES) */}
                    <div className="group">
                        <h3
                            className="font-bold text-[10px] sm:text-xs lg:text-base mb-1 sm:mb-2 lg:mb-3 pb-0.5 sm:pb-1 relative inline-block"
                            style={{ color: "var(--brand-navy)" }}
                        >
                            CHÍNH SÁCH
                            <span 
                                className="absolute bottom-0 left-0 w-6 sm:w-10 h-0.5 transition-all duration-300 group-hover:w-full"
                                style={{ backgroundColor: "var(--brand-green)" }}
                            />
                        </h3>
                        <ul className="space-y-1 sm:space-y-1.5 lg:space-y-2">
                            {[
                                { href: "/chinh-sach/van-chuyen", label: "Chính sách vận chuyển" },
                                { href: "/chinh-sach/bao-hanh", label: "Chính sách bảo hành" },
                                { href: "/chinh-sach/doi-tra", label: "Chính sách đổi trả" },
                                { href: "/chinh-sach/bao-mat", label: "Chính sách bảo mật" },
                            ].map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className="inline-block transition-all duration-200 hover:translate-x-1 group/link text-[10px] sm:text-xs lg:text-sm"
                                        style={{ color: "var(--text-medium)" }}
                                    >
                                        <span className="relative">
                                            {item.label}
                                            <span 
                                                className="absolute -bottom-0.5 left-0 w-0 h-0.5 transition-all duration-200 group-hover/link:w-full"
                                                style={{ backgroundColor: "var(--brand-green)" }}
                                            />
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* HỖ TRỢ (SUPPORT) */}
                    <div className="group">
                        <h3
                            className="font-bold text-[10px] sm:text-xs lg:text-base mb-1 sm:mb-2 lg:mb-3 pb-0.5 sm:pb-1 relative inline-block"
                            style={{ color: "var(--brand-navy)" }}
                        >
                            HỖ TRỢ
                            <span 
                                className="absolute bottom-0 left-0 w-6 sm:w-10 h-0.5 transition-all duration-300 group-hover:w-full"
                                style={{ backgroundColor: "var(--brand-green)" }}
                            />
                        </h3>
                        <ul className="space-y-1 sm:space-y-1.5 lg:space-y-2">
                            {[
                                { href: "/huong-dan/mua-hang", label: "Hướng dẫn mua hàng" },
                                { href: "/lien-he", label: "Thông tin liên hệ" },
                                { href: "/yeu-thich", label: "Sản phẩm yêu thích" },
                                { href: "/so-sanh", label: "So sánh sản phẩm" },
                            ].map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className="inline-block transition-all duration-200 hover:translate-x-1 group/link text-[10px] sm:text-xs lg:text-sm"
                                        style={{ color: "var(--text-medium)" }}
                                    >
                                        <span className="relative">
                                            {item.label}
                                            <span 
                                                className="absolute -bottom-0.5 left-0 w-0 h-0.5 transition-all duration-200 group-hover/link:w-full"
                                                style={{ backgroundColor: "var(--brand-green)" }}
                                            />
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* TÀI KHOẢN (ACCOUNT) */}
                    <div className="group">
                        <h3
                            className="font-bold text-[10px] sm:text-xs lg:text-base mb-1 sm:mb-2 lg:mb-3 pb-0.5 sm:pb-1 relative inline-block"
                            style={{ color: "var(--brand-navy)" }}
                        >
                            TÀI KHOẢN
                            <span 
                                className="absolute bottom-0 left-0 w-6 sm:w-10 h-0.5 transition-all duration-300 group-hover:w-full"
                                style={{ backgroundColor: "var(--brand-green)" }}
                            />
                        </h3>
                        <ul className="space-y-1 sm:space-y-1.5 lg:space-y-2">
                            {[
                                { href: "/dang-ky", label: "Đăng ký tài khoản" },
                                { href: "/dang-nhap", label: "Đăng nhập tài khoản" },
                                { href: "/gio-hang", label: "Giỏ hàng của bạn" },
                            ].map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className="inline-block transition-all duration-200 hover:translate-x-1 group/link text-[10px] sm:text-xs lg:text-sm"
                                        style={{ color: "var(--text-medium)" }}
                                    >
                                        <span className="relative">
                                            {item.label}
                                            <span 
                                                className="absolute -bottom-0.5 left-0 w-0 h-0.5 transition-all duration-200 group-hover/link:w-full"
                                                style={{ backgroundColor: "var(--brand-green)" }}
                                            />
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* THÔNG TIN (INFORMATION) */}
                    <div className="group">
                        <h3
                            className="font-bold text-[10px] sm:text-xs lg:text-base mb-1 sm:mb-2 lg:mb-3 pb-0.5 sm:pb-1 relative inline-block"
                            style={{ color: "var(--brand-navy)" }}
                        >
                            THÔNG TIN
                            <span 
                                className="absolute bottom-0 left-0 w-6 sm:w-10 h-0.5 transition-all duration-300 group-hover:w-full"
                                style={{ backgroundColor: "var(--brand-green)" }}
                            />
                        </h3>
                        <ul className="space-y-1 sm:space-y-1.5 lg:space-y-2">
                            {[
                                { href: "/channel", label: "Tuan Anh Shop" },
                                { href: "/bai-viet", label: "Bài viết" },
                                { href: "/doi-tac", label: "Đối tác" },
                                { href: "/tuyen-dung", label: "Tuyển dụng & Quảng cáo" },
                            ].map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className="inline-block transition-all duration-200 hover:translate-x-1 group/link text-[10px] sm:text-xs lg:text-sm"
                                        style={{ color: "var(--text-medium)" }}
                                    >
                                        <span className="relative">
                                            {item.label}
                                            <span 
                                                className="absolute -bottom-0.5 left-0 w-0 h-0.5 transition-all duration-200 group-hover/link:w-full"
                                                style={{ backgroundColor: "var(--brand-green)" }}
                                            />
                                        </span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div
                    className="h-px w-full my-1.5 sm:my-3 lg:my-5 opacity-20"
                    style={{ backgroundColor: "var(--border-light)" }}
                />

                {/* Bottom Section - Company Details and Contact */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-1.5 sm:gap-4 lg:gap-6">
                    {/* Left Side - Company Info */}
                    <div>
                        {/* Logo and Brand */}
                        <div className="mb-1.5 sm:mb-3">
                            <div className="flex items-start gap-1.5 sm:gap-3">
                                <div className="flex-shrink-0">
                                    <Image 
                                        src="/logo1.png" 
                                        alt="LOGO SHOP" 
                                        width={40}
                                        height={40}
                                        className="sm:w-[60px] sm:h-[60px] lg:w-[80px] lg:h-[80px] object-contain rounded-lg"
                                    />
                                </div>
                                <div className="pt-0.5 sm:pt-1">
                                    <h2
                                        className="font-bold text-xs sm:text-base lg:text-xl mb-0.5 sm:mb-1"
                                        style={{ color: "var(--brand-navy)" }}
                                    >
                                        Tuan Anh SHOP
                                    </h2>
                                    <p
                                        className="text-[10px] sm:text-xs lg:text-sm font-medium"
                                        style={{ color: "var(--brand-green)" }}
                                    >
                                        ĐIỆN TỬ & DA DỤNG
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Company Description */}
                        <p
                            className="text-[10px] sm:text-xs lg:text-sm mb-2 sm:mb-4 leading-relaxed"
                            style={{ color: "var(--text-medium)" }}
                        >
                            Tuan Anh shop là cửa hàng chuyên bán các sản phẩm Điện tử & Da dụng:
                            Camera, Máy đo huyết áp, Chuột, Động cơ, Rửa xe, Đèn trang trí,...
                        </p>

                        {/* Note */}
                        <div
                            className="p-1.5 sm:p-2 lg:p-3 rounded-lg mb-2 sm:mb-4"
                            style={{
                                backgroundColor: "rgba(var(--brand-navy-rgb, 0, 0, 0), 0.05)",
                                borderLeft: "3px solid var(--brand-green)"
                            }}
                        >
                            <p
                                className="text-[9px] sm:text-[10px] lg:text-xs italic leading-relaxed"
                                style={{ color: "var(--text-light)" }}
                            >
                                Xin Quý Khách ưu tiên nhắn tin qua Zalo/Tiktok giúp shop có thời gian tra cứu và trả lời chính xác
                                vì lượng thông tin ngành hàng Kỹ Thuật là rất lớn.
                            </p>
                        </div>
                        {/* Social Media Buttons */}
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            {/* Shoppe Button */}
                            <a
                                href="https://shopee.vn/anhtuan321996?uls_trackid=54bqaui200bi&utm_content=2UnvdcGse5iLmYmRzwPLqAXdDZFu"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group/social flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2 lg:px-3 py-1 sm:py-1.5 lg:py-2 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg"
                                style={{
                                    backgroundColor: "#EE4D2D",
                                    color: "#ffffff",
                                }}
                            >
                                <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                                </svg>
                                <span className="font-semibold text-[9px] sm:text-[10px] lg:text-xs whitespace-nowrap">Shoppe</span>
                                <span className="text-[8px] sm:text-[9px] opacity-90 hidden sm:inline">Điện tử Tuấn Anh</span>
                            </a>

                            {/* Tiktok Button */}
                            <a
                                href="https://tuananhhuflit.id.vn/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group/social flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2 lg:px-3 py-1 sm:py-1.5 lg:py-2 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg"
                                style={{
                                    backgroundColor: "#000000",
                                    color: "#ffffff",
                                }}
                            >
                                <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                                </svg>
                                <span className="font-semibold text-[9px] sm:text-[10px] lg:text-xs whitespace-nowrap">Tiktok</span>
                                <span className="text-[8px] sm:text-[9px] opacity-90 hidden sm:inline">Điện tử Tuấn Anh</span>
                            </a>

                            {/* Zalo Button */}
                            <a
                                href="https://zalo.me/0941210212"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group/social flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2 lg:px-3 py-1 sm:py-1.5 lg:py-2 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg"
                                style={{
                                    backgroundColor: "#0068FF",
                                    color: "#ffffff",
                                }}
                            >
                                <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 lg:w-4 lg:h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                </svg>
                                <span className="font-semibold text-[9px] sm:text-[10px] lg:text-xs whitespace-nowrap">Zalo</span>
                                <span className="text-[8px] sm:text-[9px] opacity-90 hidden sm:inline">094.121.0212</span>
                            </a>
                        </div>
                    </div>

                    {/* Right Side - Contact Information */}
                    <div>
                        <h3
                            className="font-bold text-xs sm:text-sm lg:text-base mb-2 sm:mb-3 lg:mb-4 pb-1 sm:pb-2 relative inline-block"
                            style={{ color: "var(--brand-navy)" }}
                        >
                            THÔNG TIN LIÊN HỆ
                            <span 
                                className="absolute bottom-0 left-0 w-10 sm:w-14 h-0.5"
                                style={{ backgroundColor: "var(--brand-green)" }}
                            />
                        </h3>
                        
                        <div className="space-y-1.5 sm:space-y-2 lg:space-y-3 mb-2 sm:mb-4 lg:mb-6">
                            {[
                                { 
                                    icon: "📍", 
                                    label: "Địa chỉ", 
                                    value: "451 Âu Dương Lân, Phường Chánh Hưng, TP.HCM (địa chỉ cũ là P.3, Q.8, TP.HCM)" 
                                },
                                { 
                                    icon: "🕐", 
                                    label: "Giờ làm việc", 
                                    value: "Thứ 2 - Thứ 7: 8h00 đến 18h30, Chủ Nhật nghỉ." 
                                },
                                { 
                                    icon: "✉️", 
                                    label: "Email", 
                                    value: "dientutuananhhcm@gmail.com",
                                    link: "dientutuananhhcm@gmail.com"
                                },
                                { 
                                    icon: "📞", 
                                    label: "Hotline", 
                                    value: "000.0000.0000",
                                    link: "tel:00000000000"
                                },
                            ].map((item, index) => (
                                <div key={index} className="flex gap-1.5 sm:gap-2 items-start">
                                    <span className="text-xs sm:text-sm lg:text-base flex-shrink-0 mt-0.5">{item.icon}</span>
                                    <div className="flex-1 min-w-0">
                                        <span className="font-semibold text-[10px] sm:text-xs lg:text-sm block mb-0.5" style={{ color: "var(--brand-navy)" }}>
                                            {item.label}:
                                        </span>
                                        {item.link ? (
                                            <a 
                                                href={item.link}
                                                className="text-[10px] sm:text-xs lg:text-sm transition-colors hover:opacity-80 break-words"
                                                style={{ color: "var(--text-medium)" }}
                                            >
                                                {item.value}
                                            </a>
                                        ) : (
                                            <p className="text-[10px] sm:text-xs lg:text-sm break-words" style={{ color: "var(--text-medium)" }}>
                                                {item.value}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottommost Bar - Copyright */}
            <div
                className="py-1.5 sm:py-2 lg:py-3 relative"
                style={{ backgroundColor: "var(--brand-navy)", color: "var(--text-inverse)" }}
            >
                <div className="container mx-auto px-2 sm:px-4 lg:px-6">
                    <p className="text-center text-[9px] sm:text-[10px] lg:text-xs leading-relaxed">
                        © by Tuan Anh Junior, nội dung website được https://tuananhhuflit.id.vn tự xây dựng, nếu sử dụng thông tin xin vui lòng ghi rõ nguồn, xin cảm ơn.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;