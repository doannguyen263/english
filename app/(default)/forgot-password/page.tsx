import type { Metadata } from "next";
import { ForgotPasswordForm } from "./ForgotPasswordForm";

export const metadata: Metadata = {
    title: "Quên mật khẩu",
};

export default function ForgotPasswordPage() {
    return (
        <main className="mx-auto flex w-full max-w-xl flex-1 flex-col px-4 py-8">
            <h1 className="text-2xl font-semibold">Quên mật khẩu</h1>
            <div className="mt-6">
                <ForgotPasswordForm />
            </div>
        </main>
    );
}