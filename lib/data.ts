import { getSupabaseAdmin } from "@/lib/supabase/admin";
import type { CardRecord, PortfolioRecord } from "@/lib/types";

export async function getPortfolioBySlug(slug: string) {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("portfolios")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    return null;
  }

  return data;
}

export async function getCardsByPortfolioId(portfolioId: string) {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("cards")
    .select("*")
    .eq("portfolio_id", portfolioId)
    .order("position", { ascending: true });

  if (error) {
    throw error;
  }

  return data as CardRecord[];
}
