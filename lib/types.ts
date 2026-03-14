export type CardRecord = {
  id: string;
  portfolio_id: string;
  source_url: string;
  domain: string | null;
  title: string;
  summary: string | null;
  thumbnail_url: string | null;
  favicon_url: string | null;
  tags: string[];
  position: number;
  created_at?: string;
  updated_at?: string;
};

export type PortfolioRecord = {
  id: string;
  slug: string;
  title: string | null;
  subtitle: string | null;
  edit_token_hash: string;
  created_at?: string;
  updated_at?: string;
};
