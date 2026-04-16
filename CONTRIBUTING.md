---
title: Contributing Guidelines
description: How to contribute to My Digital League
---

# Contributing to My Digital League

Welcome! This document explains how to contribute to the project.

---

## Before You Start

1. **Read the docs**: Check `/docs/INDEX.md` to find the right guide
   - Frontend? → [FRONTEND_GUIDE.md](docs/FRONTEND_GUIDE.md)
   - Backend? → [BACKEND_GUIDE.md](docs/BACKEND_GUIDE.md)

2. **Set up your environment**:

   ```bash
   nvm use          # Use correct Node version
   npm install      # Install dependencies
   npm run dev      # Start dev server
   ```

3. **Create a feature branch**:
   ```bash
   git checkout -b feat/my-feature
   ```

---

## Code Standards

### Naming Conventions

**Files & Folders**:

- Components: `PascalCase` (e.g., `Button.tsx`, `MyComponent/`)
- Pages/Routes: `kebab-case` (e.g., `/my-page/page.tsx`)
- Utils/Hooks: `camelCase` (e.g., `useAuth.ts`, `formatDate.ts`)

**Variables & Functions**:

```tsx
// ✅ Good
const isLoading = true;
const handleClick = () => {};
const formatDate = (date: Date) => {};

// ❌ Avoid
const loading = true; // Ambiguous
const click = () => {}; // Not a verb
const date = () => {}; // Not a verb
```

### TypeScript

**Always type your code**:

```tsx
// ✅ Good
interface ButtonProps {
  label: string;
  onClick?: () => void;
  type?: "primary" | "secondary";
}

export default function Button(props: ButtonProps) {
  // ...
}

// ❌ Avoid
export default function Button(props) {
  // No types!
  // ...
}
```

### Comments

- **Explain "why"**, not "what"
- Code should be clear enough to not need comments for obvious things
- Use comments for complex logic:

```tsx
// ✅ Good
// Filter out past events since they can't be registered for
const upcomingEvents = events.filter((e) => new Date(e.date) > now);

// ❌ Avoid
// Loop through events
const upcomingEvents = events.filter((e) => new Date(e.date) > now);
```

---

## Component Development

### Component Checklist

When creating a new component, ensure:

- [ ] **Props typed** with interface
- [ ] **"use client"** added if using state/effects
- [ ] **SCSS module** for styling
- [ ] **ARIA labels** on interactive elements
- [ ] **Error handling** for data fetching
- [ ] **Loading states** shown
- [ ] **Export typed** (interface + component)
- [ ] **No console.logs** in production code
- [ ] **Prettier** formatted code
- [ ] **ESLint** passes

### Folder Structure

```
/app/components/MyComponent/
├── MyComponent.tsx                    # Component
├── MyComponent.module.scss            # Styles
├── MyComponent.stories.tsx            # Storybook (optional)
└── index.ts                           # Export (optional)
```

### Example Component

```tsx
// /app/components/MyComponent/MyComponent.tsx
"use client"; // Only if using state/hooks

import { ReactNode } from "react";
import styles from "./MyComponent.module.scss";

export interface MyComponentProps {
  title: string;
  children: ReactNode;
  variant?: "default" | "highlight";
  isLoading?: boolean;
}

/**
 * MyComponent description
 * @example
 * <MyComponent title="Hello" />
 */
export default function MyComponent({
  title,
  children,
  variant = "default",
  isLoading = false,
}: MyComponentProps) {
  return (
    <div className={`${styles.container} ${styles[variant]}`}>
      <h2 className={styles.title}>{title}</h2>
      {isLoading ? <p>Chargement...</p> : children}
    </div>
  );
}
```

---

## Page Development

### Page Checklist

- [ ] **Server component** for auth checks
- [ ] **Client component** for state (if needed)
- [ ] **Metadata** for SEO
- [ ] **Data fetching** error handling
- [ ] **Loading state** handled
- [ ] **No `any` types**
- [ ] **Accessible** (semantic HTML, ARIA)

### Example Page

```tsx
// /app/my-page/page.tsx
import MyPageClient from "./MyPageClient";

export const metadata = {
  title: "My Page Title",
  description: "Page description",
};

export default function MyPage() {
  return <MyPageClient />;
}
```

```tsx
// /app/my-page/MyPageClient.tsx
"use client";

import { useEffect, useState } from "react";

export default function MyPageClient() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        const response = await fetch("/api/data");
        const result = await response.json();

        if (!response.ok || "error" in result) {
          throw new Error(result.error || "Une erreur est survenue");
        }

        if (active) setData(result);
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error ? err.message : "Une erreur est survenue"
          );
        }
      } finally {
        if (active) setIsLoading(false);
      }
    };

    load();

    return () => {
      active = false;
    };
  }, []);

  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error}</div>;
  if (!data) return <div>Aucune donnée</div>;

  return <main>{/* Render data */}</main>;
}
```

---

## API Development (Backend)

### Endpoint Checklist

- [ ] **Type Context** for dynamic params
- [ ] **GET endpoint** (usually public)
- [ ] **POST endpoint** with `auth()` wrapper
- [ ] **Permission checks** (isOrga, etc.)
- [ ] **Input validation** (required fields)
- [ ] **Error handling** with proper codes
- [ ] **French error messages**
- [ ] **Proper HTTP codes** (201 for create, etc.)
- [ ] **Response includes** optimized relations

### Example Endpoint

```ts
// /app/api/my-resource/route.ts
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type Context = { params: Promise<{ id: string }> };

export async function GET(_req: NextRequest, { params }: Context) {
  const { id } = await params;

  const resource = await prisma.resource.findUnique({
    where: { id },
    include: {
      /* relations */
    },
  });

  if (!resource) {
    return NextResponse.json(
      { error: "Ressource introuvable" },
      { status: 404 }
    );
  }

  return NextResponse.json(resource);
}

export const POST = auth(async (req) => {
  if (!req.auth?.user?.isOrga) {
    return NextResponse.json({ error: "Accès interdit" }, { status: 403 });
  }

  const body = await req.json();

  if (!body.requiredField) {
    return NextResponse.json(
      { error: "Tous les champs sont requis" },
      { status: 400 }
    );
  }

  const created = await prisma.resource.create({
    data: { ...body },
    include: {
      /* relations */
    },
  });

  return NextResponse.json(created, { status: 201 });
});
```

---

## Testing

### Unit Tests

Write tests for:

- Utility functions
- Complex component logic
- API handlers

```tsx
// __tests__/components/Button.test.tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "@/app/components/Button/Button";

describe("Button", () => {
  it("renders with label", () => {
    render(<Button label="Click me" />);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("calls onClick when clicked", async () => {
    const handleClick = vi.fn();
    render(<Button label="Click" onClick={handleClick} />);

    await userEvent.click(screen.getByText("Click"));
    expect(handleClick).toHaveBeenCalled();
  });
});
```

### Running Tests

```bash
npm run test:unit       # Run all tests
npm run test:coverage   # With coverage report
```

---

## Git Workflow

### Branch Naming

```
feat/description        # New feature
fix/description         # Bug fix
refactor/description    # Refactoring
docs/description        # Documentation
style/description       # Styling changes
test/description        # Testing changes
chore/description       # Maintenance
```

### Commit Messages

```
feat: add new feature (short, clear)
fix: resolve authentication bug
refactor: extract SliderSection component
docs: update frontend guide
```

### Pull Request Process

1. **Create feature branch**:

   ```bash
   git checkout -b feat/my-feature
   ```

2. **Make changes** and commit:

   ```bash
   git add .
   git commit -m "feat: add my feature"
   ```

3. **Push branch**:

   ```bash
   git push origin feat/my-feature
   ```

4. **Create PR** on GitHub with:
   - Clear title (e.g., "Add user profile component")
   - Description of what changed
   - Testing notes (how to verify)

5. **Code review checklist**:
   - [ ] Code follows standards (naming, types, comments)
   - [ ] No console.logs
   - [ ] ESLint passes
   - [ ] Prettier formatted
   - [ ] TypeScript strict mode happy
   - [ ] No unused imports
   - [ ] Tests added (if applicable)

---

## Code Review

### For Reviewers

Check:

- ✅ Follows naming conventions
- ✅ Properly typed (no `any`)
- ✅ ARIA labels on interactive elements
- ✅ Error handling implemented
- ✅ No console.logs
- ✅ Doesn't duplicate existing code
- ✅ Tests added for complex logic

Use this template:

```
## Looks good! 🎉

Minor suggestions:
- [ ] Variable name could be clearer (e.g., `isLoading` instead of `loading`)
- [ ] Add error handling for API call

Questions:
- Why did you choose this approach over...?
```

### For Authors

When receiving feedback:

- 👍 Say thanks
- 🤔 Ask for clarification if confused
- 🔧 Make changes requested
- 📝 Reply to each comment (even "done!")

---

## Before You Push

### Pre-Commit Checklist

```bash
# 1. Format code
npm run prettier

# 2. Check linting
npm run lint

# 3. Run tests
npm run test:unit

# 4. Manual testing in browser
npm run dev
# Visit http://localhost:3000 and test your changes

# 5. Check no console.logs remain
grep -r "console\." app/ | grep -v node_modules
```

### If lint/prettier fails

```bash
# Auto-fix most issues
npm run lint -- --fix
npm run prettier
```

---

## Documentation

### Update docs when:

- ✅ Adding a new pattern
- ✅ Changing how something works
- ✅ Creating a new component type
- ✅ Making breaking changes

### Which doc to update:

- Component patterns → `/docs/FRONTEND_GUIDE.md`
- New endpoints → `/docs/BACKEND_ARCHITECTURE.md`
- New database models → `/docs/DATABASE_SCHEMA.md`
- Dependencies changed → `/docs/TECH_STACK.md`

### Update format:

1. Make documentation change
2. Update "Last Updated: YYYY-MM-DD" at bottom
3. Commit with message: `docs: update [document] with [change]`

---

## Common Mistakes to Avoid

❌ **Using `any` type**

```tsx
// Don't do this
const data: any = await fetch(...).then(r => r.json());
```

✅ **Do this**:

```tsx
interface MyData {
  id: string;
  name: string;
}
const data: MyData = await fetch(...).then(r => r.json());
```

---

❌ **Forgetting cleanup in useEffect**

```tsx
// Don't do this
useEffect(() => {
  fetch("/api/data").then(setData);
}, []);
```

✅ **Do this**:

```tsx
useEffect(() => {
  let active = true;
  fetch("/api/data").then((data) => {
    if (active) setData(data); // Only update if still mounted
  });
  return () => {
    active = false;
  }; // Cleanup
}, []);
```

---

❌ **No error handling**

```tsx
// Don't do this
const data = await fetch("/api/data").then((r) => r.json());
return <div>{data.name}</div>; // Crashes if API fails
```

✅ **Do this**:

```tsx
try {
  const response = await fetch("/api/data");
  const data = await response.json();
  if (!response.ok || "error" in data) {
    setError(data.error || "Une erreur est survenue");
    return;
  }
  setData(data);
} catch (error) {
  setError("Une erreur est survenue");
}
```

---

❌ **Hardcoded values**

```tsx
// Don't do this
const timeout = 3000;
const apiUrl = "http://localhost:3000/api/events";
```

✅ **Do this**:

```tsx
// /lib/constants.ts
export const FEEDBACK_TIMEOUT = 3000;
export const API_ENDPOINTS = {
  EVENTS: "/api/events",
} as const;
```

---

## Getting Help

1. **Check `/docs/INDEX.md`** - Find the right guide
2. **Search the codebase** - Similar component might already exist
3. **Ask in team chat** - Be specific: "How should I handle X?"
4. **Ask the prof** - For code review or architectural questions

---

## Performance Tips

- Use `useMemo` for expensive calculations
- Lazy load heavy components with `dynamic()`
- Import only what you need (tree-shaking)
- Use React.memo for components with many renders
- Avoid inline functions in JSX (creates new function each render)

---

## Accessibility (a11y)

Always include:

- Semantic HTML (`<button>`, not `<div role="button">`)
- ARIA labels on icon buttons
- Keyboard navigation (Tab, Enter, Escape)
- Focus management for modals/menus
- Alt text for images

```tsx
// ✅ Good
<button aria-label="Close menu" onClick={onClose}>
  ✕
</button>

// ❌ Avoid
<div onClick={onClose}>✕</div>  // Not semantic, no label
```

---

## Final Checklist Before Pushing

- [ ] Code compiles without errors
- [ ] No TypeScript warnings
- [ ] ESLint passes: `npm run lint`
- [ ] Prettier: `npm run prettier`
- [ ] Tests pass (if added): `npm run test:unit`
- [ ] Tested in browser: `npm run dev`
- [ ] No console.logs (except errors)
- [ ] No hardcoded values
- [ ] ARIA labels on interactive elements
- [ ] Error handling implemented
- [ ] Git commit message is clear
- [ ] Branch name follows convention

---

## Questions?

1. **How do I...?** → Check `/docs/INDEX.md`
2. **Is this the right way?** → Ask for code review
3. **Does the code need tests?** → If logic > 10 lines, yes
4. **Should I update docs?** → If changes behavior, yes

---

## Welcome! 🎉

Thank you for contributing! Follow these guidelines and ask questions when stuck. We're here to help!

---

**Last Updated**: 2026-04-10  
**Version**: 1.0

---

Happy coding! 🚀
