"use server";

import { createClient } from "../supabase/server";
import { uploadAvatar } from "../storage/avatar";

type ProfileState = { error?: string; success?: boolean };

export async function updateProfile(
  _prevState: ProfileState | undefined,
  formData: FormData,
): Promise<ProfileState> {
  const displayName = (formData.get("displayName") as string).trim() ?? "";
  const password = (formData.get("password") as string) ?? "";
  const confirmPassword = (formData.get("confirmPassword") as string) ?? "";
  const file = formData.get("avatar") as File;

  if (!displayName) return { error: "Name can't be empty" };
  if (password !== confirmPassword) {
    return { error: "Passwords do not match" };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "You must be logged in" };

  // avatar first - if it fails, nothing else has changed yet
  let avatarUrl: string | undefined;
  if (file && file.size > 0) {
    try {
      avatarUrl = await uploadAvatar(user.id, file);
    } catch (error) {
      return {
        error: error instanceof Error ? error.message : "Upload failed",
      };
    }
  }

  const { error } = await supabase.auth.updateUser({
    ...(password ? { password } : {}),
    data: {
      display_name: displayName,
      ...(avatarUrl ? { avatar_url: avatarUrl } : {}),
    },
  });
  if (error) {
    return { error: error?.message };
  }

  return { success: true };
}
