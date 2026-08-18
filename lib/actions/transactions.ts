"use server";

import { redirect } from "next/navigation";
import { createClient } from "../supabase/server";

export async function createTransaction(
  _prevState: { error?: string } | undefined,
  formData: FormData,
) {
  const bankAccountId = formData.get("bank_account_id") as string;
  const categoryId = formData.get("category_id") as string;
  const amount = Number(formData.get("amount"));
  const type = formData.get("type") as string;
  const description = formData.get("description") as string;
  const transactionDate = formData.get("transaction_date") as string;

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in to add a transaction" };
  }

  const { error } = await supabase.from("transactions").insert({
    user_id: user.id,
    bank_account_id: bankAccountId,
    category_id: categoryId || null,
    amount,
    type,
    description,
    transaction_date: transactionDate,
  });

  if (error) {
    return { error: error.message };
  }

  redirect("/transactions");
}
