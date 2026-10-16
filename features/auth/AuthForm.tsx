"use client";
import { useLayoutEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { loginSchema, registerSchema } from "./auth-schema";
import { PasswordInput } from "@/app/components/ui/PasswordInput";
import { Button } from "@/app/components/ui/Button";

type AuthFormProps = {
  mode: "login" | "register";
};

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState<"submit" | "google" | null>(null);
  const busy = pending !== null;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useLayoutEffect(() => {
    return () => {
      setName("");
      setEmail("");
      setPassword("");
      setError(null);
    };
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    setError("");

    const schema = mode === "register" ? registerSchema : loginSchema;

    const raw =
      mode === "register" ? { name, email, password } : { email, password };
    const parsed = schema.safeParse(raw);

    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Dữ liệu không hợp lệ.");
      return;
    }
    setPending("submit");
    try {
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
      if (result.error) {
        const fallback =
          mode === "register" ? "Không đăng ký được." : "Không đăng nhập được.";
        setError(result.error.message || fallback);
        return;
      }
      setName("");
      setEmail("");
      setPassword("");
      setError(null);
      router.push("/");
      router.refresh();
    } finally {
      setPending(null);
    }
  }

  async function handleGoogle(event: React.FormEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (pending) return;
    setPending("google");
    setTimeout(() => {
      setPending(null);
    }, 500);
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
        <PasswordInput
          value={password}
          onChange={setPassword}
          autoComplete={
            mode === "register" ? "new-password" : "current-password"
          }
          className={inputClass}
          disabled={!!pending}
        />
      </label>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <Button type="submit" loading={pending === "submit"} disabled={busy}>
        {mode === "register" ? "Đăng ký" : "Đăng nhập"}
      </Button>
      <Button
        type="button"
        variant="outline"
        loading={pending === "google"}
        disabled={busy}
        onClick={handleGoogle}
      >
        {mode === "register" ? "Đăng ký bằng Google" : "Đăng nhập bằng Google"}
      </Button>

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
