"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { changePasswordSchema } from "./account-schema";
import { PasswordInput } from "@/app/components/ui/PasswordInput";
import { Button } from "@/app/components/ui/Button";

const inputClass =
  "rounded-md border border-black/15 px-3 py-2 text-base dark:border-white/20";

export function PasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    setError(null);
    setMessage(null);

    const parsed = changePasswordSchema.safeParse({
      currentPassword,
      newPassword,
      confirmPassword,
    });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Dữ liệu không hợp lệ.");
      return;
    }

    setPending(true);
    try {
      const result = await authClient.changePassword({
        currentPassword: parsed.data.currentPassword,
        newPassword: parsed.data.newPassword,
        revokeOtherSessions: true,
      });
      if (result.error) {
        setError(result.error.message || "Không đổi được mật khẩu.");
        return;
      }
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setMessage("Đã đổi mật khẩu.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-xl flex-col gap-3">
      <h2 className="text-lg font-semibold">Đổi mật khẩu</h2>
      <label className="flex flex-col gap-1 text-sm">
        Mật khẩu hiện tại
        <PasswordInput
          value={currentPassword}
          onChange={setCurrentPassword}
          autoComplete="current-password"
          className={inputClass}
          disabled={pending}
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Mật khẩu mới
        <PasswordInput
          value={newPassword}
          onChange={setNewPassword}
          autoComplete="new-password"
          className={inputClass}
          disabled={pending}
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
        />
      </label>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      {message ? (
        <p className="text-sm text-emerald-700 dark:text-emerald-400">
          {message}
        </p>
      ) : null}
      <div>
        <Button type="submit" loading={pending} disabled={pending}>
          Lưu mật khẩu
        </Button>
      </div>
    </form>
  );
}
