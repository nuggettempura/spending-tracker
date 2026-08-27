"use client"

import { login } from "@/lib/actions/auth";
import Link from "next/link";
import { useActionState } from "react";

export default function Login() {
    const [state, formAction, pending] = useActionState(login, undefined);

    return (
        <form action={formAction} className="flex flex-col justify-center items-center gap-2 border border-slate-700 rounded-md p-4 bg-[#1F305E] min-w-87.5 max-w-87.5">
            <p className="text-xl text-slate-200 mb-4">Login</p>
            <div className="flex flex-col items-start gap-2 w-full">
                <label className="text-slate-500" htmlFor="emailInput">Login</label>
                <input
                    id="emailInput"
                    className="px-2 py-1.5 w-full border border-slate-400 rounded-sm"
                    type="email"
                    name="email"
                />
            </div>
            <div className="flex flex-col items-start gap-2 w-full">
                <label className="text-slate-500" htmlFor="passwordInput">Password</label>
                <input
                    id="passwordInput"
                    className="px-2 py-1.5 w-full border border-slate-400 rounded-sm"
                    type="password"
                    name="password"
                />
            </div>
            {state?.error && <p className="my-2 text-red-600 font-semibold">{state.error}</p>}
            <button
                className="mt-4 px-6 py-2 border bg-green-500 border-green-500 rounded-md text-white text-sm hover:bg-green-800 hover:border-green-800 hover:text-slate-100 cursor-pointer transition-all"
                type="submit"
            >
                {pending ? "Pending" : "Login"}
            </button>
            <span className="my-2 flex gap-0.5 justify-center items-center">
                <span className="text-slate-300 text-sm">
                    Don't have an account?
                </span>
                <Link
                    href={'/signup'}
                    className="text-white text-sm hover:text-slate-300 no-underline transition-all cursor-pointer"
                >
                    Sign up
                </Link>
            </span>
        </form>
    )
}