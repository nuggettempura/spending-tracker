"use client";

import useLoading from "@/components/loading/useLoading";
import useToast from "@/components/toast/useToast";
import { deleteAccount, updateAccount } from "@/lib/actions/accounts";
import { useActionState, useEffect, useRef } from "react";

const ACCOUNT_TYPES = ["bank", "ewallet", "brokerage", "cash", "other"];

interface AccountRowProps {
    accountId: string;
    name: string;
    accountType: string;
    currentBalance: number;
}

export default function AccountRow({ accountId, name, accountType, currentBalance }: AccountRowProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    const updateAccountWithId = updateAccount.bind(null, accountId);
    const [updateState, updateFormAction, updatePending] = useActionState(updateAccountWithId, undefined);

    const deleteAccountWithId = deleteAccount.bind(null, accountId);
    const [deleteState, deleteFormAction, deletePending] = useActionState(deleteAccountWithId, undefined);

    const { showToast } = useToast();
    const { startLoading, stopLoading } = useLoading();

    useEffect(() => {
        if (deleteState?.error) {
            showToast(deleteState.error, "error");
        }
        if (updateState?.error) {
            showToast(updateState.error, "error");
        }
    }, [deleteState, updateState, showToast]);

    useEffect(() => {
        if (updatePending) {
            startLoading()
        } else {
            stopLoading()
        }
    }, [updatePending, startLoading, stopLoading]);

    useEffect(() => {
        if (deletePending) {
            startLoading()
        } else {
            stopLoading()
        }
    }, [deletePending, startLoading, stopLoading]);


    return (
        <li className="border border-slate-300 rounded-md p-3 flex justify-between items-center">
            <div>
                <span>{name} <span className="text-slate-400 text-sm">({accountType})</span></span>
            </div>
            <div className="flex items-center gap-2">
                <span>${currentBalance.toFixed(2)}</span>
                <button onClick={() => dialogRef.current?.showModal()} className="text-sm px-3 py-1.5 bg-blue-500 border-blue-500 rounded-sm text-white cursor-pointer">
                    {updatePending ? "Updating..." : "Update"}
                </button>
                <form action={deleteFormAction}>
                    <button type="submit" disabled={deletePending} className="text-sm px-3 py-1.5 bg-red-500 border-red-500 rounded-sm text-white cursor-pointer">
                        {deletePending ? "Deleting..." : "Delete"}
                    </button>
                </form>
            </div>

            {deleteState?.error && <p className="text-red-600 text-sm mt-1">{deleteState.error}</p>}

            <dialog ref={dialogRef} className="px-4 py-6 bg-slate-900 border-slate-900 text-slate-200 rounded-md m-auto min-w-md" onClick={(e) => {
                if (e.target === dialogRef.current) {
                    dialogRef.current?.close();
                }
            }}>
                <form action={updateFormAction} className="flex flex-col gap-2">
                    <div className="flex flex-col gap-1">
                        <label htmlFor={`editAccountName-${accountId}`}>Name</label>
                        <input
                            id={`editAccountName-${accountId}`}
                            name="name"
                            type="text"
                            defaultValue={name}
                            className="px-2 py-1.5 border border-slate-400 rounded-md"
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor={`editAccountType-${accountId}`}>Type</label>
                        <select
                            id={`editAccountType-${accountId}`}
                            name="account_type"
                            defaultValue={accountType}
                            className="px-2 py-1.5 border border-slate-400 rounded-md"
                        >
                            {ACCOUNT_TYPES.map((type) => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>
                    {updateState?.error && <p className="text-red-600 text-sm">{updateState.error}</p>}
                    <div className="flex gap-2 mt-2">
                        <button type="submit" disabled={updatePending} className="px-4 py-2 bg-green-500 border border-green-500 rounded-md text-white hover:bg-green-800 hover:border-green-800 cursor-pointer">
                            {updatePending ? "Saving..." : "Save"}
                        </button>
                        <button type="button" onClick={() => dialogRef.current?.close()} className="px-4 py-2 border border-slate-400 rounded-md cursor-pointer">
                            Cancel
                        </button>
                    </div>
                </form>
            </dialog>
        </li>
    );
}