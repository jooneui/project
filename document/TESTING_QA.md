# Testing & QA

## Core scenarios

### Portfolio creation
- create portfolio with blank optional title
- create portfolio with title and subtitle
- verify edit token is stored client-side

### URL ingestion
- valid URL with full metadata
- valid URL missing OG image
- valid URL missing description
- invalid URL format
- blocked URL / timeout
- duplicate URL submission

### Card editing
- edit title
- edit summary
- add tags
- remove tags
- validate limits

### Card deletion
- delete one card
- verify grid updates correctly

### Public page
- public slug loads correctly
- all cards render
- external links open safely
- page works on mobile

## Non-functional checks

- no layout shift disaster on image load
- errors are readable
- loading states are visible
- keyboard accessibility for inputs and buttons
- contrast acceptable

## Security checks

- reject private/internal URLs during fetch
- sanitize metadata fields
- no secret token leakage in share URL
- write endpoints require valid edit token

## Suggested test stack

- unit: Vitest
- component: React Testing Library
- e2e: Playwright
