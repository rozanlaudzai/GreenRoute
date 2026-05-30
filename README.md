# Green Route

Green Route is a sustainability-first travel planning app built with Next.js, Prisma, Tailwind CSS, and PostgreSQL.

## Features

- Transportation comparison by time, cost, and CO₂ emissions
- Green score and eco-friendly route recommendations
- Dashboard metrics, charts, and challenge tracking
- Leaderboard and admin analytics
- Authentication with email/password and Google OAuth
- Docker and local PostgreSQL setup

## Setup

1. Copy environment variables:

   ```bash
   cp .env.example .env
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run Prisma migration and seed the database:

   ```bash
   npx prisma migrate dev --name init
   npm run prisma:seed
   ```

4. Start development server:

   ```bash
   npm run dev
   ```

5. Open `http://localhost:3000`

## Docker

Start the application with Docker Compose:

```bash
docker compose up --build
```

## Database

- PostgreSQL database connection is configured in `.env`
- Prisma schema is located at `prisma/schema.prisma`
- Seed data includes admin user, emission factors, and challenges

## Notes

- Update `NEXTAUTH_SECRET` before deploying to production
- Configure `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` for Google login
- Use `npx prisma studio` to inspect the database
