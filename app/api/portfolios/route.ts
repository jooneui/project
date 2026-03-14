import { nanoid } from "nanoid";
import { NextResponse } from "next/server";
import { hashEditToken } from "@/lib/edit-token";
import { getServerEnv } from "@/lib/env";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { createPortfolioSchema } from "@/lib/validation";

export async function POST(request: Request) {
  const env = getServerEnv();

  if (!env.success) {
    return NextResponse.json(
      { error: "Server environment variables are missing." },
      { status: 500 }
    );
  }

  const body = await request.json();
  const result = createPortfolioSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: result.error.issues[0]?.message || "Invalid payload." },
      { status: 400 }
    );
  }

  const supabase = getSupabaseAdmin();
  const editToken = nanoid(32);
  const slug = nanoid(10).toLowerCase();

  const { data, error } = await supabase
    .from("portfolios")
    .insert({
      slug,
      title: result.data.title || null,
      subtitle: result.data.subtitle || null,
      edit_token_hash: hashEditToken(editToken)
    })
    .select("id, slug, title, subtitle")
    .single();

  if (error) {
    return NextResponse.json(
      { error: "Failed to create portfolio." },
      { status: 500 }
    );
  }

  return NextResponse.json({ portfolio: data, editToken }, { status: 201 });
}
