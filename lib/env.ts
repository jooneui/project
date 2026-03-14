import { z } from "zod";

const publicEnvSchema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  APP_BASE_URL: z.string().url().optional()
});

const serverEnvSchema = publicEnvSchema.extend({
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1)
});

export function getPublicEnv() {
  return publicEnvSchema.safeParse(process.env);
}

export function getServerEnv() {
  return serverEnvSchema.safeParse(process.env);
}
