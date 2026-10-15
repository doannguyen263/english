import { AuthForm } from "@/features/auth/AuthForm";
export default function LoginPage() {
    return (
        <main className="mx-auto flex w-full max-w-xl flex-1 flex-col px-4 py-8">
            <h1 className="text-2xl font-semibold">Đăng nhập</h1>
            <div className="mt-6">
                <AuthForm mode="login" />
            </div>
        </main>
    );
}