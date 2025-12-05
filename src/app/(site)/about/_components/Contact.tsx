"use client";

import React from 'react';

const Contact = () => {
    const phoneNumber = "0941210212";
    const zaloLink = `https://zalo.me/${phoneNumber}`;
    const googleMapsLink = "https://maps.google.com/?q=451+Âu+Dương+Lân,+Phường+Chánh+Hưng,+TP.HCM";

    return (
        <div>
            <section
                id="contact"
                className="py-1 sm:py-4 md:py-6 lg:py-8 xl:py-12 relative overflow-hidden"
                style={{
                    background: "linear-gradient(135deg, var(--brand-navy) 0%, #0d3a5c 100%)"
                }}
            >
                {/* Decorative Background Elements */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 left-0 w-64 h-64 rounded-full" style={{ background: "var(--brand-green)", filter: "blur(80px)" }}></div>
                    <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full" style={{ background: "var(--brand-green)", filter: "blur(80px)" }}></div>
                </div>

                <div className="container mx-auto px-1 sm:px-4 md:px-6 lg:px-8 relative z-10">
                    <div className="max-w-6xl mx-auto">
                        {/* Header */}
                        <div className="text-center mb-1 sm:mb-4 md:mb-6 lg:mb-8">
                            <h2
                                className="text-[10px] sm:text-sm md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-bold mb-0.5 sm:mb-2 md:mb-3"
                                style={{ color: "var(--text-inverse)" }}
                            >
                                Thông Tin Liên Hệ
                            </h2>
                            <div
                                className="w-6 sm:w-12 md:w-16 lg:w-20 xl:w-24 h-0.5 sm:h-1 mx-auto rounded-full mb-1 sm:mb-3"
                                style={{ backgroundColor: "var(--brand-green)" }}
                            ></div>
                            <p
                                className="text-[6px] sm:text-[9px] md:text-xs lg:text-sm xl:text-base max-w-2xl mx-auto leading-tight"
                                style={{ color: "var(--text-inverse)", opacity: 0.9 }}
                            >
                                Liên hệ với chúng tôi qua nhiều kênh khác nhau. Chúng tôi luôn sẵn sàng hỗ trợ bạn!
                            </p>
                        </div>

                        {/* Contact Cards Grid */}
                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-1 sm:gap-3 md:gap-4 lg:gap-6 mb-1.5 sm:mb-4 md:mb-6">
                            {/* Address Card */}
                            <div
                                className="group p-1.5 sm:p-4 md:p-5 lg:p-6 rounded-md sm:rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                                style={{
                                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                                    backdropFilter: "blur(10px)",
                                    border: "1px solid rgba(255, 255, 255, 0.2)",
                                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
                                }}
                            >
                                <div className="flex items-start gap-1 sm:gap-3 mb-1 sm:mb-3">
                                    <div
                                        className="w-5 h-5 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                                        style={{ 
                                            backgroundColor: "rgba(51, 204, 102, 0.2)",
                                            border: "2px solid var(--brand-green)"
                                        }}
                                    >
                                        <svg className="w-2.5 h-2.5 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 20 20" style={{ color: "var(--brand-green)" }}>
                                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <h3
                                            className="text-[7px] sm:text-xs md:text-sm lg:text-base xl:text-lg font-bold mb-0.5 sm:mb-1.5"
                                            style={{ color: "var(--text-inverse)" }}
                                        >
                                            Địa Chỉ Cửa Hàng
                                        </h3>
                                        <a
                                            href={googleMapsLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block text-[6px] sm:text-[9px] md:text-xs lg:text-sm xl:text-base leading-tight transition-opacity hover:opacity-80"
                                            style={{ color: "var(--text-inverse)", opacity: 0.95 }}
                                        >
                                            451 Âu Dương Lân<br />
                                            Phường Chánh Hưng, TP.HCM<br />
                                            <span className="text-[5px] sm:text-[8px] md:text-[9px] lg:text-xs italic opacity-75">
                                                (Địa chỉ cũ: P.3, Q.8, TP.HCM)
                                            </span>
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Email Card */}
                            <div
                                className="group p-1.5 sm:p-4 md:p-5 lg:p-6 rounded-md sm:rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                                style={{
                                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                                    backdropFilter: "blur(10px)",
                                    border: "1px solid rgba(255, 255, 255, 0.2)",
                                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
                                }}
                            >
                                <div className="flex items-start gap-1 sm:gap-3 mb-1 sm:mb-3">
                                    <div
                                        className="w-5 h-5 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                                        style={{ 
                                            backgroundColor: "rgba(51, 204, 102, 0.2)",
                                            border: "2px solid var(--brand-green)"
                                        }}
                                    >
                                        <svg className="w-2.5 h-2.5 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 20 20" style={{ color: "var(--brand-green)" }}>
                                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <h3
                                            className="text-[7px] sm:text-xs md:text-sm lg:text-base xl:text-lg font-bold mb-0.5 sm:mb-1.5"
                                            style={{ color: "var(--text-inverse)" }}
                                        >
                                            Email
                                        </h3>
                                        <a
                                            href="mailto:dientutuananhhcm@gmail.com"
                                            className="block text-[6px] sm:text-[9px] md:text-xs lg:text-sm xl:text-base leading-tight transition-opacity hover:opacity-80 break-all"
                                            style={{ color: "var(--text-inverse)", opacity: 0.95 }}
                                        >
                                            dientutuananhhcm@gmail.com
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Phone/Zalo Card */}
                            <div
                                className="group p-1.5 sm:p-4 md:p-5 lg:p-6 rounded-md sm:rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                                style={{
                                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                                    backdropFilter: "blur(10px)",
                                    border: "1px solid rgba(255, 255, 255, 0.2)",
                                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
                                }}
                            >
                                <div className="flex items-start gap-1 sm:gap-3 mb-1 sm:mb-3">
                                    <div
                                        className="w-5 h-5 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                                        style={{ 
                                            backgroundColor: "rgba(51, 204, 102, 0.2)",
                                            border: "2px solid var(--brand-green)"
                                        }}
                                    >
                                        <svg className="w-2.5 h-2.5 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 20 20" style={{ color: "var(--brand-green)" }}>
                                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <h3
                                            className="text-[7px] sm:text-xs md:text-sm lg:text-base xl:text-lg font-bold mb-0.5 sm:mb-1.5"
                                            style={{ color: "var(--text-inverse)" }}
                                        >
                                            Hotline / Zalo
                                        </h3>
                                        <a
                                            href={`tel:${phoneNumber}`}
                                            className="block text-[6px] sm:text-[9px] md:text-xs lg:text-sm xl:text-base leading-tight transition-opacity hover:opacity-80 mb-0.5 sm:mb-1"
                                            style={{ color: "var(--text-inverse)", opacity: 0.95 }}
                                        >
                                            {phoneNumber}
                                        </a>
                                        <a
                                            href={zaloLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-0.5 sm:gap-1 text-[5px] sm:text-[8px] md:text-[9px] lg:text-xs transition-opacity hover:opacity-80"
                                            style={{ color: "var(--brand-green)" }}
                                        >
                                            <span>Nhắn tin Zalo</span>
                                            <svg className="w-2 h-2 sm:w-3 sm:h-3" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Social Media & E-commerce Platforms */}
                        <div className="mb-1.5 sm:mb-4 md:mb-6">
                            <h3
                                className="text-[7px] sm:text-xs md:text-sm lg:text-base xl:text-lg font-bold mb-1 sm:mb-3 text-center"
                                style={{ color: "var(--text-inverse)" }}
                            >
                                Mua Hàng Trực Tuyến
                            </h3>
                            <div className="flex flex-wrap justify-center gap-1 sm:gap-3 md:gap-4">
                                {/* Shopee Button */}
                                <a
                                    href="https://vn.shp.ee/E74Wp9t"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center gap-1 sm:gap-2 px-2 sm:px-4 md:px-5 lg:px-6 py-1 sm:py-2.5 md:py-3 rounded-md sm:rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl"
                                    style={{
                                        backgroundColor: "#EE4D2D",
                                        color: "#ffffff",
                                        boxShadow: "0 4px 12px rgba(238, 77, 45, 0.3)"
                                    }}
                                >
                                    <svg className="w-3 h-3 sm:w-5 sm:h-5 md:w-6 md:h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                                    </svg>
                                    <span className="font-semibold text-[6px] sm:text-[9px] md:text-xs lg:text-sm whitespace-nowrap">Shopee</span>
                                </a>

                                {/* TikTok Shop Button */}
                                <a
                                    href="https://vt.tiktok.com/ZSHTcp7yt31UR-XNxQ0/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center gap-1 sm:gap-2 px-2 sm:px-4 md:px-5 lg:px-6 py-1 sm:py-2.5 md:py-3 rounded-md sm:rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl"
                                    style={{
                                        backgroundColor: "#000000",
                                        color: "#ffffff",
                                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)"
                                    }}
                                >
                                    <svg className="w-3 h-3 sm:w-5 sm:h-5 md:w-6 md:h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                                    </svg>
                                    <span className="font-semibold text-[6px] sm:text-[9px] md:text-xs lg:text-sm whitespace-nowrap">TikTok Shop</span>
                                </a>

                                {/* Zalo Button */}
                                <a
                                    href={zaloLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center gap-1 sm:gap-2 px-2 sm:px-4 md:px-5 lg:px-6 py-1 sm:py-2.5 md:py-3 rounded-md sm:rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl"
                                    style={{
                                        backgroundColor: "#0068FF",
                                        color: "#ffffff",
                                        boxShadow: "0 4px 12px rgba(0, 104, 255, 0.3)"
                                    }}
                                >
                                    <svg className="w-3 h-3 sm:w-5 sm:h-5 md:w-6 md:h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                    </svg>
                                    <span className="font-semibold text-[6px] sm:text-[9px] md:text-xs lg:text-sm whitespace-nowrap">Zalo</span>
                                </a>
                            </div>
                        </div>

                        {/* Working Hours & Quick Actions */}
                        <div className="grid grid-cols-2 gap-1 sm:gap-3 md:gap-4">
                            {/* Working Hours */}
                            <div
                                className="p-1.5 sm:p-4 md:p-5 lg:p-6 rounded-md sm:rounded-xl text-center transition-all duration-300 hover:scale-105"
                                style={{
                                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                                    backdropFilter: "blur(10px)",
                                    border: "1px solid rgba(255, 255, 255, 0.2)",
                                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
                                }}
                            >
                                <div className="flex items-center justify-center gap-1 sm:gap-3 mb-1 sm:mb-3">
                                    <div
                                        className="w-5 h-5 sm:w-10 sm:h-10 rounded-full flex items-center justify-center"
                                        style={{ backgroundColor: "rgba(51, 204, 102, 0.2)" }}
                                    >
                                        <svg className="w-2.5 h-2.5 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 20 20" style={{ color: "var(--brand-green)" }}>
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <h3
                                        className="text-[7px] sm:text-xs md:text-sm lg:text-base xl:text-lg font-bold"
                                        style={{ color: "var(--text-inverse)" }}
                                    >
                                        Giờ Làm Việc
                                    </h3>
                                </div>
                                <div className="space-y-0.5 sm:space-y-1">
                                    <p
                                        className="text-[6px] sm:text-[9px] md:text-xs lg:text-sm xl:text-base leading-tight font-medium"
                                        style={{ color: "var(--text-inverse)", opacity: 0.95 }}
                                    >
                                        Thứ 2 - Thứ 7: <span style={{ color: "var(--brand-green)" }}>8h00 - 18h30</span>
                                    </p>
                                    <p
                                        className="text-[6px] sm:text-[9px] md:text-xs lg:text-sm xl:text-base leading-tight"
                                        style={{ color: "var(--text-inverse)", opacity: 0.85 }}
                                    >
                                        Chủ Nhật: Nghỉ
                                    </p>
                                </div>
                            </div>

                            {/* Quick Contact CTA */}
                            <div
                                className="p-1.5 sm:p-4 md:p-5 lg:p-6 rounded-md sm:rounded-xl text-center transition-all duration-300 hover:scale-105"
                                style={{
                                    backgroundColor: "rgba(51, 204, 102, 0.15)",
                                    backdropFilter: "blur(10px)",
                                    border: "2px solid var(--brand-green)",
                                    boxShadow: "0 4px 12px rgba(51, 204, 102, 0.2)"
                                }}
                            >
                                <h3
                                    className="text-[7px] sm:text-xs md:text-sm lg:text-base xl:text-lg font-bold mb-1 sm:mb-3"
                                    style={{ color: "var(--text-inverse)" }}
                                >
                                    Cần Hỗ Trợ Ngay?
                                </h3>
                                <p
                                    className="text-[6px] sm:text-[9px] md:text-xs lg:text-sm xl:text-base leading-tight mb-1 sm:mb-3"
                                    style={{ color: "var(--text-inverse)", opacity: 0.9 }}
                                >
                                    Liên hệ với chúng tôi qua Zalo để được tư vấn nhanh nhất
                                </p>
                                <a
                                    href={zaloLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 sm:gap-2 px-2 sm:px-5 md:px-6 py-1 sm:py-2.5 md:py-3 rounded-md sm:rounded-xl font-semibold text-[6px] sm:text-[9px] md:text-xs lg:text-sm transition-all duration-300 hover:scale-105"
                                    style={{
                                        backgroundColor: "var(--brand-green)",
                                        color: "var(--text-inverse)",
                                        boxShadow: "0 4px 12px rgba(51, 204, 102, 0.4)"
                                    }}
                                >
                                    <svg className="w-2.5 h-2.5 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                    </svg>
                                    <span>Nhắn Tin Zalo Ngay</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;