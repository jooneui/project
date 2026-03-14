# Portfolio Card App Docs

This folder contains the core documents needed to design, build, test, and deploy the MVP for a web app that automatically turns URLs into portfolio cards.

## Included documents

- `PRD.md` — product requirements document
- `MVP_SCOPE.md` — in-scope and out-of-scope decisions
- `UX_UI_SPEC.md` — user flow and interface guidelines
- `TECH_SPEC.md` — system architecture and engineering choices
- `DATABASE_SCHEMA.md` — Supabase schema and RLS guidance
- `API_SPEC.md` — server actions / API contract
- `IMPLEMENTATION_PLAN.md` — build order and milestones
- `TESTING_QA.md` — QA checklist and test cases
- `DEPLOYMENT.md` — Vercel + Supabase deployment guide
- `SKILL.md` — project build instructions for an AI coding assistant or new engineer

## Product summary

A minimal web app where users paste links and automatically get clean portfolio cards with:

- website title
- thumbnail
- tags
- one-line summary

The app does not require login for the MVP.

## Project status

This directory now also contains a runnable Next.js MVP scaffold based on the documents in this repo.

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Fill in environment variables in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
APP_BASE_URL=http://localhost:3000
```

3. Apply the database schema from `supabase/schema.sql` to your Supabase project.

4. Start the app:

```bash
npm run dev
```

## Current app routes

- `/` landing page
- `/builder/[slug]` builder page
- `/p/[slug]` public share page
