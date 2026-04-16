---
title: Tech Stack & Dependencies
description: Core technologies, versions, and key libraries
---

# Tech Stack & Dependencies

## Core Stack

| Technology     | Version      | Purpose                          |
| -------------- | ------------ | -------------------------------- |
| **Node.js**    | (see .nvmrc) | Runtime                          |
| **Next.js**    | 16.1.7       | React framework, API routes, SSR |
| **React**      | 19.2.3       | UI framework                     |
| **TypeScript** | 5.x          | Type safety                      |
| **PostgreSQL** | (external)   | Database                         |
| **Prisma**     | 7.3.0        | ORM                              |

## Key Backend Libraries

### Authentication

- **NextAuth** (`next-auth@5.0.0-beta.30`) — JWT-based session management
- **@auth/prisma-adapter** (`2.11.1`) — Prisma integration for NextAuth

### Database

- **@prisma/client** (`7.3.0`) — Prisma ORM client
- **@prisma/adapter-pg** (`7.3.0`) — Edge-compatible PostgreSQL adapter
- **pg** (`8.17.2`) — Native PostgreSQL driver

### Security

- **bcryptjs** (`3.0.3`) — Password hashing
- **uuid** (`13.0.0`) — Token generation (v4 UUIDs)

### Email

- **nodemailer** (`7.0.7`) — Email sender
- **mailtrap** (`4.4.0`) — Email sandbox (prototyping)
- **@types/nodemailer** (`6.4.9`) — Type definitions

### Validation

- **zod** (`4.3.6`) — Schema validation

### Environment

- **dotenv** (`17.2.3`) — Environment variable loading

## Frontend-Related (for context)

### UI Components

- **@radix-ui/react-icons** (`1.3.2`) — Icon library
- **react-icons** (`5.5.0`) — Alternative icons
- **@fortawesome/react-fontawesome** (`3.0.0`) — FontAwesome icons

### Forms

- **react-hook-form** (`7.71.1`) — Form state management
- **@hookform/resolvers** (`5.2.2`) — Validation integration

### Styling

- **Sass** (`1.97.3`) — SCSS preprocessing
- CSS Modules (SCSS)

### Carousel

- **@splidejs/splide** (`4.1.4`) — Image carousel
- **@splidejs/react-splide** (`0.7.12`) — React wrapper

### UI Extras

- **react-spinners** (`0.17.0`) — Loading spinners
- **resend** (`6.9.1`) — Alternative email service

## Development & Testing

### Build & Runtime

- **tsx** (`4.21.0`) — TypeScript executor

### Linting & Formatting

- **ESLint** (`9.x`) — Code linting
- **eslint-config-next** (`16.1.6`) — Next.js ESLint config
- **eslint-config-prettier** (`10.1.8`) — Prettier integration
- **eslint-plugin-storybook** (`10.2.1`) — Storybook linting

### Code Formatting

- **Prettier** (`3.8.1`) — Code formatter
- **lint-staged** (`15.5.2`) — Pre-commit hooks

### Git Hooks

- **husky** (`9.1.7`) — Git hook runner

### Testing

- **Vitest** (`4.0.18`) — Unit test runner (configs: `vitest.config.ts`, `vitest.unit.config.ts`)
- **@vitest/coverage-v8** (`4.0.18`) — Coverage reporting
- **@vitest/browser-playwright** (`4.0.18`) — Browser testing
- **playwright** (`1.58.0`) — E2E testing

### Testing Utilities

- **@testing-library/react** (`16.3.2`)
- **@testing-library/jest-dom** (`6.9.1`)
- **@testing-library/user-event** (`14.6.1`)
- **@testing-library/dom** (`10.4.1`)
- **jsdom** (`25.0.1`) — DOM implementation for testing

### Storybook

- **storybook** (`10.2.1`) — Component documentation
- **@storybook/nextjs** (`10.2.1`) — Next.js integration
- **@storybook/addon-docs** (`10.2.1`)
- **@storybook/addon-a11y** (`10.2.1`) — Accessibility testing
- **@storybook/addon-vitest** (`10.2.1`) — Vitest integration
- **@chromatic-com/storybook** (`5.0.0`) — Visual regression testing

### Build Tools

- **Vite** (`7.3.1`) — Test/dev build runner
- **vite-tsconfig-paths** (`6.1.1`) — TypeScript path aliases in Vite

## Configuration Files

### Key Config Files

- `tsconfig.json` — TypeScript settings (path aliases @ → root)
- `next.config.ts` — Next.js configuration
- `eslint.config.mjs` — ESLint rules
- `prisma/schema.prisma` — Database schema
- `vitest.config.ts` — Test runner config
- `vitest.unit.config.ts` — Unit test config
- `.storybook/` — Storybook configuration

## Environment Variables

### Required (Backend Focus)

```env
DATABASE_URL=postgresql://user:pass@host/db
AUTH_SECRET=<generated with: npx auth secret>
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Email
MAILTRAP_TOKEN=<api_token>
MAILTRAP_INBOX_ID=<inbox_id>
```

### Email Configuration

- **Prototyping**: Mailtrap sandbox (all emails intercepted)
- **Production**: Switch to Resend + verified domain

## Scripts

### Development

- `npm run dev` — Start dev server
- `npm run lint` — Run ESLint
- `npm run prettier` — Format code
- `npm run storybook` — Launch Storybook UI

### Database

- `npm run db:generate` — Generate Prisma client
- `npm run db:view` — Open Prisma Studio GUI

### Testing

- `npm run test:unit` — Run unit tests
- `npm run test:coverage` — Test with coverage report
- `npm run test:storybook` — Storybook tests

### Build & Production

- `npm run build` — Build for production
- `npm start` — Start production server
- `npm run vercel-build` — Special Vercel build (runs migrations + build)

## Code Style & Conventions

### Naming

- **Components**: PascalCase (e.g., `MyComponent.tsx`)
- **Component folders**: PascalCase (e.g., `app/components/Avatar/`)
- **Route folders**: kebab-case (e.g., `app/auth/login`)
- **Functions/variables**: camelCase
- **Files**: Match folder case convention

### File Structure

- SCSS modules: `ComponentName.module.scss`
- Storybook stories: `ComponentName.stories.tsx`

### Linting

- Pre-commit hooks (husky) run ESLint + Prettier
- Format on save enabled in VS Code

## Type Generation

### Prisma Client

```bash
npm run db:generate
# Generates to: /generated/prisma/client/index.d.ts
```

Import as: `import { prisma } from "@/lib/prisma"`

## Database Migrations

Prisma migrations stored in `prisma/migrations/`:

- `20260129130907_init` — Initial schema
- `20260224084901_add_auth_models` — Auth tables
- `20260226000000_add_participant_constraints` — Unique constraints
- `20260409135358_add_game_image_url` — Game images

Deploy migrations: `prisma migrate deploy`
