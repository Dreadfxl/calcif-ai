# Development Guide - Calcif.ai

## Project Structure

```
calcif-ai/
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── api/          # API routes
│   │   ├── layout.tsx    # Root layout
│   │   └── page.tsx      # Dashboard page
│   ├── components/       # React components
│   │   ├── ui/           # Base UI components
│   │   ├── tasks/        # Task components
│   │   ├── buckets/      # Bucket components
│   │   └── layout/       # Layout components
│   ├── lib/              # Utilities and core logic
│   │   ├── prisma.ts     # Database client
│   │   ├── redis.ts      # Cache client
│   │   ├── gemini.ts     # AI classification
│   │   ├── store.ts      # Zustand state
│   │   └── utils.ts      # Helper functions
│   ├── styles/           # Global CSS
│   └── types/            # TypeScript types
├── prisma/              # Database schema
├── design/              # Design documentation
├── docs/                # Technical docs
└── public/              # Static assets
```

---

## Development Workflow

### 1. Create a New Component

All components follow brutalist design principles:

```tsx
// src/components/ui/ExampleComponent.tsx
'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function ExampleComponent() {
  return (
    <motion.div 
      className="card-brutalist"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Content */}
    </motion.div>
  );
}
```

### 2. Add New API Route

```typescript
// src/app/api/example/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  // Implementation
}
```

### 3. Database Changes

Modify `prisma/schema.prisma`, then:

```bash
npx prisma migrate dev --name describe_change
npx prisma generate
```

---

## Design System Usage

### Brutalist Components

All UI uses the brutalist design tokens from Tailwind config:

- **Buttons**: `btn-brutalist`, `btn-brutalist-primary`
- **Cards**: `card-brutalist`
- **Inputs**: `input-brutalist`
- **Spacing**: `brutalist-xs` through `brutalist-xxl`
- **Borders**: `border-brutalist-thin/medium/thick/ultra`

### Color Palette

```typescript
const colors = {
  concrete: '#2B2D2F',
  chrome: '#C0C0C0',
  'cyber-blue': '#00FFFF',
  'matrix-green': '#00FF41',
  warning: '#FF6B00',
};
```

### Animations

- `animate-glitch`: RGB split effect
- `animate-neon-pulse`: Pulsing glow
- `animate-matrix-rain`: Falling code effect

---

## Testing

### Type Checking

```bash
npm run type-check
```

### Linting

```bash
npm run lint
```

---

## Best Practices

1. **Components**: Use `'use client'` for interactive components
2. **State**: Zustand for global state, React state for local
3. **Styling**: Tailwind utility classes + custom brutalist classes
4. **Animations**: Framer Motion for all animations
5. **Types**: Always define TypeScript interfaces
6. **API**: Error handling and proper HTTP status codes
