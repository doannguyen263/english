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
      <div>
        <Link href="/login">Login</Link>
        <Link href="/register">Register</Link>
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
