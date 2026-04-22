# LiveCast — Live Streaming App

A full-stack live streaming web app. Stream from your phone (via Larix Broadcaster) and let viewers watch in real time via a browser.

**Stack:** React · Node.js/Express · Mux · HLS.js · Tailwind v4 · shadcn/ui

---

## Project Structure

```
livestream-app/
├── server/          ← Node.js + Express backend
│   ├── index.js     ← API routes (create/get/list/delete streams)
│   ├── .env         ← Your Mux credentials (never commit this!)
│   └── package.json
└── client/          ← React frontend
    ├── src/
    │   ├── App.js              ← Home screen
    │   ├── BroadcasterPanel.js ← Broadcaster view
    │   ├── ViewerPanel.js      ← Viewer / HLS player
    │   ├── globals.css         ← Your design system
    │   └── components/ui/      ← shadcn-style UI components
    └── package.json
```

---

## Setup

### 1. Configure Mux credentials

Edit `server/.env`:
```
MUX_TOKEN_ID=your_token_id_here
MUX_TOKEN_SECRET=your_token_secret_here
PORT=3001
```

Get these from: https://dashboard.mux.com → Settings → API Access Tokens

### 2. Install & run the backend

```bash
cd server
npm install
npm run dev
# Runs on http://localhost:3001
```

### 3. Install & run the frontend

```bash
cd client
npm install
npm start
# Runs on http://localhost:3000
# Proxies /api/* → http://localhost:3001
```

---

## How to go live

1. Open the app → click **Broadcast**
2. Click **Create Live Stream** — this calls Mux and gives you:
   - **RTMP URL:** `rtmps://global-live.mux.com:443/app`
   - **Stream Key:** your unique key
   - **Playback ID:** share this with viewers
3. Open **Larix Broadcaster** on your phone (free on iOS & Android)
4. Go to **Settings → Connections → New Connection**
5. Paste the RTMP URL and Stream Key
6. Hit record — you're live!

## How to watch

1. Open the app → click **Watch Live**
2. Enter the **Playback ID** from the broadcaster
3. Hit **Watch** — the HLS player connects to Mux and starts playing

---

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/api/streams` | Create a new live stream |
| `GET` | `/api/streams/:id` | Get stream status |
| `GET` | `/api/streams` | List all streams |
| `DELETE` | `/api/streams/:id` | Delete a stream |

---

## Deployment

- **Backend:** Deploy to Railway, Render, or any Node.js host. Set the env vars.
- **Frontend:** Run `npm run build`, deploy the `build/` folder to Vercel or Netlify.
- Update the `proxy` in `client/package.json` to your backend's production URL for local dev, or use `REACT_APP_API_URL` env var in production.
