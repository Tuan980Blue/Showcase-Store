"use client";

import React from 'react';
import Image from 'next/image';
import {
    HiShieldCheck,
    HiLightningBolt,
    HiHeart,
    HiTrendingUp,
    HiShoppingBag,
    HiSupport,
    HiGlobeAlt,
    HiCheckCircle
} from 'react-icons/hi';
import Contact from "@/app/(site)/about/_components/Contact";

const AboutPage = () => {
    const features = [
        {
            icon: HiShieldCheck,
            title: "Chất Lượng Đảm Bảo",
            description: "Cam kết sản phẩm chính hãng, chất lượng cao với chế độ bảo hành rõ ràng"
        },
        {
            icon: HiLightningBolt,
            title: "Giao Hàng Nhanh",
            description: "Vận chuyển nhanh chóng, đảm bảo sản phẩm đến tay khách hàng trong thời gian ngắn nhất"
        },
        {
            icon: HiHeart,
            title: "Tư Vấn Tận Tâm",
            description: "Đội ngũ tư vấn chuyên nghiệp, hỗ trợ khách hàng 24/7 qua Zalo và các kênh liên hệ"
        },
        {
            icon: HiTrendingUp,
            title: "Giá Cả Hợp Lý",
            description: "Cung cấp sản phẩm với mức giá cạnh tranh, phù hợp với mọi đối tượng khách hàng"
        }
    ];

    const stats = [
        {number: "10+", label: "Năm Kinh Nghiệm"},
        {number: "50K+", label: "Khách Hàng Hài Lòng"},
        {number: "1000+", label: "Sản Phẩm Đa Dạng"},
        {number: "24/7", label: "Hỗ Trợ Khách Hàng"}
    ];

    const values = [
        {
            title: "Sứ Mệnh",
            description: "Mang đến cho khách hàng những sản phẩm điện tử và gia dụng chất lượng cao với giá cả hợp lý, cùng dịch vụ chăm sóc khách hàng tận tâm và chuyên nghiệp."
        },
        {
            title: "Tầm Nhìn",
            description: "Trở thành địa chỉ tin cậy hàng đầu trong lĩnh vực điện tử và gia dụng tại Việt Nam, được khách hàng yêu mến và tin tưởng."
        },
        {
            title: "Giá Trị Cốt Lõi",
            description: "Chất lượng - Uy tín - Tận tâm. Chúng tôi luôn đặt lợi ích và sự hài lòng của khách hàng lên hàng đầu trong mọi hoạt động kinh doanh."
        }
    ];

    const services = [
        "Camera an ninh, giám sát",
        "Máy đo huyết áp điện tử",
        "Chuột máy tính, phụ kiện",
        "Động cơ, motor điện",
        "Thiết bị rửa xe",
        "Đèn trang trí, chiếu sáng",
        "IC, linh kiện điện tử",
        "Sạc dự phòng"
    ];

    return (
        <div className="min-h-[80vh]" style={{backgroundColor: "var(--bg-light)"}}>
            {/* Hero Section */}
            <section
                className="relative overflow-hidden py-2 sm:py-8 md:py-12 lg:py-16 xl:py-24"
            >
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/background-about.png"
                        alt="Background"
                        fill
                        className="object-cover"
                        priority
                        quality={90}
                        style={{
                            objectPosition: "center"
                        }}
                    />
                </div>

                <div className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-8 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <div
                            className="p-3 sm:p-4 md:p-5 lg:p-6 xl:p-8 rounded-lg sm:rounded-xl md:rounded-2xl backdrop-blur-sm mb-2 sm:mb-4 md:mb-6"
                            style={{
                                backgroundColor: "rgba(255, 255, 255, 0.1)",
                                boxShadow: "0 4px 12px var(--shadow-soft)"
                            }}
                        >
                            <div className={"flex items-center justify-center gap-2"}>
                                <Image
                                    src="/logo1.png"
                                    alt="Điện tử Tuấn Anh Logo"
                                    width={120}
                                    height={120}
                                    className="object-contain rounded-full drop-shadow-lg w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-28 xl:h-28 2xl:w-32 2xl:h-32"
                                    priority
                                />
                                <div>
                                    <h1
                                        className="text-xs sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-bold mb-1 sm:mb-2 md:mb-4 leading-tight"
                                        style={{color: "var(--brand-navy)"}}
                                    >
                                        Điện Tử Tuấn Anh
                                    </h1>
                                    <p
                                        className="text-[10px] sm:text-sm md:text-base lg:text-lg xl:text-xl mb-2 sm:mb-4 md:mb-6 leading-tight"
                                        style={{color: "var(--brand-green)", fontWeight: 600}}
                                    >
                                        Chuyên Điện Tử & Gia Dụng - Giá Tốt Mỗi Ngày
                                    </p>
                                </div>
                            </div>
                            <p
                                className="text-[9px] italic sm:text-xs md:text-sm lg:text-base xl:text-lg max-w-2xl mx-auto leading-tight px-1 mb-2 sm:mb-3 md:mb-4 lg:mb-6"
                                style={{color: "var(--text-dark)"}}
                            >
                                Với hơn 10 năm kinh nghiệm trong lĩnh vực điện tử và gia dụng, chúng tôi tự hào là
                                địa chỉ tin cậy
                                cung cấp các sản phẩm chất lượng cao với giá cả hợp lý cho hàng nghìn khách hàng
                                trên toàn quốc.
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div
                            className="flex flex-row gap-1.5 sm:gap-2 md:gap-3 lg:gap-4 justify-center items-center mt-2 sm:mt-3 md:mt-4 lg:mt-6">
                            <a
                                href="/products"
                                className="px-3 sm:px-4 md:px-5 lg:px-6 xl:px-8 py-1.5 sm:py-2 md:py-2.5 lg:py-3 xl:py-4 rounded-md sm:rounded-lg font-semibold text-[9px] sm:text-xs md:text-sm lg:text-base xl:text-lg transition-all duration-300 whitespace-nowrap"
                                style={{
                                    backgroundColor: "var(--brand-green)",
                                    color: "var(--text-inverse)",
                                    boxShadow: "0 4px 12px var(--shadow-soft)"
                                }}
                            >
                                Xem Sản Phẩm
                            </a>
                            <a
                                href="#contact"
                                onClick={(e) => {
                                    e.preventDefault();
                                    document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'});
                                }}
                                className="px-3 sm:px-4 md:px-5 lg:px-6 xl:px-8 py-1.5 sm:py-2 md:py-2.5 lg:py-3 xl:py-4 rounded-md sm:rounded-lg font-semibold text-[9px] sm:text-xs md:text-sm lg:text-base xl:text-lg transition-all duration-300 border-2 whitespace-nowrap"
                                style={{
                                    borderColor: "var(--brand-navy)",
                                    color: "var(--brand-navy)",
                                    backgroundColor: "var(--bg-overlay-white)",
                                    boxShadow: "0 4px 12px var(--shadow-soft)"
                                }}
                            >
                                Liên Hệ Ngay
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-1 sm:py-2 md:py-4 lg:py-6 xl:py-8" style={{backgroundColor: "var(--bg-mint)"}}>
                <div className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-1 sm:gap-2 md:gap-4 lg:gap-6">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="text-center p-1 sm:p-2 md:p-3 lg:p-4 xl:p-6 rounded-lg sm:rounded-xl transition-all duration-300"
                                style={{
                                    backgroundColor: "var(--bg-light)",
                                    boxShadow: "0 2px 4px var(--shadow-soft)"
                                }}
                            >
                                <div
                                    className="text-xs sm:text-lg md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-0.5 sm:mb-1 md:mb-2"
                                    style={{color: "var(--brand-green)"}}
                                >
                                    {stat.number}
                                </div>
                                <div
                                    className="text-[8px] sm:text-[10px] md:text-xs lg:text-sm xl:text-base font-medium leading-tight"
                                    style={{color: "var(--text-medium)"}}
                                >
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Contact/>
            {/* Features Section */}
            <section className="py-1 sm:py-2 md:py-4 lg:py-6 xl:py-8">
                <div className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
                    <div className="text-center mb-2 sm:mb-4 md:mb-6 lg:mb-8 xl:mb-12">
                        <h2
                            className="text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-bold mb-1 sm:mb-2 md:mb-3"
                            style={{color: "var(--brand-navy)"}}
                        >
                            Tại Sao Chọn Chúng Tôi?
                        </h2>
                        <div
                            className="w-8 sm:w-12 md:w-16 lg:w-20 xl:w-24 h-0.5 sm:h-1 mx-auto rounded-full"
                            style={{backgroundColor: "var(--brand-green)"}}
                        ></div>
                    </div>

                    <div
                        className="grid grid-cols-2 lg:grid-cols-4 gap-1 sm:gap-2 md:gap-3 lg:gap-4 xl:gap-6">
                        {features.map((feature, index) => {
                            const IconComponent = feature.icon;
                            return (
                                <div
                                    key={index}
                                    className="group p-1.5 sm:p-2 md:p-3 lg:p-4 xl:p-6 rounded-lg sm:rounded-xl transition-all duration-300"
                                    style={{
                                        backgroundColor: "var(--bg-light)",
                                        border: "1px solid var(--border-light)",
                                        boxShadow: "0 1px 4px var(--shadow-soft)"
                                    }}
                                >
                                    <div
                                        className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 rounded-full flex items-center justify-center mb-1 sm:mb-2 md:mb-3 lg:mb-4 transition-all duration-300"
                                        style={{backgroundColor: "var(--bg-mint)"}}
                                    >
                                        <IconComponent
                                            className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7"
                                            style={{color: "var(--brand-green)"}}
                                        />
                                    </div>
                                    <h3
                                        className="text-[9px] sm:text-xs md:text-sm lg:text-base xl:text-lg font-bold mb-1 sm:mb-1.5 md:mb-2"
                                        style={{color: "var(--brand-navy)"}}
                                    >
                                        {feature.title}
                                    </h3>
                                    <p
                                        className="text-[8px] sm:text-[9px] md:text-xs lg:text-sm xl:text-base leading-tight"
                                        style={{color: "var(--text-medium)"}}
                                    >
                                        {feature.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Story & Values Section */}
            <section className="py-1 sm:py-2 md:py-4 lg:py-6 xl:py-8" style={{backgroundColor: "var(--bg-mint)"}}>
                <div className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-2 sm:mb-4 md:mb-6 lg:mb-8 xl:mb-12">
                            <h2
                                className="text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-bold mb-1 sm:mb-2 md:mb-3"
                                style={{color: "var(--brand-navy)"}}
                            >
                                Câu Chuyện Của Chúng Tôi
                            </h2>
                            <div
                                className="w-8 sm:w-12 md:w-16 lg:w-20 xl:w-24 h-0.5 sm:h-1 mx-auto rounded-full"
                                style={{backgroundColor: "var(--brand-green)"}}
                            ></div>
                        </div>

                        <div
                            className="grid grid-cols-2 lg:grid-cols-3 gap-1 sm:gap-2 md:gap-3 lg:gap-4 xl:gap-6 mb-2 sm:mb-4 md:mb-6 lg:mb-8 xl:mb-10">
                            {values.map((value, index) => (
                                <div
                                    key={index}
                                    className="p-1.5 sm:p-2 md:p-3 lg:p-4 xl:p-6 rounded-lg sm:rounded-xl"
                                    style={{
                                        backgroundColor: "var(--bg-light)",
                                        boxShadow: "0 2px 6px var(--shadow-soft)"
                                    }}
                                >
                                    <h3
                                        className="text-[9px] sm:text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl font-bold mb-1 sm:mb-2 md:mb-3"
                                        style={{color: "var(--brand-green)"}}
                                    >
                                        {value.title}
                                    </h3>
                                    <p
                                        className="text-[8px] sm:text-[9px] md:text-xs lg:text-sm xl:text-base leading-tight"
                                        style={{color: "var(--text-medium)"}}
                                    >
                                        {value.description}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div
                            className="p-1.5 sm:p-2 md:p-3 lg:p-4 xl:p-6 2xl:p-8 rounded-lg sm:rounded-xl"
                            style={{
                                backgroundColor: "var(--bg-light)",
                                boxShadow: "0 2px 6px var(--shadow-soft)"
                            }}
                        >
                            <h3
                                className="text-[9px] sm:text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl font-bold mb-1 sm:mb-2 md:mb-3 lg:mb-4"
                                style={{color: "var(--brand-navy)"}}
                            >
                                Hành Trình Phát Triển
                            </h3>
                            <p
                                className="text-[8px] sm:text-[9px] md:text-xs lg:text-sm xl:text-base 2xl:text-lg leading-tight mb-1 sm:mb-2 md:mb-3 lg:mb-4"
                                style={{color: "var(--text-medium)"}}
                            >
                                Điện Tử Tuấn Anh được thành lập với mong muốn mang đến cho người dùng Việt Nam những sản
                                phẩm
                                điện tử và gia dụng chất lượng cao với mức giá phải chăng. Từ một cửa hàng nhỏ tại Quận
                                8, TP.HCM,
                                chúng tôi đã không ngừng phát triển và mở rộng, phục vụ hàng nghìn khách hàng trên khắp
                                cả nước.
                            </p>
                            <p
                                className="text-[8px] sm:text-[9px] md:text-xs lg:text-sm xl:text-base 2xl:text-lg leading-tight"
                                style={{color: "var(--text-medium)"}}
                            >
                                Với đội ngũ nhân viên giàu kinh nghiệm và đam mê, chúng tôi luôn cập nhật những sản phẩm
                                mới nhất,
                                công nghệ tiên tiến nhất để đáp ứng nhu cầu đa dạng của khách hàng. Cam kết của chúng
                                tôi là mang đến
                                trải nghiệm mua sắm tuyệt vời nhất với dịch vụ chăm sóc khách hàng tận tâm và chuyên
                                nghiệp.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Products & Services Section */}
            <section className="py-1 sm:py-2 md:py-4 lg:py-8 xl:py-10">
                <div className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-1 sm:mb-2 md:mb-4 lg:mb-6 xl:mb-8">
                            <h2
                                className="text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-bold mb-1 sm:mb-2 md:mb-3"
                                style={{color: "var(--brand-navy)"}}
                            >
                                Sản Phẩm & Dịch Vụ
                            </h2>
                            <div
                                className="w-8 sm:w-12 md:w-16 lg:w-20 xl:w-24 h-0.5 sm:h-1 mx-auto rounded-full"
                                style={{backgroundColor: "var(--brand-green)"}}
                            ></div>
                        </div>

                        <div
                            className="p-1.5 sm:p-2 md:p-3 lg:p-4 xl:p-6 2xl:p-8 rounded-lg sm:rounded-xl mb-2 sm:mb-4 md:mb-6"
                            style={{
                                backgroundColor: "var(--bg-mint)",
                                boxShadow: "0 2px 6px var(--shadow-soft)"
                            }}
                        >
                            <div className="flex items-center gap-1 sm:gap-2 md:gap-3 mb-2 sm:mb-3 md:mb-4 lg:mb-6">
                                <HiShoppingBag
                                    className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-8 xl:h-8"
                                    style={{color: "var(--brand-green)"}}
                                />
                                <h3
                                    className="text-[9px] sm:text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl font-bold"
                                    style={{color: "var(--brand-navy)"}}
                                >
                                    Danh Mục Sản Phẩm Chính
                                </h3>
                            </div>

                            <div
                                className="grid grid-cols-3 lg:grid-cols-4 gap-1 sm:gap-1.5 md:gap-2 lg:gap-3">
                                {services.map((service, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-1 sm:gap-1.5 md:gap-2 p-1 sm:p-1.5 md:p-2 lg:p-2.5 rounded-md sm:rounded-lg transition-all duration-200"
                                        style={{backgroundColor: "var(--bg-light)"}}
                                    >
                                        <HiCheckCircle
                                            className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 flex-shrink-0"
                                            style={{color: "var(--brand-green)"}}
                                        />
                                        <span
                                            className="text-[8px] sm:text-[9px] md:text-xs lg:text-sm xl:text-base leading-tight"
                                            style={{color: "var(--text-medium)"}}
                                        >
                                            {service}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-1 sm:gap-2 md:gap-3 lg:gap-4 xl:gap-6">
                            <div
                                className="p-1.5 sm:p-2 md:p-3 lg:p-4 xl:p-6 rounded-lg sm:rounded-xl"
                                style={{
                                    backgroundColor: "var(--bg-mint)",
                                    boxShadow: "0 2px 6px var(--shadow-soft)"
                                }}
                            >
                                <div className="flex items-center gap-1 sm:gap-2 md:gap-3 mb-1 sm:mb-2 md:mb-3 lg:mb-4">
                                    <HiSupport
                                        className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-8 xl:h-8"
                                        style={{color: "var(--brand-green)"}}
                                    />
                                    <h3
                                        className="text-[9px] sm:text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl font-bold"
                                        style={{color: "var(--brand-navy)"}}
                                    >
                                        Dịch Vụ Hỗ Trợ
                                    </h3>
                                </div>
                                <ul className="space-y-0.5 sm:space-y-1 md:space-y-1.5 lg:space-y-2">
                                    {[
                                        "Tư vấn kỹ thuật chuyên sâu",
                                        "Hướng dẫn sử dụng sản phẩm",
                                        "Bảo hành và sửa chữa",
                                        "Giao hàng toàn quốc",
                                        "Hỗ trợ 24/7 qua Zalo"
                                    ].map((item, index) => (
                                        <li key={index} className="flex items-start gap-1 sm:gap-1.5 md:gap-2">
                                            <HiCheckCircle
                                                className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 flex-shrink-0 mt-0.5"
                                                style={{color: "var(--brand-green)"}}
                                            />
                                            <span
                                                className="text-[8px] sm:text-[9px] md:text-xs lg:text-sm xl:text-base leading-tight"
                                                style={{color: "var(--text-medium)"}}
                                            >
                                                {item}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div
                                className="p-1.5 sm:p-2 md:p-3 lg:p-4 xl:p-6 rounded-lg sm:rounded-xl"
                                style={{
                                    backgroundColor: "var(--bg-mint)",
                                    boxShadow: "0 2px 6px var(--shadow-soft)"
                                }}
                            >
                                <div className="flex items-center gap-1 sm:gap-2 md:gap-3 mb-1 sm:mb-2 md:mb-3 lg:mb-4">
                                    <HiGlobeAlt
                                        className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6 xl:w-8 xl:h-8"
                                        style={{color: "var(--brand-green)"}}
                                    />
                                    <h3
                                        className="text-[9px] sm:text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-xl font-bold"
                                        style={{color: "var(--brand-navy)"}}
                                    >
                                        Kênh Mua Hàng
                                    </h3>
                                </div>
                                <ul className="space-y-0.5 sm:space-y-1 md:space-y-1.5 lg:space-y-2">
                                    {[
                                        "Website chính thức",
                                        "Shopee - Điện tử Tuấn Anh",
                                        "TikTok Shop",
                                        "Zalo - Tư vấn trực tiếp",
                                        "Cửa hàng tại 451 Âu Dương Lân"
                                    ].map((item, index) => (
                                        <li key={index} className="flex items-start gap-1 sm:gap-1.5 md:gap-2">
                                            <HiCheckCircle
                                                className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-5 lg:h-5 flex-shrink-0 mt-0.5"
                                                style={{color: "var(--brand-green)"}}
                                            />
                                            <span
                                                className="text-[8px] sm:text-[9px] md:text-xs lg:text-sm xl:text-base leading-tight"
                                                style={{color: "var(--text-medium)"}}
                                            >
                                                {item}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;

