import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TopicPageLinks } from "../../_shared/topic-page-links";
import { SiteFooter } from "../../components/site-footer";
import { SiteHeader } from "../../components/site-header";
import { getTopic, topics } from "../../lib/demo-content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return Object.keys(topics).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const topic = getTopic(slug);
  if (!topic) {
    return { title: "Topic not found — next-app" };
  }
  return {
    title: `${topic.title} — next-app`,
    description: topic.summary,
  };
}

export default async function TopicPage({ params }: PageProps) {
  const { slug } = await params;
  const topic = getTopic(slug);

  if (!topic) {
    notFound();
  }

  return (
    <div className="flex min-h-full flex-col bg-zinc-50 font-sans text-foreground dark:bg-zinc-950">
      <SiteHeader />

      <main className="flex-1">
        <article className="mx-auto max-w-5xl px-6 pb-20 pt-16 sm:pt-24">
          <p className="mb-4 font-mono text-sm text-zinc-500 dark:text-zinc-400">
            /topics/[slug] ·{" "}
            <span className="text-zinc-800 dark:text-zinc-200">{slug}</span>
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl dark:text-zinc-50">
            {topic.title}
          </h1>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            {topic.summary}
          </p>
          <p className="mt-8 max-w-2xl leading-relaxed text-zinc-700 dark:text-zinc-300">
            {topic.body}
          </p>

          <div className="mt-12 flex flex-wrap gap-3">
            {Object.keys(topics).map((key) => (
              <Link
                key={key}
                href={`/topics/${key}`}
                className={
                  key === slug
                    ? "rounded-full bg-zinc-950 px-4 py-2 text-sm font-medium text-white dark:bg-zinc-50 dark:text-zinc-950"
                    : "rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
                }
              >
                {topics[key].title}
              </Link>
            ))}
          </div>

          <p className="mt-10 text-sm text-zinc-500">
            Multi-segment URLs use{" "}
            <Link
              href="/guide/intro"
              className="font-medium text-zinc-950 underline-offset-4 hover:underline dark:text-zinc-50"
            >
              /guide/[...slug]
            </Link>
            .
          </p>

          <TopicPageLinks />
        </article>
      </main>

      <SiteFooter />
    </div>
  );
}
