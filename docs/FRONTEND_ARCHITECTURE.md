---
title: Frontend Architecture & Standards
description: Component patterns, page structure, best practices for consistency
---

# Frontend Architecture & Standards

**Status**: Code works well! This doc aims to improve consistency across 7 developers.  
**Goal**: Standardize patterns while maintaining current functionality.

---

## Current Structure Overview

```
/app
├── components/          # Reusable UI components
│   ├── Button/
│   ├── Card/
│   ├── Header/
│   ├── Avatar/
│   ├── auth/           # Auth-specific components
│   └── ...
├── api/                # Backend API routes (backend guide)
├── auth/               # Auth pages (login, register, etc.)
├── profil/             # User profile page
├── tournois/           # Tournament pages
├── evenements/         # Event detail pages
└── layout.tsx          # Root layout
```

**Key observation**: Good folder structure, but component patterns are less consistent than backend.

---

## Component Patterns

### ✅ Good Pattern: Button Component

**File**: `/app/components/Button/Button.tsx`

```tsx
interface ButtonProps {
  type?: "primary" | "secondary" | "tertiary";
  href?: string;
  label: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right" | "both";
  disabled?: boolean;
  onClick?: () => void;
  fullWidth?: boolean;
}

export default function Button(props: ButtonProps) {
  // Renders as Link OR button based on href prop
  // Clear interface, easy to use
}
```

**Why it works:**

- Clear, typed props
- Handles both button and link behavior
- Flexible icon placement
- No unnecessary complexity

**Use this as a template for other components.**

---

### ⚠️ Complex Pattern: Card Component

**File**: `/app/components/Card/Card.tsx`

**Current state**:

- Takes full Event object but only uses some fields
- Three variants with heavy conditional rendering (nested ternaries)
- 170+ lines with lots of inline logic

**Issues**:

```tsx
// Problem 1: Props interface is too broad
interface CardProps extends Event {
  // inherits all Event fields
  name: string;
  description?: string;
  heure?: string;
  lieu?: string;
  animatedBy?: string;
  // ... many optional fields
}

// Problem 2: Nested ternaries hard to read
{
  variant === "minimale" ? (
    <>...</>
  ) : variant === "register" ? (
    <>...</>
  ) : (
    <>...</>
  );
}
```

**Recommendation** (low priority - works now):

```tsx
// Option A: Extract variants into separate components
<CardMinimale {...props} />
<CardRegister {...props} />
<CardFeatured {...props} />

// Option B: Keep one component, extract render logic
function renderContent(variant, props) { ... }

// For now: Add comment explaining variants
// Refactor later if complexity grows
```

---

## Page & Data Fetching Patterns

### ✅ Good Pattern: Server Component with Client Child

**File**: `/app/profil/page.tsx`

```tsx
// Server Component - auth check, secure
export default async function ProfilPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/auth/login");
  }
  return <ProfileClient />; // Pass to client component
}
```

**File**: `/app/profil/ProfileClient.tsx`

```tsx
// Client Component - state, interactivity
"use client";

export default function ProfileClient() {
  const [name, setName] = useState("");
  // ... state management, fetch on mount
}
```

**Why it works:**

- Auth check on server (secure)
- Client component handles state
- Clean separation

**Follow this pattern for all auth-protected pages.**

---

### Server-Side Data Fetching

**File**: `/app/tournois/page.tsx`

```tsx
async function getEvents() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/events`, {
    cache: "no-store", // Fresh data on each request
  });
  if (!res.ok) return [];
  return res.json();
}

export default async function TournoisPage() {
  const events = await getEvents();
  return <EventsList events={events} />;
}
```

**✅ Good**: Fetches on server, no loading state needed  
**⚠️ Consider**: Add error handling for failed API calls

```tsx
async function getEvents() {
  try {
    const res = await fetch(...);
    if (!res.ok) {
      console.error("Failed to fetch events:", res.status);
      return [];
    }
    return res.json();
  } catch (error) {
    console.error("Events fetch error:", error);
    return [];
  }
}
```

---

## State Management Patterns

### Current Issue: ProfileClient.tsx has many individual states

```tsx
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [isOrga, setIsOrga] = useState(false);
const [createdAt, setCreatedAt] = useState("");
const [isEditingName, setIsEditingName] = useState(false);
const [feedback, setFeedback] = useState<...>(null);
// ... 7 state variables total
```

**Recommendation** (refactor when touching this code):

```tsx
// Group related state
interface UserData {
  name: string;
  email: string;
  isOrga: boolean;
  createdAt: string;
}

const [user, setUser] = useState<UserData>({
  name: "",
  email: "",
  isOrga: false,
  createdAt: "",
});

const [ui, setUi] = useState({
  isLoading: true,
  isEditing: false,
  feedback: null as { type: "success" | "error"; message: string } | null,
});
```

**This is not urgent—only refactor if you're already modifying the component.**

---

## Common Patterns to Standardize

### 1. Loading States

**Bad** (nothing shown while loading):

```tsx
const [data, setData] = useState(null);
// ... fetch doesn't set loading state
return <div>{data?.name}</div>; // blank while loading
```

**Good** (shows what's happening):

```tsx
const [isLoading, setIsLoading] = useState(true);
const [data, setData] = useState(null);

useEffect(() => {
  setIsLoading(true);
  fetchData().finally(() => setIsLoading(false));
}, []);

if (isLoading) return <p>Chargement...</p>;
if (!data) return <p>Aucune donnée</p>;
return <div>{data.name}</div>;
```

**Apply this to**: Any component fetching data on mount

---

### 2. Fetch Error Handling

**Pattern to use everywhere**:

```tsx
const loadData = async () => {
  try {
    const response = await fetch("/api/data");
    const data = await response.json();

    if (!response.ok || "error" in data) {
      setFeedback({
        type: "error",
        message: data.error || "Une erreur est survenue.",
      });
      return;
    }

    setData(data);
    // success - optional toast
  } catch (error) {
    setFeedback({
      type: "error",
      message: "Une erreur est survenue.",
    });
  } finally {
    setIsLoading(false);
  }
};
```

**This pattern is already in ProfileClient.tsx - use it as template.**

---

### 3. Form State Management

**Pattern** (from auth forms):

```tsx
const [values, setValues] = useState({ email: "", password: "" });
const [errors, setErrors] = useState<Record<string, string>>({});

const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
};

const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  const validated = LoginSchema.parse(values); // Zod validation
  // ... submit
};
```

**Use this for any form.**

---

## Naming Conventions - Quick Fixes

### Inconsistencies Found

| Issue                              | Location                  | Fix                                          |
| ---------------------------------- | ------------------------- | -------------------------------------------- |
| `EventList/Eventlist.tsx` (casing) | `/app/components/`        | Use PascalCase consistently: `EventList.tsx` |
| `formatEventHour` vs `formatDate`  | Mixed usage               | Both use `format*` prefix ✅ Keep this       |
| `cardSliderOptions` duplicated     | HomeClient, ProfileClient | Extract to `/lib/constants.ts`               |
| `SplideController` redefined       | Multiple files            | Define once in `/types/splide.ts`            |
| `ProfileEvent` custom type         | ProfileClient only        | Define in component file (it's local) ✅ OK  |

**Quick fixes**:

1. Rename `/app/components/EventList/Eventlist.tsx` → `EventList.tsx`
2. Create `/lib/constants.ts`:
   ```ts
   export const CARD_SLIDER_OPTIONS = {
     type: "slide",
     perPage: 3,
     // ... rest
   };
   ```
3. Create `/types/splide.ts`:
   ```ts
   export type SplideController = {
     go: (control: string | number) => void;
   };
   ```

---

## Component Reusability Issues

### Repeated Patterns

**ProfileSection & HomeSection** (ProfileClient.tsx + DynamicHome.tsx):

- Nearly identical layout
- Both render title + controls + children
- Both manage Splide carousel

**Recommendation**:

```tsx
// Create /app/components/SliderSection.tsx
interface SliderSectionProps {
  title: string;
  onPrevious?: () => void;
  onNext?: () => void;
  previousLabel: string;
  nextLabel: string;
  showControls?: boolean;
  children: ReactNode;
}

export default function SliderSection({ ... }: SliderSectionProps) {
  // unified implementation
}
```

**Then use in both places:**

```tsx
<SliderSection title="..." onPrevious={...}>
  <Splide>...</Splide>
</SliderSection>
```

---

## Accessibility (Good Practices)

### ✅ Already doing well:

- ARIA labels on buttons: `aria-label="Menu"`
- ARIA expanded: `aria-expanded={isMenuOpen}`
- Semantic HTML: `<header>`, `<nav>`, `<main>`
- Role attributes: `role="button"` on clickable divs
- Status announcements: `role="status" aria-live="polite"`

### Consider adding:

- `aria-current="page"` to active nav links
- Alt text for all images (mostly there)
- Focus management when modal/menu opens (ProfileClient does this well!)

---

## TypeScript Best Practices

### Good:

```tsx
interface CardProps extends Event { ... }  // ✅ Clear interface
const [state, setState] = useState<Type>(initial);  // ✅ Typed
const data = await response.json() as Type;  // ✅ Type assertion
```

### Avoid:

```tsx
const data: any = await response.json();  // ❌ No type safety
export default function Page(props) { ... }  // ❌ No prop types
```

**Action**: Use the Button component as reference for prop typing.

---

## Next.js App Router Best Practices

### Layout Nesting

- Root `layout.tsx` wraps everything
- Use `layout.tsx` in subdirectories for shared structure
- Example: `/app/auth/layout.tsx` for auth pages

### Dynamic Routes

```tsx
// /app/evenements/[id]/page.tsx
type Params = { params: Promise<{ id: string }> }; // ✅ Next.js 15+

export default async function Page({ params }: Params) {
  const { id } = await params; // Async params!
  // ...
}
```

**Note**: Some routes may not be using async params yet. Update when you touch them.

---

## Common Refactoring Opportunities

### 1. Extract Fetch Functions (Low Priority)

- Move fetch logic to `/lib/api.ts`
- Example: `getEvents()`, `fetchProfile()`
- Reduces code duplication

### 2. Consolidate Slider Options (Medium Priority)

- Extract `cardSliderOptions` to constant
- Use in: DynamicHome.tsx, ProfileClient.tsx, EventsList.tsx

### 3. Component Extraction (Low Priority)

- Extract `CardFeatured` variant to separate component
- Keep code cleaner, easier to maintain

### 4. Error Boundary (Medium Priority)

- Wrap major sections in error boundary
- Prevents full page crash on error
- Example: Wrap ProfileClient in boundary

---

## File Structure Best Practices

### Components Should Include:

```
ComponentName/
  ├── ComponentName.tsx       # Main component
  ├── ComponentName.module.scss # Styles
  ├── ComponentName.stories.tsx # Storybook (if exists)
  └── index.ts               # Export (optional but useful)
```

### Current state: ✅ Mostly good

- Some components missing index.ts (not required but helpful)
- Stories exist for some components (great for documentation!)

---

## Testing Notes

### Unit Tests

- Located in `__tests__/components/` and `__tests__/lib/`
- Use Vitest + React Testing Library
- Example needed for components

### Storybook

- Already set up: `npm run storybook`
- Use for component documentation
- Add stories for new components

---

## Performance Considerations

### Current state: ✅ Good

- Server components where possible (pages)
- Client components only when needed (forms, state)
- Image optimization with `next/image`
- Caching on server fetches

### Consider:

- Lazy load components if page gets heavy
- Memoize expensive computations (already using `useMemo` in ProfileClient)
- Consider image lazy loading for games carousel

---

## Checklist for New Components

Use this when building new components:

- [ ] **Types**: Define `interface ComponentProps` with all props
- [ ] **"use client"**: Add if using state/effects/context
- [ ] **Styling**: Use SCSS modules, BEM naming
- [ ] **Accessibility**: ARIA labels, semantic HTML, keyboard nav
- [ ] **Error handling**: Show errors, loading states
- [ ] **Comments**: Explain why, not what (code is clear)
- [ ] **Stories**: Add to Storybook if reusable
- [ ] **Tests**: Unit test if complex logic

---

## Current Code Quality Summary

| Aspect            | Status   | Notes                                 |
| ----------------- | -------- | ------------------------------------- |
| **Structure**     | ✅ Good  | Clear folder organization             |
| **Typing**        | ✅ Good  | TypeScript used throughout            |
| **Components**    | ✅ OK    | Some complex, mostly reusable         |
| **State**         | ⚠️ Mixed | Works, could group better             |
| **Errors**        | ✅ Good  | Handling feedback well                |
| **Accessibility** | ✅ Good  | ARIA labels, semantic HTML            |
| **Consistency**   | ⚠️ Fair  | Naming/patterns slightly inconsistent |
| **Testing**       | ❓ ?     | Not explored in depth                 |

**Overall**: **Solid working code!** Focus on consistency improvements, not rewrites.

---

## Recommended Priority Actions

### Week 1 - Quick Wins (1-2 hours)

1. Fix EventList casing
2. Create `/lib/constants.ts` for slider options
3. Create `/types/splide.ts` for SplideController type

### Week 2 - Medium Effort (4-6 hours)

1. Extract SliderSection component
2. Add error handling to data fetching patterns
3. Update async param types in all routes

### Week 3+ - Optional Improvements

1. Extract fetch functions to `/lib/api.ts`
2. State refactoring in ProfileClient (when touching it)
3. Add more Storybook stories

---

## Questions for Your Team

Before standardizing further, clarify:

1. **Splide carousel**: Is it the best solution? Any issues?
2. **CSS Modules**: Happy with SCSS modules or prefer CSS-in-JS?
3. **Form library**: Should forms use React Hook Form everywhere?
4. **Error boundaries**: Should we add error boundaries globally?
5. **Testing**: What's the coverage goal?

---

**Last Updated**: 2026-04-10  
**Next Review**: After implementing quick wins
