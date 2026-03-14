# PRD — Portfolio Card Auto-Builder

## 1. Overview

Build a web app that lets users paste one or more URLs and automatically generate clean portfolio cards that can be shared as a polished project showcase page.

## 2. Problem

People who quickly build side projects, demos, experiments, or vibe-coded apps often have links scattered across chats, docs, and bookmarks. Existing link-list tools are either too plain, too generic, or too annoying to configure. Users want something faster and prettier.

## 3. Goal

Make it extremely easy to turn raw links into a minimal, attractive, shareable portfolio page.

## 4. Target users

### Primary users
- solo builders and indie hackers
- students with hackathon or class projects
- vibe coders who want to show friends what they made
- early-stage founders sharing product experiments

### User motivations
- show projects in a cleaner way
- avoid manually designing a portfolio page
- create a shareable page in under 3 minutes

## 5. Core value proposition

Paste a link. Get a nice project card.

## 6. MVP user stories

1. As a user, I can paste a URL and generate a project card automatically.
2. As a user, I can see title, thumbnail, tag(s), and one-line summary on each card.
3. As a user, I can edit the generated card content if needed.
4. As a user, I can delete a card.
5. As a user, I can view all generated cards on a clean portfolio page.
6. As a user, I can share that page with a public URL.

## 7. Functional requirements

### Required
- accept valid `https://` URLs
- fetch metadata server-side
- parse title, description, Open Graph image, and favicon when available
- generate a card record
- allow user edits for title, summary, and tags
- display cards in a clean responsive grid
- support public share page by slug

### Optional for MVP if time allows
- drag-and-drop card ordering
- tag filter
- duplicate URL warning
- batch URL input

## 8. Non-goals for MVP

- authentication
- comments, likes, or social features
- analytics dashboard
- AI-generated descriptions by default
- multiple portfolio pages per anonymous user
- browser extension
- custom themes beyond light minimal default

## 9. Success metrics

### Product metrics
- time to first portfolio page created
- average number of cards per portfolio
- portfolio completion rate
- share-page visit count

### UX metrics
- metadata fetch success rate
- percentage of cards edited after generation
- mobile usability issues reported

## 10. Constraints

- tech stack: Node.js, Next.js, TypeScript, Tailwind CSS
- database: Supabase
- deployment: Vercel
- no login for MVP

## 11. Risks

- some websites block metadata scraping
- OG image may be missing or broken
- anonymous editing needs a safe ownership model
- public pages may expose content users did not intend to share

## 12. Open decisions resolved for MVP

- no login
- public pages only
- summary uses metadata description first, manual edit allowed
- tags are manually entered by user
- fallback image is required when no thumbnail exists
