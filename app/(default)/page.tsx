import Link from "next/link";
import { features } from "@/features/registry";

export default function Home() {
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-8">
      <h1 className="text-2xl font-semibold">Học tiếng Anh</h1>
      <ul className="flex flex-col gap-3">
        {features.map((feature) => (
          <li key={feature.id}>
            <Link
              href={feature.href}
              className="block rounded-lg border border-black/10 px-4 py-3 hover:bg-black/[.04] dark:border-white/15 dark:hover:bg-white/5"
            >
              <span className="font-medium">{feature.title}</span>
              <span className="mt-1 block text-sm text-zinc-600 dark:text-zinc-400">
                {feature.description}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
