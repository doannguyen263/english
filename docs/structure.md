# Cấu trúc project

Bản đồ thư mục của repo. Đọc file này trước khi tìm chỗ đặt code hoặc ảnh. Khi thêm, xóa, đổi tên thư mục, route, hoặc feature, cập nhật file này trong cùng thay đổi.

Alias `@/*` trỏ về gốc repo (`tsconfig.json`).

## Cây thư mục

Bỏ qua thư mục sinh ra (`node_modules/`, `.next/`) và file bí mật (`.env.local`, `.env.production`).

```text
english/
  app/                         App Router
    layout.tsx                 html, font, metadata
    globals.css
    favicon.ico                icon trình duyệt
    (default)/                 route group, không xuất hiện trên URL
      layout.tsx               Header + Footer
      page.tsx                 /
      login/page.tsx           /login
      register/page.tsx        /register
      account/page.tsx         /account
      structures/page.tsx      /structures
    api/auth/[...all]/route.ts Better Auth, /api/auth/*
    components/
      Header.tsx
      Footer.tsx
      ui/                      Button, PasswordInput
  features/                    UI và logic theo tính năng, không phải route
    registry.ts                danh sách hiện trên trang chủ
    auth/                      form, header, footer, account, Zod
    structures/                cấu trúc câu
  lib/
    db.ts                      Drizzle + MySQL
    auth.ts                    Better Auth (server)
    auth-client.ts             Better Auth (client)
    auth-schema.ts             bảng user, session, account
  public/                      file tĩnh, URL bắt đầu bằng /
    logo.png
    favicon.png
  drizzle/                     migration SQL
  drizzle.config.ts
  proxy.ts                     cổng đăng nhập (middleware của Next.js 16)
  docs/
    README.md                  tổng quan sản phẩm
    structure.md               file này
    plans/                     kế hoạch chưa hoặc đang làm
  .github/workflows/deploy.yml
  next.config.ts               output: "standalone"
```

`public/` còn `file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg` từ create-next-app. Không phải asset của app.

## Mỗi chỗ làm gì

| Chỗ | Việc |
| --- | --- |
| `app/(default)/` | Trang người dùng thấy, bọc Header và Footer |
| `app/api/` | Route handler |
| `app/components/` | Khung trang dùng chung |
| `app/components/ui/` | Control dùng lại (nút, ô nhập) |
| `features/<tên>/` | Màn hình và schema của một tính năng |
| `features/registry.ts` | Tính năng có link trên `/` |
| `lib/` | Database, auth, thứ dùng nhiều chỗ |
| `proxy.ts` | Cổng đăng nhập trước khi render. Trang cần session nằm trong `PROTECTED_PREFIXES` |
| `public/` | Logo, icon, ảnh minh họa, ảnh bài viết tĩnh trong repo |
| `drizzle/` | SQL đã generate, không sửa tay |
| `docs/plans/` | Plan trước khi code |

Ảnh do người dùng tải lên không commit vào `public/`. Lưu ở object storage và giữ URL trong database.

## Thêm cái mới thì để đâu

Trang có Header và Footer: `app/(default)/<route>/page.tsx`. Nếu trang bắt đăng nhập, thêm đường dẫn vào `PROTECTED_PREFIXES` trong `proxy.ts`.

API: `app/api/<tên>/route.ts`.

Tính năng: thư mục `features/<tên>/`. Nếu có trên trang chủ, thêm một mục trong `features/registry.ts`.

Ảnh tĩnh: `public/`, gọi bằng đường dẫn `/ten-file`.

Schema database: file trong `lib/`, rồi generate migration vào `drizzle/`.
