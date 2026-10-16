"use client";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
export function SignOutButton() {
  const router = useRouter();
  return (
    <button
      type="button"
      className="rounded-full border border-black/15 px-3 py-1.5 text-sm hover:bg-black/[.04] dark:border-white/20 dark:hover:bg-white/10"
      onClick={async () => {
        await authClient.signOut();
        router.refresh();
      }}
    >
      Đăng xuất
    </button>
  );
}