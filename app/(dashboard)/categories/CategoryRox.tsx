"use client"

import useLoading from "@/components/loading/useLoading";
import useToast from "@/components/toast/useToast";
import { CategoriesRowProps } from "@/interfaces/categories";
import { deleteCategories, updateCategories } from "@/lib/actions/categories";
import { FileWarningIcon } from "lucide-react";
import { useActionState, useEffect, useRef } from "react";


export default function CategoryRow({ categoryId, categoryName, categoryType, categoryTypeDropdown }: CategoriesRowProps) {
    const categoryUpdateDialogRef = useRef<HTMLDialogElement>(null);
    const categoryDeleteDialogRef = useRef<HTMLDialogElement>(null);

    const updateCategoryWithId = updateCategories.bind(undefined, categoryId);
    const [updateState, updateFormAction, updatePending] = useActionState(updateCategoryWithId, undefined);

    const deleteCategoryWithId = deleteCategories.bind(undefined, categoryId);
    const [deleteState, deleteFormAction, deletePending] = useActionState(deleteCategoryWithId, undefined);

    const { showToast } = useToast();
    const { startLoading, stopLoading } = useLoading();

    useEffect(() => {
        if (updateState?.error) {
            showToast(updateState?.error, "error")
        }

        if (deleteState?.error) {
            showToast(deleteState?.error, "error")
        }
    }, [updateState, deleteState, showToast]);

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
        <li className="flex justify-between items-center bg-white rounded-sm p-3">
            <p className="text-black text-sm font-semibold">{categoryName}</p>
            <div className="flex justify-between items-center gap-3">
                <p className="text-sm font-semibold">{categoryType}</p>
                <button
                    onClick={() => categoryUpdateDialogRef.current?.showModal()}
                    className="border border-yellow-500 bg-yellow-500 px-4 py-2 text-sm text-white min-w-10.5 hover:border-yellow-600 hover:bg-yellow-600  transition-all rounded-sm cursor-pointer"
                >
                    Edit
                </button>
                <button
                    onClick={() => categoryDeleteDialogRef.current?.showModal()}
                    className="border border-red-500 bg-red-500 px-4 py-2 text-sm text-slate-200 hover:border-red-600 hover:bg-red-600 transition-all rounded-sm cursor-pointer min-w-10.5"
                >
                    Delete
                </button>
            </div>

            <dialog
                ref={categoryUpdateDialogRef}
                onClick={(e) => {
                    if (e.target === categoryUpdateDialogRef.current) {
                        categoryUpdateDialogRef.current.close();
                    }
                }}
                className="px-5 py-6 bg-slate-900 border-slate-900 text-slate-200 rounded-md m-auto min-w-md"
            >
                <form
                    action={updateFormAction}
                    className="flex flex-col gap-2"
                >
                    <h2 className="text-2xl font-semibold">{categoryName}</h2>
                    <div
                        className="flex flex-col gap-1"
                    >
                        <label
                            htmlFor="name"
                        >
                            Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            defaultValue={categoryName}
                            className="px-2 py-1.5 border border-slate-400 rounded-md"
                        />
                    </div>
                    <div
                        className="flex flex-col gap-1"
                    >
                        <label
                            htmlFor="type"
                        >
                            Type
                        </label>
                        <select
                            id="type"
                            name="type"
                            defaultValue={categoryType}
                            className="px-2 py-1.5 border border-slate-400 rounded-md"
                        >
                            {categoryTypeDropdown.map((type) => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
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
                ref={categoryDeleteDialogRef}
                onClick={(e) => {
                    if (e.target === categoryDeleteDialogRef.current) {
                        categoryDeleteDialogRef.current.close();
                    }
                }}
                className="px-5 py-6 bg-slate-900 border-slate-900 text-slate-200 rounded-md m-auto min-w-md"
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