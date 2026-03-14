create extension if not exists pgcrypto;

create table if not exists portfolios (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text,
  subtitle text,
  edit_token_hash text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists cards (
  id uuid primary key default gen_random_uuid(),
  portfolio_id uuid not null references portfolios(id) on delete cascade,
  source_url text not null,
  domain text,
  title text not null,
  summary text,
  thumbnail_url text,
  favicon_url text,
  tags text[] not null default '{}',
  position integer not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_cards_portfolio_id on cards(portfolio_id);
create index if not exists idx_cards_position on cards(portfolio_id, position);

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists portfolios_set_updated_at on portfolios;
create trigger portfolios_set_updated_at
before update on portfolios
for each row execute function set_updated_at();

drop trigger if exists cards_set_updated_at on cards;
create trigger cards_set_updated_at
before update on cards
for each row execute function set_updated_at();
