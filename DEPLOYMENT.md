# Deployment Guide

## Environment variables

### Next.js / Vercel

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
APP_BASE_URL=
```

Do not expose the service role key to the client.

## Supabase setup

1. Create project.
2. Run schema SQL.
3. Set database backups and project region.
4. Store credentials securely in Vercel.

## Vercel setup

1. Import Git repository.
2. Add environment variables.
3. Deploy preview.
4. Test builder and public page routes.
5. Promote to production.

## Domain suggestions

Public share page pattern:
- `/p/[slug]`

Builder page pattern:
- `/builder/[slug]`

## Production checklist

- environment variables set
- metadata fetch timeout configured
- token auth working
- error logging enabled
- robots decision made for public pages
- basic analytics added if desired later

## Nice-to-have integrations later

- Sentry for error tracking
- PostHog or Plausible for analytics
- Upstash rate limiting if abuse appears
