import Link from "next/link";
import { SiteFooter } from "./components/site-footer";
import { SiteHeader } from "./components/site-header";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col bg-zinc-50 font-sans text-foreground dark:bg-zinc-950">
      <SiteHeader />

      <main className="flex-1">
        <section className="mx-auto max-w-5xl px-6 pb-20 pt-16 sm:pt-24">
          <div className="max-w-2xl">
            <p className="mb-4 text-sm font-medium tracking-wide text-zinc-500 uppercase dark:text-zinc-400">
              Welcome
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl dark:text-zinc-50">
              Build something great with Next.js
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              This is your app&apos;s home page — a starting point for layouts,
              data fetching, and routes. Edit{" "}
              <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-sm text-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
                app/page.tsx
              </code>{" "}
              and refresh to see changes instantly.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/about"
                className="inline-flex h-11 items-center justify-center rounded-full bg-zinc-950 px-6 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
              >
                About this app
              </Link>
              <a
                href="https://vercel.com/new"
                className="inline-flex h-11 items-center justify-center rounded-full border border-zinc-300 bg-white px-6 text-sm font-medium text-zinc-950 transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-transparent dark:text-zinc-50 dark:hover:bg-zinc-900"
                target="_blank"
                rel="noopener noreferrer"
              >
                Deploy
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
