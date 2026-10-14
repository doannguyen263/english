import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-black/10 px-4 py-3 dark:border-white/15">
      <div className="container mx-auto flex items-center gap-2">
        <Link href="/" className="font-medium">
          Học tiếng Anh
        </Link>
        <div className="ml-auto flex items-center gap-2">
          <Link href="/login" className="text-sm">
            Đăng nhập
          </Link>
          <Link href="/register" className="text-sm">
            Đăng ký
          </Link>
        </div>
      </div>
    </header>
  );
}