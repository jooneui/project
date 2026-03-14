"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function CreatePortfolioForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError(null);

    try {
      const response = await fetch("/api/portfolios", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({ title, subtitle })
      });
      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || "Portfolio creation failed.");
      }

      window.localStorage.setItem(
        `portfolio-edit-token:${payload.portfolio.slug}`,
        payload.editToken
      );
      router.push(`/builder/${payload.portfolio.slug}`);
      router.refresh();
    } catch (submitError) {
      setError(
        submitError instanceof Error ? submitError.message : "Unknown error."
      );
    } finally {
      setPending(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-[32px] border border-black/10 bg-white/80 p-6 shadow-card"
    >
      <div className="space-y-2">
        <label className="text-sm font-medium text-black/70">
          Portfolio title
        </label>
        <Input
          placeholder="My Projects"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-medium text-black/70">
          Short subtitle
        </label>
        <Input
          placeholder="Things I built recently"
          value={subtitle}
          onChange={(event) => setSubtitle(event.target.value)}
        />
      </div>
      <Button type="submit" disabled={pending} className="w-full">
        {pending ? "Creating..." : "Create portfolio"}
      </Button>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </form>
  );
}
