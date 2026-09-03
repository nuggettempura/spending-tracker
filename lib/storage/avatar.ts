import { createClient } from "../supabase/server";

export const AVATAR_BUCKET = "avatars";

const MAX_BYTES = 2 * 1024 * 1024; // keep in sync with the bucket's file size limit
const ALLOWED_MIME_TYPES = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
} as const;

export function validateAvatarFile(file: File) {
  if (!file || file.size === 0) return "No file selected";
  if (!(file.type in ALLOWED_MIME_TYPES))
    return "Avatar must be a PNG, JPEG, or WebP image";
  if (file.size > MAX_BYTES) return "Avatar must be 2MB or smaller";
  return null; // null = valid
}

export async function uploadAvatar(
  userId: string,
  file: File,
): Promise<string> {
  const problem = validateAvatarFile(file);
  if (problem) throw new Error(problem);

  const path = `${userId}/avatar`; // no extension

  const supabase = await createClient();
  const { error } = await supabase.storage
    .from(AVATAR_BUCKET)
    .upload(path, file, { upsert: true, contentType: file.type });

  if (error) throw new Error(error?.message);

  const { data } = supabase.storage.from(AVATAR_BUCKET).getPublicUrl(path);
  return `${data.publicUrl}?v=${Date.now()}`;
}

export async function deleteAvatar(userId: string): Promise<void> {
  const supabase = await createClient();
  const { error } = await supabase.storage
    .from(AVATAR_BUCKET)
    .remove([`${userId}/avatar`]);

  if (error) throw new Error(error?.message);
}
