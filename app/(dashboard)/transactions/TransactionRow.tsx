"use client"

import useLoading from "@/components/loading/useLoading";
import useToast from "@/components/toast/useToast";
import { AccountDropdownOption } from "@/interfaces/accounts";
import { CategoriesDropdownOption } from "@/interfaces/categories";
import { transactionTypes } from "@/interfaces/type";
import { deleteTransaction, updateTransaction } from "@/lib/actions/transactions";
import { FileWarningIcon } from "lucide-react";
import { useActionState, useEffect, useRef } from "react";

interface transactionRowProps {
    accountId: string,
    accountsDropdown: AccountDropdownOption[],
    account: string,
    categoriesDropdown: CategoriesDropdownOption[],
    categories: string,
    transactionTypeDropdown: transactionTypes,
    type: string,
    transactionAmount: number;
    transactionDescription: string,
    transactionDate: string,
}

export default function TransactionRow({ accountId, accountsDropdown, account, categoriesDropdown, categories, transactionTypeDropdown, type, transactionAmount, transactionDescription, transactionDate }: transactionRowProps) {
    const updateDialogRef = useRef<HTMLDialogElement>(null);
    const deleteDialogRef = useRef<HTMLDialogElement>(null);

    const updateTransactionWithId = updateTransaction.bind(null, accountId);
    const [updateState, updateFormAction, updatePending] = useActionState(updateTransactionWithId, undefined);

    const deleteTransactionWithId = deleteTransaction.bind(null, accountId)
    const [deleteState, deleteFormAction, deletePending] = useActionState(deleteTransactionWithId, undefined);

    const { showToast } = useToast();
    const { startLoading, stopLoading } = useLoading();

    useEffect(() => {
        if (updateState?.error) {
            showToast(updateState.error, "error");
        }

        if (deleteState?.error) {
            showToast(deleteState.error, "error");
        }
    }, [deleteState, updateState, showToast])

    useEffect(() => {
        if (updatePending) {
            startLoading();
        } else {
            stopLoading();
        }
    }, [updatePending, startLoading, stopLoading]);

    useEffect(() => {
        if (deletePending) {
            startLoading();
        } else {
            stopLoading();
        }
    }, [stopLoading, startLoading, deletePending])

    return (
        <li className="border border-slate-900 bg-slate-900 rounded-md p-3 flex justify-between items-center">
            <div>
                <span className="text-slate-300">{transactionDescription} <span className="text-slate-400">({type})</span></span>
            </div>
            <div className="flex items-center gap-4">
                <span className="text-white">${transactionAmount.toFixed(2)}</span>
                <button
                    onClick={() => updateDialogRef.current?.showModal()}
                    className="border border-yellow-500 bg-yellow-500 px-4 py-2 text-sm hover:border-yellow-600 hover:bg-yellow-600 transition-all rounded-sm cursor-pointer"
                >
                    {updatePending ? "Updating..." : "Update"}
                </button>
                <button
                    onClick={() => deleteDialogRef.current?.showModal()}
                    className="border border-red-500 bg-red-500 px-2 py-1.5 text-sm text-slate-200 hover:border-red-600 hover:bg-red-600 transition-all rounded-sm cursor-pointer"
                >
                    {deletePending ? "Deleting..." : "Delete"}
                </button>
            </div>

            <dialog
                ref={updateDialogRef}
                className="px-5 py-6 bg-slate-900 border-slate-900 text-slate-200 rounded-md m-auto min-w-md"
                onClick={(e) => {
                    if (e.target === updateDialogRef.current) {
                        updateDialogRef.current.close();
                    }
                }}
            >
                <form
                    action={updateFormAction}
                    className="flex flex-col gap-2"

                >
                    <div className="flex flex-col gap-1">
                        <h2 className="text-2xl underline mb-4">Edit</h2>
                        <h3
                            className="text-xl font-semibold mb-1"
                        >
                            {transactionDescription}
                        </h3>
                        <label
                            htmlFor="bank_account_id"
                        >
                            Account
                        </label>
                        <select
                            id="bank_account_id"
                            name="bank_account_id"
                            defaultValue={account}
                            className="px-2 py-1.5 border border-slate-400 rounded-md"
                        >
                            {accountsDropdown.map((account) => (
                                <option key={account?.id} value={account?.id}>{account?.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor="category_ud"
                        >
                            Category
                        </label>
                        <select
                            name="category_id"
                            id="category_id"
                            defaultValue={categories}
                            className="px-2 py-1.5 border border-slate-400 rounded-md"
                        >
                            {categoriesDropdown.map((category) => (
                                <option
                                    key={category?.id}
                                    value={category?.id}
                                >
                                    {category?.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor="type"
                        >
                            Type
                        </label>
                        <select
                            name="type"
                            id="type"
                            defaultValue={type}
                            className="px-2 py-1.5 border border-slate-400 rounde-md"
                        >
                            {transactionTypeDropdown.map((type) => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>
                    <div
                        className="flex flex-col gap-1"
                    >
                        <label
                            htmlFor="amount"
                        >
                            Amount
                        </label>
                        <input
                            id="amount"
                            name="amount"
                            type="number"
                            defaultValue={transactionAmount}
                            className="px-2 py-1.5 border border-slate-400 rounded-md"
                        />
                    </div>
                    <div
                        className="flex flex-col gap-1"
                    >
                        <label
                            htmlFor="description"
                        >
                            Description
                        </label>
                        <input
                            id="description"
                            name="description"
                            type="text"
                            defaultValue={transactionDescription}
                            className="px-2 py-1.5 border border-slate-400 rounded-md"
                        />
                    </div>
                    <div
                        className="flex flex-col gap-1"
                    >
                        <label
                            htmlFor="transaction_date"
                        >
                            Date
                        </label>
                        <input
                            id="transaction_date"
                            name="transaction_date"
                            defaultValue={transactionDate}
                            type="date"
                            className="px-2 py-1.5 border border-slate-400 [&::-webkit-calendar-picker-indicator]:invert rounded-md"
                        />
                    </div>
                    {updateState?.error && <p className="text-red-600 text-sm">{updateState?.error}</p>}
                    <div className="flex justify-end items-center mt-4">
                        <button
                            type="submit"
                            disabled={updatePending}
                            className="px-4 py-2 bg-yellow-500 border border-yellow-500 rounded-sm hover:bg-yellow-600 hover:border-yellow-600 transition-all cursor-pointer text-black"
                        >
                            {updatePending ? "Updating..." : "Update"}
                        </button>
                    </div>
                </form>
            </dialog>

            <dialog
                ref={deleteDialogRef}
                className="px-5 py-6 bg-slate-900 border-slate-900 text-slate-200 rounded-md m-auto min-w-md"
                onClick={(e) => {
                    if (e.target === deleteDialogRef.current) {
                        deleteDialogRef.current.close();
                    }
                }}
            >
                <form action={deleteFormAction} className="flex flex-col gap-3">
                    <h2 className="text-2xl font-semibold">Delete Warning</h2>
                    <div className="flex items-center justify-start gap-2 border border-slate-300 p-4">
                        <FileWarningIcon />
                        <span>Are you sure you want to delete this transaction?</span>
                    </div>
                    <button
                        type="submit"
                        disabled={deletePending}
                        className="px-4 py-2 bg-red-500 border-red-500 rounded-sm text-white cursor-pointer hover:bg-red-600 hover:border-red-600 transition-all"
                    >
                        {deletePending ? "Deleting..." : "Delete"}
                    </button>
                </form>
            </dialog>
        </li>

    )
}