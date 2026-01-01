# Development Guide & Best Practices

This document outlines the development setup, coding standards, and best practices for the EMS App project.

## 📋 Table of Contents

- [Setup](#setup)
- [Code Quality Tools](#code-quality-tools)
- [TypeScript Guidelines](#typescript-guidelines)
- [Project Structure](#project-structure)
- [Best Practices](#best-practices)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)

## 🚀 Setup

### Prerequisites

- Node.js 20+ 
- npm/yarn/pnpm
- Git

### Installation

```bash
npm install
# or
yarn install
```

## 🛠️ Code Quality Tools

### ESLint

We use ESLint 9 with Next.js configuration and custom rules for code quality.

**Run linting:**
```bash
npm run lint
```

**Auto-fix issues:**
```bash
npm run lint:fix
```

### Prettier

Prettier is configured for consistent code formatting with Tailwind CSS plugin support.

**Format all files:**
```bash
npm run format
```

**Check formatting:**
```bash
npm run format:check
```

### TypeScript

Strict TypeScript configuration with enhanced type checking.

**Type check:**
```bash
npm run type-check
```

### Combined Checks

Run all checks at once:
```bash
npm run check
```

## 📝 TypeScript Guidelines

### Strict Type Checking

The project uses strict TypeScript settings:
- `strict: true` - Enables all strict type checking options
- `noUnusedLocals: true` - Error on unused local variables
- `noUnusedParameters: true` - Error on unused parameters
- `noUncheckedIndexedAccess: true` - Requires explicit checks for array/object access

### Type Safety Best Practices

1. **Avoid `any` types** - Use `unknown` or proper types instead
2. **Use type guards** - For runtime type checking
3. **Leverage TypeScript's utility types** - `Pick`, `Omit`, `Partial`, etc.
4. **Define interfaces for props** - Always type component props
5. **Use const assertions** - For literal types

### Example:

```typescript
// ✅ Good
interface UserProps {
  name: string;
  age: number;
  email?: string;
}

// ❌ Bad
const User = (props: any) => { ... }
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Auth route group
│   ├── (protected)/       # Protected route group
│   └── api/               # API routes
├── components/            # React components
│   ├── containers/        # Feature containers
│   ├── custom-components/ # Reusable components
│   ├── data/             # Type definitions & mock data
│   ├── layouts/          # Layout components
│   └── ui/               # shadcn/ui components
└── lib/                  # Utilities & helpers
    ├── api/              # API client
    ├── schemas/          # Validation schemas
    └── utils.ts          # General utilities
```

### Naming Conventions

- **Components**: PascalCase (e.g., `UserProfile.tsx`)
- **Files**: PascalCase for components, camelCase for utilities
- **Folders**: kebab-case or camelCase
- **Types/Interfaces**: PascalCase (e.g., `UserData`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_RETRIES`)

## ✨ Best Practices

### Component Organization

1. **Container/Scene Pattern**: Use containers for logic, scenes for presentation
2. **Custom Hooks**: Extract reusable logic into hooks
3. **Type Definitions**: Keep types close to where they're used, or in `data/type.ts` for shared types

### Import Organization

Imports should be organized in this order:
1. React and Next.js imports
2. Third-party libraries
3. Internal components
4. Utilities and helpers
5. Types
6. Styles

Example:
```typescript
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { fetch } from "@/lib/api";

import type { User } from "@/components/data/type";
```

### Error Handling

- Always handle errors in async operations
- Use try-catch blocks for API calls
- Provide user-friendly error messages
- Log errors appropriately (console.error in dev, proper logging in prod)

### Performance

- Use React.memo for expensive components
- Implement proper loading states
- Use Next.js Image component for images
- Lazy load heavy components when possible
- Optimize re-renders with useMemo and useCallback

## 🔐 Environment Variables

### Setup

1. Create `.env.local` file in the root directory
2. Add required variables (see `.env.example` if available)
3. Use the `env` utility from `@/lib/env` for type-safe access

### Usage

```typescript
import { env } from "@/lib/env";

// Access public env vars
const apiUrl = env.public.apiEndpoint;

// Check environment
if (env.isDevelopment) {
  console.log("Development mode");
}
```

### Validation

Environment variables are validated at build time. Missing required variables will cause build failures.

## 📜 Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint issues automatically |
| `npm run type-check` | Run TypeScript type checking |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check code formatting |
| `npm run check` | Run all checks (type-check + lint + format) |

## 🎨 Styling Guidelines

### shadcn/ui Components

- Always use components from `@/components/base_shadcn` (as per user rules)
- Leverage CSS variables from `app/shadcn-variables.scss`
- Use design tokens like `--base-primary`, `--base-background`, etc.

### Tailwind CSS

- Use utility classes for styling
- Prefer composition over custom CSS
- Use responsive prefixes (sm:, md:, lg:)
- Follow mobile-first approach

## 🧪 Testing (Future Enhancement)

Consider adding:
- **Vitest** or **Jest** for unit testing
- **React Testing Library** for component testing
- **Playwright** or **Cypress** for E2E testing

## 📚 Additional Recommendations

### Git Hooks (Future)

Consider adding **Husky** and **lint-staged** for:
- Pre-commit hooks to run linting/formatting
- Pre-push hooks to run type checking

### CI/CD

Recommended checks in CI:
- Type checking
- Linting
- Formatting verification
- Build verification

### Documentation

- Keep component documentation in JSDoc comments
- Document complex business logic
- Maintain this guide as the project evolves

---

**Last Updated**: Based on Next.js 16.1.1, React 19.2.3, TypeScript 5

