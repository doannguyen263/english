"use client";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
const variants = {
  pill: "rounded-full border border-black/15 px-3 py-1.5 text-sm hover:bg-black/[.04] dark:border-white/20 dark:hover:bg-white/10",
  link: "text-left text-sm text-zinc-600 hover:text-foreground dark:text-zinc-400",
};

export function SignOutButton({ variant = "pill" }: { variant?: "pill" | "link" }) {
  const router = useRouter();
  return (
    <button
      type="button"
      className={variants[variant]}
      onClick={async () => {
        await authClient.signOut();
        router.refresh();
      }}
    >
      Đăng xuất
    </button>
  );
}