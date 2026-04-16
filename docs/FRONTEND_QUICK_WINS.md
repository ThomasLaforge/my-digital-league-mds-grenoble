---
title: Frontend Quick Wins & Refactoring Tasks
description: Low-effort improvements to boost code quality
---

# Quick Wins & Refactoring Tasks

**Goal**: Incremental improvements to consistency. Do these when you have spare time.

---

## Priority 1: 30 minutes (Easy)

### 1.1 Fix EventList Casing

**Issue**: Inconsistent filename casing  
**Location**: `/app/components/EventList/Eventlist.tsx` (file) vs imports (uppercase)

**Fix**:

```bash
# Rename the file
mv /app/components/EventList/Eventlist.tsx /app/components/EventList/EventList.tsx

# Then update the import in /app/tournois/page.tsx
# FROM:
import EventsList from "../components/EventList/Eventlist";

# TO:
import EventsList from "../components/EventList/EventList";
```

**Impact**: ✅ Consistency, easier to find files

---

### 1.2 Create Constants File

**Location**: `/lib/constants.ts`

**Why**: Slider options are duplicated in 3 files

```ts
// /lib/constants.ts
import type { Options } from "@splidejs/splide";

export const CARD_SLIDER_OPTIONS: Options = {
  type: "slide",
  perPage: 3,
  perMove: 1,
  gap: "2.4rem",
  arrows: false,
  pagination: false,
  drag: true,
  breakpoints: {
    1199: {
      perPage: 2,
    },
    767: {
      perPage: 1,
    },
  },
};

export const FEATURE_FLAGS = {
  ENABLE_GAME_JAMS: true,
  ENABLE_ORGANIZER_DASHBOARD: false,
} as const;

export const API_ENDPOINTS = {
  EVENTS: "/api/events",
  GAMES: "/api/games",
  ME: "/api/me",
} as const;
```

**Update imports in**:

- `/app/DynamicHome.tsx` (line 21)
- `/app/profil/ProfileClient.tsx` (line 64)
- `/app/components/EventList/EventList.tsx` (top)

**From**:

```tsx
const cardSliderOptions: Options = { ... };
```

**To**:

```tsx
import { CARD_SLIDER_OPTIONS } from "@/lib/constants";

// Then use:
<Splide options={CARD_SLIDER_OPTIONS} ... />
```

**Impact**: ✅ Single source of truth, easier to update

---

### 1.3 Create Splide Types File

**Location**: `/types/splide.ts`

**Why**: `SplideController` type is redefined in 2 files

```ts
// /types/splide.ts
export type SplideController = {
  go: (control: string | number) => void;
};
```

**Update imports in**:

- `/app/DynamicHome.tsx` (line 17)
- `/app/profil/ProfileClient.tsx` (line 60)

**From**:

```tsx
type SplideController = {
  go: (control: string | number) => void;
};
```

**To**:

```tsx
import { SplideController } from "@/types/splide";
```

**Impact**: ✅ DRY principle, shared types

---

## Priority 2: 1-2 hours (Medium)

### 2.1 Extract SliderSection Component

**Issue**: `ProfileSection` and `HomeSection` are nearly identical  
**Benefit**: Reduces code duplication, easier to maintain

**Create**: `/app/components/SliderSection/SliderSection.tsx`

```tsx
// /app/components/SliderSection/SliderSection.tsx
import { ReactNode } from "react";
import styles from "./SliderSection.module.scss";
import { ChevronLeftIcon, ChevronRightIcon } from "../Icons/Icons";

interface SliderSectionProps {
  title: string;
  showControls?: boolean;
  onPrevious?: () => void;
  onNext?: () => void;
  previousLabel?: string;
  nextLabel?: string;
  children: ReactNode;
}

export default function SliderSection({
  title,
  showControls = true,
  onPrevious,
  onNext,
  previousLabel = "Précédent",
  nextLabel = "Suivant",
  children,
}: SliderSectionProps) {
  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>
          {title}
          <span className={styles.sectionChevron}>
            <ChevronRightIcon color="currentColor" />
          </span>
        </h2>

        {showControls && (
          <div className={styles.controls}>
            <button
              type="button"
              className={styles.controlButton}
              aria-label={previousLabel}
              onClick={onPrevious}
            >
              <ChevronLeftIcon color="currentColor" />
            </button>
            <button
              type="button"
              className={styles.controlButton}
              aria-label={nextLabel}
              onClick={onNext}
            >
              <ChevronRightIcon color="currentColor" />
            </button>
          </div>
        )}
      </div>

      {children}
    </section>
  );
}
```

**Add to stories** (if you want):

```tsx
// /app/components/SliderSection/SliderSection.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import SliderSection from "./SliderSection";

const meta: Meta<typeof SliderSection> = {
  component: SliderSection,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Section Title",
    showControls: true,
    children: <div>Content here</div>,
  },
};
```

**Replace in files**:

- `/app/DynamicHome.tsx` - replace `HomeSection` with `SliderSection`
- `/app/profil/ProfileClient.tsx` - replace `ProfileSection` with `SliderSection`

**From**:

```tsx
function HomeSection({ ... }) { ... }
```

**To**:

```tsx
import SliderSection from "@/app/components/SliderSection/SliderSection";

// Use:
<SliderSection title="..." onPrevious={...} onNext={...}>
  <Splide>...</Splide>
</SliderSection>
```

**Impact**: ✅ Reduces 50+ lines of duplicate code

---

### 2.2 Create Error Handling Utility

**Location**: `/lib/api.ts`

**Why**: Fetch error handling is similar in multiple places

```ts
// /lib/api.ts
export type ApiResponse<T> = {
  data: T | null;
  error: string | null;
  isError: boolean;
};

export async function fetchApi<T>(
  url: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(url, {
      headers: { "Content-Type": "application/json" },
      ...options,
    });

    const data = await response.json();

    if (!response.ok || ("error" in data && data.error)) {
      return {
        data: null,
        error: data.error || `Erreur ${response.status}`,
        isError: true,
      };
    }

    return {
      data: data as T,
      error: null,
      isError: false,
    };
  } catch (error) {
    return {
      data: null,
      error: "Une erreur est survenue",
      isError: true,
    };
  }
}
```

**Use in components**:

```tsx
import { fetchApi } from "@/lib/api";

const { data, error, isError } = await fetchApi("/api/me");

if (isError) {
  setFeedback({ type: "error", message: error });
  return;
}

setUser(data);
```

**Impact**: ✅ Consistent error handling, less code

---

### 2.3 Add Error Boundary

**Location**: `/app/components/ErrorBoundary/ErrorBoundary.tsx`

```tsx
// /app/components/ErrorBoundary/ErrorBoundary.tsx
"use client";

import { ReactNode } from "react";
import styles from "./ErrorBoundary.module.scss";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error) {
    console.error("Error caught:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.container}>
          <h2>Une erreur est survenue</h2>
          <p>Nous travaillons pour corriger ce problème.</p>
          <button onClick={() => window.location.reload()}>
            Recharger la page
          </button>
          {this.props.fallback}
        </div>
      );
    }

    return this.props.children;
  }
}
```

**Use in layout**:

```tsx
// /app/layout.tsx
import { ErrorBoundary } from "@/app/components/ErrorBoundary/ErrorBoundary";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <ErrorBoundary>{children}</ErrorBoundary>
      </body>
    </html>
  );
}
```

**Impact**: ✅ Graceful error handling, better UX

---

## Priority 3: 2-4 hours (Later)

### 3.1 Create Custom Hooks

**Location**: `/hooks/useApi.ts`

```ts
// /hooks/useApi.ts
import { useEffect, useState } from "react";

interface UseApiOptions {
  cache?: "no-store" | "default";
  skip?: boolean;
}

export function useApi<T>(url: string, options: UseApiOptions = {}) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (options.skip) return;

    let active = true;

    const load = async () => {
      try {
        const response = await fetch(url, {
          cache: options.cache || "no-store",
        });

        if (!active) return;

        const result = await response.json();

        if (!response.ok || "error" in result) {
          setError(result.error || "Une erreur est survenue");
          return;
        }

        setData(result as T);
        setError(null);
      } catch (err) {
        if (active) {
          setError("Une erreur est survenue");
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    };

    load();

    return () => {
      active = false;
    };
  }, [url, options.skip, options.cache]);

  return { data, isLoading, error };
}
```

**Use instead of manual fetch**:

```tsx
// Before:
const [data, setData] = useState(null);
const [isLoading, setIsLoading] = useState(true);
useEffect(() => {
  fetch("/api/me")
    .then((r) => r.json())
    .then(setData)
    .finally(() => setIsLoading(false));
}, []);

// After:
const { data, isLoading, error } = useApi("/api/me");
```

**Impact**: ✅ Less boilerplate, consistent fetch logic

---

### 3.2 Update Async Route Params

**Issue**: Some routes don't use async params (Next.js 15+)  
**Locations to check**:

- `/app/evenements/[id]/page.tsx`
- Any other dynamic routes

**Update pattern**:

```tsx
// Before
export default function EventPage({
  params: { id },
}: {
  params: { id: string };
}) {
  // ...
}

// After
type Params = { params: Promise<{ id: string }> };

export default async function EventPage({ params }: Params) {
  const { id } = await params;
  // ...
}
```

**Impact**: ✅ Future-proof with Next.js 15+

---

### 3.3 Organize Type Definitions

**Create**: `/types/index.ts`

```ts
// /types/index.ts
export type { SplideController } from "./splide";
export type { ProfileEvent } from "./profile";
export type { ApiError } from "./api";
// ... etc
```

**This creates a single import point**:

```tsx
// Instead of:
import { SplideController } from "@/types/splide";
import { ProfileEvent } from "@/types/profile";

// You can do:
import { SplideController, ProfileEvent } from "@/types";
```

**Impact**: ✅ Cleaner imports, easier to find types

---

## Priority 4: Nice to Have (Polish)

### 4.1 Add More Storybook Stories

For these components (if not already done):

- Avatar
- EventList
- Card (all variants)
- Input

**Why**: Documentation, easier testing, visual regression

---

### 4.2 Improve Accessibility

- [ ] Add `aria-current="page"` to active nav links (Header)
- [ ] Add focus management for mobile menu (Header)
- [ ] Test with keyboard only (Tab, Enter, Escape)
- [ ] Check color contrast ratios

---

### 4.3 Add Loading Skeletons

Instead of "Chargement...":

```tsx
// Create /app/components/Skeleton/Skeleton.tsx
export function CardSkeleton() {
  return (
    <div className={styles.skeleton}>
      <div className={styles.shimmer} />
    </div>
  );
}

// Use in list:
{
  isLoading ? (
    <>
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </>
  ) : (
    <>...</>
  );
}
```

---

## Implementation Order

**Week 1** (Do Priority 1):

1. Fix EventList casing (5 min)
2. Create constants file (10 min)
3. Create Splide types file (5 min)
4. **Total: 20 minutes** ✅

**Week 2** (Do Priority 2):

1. Extract SliderSection (30 min)
2. Create error utility (20 min)
3. Add ErrorBoundary (15 min)
4. **Total: 1.5 hours** ✅

**When you have time** (Priority 3-4):

- Custom hooks
- Type organization
- Storybook stories
- Accessibility improvements

---

## Testing After Changes

```bash
# After each change, run:
npm run lint          # Check for errors
npm run prettier      # Format code
npm run test:unit    # Run tests
npm run dev          # Visual check
```

---

## Checklist for Each Change

- [ ] Code compiles without errors
- [ ] ESLint passes: `npm run lint`
- [ ] Prettier happy: `npm run prettier`
- [ ] Works in browser (http://localhost:3000)
- [ ] Mobile responsive (tested)
- [ ] Accessibility still good (keyboard navigation, ARIA labels)

---

## Questions While Refactoring

- **"Should I move this utility?"** → If used in 2+ places, move it
- **"Should I create a custom hook?"** → If fetch/state logic repeats 2+ times, yes
- **"Is my component too big?"** → If >200 lines, consider splitting
- **"Do I need TypeScript for this?"** → Yes, always use types

---

## Metrics to Track

After implementing changes:

- Lines of code in components (should decrease)
- Number of files (stays same, better organized)
- Type coverage (should increase)
- Test coverage (should increase)

---

**Start with Priority 1 this week!**  
**It takes 20 minutes and improves consistency immediately.**

Need help with any of these? Create an issue or ask!
