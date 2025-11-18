# Deployment Guide - Calcif.ai

## Vercel Deployment (Recommended)

### Prerequisites
- Vercel account
- PostgreSQL database (Vercel Postgres, Supabase, etc.)
- Redis instance (Upstash, Redis Cloud, etc.)
- Google Gemini API key

### Steps

1. **Push to GitHub** (already done)

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

3. **Configure Environment Variables**
   
   Add these in Vercel project settings:
   
   ```
   DATABASE_URL=postgresql://...
   REDIS_URL=redis://...
   GEMINI_API_KEY=...
   NEXTAUTH_URL=https://your-domain.vercel.app
   NEXTAUTH_SECRET=generate-with-openssl
   NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
   ```

4. **Deploy**
   
   Vercel will automatically:
   - Install dependencies
   - Build the project
   - Deploy to production

5. **Run Database Migrations**
   
   After first deployment:
   
   ```bash
   npx prisma migrate deploy
   ```

---

## Alternative: Docker Deployment

### Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npx prisma generate
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

### Docker Compose

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - REDIS_URL=${REDIS_URL}
      - GEMINI_API_KEY=${GEMINI_API_KEY}
    depends_on:
      - postgres
      - redis

  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: calcifai
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data

volumes:
  postgres_data:
  redis_data:
```

---

## Environment Configuration

### Production Checklist

- [ ] Set secure NEXTAUTH_SECRET
- [ ] Configure production DATABASE_URL
- [ ] Set up Redis with persistence
- [ ] Enable Gemini API rate limiting
- [ ] Configure CORS if needed
- [ ] Set up monitoring/logging
- [ ] Enable HTTPS
- [ ] Configure custom domain

---

## Performance Optimization

1. **Database**: Add indexes for frequently queried fields
2. **Redis**: Cache Gemini responses (already implemented)
3. **CDN**: Use Vercel Edge Network for static assets
4. **Images**: Optimize with Next.js Image component
5. **Fonts**: Self-hosted via Next.js Font Optimization

---

## Monitoring

### Vercel Analytics

Enable in project settings for:
- Page views
- Performance metrics
- Real User Monitoring

### Custom Logging

Add to `lib/logger.ts`:

```typescript
export function logError(error: Error, context?: any) {
  console.error('Error:', error.message, context);
  // Send to monitoring service (Sentry, LogRocket, etc.)
}
```

---

## Scaling Considerations

- **Database**: Connection pooling with PgBouncer
- **Redis**: Redis Cluster for high availability
- **API**: Rate limiting per user
- **Gemini**: Queue system for batch processing
