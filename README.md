# Riikka Family Calendar

A shared family calendar PWA built with Next.js 14. It merges three color-coded calendars into one view:

- **Calendar 1 (Pink #E91E7B)**: Google Calendar + skating iCal subscription
- **Calendar 2 (Green #4CAF50)**: Outlook/Microsoft
- **Calendar 3 (Blue #2196F3)**: Outlook/Microsoft

## Features

- Dashboard: "What's happening today"
- Day, week, and month views
- Merged color-coded events
- Simple shared password/PIN login
- Owner-based editing permissions (edit own calendar only)
- Optional cross-calendar conflict highlighting
- Event privacy flag (`isPrivate`) for "Busy" masking
- Extensible categories from settings
- Calendar sync endpoint for Google + iCal + Microsoft Graph
- Installable PWA with offline cache via service worker

## Tech Stack

- Next.js 14 (App Router)
- TypeScript + Tailwind CSS
- PostgreSQL + Prisma
- Google Calendar API (REST)
- Microsoft Graph API (REST)
- iCal parsing (`node-ical`)

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create env file:

```bash
cp .env.example .env.local
```

3. Fill in credentials in `.env.local`.

4. Prepare the database and Prisma client:

```bash
npx prisma generate
npx prisma migrate dev
```

5. Run development server:

```bash
npm run dev
```

## Environment Variables

```env
DATABASE_URL="postgresql://..."
APP_PASSWORD="family-pin-here"

GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GOOGLE_REFRESH_TOKEN=""
GOOGLE_CALENDAR_ID=""

ICAL_SKATING_URL=""

MICROSOFT_CLIENT_ID=""
MICROSOFT_CLIENT_SECRET=""
MICROSOFT_TENANT_ID=""
OUTLOOK_CALENDAR_2_USER=""
OUTLOOK_CALENDAR_3_USER=""
```

## Google Calendar API configuration

1. Create a Google Cloud project.
2. Enable the **Google Calendar API**.
3. Configure OAuth credentials.
4. Create a refresh token with access to Calendar 1.
5. Set `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_REFRESH_TOKEN`, and `GOOGLE_CALENDAR_ID`.

## Microsoft Graph API configuration

1. Register an app in Azure App Registrations.
2. Grant Microsoft Graph permissions for calendar read access.
3. Configure tenant/app credentials.
4. Set `MICROSOFT_CLIENT_ID`, `MICROSOFT_CLIENT_SECRET`, `MICROSOFT_TENANT_ID`.
5. Set `OUTLOOK_CALENDAR_2_USER` and `OUTLOOK_CALENDAR_3_USER`.

## Skating iCal subscription

Set `ICAL_SKATING_URL` with the subscription URL from the skating team.

## Calendar sync

Trigger sync manually:

```bash
curl -X POST http://localhost:3000/api/sync
```

Use a scheduler (for example Vercel Cron) to call this periodically.

## Deployment (Vercel)

1. Push the repository to GitHub.
2. Import the project into Vercel.
3. Add all environment variables in Vercel.
4. Configure a PostgreSQL database and set `DATABASE_URL`.
5. Deploy.

## PWA installation on mobile

- **iOS (Safari)**: Open app, tap **Share** → **Add to Home Screen**.
- **Android (Chrome)**: Open app and tap **Install app** prompt (or menu → **Install**).

The app includes `public/manifest.json` and `public/sw.js` for install/offline support.
