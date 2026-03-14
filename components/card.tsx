import { Globe, ImageOff, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CardRecord } from "@/lib/types";

type CardProps = {
  card: CardRecord;
  editable?: boolean;
};

export function Card({ card, editable = false }: CardProps) {
  return (
    <article className="overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-card">
      <div className="relative aspect-[16/10] bg-mist">
        {card.thumbnail_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={card.thumbnail_url}
            alt={card.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center gap-2 text-sm text-black/45">
            <ImageOff className="h-4 w-4" />
            <span>{card.domain || "No preview"}</span>
          </div>
        )}
      </div>
      <div className="space-y-4 p-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <h3 className="line-clamp-2 text-lg font-semibold">{card.title}</h3>
            {card.favicon_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={card.favicon_url}
                alt=""
                className="h-5 w-5 rounded-sm"
              />
            ) : (
              <Globe className="h-4 w-4 text-black/35" />
            )}
          </div>
          <p className="line-clamp-3 text-sm leading-6 text-black/65">
            {card.summary || "No description available."}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {card.tags.length > 0 ? (
            card.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-mist px-3 py-1 text-xs text-black/65"
              >
                {tag}
              </span>
            ))
          ) : (
            <span className="rounded-full bg-black/5 px-3 py-1 text-xs text-black/45">
              No tags
            </span>
          )}
        </div>
        <div className="flex items-center justify-between gap-3">
          <a
            href={card.source_url}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium underline underline-offset-4"
          >
            Visit project
          </a>
          {editable ? (
            <div className="flex items-center gap-2 text-black/45">
              <Button variant="ghost" className="h-9 w-9 rounded-full p-0">
                <Pencil className="h-4 w-4" />
              </Button>
              <Button variant="ghost" className="h-9 w-9 rounded-full p-0">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}
