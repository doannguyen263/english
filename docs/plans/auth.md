# Đăng nhập và đăng ký

Trạng thái: **xong**. Đã code, chạy local và trên VPS. Email/mật khẩu và Google đều dùng được.

Mục tiêu đã đạt: user đăng ký và đăng nhập bằng email/mật khẩu hoặc Google; header/footer hiện tên và đăng xuất; `/account` đổi thông tin và mật khẩu. Trang học vẫn mở không bắt buộc đăng nhập. Cấu trúc câu vẫn nằm ở `localStorage`.

## Đã chốt

- Better Auth trong app, Drizzle, MySQL. Adapter `provider: "mysql"`.
- Database: MySQL local (`english`) lúc dev; MySQL trên VPS lúc production. Không trỏ app dev vào MySQL production.
- Google là Sign in with Google (email, tên, ảnh). Không dùng Gmail API.
- Cùng email đăng ký mật khẩu rồi đăng nhập Google thì gộp một user (`accountLinking`, Google là trusted provider).
- Quên mật khẩu đã làm: `/forgot-password` → email (SMTP hoặc log console khi dev) → `/reset-password?token=...`. Chưa xác minh email.
- Next.js 16 đọc session trong Server Component (`getSession` trong `lib/auth.ts`).
- `proxy.ts` chặn `/account` khi chưa có cookie session. `middleware.ts` không dùng (Next 16 đổi convention sang `proxy.ts`).

## Ngoài bước này (chưa làm)

- Chặn `/structures` hoặc trang khác theo user
- Đưa cấu trúc câu từ `localStorage` lên server
- Facebook, GitHub
- Xác minh email
- Cài PostgreSQL (không cần nếu giữ MySQL)

## Biến môi trường

Tên ghi trong `.env.example`, giá trị chỉ trong `.env.local` / env trên VPS:

- `DATABASE_URL` dạng `mysql://user:pass@host:3306/english`
- `BETTER_AUTH_SECRET`
- `BETTER_AUTH_URL` (dev: `http://localhost:3000`, production: URL public của app)
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `NEXT_PUBLIC_APP_URL`
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, `SMTP_FROM` (production bắt buộc; dev có thể bỏ trống để log link ra console)

Redirect URI Google: `{BETTER_AUTH_URL}/api/auth/callback/google`.

## Chỗ code chính

| File | Việc |
| --- | --- |
| `lib/db.ts`, `drizzle.config.ts`, `drizzle/` | Drizzle + migration MySQL |
| `lib/auth-schema.ts` | Bảng `user`, `session`, `account`, `verification` |
| `lib/auth.ts` | Better Auth server, Google, account linking, reset password, i18n `vi` |
| `lib/auth-client.ts` | Client: đăng ký, đăng nhập, Google, quên mật khẩu, đăng xuất |
| `lib/mail.ts` | Gửi email reset mật khẩu (nodemailer) |
| `app/api/auth/[...all]/route.ts` | Route handler Better Auth |
| `app/(default)/login/` | Form đăng nhập / đăng ký dùng chung |
| `app/(default)/forgot-password/` | Yêu cầu link đặt lại mật khẩu |
| `app/(default)/reset-password/` | Đặt mật khẩu mới từ token |
| `app/(default)/account/` | Panel tài khoản: hồ sơ, đổi mật khẩu |
| `app/components/HeaderAuth.tsx`, `UserMenu.tsx` | Session trên header |
| `proxy.ts` | `PROTECTED_PREFIXES` gồm `/account` |

## Đã kiểm tra (xong khi)

- Đăng ký email mới → có dòng `user` trong MySQL, mật khẩu không dạng chữ thường.
- Đăng nhập đúng → header hiện tên; tải lại trang vẫn còn session.
- Sai mật khẩu → ở lại form và thấy lỗi.
- Đăng xuất → header trở lại link Đăng nhập.
- Google → chuyển sang Google rồi về app với session.
- Email đã đăng ký bằng mật khẩu, đăng nhập Google cùng email → vẫn một user.
- `/structures` thêm cấu trúc, tải lại còn trong `localStorage`, không cần đăng nhập.
- `/account` khi chưa đăng nhập → redirect sang `/login` trước khi render trang.
- `/forgot-password` với email đã đăng ký → terminal (dev, không SMTP) hoặc email có link; mở link → đặt mật khẩu mới → đăng nhập được.
- `/reset-password` không có token / token hết hạn → báo lỗi và link yêu cầu lại.
