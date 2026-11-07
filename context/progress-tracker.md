# Progress Tracker

Update this file after every meaningful implementation
change.

## Current Phase

- In progress

## Current Goal

- Auth (`03-auth.md`) is complete: Clerk wired into the app, route protection, and the editor navbar's `UserButton`. Next unit: replace the `/editor` placeholder canvas with the real collaboration canvas, and build the real dialogs the Dialog Pattern section anticipates (per `ai-workflow-rules.md`, pick the next unit from `project-overview.md` scope).

## Completed

- `context/feature-specs/01-design-system.md`: shadcn/ui installed (`components.json`, style `base-nova`) with Button, Card, Dialog, Input, Tabs, Textarea, ScrollArea added to `components/ui/`. `lucide-react` installed. `lib/utils.ts` exports `cn()` (re-exported from the `cn` package, shadcn's current default). Verified: `tsc --noEmit` and `npm run build` pass; all 7 components render together without import errors (smoke-tested in `app/page.tsx`, then reverted).
- `context/feature-specs/02-editor.md` (navbar + sidebar only): `components/editor/editor-navbar.tsx` — fixed-height top navbar with left/center/right sections, left section holds a sidebar-toggle `Button` swapping `PanelLeftOpen`/`PanelLeftClose` based on an `isSidebarOpen` prop, `bg-card` with `border-b border-border`. `components/editor/project-sidebar.tsx` — `isOpen`/`onClose` props, absolutely positioned over the canvas area (`absolute inset-y-0 left-0`, translate-x transition, does not reflow siblings), header with "Projects" title + close button, shadcn `Tabs` (My Projects / Shared) each with an empty placeholder string, full-width `New Project` button with `Plus` icon pinned to the bottom. Both use only mapped semantic tokens (`bg-card`, `bg-popover`, `border-border`, `text-foreground`, `text-muted-foreground`) — no raw hex or Tailwind color classes. Dialog Pattern section of the spec is documentation-only ("do not build actual dialogs yet") — no dialog component added.
- Editor chrome wired into a real route: `components/editor/editor-shell.tsx` (client) owns `isSidebarOpen` state and composes `EditorNavbar` + `ProjectSidebar` around `children`. `app/editor/layout.tsx` (server component, `LayoutProps<"/editor">`) renders `EditorShell`; `app/editor/page.tsx` is a placeholder "Canvas" panel until the real canvas feature is specced. Verified: `tsc --noEmit` and `npm run build` pass (route `/editor` appears in the build output); dev server + Playwright screenshots at `/editor` confirm dark theme, toggle swaps icons, sidebar overlays the canvas without reflow, no console errors.

- `context/feature-specs/03-auth.md`: Clerk (`@clerk/nextjs` 7.9.23, current/Core 3 SDK) wired in. `app/layout.tsx` wraps the root in `ClerkProvider` using `@clerk/ui`'s `dark` theme, with `variables` overridden to the app's existing CSS custom properties (`var(--accent-primary)`, `var(--bg-surface)`, etc.) — no hardcoded colors. `proxy.ts` at the project root (this Next.js version renamed `middleware.ts` to `proxy.ts`) holds a bare-ish `clerkMiddleware()` that reads `isAuthenticated` from `await auth()` and redirects non-public-route requests to sign-in; public routes come from the existing `NEXT_PUBLIC_CLERK_SIGN_IN_URL`/`NEXT_PUBLIC_CLERK_SIGN_UP_URL` env vars (added to `.env.local`, previously unset — values `/sign-in` and `/sign-up`). `createRouteMatcher` was deliberately not used since the installed SDK deprecates it in favor of per-route `auth.protect()`; each protected page/route still calls `auth.protect()` itself (e.g. `app/editor/page.tsx`) per the SDK's own guidance, with the proxy redirect as a latency optimization layered on top to satisfy the spec's "protect everything else by default" requirement. `app/sign-in/[[...sign-in]]/page.tsx` and `app/sign-up/[[...sign-up]]/page.tsx` render Clerk's `<SignIn />`/`<SignUp />` (each in `<Suspense>`, required because `cacheComponents: true` is set in `next.config.ts`) inside `components/auth/auth-layout.tsx` — a two-panel layout (logo/tagline/text feature list left, centered form right on large screens; form-only below `lg`). `app/page.tsx` is now an async Server Component that redirects authenticated users to `/editor` and everyone else to `/sign-in`. `components/editor/editor-navbar.tsx`'s right section now renders Clerk's `<UserButton />`. Installed new dependency `@clerk/ui`. Verified: `tsc --noEmit` and `npm run build` pass; dev server + headless-Chromium screenshot of `/sign-in` confirms the dark theme and CSS-variable-driven Clerk styling (cyan accent button, dark card) render correctly; `curl` against `/`, `/editor`, and `/sign-in` while signed out confirms the 307 redirects to `/sign-in` and the public route's 200.

## In Progress

- None yet.

## Next Up

- Build the actual dialogs described by the Dialog Pattern section of `02-editor.md` once a concrete dialog use case is specced.
- Replace `app/editor/page.tsx`'s placeholder with the real collaboration canvas (Liveblocks + React Flow, per `project-overview.md`).
- Decide whether to migrate the proxy's manual public-route check onto Clerk's `createRouteMatcher` successor pattern if/when the SDK's recommended replacement stabilizes (currently deprecated with no 1:1 replacement for "protect everything except N public routes" at the middleware layer).

## Open Questions

- `02-editor.md` didn't specify where the editor chrome mounts or what the navbar's center/right sections eventually hold. Resolved the mount point pragmatically as `app/editor/{layout,page}.tsx`; center/right sections remain empty per spec. Revisit naming/route structure if a routing spec supersedes this.

## Architecture Decisions

- The installed shadcn/ui CLI (v4.23) is newer than common training-data knowledge: it scaffolds against `@base-ui/react` (not Radix), ships its own `cn` package (`lib/utils.ts` is `export { cn } from "cn"`, not a local clsx/tailwind-merge implementation), and installs `lucide-react` automatically. Use the actual installed component source in `components/ui/` as ground truth over prior shadcn conventions.
- `app/globals.css` now defines the project's raw design tokens from `ui-context.md` (`--bg-base`, `--text-primary`, `--accent-primary`, etc.) as the source of truth in `:root`, and maps shadcn's semantic tokens (`--background`, `--card`, `--primary`, ...) onto them. The app is dark-only: `:root` and `.dark` hold identical values, and `<html>` carries a permanent `dark` class (`app/layout.tsx`) so `dark:` variants in generated components always resolve.

- This installed Next.js (16.4.3) renamed `middleware.ts` to `proxy.ts` (same API, new filename/export convention); `middleware.ts` is deprecated. Verify at `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/proxy.md` before reintroducing a `middleware.ts`.
- The installed `@clerk/nextjs` (7.9.23) is the "current"/Core 3 SDK generation, not Core 2: `createRouteMatcher` is deprecated (route protection should live in `auth.protect()` calls per-page/handler instead), `auth()` returns `isAuthenticated`/`sessionStatus` in addition to `userId`, and `cacheComponents: true` (set in `next.config.ts`) requires any `auth()`/`currentUser()` read, and any `<SignIn />`/`<SignUp />`/`<UserButton />` usage, to sit inside `<Suspense>` or a route `loading.tsx` or `next build` fails with "uncached or runtime data during prerendering".

## Session Notes

- Design system foundation (`context/feature-specs/01-design-system.md`) is implemented: shadcn/ui, lucide-react, `lib/utils.ts`, and theme tokens in `globals.css`. `components/ui/*` is untouched per the protected-files rule. Next session can build app-level components on top of these primitives.
