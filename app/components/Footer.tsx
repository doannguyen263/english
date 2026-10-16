import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { features } from "@/features/registry";
import { FooterAccount } from "@/features/auth/FooterAccount";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-black/10 dark:border-white/10">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link href="/" className="inline-flex items-center gap-2.5">
            <Image
              src="/logo.png"
              alt=""
              width={32}
              height={32}
              className="size-8 rounded-lg"
            />
            <span className="text-sm font-semibold tracking-tight">
              Học tiếng Anh
            </span>
          </Link>
          <p className="mt-3 max-w-xs text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            Luyện cấu trúc câu và các phần học, ngắn gọn và có ví dụ.
          </p>
        </div>

        <nav aria-label="Học">
          <p className="text-sm font-medium">Học</p>
          <ul className="mt-3 flex flex-col gap-2">
            {features.map((feature) => (
              <li key={feature.id}>
                <Link
                  href={feature.href}
                  className="text-sm text-zinc-600 hover:text-foreground dark:text-zinc-400"
                >
                  {feature.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Tài khoản">
          <p className="text-sm font-medium">Tài khoản</p>
          <Suspense
            fallback={<p className="mt-3 text-sm text-zinc-400">…</p>}
          >
            <FooterAccount />
          </Suspense>
        </nav>
      </div>

      <div className="border-t border-black/10 dark:border-white/10 text-center bg-primary">
        <p className="mx-auto w-full max-w-7xl px-4 py-4 text-sm text-white">
          © 2026 Học tiếng Anh
        </p>
      </div>
    </footer>
  );
}
