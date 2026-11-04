export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200 py-8 dark:border-zinc-800">
      <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-4 px-6 sm:flex-row sm:items-center">
        <p className="text-sm text-zinc-500 dark:text-zinc-500">
          next-app · Built with Next.js
        </p>
        <a
          href="https://github.com/vercel/next.js"
          className="text-sm font-medium text-zinc-600 transition hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
          target="_blank"
          rel="noopener noreferrer"
        >
          View on GitHub →
        </a>
      </div>
    </footer>
  );
}
