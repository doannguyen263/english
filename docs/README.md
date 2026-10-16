# Học tiếng Anh

File này là tổng quan. Đọc một lần để biết app đang có gì. Cây thư mục nằm ở [structure.md](structure.md). Kế hoạch chi tiết nằm trong [plans](plans/).

## Đã làm

App học tiếng Anh, giao diện tiếng Việt. Chưa có tài khoản, database, hay API. Dữ liệu cấu trúc câu nằm trên trình duyệt.

Stack: Next.js 16.4, React 19, Tailwind 4, TypeScript. Build `output: "standalone"`.

| Chỗ | Việc |
| --- | --- |
| `/` | Trang chủ liệt kê tính năng từ `app/components/registry.ts` |
| Header | Link về trang chủ. `lang="vi"` trong `app/layout.tsx` |
| `/structures` | Cấu trúc câu. Form nhập cấu trúc, giải thích, ví dụ (mỗi dòng một câu) |
| `localStorage` | Khóa `sentence-structures`. Mất khi xóa dữ liệu trình duyệt hoặc đổi máy |

## Chưa làm

- Đăng ký, đăng nhập, đăng xuất
- Lưu dữ liệu trên server
- Chặn trang theo user

## Kế hoạch

| File | Nội dung | Trạng thái |
| --- | --- | --- |
| [plans/auth.md](plans/auth.md) | Đăng nhập và đăng ký: email/mật khẩu và Google | Plan xong, chưa code |
