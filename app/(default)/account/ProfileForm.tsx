"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { profileSchema } from "./account-schema";
import { Button } from "@/app/components/ui/Button";

const inputClass =
  "rounded-md border border-black/15 px-3 py-2 text-base dark:border-white/20";

const readOnlyClass = `${inputClass} cursor-not-allowed bg-zinc-50 text-zinc-600 dark:bg-white/5 dark:text-zinc-300`;

export function ProfileForm({
  name: initialName,
  email,
  createdAt,
}: {
  name: string;
  email: string;
  createdAt: string;
}) {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    setError(null);
    setMessage(null);

    const parsed = profileSchema.safeParse({ name });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Dữ liệu không hợp lệ.");
      return;
    }

    const nextName = parsed.data.name;
    if (nextName === initialName) {
      setMessage("Không có gì để cập nhật.");
      return;
    }

    setPending(true);
    try {
      const result = await authClient.updateUser({ name: nextName });
      if (result.error) {
        setError(result.error.message || "Không cập nhật được tên.");
        return;
      }

      setMessage("Đã cập nhật thông tin.");
      router.refresh();
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-xl flex-col gap-3">
      <h2 className="text-lg font-semibold">Thông tin cơ bản</h2>
      <label className="flex flex-col gap-1 text-sm">
        Tên
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          className={inputClass}
          autoComplete="name"
          disabled={pending}
        />
      </label>
      <div className="flex flex-col gap-1 text-sm">
        <span>Email</span>
        <p className={readOnlyClass}>{email}</p>
      </div>
      <div className="flex flex-col gap-1 text-sm">
        <span>Ngày tạo</span>
        <p className={readOnlyClass}>{createdAt}</p>
      </div>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      {message ? (
        <p className="text-sm text-emerald-700 dark:text-emerald-400">
          {message}
        </p>
      ) : null}
      <div>
        <Button type="submit" loading={pending} disabled={pending}>
          Lưu thông tin
        </Button>
      </div>
    </form>
  );
}
