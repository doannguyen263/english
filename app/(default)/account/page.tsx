import type { Metadata } from "next";
import { Suspense } from "react";
import { AccountPanel } from "@/features/auth/AccountPanel";

export const metadata: Metadata = {
  title: "Quản lý tài khoản",
};

export default function AccountPage() {
  return (
    <main className="mx-auto flex w-full max-w-xl flex-1 flex-col px-4 py-8">
      <h1 className="text-2xl font-semibold">Quản lý tài khoản</h1>
      <div className="mt-6">
        <Suspense fallback={<p className="text-sm text-zinc-500">…</p>}>
          <AccountPanel />
        </Suspense>
      </div>
    </main>
  );
}
