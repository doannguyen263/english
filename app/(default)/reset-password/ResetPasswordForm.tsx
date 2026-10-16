"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { resetPasswordSchema } from "@/app/(default)/login/auth-schema";
import { PasswordInput } from "@/app/components/ui/PasswordInput";
import { Button } from "@/app/components/ui/Button";

const inputClass =
  "rounded-md border border-black/15 px-3 py-2 text-base dark:border-white/20";

export function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    setError(null);

    const parsed = resetPasswordSchema.safeParse({ password, confirmPassword });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Dữ liệu không hợp lệ.");
      return;
    }

    setPending(true);
    try {
      const result = await authClient.resetPassword({
        newPassword: parsed.data.password,
        token,
      });
      if (result.error) {
        setError(result.error.message || "Không đặt lại được mật khẩu.");
        return;
      }
      router.push("/login");
      router.refresh();
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <label className="flex flex-col gap-1 text-sm">
        Mật khẩu mới
        <PasswordInput
          value={password}
          onChange={setPassword}
          autoComplete="new-password"
          className={inputClass}
          disabled={pending}
          placeholder="Vui lòng nhập mật khẩu mới"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        Nhập lại mật khẩu mới
        <PasswordInput
          value={confirmPassword}
          onChange={setConfirmPassword}
          autoComplete="new-password"
          className={inputClass}
          disabled={pending}
          placeholder="Vui lòng nhập lại mật khẩu"
        />
      </label>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <Button type="submit" loading={pending} disabled={pending}>
        Lưu mật khẩu mới
      </Button>

      <div className="flex justify-center">
        <Link href="/login" className="text-sm">
          Quay lại đăng nhập
        </Link>
      </div>
    </form>
  );
}
