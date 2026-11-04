export type Topic = {
  title: string;
  summary: string;
  body: string;
};

export const topics: Record<string, Topic> = {
  "getting-started": {
    title: "Getting started",
    summary: "Run the dev server and edit your first route.",
    body: "Use npm run dev, open localhost:3000, and change app/page.tsx. Routes under app/topics/[slug] resolve from a single URL segment.",
  },
  "deployment": {
    title: "Deployment",
    summary: "Ship a production build to your host of choice.",
    body: "Run npm run build and npm start locally to verify the output. Deploy the .next build artifact with any platform that supports Next.js 16.",
  },
};

export type GuidePage = {
  title: string;
  summary: string;
  body: string;
};

/** Keys are path segments joined with "/", e.g. "setup/env". */
export const guides: Record<string, GuidePage> = {
  intro: {
    title: "Guide intro",
    summary: "Catch-all routes accept multiple URL segments.",
    body: "This page lives at /guide/intro. Nested paths like /guide/setup/env map every segment to the slug array.",
  },
  "setup/env": {
    title: "Environment variables",
    summary: "Configure public and server-only values.",
    body: "Use NEXT_PUBLIC_* for client-visible values and keep secrets in server-only env vars. This demo path is /guide/setup/env.",
  },
  "setup/scripts": {
    title: "npm scripts",
    summary: "Dev, build, and lint from package.json.",
    body: "Standard scripts are dev, build, start, and lint. Extend them as your workflow grows.",
  },
};

export function getTopic(slug: string): Topic | undefined {
  return topics[slug];
}

function titleFromSlugSegments(slugSegments: string[]): string {
  return slugSegments
    .map((segment) =>
      segment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" "),
    )
    .join(" · ");
}

export function getGuide(slugSegments: string[]): GuidePage | undefined {
  return guides[slugSegments.join("/")];
}

/** Resolves known guides or builds a page for any catch-all path (e.g. /guide/hello). */
export function getGuidePage(slugSegments: string[]): GuidePage {
  const path = slugSegments.join("/");
  const existing = guides[path];
  if (existing) {
    return existing;
  }

  return {
    title: titleFromSlugSegments(slugSegments),
    summary: `Dynamic guide at /guide/${path}.`,
    body: `This URL matched the catch-all route app/guide/[...slug]/page.tsx with slug [${slugSegments.map((s) => `"${s}"`).join(", ")}]. Add a "${path}" entry to guides in app/lib/demo-content.ts to replace this placeholder.`,
  };
}
