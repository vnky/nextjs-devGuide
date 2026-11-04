import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";

export const metadata: Metadata = {
  title: "Services — next-app",
  description:
    "Design, build, and ship modern web products with Next.js and React.",
};

const services = [
  {
    title: "Product design & UX",
    description:
      "Clear information architecture, responsive layouts, and accessible interfaces that convert visitors into users.",
  },
  {
    title: "Full-stack development",
    description:
      "Next.js apps with server components, typed APIs, and integrations tailored to your stack and timeline.",
  },
  {
    title: "Performance & SEO",
    description:
      "Core Web Vitals tuning, metadata, and rendering strategies so pages load fast and rank well.",
  },
  {
    title: "Launch & iteration",
    description:
      "CI-friendly deployments, monitoring hooks, and a roadmap for shipping features after go-live.",
  },
] as const;

const steps = [
  { step: "01", label: "Discover", detail: "Goals, users, and constraints" },
  { step: "02", label: "Design", detail: "Flows, UI, and technical plan" },
  { step: "03", label: "Build", detail: "Iterative delivery with demos" },
  { step: "04", label: "Ship", detail: "Launch, measure, improve" },
] as const;

export default function ServicesPage() {
  return (
    <div className="flex min-h-full flex-col bg-zinc-50 font-sans text-foreground dark:bg-zinc-950">
      <SiteHeader />

      <main className="flex-1">
        <section className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/30">
          <div className="mx-auto max-w-5xl px-6 pb-16 pt-16 sm:pb-24 sm:pt-24">
            <p className="mb-4 text-sm font-medium tracking-wide text-zinc-500 uppercase dark:text-zinc-400">
              Services
            </p>
            <div className="max-w-3xl">
              <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl dark:text-zinc-50">
                From idea to production-ready web apps
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                We help teams ship polished marketing sites and product
                experiences on modern React and Next.js — without the usual
                rewrite cycle six months later.
              </p>
            </div>
            <dl className="mt-14 grid gap-8 sm:grid-cols-3">
              <div>
                <dt className="text-3xl font-semibold text-zinc-950 dark:text-zinc-50">
                  2–4 wk
                </dt>
                <dd className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  Typical MVP timeline
                </dd>
              </div>
              <div>
                <dt className="text-3xl font-semibold text-zinc-950 dark:text-zinc-50">
                  100%
                </dt>
                <dd className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  TypeScript-first codebase
                </dd>
              </div>
              <div>
                <dt className="text-3xl font-semibold text-zinc-950 dark:text-zinc-50">
                  24h
                </dt>
                <dd className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  Response on new inquiries
                </dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 py-20">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
            What we deliver
          </h2>
          <p className="mt-2 max-w-xl text-zinc-600 dark:text-zinc-400">
            Engagements are scoped around outcomes — not slide decks.
          </p>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2">
            {services.map((service) => (
              <li
                key={service.title}
                className="rounded-2xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900/40"
              >
                <h3 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {service.description}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <section className="border-y border-zinc-200 bg-white py-20 dark:border-zinc-800 dark:bg-zinc-900/30">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
              How we work
            </h2>
            <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((item) => (
                <li key={item.step}>
                  <span className="font-mono text-sm text-zinc-400 dark:text-zinc-500">
                    {item.step}
                  </span>
                  <p className="mt-2 font-semibold text-zinc-950 dark:text-zinc-50">
                    {item.label}
                  </p>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                    {item.detail}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 py-20">
          <div className="rounded-3xl bg-zinc-950 px-8 py-12 text-center sm:px-12 dark:bg-zinc-50">
            <h2 className="text-2xl font-semibold tracking-tight text-white dark:text-zinc-950">
              Ready to talk about your project?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-zinc-400 dark:text-zinc-600">
              Tell us what you&apos;re building. We&apos;ll reply with a rough
              scope, timeline, and next steps — no obligation.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a
                href="mailto:hello@example.com"
                className="inline-flex h-11 items-center justify-center rounded-full bg-white px-6 text-sm font-medium text-zinc-950 transition hover:bg-zinc-200 dark:bg-zinc-950 dark:text-zinc-50 dark:hover:bg-zinc-800"
              >
                hello@example.com
              </a>
              <Link
                href="/about"
                className="inline-flex h-11 items-center justify-center rounded-full border border-zinc-700 px-6 text-sm font-medium text-white transition hover:bg-zinc-900 dark:border-zinc-300 dark:text-zinc-950 dark:hover:bg-zinc-100"
              >
                About us
              </Link>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
