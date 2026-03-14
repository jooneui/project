import { NextResponse } from "next/server";
import { fetchMetadata } from "@/lib/metadata";
import { getPortfolioBySlug } from "@/lib/data";
import { tokenMatches } from "@/lib/edit-token";
import { getServerEnv } from "@/lib/env";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { addCardSchema } from "@/lib/validation";

type RouteContext = {
  params: Promise<{
    slug: string;
  }>;
};

export async function POST(request: Request, context: RouteContext) {
  const env = getServerEnv();

  if (!env.success) {
    return NextResponse.json(
      { error: "Server environment variables are missing." },
      { status: 500 }
    );
  }

  const { slug } = await context.params;
  const token = request.headers.get("x-edit-token");

  if (!token) {
    return NextResponse.json({ error: "Missing edit token." }, { status: 401 });
  }

  const portfolio = await getPortfolioBySlug(slug);

  if (!portfolio) {
    return NextResponse.json({ error: "Portfolio not found." }, { status: 404 });
  }

  if (!tokenMatches(token, portfolio.edit_token_hash)) {
    return NextResponse.json({ error: "Invalid edit token." }, { status: 401 });
  }

  const body = await request.json();
  const result = addCardSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: result.error.issues[0]?.message || "Invalid payload." },
      { status: 400 }
    );
  }

  try {
    const metadata = await fetchMetadata(result.data.url.toString());
    const supabase = getSupabaseAdmin();

    const { count } = await supabase
      .from("cards")
      .select("*", { count: "exact", head: true })
      .eq("portfolio_id", portfolio.id);

    const { data, error } = await supabase
      .from("cards")
      .insert({
        portfolio_id: portfolio.id,
        source_url: metadata.sourceUrl,
        domain: metadata.domain,
        title: metadata.title,
        summary: metadata.summary,
        thumbnail_url: metadata.thumbnailUrl,
        favicon_url: metadata.faviconUrl,
        tags: [],
        position: (count || 0) + 1
      })
      .select("*")
      .single();

    if (error) {
      return NextResponse.json(
        { error: "Failed to create card." },
        { status: 500 }
      );
    }

    return NextResponse.json({ card: data }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Metadata extraction failed."
      },
      { status: 500 }
    );
  }
}
