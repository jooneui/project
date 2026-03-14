"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type UrlFormProps = {
  slug: string;
  onCreated?: () => void;
};

export function UrlForm({ slug, onCreated }: UrlFormProps) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError(null);

    try {
      const token = window.localStorage.getItem(`portfolio-edit-token:${slug}`);

      const response = await fetch(`/api/portfolios/${slug}/cards`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          ...(token ? { "x-edit-token": token } : {})
        },
        body: JSON.stringify({ url })
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || "Card creation failed.");
      }

      setUrl("");
      onCreated?.();
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
      className="rounded-[28px] border border-black/10 bg-white/80 p-4 shadow-card"
    >
      <div className="flex flex-col gap-3 md:flex-row">
        <Input
          type="url"
          name="url"
          placeholder="https://example.com"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          required
        />
        <Button type="submit" disabled={pending} className="min-w-32">
          {pending ? "Creating..." : "Add card"}
        </Button>
      </div>
      {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
    </form>
  );
}
