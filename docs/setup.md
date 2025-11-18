# Setup Guide - Calcif.ai

## Prerequisites

- Node.js 18+ installed
- PostgreSQL database
- Redis server
- Google Gemini API key

---

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/Dreadfxl/calcif-ai.git
cd calcif-ai
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` and fill in your credentials:

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/calcifai"

# Redis Cache
REDIS_URL="redis://localhost:6379"

# Google Gemini AI
GEMINI_API_KEY="your-gemini-api-key-here"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"

# Application
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4. Database Setup

Run Prisma migrations:

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 5. Start Redis

Make sure Redis is running:

```bash
redis-server
```

### 6. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Database Seeding (Optional)

To add sample buckets:

```bash
npx prisma db seed
```

---

## Troubleshooting

### Database Connection Issues
- Verify PostgreSQL is running
- Check DATABASE_URL format
- Ensure database exists: `createdb calcifai`

### Redis Connection Issues
- Verify Redis is running: `redis-cli ping`
- Check REDIS_URL configuration

### Gemini API Issues
- Verify API key is valid
- Check quota/rate limits in Google Cloud Console
- Review logs in terminal for detailed errors

---

## Production Build

```bash
npm run build
npm run start
```
