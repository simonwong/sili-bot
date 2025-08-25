# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build the application for production
- `pnpm start` - Start production server
- `pnpm lint` - Run Ultracite linter for code quality checks
- `pnpm lint:fix` - Auto-fix code formatting and safe issues
- `pnpm lint:fix:unsafe` - Auto-fix including unsafe transformations

## Architecture Overview

This is a Next.js 15 chat application using the App Router architecture with the following key technologies:

### Core Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript with strict Ultracite linting
- **Styling**: Tailwind CSS 4.x
- **Package Manager**: pnpm
- **AI Integration**: Vercel AI SDK (@ai-sdk/react, @ai-sdk/google)
- **API Layer**: tRPC with React Query for type-safe client-server communication
- **UI Components**: Radix UI primitives with shadcn/ui system
- **State Management**: Zustand for client state
- **Theme System**: next-themes with dark/light mode support

### Project Structure
- **`src/app/`** - Next.js App Router pages and API routes
  - **`api/chat/route.ts`** - Main chat API endpoint using AI SDK's streamText
  - **`api/trpc/[trpc]/route.ts`** - tRPC API handler
- **`src/features/`** - Feature-based modules (chat, model, sidebar)
- **`src/components/`** - Reusable UI components
  - **`ui/`** - shadcn/ui base components
  - **`animate-ui/`** - Animated UI components
- **`src/server/api/`** - tRPC server-side API definitions
- **`src/trpc/`** - tRPC client configuration and providers
- **`src/store/`** - Zustand state management

### Key Patterns

#### tRPC Integration
The app uses tRPC for type-safe API communication:
- Server routers in `src/server/api/routers/` (model, conversation, message, chat)
- Client setup in `src/trpc/react.tsx` with React Query integration
- Root router in `src/server/api/root.ts` combines all feature routers

#### AI Chat Implementation
- Uses Vercel AI SDK's `useChat` hook for streaming chat interactions
- Backend streaming via `streamText` API in `src/app/api/chat/route.ts`
- Message state managed through AI SDK's built-in patterns

#### Component Architecture
- Features organized in `src/features/` with their own components and hooks
- UI components follow shadcn/ui patterns with Tailwind CSS styling
- Consistent use of Radix UI primitives for accessibility

#### Theme and Layout
- Root layout (`src/app/layout.tsx`) provides theme, tRPC, and sidebar providers
- Sidebar-based layout using custom Radix components
- Geist Sans and Geist Mono fonts configured

### Development Guidelines

#### Code Quality
- Ultracite enforces strict TypeScript, accessibility, and React best practices
- No console statements, proper error handling required
- Use `export type` for types, `import type` for type imports
- Prefer arrow functions, avoid `var`, use `const` by default

#### File Naming
- Pages: `page.tsx` (App Router convention)
- API Routes: `route.ts` (App Router convention)
- Components: kebab-case (e.g., `chat-input-bar.tsx`)
- Feature modules: organized under `src/features/[feature-name]/`

#### Styling
- Tailwind CSS 4.x with `clsx` and `tailwind-merge` for conditional classes
- Dark/light theme support via `next-themes`
- Responsive design patterns

#### Testing and Quality
- Run `pnpm lint` before commits to ensure code quality
- Ultracite handles formatting, linting, and type checking
- Follow accessibility guidelines enforced by Ultracite rules