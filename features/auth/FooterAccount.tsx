import Link from "next/link";
import { getSession } from "@/lib/auth";
import { SignOutButton } from "./SignOutButton";

const guestLinks = [
  { href: "/login", label: "Đăng nhập" },
  { href: "/register", label: "Đăng ký" },
];

const linkClass =
  "text-sm text-zinc-600 hover:text-foreground dark:text-zinc-400";

export async function FooterAccount() {
  const session = await getSession();

  if (!session?.user) {
    return (
      <ul className="mt-3 flex flex-col gap-2">
        {guestLinks.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className={linkClass}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="mt-3 flex flex-col gap-2">
      <li>
        <Link href="/account" className={linkClass}>
          Quản lý tài khoản
        </Link>
      </li>
      <li>
        <SignOutButton variant="link" />
      </li>
    </ul>
  );
}
