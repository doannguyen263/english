import Link from "next/link";
import { getSession } from "@/lib/auth";
import { UserMenu } from "./UserMenu";

export async function HeaderAuth() {
  const session = await getSession();

  if (!session?.user) {
    return (
      <div className="flex items-center gap-2">
        <Link
          href="/login"
          className="rounded-full px-3 py-1.5 text-sm font-medium text-zinc-700 hover:bg-black/[.05] dark:text-zinc-200 dark:hover:bg-white/10"
        >
          Đăng nhập
        </Link>
        <Link
          href="/register"
          className="rounded-full bg-black px-3.5 py-1.5 text-sm font-medium text-white dark:bg-white dark:text-black"
        >
          Đăng ký
        </Link>
      </div>
    );
  }

  return <UserMenu name={session.user.name} />;
}
