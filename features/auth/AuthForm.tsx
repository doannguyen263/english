"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { loginSchema, registerSchema } from "./auth-schema";

type AuthFormProps = {
  mode: "login" | "register";
};

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const schema = mode === "register" ? registerSchema : loginSchema;

    const raw =
      mode === "register" ? { name, email, password } : { email, password };
    const parsed = schema.safeParse(raw);

    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Dữ liệu không hợp lệ.");
      return;
    }
    setPending(true);

    const result =
      mode === "register"
        ? await authClient.signUp.email({
            name: name.trim(),
            email: email.trim(),
            password,
            callbackURL: "/",
          })
        : await authClient.signIn.email({
            email: email.trim(),
            password,
            callbackURL: "/",
          });

    setPending(false);

    if (result.error) {
      const fallback =
        mode === "register" ? "Không đăng ký được." : "Không đăng nhập được.";
      setError(result.error.message || fallback);
      return;
    }

    router.push("/");
    router.refresh();
  }

  async function handleGoogle(event: React.FormEvent<HTMLButtonElement>) {
    event.preventDefault();
  }

  const inputClass =
    "rounded-md border border-black/15 px-3 py-2 text-base dark:border-white/20";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      {mode === "register" ? (
        <label className="flex flex-col gap-1 text-sm">
          Tên
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className={inputClass}
            autoComplete="name"
          />
        </label>
      ) : null}

      <label className="flex flex-col gap-1 text-sm">
        Email
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className={inputClass}
          autoComplete="email"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm">
        Mật khẩu
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className={inputClass}
          autoComplete={
            mode === "register" ? "new-password" : "current-password"
          }
        />
      </label>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
      <button
        type="submit"
        disabled={pending}
        className="h-11 rounded-md bg-black px-4 text-white dark:bg-white dark:text-black"
      >
        {mode === "register" ? "Đăng ký" : "Đăng nhập"}
      </button>
      <button
        type="button"
        disabled={pending}
        onClick={handleGoogle}
        className="h-11 rounded-md border border-black/15 px-4 dark:border-white/20"
      >
        Google
      </button>

      {mode === "register" ? (
        <Link href="/login" className="text-sm">
          Đã có tài khoản? Đăng nhập
        </Link>
      ) : (
        <Link href="/register" className="text-sm">
          Chưa có tài khoản? Đăng ký
        </Link>
      )}
    </form>
  );
}
