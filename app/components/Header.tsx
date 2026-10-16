import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { HeaderAuth } from "@/features/auth/HeaderAuth";
import { features } from "@/features/registry";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-background/80 backdrop-blur-md dark:border-white/10">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-6 px-4">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <Image
            src="/logo.png"
            alt=""
            width={36}
            height={36}
            className="size-9 rounded-lg"
          />
          <span className="text-[15px] font-semibold tracking-tight">
            Học tiếng Anh
          </span>
        </Link>

        <nav className="hidden items-center gap-1 sm:flex" aria-label="Chính">
          {features.map((feature) => (
            <Link
              key={feature.id}
              href={feature.href}
              className="rounded-full px-3 py-1.5 text-sm text-zinc-600 transition-colors hover:bg-black/[.05] hover:text-foreground dark:text-zinc-400 dark:hover:bg-white/10"
            >
              {feature.title}
            </Link>
          ))}
        </nav>

        <div className="ml-auto">
          <Suspense fallback={<span className="text-sm text-zinc-400">…</span>}>
            <HeaderAuth />
          </Suspense>
        </div>
      </div>
    </header>
  );
}
