import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { CreatePortfolioForm } from "@/components/create-portfolio-form";
import { CardGrid } from "@/components/card-grid";
import { Button } from "@/components/ui/button";
import type { CardRecord } from "@/lib/types";

const sampleCards: CardRecord[] = [
  {
    id: "sample-1",
    portfolio_id: "sample",
    source_url: "https://example.com",
    domain: "example.com",
    title: "Example Product",
    summary: "A polished demo app with a clear summary and visual preview.",
    thumbnail_url: null,
    favicon_url: null,
    tags: ["SaaS", "Demo"],
    position: 1
  },
  {
    id: "sample-2",
    portfolio_id: "sample",
    source_url: "https://example.org",
    domain: "example.org",
    title: "Hackathon Project",
    summary: "A compact experiment page turned into a clean portfolio card.",
    thumbnail_url: null,
    favicon_url: null,
    tags: ["AI", "Prototype"],
    position: 2
  }
];

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-8 lg:px-10">
      <header className="flex items-center justify-between py-4">
        <Link href="/" className="text-sm font-semibold tracking-[0.18em]">
          PORTFOLIO CARD
        </Link>
        <Link href="#create">
          <Button variant="secondary">Start now</Button>
        </Link>
      </header>

      <section className="grid flex-1 items-center gap-10 py-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm text-black/60">
            <Sparkles className="h-4 w-4" />
            Turn raw URLs into a shareable project page
          </div>
          <div className="space-y-5">
            <h1 className="max-w-3xl text-5xl font-semibold leading-tight tracking-tight text-ink md:text-6xl">
              Paste a link.
              <br />
              Get a polished portfolio card.
            </h1>
            <p className="max-w-xl text-lg leading-8 text-black/65">
              Build a clean public showcase page in minutes without designing it
              from scratch.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="#create">
              <Button className="gap-2">
                Create portfolio
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <p className="text-sm text-black/50">
              No login for the MVP. Public share page included.
            </p>
          </div>
        </div>

        <div className="space-y-5 rounded-[36px] border border-white/60 bg-[#f8f5ef]/90 p-5 shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-black/45">Live preview</p>
              <h2 className="mt-1 text-2xl font-semibold">Portfolio cards</h2>
            </div>
          </div>
          <CardGrid cards={sampleCards} />
        </div>
      </section>

      <section
        id="create"
        className="grid gap-8 border-t border-black/8 py-12 lg:grid-cols-[0.9fr_1.1fr]"
      >
        <div className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-black/45">
            Builder setup
          </p>
          <h2 className="text-3xl font-semibold">
            Create your public portfolio page
          </h2>
          <p className="max-w-lg text-base leading-7 text-black/65">
            Start with a title and subtitle. After creation, you will land on
            the builder page where you can paste project URLs and generate
            cards.
          </p>
        </div>
        <CreatePortfolioForm />
      </section>
    </main>
  );
}
