"use client"

import { signUp } from "@/lib/actions/auth"
import { useActionState } from "react"

export default function SignUp() {
    const [state, formAction, pending] = useActionState(signUp, undefined);

    return (
        <form action={formAction} className="flex flex-col justify-center items-center gap-2 border border-slate-300 rounded-md p-4 bg-[#1F305e]">
            <p className="text-xl text-slate-200 mb-4">Sign Up</p>
            <div className="flex flex-col items-start gap-2">
                <label
                    className="text-slate-500"
                    htmlFor="emailInput"
                >
                    Email
                </label>
                <input
                    id="emailInput"
                    className="border border-slate-400 rounded-sm text-white px-2 py-1"
                    type="email"
                    name="email"
                />
            </div>
            <div className="flex flex-col items-start gap-2">
                <label
                    className="text-slate-500"
                    htmlFor="passwordInput"
                >
                    Password
                </label>
                <input
                    id="passwordInput"
                    className="border border-slate-400 rounded-sm text-white px-2 py-1"
                    type="password"
                    name="password"
                />
            </div>
            <div className="flex flex-col items-start gap-2">
                <label
                    className="text-slate-500"
                    htmlFor="passwordCheckInput"
                >
                    Confirm Password
                </label>
                <input
                    id="passwordCheckInput"
                    className="border border-slate-400 rounded-sm text-white px-2 py-1"
                    type="password"
                    name="passwordCheck"
                />
            </div>
            <div className="flex flex-col items-start gap-2">
                <label
                    className="text-slate-500"
                    htmlFor="displayName"
                >
                    Display Name
                </label>
                <input
                    id="displayName"
                    className="border border-slate-400 rounded-sm text-white px-2 py-1"
                    type="text"
                    name="displayName"
                />
            </div>
            {state?.error && <p className="text-red-600 font-semibold">{state.error}</p>}
            <button
                className="mt-4 px-4 py-2 border bg-green-500 border-green-600 rounded-md text-white hover:bg-green-800 hover:border-green-800 hover:text-slate-100 cursor-pointer transition-all"
                type="submit"
            >
                {pending ? "Pending" : "Sign Up"}
            </button>
        </form>
    )
}