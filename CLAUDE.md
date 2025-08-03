# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands

**Development:**
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production (runs TypeScript check + Vite build)
- `npm run lint` - Run ESLint on all TypeScript/React files
- `npm run preview` - Preview production build locally

**TypeScript:**
- Build uses `tsc -b` for type checking before Vite build
- Separate tsconfig files: `tsconfig.app.json` (app), `tsconfig.node.json` (Vite config)
- Path alias `@/*` maps to `./src/*`

## Architecture Overview

**Project Type:** React SPA for daily creative coding challenges
**Goal:** Showcase daily weird/fun coding challenges with beautiful UI

**Tech Stack:**
- **Frontend:** React 19 + Vite + TypeScript
- **UI Framework:** shadcn/ui (New York style) + Tailwind CSS v4
- **Animations:** Framer Motion
- **Icons:** Lucide React

**Key Design Patterns:**
- Component-based architecture with TypeScript interfaces
- Context-based theme management (light/dark mode)
- Static challenge data with JSON structure
- Motion animations throughout UI for smooth interactions

## Code Structure

**Components:**
- `/src/components/ui/` - shadcn/ui base components
- `/src/components/` - Feature components (ChallengeHero, Header, etc.)
- `/src/context/` - React context providers (ThemeContext)
- `/src/data/` - Static challenge data and sample content
- `/src/types/` - TypeScript interfaces and type definitions

**Challenge Data Structure:**
```typescript
interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'chill' | 'deep' | 'wild';
  estimatedTime: string;
  tags: string[];
  dateCreated: string;
  examples?: string[];
}
```

**Difficulty Levels:**
- **Chill** (30-60 min): Simple interactions
- **Deep** (2-4 hours): Complex animations  
- **Wild** (1-2 days): Full applications

## Styling Conventions

**Theme System:**
- Uses Tailwind CSS v4 with custom CSS variables
- Built-in dark/light mode with ThemeContext
- Color system focused on creative, playful design
- Typography: sans-serif for UI, serif for content descriptions

**Animation Patterns:**
- Framer Motion for page transitions and micro-interactions
- Consistent easing and timing for brand feel
- Hover states and interactive feedback throughout
- Staggered animations for lists and galleries

## Development Guidelines

**Component Creation:**
- Use TypeScript interfaces for all props
- Follow shadcn/ui patterns for new UI components
- Implement responsive design (mobile-first)
- Include hover states and motion animations

**Challenge Content:**
- Focus on creative, unconventional coding challenges
- Categories: Emotional UX, Paradox Programming, Anthropomorphic Interfaces
- Include code examples and clear descriptions
- Maintain playful, encouraging tone

**File Organization:**
- Keep components focused and single-purpose
- Use TypeScript for type safety
- Follow existing naming conventions
- Import using `@/` path aliases