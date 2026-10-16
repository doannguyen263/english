import Link from "next/link";
import { ResetPasswordForm } from "./ResetPasswordForm";

export async function ResetPasswordPanel({
  searchParams,
}: {
  searchParams: Promise<{ token?: string; error?: string }>;
}) {
  const { token, error } = await searchParams;
  const invalid = !token || error === "INVALID_TOKEN";

  if (invalid) {
    return (
      <div className="flex flex-col gap-3">
        <p className="text-sm text-red-600">
          Liên kết đặt lại mật khẩu không hợp lệ hoặc đã hết hạn.
        </p>
        <Link href="/forgot-password" className="text-sm">
          Yêu cầu liên kết mới
        </Link>
      </div>
    );
  }

  return <ResetPasswordForm token={token} />;
}
