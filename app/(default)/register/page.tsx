import type { Metadata } from "next";
import { AuthForm } from "@/features/auth/AuthForm";

export const metadata: Metadata = {
    title: "Đăng ký",
};

export default function RegisterPage() {
    return (
        <main className="mx-auto flex w-full max-w-xl flex-1 flex-col px-4 py-8">
            <h1 className="text-2xl font-semibold">Đăng ký</h1>
            <div className="mt-6">
                <AuthForm mode="register" />
            </div>
        </main>
    );
}