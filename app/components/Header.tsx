import Link from "next/link";
import { Suspense } from "react";
import { HeaderAuth } from "../../features/auth/HeaderAuth";

export function Header() {
  return (
    <header className="border-b border-black/10 px-4 py-3 dark:border-white/15">
      <div className="container mx-auto flex items-center gap-2">
        <Link href="/" className="font-medium">
          Học tiếng Anh
        </Link>
        <div className="ml-auto flex items-center gap-2">
          <Suspense fallback={<span className="text-sm">…</span>}>
            <HeaderAuth />
          </Suspense>
        </div>
      </div>
    </header>
  );
}
