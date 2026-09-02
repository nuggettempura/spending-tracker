import { createClient } from "@/lib/supabase/server";
import CreateCategoryForm from "./CreateCategoryForm";
import CategoryRow from "./CategoryRox";
import { CategoriesType } from "@/interfaces/categories";

export default async function CategoriesPage() {
    const supabase = await createClient();
    const { data: categories, error } = await supabase.from("categories").select("*")

    const types = ["income", "expense"] as CategoriesType

    return (
        <div className="p-5 md:p-8">
            <h1 className="text-2xl font-bold mb-4">Categories</h1>

            {error &&
                <p className="text-red-600">Could not load categories: {error.message}</p>
            }

            {categories && categories.length > 0 ? (
                <ul className="space-y-2 mb-6">
                    {categories.map((category) => (
                        <CategoryRow
                            key={category.id}
                            categoryId={category.id}
                            categoryName={category.name}
                            categoryType={category.type}
                            categoryTypeDropdown={types}
                        />
                    ))}
                </ul>
            ) : (
                !error && <p className="mb-6 text-sm">You don&apos;t have any categories yet. Add your first one below</p>
            )}

            <CreateCategoryForm />
        </div>
    )
}