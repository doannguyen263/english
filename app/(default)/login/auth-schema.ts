import { z } from "zod";

export const emailSchema = z
  .string()
  .trim()
  .min(1, "Vui lòng nhập email.")
  .pipe(z.email({ error: "Email không hợp lệ." }));

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Vui lòng nhập mật khẩu."),
});

export const registerSchema = z.object({
  name: z.string().trim().min(1, "Vui lòng nhập tên."),
  email: emailSchema,
  password: z
    .string()
    .min(1, "Vui lòng nhập mật khẩu.")
    .min(8, "Mật khẩu cần có ít nhất 8 ký tự."),
});
