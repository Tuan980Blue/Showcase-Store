'use client';

import React from 'react';

const valueItems = [
  {
    title: 'Tư vấn kỹ thuật tận tâm',
    description:
      'Đội ngũ có kinh nghiệm lâu năm trong ngành điện tử hỗ trợ từ lựa chọn đến lắp đặt.',
  },
  {
    title: 'Sản phẩm chính hãng, rõ nguồn gốc',
    description:
      'Lựa chọn kỹ lưỡng, thông tin minh bạch, bảo hành theo đúng chính sách nhà cung cấp.',
  },
  {
    title: 'Hỗ trợ online qua Zalo / Tiktok',
    description:
      'Giải đáp nhanh chóng, gửi hình ảnh/video thực tế sản phẩm trước khi đặt mua.',
  },
];

const ValuePropsSection: React.FC = () => {
  return (
    <section
      className="border-y"
      style={{ borderColor: 'var(--border-light)', backgroundColor: 'var(--bg-mint)' }}
    >
      <div className="container mx-auto px-2 sm:px-4 lg:px-6 py-4 lg:py-6">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
          {valueItems.map((item) => (
            <div
              key={item.title}
              className="rounded-lg bg-white/70 p-3 text-xs shadow-sm backdrop-blur-sm sm:p-4 sm:text-sm"
            >
              <h3
                className="mb-1 text-[13px] font-semibold sm:text-sm md:text-base"
                style={{ color: 'var(--brand-navy)' }}
              >
                {item.title}
              </h3>
              <p className="text-[11px] text-[var(--text-medium)] sm:text-xs md:text-sm">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuePropsSection;


