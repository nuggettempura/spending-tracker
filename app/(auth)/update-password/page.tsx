"use client"

import { updatePassword } from "@/lib/actions/auth"
import { KeyIcon } from "lucide-react";
import { useActionState } from "react"

export default function UpdatePassword() {
    const [state, formAction, pending] = useActionState(updatePassword, undefined);
    return (
        <form action={formAction} className="flex flex-col justify-center items-center gap-2 rounded-md px-10 py-6 min-w-87.5 max-w-87.5 bg-white ">
            <div className="mx-auto">
                <p className="mb-4 px-4 py-1.5 flex items-center justify-between gap-1 bg-gray-100 border-slate-300 rounded-sm text-shadow-slate-800 text-sm font-semibold"><span><KeyIcon height={16} width={16} /></span>Your New Password</p>
            </div>
            <div className="flex flex-col gap-1 my-1 w-full">
                <label
                    htmlFor="password"
                    className="text-sm"
                >
                    Your New Password
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    className="px-2 py-1.5 w-full border border-slate-400 rounded-sm text-sm"
                />
            </div>
            <div className="flex flex-col gap-1 my-1 w-full">
                <label
                    htmlFor="confirmPassword"
                    className="text-sm"
                >
                    Confirm Password
                </label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className="px-2 py-1.5 w-full border border-slate-400 rounded-sm text-sm"
                />
            </div>
            {state?.error &&
                <p
                    className="text-red-600 text-sm"
                >
                    {state?.error}
                </p>
            }
            <button
                type="submit"
                className="mt-2 px-6 py-2 border bg-black border-black rounded-md w-full text-white text-sm hover:bg-gray-100 hover:border-slate-300 hover:text-black cursor-pointer transition-all"
            >
                {pending ? "Pending..." : "Update Password"}
            </button>
        </form>
    )
}