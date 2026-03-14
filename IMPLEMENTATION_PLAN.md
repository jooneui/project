# Implementation Plan

## Phase 1 — Foundation

- initialize Next.js app with TypeScript and Tailwind CSS
- install Supabase client, Zod, Cheerio, UI library
- set up environment variables
- connect project to Vercel and Supabase
- create database tables

## Phase 2 — Core create flow

- build landing page
- create portfolio endpoint
- create builder page using slug + local edit token
- implement URL submission form
- implement metadata fetch service
- insert card into DB

## Phase 3 — Card management

- render card grid
- edit title / summary / tags
- delete card
- add thumbnail fallback UI
- handle loading and error states

## Phase 4 — Public share page

- build public portfolio route
- SSR or static-friendly data fetch
- add copy-share-link CTA
- tune responsive layout

## Phase 5 — Polish

- optional reorder support
- empty states
- input validation tightening
- image loading polish
- better copywriting

## Suggested folder structure

```txt
app/
  page.tsx
  builder/[slug]/page.tsx
  p/[slug]/page.tsx
  api/
    portfolios/route.ts
    portfolios/[slug]/route.ts
    portfolios/[slug]/cards/route.ts
    portfolios/[slug]/cards/[cardId]/route.ts
components/
  ui/
  card.tsx
  card-grid.tsx
  url-form.tsx
lib/
  supabase.ts
  metadata.ts
  validation.ts
  auth-edit-token.ts
```

## Milestone definition of done

### M1
User can create a portfolio and get a public slug.

### M2
User can add a URL and see an auto-generated card.

### M3
User can edit and delete cards.

### M4
User can share a clean public page.
