---
title: Frontend Development Guide
description: Practical guide for building components and pages
---

# Frontend Development Guide

**For Your Team**: Copy-paste ready patterns and checklist.

---

## Quick Start

```bash
npm run dev           # Start dev server (http://localhost:3000)
npm run storybook    # Component documentation
npm run lint         # Check code style
npm run prettier     # Auto-format
npm run test:unit    # Run tests
```

---

## Creating a New Component

### Step 1: Create Component File

```
/app/components/MyComponent/
  ├── MyComponent.tsx
  ├── MyComponent.module.scss
  ├── MyComponent.stories.tsx (optional)
  └── index.ts (optional)
```

### Step 2: Write Component

```tsx
// /app/components/MyComponent/MyComponent.tsx
"use client"; // Only if using state/effects/context

import { ReactNode } from "react";
import styles from "./MyComponent.module.scss";

export interface MyComponentProps {
  title: string;
  children: ReactNode;
  variant?: "default" | "highlight";
  isLoading?: boolean;
  onAction?: () => void;
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
  onAction,
}: MyComponentProps) {
  return (
    <div
      className={`${styles.container} ${styles[variant]}`}
      role={onAction ? "button" : undefined}
      onClick={onAction}
    >
      <h2 className={styles.title}>{title}</h2>
      {isLoading ? <p>Chargement...</p> : children}
    </div>
  );
}
```

### Step 3: Add Styles

```scss
// /app/components/MyComponent/MyComponent.module.scss
.container {
  padding: 1rem;
  border-radius: 8px;
  background: var(--color-bg);

  &:hover {
    background: var(--color-bg-hover);
  }
}

.title {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.default {
  border: 1px solid var(--color-border);
}

.highlight {
  border: 2px solid var(--color-primary);
  background: var(--color-primary-light);
}
```

### Step 4: Add Storybook Story (Optional)

```tsx
// /app/components/MyComponent/MyComponent.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import MyComponent from "./MyComponent";

const meta: Meta<typeof MyComponent> = {
  component: MyComponent,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Example Title",
    children: "Component content here",
  },
};

export const Highlight: Story = {
  args: {
    title: "Highlighted",
    children: "This is highlighted",
    variant: "highlight",
  },
};

export const Loading: Story = {
  args: {
    title: "Loading",
    children: "This won't show",
    isLoading: true,
  },
};
```

### Step 5: Export from index (Optional)

```ts
// /app/components/MyComponent/index.ts
export { default as MyComponent } from "./MyComponent";
export type { MyComponentProps } from "./MyComponent";
```

---

## Creating a New Page

### Step 1: Server Component (No State)

```tsx
// /app/my-page/page.tsx
import { metadata } from "next";
import MyComponent from "@/app/components/MyComponent/MyComponent";

export const metadata = {
  title: "My Page Title",
  description: "Page description",
};

async function getPageData() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/my-data`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Failed to fetch:", res.status);
      return null;
    }

    return await res.json();
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}

export default async function MyPage() {
  const data = await getPageData();

  if (!data) {
    return <div>Impossible de charger la page</div>;
  }

  return (
    <main>
      <MyComponent title={data.title}>{data.content}</MyComponent>
    </main>
  );
}
```

### Step 2: Client Component (With State) - If Needed

```tsx
// /app/my-page/MyPageClient.tsx
"use client";

import { useEffect, useState } from "react";
import MyComponent from "@/app/components/MyComponent/MyComponent";

interface PageData {
  title: string;
  content: string;
}

export default function MyPageClient() {
  const [data, setData] = useState<PageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const loadData = async () => {
      try {
        const response = await fetch("/api/my-data");
        const result = await response.json();

        if (!response.ok || "error" in result) {
          throw new Error(result.error || "Une erreur est survenue");
        }

        if (active) {
          setData(result);
          setError(null);
        }
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error ? err.message : "Une erreur est survenue"
          );
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    };

    loadData();

    return () => {
      active = false; // Cleanup on unmount
    };
  }, []);

  if (isLoading) return <div>Chargement...</div>;
  if (error) return <div>Erreur: {error}</div>;
  if (!data) return <div>Aucune donnée</div>;

  return (
    <main>
      <MyComponent title={data.title}>{data.content}</MyComponent>
    </main>
  );
}
```

### Step 3: Combine in Page

```tsx
// /app/my-page/page.tsx
import MyPageClient from "./MyPageClient";

export const metadata = {
  title: "My Page",
};

export default function MyPage() {
  return <MyPageClient />;
}
```

---

## Common Patterns

### Handling Form Input

```tsx
"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { LoginSchema } from "@/schemas";
import Button from "@/app/components/Button/Button";
import Input from "@/app/components/input/Input";

export default function LoginForm() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      // Validate with Zod
      const validated = LoginSchema.parse(values);

      setIsSubmitting(true);
      setErrors({});

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });

      const data = await response.json();

      if (!response.ok || "error" in data) {
        setErrors({ submit: data.error || "Une erreur est survenue" });
        return;
      }

      // Success - redirect or update state
      window.location.href = "/profil";
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        setErrors({ submit: "Une erreur est survenue" });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="email"
        name="email"
        value={values.email}
        onChange={handleChange}
        error={errors.email}
        placeholder="Email"
      />

      <Input
        type="password"
        name="password"
        value={values.password}
        onChange={handleChange}
        error={errors.password}
        placeholder="Mot de passe"
      />

      {errors.submit && <p className="error">{errors.submit}</p>}

      <Button
        label="Se connecter"
        type="primary"
        onClick={handleSubmit}
        disabled={isSubmitting}
      />
    </form>
  );
}
```

### Carousel/Slider Pattern

```tsx
// Always use this pattern for Splide
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import { useRef } from "react";
import { CARD_SLIDER_OPTIONS } from "@/lib/constants";

type SplideController = {
  go: (control: string | number) => void;
};

export default function MySlider({ items }) {
  const sliderRef = useRef<SplideController | null>(null);

  return (
    <section>
      <div>
        <h2>Title</h2>
        <button onClick={() => sliderRef.current?.go("<")}>Précédent</button>
        <button onClick={() => sliderRef.current?.go(">")}>Suivant</button>
      </div>

      <Splide
        options={CARD_SLIDER_OPTIONS}
        hasTrack={false}
        ref={sliderRef}
        aria-label="Slider description"
      >
        <SplideTrack>
          {items.map((item) => (
            <SplideSlide key={item.id}>
              <div>{item.name}</div>
            </SplideSlide>
          ))}
        </SplideTrack>
      </Splide>
    </section>
  );
}
```

### Showing Feedback to User

```tsx
"use client";

import { useState, useEffect } from "react";

type Feedback = {
  type: "success" | "error";
  message: string;
};

export default function MyComponent() {
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  // Auto-dismiss after 3 seconds
  useEffect(() => {
    if (!feedback) return;

    const timeout = window.setTimeout(() => {
      setFeedback(null);
    }, 3000);

    return () => window.clearTimeout(timeout);
  }, [feedback]);

  const handleAction = async () => {
    try {
      const response = await fetch("/api/action");
      const data = await response.json();

      if (!response.ok || "error" in data) {
        setFeedback({
          type: "error",
          message: data.error || "Une erreur est survenue",
        });
        return;
      }

      setFeedback({
        type: "success",
        message: "Action réussie!",
      });
    } catch (error) {
      setFeedback({
        type: "error",
        message: "Une erreur est survenue",
      });
    }
  };

  return (
    <div>
      <button onClick={handleAction}>Faire quelque chose</button>

      {feedback && (
        <div className={`feedback feedback-${feedback.type}`}>
          {feedback.message}
        </div>
      )}
    </div>
  );
}
```

---

## Naming Conventions

### Files & Folders

- **Components**: `PascalCase` (e.g., `Button.tsx`, `MyComponent/`)
- **Pages/Routes**: `kebab-case` (e.g., `/my-page/page.tsx`)
- **Utils/Hooks**: `camelCase` (e.g., `useAuth.ts`, `formatDate.ts`)
- **Styles**: `{ComponentName}.module.scss`
- **Types**: `{Name}.ts` in root of component folder

### Variables & Functions

```tsx
// ✅ Good
const isLoading = true;
const userName = "John";
const handleClick = () => {};
const formatDate = (date: Date) => {};

// ❌ Avoid
const loading = true; // ambiguous
const name = "John"; // too generic
const click = () => {}; // not a verb
const date = (date: Date) => {}; // not a verb
```

### Component Props

```tsx
// ✅ Good - clear what each does
interface ButtonProps {
  label: string; // required
  type?: "primary" | "secondary"; // optional, with types
  onClick?: () => void; // optional callback
  disabled?: boolean; // optional flag
}

// ❌ Avoid
interface ButtonProps {
  text: string; // use 'label'
  buttonType?: string; // use 'type', not 'buttonType'
  on?: () => void; // use 'onClick'
}
```

---

## Accessibility Checklist

When building interactive components, include:

```tsx
// ✅ Semantic HTML
<button type="button">Click me</button>
<nav>...</nav>
<main>...</main>

// ✅ ARIA labels for icon buttons
<button aria-label="Open menu">☰</button>

// ✅ State indicators
<button aria-expanded={isOpen}>Menu</button>
<div aria-hidden={isLoading}>Content</div>

// ✅ Live regions for dynamic content
<div role="status" aria-live="polite">
  {feedback.message}
</div>

// ✅ Focus management
<input ref={inputRef} />
useEffect(() => inputRef.current?.focus(), []);

// ✅ Keyboard navigation
const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === "Escape") {
    onClose();
  }
};
```

---

## Performance Tips

### Avoid Unnecessary Renders

```tsx
// ❌ Bad - renders every time component renders
const MyComponent = () => {
  const options = {
    type: "slide",
    perPage: 3,
  };
  return <Splide options={options} />;
};

// ✅ Good - reuses same object
const MY_OPTIONS = {
  type: "slide",
  perPage: 3,
};

const MyComponent = () => {
  return <Splide options={MY_OPTIONS} />;
};
```

### Memoize Computed Values

```tsx
// ✅ Good - only recomputes when items change
const sortedItems = useMemo(
  () => items.sort((a, b) => a.date - b.date),
  [items]
);
```

### Lazy Load Heavy Components

```tsx
import dynamic from "next/dynamic";

const HeavyChart = dynamic(() => import("@/components/HeavyChart"), {
  loading: () => <p>Chargement...</p>,
});

export default function Page() {
  return <HeavyChart />; // Only loaded when page renders
}
```

---

## Error Handling Template

```tsx
"use client";

import { ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export default function ErrorBoundary({
  children,
  fallback,
}: ErrorBoundaryProps) {
  // Note: This is simplified. For real implementation, use
  // react-error-boundary or implement componentDidCatch in class component
  return (
    <div>
      {fallback || <p>Une erreur est survenue.</p>}
      {children}
    </div>
  );
}

// Usage:
// <ErrorBoundary fallback={<ErrorFallback />}>
//   <MyComponent />
// </ErrorBoundary>
```

---

## Testing Example

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

  it("is disabled when disabled prop is true", () => {
    render(<Button label="Click" disabled />);
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
```

---

## Common Issues & Solutions

### Issue: Component flashes loading then content

```tsx
// ❌ Bad
const [data, setData] = useState(null);
return data ? <View data={data} /> : <Loading />;

// ✅ Good
const [data, setData] = useState(null);
const [isLoading, setIsLoading] = useState(true);
useEffect(() => { ... setIsLoading(false); }, []);
return isLoading ? <Loading /> : data ? <View /> : <Empty />;
```

### Issue: Form still submits after click

```tsx
// ❌ Bad
<button onClick={handleSubmit}>Submit</button>

// ✅ Good (if inside form)
<form onSubmit={handleSubmit}>
  <input ... />
  <button type="submit">Submit</button>
</form>

// ✅ Good (if standalone)
<button onClick={(e) => { e.preventDefault(); handleSubmit(); }}>
  Submit
</button>
```

### Issue: State update after unmount warning

```tsx
// ✅ Good - cleanup function
useEffect(() => {
  let active = true;

  const load = async () => {
    const data = await fetch(...);
    if (active) setData(data);  // Only update if still mounted
  };

  load();

  return () => {
    active = false;  // Cleanup
  };
}, []);
```

---

## Code Review Checklist for Your Team

Before pushing code, ask:

- [ ] **Types**: All props have proper TypeScript interfaces?
- [ ] **"use client"**: Only added if using state/effects/hooks?
- [ ] **Errors**: Handles API errors and shows user feedback?
- [ ] **Loading**: Shows loading state while fetching?
- [ ] **Accessibility**: ARIA labels on interactive elements?
- [ ] **Naming**: Variables/functions use clear names (e.g., `isLoading` not `loading`)?
- [ ] **Comments**: Complex logic explained? (not obvious things)
- [ ] **Reuse**: Can this component be used elsewhere?
- [ ] **Performance**: No unnecessary re-renders?
- [ ] **Tests**: Complex components have tests?

---

## Resources

- **Next.js Docs**: https://nextjs.org/docs
- **React Docs**: https://react.dev
- **TypeScript**: https://www.typescriptlang.org/docs/
- **Storybook**: Run `npm run storybook` locally
- **Testing Library**: https://testing-library.com/

---

**Last Updated**: 2026-04-10  
**Questions?** Check Backend Guide or ask team!
