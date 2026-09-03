import { createBrowserClient } from "@supabase/ssr";
import { env } from "../env";

const config = {
  supabaseUrl: env.supabaseUrl,
  supabaseKey: env.supabaseAnonKey,
};

export default function createClient() {
  return createBrowserClient(config.supabaseUrl, config.supabaseKey);
}
