# Code Standards

## General

- Keep modules small and single-purpose. 
- Fix root causes -- do not layer workarounds
- Do not mix unrelated concerns in one component or route. 
- Respect the system boundaries defined in architecture.md

## TypeScript

- Strict mode is required throughout the project.
- Avoid any; use explicit interfaces or narrowly scoped types. 
- Validate unknown external input at system boundaries before trusting it. 
- Use interface for objects contracts.

## Next.js

- Default to server components
- Add "use client" only when the component needs browser interactivity, hooks, or real-time state. 
- Keep route handlers focused on a single responsibility.
- Long-Running work belongs in background tasks, not in request handlers.

## Styling

- Use CSS custom property tokens defined in globals.css - No raw Tailwind color classes like zink-* or hardcoded hex values.
- Reference tokens through their Tailwin utility names: bg-base, text-copy-primary, border-surface-border, text-brand, etc.
- Maintain the border radius scale: rounded-xl for small elements, rounded-2x1 for cards, rouded 3x1 for modals. 

## API Routes

- Validate and parse request input before any logic runs.
- Enforce auth and ownership before any mutation.
- Return consistent, predictable response shapes.
- Keep route handlers thin -- push complexity into shared modules or background tasks. 

## Data and Storage

- Project metadata and relationships belong in PostgreSQL via Prisma. 
- Canvas snapshots and generated specs belong in Vercel Blob; Primsa stores only the blob URL reference.
- Do not store large generated content directly in the database. 
- Task run records are first-class relational data -- treat owsnerhip and run IDs as verified before any token issuance.

## File Organization

- lib/ -- Shared infrastruture: Prisma client, auth helpers, utilities. 
- trigger/ -- all durable background tasks and AI workflows. 
- components/ -- UI composition onlyl; no business logic. 
- app/api/ -- route handlers for auth, triggering and persistence. 
- Name files after the responsibility they contain, not the technology.

