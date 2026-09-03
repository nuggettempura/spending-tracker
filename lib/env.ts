function required(value: string | undefined, name: string): string {
  if (!value) {
    throw new Error(`Missing required environment variables ${name}`);
  }
  return value;
}

export const env = {
  supabaseUrl: required(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    "NEXT_PUBLIC_SUPABASE_URL",
  ),
  supabaseAnonKey: required(
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  ),
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
};
