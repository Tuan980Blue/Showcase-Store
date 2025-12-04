import React from 'react';
import Link from 'next/link';
import Image from "next/image";

const Footer = () => {
    return (
        <footer
            className="text-sm border-t-2"
            style={{ backgroundColor: "var(--bg-light)", color: "var(--text-dark)" }}
        >
            {/* Top Section - Navigation Links */}
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    {/* CHÍNH SÁCH (POLICIES) */}
                    <div>
                        <h3
                            className="font-bold text-lg mb-4"
                            style={{ color: "var(--brand-navy)" }}
                        >
                            CHÍNH SÁCH
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/chinh-sach/van-chuyen"
                                    className="hover:underline"
                                    style={{ color: "var(--text-medium)" }}
                                >
                                    Chính sách vận chuyển
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/chinh-sach/bao-hanh"
                                    className="hover:underline"
                                    style={{ color: "var(--text-medium)" }}
                                >
                                    Chính sách bảo hành
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/chinh-sach/doi-tra"
                                    className="hover:underline"
                                    style={{ color: "var(--text-medium)" }}
                                >
                                    Chính sách đổi trả
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/chinh-sach/bao-mat"
                                    className="hover:underline"
                                    style={{ color: "var(--text-medium)" }}
                                >
                                    Chính sách bảo mật
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* HỖ TRỢ (SUPPORT) */}
                    <div>
                        <h3
                            className="font-bold text-lg mb-4"
                            style={{ color: "var(--brand-navy)" }}
                        >
                            HỖ TRỢ
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/huong-dan/mua-hang"
                                    className="hover:underline"
                                    style={{ color: "var(--text-medium)" }}
                                >
                                    Hướng dẫn mua hàng
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/lien-he"
                                    className="hover:underline"
                                    style={{ color: "var(--text-medium)" }}
                                >
                                    Thông tin liên hệ
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/yeu-thich"
                                    className="hover:underline"
                                    style={{ color: "var(--text-medium)" }}
                                >
                                    Sản phẩm yêu thích
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/so-sanh"
                                    className="hover:underline"
                                    style={{ color: "var(--text-medium)" }}
                                >
                                    So sánh sản phẩm
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* TÀI KHOẢN (ACCOUNT) */}
                    <div>
                        <h3
                            className="font-bold text-lg mb-4"
                            style={{ color: "var(--brand-navy)" }}
                        >
                            TÀI KHOẢN
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/dang-ky"
                                    className="hover:underline"
                                    style={{ color: "var(--text-medium)" }}
                                >
                                    Đăng ký tài khoản
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/dang-nhap"
                                    className="hover:underline"
                                    style={{ color: "var(--text-medium)" }}
                                >
                                    Đăng nhập tài khoản
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/gio-hang"
                                    className="hover:underline"
                                    style={{ color: "var(--text-medium)" }}
                                >
                                    Giỏ hàng của bạn
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* THÔNG TIN (INFORMATION) */}
                    <div>
                        <h3
                            className="font-bold text-lg mb-4"
                            style={{ color: "var(--brand-navy)" }}
                        >
                            THÔNG TIN
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/channel"
                                    className="hover:underline"
                                    style={{ color: "var(--text-medium)" }}
                                >
                                    Tuan Anh Shop
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/bai-viet"
                                    className="hover:underline"
                                    style={{ color: "var(--text-medium)" }}
                                >
                                    Bài viết
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/doi-tac"
                                    className="hover:underline"
                                    style={{ color: "var(--text-medium)" }}
                                >
                                    Đối tác
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/tuyen-dung"
                                    className="hover:underline"
                                    style={{ color: "var(--text-medium)" }}
                                >
                                    Tuyển dụng & Quảng cáo
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section - Company Details and Contact */}
                <div
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-8 border-t"
                    style={{ borderColor: "var(--border-light)" }}
                >
                    {/* Left Side - Company Info */}
                    <div>
                        {/* Logo */}
                        <div className="mb-4">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="flex items-center gap-2">
                                    <Image src="/logo1.png" alt="LOGO SHOP" width={90} height={90} className="object-contain"/>
                                </div>
                                <div>
                                    <h2
                                        className="font-bold text-xl"
                                        style={{ color: "var(--brand-navy)" }}
                                    >
                                        Tuan Anh SHOP
                                    </h2>
                                    <p
                                        className="text-sm"
                                        style={{ color: "var(--brand-green)" }}
                                    >
                                        ĐIỆN TỬ & DA DỤNG
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Company Description */}
                        <p
                            className="text-sm mb-4 leading-relaxed"
                            style={{ color: "var(--text-medium)" }}
                        >
                            Tuan Anh shop là cửa hàng chuyên bán các sản phẩm Điện tử & Da dụng:
                            Camera, Máy đo huyết áp, Chuột, Động cơ, Rửa xe, Đèn trang trí,...
                        </p>

                        {/* Certification Badge */}
                        <div className="mb-4">

                        </div>
                    </div>

                    {/* Right Side - Contact Information */}
                    <div>
                        <h3
                            className="font-bold text-lg mb-4"
                            style={{ color: "var(--brand-navy)" }}
                        >
                            THÔNG TIN LIÊN HỆ
                        </h3>
                        <div
                            className="space-y-2 text-sm"
                            style={{ color: "var(--text-medium)" }}
                        >
                            <p>
                                <span className="font-semibold">Địa chỉ:</span> 451 Âu Dương Lân, Phường Chánh Hưng, TP.HCM
                                (địa chỉ cũ là P.3, Q.8, TP.HCM)
                            </p>
                            <p>
                                <span className="font-semibold">Giờ làm việc:</span> Thứ 2 - Thứ 7: 8h00 đến 18h30, Chủ Nhật nghỉ.
                            </p>
                            <p>
                                <span className="font-semibold">Email:</span> contact.dientutuananh@gmail.com
                            </p>
                            <p>
                                <span className="font-semibold">Hotline:</span> 000.0000.0000
                            </p>
                            <p>
                                <span className="font-semibold">Zalo (nhắn tin):</span> 000.0000.0000 - 000.0000.0000
                            </p>
                            <p
                                className="text-xs italic mt-3"
                                style={{ color: "var(--text-light)" }}
                            >
                                Xin Quý Khách ưu tiên nhắn tin qua Zalo/Facebook giúp shop có thời gian tra cứu và trả lời chính xác
                                vì lượng thông tin ngành hàng Kỹ Thuật là rất lớn.
                            </p>
                        </div>

                        {/* Social Media Buttons */}
                        <div className="mt-6 flex space-x-3">
                            {/* Shoppe Button */}
                            <a
                                href="https://youtube.com/@hshop"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 px-4 py-2 rounded transition-colors"
                                style={{
                                    color: "var(--text-inverse)",
                                }}
                            >

                                <span className="font-semibold">Shoppe</span>
                                <div className="ml-auto text-xs">Điện tử Tuấn Anh</div>
                            </a>

                            {/* Tiktok Button */}
                            <a
                                href="https://facebook.com/hshopvn"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 px-4 py-2 rounded transition-colors"
                                style={{
                                    color: "var(--text-inverse)",
                                }}
                            >

                                <span className="font-semibold">Tiktok Shop</span>
                                <div className="ml-auto text-xs">Điện tử Tuấn Anh</div>
                            </a>

                            {/* Zalo Button */}
                            <a
                                href="https://facebook.com/hshopvn"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-3 px-4 py-2 rounded transition-colors"
                                style={{
                                    color: "var(--text-inverse)",
                                }}
                            >

                                <span className="font-semibold">Zalo</span>
                                <div className="ml-auto text-xs">000.0000.0000</div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottommost Bar - Copyright */}
            <div
                className="py-3"
                style={{ backgroundColor: "var(--brand-navy)", color: "var(--text-inverse)" }}
            >
                <div className="container mx-auto px-4 text-center text-sm">
                    © by tuananhshop.vn, nội dung website được tuananhshop.vn tự xây dựng, nếu sử dụng thông tin xin vui lòng ghi rõ nguồn, xin cảm ơn.
                </div>
            </div>
        </footer>
    );
};

export default Footer;