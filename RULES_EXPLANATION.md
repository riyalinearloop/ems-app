# 📚 Rules Explanation Guide

This document explains every rule, configuration option, and why it's useful for your project.

---

## 🎨 Prettier Rules (`.prettierrc.json`)

Prettier handles **code formatting** - how your code looks, not how it works.

### Formatting Rules

| Rule | Value | Purpose | Example |
|------|-------|---------|---------|
| **`semi`** | `true` | **Adds semicolons** at end of statements | `const x = 1;` ✅ vs `const x = 1` ❌ |
| **`trailingComma`** | `"es5"` | **Adds trailing commas** in objects/arrays (ES5 compatible) | `{ a: 1, b: 2, }` - Makes git diffs cleaner when adding items |
| **`singleQuote`** | `false` | **Uses double quotes** for strings | `"hello"` ✅ vs `'hello'` ❌ |
| **`printWidth`** | `80` | **Max line length** before wrapping | Keeps code readable on smaller screens |
| **`tabWidth`** | `2` | **2 spaces** for indentation | Consistent indentation (matches your codebase) |
| **`useTabs`** | `false` | **Uses spaces** instead of tabs | Avoids tab/space mixing issues |
| **`arrowParens`** | `"always"` | **Always adds parentheses** around arrow function params | `(x) => x` ✅ vs `x => x` ❌ - More consistent |
| **`endOfLine`** | `"lf"` | **Unix-style line endings** (LF) | Prevents Windows/Mac line ending conflicts |
| **`bracketSpacing`** | `true` | **Adds spaces** inside object brackets | `{ a: 1 }` ✅ vs `{a: 1}` ❌ |
| **`jsxSingleQuote`** | `false` | **Double quotes** in JSX attributes | `<div className="test">` ✅ |
| **`plugins`** | `["prettier-plugin-tailwindcss"]` | **Sorts Tailwind classes** automatically | Organizes your utility classes |

### Why These Matter:
- **Consistency**: Everyone's code looks the same
- **Git Diffs**: Trailing commas = cleaner diffs
- **Readability**: 80 char limit keeps code readable
- **Team Collaboration**: No more "tabs vs spaces" debates

---

## 🔍 ESLint Rules (`eslint.config.mjs`)

ESLint handles **code quality** - catches bugs and enforces best practices.

### React Rules

#### `react/no-unescaped-entities: "warn"`
**Purpose**: Prevents unescaped characters in JSX that can break rendering
```tsx
// ❌ Bad - Can cause issues
<div>It's working</div>

// ✅ Good
<div>It&apos;s working</div>
// or
<div>{"It's working"}</div>
```

#### `react-hooks/exhaustive-deps: "warn"`
**Purpose**: Ensures useEffect/useMemo/useCallback dependencies are complete
```tsx
// ❌ Bad - Missing dependency
useEffect(() => {
  fetchData(userId);
}, []); // Missing userId!

// ✅ Good
useEffect(() => {
  fetchData(userId);
}, [userId]); // All dependencies included
```
**Why**: Prevents stale closures and bugs from missing dependencies

---

### TypeScript Rules

#### `@typescript-eslint/no-unused-vars: "warn"`
**Purpose**: Warns about unused variables, but allows `_` prefix for intentionally unused
```typescript
// ❌ Bad - Unused variable
const [data, setData] = useState();
const unused = 5; // Warning!

// ✅ Good - Prefix with _ if intentionally unused
const [_unused, setData] = useState();
const _temp = calculate(); // No warning
```
**Why**: Keeps code clean, removes dead code

#### `@typescript-eslint/no-explicit-any: "warn"`
**Purpose**: Discourages using `any` type (defeats TypeScript's purpose)
```typescript
// ❌ Bad - Loses type safety
function process(data: any) { ... }

// ✅ Good - Use proper types
function process(data: UserData) { ... }
// or
function process(data: unknown) { ... } // Then validate
```
**Why**: Maintains type safety, catches bugs at compile time

#### `@typescript-eslint/explicit-function-return-type: "off"`
**Purpose**: **Disabled** - TypeScript can infer return types automatically
```typescript
// ✅ Both are fine
function add(a: number, b: number) { // Inferred: number
  return a + b;
}

function add(a: number, b: number): number { // Explicit
  return a + b;
}
```
**Why**: Less verbose, TypeScript inference is usually good enough

#### `@typescript-eslint/explicit-module-boundary-types: "off"`
**Purpose**: **Disabled** - Similar to above, for exported functions
**Why**: Reduces boilerplate, inference works well for most cases

---

### General Code Quality Rules

#### `no-console: ["warn", { allow: ["warn", "error"] }]`
**Purpose**: Warns about `console.log` but allows `console.warn` and `console.error`
```typescript
// ❌ Bad - Warning
console.log("Debug info");

// ✅ Good - Allowed
console.warn("Warning message");
console.error("Error occurred");
```
**Why**: 
- `console.log` should be removed before production
- `console.warn/error` are useful for debugging real issues

#### `prefer-const: "warn"`
**Purpose**: Suggests using `const` instead of `let` when variable isn't reassigned
```typescript
// ❌ Bad
let name = "John";
name = "Jane"; // If you never do this, use const

// ✅ Good
const name = "John"; // Can't be reassigned
let counter = 0;
counter++; // Only use let when reassigning
```
**Why**: Prevents accidental reassignment, clearer intent

#### `no-var: "error"`
**Purpose**: **Error** - Never use `var`, always use `let` or `const`
```typescript
// ❌ Bad - Error!
var x = 1;

// ✅ Good
let x = 1;
const y = 2;
```
**Why**: `var` has function scope (confusing), `let/const` have block scope (modern)

#### `object-shorthand: "warn"`
**Purpose**: Encourages ES6 object shorthand syntax
```typescript
// ❌ Verbose
const obj = {
  name: name,
  age: age,
  greet: function() { ... }
};

// ✅ Concise
const obj = {
  name,        // Shorthand
  age,         // Shorthand
  greet() { ... } // Method shorthand
};
```
**Why**: Cleaner, more modern JavaScript

#### `prefer-arrow-callback: "warn"`
**Purpose**: Suggests arrow functions for callbacks when `this` binding isn't needed
```typescript
// ❌ Verbose
array.map(function(item) {
  return item * 2;
});

// ✅ Concise
array.map((item) => item * 2);
```
**Why**: More concise, better `this` binding behavior

---

### Import Organization Rules

#### `sort-imports: "warn"`
**Purpose**: Sorts import statements for consistency
```typescript
// ❌ Unsorted
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { fetch } from "@/lib/api";
import { useEffect } from "react";

// ✅ Sorted (automatically)
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { fetch } from "@/lib/api";
```
**Configuration**:
- `ignoreCase: true` - Case-insensitive sorting
- `ignoreDeclarationSort: true` - Don't sort between different import sources
- `ignoreMemberSort: false` - **Do** sort members within same import
- `memberSyntaxSortOrder` - Order: none, all, multiple, single

**Why**: Consistent imports = easier to read and find

---

## 🔷 TypeScript Compiler Options (`tsconfig.json`)

These are **compiler-level** checks that catch errors during build.

### Existing Options (Already in your config)

| Option | Purpose |
|--------|---------|
| `strict: true` | **Enables all strict checks** - null checks, any checks, etc. |
| `target: "ES2017"` | **Compiles to ES2017** - Modern but compatible |
| `jsx: "react-jsx"` | **React 17+ JSX transform** - No need to import React |
| `moduleResolution: "bundler"` | **Modern module resolution** - For Next.js bundler |
| `paths: { "@/*": ["./src/*"] }` | **Path aliases** - `@/components` instead of `../../components` |

### New Strict Options (Added)

#### `noUnusedLocals: true`
**Purpose**: **Error** if you declare a variable but never use it
```typescript
// ❌ Error - Unused variable
function example() {
  const unused = 5; // Error!
  return "hello";
}

// ✅ Good
function example() {
  const used = 5;
  return used.toString();
}
```
**Why**: Catches dead code, keeps codebase clean

#### `noUnusedParameters: true`
**Purpose**: **Error** if function parameter is never used
```typescript
// ❌ Error - Unused parameter
function handleClick(event: MouseEvent) {
  console.log("clicked");
  // event is never used!
}

// ✅ Good - Prefix with _ if intentionally unused
function handleClick(_event: MouseEvent) {
  console.log("clicked");
}
```
**Why**: Prevents unused parameters that might indicate bugs

#### `noFallthroughCasesInSwitch: true`
**Purpose**: **Error** if switch case falls through without `break`
```typescript
// ❌ Error - Missing break
switch (value) {
  case 1:
    doSomething();
    // Falls through to case 2 - Error!
  case 2:
    doSomethingElse();
    break;
}

// ✅ Good - Explicit fallthrough
switch (value) {
  case 1:
    doSomething();
    // @ts-expect-error - Intentional fallthrough
  case 2:
    doSomethingElse();
    break;
}
```
**Why**: Prevents accidental bugs from missing breaks

#### `noUncheckedIndexedAccess: true`
**Purpose**: Makes array/object access return `T | undefined` (safer)
```typescript
// ❌ Before - Could be undefined but TypeScript doesn't know
const arr = [1, 2, 3];
const item = arr[10]; // Type: number (but actually undefined!)

// ✅ After - TypeScript knows it could be undefined
const arr = [1, 2, 3];
const item = arr[10]; // Type: number | undefined
if (item !== undefined) {
  // Now TypeScript knows item is number
  console.log(item.toFixed(2));
}
```
**Why**: Prevents runtime errors from accessing non-existent array/object keys

#### `forceConsistentCasingInFileNames: true`
**Purpose**: **Error** if file imports use wrong casing
```typescript
// ❌ Error - Wrong casing
import { Button } from "./Button"; // File is actually "button.tsx"

// ✅ Good - Correct casing
import { Button } from "./button";
```
**Why**: Prevents issues on case-sensitive file systems (Linux)

#### `allowSyntheticDefaultImports: true`
**Purpose**: Allows default imports from modules without default export
```typescript
// ✅ Works even if module doesn't have default export
import React from "react";
```
**Why**: Better compatibility with CommonJS modules

---

## 📋 Rule Severity Levels

### ESLint Severity
- **`"error"`** - Build fails, must fix
- **`"warn"`** - Shows warning, build continues
- **`"off"`** - Rule disabled

### Why "warn" for most rules?
- **Non-blocking**: Team can still work while fixing warnings
- **Gradual adoption**: Fix warnings over time
- **Learning**: Warnings teach best practices without breaking builds

---

## 🎯 Quick Reference: What Each Tool Does

| Tool | Purpose | When It Runs |
|------|---------|--------------|
| **Prettier** | Code formatting | `npm run format` or on save (if configured) |
| **ESLint** | Code quality & bugs | `npm run lint` or on save (if configured) |
| **TypeScript** | Type checking | `npm run type-check` or during build |

---

## 💡 Best Practices Summary

1. **Prettier** = "How it looks" (formatting)
2. **ESLint** = "How it works" (quality)
3. **TypeScript** = "Is it correct?" (types)

All three work together:
- Prettier makes code **readable**
- ESLint makes code **safe**
- TypeScript makes code **correct**

---

## 🚀 How to Use

```bash
# Format code (Prettier)
npm run format

# Check for issues (ESLint)
npm run lint

# Fix issues automatically (ESLint)
npm run lint:fix

# Check types (TypeScript)
npm run type-check

# Run everything
npm run check
```

---

**Need to adjust a rule?** Just ask! We can make rules stricter, looser, or add new ones based on your team's needs.

