# Agent Work Log

## Pending Commits

### 1. Fix Input folder casing for Vercel

**Status:** Staged for commit
**Changes:**

- `git mv app/components/input app/components/InputTemp && git mv app/components/InputTemp app/components/Input`

Git is already staged with:

```
renamed:    app/components/input/Input.module.scss -> app/components/Input/Input.module.scss
renamed:    app/components/input/Input.stories.tsx -> app/components/Input/Input.stories.tsx
renamed:    app/components/input/Input.tsx -> app/components/Input/Input.tsx
```

Commit message:

```
fix: rename Input folder to correct casing for case-sensitive builds

The app/components/input folder was stored in git with lowercase casing, but imports use uppercase Input. On case-insensitive filesystems (macOS) this works fine, but on case-sensitive systems (Linux/Vercel) it causes module resolution failures.

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>
```

---

### 2. Consolidate event detail pages to tournois/[id]

**Status:** Staged for commit
**Changes:**

- Created `app/tournois/[id]/DynamicEventPageId.tsx` (moved from `app/evenements/[id]/`)
- Created `app/tournois/[id]/page.module.scss` (moved from `app/evenements/[id]/`)
- Updated import in `app/tournois/[id]/page.tsx` to use local `./DynamicEventPageId`
- Deleted `app/evenements/[id]/` (page.tsx, DynamicEventPageId.tsx, page.module.scss)

Git status shows:

```
deleted:    app/evenements/[id]/DynamicEventPageId.tsx
deleted:    app/evenements/[id]/page.module.scss
deleted:    app/evenements/[id]/page.tsx
modified:   app/tournois/[id]/page.tsx
```

Untracked files staged:

```
app/tournois/[id]/DynamicEventPageId.tsx
app/tournois/[id]/page.module.scss
```

Commit message:

```
refactor: consolidate event detail pages to tournois/[id]

Remove duplicate evenements/[id] page and move components to tournois/[id].
Both pages now route to the same detail view at /tournois/[id].

- Move DynamicEventPageId and styles to tournois/[id]
- Delete app/evenements/[id] directory
- Update import path in tournois/[id]/page.tsx
- Card component already uses /tournois/[id] for links

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>
```

---

### 3. Fix TypeScript types - Date serialization

**Status:** Modified but not staged
**Changes to commit:**

- `app/page.tsx`: Convert Prisma Date objects to ISO strings, add game.description field
- `app/tournois/page.tsx`: Convert Prisma Date objects to ISO strings, add game.description field
- `app/tournois/[id]/page.tsx`: Convert Prisma Date objects to ISO strings, add game.description field
- `app/evenements/[id]/page.tsx`: Convert Prisma Date objects to ISO strings, add game.description field (will be deleted in commit #2)

All date fields (date, inscriptionDeadline, createdAt, updatedAt) are converted with `.toISOString()` before passing to client components.

Commit message:

```
fix: serialize Prisma Date objects to strings for client components

Prisma returns Date objects, but client components expect ISO string dates.
Also add game.description field to match component type requirements.

- Convert date, inscriptionDeadline, createdAt, updatedAt to ISO strings
- Include game.description in all event queries
- Update EventWithRegistration type to reflect string dates

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>
```

---

### 4. Replace HTTP fetches with direct Prisma queries

**Status:** Modified (combined with commit #3)
**Changes:**

- `app/page.tsx`: Use prisma.event.findMany() + prisma.game.findMany() instead of fetch()
- `app/tournois/page.tsx`: Use prisma.event.findMany() instead of fetch()
- `app/organisateur/evenements/creer/page.tsx`: Use prisma.game.findMany() instead of fetch()
- `app/tournois/[id]/page.tsx`: Use prisma.event.findUnique() instead of fetch()
- `app/evenements/[id]/page.tsx`: Use prisma.event.findUnique() instead of fetch()

**Reason:** Internal HTTP fetches with `cache: "no-store"` don't work reliably in production on Vercel. Direct Prisma queries are more reliable and faster.

Commit message:

```
refactor: replace internal HTTP fetches with direct Prisma queries

Internal HTTP fetches with cache: "no-store" don't work reliably in production
on Vercel. Using direct Prisma queries is faster and more reliable.

- Replace all /api/events and /api/games fetches with prisma methods
- Remove getAppUrl() usage from pages (now only used in email)
- Fetch registration status server-side with auth() + prisma.participant
- Add proper error handling with try-catch blocks

Co-Authored-By: Claude Haiku 4.5 <noreply@anthropic.com>
```

---

## Summary

**Total commits needed: 4**

Run these in order:

1. Input folder casing fix (already staged)
2. Consolidate event pages to tournois/[id] (already staged)
3. Fix TypeScript Date serialization
4. Replace HTTP fetches with Prisma queries

All changes are designed to:

- Fix production issues (events not loading)
- Fix build errors (casing, types)
- Simplify and improve reliability
