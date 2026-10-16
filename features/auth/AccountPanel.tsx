import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { SignOutButton } from "./SignOutButton";

export async function AccountPanel() {
  const session = await getSession();

  if (!session?.user) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col gap-6">
      <dl className="flex flex-col gap-4 text-sm">
        <div>
          <dt className="text-zinc-500">Tên</dt>
          <dd className="mt-1">{session.user.name}</dd>
        </div>
        <div>
          <dt className="text-zinc-500">Email</dt>
          <dd className="mt-1">{session.user.email}</dd>
        </div>
      </dl>
      <div>
        <SignOutButton />
      </div>
    </div>
  );
}
