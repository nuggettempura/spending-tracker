"use server";

import { redirect } from "next/navigation";
import { createClient } from "../supabase/server";

export async function createAccount(
  _prevState: { error?: string } | undefined,
  formData: FormData,
) {
  const name = formData.get("name") as string;
  const accountType = formData.get("account_type") as string;
  const initialBalance = Number(formData.get("initial_balance"));

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be logged in to add an account" };
  }

  const { error } = await supabase.from("bank_accounts").insert({
    user_id: user.id,
    name,
    account_type: accountType,
    initial_balance: initialBalance,
  });

  if (error) {
    return { error: error.message };
  }

  redirect("/accounts");
}
