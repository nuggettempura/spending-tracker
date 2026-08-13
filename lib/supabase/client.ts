import { createBrowserClient } from "@supabase/ssr";

const config = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
};

export default function createClient() {
  return createBrowserClient(config.supabaseUrl, config.supabaseKey);
}
