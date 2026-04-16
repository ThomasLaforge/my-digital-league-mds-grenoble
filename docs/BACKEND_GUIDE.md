---
title: Backend Development Guide
description: Quick reference for working on the backend API
---

# Backend Development Guide

**My Digital League** — Gaming Tournament Platform  
**Purpose**: Quick reference for working on the backend API (`/api` folder)  
**Owner**: ThomasLaforge  
**Team**: JeremDevX handles frontend

---

## Quick Start

### Environment Setup

```bash
# Install Node version from .nvmrc
nvm install && nvm use

# Install dependencies
npm install

# Setup database
cp .env.example .env
# Edit .env with DATABASE_URL and email config

# Generate Prisma client
npm run db:generate

# Start development
npm run dev
# API available at http://localhost:3000/api
```

### Common Commands

```bash
npm run dev              # Dev server + hot reload
npm run lint            # Check code style (ESLint + Prettier)
npm run prettier        # Auto-format code
npm run db:view        # Prisma Studio GUI
npm run test:unit      # Run unit tests
```

---

## API Structure

### Adding a New API Endpoint

1. **Create route file** at `/app/api/[resource]/route.ts`
2. **Follow the pattern**:

```typescript
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Dynamic params (Next.js 15+)
type Context = { params: Promise<{ id: string }> };

// Public GET (no auth required)
export async function GET(_req: NextRequest, { params }: Context) {
  const { id } = await params;

  const item = await prisma.model.findUnique({
    where: { id },
    include: {
      /* relations */
    },
  });

  if (!item) {
    return NextResponse.json({ error: "Element introuvable" }, { status: 404 });
  }

  return NextResponse.json(item);
}

// Protected POST (requires auth, usually requires isOrga)
export const POST = auth(async (req) => {
  const user = req.auth?.user;

  // Check auth
  if (!user) {
    return NextResponse.json({ error: "Connexion requise" }, { status: 401 });
  }

  // Check permission
  if (!user.isOrga) {
    return NextResponse.json({ error: "Accès interdit" }, { status: 403 });
  }

  const body = await req.json();

  // Validate required fields
  if (!body.field1 || !body.field2) {
    return NextResponse.json(
      { error: "Tous les champs sont requis" },
      { status: 400 }
    );
  }

  // Create resource
  const created = await prisma.model.create({
    data: {
      field1: body.field1,
      field2: body.field2,
    },
    include: {
      /* relations */
    },
  });

  return NextResponse.json(created, { status: 201 });
});
```

### Update Pattern (PUT)

Use conditional spread to only update provided fields:

```typescript
export const PUT = auth(async (req, context) => {
  // ... auth checks ...

  const { id } = await (context as Context).params;
  const { field1, field2, field3 } = await req.json();

  const updated = await prisma.model.update({
    where: { id },
    data: {
      ...(field1 && { field1 }),
      ...(field2 && { field2 }),
      // For nullable fields: check !== undefined to allow null
      ...(field3 !== undefined && { field3: field3 || null }),
    },
    include: {
      /* relations */
    },
  });

  return NextResponse.json(updated);
});
```

### Authorization

**Levels of Access**:

- **Public**: No checks (events list, game list)
- **Authenticated**: Check `req.auth?.user?.id`
- **Organizer**: Check `req.auth?.user?.isOrga`
- **Self-only**: Compare `req.auth.user.id` with resource owner

```typescript
// Example: Organizer OR Self
const isOrga = req.auth?.user?.isOrga;
const isSelf = resource.userId === req.auth?.user?.id;

if (!isSelf && !isOrga) {
  return NextResponse.json({ error: "Accès interdit" }, { status: 403 });
}
```

---

## Database

### Prisma

**Add migration after schema change**:

```bash
npx prisma migrate dev --name describe_change
```

**View current database**:

```bash
npm run db:view
```

**Key files**:

- Schema: `/prisma/schema.prisma`
- Generated client: `/generated/prisma/client/` (auto-generated, don't edit)
- Migrations: `/prisma/migrations/`

### Query Patterns

**Finding with relations**:

```typescript
const user = await prisma.user.findUnique({
  where: { id: userId },
  include: {
    participations: {
      include: { event: true, results: true },
    },
    adminEvents: {
      select: { id: true, name: true },
    },
  },
});
```

**Selective fields (optimize)**:

```typescript
const items = await prisma.model.findMany({
  select: {
    id: true,
    name: true,
    relatedItem: { select: { id: true, title: true } },
  },
  where: { status: "active" },
  orderBy: { date: "desc" },
});
```

**Count and include**:

```typescript
const event = await prisma.event.findUnique({
  where: { id },
  include: {
    _count: { select: { participants: true } },
  },
});
```

---

## Validation

### Zod Schemas

Located in `/schemas/index.ts`. Use for input validation:

```typescript
import { z } from "zod";
import { LoginSchema, RegisterSchema } from "@/schemas";

// In API route:
const body = await req.json();
const validated = LoginSchema.parse(body); // throws on invalid
```

### Existing Schemas

- `LoginSchema` — email + password + optional code
- `RegisterSchema` — email + password (6+ chars) + name
- `ResetSchema` — email only
- `NewPasswordSchema` — password (6+ chars)
- `UpdateProfileSchema` — optional name/image

### Adding New Schema

```typescript
export const YourSchema = z.object({
  field1: z.string().email({ message: "Email requis" }),
  field2: z.string().min(1, { message: "Champ obligatoire" }),
  field3: z.optional(z.string()),
});
```

---

## Authentication

### How It Works

1. **Register** → Hash password (bcrypt) → Create User → Send verification email
2. **Email confirmation** → Verify token → Mark `emailVerified`
3. **Login** → Check email verified → NextAuth emits JWT cookie
4. **Protected API** → `auth()` middleware validates JWT

### In API Routes

```typescript
import { auth } from "@/auth";

export const POST = auth(async (req) => {
  const session = req.auth;        // Full JWT payload
  const user = req.auth?.user;     // User object { id, email, name, isOrga }

  // Check logged in
  if (!user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Use user data
  const record = await prisma.model.create({
    data: { userId: user.id, ... },
  });
});
```

---

## Email

### Sending Emails

Functions in `/lib/mail.ts`:

- `sendVerificationEmail(email, token)` — Confirmation link
- `sendPasswordResetEmail(email, token)` — Reset link

### Token Generation

Functions in `/lib/tokens.ts`:

- `generateVerificationToken(email)` — 1-hour TTL UUID
- `generatePasswordResetToken(email)` — 1-hour TTL UUID

### Email Service

- **Dev/Prototyping**: Mailtrap sandbox (all emails safe, viewable in dashboard)
- **Production**: Switch to Resend + verified domain in `lib/mail.ts`

---

## Error Handling

### Standard HTTP Codes

| Code | Use Case                                   |
| ---- | ------------------------------------------ |
| 200  | Success (GET, PATCH, PUT)                  |
| 201  | Resource created (POST)                    |
| 400  | Missing/invalid fields                     |
| 401  | Not authenticated                          |
| 403  | No permission (auth'd but not allowed)     |
| 404  | Resource not found                         |
| 409  | Conflict (duplicate, constraint violation) |

### French Error Messages

Keep messages in French per existing pattern:

```typescript
{
  error: "Tous les champs sont requis";
}
{
  error: "Accès interdit";
}
{
  error: "Connexion requise";
}
{
  error: "Événement introuvable";
}
{
  error: "Ce pseudo est déjà pris pour cet événement";
}
```

---

## Testing

### Unit Tests

```bash
npm run test:unit
```

Test files at `__tests__/` mirroring source structure.

### Coverage

```bash
npm run test:coverage
```

---

## Current API Endpoints Summary

### Games

```
GET    /api/games                    # list (with ?search=)
POST   /api/games                    # create (orga)
GET    /api/games/[id]               # get
PUT    /api/games/[id]               # update (orga)
DELETE /api/games/[id]               # delete (orga)
```

### Events

```
GET    /api/events                   # list
POST   /api/events                   # create (orga)
GET    /api/events/[id]              # get
PUT    /api/events/[id]              # update (orga)
DELETE /api/events/[id]              # delete (orga)
GET    /api/events/[id]/participants # list participants
```

### Participants

```
GET    /api/participants/[id]        # get
PUT    /api/participants/[id]        # update (self or orga)
DELETE /api/participants/[id]        # delete (self or orga)
```

### User Profile

```
GET    /api/me                       # get profile + participations
PATCH  /api/me                       # update name/image
```

---

## Development Tips

### Type Safety

- Use `type Context = { params: Promise<{ id: string }> }` for dynamic routes
- Leverage Prisma's generated types (always auto-updated)

### Debugging

- Use Prisma Studio: `npm run db:view`
- Add `console.log()` in API routes (visible in terminal)
- Check Mailtrap emails: https://mailtrap.io (sandbox only)

### Database Constraints

- Participants: Unique [userId, eventId] (can't register twice)
- Participants: Unique [pseudo, eventId] (pseudo unique per event)
- Always check before updating pseudo

### Code Style

- ESLint runs on save (VS Code configured)
- Prettier formats on save
- Follow existing patterns in `/api` folder for consistency

---

## Useful File Paths

| Path                            | Purpose                       |
| ------------------------------- | ----------------------------- |
| `/app/api/`                     | All API routes                |
| `/lib/prisma.ts`                | Prisma client singleton       |
| `/lib/tokens.ts`                | Token generation utilities    |
| `/lib/mail.ts`                  | Email sending functions       |
| `/services/auth/authService.ts` | Auth service wrapper          |
| `/schemas/index.ts`             | Zod validation schemas        |
| `/prisma/schema.prisma`         | Database schema definition    |
| `/auth.ts`                      | NextAuth configuration (root) |

---

## Next Steps / Common Tasks

### To Add a New Resource

1. Add Prisma model to `/prisma/schema.prisma`
2. Run `npx prisma migrate dev`
3. Create API routes in `/app/api/[resource]/`
4. Test with curl or API client (e.g., Thunder Client)

### To Modify Authentication

- Check `/auth.ts` (NextAuth config)
- Update JWT claims if needed
- Verify `req.auth.user` properties match JWT payload

### To Add Email Service

- Update env vars (currently Mailtrap)
- Modify `/lib/mail.ts` transport config
- Test in Mailtrap dashboard before production

---

**Last Updated**: 2026-04-10  
**Version**: 1.0  
**Language**: French messages, English code documentation
