# Mates & Weights

**Aussie Gym & Lifetime Milestone Tracker**

Log sessions, stack lifetime volume, and share the result with mates. Local analogies change with your home state. No login required. Built as a clean, all-ages fitness entertainment app.

## Features

- **Local colour for all of Australia** — VIC, NSW, QLD, WA, SA, TAS, ACT, and NT. Each home ground swaps public landmarks, icons, and badges (The Tan Track, Harbour Bridge, Uluru, and so on).
- **Lifetime milestones without brand names** — lift volume uses `Equivalent to ~` (classic meat pies, yeast-spread jars, red kangaroos, heavy 4x4s, outback road trains). Runs use `Equal to ~` (MCG pitches, Tan Track laps, AFL match runs, Uluru laps, crossing Australia).
- **Mates Mode without an account** — a `MATE-xxxxx` ID lives in LocalStorage and syncs in the background to Firebase Realtime Database. Settings shows **Your Mates ID**, a backup warning, and **Import Profile**.
- **1v1 Mate Battle share cards** — you vs a mate, **TOP MATE** / **CHALLENGER** stamps, and a peaceful **Friendly Challenge** (funny selfie, 10 push-ups, and similar). Selfie as the background, type on top, drag to place.
- **Squad Pass** — 3–10 person group battles, a Gold card skin for Stories / PNG, and full automatic cloud backup plus restore.

## Tech Stack

- [Next.js](https://nextjs.org/) 15 (App Router)
- [React](https://react.dev/) 19
- [Chart.js](https://www.chartjs.org/) 4
- [Firebase Realtime Database](https://firebase.google.com/docs/database) REST
- Inter via `next/font`
- LocalStorage on device; optional PWA / home-screen install

## Getting Started

**1. Clone and install**

```bash
git clone https://github.com/YOUR_USER/gym-buddy.git
cd gym-buddy
npm install
```

**2. Environment**

```bash
cp .env.example .env.local
```

Set your Firebase Realtime Database URL:

```bash
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://YOUR-PROJECT-default-rtdb.firebaseio.com
```

Never commit `.env.local` or `env.js`. The `NEXT_PUBLIC_` prefix means this URL is sent to the browser — protect the database with Firebase Security Rules. The static `index.html` path reads the same value from gitignored `env.js` (`window.__ENV`), which should be generated from `.env.local`.

**3. Run locally**

If you already have the project folder open, the static app is at:

```text
http://localhost:8771/index.html
```

Or with Node:

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

**4. Production build**

```bash
npm run build
npm start
```

## License

MIT. See [LICENSE](LICENSE).
