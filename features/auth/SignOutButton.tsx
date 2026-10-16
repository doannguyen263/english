"use client";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
const variants = {
  pill: "rounded-full border border-black/15 px-3 py-1.5 text-sm hover:bg-black/[.04] dark:border-white/20 dark:hover:bg-white/10",
  link: "text-left text-sm text-zinc-600 hover:text-foreground dark:text-zinc-400",
  menu: "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-zinc-700 hover:bg-black/[.05] dark:text-zinc-200 dark:hover:bg-white/10",
};

export function SignOutButton({
  variant = "pill",
}: {
  variant?: "pill" | "link" | "menu";
}) {
  const router = useRouter();
  return (
    <button
      type="button"
      role={variant === "menu" ? "menuitem" : undefined}
      className={variants[variant]}
      onClick={async () => {
        await authClient.signOut();
        router.refresh();
      }}
    >
      {variant === "menu" ? <span className="icon-exit"></span> : null}
      Đăng xuất
    </button>
  );
}
