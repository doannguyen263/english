# Đăng nhập và đăng ký

Plan để code. Bước này chưa đụng code.

Mục tiêu: user đăng ký và đăng nhập bằng email/mật khẩu hoặc Google, header hiện tên và có nút đăng xuất. Trang học vẫn mở, không bắt buộc đăng nhập. Cấu trúc câu vẫn nằm ở `localStorage`.

## Đã chốt

- Better Auth trong app, Drizzle, MySQL. Adapter `provider: "mysql"`.
- Database dev là MySQL trên máy, tên `english`. VPS để lúc deploy, không trỏ app dev vào MySQL production.
- Google là Sign in with Google (email, tên, ảnh). Không dùng Gmail API.
- Cùng email đăng ký mật khẩu rồi đăng nhập Google thì gộp một user (`accountLinking`, Google là trusted provider).
- Chưa xác minh email, chưa quên mật khẩu. Hai việc đó cần SMTP sau.
- Next.js 16 đọc session trong Server Component. Chưa thêm `proxy.ts` vì chưa chặn route. `middleware.ts` không dùng (Next 16 đổi convention sang `proxy.ts`).

## Ngoài bước này

- Chặn `/structures` hoặc trang khác theo user
- Đưa cấu trúc câu từ `localStorage` lên server
- Facebook, GitHub
- Deploy, tạo database trên VPS
- Cài PostgreSQL

## Việc chuẩn bị tay

Làm trước khi code gọi được Google. Email/mật khẩu không cần bước này.

1. MySQL local: tạo database `english` và một user chỉ có quyền database đó.
2. Google Cloud: OAuth client loại Web. Redirect URI dev là `http://localhost:3000/api/auth/callback/google`.
3. Secret cookie: một chuỗi ngẫu nhiên dài, mỗi môi trường một giá trị. Không commit.

Biến môi trường, ghi tên vào `.env.example`, giá trị chỉ để trong `.env.local`:

- `DATABASE_URL` dạng `mysql://user:pass@127.0.0.1:3306/english`
- `BETTER_AUTH_SECRET`
- `BETTER_AUTH_URL` dev là `http://localhost:3000`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`

`NEXT_PUBLIC_APP_URL` đã có trong `.env.example`. Giữ nguyên.

## Các bước code

### 1. Thư viện

Thêm `better-auth`, `drizzle-orm`, `mysql2`. Dev: `drizzle-kit`.

### 2. Kết nối Drizzle

- `lib/db.ts`: pool `mysql2`, instance Drizzle.
- `drizzle.config.ts`: dialect `mysql`, schema trỏ file schema auth, output migration trong `drizzle/`.

File auth server chỉ import ở server. Không import `lib/auth.ts` từ component client.

### 3. Cấu hình Better Auth

`lib/auth.ts`:

- `emailAndPassword.enabled: true`, không bắt xác minh email.
- `socialProviders.google` lấy Client ID và secret từ env.
- Nối tài khoản bật, Google là trusted provider.
- Plugin `nextCookies()` đứng cuối mảng plugin, để cookie session ghi được từ Server Action.
- `drizzleAdapter` với `provider: "mysql"` và schema sinh ở bước 4.

`lib/auth-client.ts`: `createAuthClient` cho form đăng ký, đăng nhập, đăng nhập Google, đăng xuất.

### 4. Schema và migration

Không viết tay bốn bảng. Chạy CLI Better Auth để sinh `user`, `session`, `account`, `verification` ra file schema Drizzle dialect MySQL. Rồi `drizzle-kit` tạo migration và apply vào database `english`.

Xong khi bốn bảng có trong MySQL local.

### 5. Route handler

`app/api/auth/[...all]/route.ts` mount `toNextJsHandler(auth)`, export `GET` và `POST`. Mọi endpoint Better Auth (đăng nhập, đăng ký, callback Google, đăng xuất) đi qua đây.

### 6. Giao diện

Giữ style hiện tại: `max-w-xl`, viền, hỗ trợ dark, nút cao khoảng 44px, giống form ở `features/structures/StructureBox.tsx`.

- `/register`: tên, email, mật khẩu, nút đăng ký, nút Google, link sang đăng nhập.
- `/login`: email, mật khẩu, nút đăng nhập, nút Google, link sang đăng ký.
- Một component client dùng chung cho hai trang, nằm trong `features/auth/`.
- Lỗi từ Better Auth hiện trên form (sai mật khẩu, email đã tồn tại, thiếu trường). Không log mật khẩu.
- Đăng ký hoặc đăng nhập thành công thì về `/`.

Better Auth bắt tên lúc đăng ký và mật khẩu tối thiểu 8 ký tự. Form đăng ký có ô tên. Form kiểm tra ô trống trước khi gửi.

### 7. Header

`app/layout.tsx` đang là Server Component. Tách phần phải của header ra component server đọc session bằng `auth.api.getSession`.

- Chưa đăng nhập: link Đăng nhập và Đăng ký.
- Đã đăng nhập: tên và nút Đăng xuất (client gọi sign-out rồi về `/`).
- `cacheComponents` đang bật trong `next.config.ts`. Header gắn cookie session không được cache thành một bản HTML dùng chung mọi user. Khi làm, đọc cookie hoặc session theo cách Next 16 đánh dấu đoạn đó là động.

Trang `/` và `/structures` không đổi hành vi. Khách chưa đăng nhập vẫn xem và lưu cấu trúc câu trên trình duyệt.

## Xong khi

- Đăng ký email mới, vào MySQL thấy một dòng `user`, mật khẩu không nằm dạng chữ thường.
- Đăng nhập đúng thì header hiện tên. Tải lại trang vẫn còn session.
- Sai mật khẩu thì ở lại form và thấy lỗi.
- Đăng xuất thì header trở lại link Đăng nhập.
- Nút Google chuyển sang Google và về app với cùng session. Chưa có Client ID thì nút có mặt, luồng Google kiểm tra sau khi điền env.
- Email đã đăng ký bằng mật khẩu, đăng nhập Google cùng email, vẫn một user.
- `/structures` thêm một cấu trúc, tải lại còn trong `localStorage`, không cần đăng nhập.
