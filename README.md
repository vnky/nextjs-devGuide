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
```

---

## Learn more

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [Deploy on Vercel](https://nextjs.org/docs/app/building-your-application/deploying)

---

## License

Private learning repo — use and adapt as you like.
