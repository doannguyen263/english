import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { SignOutButton } from "./SignOutButton";

export async function HeaderAuth() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/login">Đăng nhập</Link>
        <Link href="/register">Đăng ký</Link>
      </div>
    );
  }

  return (
    <>
      <span>{session.user.name}</span>
      <SignOutButton />
    </>
  );
}
