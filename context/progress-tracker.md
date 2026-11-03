# Progress Tracker

Update this file after every meaningful implementation
change.

## Current Phase

- In progress

## Current Goal

- Editor chrome shell (`02-editor.md`) is complete and mounted at `/editor`. Next unit: replace the `/editor` placeholder canvas with the real collaboration canvas, and build the real dialogs the Dialog Pattern section anticipates (per `ai-workflow-rules.md`, pick the next unit from `project-overview.md` scope).

## Completed

- `context/feature-specs/01-design-system.md`: shadcn/ui installed (`components.json`, style `base-nova`) with Button, Card, Dialog, Input, Tabs, Textarea, ScrollArea added to `components/ui/`. `lucide-react` installed. `lib/utils.ts` exports `cn()` (re-exported from the `cn` package, shadcn's current default). Verified: `tsc --noEmit` and `npm run build` pass; all 7 components render together without import errors (smoke-tested in `app/page.tsx`, then reverted).
- `context/feature-specs/02-editor.md` (navbar + sidebar only): `components/editor/editor-navbar.tsx` — fixed-height top navbar with left/center/right sections, left section holds a sidebar-toggle `Button` swapping `PanelLeftOpen`/`PanelLeftClose` based on an `isSidebarOpen` prop, `bg-card` with `border-b border-border`. `components/editor/project-sidebar.tsx` — `isOpen`/`onClose` props, absolutely positioned over the canvas area (`absolute inset-y-0 left-0`, translate-x transition, does not reflow siblings), header with "Projects" title + close button, shadcn `Tabs` (My Projects / Shared) each with an empty placeholder string, full-width `New Project` button with `Plus` icon pinned to the bottom. Both use only mapped semantic tokens (`bg-card`, `bg-popover`, `border-border`, `text-foreground`, `text-muted-foreground`) — no raw hex or Tailwind color classes. Dialog Pattern section of the spec is documentation-only ("do not build actual dialogs yet") — no dialog component added.
- Editor chrome wired into a real route: `components/editor/editor-shell.tsx` (client) owns `isSidebarOpen` state and composes `EditorNavbar` + `ProjectSidebar` around `children`. `app/editor/layout.tsx` (server component, `LayoutProps<"/editor">`) renders `EditorShell`; `app/editor/page.tsx` is a placeholder "Canvas" panel until the real canvas feature is specced. Verified: `tsc --noEmit` and `npm run build` pass (route `/editor` appears in the build output); dev server + Playwright screenshots at `/editor` confirm dark theme, toggle swaps icons, sidebar overlays the canvas without reflow, no console errors.

## In Progress

- None yet.

## Next Up

- Build the actual dialogs described by the Dialog Pattern section of `02-editor.md` once a concrete dialog use case is specced.
- Replace `app/editor/page.tsx`'s placeholder with the real collaboration canvas (Liveblocks + React Flow, per `project-overview.md`).

## Open Questions

- `02-editor.md` didn't specify where the editor chrome mounts or what the navbar's center/right sections eventually hold. Resolved the mount point pragmatically as `app/editor/{layout,page}.tsx`; center/right sections remain empty per spec. Revisit naming/route structure if a routing spec supersedes this.

## Architecture Decisions

- The installed shadcn/ui CLI (v4.23) is newer than common training-data knowledge: it scaffolds against `@base-ui/react` (not Radix), ships its own `cn` package (`lib/utils.ts` is `export { cn } from "cn"`, not a local clsx/tailwind-merge implementation), and installs `lucide-react` automatically. Use the actual installed component source in `components/ui/` as ground truth over prior shadcn conventions.
- `app/globals.css` now defines the project's raw design tokens from `ui-context.md` (`--bg-base`, `--text-primary`, `--accent-primary`, etc.) as the source of truth in `:root`, and maps shadcn's semantic tokens (`--background`, `--card`, `--primary`, ...) onto them. The app is dark-only: `:root` and `.dark` hold identical values, and `<html>` carries a permanent `dark` class (`app/layout.tsx`) so `dark:` variants in generated components always resolve.

## Session Notes

- Design system foundation (`context/feature-specs/01-design-system.md`) is implemented: shadcn/ui, lucide-react, `lib/utils.ts`, and theme tokens in `globals.css`. `components/ui/*` is untouched per the protected-files rule. Next session can build app-level components on top of these primitives.
