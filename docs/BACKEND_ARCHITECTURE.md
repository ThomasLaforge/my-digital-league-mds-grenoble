---
title: Backend Architecture Documentation
description: Complete reference for API endpoints, authentication, and database
---

# Backend Architecture

## API Endpoints Overview

### Games Management

- **GET** `/api/games` — List games (supports `?search=query` for filtering)
- **POST** `/api/games` — Create game (orga only)
- **GET** `/api/games/[id]` — Get game details
- **PUT** `/api/games/[id]` — Update game (orga only)
- **DELETE** `/api/games/[id]` — Delete game (orga only)

### Events Management

- **GET** `/api/events` — List all events ordered by date
- **POST** `/api/events` — Create event (orga only)
- **GET** `/api/events/[id]` — Get event details
- **PUT** `/api/events/[id]` — Update event (orga only)
- **DELETE** `/api/events/[id]` — Delete event (orga only)
- **GET** `/api/events/[id]/participants` — List event participants

### Participants Management

- **GET** `/api/participants/[id]` — Get participant details
- **PUT** `/api/participants/[id]` — Update participant (self or orga only)
- **DELETE** `/api/participants/[id]` — Remove participant (self or orga only)

### User Profile

- **GET** `/api/me` — Get logged-in user profile (returns participations and admin events)
- **PATCH** `/api/me` — Update profile (name, image)

### Authentication

- **Auth.js v5 (NextAuth)** handles session/JWT in `/api/auth/[...nextauth]/route.ts`

## Authentication & Authorization

### Strategy

- **JWT-based** via NextAuth v5
- Token stored in **HTTP-only cookie** (never accessible to browser JS)
- Email verification tokens (UUID, 1-hour TTL)
- Password reset tokens (UUID, 1-hour TTL)

### JWT Claims

```
{
  sub: "user_id",
  name: "User Name",
  email: "user@example.com",
  isOrga: boolean,
  iat: timestamp,
  exp: timestamp
}
```

### Route Protection Pattern

All protected routes use the `auth()` middleware wrapper:

```ts
export const POST = auth(async (req) => {
  if (!req.auth?.user?.isOrga) {
    return NextResponse.json({ error: "Accès interdit" }, { status: 403 });
  }
  // protected logic
});
```

### Authorization Levels

- **Public**: Events list, game list, event details, authentication endpoints
- **Authenticated**: User profile, participant updates (self)
- **Organizer** (`isOrga=true`): Create/update/delete games and events, manage any participant

## Code Patterns

### API Route Structure

```ts
// 1. Type definition for dynamic params (Next.js 15+ async params)
type Context = { params: Promise<{ id: string }> };

// 2. GET endpoint (usually public)
export async function GET(_req: NextRequest, { params }: Context) {
  const { id } = await params;
  // logic
}

// 3. Protected POST/PUT/DELETE with auth() wrapper
export const POST = auth(async (req) => {
  // req.auth contains session, req.auth.user contains user data
  // Check isOrga, then proceed
});
```

### Data Fetching & Selection

- **Selects optimize queries**: Only fetch needed fields
- **Includes fetch relationships**: game, participants, \_count
- **Conditional includes**: Only include if needed
- Example: `/api/me` includes detailed participations + results

### Update Pattern

Uses conditional spread operator to update only provided fields:

```ts
data: {
  ...(name && { name }),
  ...(date && { date: new Date(date) }),
  ...(image !== undefined && { image: image || null }), // null = remove
}
```

### Error Handling

- **404**: Resource not found → `{ error: "... introuvable" }`
- **401**: Unauthorized → `{ error: "Connexion requise" }`
- **403**: Forbidden → `{ error: "Accès interdit" }`
- **409**: Conflict (duplicate) → `{ error: "Ce pseudo est déjà pris..." }`
- **400**: Bad request → `{ error: "Tous les champs sont requis" }`

## Unique Constraints & Validations

### Participant Registration

- **Unique per event**: Same user can't register twice in same event
- **Pseudo uniqueness per event**: Can't have duplicate pseudos in same event
- **Pseudo conflict check**: Before updating, verify new pseudo isn't taken

### User Account

- **Email unique** across all users
- **Email verification required** before login

## Response Format

- **List endpoints**: Return arrays directly `[...]`
- **Single endpoints**: Return object `{ id, ... }`
- **Creation (201)**: Return created resource
- **Updates**: Return updated resource
- **Deletions**: Return `{ success: true }`

## Language & Messages

- **All error messages in French**
- French variable names in some places (pseudo, isOrga, etc.)
