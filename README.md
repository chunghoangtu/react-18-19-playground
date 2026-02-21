# React 18 → 19 Playground (TypeScript)

A comprehensive learning series exploring React 18 and React 19 features with hands-on examples.

## Tech Stack

- **React 19** – Latest React features
- **TypeScript** – Type-safe development
- **Vite** – Lightning-fast bundler
- **TailwindCSS** – Utility-first styling
- **TanStack Router** – Type-safe routing
- **React Compiler** – Automatic memoization

## Project Structure

```
src/
├── features/
│   ├── day01/          # Foundation & Batching
│   ├── day02/          # Transitions (useTransition)
│   ├── day03/          # Deferred & useId
│   ├── day04/          # External Store (useSyncExternalStore)
│   ├── day05/          # Suspense & Code Splitting
│   ├── day06/          # Actions & Forms
│   └── day07/          # React 19 & MiniApp
├── routes/             # TanStack Router pages
└── shared/             # Global styles & utilities
```

## Days Overview

### Day 01 — Foundation
- `createRoot` and root rendering
- Automatic batching in React 18
- `StrictMode` behavior in development
- `RenderCounter` to visualize render cycles

### Day 02 — Transitions
- `useTransition` hook for non-urgent updates
- `startTransition` API
- Responsive UI with pending states
- Managing heavy filtering operations

### Day 03 — Deferred & useId
- `useDeferredValue` for deferred rendering
- `useId` for stable unique identifiers
- Typeahead search patterns
- Field component patterns

### Day 04 — External Store
- `useSyncExternalStore` for external state sync
- Custom store implementation (`createStore`)
- Settings management
- Re-render optimization with external stores

### Day 05 — Suspense
- `React.lazy()` for code splitting
- `<Suspense>` boundaries
- Fallback UI patterns
- Loading state management

### Day 06 — Actions & Forms
- Form actions (server-side or client-side)
- New form patterns
- Todo app implementation
- Form submission patterns

### Day 07 — React 19 & MiniApp
- React 19 latest features
- `use()` hook
- Mini e-commerce application
- State management patterns
- Code splitting with dynamic features

## Getting Started

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### Build

```bash
pnpm build
```

## GitHub Actions

This project includes a CI/CD workflow that automatically builds the project on push and pull requests to the `main` branch.

**Workflow:** `.github/workflows/main-workflow.yml`

- **Triggers:** Push to `main` and Pull Requests to `main`
- **Node version:** 25.x
- **Package Manager:** pnpm (with frozen lockfile)
- **Steps:**
  1. Checkout code
  2. Setup pnpm
  3. Setup Node.js
  4. Install dependencies with `pnpm install --frozen-lockfile`
  5. Build project with `pnpm build`

The workflow ensures code quality and build integrity on every change.

## Features

- ✅ Type-safe routing with TanStack Router
- ✅ Automatic route tree generation
- ✅ React Compiler enabled for performance
- ✅ ESLint + TypeScript configuration
- ✅ TailwindCSS for styling
- ✅ Dark mode ready (Slate color scheme)

## Learning Goals

By exploring this playground, you'll understand:

1. How React 18's automatic batching improves performance
2. Using transitions to keep UI responsive during heavy work
3. Managing deferred values and generating unique IDs
4. Syncing with external state management systems
5. Code splitting and suspense patterns
6. New form handling in React 19
7. Building complete apps with React 19 features
