---
title: Documentation Index
description: Guide to all documentation files
---

# Documentation Index

**Welcome to the My Digital League documentation!**

This index helps you find the right document for your needs.

---

## 🚀 Where to Start

### I'm a student developer

→ Read **[FRONTEND_GUIDE.md](FRONTEND_GUIDE.md)** (30 min)

- Copy-paste ready component patterns
- How to build pages with data fetching
- Common patterns to follow

Then reference **[FRONTEND_ARCHITECTURE.md](FRONTEND_ARCHITECTURE.md)** when needed.

### I'm the backend teacher

→ Read **[BACKEND_GUIDE.md](BACKEND_GUIDE.md)** (quick skim)

- This documents your own code - should be familiar
- Share patterns with API consumers
- Use as reference when reviewing student code

### I'm a project manager / Team lead

→ Read **[AUDIT_SUMMARY.md](AUDIT_SUMMARY.md)** (10 min)

- Project health assessment
- What's working, what needs improvement
- Prioritized recommendations

### I'm taking over this project

→ Read in order:

1. **[AUDIT_SUMMARY.md](AUDIT_SUMMARY.md)** (10 min) — Overview
2. **[BACKEND_GUIDE.md](BACKEND_GUIDE.md)** (15 min) — How API works
3. **[FRONTEND_GUIDE.md](FRONTEND_GUIDE.md)** (30 min) — How to build
4. **[TECH_STACK.md](TECH_STACK.md)** (5 min) — Libraries used

---

## 📚 All Documents

### Overview & Strategy

| Document                             | Purpose                         | Read Time | For      |
| ------------------------------------ | ------------------------------- | --------- | -------- |
| [AUDIT_SUMMARY.md](AUDIT_SUMMARY.md) | Project health, recommendations | 10 min    | Everyone |
| [INDEX.md](INDEX.md)                 | This file!                      | 2 min     | Everyone |

### Backend Development

| Document                                           | Purpose                    | Read Time | For                |
| -------------------------------------------------- | -------------------------- | --------- | ------------------ |
| [BACKEND_GUIDE.md](BACKEND_GUIDE.md)               | How to build API endpoints | 15 min    | Backend devs       |
| [BACKEND_ARCHITECTURE.md](BACKEND_ARCHITECTURE.md) | Endpoints, auth, patterns  | 10 min    | API consumers      |
| [DATABASE_SCHEMA.md](DATABASE_SCHEMA.md)           | All Prisma models          | 10 min    | Anyone touching DB |
| [authentication.md](authentication.md)             | Auth flow details          | 10 min    | Auth feature work  |

### Frontend Development

| Document                                             | Purpose                            | Read Time | For               |
| ---------------------------------------------------- | ---------------------------------- | --------- | ----------------- |
| [FRONTEND_GUIDE.md](FRONTEND_GUIDE.md)               | **START HERE** - How to build      | 30 min    | Frontend devs     |
| [FRONTEND_ARCHITECTURE.md](FRONTEND_ARCHITECTURE.md) | Component patterns, standards      | 15 min    | Code reviews      |
| [FRONTEND_QUICK_WINS.md](FRONTEND_QUICK_WINS.md)     | Refactoring tasks (priority order) | 20 min    | Optimization work |

### General

| Document                       | Purpose             | Read Time | For            |
| ------------------------------ | ------------------- | --------- | -------------- |
| [TECH_STACK.md](TECH_STACK.md) | Dependencies, setup | 5 min     | New to project |

---

## 🎯 Find a Document by Task

### "I'm building a new component"

→ **[FRONTEND_GUIDE.md](FRONTEND_GUIDE.md)** - "Creating a New Component" section

### "I'm creating a new page"

→ **[FRONTEND_GUIDE.md](FRONTEND_GUIDE.md)** - "Creating a New Page" section

### "I'm building a form"

→ **[FRONTEND_GUIDE.md](FRONTEND_GUIDE.md)** - "Handling Form Input" pattern

### "I need to fetch data from API"

→ **[BACKEND_ARCHITECTURE.md](BACKEND_ARCHITECTURE.md)** for endpoints  
→ **[FRONTEND_GUIDE.md](FRONTEND_GUIDE.md)** for fetching pattern

### "I'm adding a new API endpoint"

→ **[BACKEND_GUIDE.md](BACKEND_GUIDE.md)** - "Adding a New API Endpoint" section

### "I need to understand the database"

→ **[DATABASE_SCHEMA.md](DATABASE_SCHEMA.md)**

### "I'm reviewing code"

→ **[FRONTEND_ARCHITECTURE.md](FRONTEND_ARCHITECTURE.md)** - "Checklist for New Components"  
→ **[BACKEND_ARCHITECTURE.md](BACKEND_ARCHITECTURE.md)** for API review

### "I found a bug or inconsistency"

→ **[FRONTEND_QUICK_WINS.md](FRONTEND_QUICK_WINS.md)** - Check if it's listed  
→ **[AUDIT_SUMMARY.md](AUDIT_SUMMARY.md)** - Known issues section

### "I want to improve the codebase"

→ **[FRONTEND_QUICK_WINS.md](FRONTEND_QUICK_WINS.md)** - Prioritized improvement tasks

### "I'm deploying to production"

→ **[AUDIT_SUMMARY.md](AUDIT_SUMMARY.md)** - "Deployment Readiness" section  
→ **[TECH_STACK.md](TECH_STACK.md)** - Environment variables

### "I'm onboarding a new team member"

→ This INDEX.md  
→ **[AUDIT_SUMMARY.md](AUDIT_SUMMARY.md)** (overview)  
→ Then FRONTEND_GUIDE.md or BACKEND_GUIDE.md depending on role

---

## 📊 Document Organization

```
/docs/
├── INDEX.md                          ← You are here!
├── AUDIT_SUMMARY.md                  ← Start here
│
├── Backend/
│   ├── BACKEND_GUIDE.md              ← How to build API
│   ├── BACKEND_ARCHITECTURE.md       ← Endpoints & patterns
│   ├── DATABASE_SCHEMA.md            ← All models
│   └── authentication.md             ← Auth details
│
├── Frontend/
│   ├── FRONTEND_GUIDE.md             ← **START HERE**
│   ├── FRONTEND_ARCHITECTURE.md      ← Standards & patterns
│   └── FRONTEND_QUICK_WINS.md        ← Refactoring tasks
│
└── General/
    ├── TECH_STACK.md                 ← Dependencies & config
    └── (Original docs)
```

---

## 💡 Quick Reference Cards

### Frontend Component Checklist

```
✅ Create interface ComponentProps
✅ Add "use client" if using state
✅ Use SCSS modules for styles
✅ Add ARIA labels for a11y
✅ Handle loading/error states
✅ Add Storybook story (optional)
```

→ See [FRONTEND_GUIDE.md](FRONTEND_GUIDE.md)

### Backend API Endpoint Checklist

```
✅ Define Context type for params
✅ GET endpoint (usually public)
✅ POST endpoint with auth() wrapper
✅ Check isOrga for permission
✅ Validate required fields
✅ Return proper HTTP codes
✅ Use French error messages
```

→ See [BACKEND_GUIDE.md](BACKEND_GUIDE.md)

### Form Handling Checklist

```
✅ Use useState for form values
✅ Validate with Zod schemas
✅ Handle submission with try/catch
✅ Show field-level errors
✅ Show submit-level errors
✅ Disable button while submitting
✅ Clear errors on user input
```

→ See [FRONTEND_GUIDE.md](FRONTEND_GUIDE.md) - "Handling Form Input"

---

## 🎓 Learning Path

### Week 1: Foundations

1. [AUDIT_SUMMARY.md](AUDIT_SUMMARY.md) (10 min)
2. [TECH_STACK.md](TECH_STACK.md) (5 min)
3. [BACKEND_ARCHITECTURE.md](BACKEND_ARCHITECTURE.md) (10 min)
4. [FRONTEND_GUIDE.md](FRONTEND_GUIDE.md) (30 min)

### Week 2: Deep Dive

1. [FRONTEND_ARCHITECTURE.md](FRONTEND_ARCHITECTURE.md) (15 min)
2. [BACKEND_GUIDE.md](BACKEND_GUIDE.md) (15 min)
3. [DATABASE_SCHEMA.md](DATABASE_SCHEMA.md) (10 min)

### Week 3: Advanced

1. [FRONTEND_QUICK_WINS.md](FRONTEND_QUICK_WINS.md) (20 min)
2. [authentication.md](authentication.md) (10 min)
3. Practice building components/endpoints

### Ongoing

- Reference specific sections as needed
- Review [AUDIT_SUMMARY.md](AUDIT_SUMMARY.md) monthly

---

## 🔍 Search Guide

Looking for something specific? Use these keywords:

### Components

- "Button" → [FRONTEND_GUIDE.md](FRONTEND_GUIDE.md)
- "Card" → [FRONTEND_ARCHITECTURE.md](FRONTEND_ARCHITECTURE.md)
- "Form" → [FRONTEND_GUIDE.md](FRONTEND_GUIDE.md)
- "Carousel" → [FRONTEND_GUIDE.md](FRONTEND_GUIDE.md) patterns

### Pages

- "Page" → [FRONTEND_GUIDE.md](FRONTEND_GUIDE.md)
- "Server Component" → [FRONTEND_GUIDE.md](FRONTEND_GUIDE.md)
- "Client Component" → [FRONTEND_GUIDE.md](FRONTEND_GUIDE.md)

### API

- "Endpoint" → [BACKEND_GUIDE.md](BACKEND_GUIDE.md) or [BACKEND_ARCHITECTURE.md](BACKEND_ARCHITECTURE.md)
- "Auth" → [BACKEND_ARCHITECTURE.md](BACKEND_ARCHITECTURE.md) or [authentication.md](authentication.md)
- "Error" → [BACKEND_ARCHITECTURE.md](BACKEND_ARCHITECTURE.md) - "Error Handling"

### Database

- "Model" → [DATABASE_SCHEMA.md](DATABASE_SCHEMA.md)
- "Relationship" → [DATABASE_SCHEMA.md](DATABASE_SCHEMA.md)
- "User" → [DATABASE_SCHEMA.md](DATABASE_SCHEMA.md)

### Best Practices

- "Pattern" → [FRONTEND_GUIDE.md](FRONTEND_GUIDE.md)
- "Convention" → [FRONTEND_ARCHITECTURE.md](FRONTEND_ARCHITECTURE.md)
- "Quality" → [AUDIT_SUMMARY.md](AUDIT_SUMMARY.md)

---

## 📞 Common Questions

**Q: Where do I start?**  
A: Read [AUDIT_SUMMARY.md](AUDIT_SUMMARY.md) first (10 min), then your role-specific guide.

**Q: How do I build a new component?**  
A: [FRONTEND_GUIDE.md](FRONTEND_GUIDE.md) - "Creating a New Component"

**Q: What API endpoints exist?**  
A: [BACKEND_ARCHITECTURE.md](BACKEND_ARCHITECTURE.md) or [BACKEND_GUIDE.md](BACKEND_GUIDE.md)

**Q: What's the database structure?**  
A: [DATABASE_SCHEMA.md](DATABASE_SCHEMA.md)

**Q: What refactoring should I do?**  
A: [FRONTEND_QUICK_WINS.md](FRONTEND_QUICK_WINS.md) - Prioritized by effort

**Q: How is the codebase health?**  
A: [AUDIT_SUMMARY.md](AUDIT_SUMMARY.md) - Detailed assessment

**Q: What's the tech stack?**  
A: [TECH_STACK.md](TECH_STACK.md)

---

## 🚨 Critical Documents

If you have **5 minutes**, read these:

- [AUDIT_SUMMARY.md](AUDIT_SUMMARY.md) - Project health
- README.md - Project overview

If you have **15 minutes**, also read:

- [BACKEND_ARCHITECTURE.md](BACKEND_ARCHITECTURE.md) - API overview
- [FRONTEND_GUIDE.md](FRONTEND_GUIDE.md) - How to build

---

## 📝 How to Update Documentation

### When to update docs

- ✅ Adding a new pattern → Add to appropriate guide
- ✅ Changing architecture → Update ARCHITECTURE files
- ✅ Fixing a bug → Add to AUDIT_SUMMARY.md if systemic
- ✅ Completing refactoring → Update QUICK_WINS status

### Where to update

1. Find the relevant document (use this INDEX)
2. Make your change
3. Update the date at bottom: "Last Updated: YYYY-MM-DD"

### Example

```md
✏️ Updated FRONTEND_GUIDE.md

- Added "Lazy Loading" pattern section
- Last Updated: 2026-04-15
```

---

## 🎯 Key Files Quick Access

| What                | File                     | Section                   |
| ------------------- | ------------------------ | ------------------------- |
| Setup project       | README.md                | Installation              |
| Build component     | FRONTEND_GUIDE.md        | Creating a New Component  |
| Build page          | FRONTEND_GUIDE.md        | Creating a New Page       |
| Add API endpoint    | BACKEND_GUIDE.md         | Adding a New API Endpoint |
| Understand auth     | authentication.md        | Full file                 |
| See all APIs        | BACKEND_ARCHITECTURE.md  | API Endpoints             |
| Understand database | DATABASE_SCHEMA.md       | Full file                 |
| Code review         | FRONTEND_ARCHITECTURE.md | Checklist                 |
| Project status      | AUDIT_SUMMARY.md         | Overall Summary           |
| Tasks to do         | FRONTEND_QUICK_WINS.md   | Priority sections         |

---

## ✅ Documentation Completeness

| Topic       | Coverage            | Priority      |
| ----------- | ------------------- | ------------- |
| Frontend    | ⭐⭐⭐⭐⭐ Complete | 🔴 Read first |
| Backend     | ⭐⭐⭐⭐⭐ Complete | 🟡 Reference  |
| Database    | ⭐⭐⭐⭐⭐ Complete | 🟡 Reference  |
| Testing     | ⭐⭐⭐ Partial      | 🟢 Later      |
| Deployment  | ⭐⭐⭐ Partial      | 🟢 Later      |
| Performance | ⭐⭐ Minimal        | 🟢 Later      |

---

## 🤝 Contributing to Docs

**Guidelines**:

- Keep language clear and simple
- Use examples whenever possible
- Include "why" not just "how"
- Update the date when you change something
- Link to related documents

**Process**:

1. Make your changes
2. Run `npm run prettier` to format
3. Commit with message: "docs: <description>"

---

## 📅 Documentation Timeline

- **2026-04-10**: Initial comprehensive audit and documentation
- **2026-04-15**: Quick Wins implementation (expected)
- **2026-05-10**: Review and update (recommended)
- **Monthly**: Keep current as project evolves

---

## 🎓 Learning Resources

Beyond this documentation:

- **Next.js**: https://nextjs.org/docs
- **React**: https://react.dev
- **Prisma**: https://www.prisma.io/docs
- **TypeScript**: https://www.typescriptlang.org/docs/
- **Zod**: https://zod.dev

---

## 📞 Need Help?

1. **Check this INDEX.md** - Find the right document
2. **Search the document** - Use Ctrl+F or Cmd+F
3. **Read related sections** - Links at bottom of each doc
4. **Ask on team chat** - Ask with document reference

---

**Last Updated**: 2026-04-10  
**Version**: 1.0  
**Status**: ✅ Complete

---

Welcome to the project! 🚀 Use this INDEX to find what you need.
