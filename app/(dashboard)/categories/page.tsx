import { createClient } from "@/lib/supabase/server";
import CreateCategoryForm from "./CreateCategoryForm";

export default async function CategoriesPage() {
    const supabase = await createClient();
    const { data: categories, error } = await supabase.from("categories").select("*")

    return (
        <div className="p-5 md:p-8">
            <h1 className="text-2xl font-bold mb-4">Categories</h1>

            {error &&
                <p className="text-red-600">Could not load categories: {error.message}</p>
            }

            {categories && categories.length > 0 ? (
                <ul className="space-y-2 mb-6">
                    {categories.map((category) => (
                        <li
                            key={category.id}
                            className="border border-slate-300 rounded-md p-3 flex justify-between"
                        >
                            <span>{category.name}</span><span className="text-slate-400">{category.type}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                !error && <p className="mb-6">You don&apos;t have any categories yet. Add your first one below</p>
            )}

            <CreateCategoryForm />
        </div>
    )
}