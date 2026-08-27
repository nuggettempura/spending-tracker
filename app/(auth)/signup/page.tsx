"use client"

import { signUp } from "@/lib/actions/auth"
import { UserPlus } from "lucide-react";
import Link from "next/link";
import { useActionState } from "react"

export default function SignUp() {
    const [state, formAction, pending] = useActionState(signUp, undefined);

    return (
        <form action={formAction} className="flex flex-col justify-center items-center gap-2 rounded-md px-10 py-6 min-w-87.5 max-w-87.5 bg-white">
            <div>
                <p className="mb-4 px-4 py-1.5 flex items-center justify-between gap-1 bg-gray-100 border-slate-300 rounded-sm text-slate-800 text-sm font-semibold"><span><UserPlus height={16} width={16} /></span>Signup</p>
            </div>
            <div className="flex flex-col items-start gap-1 w-full my-1">
                <label
                    className="text-sm"
                    htmlFor="emailInput"
                >
                    Email
                </label>
                <input
                    id="emailInput"
                    className="text-sm px-2 py-1.5 w-full border border-slate-400 rounded-sm text-slate-500"
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                />
            </div>
            <div className="flex flex-col items-start gap-1 w-full my-1">
                <label
                    className="text-sm"
                    htmlFor="passwordInput"
                >
                    Password
                </label>
                <input
                    id="passwordInput"
                    className="text-sm px-2 py-1.5 w-full border border-slate-400 rounded-sm text-slate-500"
                    type="password"
                    name="password"
                    placeholder="Enter your password here"
                />
            </div>
            <div className="flex flex-col w-full items-start gap-1 my-1">
                <label
                    className="text-sm"
                    htmlFor="passwordCheckInput"
                >
                    Confirm Password
                </label>
                <input
                    id="passwordCheckInput"
                    className="text-sm px-2 py-1.5 w-full border border-slate-400 rounded-sm text-slate-500"
                    type="password"
                    name="passwordCheck"
                    placeholder="Confirm your password here"
                />
            </div>
            <div className="flex flex-col items-start gap-1 w-full my-1">
                <label
                    className="text-sm"
                    htmlFor="displayName"
                >
                    Display Name
                </label>
                <input
                    id="displayName"
                    className="text-sm px-2 py-1 w-full border border-slate-400 rounded-sm text-slate-500"
                    type="text"
                    name="displayName"
                    placeholder="What's your name?"
                />
            </div>
            {state?.error && <p className="text-red-600 font-semibold">{state.error}</p>}
            <button
                className="mt-2 px-6 py-2 border bg-black border-black rounded-md w-full text-white text-sm hover:bg-gray-100 hover:border-slate-300 hover:text-black cursor-pointer transition-all"
                type="submit"
            >
                {pending ? "Pending" : "Sign Up"}
            </button>
            <div className="my-2 flex items-center justify-center gap-1">
                <span className="text-sm">Already have an account?</span>
                <Link
                    href={'/login'}
                    className="text-sm no-underline hover:underline transition-all"
                >
                    Login
                </Link>
            </div>
        </form>
    )
}