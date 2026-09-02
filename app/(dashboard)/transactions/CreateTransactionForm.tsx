"use client";

import useLoading from "@/components/loading/useLoading";
import useToast from "@/components/toast/useToast";
import { createTransaction } from "@/lib/actions/transactions";
import { useActionState, useEffect } from "react";

const TRANSACTION_TYPES = ["income", "expense"];

function today() {
    return new Date().toISOString().slice(0, 10);
}

export default function CreateTransactionForm({
    accounts,
    categories,
}: {
    accounts: { id: string; name: string }[];
    categories: { id: string; name: string }[];
}) {
    const [state, formAction, pending] = useActionState(createTransaction, undefined);
    const { showToast } = useToast();
    const { startLoading, stopLoading } = useLoading();

    useEffect(() => {
        if (state?.error) {
            showToast(state.error, "error");
        }
    }, [showToast, state]);

    useEffect(() => {
        if (pending) {
            startLoading();
        } else {
            stopLoading();
        }
    }, [pending, startLoading, stopLoading])

    return (
        <form action={formAction} className="p-4 rounded-md bg-white border-slate-300 flex flex-col gap-2 max-w-sm">
            <h2 className="text-sm font-semibold mb-2">Add Transactions</h2>
            <div className="flex flex-col gap-1">
                <label htmlFor="bank_account_id" className="text-sm">Account</label>
                <select id="bank_account_id" name="bank_account_id" className="px-2 py-1.5 border border-slate-400 rounded-sm text-sm">
                    {accounts.map((account) => (
                        <option key={account.id} value={account.id} className="hover:text-black text-sm">{account.name}</option>
                    ))}
                </select>
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="category_id" className="text-sm">Category</label>
                <select id="category_id" name="category_id" className="text-sm px-2 py-1.5 border border-slate-400 rounded-sm">
                    <option value="">Uncategorized</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id} className="text-sm">{category.name}</option>
                    ))}
                </select>
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="type" className="text-sm">Type</label>
                <select id="type" name="type" className="px-2 py-1.5 border border-slate-400 rounded-sm text-sm">
                    {TRANSACTION_TYPES.map((type) => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="amount" className="text-sm">Amount</label>
                <input
                    type="number"
                    step="0.01"
                    id="amount"
                    name="amount"
                    className="px-2 py-1.5 border border-slate-400 rounded-sm text-sm"
                />
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="description" className="text-sm">Description</label>
                <input
                    type="text"
                    id="description"
                    name="description"
                    className="px-2 py-1.5 border border-slate-400 rounded-sm text-sm"
                />
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="transaction_date" className="text-sm">Date</label>
                <input
                    type="date"
                    id="transaction_date"
                    name="transaction_date"
                    defaultValue={today()}
                    className="px-2 py-1.5 border border-slate-400 rounded-sm text-sm"
                />
            </div>
            {state?.error && <p className="text-red-600 font-semibold">{state.error}</p>}
            <button
                type="submit"
                disabled={pending}
                className="mt-2 px-4 py-2 bg-green-500 border border-green-500 rounded-md text-white text-sm hover:bg-green-800 hover:border-green-800 cursor-pointer"
            >
                {pending ? "Adding transaction..." : "Add transaction"}
            </button>
        </form>
    );
}
