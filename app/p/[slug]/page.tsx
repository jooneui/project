import { SetupNotice } from "@/components/setup-notice";
import { CardGrid } from "@/components/card-grid";
import { getCardsByPortfolioId, getPortfolioBySlug } from "@/lib/data";
import { getServerEnv } from "@/lib/env";

type PublicPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function PublicPortfolioPage({
  params
}: PublicPageProps) {
  const { slug } = await params;
  const env = getServerEnv();

  if (!env.success) {
    return (
      <main className="mx-auto min-h-screen max-w-5xl px-6 py-10">
        <SetupNotice />
      </main>
    );
  }

  const portfolio = await getPortfolioBySlug(slug);

  if (!portfolio) {
    return (
      <main className="mx-auto min-h-screen max-w-5xl px-6 py-10">
        <p className="text-sm text-black/55">Portfolio not found.</p>
      </main>
    );
  }

  const cards = await getCardsByPortfolioId(portfolio.id);

  return (
    <main className="mx-auto min-h-screen max-w-6xl space-y-8 px-6 py-10">
      <section className="space-y-3 rounded-[32px] border border-black/10 bg-white/75 p-8 shadow-card">
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-black/45">
          Shared portfolio
        </p>
        <h1 className="text-4xl font-semibold">
          {portfolio.title || "Untitled portfolio"}
        </h1>
        {portfolio.subtitle ? (
          <p className="max-w-2xl text-lg text-black/60">{portfolio.subtitle}</p>
        ) : null}
      </section>
      <CardGrid cards={cards} />
    </main>
  );
}
