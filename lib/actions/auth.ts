"use server";

import { redirect } from "next/navigation";
import { createClient } from "../supabase/server";
import { env } from "../env";

export async function login(
  _prevState: { error?: string } | undefined,
  formData: FormData,
) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: error.message };
  }

  redirect("/");
}

export async function signUp(
  _prevState: { error?: string } | undefined,
  formData: FormData,
) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const passwordCheck = formData.get("passwordCheck") as string;
  const displayName = formData.get("displayName") as string;

  if (password !== passwordCheck) {
    return { error: "Credentials does not match" };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { display_name: displayName } },
  });

  if (error) {
    return { error: error.message };
  }

  redirect("/");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect("/login");
}

export async function passwordRecovery(
  _prevState: { error?: string; success?: boolean } | undefined,
  formData: FormData,
) {
  const username = formData.get("email") as string;
  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(username, {
    redirectTo: `${env.siteUrl}/auth/confirm?next=/update-password`,
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}

export async function updatePassword(
  _prevState: { error?: string } | undefined,
  formData: FormData,
) {
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  if (confirmPassword !== password) {
    return { error: "Password does not match" };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({ password });
  if (error) return { error: error.message };

  redirect("/");
}
