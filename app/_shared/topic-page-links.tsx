import Link from "next/link";

/** Colocated under a private `_shared` folder — not part of the URL tree. */
export function TopicPageLinks() {
  return (
    <div className="mt-10 flex flex-wrap gap-4">
      <Link
        href="/"
        className="inline-flex h-11 items-center justify-center rounded-full border border-zinc-300 bg-white px-6 text-sm font-medium text-zinc-950 transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-transparent dark:text-zinc-50 dark:hover:bg-zinc-900"
      >
        ← Back to home now
      </Link>
      <Link
        href="/services"
        className="inline-flex h-11 items-center justify-center rounded-full bg-zinc-950 px-6 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
      >
        View services
      </Link>
    </div>
  );
}
