"use client"

import useLoading from "@/components/loading/useLoading";
import useToast from "@/components/toast/useToast";
import { createCategories } from "@/lib/actions/categories";
import { useActionState, useEffect } from "react";

const CATEGORY_TYPE = ["income", "expense"]

export default function CreateCategoryForm() {
    const [state, formAction, pending] = useActionState(createCategories, undefined);
    const { showToast } = useToast();
    const { startLoading, stopLoading } = useLoading();

    useEffect(() => {
        if (state?.error) {
            showToast(state.error, "error")
        }
    }, [showToast, state]);

    useEffect(() => {
        if (pending) {
            startLoading()
        } else {
            stopLoading();
        }
    }, [pending, startLoading, stopLoading]);

    return (
        <form action={formAction} className="flex flex-col gap-2 max-w-sm p-4 bg-white border-slate-300 rounded-sm">
            <h2 className="text-sm font-bold mb-2">Add category</h2>
            <div className="flex flex-col gap-1">
                <label htmlFor="categoryName" className="text-sm">Category Name</label>
                <input id="categoryName" name="categoryName" type="text" className="px-2 py-1.5 border border-slate-400 rounded-sm text-sm" />
            </div>
            <div className="flex flex-col gap-1">
                <label htmlFor="type" className="text-sm">Type</label>
                <select name="type" id="type" className="px-2 py-1.5 border border-slate-400 rounded-sm text-sm">
                    {CATEGORY_TYPE.map((category) => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
            </div>
            {state?.error && <p className="text-red-600 font-semibold">{state.error}</p>}
            <button type="submit" disabled={pending} className="mt-2 px-4 py-2 bg-green-500 border border-green-500 rounded-md text-white text-sm hover:bg-green-800 hover:border-green-800 cursor-pointer transition-all">{pending ? "Adding category..." : "Add category"}</button>
        </form>
    )
}