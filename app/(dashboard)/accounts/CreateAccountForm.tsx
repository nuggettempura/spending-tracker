"use client"

import useLoading from "@/components/loading/useLoading";
import useToast from "@/components/toast/useToast";
import { createAccount } from "@/lib/actions/accounts"
import { useActionState, useEffect } from "react"

const ACCOUNT_TYPES = ["bank", "ewallet", "brokerage", "cash", "other"];

export default function CreateAccountForm() {
    const [state, formAction, pending] = useActionState(createAccount, undefined);
    const { showToast } = useToast();
    const { startLoading, stopLoading } = useLoading();

    useEffect(() => {
        if (pending) {
            startLoading()
        } else {
            stopLoading()
        }
    }, [pending, startLoading, stopLoading]);

    useEffect(() => {
        if (state?.error) {
            showToast(state.error, "error");
        }
    }, [state, showToast]);

    return (
        <form action={formAction} className="flex flex-col gap-2 max-w-sm">
            <div className="flex flex-col gap-1">
                <label htmlFor="name">Account Name</label>
                <input id="name" name="name" type="text" className="px-2 p-1.5 border border-slate-400 rounded-sm" />
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="account_type">Type</label>
                <select name="account_type" id="account_type" className="px-2 py-3 border border-slate-400 rounded-sm">
                    {ACCOUNT_TYPES.map((type) => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="initial_balance">Initial Balance</label>
                <input id="initial_balance" name="initial_balance" type="number" step="0.01" className="px-2 p-1.5 border border-slate-400 rounded-sm" />
            </div>
            {state?.error && <p className="text-red-600 font-semibold">{state.error}</p>}
            <button type="submit" disabled={pending} className="mt-2 px-4 py-2 bg-green-500 border border-green-600 rounded-md text-white hover:bg-green-800 cursor-pointer">
                {pending ? "Adding..." : "Add Account"}
            </button>
        </form>
    )
}