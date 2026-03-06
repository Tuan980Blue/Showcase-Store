# 🎬 Web Trưng Bày Sản Phẩm

## 📺 PreView Web 👉 [Click](https://dientutuananh.vercel.app)  (HIỆN TẠI DATABASE NOT ACTIVE)

## ☁️ Cấu hình Cloudinary cho frontend

1) Tạo tài khoản Cloudinary và một unsigned upload preset (ví dụ: `unsigned_preset`).
2) Sao chép file `env.example` thành `.env.local` và điền giá trị:
   - `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` = tên cloud
   - `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` = preset upload không ký
   - (Tùy chọn cho backend) `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
3) Chạy `npm install` nếu chưa có và khởi động bằng `npm run dev`.
4) Sử dụng component `CloudinaryUploadButton` tại `src/app/(site)/_components/CloudinaryUploadButton.tsx` để lấy `secure_url` sau khi upload.
