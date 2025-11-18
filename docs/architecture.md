# Calcif.ai Architecture & Stack

---

## Core Tech
- **Frontend**: Next.js (TypeScript), Tailwind CSS
- **Animation**: Framer Motion, SVG/CANVAS FX
- **State**: Zustand
- **Backend**: Node.js (TypeScript), Next.js API routes/tRPC
- **Database**: PostgreSQL
- **Cache**: Redis
- **Auth**: NextAuth.js or Clerk
- **AI**: Google Gemini API integration for classification logic

---

## System Modules
1. **User:** Auth, onboarding, custom buckets
2. **Tasks:** Create, classify, complete, dog bone icons
3. **Buckets:** CRUD, geometric icons, color config
4. **Classification Engine:** Gemini, fallback/manual
5. **Visual FX:** Glitch/neon/matrix/particle
6. **Dashboard:** Asymmetric grid UI

---

## API Usage & Cost
- Secure API keys w/ env vars
- Rate-limiting + graceful retries
- Log API cost, flag overages
