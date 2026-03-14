# API / Server Contract

Use either Next.js Route Handlers or Server Actions. The contract below assumes route handlers for clarity.

## 1. Create portfolio

`POST /api/portfolios`

### Request
```json
{
  "title": "My Projects",
  "subtitle": "Things I built recently"
}
```

### Response
```json
{
  "portfolio": {
    "id": "uuid",
    "slug": "abc123xyz",
    "title": "My Projects",
    "subtitle": "Things I built recently"
  },
  "editToken": "secret-token"
}
```

## 2. Add card from URL

`POST /api/portfolios/:slug/cards`

Headers:
- `x-edit-token: <token>`

### Request
```json
{
  "url": "https://example.com"
}
```

### Response
```json
{
  "card": {
    "id": "uuid",
    "source_url": "https://example.com",
    "domain": "example.com",
    "title": "Example",
    "summary": "Example summary",
    "thumbnail_url": "https://...",
    "favicon_url": "https://...",
    "tags": [],
    "position": 1
  }
}
```

## 3. Update card

`PATCH /api/portfolios/:slug/cards/:cardId`

Headers:
- `x-edit-token: <token>`

### Request
```json
{
  "title": "New title",
  "summary": "New summary",
  "tags": ["AI", "Tool"]
}
```

## 4. Delete card

`DELETE /api/portfolios/:slug/cards/:cardId`

Headers:
- `x-edit-token: <token>`

## 5. Reorder cards

`POST /api/portfolios/:slug/reorder`

Headers:
- `x-edit-token: <token>`

### Request
```json
{
  "cardIds": ["id3", "id1", "id2"]
}
```

## 6. Get portfolio for public page

`GET /api/portfolios/:slug`

### Response
```json
{
  "portfolio": {
    "slug": "abc123xyz",
    "title": "My Projects",
    "subtitle": "Things I built recently"
  },
  "cards": []
}
```

## Validation rules

- URL must be valid absolute URL
- reject localhost and private network destinations
- title max length: 120
- summary max length: 200
- tag count max: 5
- tag length max: 24

## Error states

- `400` invalid URL or payload
- `401` missing or bad edit token
- `404` portfolio or card not found
- `409` duplicate conflict if enforced
- `500` metadata extraction failure or DB failure
