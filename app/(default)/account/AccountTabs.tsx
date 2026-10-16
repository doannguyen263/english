"use client";

import { useState } from "react";
import { PasswordForm } from "./PasswordForm";
import { ProfileForm } from "./ProfileForm";
import { SignOutButton } from "./SignOutButton";

type AccountTab = "profile" | "password";

const tabs: { id: AccountTab; label: string }[] = [
  { id: "profile", label: "Thông tin cơ bản" },
  { id: "password", label: "Đổi mật khẩu" },
];

export function AccountTabs({
  name,
  email,
  createdAt,
  canChangePassword,
}: {
  name: string;
  email: string;
  createdAt: string;
  canChangePassword: boolean;
}) {
  const [tab, setTab] = useState<AccountTab>("profile");

  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-10">
      <nav className="flex w-full shrink-0 flex-col gap-1 sm:w-56" aria-label="Tài khoản">
        <div role="tablist" className="flex flex-col gap-1">
          {tabs.map((item) => {
            const selected = tab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={selected}
                className={`rounded-lg px-3 py-2 text-left text-sm ${
                  selected
                    ? "bg-primary font-medium text-white"
                    : "text-zinc-700 hover:bg-black/[.05] dark:text-zinc-200 dark:hover:bg-white/10"
                }`}
                onClick={() => setTab(item.id)}
              >
                {item.label}
              </button>
            );
          })}
        </div>
        <div className="mt-4 border-t border-black/10 pt-4 dark:border-white/10">
          <SignOutButton variant="sidebar" />
        </div>
      </nav>

      <div role="tabpanel" className="min-w-0 flex-1">
        {tab === "profile" ? (
          <ProfileForm name={name} email={email} createdAt={createdAt} />
        ) : null}
        {tab === "password" ? (
          canChangePassword ? (
            <PasswordForm />
          ) : (
            <section className="flex flex-col gap-2">
              <h2 className="text-lg font-semibold">Đổi mật khẩu</h2>
              <p className="text-sm text-zinc-500">
                Tài khoản này đăng nhập bằng Google, nên không có mật khẩu để
                đổi.
              </p>
            </section>
          )
        ) : null}
      </div>
    </div>
  );
}
