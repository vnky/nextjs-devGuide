import type { Metadata } from "next";
import { Form } from "@/app/components/create-post-form";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";
import { fetchPosts } from "@/app/lib/json-server";

export const metadata: Metadata = {
  title: "Posts — next-app",
  description: "Create posts via Server Actions backed by json-server.",
};

export const dynamic = "force-dynamic";

export default async function PostsPage() {
  let posts: Awaited<ReturnType<typeof fetchPosts>> = [];
  let loadError: string | null = null;

  try {
    posts = await fetchPosts();
  } catch {
    loadError =
      "Could not load posts. Start json-server with npm run json-server (port 3001).";
  }

  return (
    <div className="flex min-h-full flex-col bg-zinc-50 font-sans text-foreground dark:bg-zinc-950">
      <SiteHeader />

      <main className="flex-1">
        <section className="mx-auto grid max-w-5xl gap-12 px-6 pb-20 pt-16 lg:grid-cols-2 lg:pt-24">
          <div>
            <p className="mb-4 text-sm font-medium tracking-wide text-zinc-500 uppercase dark:text-zinc-400">
              Server Actions
            </p>
            <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
              Create a post
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              The form uses{" "}
              <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-xs dark:bg-zinc-900">
                action={"{"}createPost{"}"}
              </code>{" "}
              from{" "}
              <code className="rounded bg-zinc-100 px-1 py-0.5 font-mono text-xs dark:bg-zinc-900">
                @/app/actions
              </code>
              . Submitting calls the server function, which POSTs to json-server.
            </p>
            <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/40">
              <Form />
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-zinc-950 dark:text-zinc-50">
              Posts from json-server
            </h2>
            {loadError ? (
              <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-200">
                {loadError}
              </p>
            ) : posts.length === 0 ? (
              <p className="mt-4 text-sm text-zinc-500">No posts yet.</p>
            ) : (
              <ul className="mt-6 space-y-4">
                {posts.map((post) => (
                  <li
                    key={post.id}
                    className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900/40"
                  >
                    <p className="font-medium text-zinc-950 dark:text-zinc-50">
                      {post.title}
                    </p>
                    <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                      {post.content}
                    </p>
                    <p className="mt-2 font-mono text-xs text-zinc-400">
                      id: {post.id}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
