import { z } from "zod";
import { emailSchema } from "../login/auth-schema";

export const profileSchema = z.object({
  name: z.string().trim().min(1, "Vui lòng nhập tên."),
  email: emailSchema,
});

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Vui lòng nhập mật khẩu hiện tại."),
    newPassword: z
      .string()
      .min(1, "Vui lòng nhập mật khẩu mới.")
      .min(8, "Mật khẩu cần có ít nhất 8 ký tự."),
    confirmPassword: z.string().min(1, "Vui lòng nhập lại mật khẩu mới."),
  })
  .refine((value) => value.newPassword === value.confirmPassword, {
    message: "Mật khẩu nhập lại chưa khớp.",
    path: ["confirmPassword"],
  })
  .refine((value) => value.newPassword !== value.currentPassword, {
    message: "Mật khẩu mới phải khác mật khẩu hiện tại.",
    path: ["newPassword"],
  });
