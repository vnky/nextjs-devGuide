# nextjs-devGuide

Hands-on [Next.js](https://nextjs.org) 16 examples — routing, layouts, APIs, streaming, Server Actions, and file conventions. Use each page as a reference while you build.

**Repository:** [github.com/vnky/nextjs-devGuide](https://github.com/vnky/nextjs-devGuide)

---

## Stack

| Layer | Choice |
|--------|--------|
| Framework | Next.js 16 (App Router) |
| UI | React 19, Tailwind CSS 4 |
| Fonts | Geist (`next/font`) |
| Mock API (posts) | [json-server](https://github.com/typicode/json-server) on port **3001** |
| E2E tests | [Playwright](https://playwright.dev) (`@playwright/test`) |

---

## Getting started

### 1. Install and run Next.js

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 2. Posts demo (optional — requires json-server)

In a **second terminal**:

```bash
npm run json-server
```

Then visit [http://localhost:3000/posts](http://localhost:3000/posts).

Data lives in `db.json`. Override the API URL with `JSON_SERVER_URL` if needed (default: `http://localhost:3001`).

### Other scripts

| Command | Purpose |
|---------|---------|
| `npm run build` | Production build |
| `npm run start` | Run production server |
| `npm run lint` | ESLint |
| `npm run playwright:install` | Download Chromium for Playwright (also runs on `npm install`) |
| `npm run test:e2e` | Playwright E2E (starts json-server + dev server; headed locally, headless in CI) |
| `npm run test:e2e:headed` | E2E with a visible browser window |
| `npm run test:e2e:ui` | Playwright UI mode (`--ui --headed`) — debug step-by-step |
| `npm run test:e2e:report` | Open the last HTML report |

---

## Playwright E2E

End-to-end tests live in **`e2e/`**. Config: **`playwright.config.ts`**.

### First-time browser install

If you see `Executable doesn't exist` under `~/Library/Caches/ms-playwright/`:

```bash
npm run playwright:install
# or: npx playwright install chromium
```

`postinstall` runs this after `npm install`; run the command manually if browsers were skipped.

### Run tests

```bash
npm run test:e2e
```

Playwright starts both servers for you (unless already running):

1. **json-server** — `http://localhost:3001` (posts tests)
2. **Next.js dev** — `http://localhost:3000` (`baseURL` for `page.goto("/")`)

Run a single file:

```bash
npx playwright test e2e/home-screenshot.spec.ts
```

Slow motion (easier to watch in UI):

```bash
PLAYWRIGHT_SLOW_MO=500 npm run test:e2e:ui
```

Override app URL:

```bash
PLAYWRIGHT_BASE_URL=http://localhost:3000 npm run test:e2e
```

### Specs

| File | What it covers |
|------|----------------|
| **`e2e/smoke.spec.ts`** | Home heading, nav → About, dynamic `/topics/[slug]`, posts form + Server Action |
| **`e2e/home-screenshot.spec.ts`** | Home load, 2s wait, full-page screenshot |

### Artifacts (screenshots, trace, video)

| Output | Location |
|--------|-----------|
| Screenshots from tests | `test-results/**/` (e.g. `home-page.png` via `testInfo.outputPath`) |
| HTML report | `playwright-report/` — open with `npm run test:e2e:report` |
| Trace / video (local runs) | Attached in the report; trace/video enabled in config when not in CI |

Find a screenshot quickly:

```bash
find test-results -name "home-page.png"
```

### Config highlights

- **`baseURL`**: `http://localhost:3000` — use relative paths in tests (`page.goto("/")`)
- **`webServer`**: auto-starts json-server and `npm run dev`
- **Local**: headed browser, trace on, video on (CI uses headless + retries)
- **Docs**: [Playwright Test](https://playwright.dev/docs/intro)

---

## Topics & routes

| Topic | Route | What to look at |
|--------|--------|------------------|
| **Home** | `/` | Marketing-style landing, shared header/footer |
| **About** | `/about` | Static page, page metadata |
| **Services** | `/services` | Route group `(marketing)` — folder name omitted from URL |
| **Dynamic slug** | `/topics/getting-started`, `/topics/deployment` | Single segment: `app/topics/[slug]/page.tsx`, `generateStaticParams` |
| **Catch-all slug** | `/guide/intro`, `/guide/setup/env`, `/guide/hello` | Multi-segment: `app/guide/[...slug]/page.tsx`, dynamic fallback for unknown paths |
| **Streaming** | `/streaming` | `Suspense` + async Server Components; staggered `GET /api/stream/{fast\|medium\|slow}` |
| **Server Actions & forms** | `/posts` | `app/actions.ts` → `createPost`; form `action={createPost}`; json-server POST |
| **Sample API** | `/api/test` | Route Handler: `app/api/test/route.ts` |

---

## Concepts covered

### Routing & pages

- **App Router** file conventions (`page.tsx`, `layout.tsx`)
- **Static routes** — `app/about/page.tsx`, `app/page.tsx`
- **Route groups** — `app/(marketing)/services/page.tsx` → URL `/services`
- **Dynamic `[slug]`** — one URL segment (`/topics/[slug]`)
- **Catch-all `[...slug]`** — many segments (`/guide/a/b/c`)
- **Metadata** — `export const metadata` / `generateMetadata`

### UI & organization

- **Shared layout chrome** — `app/components/site-header.tsx`, `site-footer.tsx`
- **Private folders** — `app/_shared/` (leading `_` — not part of the URL; safe for components/utils)
- **Path alias** — `@/*` → project root (`tsconfig.json`)

### Data & server

- **Route Handlers** — REST-style APIs under `app/api/`
- **Server Components** — async pages, server-side `fetch`
- **Streaming** — multiple `Suspense` boundaries; UI replaces skeletons as data arrives
- **Server Actions** — `"use server"` in `app/actions.ts`; forms post via `createPost(formData)`
- **Cache revalidation** — `revalidatePath("/posts")` after creating a post
- **json-server** — local REST backend for the posts CRUD demo

### Linking & navigation

- **`next/link`** — client navigation between routes
- Cross-links between topics, guide, services, and home (see topic page actions)

### Testing

- **Playwright E2E** — browser tests against real routes and json-server
- **Server Actions in E2E** — posts spec submits the form and asserts the new row appears

---

## Project layout (high level)

```
app/
├── page.tsx                 # Home
├── layout.tsx               # Root layout + fonts
├── actions.ts               # Server Actions (createPost)
├── about/page.tsx
├── posts/page.tsx           # Server Action form + post list
├── streaming/               # Streaming demo
├── topics/[slug]/           # Dynamic route
├── guide/[...slug]/         # Catch-all route
├── (marketing)/services/    # Route group
├── api/                     # Route Handlers
├── components/              # Shared UI
├── _shared/                 # Private folder (not routed)
└── lib/                     # Helpers, demo data, json-server client

db.json                      # json-server database (posts)
e2e/                         # Playwright specs
playwright.config.ts         # E2E config, webServer, baseURL
```

---

## Learn more

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [Deploy on Vercel](https://nextjs.org/docs/app/building-your-application/deploying)
- [Playwright Documentation](https://playwright.dev/docs/intro)

---

## License

Private learning repo — use and adapt as you like.
