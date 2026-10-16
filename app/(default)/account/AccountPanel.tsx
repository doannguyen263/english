import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth, getSession } from "@/lib/auth";
import { AccountTabs } from "./AccountTabs";

export async function AccountPanel() {
  const session = await getSession();

  if (!session?.user) {
    redirect("/login");
  }

  const accounts = await auth.api.listUserAccounts({
    headers: await headers(),
  });
  const canChangePassword = accounts.some(
    (account) => account.providerId === "credential",
  );

  const createdAt = new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "Asia/Ho_Chi_Minh",
  }).format(new Date(session.user.createdAt));

  return (
    <AccountTabs
      name={session.user.name}
      email={session.user.email}
      createdAt={createdAt}
      canChangePassword={canChangePassword}
    />
  );
}
