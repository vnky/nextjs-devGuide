import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";
import { getGuidePage, guides } from "../../lib/demo-content";

export const dynamicParams = true;

type PageProps = {
  params: Promise<{ slug: string[] }>;
};

export function generateStaticParams() {
  return Object.keys(guides).map((path) => ({
    slug: path.split("/"),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuidePage(slug);
  return {
    title: `${guide.title} — next-app`,
    description: guide.summary,
  };
}

export default async function GuideCatchAllPage({ params }: PageProps) {
  const { slug } = await params;
  const guide = getGuidePage(slug);
  const path = slug.join("/");
  const isKnown = path in guides;

  return (
    <div className="flex min-h-full flex-col bg-zinc-50 font-sans text-foreground dark:bg-zinc-950">
      <SiteHeader />

      <main className="flex-1">
        <article className="mx-auto max-w-5xl px-6 pb-20 pt-16 sm:pt-24">
          <p className="mb-4 font-mono text-sm text-zinc-500 dark:text-zinc-400">
            /guide/[...slug] ·{" "}
            <span className="text-zinc-800 dark:text-zinc-200">
              [{slug.map((s) => `"${s}"`).join(", ")}]
            </span>
            {!isKnown && (
              <span className="mt-2 block text-amber-700 dark:text-amber-400">
                (dynamic — not in guides map)
              </span>
            )}
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl dark:text-zinc-50">
            {guide.title}
          </h1>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            {guide.summary}
          </p>
          <p className="mt-8 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">
            {guide.body}
          </p>

          <nav
            className="mt-12 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/40"
            aria-label="Guide pages"
          >
            <p className="text-sm font-medium text-zinc-950 dark:text-zinc-50">
              All guide paths
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              {Object.keys(guides).map((key) => (
                <li key={key}>
                  <Link
                    href={`/guide/${key}`}
                    className={
                      key === path
                        ? "font-medium text-zinc-950 dark:text-zinc-50"
                        : "text-zinc-600 underline-offset-4 hover:underline dark:text-zinc-400"
                    }
                  >
                    /guide/{key}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <p className="mt-10 text-sm text-zinc-500">
            Single-segment URLs use{" "}
            <Link
              href="/topics/getting-started"
              className="font-medium text-zinc-950 underline-offset-4 hover:underline dark:text-zinc-50"
            >
              /topics/[slug]
            </Link>
            .
          </p>
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}
