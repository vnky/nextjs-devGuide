import { createPost } from "@/app/actions";

export function Form() {
  return (
    <form action={createPost} className="space-y-4">
      <div>
        <label
          htmlFor="title"
          className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Title
        </label>
        <input
          id="title"
          type="text"
          name="title"
          required
          className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-950 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
        />
      </div>
      <div>
        <label
          htmlFor="content"
          className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
        >
          Content
        </label>
        <input
          id="content"
          type="text"
          name="content"
          required
          className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-950 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50"
        />
      </div>
      <button
        type="submit"
        className="inline-flex h-10 items-center justify-center rounded-full bg-zinc-950 px-5 text-sm font-medium text-white hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
      >
        Create
      </button>
    </form>
  );
}
