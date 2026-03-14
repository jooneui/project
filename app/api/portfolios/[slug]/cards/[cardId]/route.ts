import { NextResponse } from "next/server";
import { getPortfolioBySlug } from "@/lib/data";
import { tokenMatches } from "@/lib/edit-token";
import { getServerEnv } from "@/lib/env";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { updateCardSchema } from "@/lib/validation";

type RouteContext = {
  params: Promise<{
    slug: string;
    cardId: string;
  }>;
};

async function authorize(request: Request, slug: string) {
  const token = request.headers.get("x-edit-token");

  if (!token) {
    return { error: NextResponse.json({ error: "Missing edit token." }, { status: 401 }) };
  }

  const portfolio = await getPortfolioBySlug(slug);

  if (!portfolio) {
    return { error: NextResponse.json({ error: "Portfolio not found." }, { status: 404 }) };
  }

  if (!tokenMatches(token, portfolio.edit_token_hash)) {
    return { error: NextResponse.json({ error: "Invalid edit token." }, { status: 401 }) };
  }

  return { portfolio };
}

export async function PATCH(request: Request, context: RouteContext) {
  const env = getServerEnv();

  if (!env.success) {
    return NextResponse.json(
      { error: "Server environment variables are missing." },
      { status: 500 }
    );
  }

  const { slug, cardId } = await context.params;
  const auth = await authorize(request, slug);

  if ("error" in auth) {
    return auth.error;
  }

  const body = await request.json();
  const result = updateCardSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: result.error.issues[0]?.message || "Invalid payload." },
      { status: 400 }
    );
  }

  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("cards")
    .update(result.data)
    .eq("portfolio_id", auth.portfolio.id)
    .eq("id", cardId)
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: "Failed to update card." }, { status: 500 });
  }

  return NextResponse.json({ card: data });
}

export async function DELETE(request: Request, context: RouteContext) {
  const env = getServerEnv();

  if (!env.success) {
    return NextResponse.json(
      { error: "Server environment variables are missing." },
      { status: 500 }
    );
  }

  const { slug, cardId } = await context.params;
  const auth = await authorize(request, slug);

  if ("error" in auth) {
    return auth.error;
  }

  const supabase = getSupabaseAdmin();
  const { error } = await supabase
    .from("cards")
    .delete()
    .eq("portfolio_id", auth.portfolio.id)
    .eq("id", cardId);

  if (error) {
    return NextResponse.json({ error: "Failed to delete card." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
