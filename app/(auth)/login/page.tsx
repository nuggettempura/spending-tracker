"use client"

import { login } from "@/lib/actions/auth";
import { LogIn } from "lucide-react";
import Link from "next/link";
import { useActionState } from "react";

export default function Login() {
    const [state, formAction, pending] = useActionState(login, undefined);

    return (
        <form action={formAction} className="flex flex-col justify-center items-center gap-2 bg-white rounded-md px-10 py-6 min-w-87.5 max-w-87.5">
            <div className="mx-auto">
                <p className="mb-4 px-4 py-1.5 flex items-center justify-between gap-1 bg-gray-100 border-slate-300 rounded-sm text-shadow-slate-800 text-sm font-semibold"><span><LogIn height={16} width={16} /></span>Login</p>
            </div>
            <div className="flex flex-col items-start gap-2 w-full my-1">
                <label className="text-shadow-slate-800 text-sm" htmlFor="emailInput">Email</label>
                <input
                    id="emailInput"
                    className="px-2 py-1.5 w-full border border-slate-400 rounded-sm text-sm"
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                />
            </div>
            <div className="my-1 flex flex-col gap-2 w-full">
                <div className="flex items-center justify-between">
                    <label className="text-shadow-slate-800 text-sm" htmlFor="passwordInput">Password</label>
                    <Link
                        href={'/passwordrecovery'}
                        className="text-sm text-shadow-slate-800 hover:text-black no-underline transition-all hover:underline hover:font-semibold"
                    >
                        Forgot password?
                    </Link>
                </div>
                <input
                    id="passwordInput"
                    className="px-2 py-1.5 w-full border border-slate-400 rounded-sm text-sm"
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                />
            </div>
            {state?.error && <p className="text-sm text-red-600">{state.error}</p>}
            <button
                className="mt-2 px-6 py-2 border bg-black border-black rounded-md w-full text-white text-sm hover:bg-gray-100 hover:border-slate-300 hover:text-black cursor-pointer transition-all"
                type="submit"
            >
                {pending ? "Pending" : "Login"}
            </button>
            <span className="my-2 flex gap-1 justify-center items-center">
                <span className="text-slate-800 text-sm">
                    Don't have an account?
                </span>
                <Link
                    href={'/signup'}
                    className="text-slate-800 text-sm no-underline hover:text-black hover:underline hover:font-semibold  transition-all cursor-pointer"
                >
                    Sign up
                </Link>
            </span>
        </form>
    )
}