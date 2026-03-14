import { Card } from "@/components/card";
import { EmptyState } from "@/components/empty-state";
import type { CardRecord } from "@/lib/types";

type CardGridProps = {
  cards: CardRecord[];
  editable?: boolean;
};

export function CardGrid({ cards, editable = false }: CardGridProps) {
  if (cards.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
      {cards.map((card) => (
        <Card key={card.id} card={card} editable={editable} />
      ))}
    </div>
  );
}
