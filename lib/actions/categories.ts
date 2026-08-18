"use server";

import { createClient } from "../supabase/server";
import { redirect } from "next/navigation";

export async function createCategories(
  _prevState: { error?: string } | undefined,
  formData: FormData,
) {
  // STEP 1: Get the values of the forms to be filled when creating a new category
  const name = formData.get("categoryName") as string;
  const type = formData.get("type") as string;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in to add a category" };
  }

  const { error } = await supabase.from("categories").insert({
    user_id: user.id,
    name: name,
    type: type,
  });

  if (error) {
    return { error: error.message };
  }

  redirect("/categories");
}
