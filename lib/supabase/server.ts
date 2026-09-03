import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { env } from "../env";

const config = {
  supabaseUrl: env.supabaseUrl,
  supabaseKey: env.supabaseAnonKey,
};

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(config.supabaseUrl, config.supabaseKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {}
      },
    },
  });
}
