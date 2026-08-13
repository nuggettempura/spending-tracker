# Supabase Auth Wiring

## Context

Sub-project 2 of 3 (see [2026-08-12-foundation-restructure-design.md](2026-08-12-foundation-restructure-design.md)
for sub-project 1 and the overall product framing). This sub-project wires the
`(auth)` route group's placeholder login/signup pages up to real Supabase
authentication, with session-based route protection.

This is a retrospective spec, written after implementation rather than before —
the work happened as a live pair-programming session rather than a planned
build, so this documents what was actually built and why, for future reference.

## What was built

**Packages**: `@supabase/supabase-js`, `@supabase/ssr`.

**Two Supabase clients**, because browser and server code read/write session
cookies through different APIs:
- `lib/supabase/client.ts` — `createBrowserClient`, for Client Components.
- `lib/supabase/server.ts` — `createServerClient`, for Server Components/Actions,
  using `next/headers` `cookies()`. Cookie adapter must implement `getAll`/`setAll`
  (not the deprecated `get`/`set`) — using the wrong names fails silently rather
  than erroring, causing hard-to-debug session issues.

**Auth Server Actions** (`lib/actions/auth.ts`, `'use server'`):
- `login(prevState, formData)` — `signInWithPassword`, returns `{ error }` or
  redirects to `/`.
- `signUp(prevState, formData)` — validates `password === passwordCheck`
  server-side, calls `signUp` with `options.data.display_name` (metadata key
  must match what the DB trigger reads — see Data layer below), same
  error/redirect pattern.
- `logout()` — `await`s `signOut()` (unawaited would race the redirect and
  potentially ship the old session cookie to the browser unchanged — a real
  security bug, not just a timing nitpick), redirects to `/login`.

**Forms** (`login/page.tsx`, `signup/page.tsx`): refactored from client-side
`useState` + `onClick` to `useActionState` + native `<form action={...}>`,
matching both Next.js's own authentication guide and Supabase's official
Next.js quickstart, which both lead with Server Actions over client-side calls.

**Route protection** (`proxy.ts` at the project root): this Next.js version
renamed `middleware.ts` to `proxy.ts` (functionality unchanged) — confirmed via
`node_modules/next/dist/docs` rather than assumed, per this project's
`AGENTS.md` warning about breaking changes from training data. Logic lives in
`lib/supabase/proxy.ts`'s `updateSession()`:
- Refreshes the session via `supabase.auth.getUser()` — not `getSession()`,
  because `getUser()` revalidates the token against Supabase's Auth server
  rather than trusting the cookie at face value, which matters since Proxy runs
  on every request.
- Redirects unauthenticated visitors away from anything except `/login`/`/signup`;
  redirects authenticated visitors away from `/login`/`/signup` to `/`.
- Matcher excludes `_next/static`, `_next/image`, `favicon.ico`, and common
  image extensions, so Proxy isn't spending a session check on static assets.

**Logout button**: added to both `Sidebar.tsx` and `MobileNav.tsx`, a small
`<form action={logout}>` wrapping a submit button.

## Data layer touched (minimally)

The user separately designed a fuller schema (`profiles`, `bank_accounts`,
`categories`, `transactions`, RLS policies, balance-update triggers) — that
schema belongs to sub-project 3 and wasn't reviewed in depth here. The one
piece this sub-project depends on is the `handle_new_user()` trigger on
`auth.users`, which auto-creates a `profiles` row via `security definer` (runs
with the function owner's privileges, bypassing the `auth.uid() = id` RLS check
that would otherwise fail since no session exists yet during signup). The
trigger reads `raw_user_meta_data->>'display_name'` (snake_case), so `signUp`
must send that exact key in `options.data` — a camelCase/snake_case mismatch
here fails silently (the row is still created, just with a null name).

## Bugs hit and fixed along the way

Worth keeping as a record since some of these are non-obvious:
- Cookie adapter methods named `get`/`set` instead of `getAll`/`setAll`.
- Browser client (`document.cookie`-based) imported into a Server Action by
  mistake, once both `client.ts` and `server.ts` used the same `createClient`
  name.
- `redirect()` from `next/navigation` used inside Proxy — that function only
  works inside the React rendering pipeline (Server Components/Actions), not
  Proxy, which must use `NextResponse.redirect()` instead.
- Redirect logic in Proxy that checked `user`/`!user` but never
  `request.nextUrl.pathname`, so it couldn't distinguish "on a public route" —
  which also meant `redirect()`'s misuse above got masked because the missing
  pathname check meant it never really got the right inputs to test.
- `logout()` calling `signOut()` without `await`, letting `redirect()` fire
  before the session cookie was actually cleared.
- `NEXT_PUBLIC_SUPABASE_URL` set to the REST endpoint
  (`.../rest/v1/`) instead of the bare project origin — the Supabase client
  builds `/auth/v1`, `/rest/v1`, etc. itself from one shared base, so a
  pre-built path baked into the base breaks that resolution. Traced by reading
  the actual `new URL('auth/v1', base)` construction in the installed
  `@supabase/supabase-js` package rather than guessing.

## Out of scope

- The `bank_accounts`/`categories`/`transactions` schema and its balance
  triggers — sub-project 3.
- Password reset, email verification/confirmation flows, rate limiting.
- Any UI beyond functional placeholder styling.
