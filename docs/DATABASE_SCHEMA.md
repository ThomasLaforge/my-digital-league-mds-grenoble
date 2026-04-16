---
title: Database Schema & Models
description: Prisma models, relationships, and enums
---

# Database Schema

## Data Models

### User

Authentication and profile management.

```
- id: String (cuid) [PRIMARY]
- name: String? (optional)
- email: String (unique)
- emailVerified: DateTime? (null until email confirmation)
- image: String? (avatar URL)
- password: String? (for credentials auth)
- isOrga: Boolean (default: false) → organizer flag
- createdAt: DateTime
- updatedAt: DateTime

Relations:
  → participations: Participant[] (events user registered for)
  → adminEvents: Event[] (events user organizes)
  → accounts: Account[] (OAuth connections)
```

### Account

OAuth provider accounts (for future social login).

```
- id: String (cuid) [PRIMARY]
- userId: String (FK → User)
- type: String (e.g. "oauth")
- provider: String (e.g. "github")
- providerAccountId: String
- refresh_token: String?
- access_token: String?
- expires_at: Int?
- token_type: String?
- scope: String?
- id_token: String?
- session_state: String?

Unique: [provider, providerAccountId]
```

### VerificationToken

Email confirmation tokens.

```
- id: String (cuid) [PRIMARY]
- email: String
- token: String (UUID, unique)
- expires: DateTime (1 hour from creation)

Unique: [email, token]
```

### PasswordResetToken

Password reset tokens.

```
- id: String (cuid) [PRIMARY]
- email: String
- token: String (UUID, unique)
- expires: DateTime (1 hour from creation)

Unique: [email, token]
```

### Game

Gaming titles available for tournaments.

```
- id: String (cuid) [PRIMARY]
- title: String (required)
- description: String? (optional)
- imageUrl: String? (game cover image)
- createdAt: DateTime
- updatedAt: DateTime

Relations:
  → events: Event[] (tournaments for this game)
```

### Event

Tournament/competition instances.

```
- id: String (cuid) [PRIMARY]
- name: String (tournament name)
- date: DateTime (event date)
- inscriptionDeadline: DateTime (registration closes)
- rules: String (tournament rules)
- gameId: String (FK → Game)
- createdAt: DateTime
- updatedAt: DateTime

Relations:
  → game: Game (tournament game)
  → participants: Participant[] (registered players)
  → admins: User[] (organizers managing this event)
```

### Participant

User registration in a specific event.

```
- id: String (cuid) [PRIMARY]
- pseudo: String (in-game name)
- avatarUrl: String? (player avatar)
- killingSentence: String? (tagline/bio)
- level: Level? (skill level enum)
- userId: String (FK → User)
- eventId: String (FK → Event)
- registeredAt: DateTime

Relations:
  → user: User
  → event: Event
  → results: Result[] (scores/results)

Unique Constraints:
  - [userId, eventId] → user registers once per event
  - [pseudo, eventId] → pseudo unique per event
```

### Result

Performance/score records for participants.

```
- id: String (cuid) [PRIMARY]
- score: Int? (optional, for future scoring)
- comment: String? (judge comments)
- participantId: String (FK → Participant)
- createdAt: DateTime
- updatedAt: DateTime

Relations:
  → participant: Participant
  → files: FileResult[] (submission files)
```

### FileResult

Submitted files/artifacts (screenshots, proofs, etc.).

```
- id: String (cuid) [PRIMARY]
- url: String (file URL/path)
- resultId: String (FK → Result)
- createdAt: DateTime

Relations:
  → result: Result
```

## Enums

### Level

Skill levels for participants:

```
- MOLDU (beginner, Harry Potter reference 🧙)
- BEGINNER
- INTERMEDIATE
- ADVANCED
- EXPERT
```

## Database Connection

- **Provider**: PostgreSQL
- **Adapter**: PrismaPg (Prisma's edge-compatible PostgreSQL adapter)
- **Connection**: Via `DATABASE_URL` env var
- **Client generation**: `prisma generate` → `/generated/prisma/client`

## Key Design Notes

1. **Email verification**: Users must confirm email before login
2. **One-time tokens**: Verification & reset tokens auto-expire (1 hour)
3. **Event exclusivity**: User can only register once per event; pseudos must be unique per event
4. **Organizer flag**: Single `isOrga` boolean determines event management permissions
5. **Game reusability**: Games can host multiple events over time
6. **Future extensibility**: FileResult and Result models support competitive scoring/submissions
7. **Timestamps**: All major entities track creation/modification times

## Relations Overview

```
User ──→ Participant ←─ Event ←─ Game
 ↓
 └─────→ AdminEvents (Event)

Participant ──→ Result ──→ FileResult
```
