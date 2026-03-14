# SKILL.md

## Project skill brief

This document explains how an AI coding assistant or a new engineer should work on this project.

## Project name
Portfolio Card Auto-Builder

## Product intent
Turn pasted URLs into clean, shareable portfolio cards with minimal effort.

## Core promise
A user should be able to paste a link and get a polished project card in seconds.

## Tech stack
- Node.js
- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase
- Vercel

## Build priorities
1. Keep the UX frictionless.
2. Prefer simple implementation over clever implementation.
3. Make the empty, loading, and failure states feel polished.
4. Protect the server-side metadata fetch from unsafe targets.
5. Keep the MVP small.

## Product rules
- No login in MVP.
- Public portfolio pages only.
- Cards must show title, thumbnail, tags, and one-line summary.
- Users must be able to edit generated fields.
- If metadata is incomplete, fallback gracefully.

## Engineering rules
- Use Server Components by default.
- Use Client Components only for interactive UI.
- Perform metadata fetching only on the server.
- Validate all inputs with Zod.
- Never expose service-role credentials to the client.
- Keep write access behind secure server routes.

## Security rules
- Reject localhost and private network URLs.
- Sanitize metadata before rendering.
- Store only hashed edit tokens in the database.
- Never place secret edit tokens in public URLs.

## UX rules
- The UI should feel minimal and calm.
- Use concise copy.
- Favor clean cards and generous spacing.
- Keep the builder understandable even for first-time users.

## Frontend design skill

### Design principle
- Design for clarity first, decoration second.
- The interface should feel lightweight, modern, and confident.
- Every screen should make the next action obvious within 3 seconds.
- Visual hierarchy must be strong enough that users can scan without reading everything.

### Visual style
- Use a minimal layout with generous whitespace.
- Prefer soft neutrals, subtle borders, and restrained shadows.
- Keep the palette mostly monochrome with one calm accent color.
- Rounded corners should feel modern but not overly playful.
- Avoid visual noise, heavy gradients, and overly saturated colors.

### Layout rules
- Use a clear content width and predictable spacing scale.
- Prefer 8px spacing increments.
- Keep the main builder centered and easy to focus on.
- On desktop, favor a balanced two-zone layout when needed: input/control area and preview area.
- On mobile, stack everything vertically with strong spacing and clear section labels.

### Typography
- Prioritize readability over personality.
- Use a clean sans-serif system.
- Headlines should be short and confident.
- Body copy should be concise and plain.
- Metadata and helper text should be visually quieter than primary content.

### Card design rules
- Cards must look good even when metadata is incomplete.
- Thumbnail area should maintain a stable aspect ratio.
- Titles should clamp cleanly and never break the layout.
- Tags should be compact, low-noise, and easy to scan.
- Summary text should stay short and visually secondary.
- The primary click target should be obvious without adding clutter.

### Interaction design
- Keep interactions fast and predictable.
- Hover states should be subtle.
- Loading states should feel polished, not flashy.
- Empty states should teach the product in one glance.
- Error states should be calm, specific, and actionable.
- Editing a card should feel inline and lightweight, not like opening a complex form.

### Accessibility rules
- Maintain strong color contrast.
- Ensure keyboard navigation works for all key flows.
- Use visible focus states.
- Do not communicate meaning by color alone.
- Keep tap targets comfortably sized on mobile.

### Responsive behavior
- Design mobile first, then enhance for larger screens.
- The card grid should collapse gracefully across breakpoints.
- Avoid layout shifts caused by image loading.
- Keep controls reachable on smaller screens without overwhelming the viewport.

### Frontend implementation guidance
- Build reusable UI primitives first: button, input, tag, card, modal/sheet, empty state, skeleton.
- Keep Tailwind class patterns consistent through utility composition or helper functions.
- Prefer semantic HTML before custom div-heavy structures.
- Use optimistic-feeling interactions only when rollback is safe and understandable.
- Animate with restraint; use motion only to clarify state changes.

### Inspiration keywords
- minimal
- editorial
- polished
- calm
- showcase-first
- modern SaaS
- creator portfolio

## Definition of done for MVP
- User can create a portfolio.
- User can add links and auto-generate cards.
- User can edit and delete cards.
- User gets a public shareable page.
- The app works on desktop and mobile.

## Nice-to-have after MVP
- drag-and-drop ordering
- tag filters
- batch link import
- AI summary suggestions
- custom themes
