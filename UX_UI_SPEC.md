# UX / UI Spec

## Design principles

- minimal
- soft visual hierarchy
- card-first layout
- clean whitespace
- easy sharing
- very low friction

## Core screens

### 1. Landing page
Purpose: explain product quickly and move user to create flow.

Sections:
- hero
- one-line value proposition
- URL input CTA
- sample cards preview
- simple footer

### 2. Builder page
Purpose: create and edit cards.

Components:
- URL input field
- add button
- loading state
- card grid
- edit controls per card
- delete action
- share page CTA

### 3. Public portfolio page
Purpose: display final polished project cards.

Components:
- page title
- optional short subtitle
- card grid
- each card contains:
  - thumbnail
  - site name / project title
  - tags
  - one-line summary
  - visit link button

## Suggested user flow

1. User lands on homepage.
2. User pastes a URL.
3. App fetches metadata and generates a card.
4. User edits summary and tags if needed.
5. User adds more links.
6. User gets a shareable public URL.
7. User sends it to friends or posts it.

## Visual direction

- background: white or very light gray
- card radius: medium to large
- shadows: subtle
- typography: crisp and simple
- accent usage: restrained
- layout: responsive CSS grid

## UX edge cases

- invalid URL
- unreachable URL
- metadata not found
- image load failure
- duplicate URL submitted
- empty builder state

## Empty state copy suggestion

“Paste your first project link to generate a clean portfolio card.”

## Loading copy suggestion

“Creating your card…”
