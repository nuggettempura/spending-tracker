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

export async function updateAccount(
  id: string,
  _prevState: { error?: string } | undefined,
  formData: FormData,
) {
  const name = formData.get("name") as string;
  const accountType = formData.get("account_type") as string;

  const supabase = await createClient();

  const { error } = await supabase
    .from("bank_accounts")
    .update({ name, account_type: accountType })
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  redirect("/accounts");
}

export async function deleteAccount(
  id: string,
  _prevState: { error?: string } | undefined,
  _formData: FormData,
) {
  const supabase = await createClient();

  const { error } = await supabase.from("bank_accounts").delete().eq("id", id);

  if (error) {
    if (error.code === "23503") {
      return {
        error: "Can't delete an account that still has transactions on it. Delete those first.",
      };
    }
    return { error: error.message };
  }

  redirect("/accounts");
}
