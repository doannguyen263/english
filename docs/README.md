# Học tiếng Anh

File này là tổng quan. Đọc một lần để biết app đang có gì. Cây thư mục nằm ở [structure.md](structure.md). Kế hoạch chi tiết nằm trong [plans](plans/).

## Đã làm

App học tiếng Anh, giao diện tiếng Việt. Có tài khoản (email/mật khẩu và Google), MySQL, Better Auth. Dữ liệu cấu trúc câu vẫn nằm trên trình duyệt. Code đã deploy lên VPS.

Stack: Next.js 16.4, React 19, Tailwind 4, TypeScript, Better Auth, Drizzle, MySQL. Build `output: "standalone"`.

| Chỗ | Việc |
| --- | --- |
| `/` | Trang chủ liệt kê tính năng từ `app/components/registry.ts` |
| Header / Footer | Logo, nav, link học. Session: nút đăng nhập/đăng ký hoặc menu user |
| `/login`, `/register` | Đăng nhập / đăng ký email-mật khẩu và Google |
| `/forgot-password`, `/reset-password` | Quên mật khẩu: gửi link (SMTP hoặc log console khi dev), đặt mật khẩu mới |
| `/account` | Đổi thông tin cơ bản, đổi mật khẩu. `proxy.ts` bắt đăng nhập |
| `/structures` | Cấu trúc câu. Form nhập cấu trúc, giải thích, ví dụ (mỗi dòng một câu) |
| `/learn/vocabularies`, `/learn/videos` | Trang khung, chưa có nội dung |
| `localStorage` | Khóa `sentence-structures`. Mất khi xóa dữ liệu trình duyệt hoặc đổi máy |
| Deploy | GitHub Actions → VPS, build standalone |

## Chưa làm

- Lưu cấu trúc câu (và dữ liệu học khác) trên server theo user
- Nội dung Từ vựng, Video
- Xác minh email (cần SMTP)
- Chặn thêm trang theo user ngoài `/account`

## Kế hoạch

| File | Nội dung | Trạng thái |
| --- | --- | --- |
| [plans/auth.md](plans/auth.md) | Đăng nhập và đăng ký: email/mật khẩu và Google | Xong (đã deploy) |
