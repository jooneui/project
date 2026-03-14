import { z } from "zod";

const blockedHosts = new Set(["localhost", "127.0.0.1", "::1"]);

function isPrivateHostname(hostname: string) {
  return (
    /^10\./.test(hostname) ||
    /^127\./.test(hostname) ||
    /^169\.254\./.test(hostname) ||
    /^172\.(1[6-9]|2\d|3[0-1])\./.test(hostname) ||
    /^192\.168\./.test(hostname) ||
    hostname === "0.0.0.0"
  );
}

export const createPortfolioSchema = z.object({
  title: z.string().trim().max(120).optional().or(z.literal("")),
  subtitle: z.string().trim().max(160).optional().or(z.literal(""))
});

export const addCardSchema = z.object({
  url: z
    .string()
    .url()
    .transform((value) => new URL(value))
    .refine((value) => ["http:", "https:"].includes(value.protocol), {
      message: "Only http and https URLs are allowed."
    })
    .refine((value) => !blockedHosts.has(value.hostname), {
      message: "Localhost targets are not allowed."
    })
    .refine((value) => !isPrivateHostname(value.hostname), {
      message: "Private network targets are not allowed."
    })
});

export const updateCardSchema = z.object({
  title: z.string().trim().max(120).optional(),
  summary: z.string().trim().max(200).optional(),
  tags: z.array(z.string().trim().min(1).max(24)).max(5).optional()
});
