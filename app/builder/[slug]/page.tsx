import { SetupNotice } from "@/components/setup-notice";
import { CardGrid } from "@/components/card-grid";
import { UrlForm } from "@/components/url-form";
import { getCardsByPortfolioId, getPortfolioBySlug } from "@/lib/data";
import { getServerEnv } from "@/lib/env";

type BuilderPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function BuilderPage({ params }: BuilderPageProps) {
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
      <section className="flex flex-col gap-4 rounded-[32px] border border-black/10 bg-white/75 p-6 shadow-card md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-black/45">
            Builder
          </p>
          <h1 className="text-3xl font-semibold">
            {portfolio.title || "Untitled portfolio"}
          </h1>
          <p className="text-black/60">
            {portfolio.subtitle || "Paste links and refine the generated cards."}
          </p>
        </div>
        <a
          href={`/p/${portfolio.slug}`}
          className="text-sm font-medium underline underline-offset-4"
        >
          Open public page
        </a>
      </section>

      <UrlForm slug={slug} />

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">Cards</h2>
          <p className="text-sm text-black/55">
            Editing and deletion endpoints are wired. Inline UI can be expanded
            next.
          </p>
        </div>
        <CardGrid cards={cards} editable />
      </section>
    </main>
  );
}
