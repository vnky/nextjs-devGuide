import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";

export const metadata: Metadata = {
  title: "About — next-app",
  description: "About this Next.js application and how it is structured.",
};

const stack = [
  { name: "Next.js 16", detail: "App Router, server components, and API routes" },
  { name: "React 19", detail: "UI with the latest stable React release" },
  { name: "Tailwind CSS 4", detail: "Styling with design tokens and dark mode" },
  { name: "TypeScript", detail: "Typed components and route handlers" },
] as const;

export default function AboutPage() {
  return (
    <div className="flex min-h-full flex-col bg-zinc-50 font-sans text-foreground dark:bg-zinc-950">
      <SiteHeader />

      <main className="flex-1">
        <section className="mx-auto max-w-5xl px-6 pb-20 pt-16 sm:pt-24">
          <div className="max-w-2xl">
            <p className="mb-4 text-sm font-medium tracking-wide text-zinc-500 uppercase dark:text-zinc-400">
              About
            </p>
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl dark:text-zinc-50">
              A small Next.js starter
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              This project is a starting point for pages, layouts, and API
              handlers. The home route lives at{" "}
              <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-sm text-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
                app/page.tsx
              </code>
              ; this page is{" "}
              <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-sm text-zinc-800 dark:bg-zinc-900 dark:text-zinc-200">
                app/about/page.tsx
              </code>
              .
            </p>
          </div>

          <div className="mt-16">
            <h2 className="text-xl font-semibold text-zinc-950 dark:text-zinc-50">
              Tech stack
            </h2>
            <ul className="mt-6 divide-y divide-zinc-200 rounded-2xl border border-zinc-200 bg-white dark:divide-zinc-800 dark:border-zinc-800 dark:bg-zinc-900/40">
              {stack.map((item) => (
                <li
                  key={item.name}
                  className="flex flex-col gap-1 px-6 py-4 sm:flex-row sm:items-baseline sm:justify-between"
                >
                  <span className="font-medium text-zinc-950 dark:text-zinc-50">
                    {item.name}
                  </span>
                  <span className="text-sm text-zinc-600 dark:text-zinc-400">
                    {item.detail}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <p className="mt-10 text-sm text-zinc-600 dark:text-zinc-400">
            Sample API:{" "}
            <Link
              href="/api/test"
              className="font-medium text-zinc-950 underline-offset-4 hover:underline dark:text-zinc-50"
            >
              /api/test
            </Link>
          </p>

          <div className="mt-10">
            <Link
              href="/"
              className="inline-flex h-11 items-center justify-center rounded-full border border-zinc-300 bg-white px-6 text-sm font-medium text-zinc-950 transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-transparent dark:text-zinc-50 dark:hover:bg-zinc-900"
            >
              ← Back to home
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
