# Foundation Restructure

## Context

Spending Tracker is a mobile-first, multi-user personal finance app built to mimic
a real production codebase, and doubles as a learning project — the goal is to
understand *why* an app is structured the way it is, not just to have working code.

Stack: Next.js App Router, Supabase (auth + DB, decided but not yet wired up).

Product intent: this is meant to be daily-driven on a phone, not just viewed in a
desktop browser during development — the author intends to use it themselves as
a real user would, and is keeping open the possibility of eventually shipping it
for others to install on their phones. This reinforces the mobile-first framing
(Sidebar for desktop, MobileNav for phone) and means real-device testing matters
more than it would for a purely desktop/internal tool; it doesn't change this
sub-project's scope, but should inform later decisions (e.g. PWA manifest/install
behavior, touch target sizing, offline considerations) when they come up.

This is sub-project 1 of 3:
1. **Foundation restructure** (this spec) — route groups, fix existing bugs, decide
   the purpose of placeholder folders.
2. Supabase auth wiring — packages, client/server helpers, middleware, real
   login/signup logic, route protection. Not started.
3. Data layer / transactions feature — real DB schema, replacing mock data.
   Not started.

## Problem

Two bugs existed before this restructure:
- `app/page.tsx` (an empty `Home` component) and `app/(dashboard)/page.tsx` both
  resolved to `/`, since route groups don't add a URL segment — a routing
  conflict Next.js errors on.
- `app/(dashboard)/page.tsx` referenced `mockBalancedata` from `interfaces/mock.ts`
  without importing it.

Additionally, `context/` and `layouts/` existed as empty folders with no
documented purpose, left over from initial scaffolding.

## Design

### Folder structure

```
app/
  (auth)/
    layout.tsx        # centered card, no sidebar/nav
    login/page.tsx
    signup/page.tsx
  (dashboard)/
    layout.tsx         # existing AppShell wrapper — unchanged
    page.tsx            # existing dashboard — import bug fixed
  layout.tsx             # root layout — unchanged
components/
  layout/                 # existing Sidebar/MobileNav/AppShell — unchanged
lib/
  nav-config.ts            # unchanged
interfaces/
  mock.ts                   # unchanged
```

### Resolving the `/` conflict

`app/page.tsx` is deleted. The dashboard becomes what renders at `/` — this is
correct for a "log in to see your personalized data" app. Once sub-project 2
adds auth, an unauthenticated visit to `/` will redirect to `/login`; that
redirect logic is explicitly out of scope here.

### `context/` and `layouts/`

Removed for now rather than kept as empty scaffolding:
- `context/` was intended for React Context providers — recreate when a
  concrete provider is needed (e.g. an auth session context in sub-project 2).
- `layouts/` was intended for shared layout components — recreate when a
  layout piece doesn't fit naturally under `app/*/layout.tsx` or
  `components/layout/`.

### Testing

No test framework is set up yet. Verification for this sub-project is manual:
`npm run dev`, confirm `/` renders the dashboard with no console errors, and
`/login` / `/signup` render (even if just placeholder content).

## Out of scope

- Any real Supabase wiring (client helpers, middleware, session handling).
- Real login/signup form logic — the auth pages are placeholders only.
- Redirecting unauthenticated users away from `(dashboard)`.
