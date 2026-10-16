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
      login/                   /login, form đăng nhập và đăng ký
      register/page.tsx        /register
      forgot-password/         /forgot-password, yêu cầu link đặt lại mật khẩu
      reset-password/          /reset-password, đặt mật khẩu mới từ token
      account/                 /account, panel, form, nút đăng xuất
      structures/              /structures, màn hình nằm cạnh page
      learn/videos/page.tsx    /learn/videos
      learn/vocabularies/page.tsx  /learn/vocabularies
    api/auth/[...all]/route.ts Better Auth, /api/auth/*
    components/
      Header.tsx
      HeaderAuth.tsx           nút đăng nhập hoặc menu user
      UserMenu.tsx
      Footer.tsx
      FooterAccount.tsx
      registry.ts              danh sách link trên trang chủ, header, footer
      ui/                      Button, PasswordInput
  lib/
    db.ts                      Drizzle + MySQL
    auth.ts                    Better Auth (server)
    auth-client.ts             Better Auth (client)
    auth-schema.ts             bảng user, session, account
    mail.ts                    gửi email (reset mật khẩu qua SMTP)
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
| `app/components/` | Khung trang: header, footer, menu user, danh sách link |
| `app/components/ui/` | Control dùng lại (nút, ô nhập) |
| `lib/` | Database, auth, thứ dùng nhiều chỗ |
| `proxy.ts` | Cổng đăng nhập trước khi render. Trang cần session nằm trong `PROTECTED_PREFIXES` |
| `public/` | Logo, icon, ảnh minh họa, ảnh bài viết tĩnh trong repo |
| `drizzle/` | SQL đã generate, không sửa tay |
| `docs/plans/` | Plan trước khi code |

Ảnh do người dùng tải lên không commit vào `public/`. Lưu ở object storage và giữ URL trong database.

## Thêm cái mới thì để đâu

Trang của sản phẩm: `app/(default)/<route>/`. Video, từ vựng, cấu trúc câu nằm ở đây. Nếu trang bắt đăng nhập, thêm đường dẫn vào `PROTECTED_PREFIXES` trong `proxy.ts`.

Phần dùng ở nhiều trang trong khung trang: `app/components/`. Link trên trang chủ, header và footer thêm vào `app/components/registry.ts`.

API: `app/api/<tên>/route.ts`.

Ảnh tĩnh: `public/`, gọi bằng đường dẫn `/ten-file`.

Schema database: file trong `lib/`, rồi generate migration vào `drizzle/`.
