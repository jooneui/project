# Database Schema (Supabase)

## Tables

### `portfolios`

| column | type | notes |
|---|---|---|
| id | uuid primary key | default `gen_random_uuid()` |
| slug | text unique not null | public URL identifier |
| title | text | optional portfolio title |
| subtitle | text | optional portfolio subtitle |
| edit_token_hash | text not null | hash of secret edit token |
| created_at | timestamptz | default `now()` |
| updated_at | timestamptz | default `now()` |

### `cards`

| column | type | notes |
|---|---|---|
| id | uuid primary key | default `gen_random_uuid()` |
| portfolio_id | uuid not null | references `portfolios(id)` on delete cascade |
| source_url | text not null | original URL |
| domain | text | normalized hostname |
| title | text not null | editable |
| summary | text | editable |
| thumbnail_url | text | external image URL |
| favicon_url | text | optional |
| tags | text[] | editable, default empty |
| position | integer not null | order in grid |
| created_at | timestamptz | default `now()` |
| updated_at | timestamptz | default `now()` |

## Suggested SQL

```sql
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
```

## RLS guidance

For MVP, the simplest path is often server-side Supabase access using service role from secure server routes only. If you do that, do not expose write access directly from the client.

### Recommended MVP pattern
- public read for share pages via server route or static rendering
- write operations only through Next.js server actions / route handlers
- edit authorization checked by comparing hashed edit token on the server

## Update trigger suggestion

Add a trigger to maintain `updated_at` automatically.
