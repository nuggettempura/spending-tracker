"use client";

import { createTransaction } from "@/lib/actions/transactions";
import { useActionState } from "react";

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

    return (
        <form action={formAction} className="p-4 rounded-md bg-slate-900 flex flex-col gap-2 max-w-sm text-slate-300">
            <h2 className="text-xl font-semibold">Add Transactions</h2>
            <div className="flex flex-col gap-1">
                <label htmlFor="bank_account_id">Account</label>
                <select id="bank_account_id" name="bank_account_id" className="px-2 py-1.5 border border-slate-400 rounded-sm">
                    {accounts.map((account) => (
                        <option key={account.id} value={account.id} className="hover:text-black">{account.name}</option>
                    ))}
                </select>
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="category_id">Category</label>
                <select id="category_id" name="category_id" className="px-2 py-1.5 border border-slate-400 rounded-sm">
                    <option value="">Uncategorized</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="type">Type</label>
                <select id="type" name="type" className="px-2 py-1.5 border border-slate-400 rounded-sm">
                    {TRANSACTION_TYPES.map((type) => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="amount">Amount</label>
                <input
                    type="number"
                    step="0.01"
                    id="amount"
                    name="amount"
                    className="px-2 py-1.5 border border-slate-400 rounded-sm"
                />
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="description">Description</label>
                <input
                    type="text"
                    id="description"
                    name="description"
                    className="px-2 py-1.5 border border-slate-400 rounded-sm"
                />
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="transaction_date">Date</label>
                <input
                    type="date"
                    id="transaction_date"
                    name="transaction_date"
                    defaultValue={today()}
                    className="px-2 py-1.5 border border-slate-400 rounded-sm"
                />
            </div>
            {state?.error && <p className="text-red-600 font-semibold">{state.error}</p>}
            <button
                type="submit"
                disabled={pending}
                className="mt-2 px-4 py-2 bg-green-500 border border-green-500 rounded-md text-white hover:bg-green-800 hover:border-green-800 cursor-pointer"
            >
                {pending ? "Adding transaction..." : "Add transaction"}
            </button>
        </form>
    );
}
