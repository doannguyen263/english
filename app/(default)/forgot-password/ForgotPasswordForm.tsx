"use client";

import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { forgotPasswordSchema } from "@/app/(default)/login/auth-schema";
import { Button } from "@/app/components/ui/Button";

const inputClass =
  "rounded-md border border-black/15 px-3 py-2 text-base dark:border-white/20";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    setError(null);
    setMessage(null);

    const parsed = forgotPasswordSchema.safeParse({ email });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Dữ liệu không hợp lệ.");
      return;
    }

    setPending(true);
    try {
      const result = await authClient.requestPasswordReset({
        email: parsed.data.email,
        redirectTo: "/reset-password",
      });
      if (result.error) {
        setError(result.error.message || "Không gửi được yêu cầu.");
        return;
      }
      setMessage(
        "Nếu email đã được đăng ký, hướng dẫn đặt lại mật khẩu sẽ được gửi trong ít phút.\n\nVui lòng kiểm tra cả thư mục Spam hoặc Quảng cáo.",
      );
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Nhập email đã đăng ký. Chúng tôi sẽ gửi liên kết đặt lại mật khẩu.
      </p>

      <label className="flex flex-col gap-1 text-sm">
        Email
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className={inputClass}
          autoComplete="email"
          placeholder="Vui lòng nhập email"
          disabled={pending}
        />
      </label>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      {message ? (
        <p className="text-sm text-emerald-700 dark:text-emerald-400">
          {message}
        </p>
      ) : null}

      <Button type="submit" loading={pending} disabled={pending}>
        Gửi liên kết
      </Button>

      <div className="flex justify-center">
        <Link href="/login" className="text-sm">
          Quay lại đăng nhập
        </Link>
      </div>
    </form>
  );
}