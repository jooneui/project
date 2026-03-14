import { NextResponse } from "next/server";
import { getCardsByPortfolioId, getPortfolioBySlug } from "@/lib/data";
import { getServerEnv } from "@/lib/env";

type RouteContext = {
  params: Promise<{
    slug: string;
  }>;
};

export async function GET(_: Request, context: RouteContext) {
  const env = getServerEnv();

  if (!env.success) {
    return NextResponse.json(
      { error: "Server environment variables are missing." },
      { status: 500 }
    );
  }

  const { slug } = await context.params;
  const portfolio = await getPortfolioBySlug(slug);

  if (!portfolio) {
    return NextResponse.json({ error: "Portfolio not found." }, { status: 404 });
  }

  const cards = await getCardsByPortfolioId(portfolio.id);

  return NextResponse.json({
    portfolio: {
      slug: portfolio.slug,
      title: portfolio.title,
      subtitle: portfolio.subtitle
    },
    cards
  });
}
