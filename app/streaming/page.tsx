import type { Metadata } from "next";
import { Suspense } from "react";
import { SiteFooter } from "../components/site-footer";
import { SiteHeader } from "../components/site-header";
import { STREAM_PARTS, type StreamPartId } from "../lib/stream-parts";
import { StreamPanel, StreamPanelSkeleton } from "./stream-panel";

export const metadata: Metadata = {
  title: "Streaming demo — next-app",
  description:
    "React Suspense and Next.js streaming with staggered API response times.",
};

export const dynamic = "force-dynamic";

const panelOrder: StreamPartId[] = ["fast", "medium", "slow"];

export default function StreamingPage() {
  return (
    <div className="flex min-h-full flex-col bg-zinc-50 font-sans text-foreground dark:bg-zinc-950">
      <SiteHeader />

      <main className="flex-1">
        <section className="mx-auto max-w-5xl px-6 pb-20 pt-16 sm:pt-24">
          <p className="mb-4 text-sm font-medium tracking-wide text-zinc-500 uppercase dark:text-zinc-400">
            Streaming
          </p>
          <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl dark:text-zinc-50">
            UI that arrives in stages
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            This shell renders immediately. Each card below is an async server
            component wrapped in{" "}
            <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-sm dark:bg-zinc-900">
              Suspense
            </code>
            . Cards call Route Handlers with different artificial delays, so
            you should see fast → medium → slow pop in one after another.
          </p>

          <dl className="mt-8 grid gap-4 sm:grid-cols-3">
            {panelOrder.map((part) => (
              <div
                key={part}
                className="rounded-xl border border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900/40"
              >
                <dt className="font-mono text-xs text-zinc-500">/api/stream/{part}</dt>
                <dd className="mt-1 text-sm font-medium text-zinc-950 dark:text-zinc-50">
                  {STREAM_PARTS[part].title}
                </dd>
                <dd className="text-xs text-zinc-500">
                  ~{STREAM_PARTS[part].delayMs}ms
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {panelOrder.map((part) => (
              <Suspense key={part} fallback={<StreamPanelSkeleton part={part} />}>
                <StreamPanel part={part} />
              </Suspense>
            ))}
          </div>

          <p className="mt-10 text-sm text-zinc-500 dark:text-zinc-400">
            Hard refresh to replay the stream. Open Network to watch the three
            API calls finish at different times.
          </p>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
