"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { SignOutButton } from "@/app/(default)/account/SignOutButton";

const itemClass =
  "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-zinc-700 hover:bg-black/[.05] dark:text-zinc-200 dark:hover:bg-white/10";

export function UserMenu({ name }: { name: string }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        className="flex max-w-48 items-center gap-2 rounded-full py-1 pr-2.5 pl-1 text-sm font-medium hover:bg-black/[.05] dark:hover:bg-white/10"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="icon-user-circle-o"></span>
        <span className="truncate">{name}</span>
      </button>
      {open ? (
        <div
          id={menuId}
          role="menu"
          className="absolute right-0 z-50 mt-1.5 w-52 rounded-xl border border-black/10 bg-background p-1 shadow-lg dark:border-white/15"
        >
          <Link
            href="/account"
            role="menuitem"
            className={itemClass}
            onClick={() => setOpen(false)}
          >
            <span className="icon-user-circle-o"></span>
            Quản lý tài khoản
          </Link>
          <SignOutButton variant="menu" />
        </div>
      ) : null}
    </div>
  );
}