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

// Register schema
export const registerSchema = z.object({
  name: z.string().trim().min(1, "Vui lòng nhập tên."),
  email: emailSchema,
  password: z
    .string()
    .min(1, "Vui lòng nhập mật khẩu.")
    .min(8, "Mật khẩu cần có ít nhất 8 ký tự."),
});

// Forgot password schema
export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

// Reset password schema
export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, "Vui lòng nhập mật khẩu.")
      .min(8, "Mật khẩu cần có ít nhất 8 ký tự."),
    confirmPassword: z.string().min(1, "Vui lòng nhập lại mật khẩu."),
  })
  .refine((v) => v.password === v.confirmPassword, {
    message: "Mật khẩu nhập lại chưa khớp.",
    path: ["confirmPassword"],
  });