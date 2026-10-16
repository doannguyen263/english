import type { Metadata } from "next";
import { Suspense } from "react";
import { ResetPasswordPanel } from "./ResetPasswordPanel";

export const metadata: Metadata = {
  title: "Đặt lại mật khẩu",
};

export default function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string; error?: string }>;
}) {
  return (
    <main className="mx-auto flex w-full max-w-xl flex-1 flex-col px-4 py-8">
      <h1 className="text-2xl font-semibold">Đặt lại mật khẩu</h1>
      <div className="mt-6">
        <Suspense fallback={<p className="text-sm text-zinc-500">…</p>}>
          <ResetPasswordPanel searchParams={searchParams} />
        </Suspense>
      </div>
    </main>
  );
}
