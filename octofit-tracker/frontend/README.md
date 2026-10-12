# Octofit Tracker frontend

React 19 presentation tier for Octofit Tracker. It uses Vite, React Router, and Bootstrap, and loads tracker data from the Node.js API on port 8000.

## API URL configuration

In Codespaces, define `VITE_CODESPACE_NAME` in `octofit-tracker/frontend/.env.local` using your Codespace name (not the full URL or port), for example:

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

Vite uses this variable to build `https://<VITE_CODESPACE_NAME>-8000.app.github.dev`. Restart the Vite dev server after changing the file. Copy `.env.example` to `.env.local` as a starting point. When `VITE_CODESPACE_NAME` is unset or empty, the API URL safely falls back to `http://localhost:8000`.

Vite environment variables are included in browser code, so do not put secrets in them.

## Development

```bash
npm run dev
```

The app requests activities, leaderboard entries, teams, users, and workouts from the `/api/` endpoints. Collection views accept both plain arrays and paginated responses with a `results` array.
