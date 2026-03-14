import { createClient } from "@supabase/supabase-js";
import { getServerEnv } from "@/lib/env";

export function getSupabaseAdmin() {
  const env = getServerEnv();

  if (!env.success) {
    throw new Error("Missing Supabase environment variables.");
  }

  return createClient(
    env.data.NEXT_PUBLIC_SUPABASE_URL,
    env.data.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    }
  );
}
