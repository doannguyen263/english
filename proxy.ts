import { getSessionCookie } from "better-auth/cookies";
import { NextResponse, type NextRequest } from "next/server";

// Path prefixes that require a session. A prefix covers that page and its children.
const PROTECTED_PREFIXES = ["/account"];

function needsSession(pathname: string) {
  return PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

// Next.js 16 Proxy (the old middleware.ts). Runs before the page shell streams.
export function proxy(request: NextRequest) {
  if (!needsSession(request.nextUrl.pathname) || getSessionCookie(request)) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/login", request.url));
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\..*).*)"],
};
