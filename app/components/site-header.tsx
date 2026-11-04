import Image from "next/image";
import Link from "next/link";

const navLinkClass =
  "transition-colors hover:text-zinc-950 dark:hover:text-zinc-50";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 border-b border-zinc-200/80 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt=""
            width={90}
            height={18}
            priority
          />
          <span className="sr-only">Home</span>
        </Link>
        <nav
          className="flex items-center gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400"
          aria-label="Primary"
        >
          <Link href="/" className={navLinkClass}>
            Home
          </Link>
          <Link href="/streaming" className={navLinkClass}>
            Streaming
          </Link>
          <Link href="/services" className={navLinkClass}>
            Services
          </Link>
          <Link href="/about" className={navLinkClass}>
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
