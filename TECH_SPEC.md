# Technical Specification

## Stack

- Framework: Next.js (App Router)
- Runtime: Node.js
- Language: TypeScript
- Styling: Tailwind CSS
- Database: Supabase (Postgres)
- Hosting: Vercel

## Recommended supporting libraries

- `zod` for validation
- `@supabase/supabase-js` for DB access
- `@supabase/ssr` if auth is added later
- `react-hook-form` for forms
- `lucide-react` for icons
- `shadcn/ui` for fast UI primitives
- `cheerio` for HTML parsing on the server
- `nanoid` for slugs or edit tokens

## Architecture

### Frontend
- Next.js App Router pages
- Server Components by default
- Client Components only where interaction is needed

### Backend
- Next.js route handlers or server actions
- Metadata fetching performed server-side
- Supabase used for persistence

### Storage model
- store source URL and extracted metadata
- thumbnail URL stored as external URL for MVP
- do not proxy or upload images in MVP unless needed later

## Metadata extraction strategy

1. validate URL input
2. fetch HTML from server
3. parse fields in this order:
   - `og:title`
   - `<title>`
   - `og:description`
   - `meta[name="description"]`
   - `og:image`
   - favicon candidates
4. normalize values
5. return fallback values if missing

## Fallback rules

- title fallback: domain name
- summary fallback: “No description available.”
- thumbnail fallback: generated placeholder block with domain text
- tags default: empty array

## Anonymous ownership model for MVP

Because there is no login, use an edit token.

Suggested flow:
- when portfolio is created, generate:
  - public slug
  - secret edit token
- public slug is used for shared page
- edit token is stored in browser local storage and used for future edits on that device

## Security notes

- sanitize all metadata before rendering
- restrict route handlers against SSRF patterns
- allow only `http` and `https`, then prefer storing only `https` public links in UI
- block private IP ranges and localhost targets during metadata fetch
- rate-limit card generation endpoint if abuse appears

## Performance notes

- fetch metadata with timeout
- cache successful metadata lookups for repeated URLs if useful
- lazy-load images
- use responsive image containers to avoid layout shift
